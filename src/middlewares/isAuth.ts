import { MiddlewareFn } from "type-graphql";
import { JwtPayload } from "jsonwebtoken";
import { MyContext } from "../myContext";
import { checkJwt } from "../utils/checkToken";

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  console.log("action is :", context.req.headers);

  const token = context.req.headers.authorization;
  const payload = checkJwt(token) as JwtPayload;
  context.payload = {
    username: payload.username
  }
  return next();
};
