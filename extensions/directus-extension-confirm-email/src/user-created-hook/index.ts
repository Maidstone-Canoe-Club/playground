import {defineHook} from '@directus/extensions-sdk';
// import {nanoid} from "nanoid";
// import {createError} from '@directus/errors';
import sendNew from "../sendNewConfirmationEmail";

// const MailSendError = createError("VERIFY_MAIL_SEND_ERROR", "Unable to send verify email address email");

export default defineHook(({filter}, {services}) => {
	// const {MailService} = services;

	filter('users.create', async (input, _, {schema, database}) => {
		// const mailService = new MailService({schema, knex: database});
		// const token = nanoid(34);
		//
		// input.confirm_token = token;
		// input.confirm_token_create_date = Date.now();
		// input.email_confirmed = false;
		//
		// const url = `http://localhost:3000/confirm-email?t=${token}`;
		//
		// try {
		// 	await mailService.send({
		// 		to: input.email,
		// 		subject: "Confirm email",
		// 		template: {
		// 			name: "confirm-email",
		// 			data: {
		// 				url
		// 			}
		// 		}
		// 	});
		// } catch (e) {
		// 	console.log("unable to send email", e);
		// 	throw new MailSendError();
		// }
		//
		// return input;

		return await sendNew(services, input, schema, database);
	});
});
