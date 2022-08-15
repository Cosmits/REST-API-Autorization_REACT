import Router from "express";
import PostController from "./controllers/PostController.js";
import UserController from "./controllers/UserController.js";
import {body} from "express-validator";
import authMiddleware from "./middlewares/auth-middleware.js";

const router = new Router();

router.get("/posts", PostController.getAllPosts);
router.get("/posts/:id", PostController.getOnePost);
router.post("/posts", PostController.create);
router.put("/posts", PostController.updatePost);
router.delete("/posts/:id", PostController.deletePost);

router.post(
    "/registration",
    body("email").isEmail(),
    body("password").isLength({min: 5}),
    UserController.registration
);
router.post("/login", UserController.login);
router.post("/logout", UserController.logout);
router.get("/refresh", UserController.refresh);
router.get("/activations/:link", UserController.activationsAccount);
router.get("/users", authMiddleware, UserController.getAllUsers);

export default router;
