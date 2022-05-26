import { isJWT } from "class-validator";
import { JwtPayload, verify } from "jsonwebtoken";
import { config } from "../config";
import { getToken } from "./users.service";

it('should check token generation', () =>{
    const data = {
        username: "karo",
        password: "pass",
        name: "karapet",
        surname: "karamyan"
    }
    const token = getToken(data.username)
    const decodedToken = verify(token, config.JWTSECRET) as JwtPayload
    const expectedPayload =     { username: data.username, iat: expect.any(Number), exp: expect.any(Number) }
    expect(decodedToken).toEqual(expectedPayload)
})