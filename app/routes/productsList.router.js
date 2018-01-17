import Router from 'koa-router'
import {ListProduct, state} from "../index";

export class ProductsListRouter extends Router {

    constructor(args) {
        super(args);

        this.get('/', async (ctx, next) => {
            ctx.body = state.lists;
        });
    }
}