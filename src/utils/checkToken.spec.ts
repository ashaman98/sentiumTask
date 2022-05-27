import * as jwt from "jsonwebtoken"
import { config } from "../config"
import {checkJwt} from "./checkToken"

it('should check auth by token', () =>{
    const token = jwt.sign({name: "John", surname: "Doe"},config.JWTSECRET)

    const verificationResult:any = checkJwt(token)

    expect(verificationResult.name).toEqual("John")
    expect(checkJwt).toThrow("Token is missing")
    expect(() => {checkJwt('saafa232ref')}).toThrow("Not authenticated")
})

it('should throw token missing error', () =>{
    expect(checkJwt).toThrow("Token is missing")
})

it('should throw unauthenticated error', () =>{
    expect(() => {checkJwt('saafa232ref')}).toThrow("Not authenticated")
})