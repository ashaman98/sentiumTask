import { MiddlewareFn } from "type-graphql";
import { JwtPayload } from "jsonwebtoken";
import { MyContext } from "../myContext";
import { checkJwt } from "../utils/utils";
import {getRole} from "../services/users.service"

export const isAdmin: MiddlewareFn<MyContext> = async ({ context }, next) => {
  console.log("action is :", context.req.headers);

  const token = context.req.headers.authorization;
  const payload = checkJwt(token) as JwtPayload;

  const role = await getRole(payload.username)

  if(role === 'moderator'){
    context.payload = {
        username: payload.username
      }
  }
  else{
      throw new Error("Permission denied")
  }

  return next();
};
