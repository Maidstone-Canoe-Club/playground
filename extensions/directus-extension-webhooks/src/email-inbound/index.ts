import {defineEndpoint} from '@directus/extensions-sdk';
import axios from "axios";

const postmarkUrl = "https://api.postmarkapp.com";

type Subscriber = {
    mailing_list: number,
    user: {
        email: string,
        first_name: string,
        last_name: string
    }
}

type MailingList = {
    id: number,
    name: string,
    email_name: string
}

type InboundEmail = {
    FromName: string,
    MessageStream: string,
    From: string,
    FromFull: {
        Email: string,
        Name: string,
        MailboxHash: string
    },
    To: string,
    ToFull: {
        Email: string,
        Name: string,
        MailboxHash: string
    }[],
    Cc: string,
    CcFull: {
        Email: string,
        Name: string,
        MailboxHash: string
    }[],
    Bcc: string,
    BccFull: {
        Email: string,
        Name: string,
        MailboxHash: string
    }[],
    OriginalRecipient: string,
    Subject: string,
    MessageID: string,
    MailboxHash: string,
    Date: string,
    TextBody: string,
    HtmlBody: string,
    StrippedTextReply: string,
    Tag: string;
    Headers: {
        Name: string,
        Value: string
    }[],
    Attachments: {
        Name: string,
        Content: string,
        ContentType: string,
        ContentLength: number
    }[]
}

async function sendBatchEmail(data: any) {
    return await axios.post("/email/batch", data, {
        baseURL: postmarkUrl,
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "X-Postmark-Server-Token": process.env.EMAIL_SMTP_PASSWORD
        }
    });
}

function chunkArray<T>(input: T[], size: number): T[][] {
    const result = [];

    for (let i = 0; i < input.length; i += size) {
        result.push(input.slice(i, i + size));
    }

    return result;
}

function buildFromEmailAddress(mailingList: MailingList, subscriber: Subscriber) {
    return `${subscriber.user.first_name} ${subscriber.user.last_name} <${mailingList.email_name}@${process.env.EMAIL_DOMAIN}>`;
}

function buildReplyToEmailAddress(mailingList: MailingList) {
    return `${mailingList.email_name}@${process.env.EMAIL_DOMAIN}`;
}

export default defineEndpoint((router, {services}) => {
    const {ItemsService} = services;
    const adminAccountability = {
        admin: true
    };


    router.post('/', async (req, res) => {
        const mailingListService = new ItemsService("mailing_lists", {
            schema: req.schema,
            accountability: adminAccountability
        });
        const listSubscribersService = new ItemsService("mailing_list_subscribers", {
            schema: req.schema,
            accountability: adminAccountability
        });

        const data: InboundEmail = req.body;

        // read to email address
        // find email address in lists collection
        // get list of user email addresses to forward email to
        // send email(s)

        console.log("GOT EMAIL INBOUND REQUEST", req);

        const toAddresses = data.ToFull;

        if (toAddresses && toAddresses.length) {
            for (let i = 0; i < toAddresses.length; i++) {
                const toAddress = toAddresses[i];
                if (!toAddress) {
                    continue;
                }

                const to = toAddress.Email;
                const emailName = to.split("@")[0];

                const foundLists: MailingList[] = await mailingListService
                    .readByQuery({
                        filter: {
                            email_name: {
                                _eq: emailName
                            }
                        }
                    });

                const mailingList: MailingList | null | undefined = foundLists.length > 0 ? foundLists[0] : null;

                if (mailingList) {
                    const subscribers: Subscriber[] = await listSubscribersService
                        .readByQuery({
                            fields: ["mailing_list", "user.email", "user.first_name", "user.last_name"],
                            filter: {
                                mailing_list: {
                                    _eq: mailingList.id
                                }
                            }
                        });

                    if (subscribers && subscribers.length) {
                        const subscriberChunks = chunkArray<Subscriber>(subscribers, 50);

                        for (let j = 0; j < subscriberChunks.length; j++) {
                            const chunk = subscriberChunks[j];
                            if (!chunk) {
                                continue;
                            }

                            const emailsToSend = chunk.map(subscriber => ({
                                To: subscriber.user.email,
                                From: buildFromEmailAddress(mailingList, subscriber),
                                Subject: data.Subject,
                                TextBody: data.TextBody,
                                HtmlBody: data.HtmlBody,
                                ReplyTo: buildReplyToEmailAddress(mailingList),
                                TrackOpens: true,
                                TrackLinks: "None",
                                MessageStream: "broadcasts"
                            }));

                            // await sendBatchEmail(data);
                            console.log("sending emails!", emailsToSend)
                        }
                    } else {
                        console.log("there were no subscribers for mailing list", emailName)
                    }

                    // TODO
                    // Loop over subscribers
                    // Add subscribers into batches of 50
                    // For each batch
                    //  Create postmark batch request
                    //  Send batch request

                }else{
                    console.log("could not find a mailing list", emailName)
                }
            }
        }else{
            console.log("no to email addresses???")
        }

        return res.status(200).send("OK");
    });
});
