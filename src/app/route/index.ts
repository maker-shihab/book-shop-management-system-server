import express from "express";
import { AuthRouter } from "../modules/auth/auth.route";
import { BookRoutes } from "../modules/books/books.route";
import { TransactionsRoute } from "../modules/transactions/transactions.route";
import { UserRoutes } from "../modules/user/user.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRouter,
  },
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/books",
    route: BookRoutes,
  },
  {
    path: "/order",
    route: TransactionsRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
