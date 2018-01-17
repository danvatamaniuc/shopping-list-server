import Router from 'koa-router'
import {Product, state} from "../index";

export class ProductRouter extends Router {

    constructor(args) {
        super(args);

        this.get('/', async (ctx, next) => {
            let response = state.products;
            ctx.body = response;
        });

        this.get('/:id', async (ctx, next) => {
            ctx.body = state.products.find((product) => product.id == ctx.params.id);
        });

        this.post('/', async (ctx, next) => {
            let product = ctx.request.body,
                stateProduct = new Product(product.name, product.category, product.price);

            state.products.push(stateProduct);
            ctx.body = stateProduct;
        });

        this.delete('/:id', async (ctx, next) => {
            let productStateIndex = state.products.findIndex((product) => product.id == ctx.params.id),
                deletedProduct = {};

            if (productStateIndex > -1) {
                deletedProduct = state.products.splice(productStateIndex, 1);
            }
            ctx.body = deletedProduct;
        });
    }
}