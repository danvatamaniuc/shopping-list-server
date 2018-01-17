import Router from 'koa-router'
import {state, User} from "../index";

export class UserRouter extends Router {

    constructor(args) {
        super(args);

        this.get('/', async (ctx) => {
            let response = state.users;
            ctx.body = response;
        });

        this.get('/:id', async (ctx, next) => {
            ctx.body = state.users.find((user) => user.id == ctx.params.id);
        });

        this.post('/', async (ctx, next) => {
            let user = ctx.request.body,
                stateUser = new User(user.username, user.password, user.firstname, user.lastname, user.email);

            state.users.push(stateUser);
            ctx.body = stateUser;
        });

        this.delete('/:id', async (ctx, next) => {
            let userStateIndex = state.users.findIndex((user) => user.id == ctx.params.id),
                deletedUser = {};
            if (userStateIndex > -1) {
                deletedUser = state.users.splice(userStateIndex, 1);
            }
            ctx.body = deletedUser;
        });
    }
}