const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('koa-cors');
const json = require('koa-json');
const httpStatus = require('./utils/httpStatus');
const authUtils = require('./utils/auth.utils');

const app = new Koa();
var Router = require('koa-router');
var router = new Router();

app.use(bodyParser());
app.use(cors());
app.use(json());

// mock data
var state = {
  users: [],
  products: [],
  lists: []
};

var userId = 0,
    productId = 0,
    listId = 0;

function User(username, password, firstname, lastname, email) {
  this.username = username;
  this.firstname = firstname;
  this.lastname = lastname;
  this.password = password;
  this.email = email;
  this.id = userId++;
}

function Product(name, category, price) {
  this.name = name;
  this.category = category;
  this.price = price;
  this.id = productId++;
}

function List(title, products, deadline, participants) {
  this.title = title;
  this.products = products;
  this.deadline = deadline;
  this.participants = participants;
  this.id = listId++;
}

function ListProduct(stateProductId, quantity, checked, comment) {
  this.productId = stateProductId;
  this.quantity = quantity;
  this.checked = checked;
  this.comment = comment;
}

state.users.push(new User("admin", "admin", "first", "last", "admin@infoworld.ro"));

state.products.push(new Product("Bread", "Food", "1"));
state.products.push(new Product("Milk", "Food", "2"));
state.products.push(new Product("Hammer", "Tool", "10"));
state.products.push(new Product("Pillow", "Utility", "20"));

state.lists.push(new List("Admin List", [], new Date(), [0]));

state.lists[0].products.push(new ListProduct(0, 1, false, ""));
state.lists[0].products.push(new ListProduct(1, 2, true, ""));
state.lists[0].products.push(new ListProduct(2, 100, false, "Hammer Time"));

console.log(JSON.stringify(state, null, 2));

//--------------------------ROUTES

//USER CRUD
router.get('/users', async (ctx, next) => {
  ctx.body = state.users;
});

router.get('/users/:id', async (ctx, next) => {
  ctx.body = state.users.find((user) => user.id == ctx.params.id);
});

router.post('/users', async (ctx, next) => {
  let user = ctx.request.body,
      stateUser = new User(user.username, user.password, user.firstname, user.lastname, user.email);

  state.users.push(stateUser);
  ctx.body = stateUser;
});

router.delete('/users/:id', async (ctx, next) => {
  let userStateIndex = state.users.findIndex((user) => user.id == ctx.params.id),
      deletedUser = {};

  if (userStateIndex > -1) {
    deletedUser = state.users.splice(userStateIndex, 1);
  }
  ctx.body = deletedUser;
});

//PRODUCT CRUD
router.get('/products', async (ctx, next) => {
  ctx.body = state.products;
});

router.get('/products/:id', async (ctx, next) => {
  ctx.body = state.products.find((product) => product.id == ctx.params.id);
});

router.post('/products', async (ctx, next) => {
  let product = ctx.request.body,
      stateProduct = new Product(product.name, product.category, product.price);

  state.products.push(stateProduct);
  ctx.body = stateProduct;
});

router.delete('/products/:id', async (ctx, next) => {
  let productStateIndex = state.products.findIndex((product) => product.id == ctx.params.id),
      deletedProduct = {};

  if (productStateIndex > -1) {
    deletedProduct = state.products.splice(productStateIndex, 1);
  }
  ctx.body = deletedProduct;
});

//TODO: LIST CRUD

//REGISTER && LOGIN

router.post('/register', async (ctx, next) => {
    let user = ctx.request.body,
        newUser = new User(user.username, user.password, user.firstname, user.lastname, user.email);

    state.users.push(newUser);
    ctx.status = 200;
    ctx.body = newUser;
});

router.post('/login', async (ctx, next) => {
    let user = ctx.request.body,
    username = user.username,
    email = user.email,
    password = user.password,
    foundUser = state.users.find((user) => user.email === email && user.username === username && user.password === password);

    if (foundUser) {
        console.log('foundUser: ', foundUser)
        ctx.status = httpStatus.CREATED;
        ctx.body = {id_token: authUtils.createToken(foundUser)}
        // ctx.body = foundUser;
    } else {
        ctx.status = 401;
        ctx.body = "Unauthorized";
    }
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);