import { MiddlewareFn } from "type-graphql";
import { verify } from "jsonwebtoken";
import { MyContext } from "../myContext";
import {config} from "../config"


export const isAuth: MiddlewareFn<MyContext> = ({context}, next) => {
    console.log("action is :",context.req.headers)

  const token = context.req.headers.authorization;


  console.log(token);

  if (!token) {
    throw new Error("Not authenticated");
  }

  try {
    const payload = verify(token, config.JWTSECRET);
    console.log(payload);
    context.payload = payload as any;
  } catch (err) {
    console.log(err);
    throw new Error("Not authenticated");
  }
  return next();
};