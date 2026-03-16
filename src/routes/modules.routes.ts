import usersRoute from "../modules/users/users.route";
import { UserModel } from "../modules/users/users.model";

import authRoute from "../modules/auth/auth.route";

import productsRoute from "../modules/products/products.route";
import { ProductModel } from "../modules/products/products.model";

import reviewsRoute from "../modules/reviews/reviews.route";
import { ReviewModel } from "../modules/reviews/reviews.model";

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
  }
];