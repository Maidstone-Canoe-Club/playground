import {defineHook} from '@directus/extensions-sdk';
import {createError} from '@directus/errors';

const ForbiddenError = createError('FORBIDDEN', "You don't have permissions to see this.", 403);

const protectedCollections = ["emergancy_contacts"];
const permittedRoles = ["coach"];

async function checkUserPermission(userId, collection, accountability, schema, RolesService) {
    if (protectedCollections.includes(collection)) {

        const roles = new RolesService({
            schema: schema,
            accountability: accountability
        });

        const role = await roles.readOne(accountability.role);
        if (role.admin_access || permittedRoles.includes(role.name.toLowerCase())) {
            console.log("user has role!")
            return true;
        }

        console.log("user doesn't have the role, checking id match", accountability.user, userId)
        if (accountability.user !== userId) {
            console.log("user doesn't have matching id")
            return false;
        }
        console.log("user has matching id!")
    }

    return true;
}

export default defineHook(({filter}, {services}) => {

    const {RolesService} = services;

    filter('items.delete', async (payload, {collection}, {schema, accountability}) => {
        console.log("delete payload", payload);
        const hasPermission = await checkUserPermission(payload, collection, accountability, schema, RolesService);
        if (!hasPermission) {
            throw new ForbiddenError();
        }

        return payload;
    });

    filter('items.create', async (payload, {collection}, {schema, accountability}) => {
        console.log("create payload", payload);
        const hasPermission = await checkUserPermission(payload, collection, accountability, schema, RolesService);
        if (!hasPermission) {
            throw new ForbiddenError();
        }

        return payload;
    });

    filter('items.update', async (payload, {collection}, {schema, accountability}) => {
        console.log("update payload", payload);
        const hasPermission = await checkUserPermission(payload, collection, accountability, schema, RolesService);
        if (!hasPermission) {
            throw new ForbiddenError();
        }

        return payload;
    });

    filter('items.read', async (payload, {collection}, {schema, accountability}) => {
        console.log("items.read payload", payload);
        let userId = null;
        if (payload.length > 0 && protectedCollections.includes(collection)) {
            userId = payload[0].user;
        }

        if(userId) {
            const hasPermission = await checkUserPermission(userId, collection, accountability, schema, RolesService);
            if (!hasPermission) {
                throw new ForbiddenError();
            }
        }

        return payload;
    });

    filter('items.query', async (payload, {collection}, {schema, accountability}) => {
        console.log("items.query payload", payload);

        let userId = null;
        if (protectedCollections.includes(collection)) {
            userId = payload.filter.user._eq;
        }

        if(userId) {
            const hasPermission = await checkUserPermission(userId, collection, accountability, schema, RolesService);
            if (!hasPermission) {
                throw new ForbiddenError();
            }
        }

        return payload;
    });
});
