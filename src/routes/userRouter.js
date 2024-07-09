import express from 'express'
import { login, signOut, signUp } from '../controller/userController.js';

const userRouter = express.Router();

userRouter.post("/login", login);
userRouter.post("/signup", signUp);
userRouter.get("/signout", signOut);

export default userRouter;

