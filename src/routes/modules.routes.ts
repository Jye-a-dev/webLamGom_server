import usersRoute from "../modules/users/users.route";
import { UserModel } from "../modules/users/users.model";

import authRoute from "../modules/auth/auth.route";

import productsRoute from "../modules/products/products.route";
import { ProductModel } from "../modules/products/products.model";

import reviewsRoute from "../modules/reviews/reviews.route";
import { ReviewModel } from "../modules/reviews/reviews.model";

import categoriesRoute from "../modules/categories/categories.route";
import { CategoryModel } from "../modules/categories/categories.model";

import cartsRoute from "../modules/carts/carts.route";
import { CartModel } from "../modules/carts/carts.model";

import addressesRoute from "../modules/addresses/addresses.route";
import { AddressModel } from "../modules/addresses/addresses.model";

/* ADD */
import ordersRoute from "../modules/orders/orders.route";
import { OrderModel } from "../modules/orders/orders.model";

import paymentsRoute from "../modules/payments/payments.route";
import { PaymentModel } from "../modules/payments/payments.model";

export const moduleRoutes = [
  {
    name: "auth",
    path: "/auth",
    router: authRoute,
    model: UserModel
  },
  {
    name: "users",
    path: "/users",
    router: usersRoute,
    model: UserModel
  },
  {
    name: "products",
    path: "/products",
    router: productsRoute,
    model: ProductModel
  },
  {
    name: "reviews",
    path: "/reviews",
    router: reviewsRoute,
    model: ReviewModel
  },
  {
    name: "categories",
    path: "/categories",
    router: categoriesRoute,
    model: CategoryModel
  },
  {
    name: "carts",
    path: "/carts",
    router: cartsRoute,
    model: CartModel
  },
  {
    name: "addresses",
    path: "/addresses",
    router: addressesRoute,
    model: AddressModel
  },

  /* NEW MODULES */

  {
    name: "orders",
    path: "/orders",
    router: ordersRoute,
    model: OrderModel
  },
  {
    name: "payments",
    path: "/payments",
    router: paymentsRoute,
    model: PaymentModel
  }
];