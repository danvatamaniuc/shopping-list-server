import Router from 'koa-router'
import {state, User} from "../index";
import {httpStatus} from "../utils/httpStatus";
import {createToken} from "../utils/auth.utils";

export const registerUrl = '/register';
export const loginUrl = '/login';

export class AuthRouter extends Router {

    constructor(args) {
        super(args)

        this.post(registerUrl, async (ctx, next) => {
            let user = ctx.request.body,
                newUser = new User(user.username, user.password, user.firstname, user.lastname, user.email);
            state.users.push(newUser);
            ctx.status = 200;
            ctx.status = httpStatus.CREATED;
            ctx.body = {id_token: createToken(newUser)};
            // ctx.body = newUser;
            // ctx.body = {}
        });

        this.post(loginUrl, async (ctx, next) => {
            let reqBody = ctx.request.body,
            username = reqBody.username,
            email = reqBody.email,
            password = reqBody.password,
            foundUser = state.users.find((user) => user.email === email && user.username === username && user.password === password);
            if (foundUser) {
                console.log('foundUSER: ', foundUser);
                ctx.status = httpStatus.CREATED;
                ctx.body = {id_token: createToken(foundUser)};
            }  else {
                ctx.status = httpStatus.UNAUTHORIZED
            }
        })

    }
}