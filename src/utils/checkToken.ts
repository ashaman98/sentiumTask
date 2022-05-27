
import {config} from "../config"
import { verify } from "jsonwebtoken";


export function checkJwt(token:string){
  if (!token) {
    throw new Error("Token is missing");
  }
  try {
    const payload = verify(token, config.JWTSECRET);
    return payload
  } catch (err) {
    console.log(err);
    throw new Error("Not authenticated");
  }
};