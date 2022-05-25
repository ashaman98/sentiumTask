import User from "../models/user";
import bcryptjs from "bcryptjs"
import * as jwt from "jsonwebtoken"
import { config } from "../config";

export async function signUp(data:any){
    const user = await User.create({
        username: data.username,
        password: await bcryptjs.hash(data.password, 10),
        name: data.name,
        surname: data.surname
    })

    const token = await getToken(user.username)

    return token

}

export async function logIn(data:any){
    console.log("username:", data.username)
    const user = await User.findOne({ where: { username: data.username } })
    console.log(user)
    if(!user){
        throw new Error('No user with that username')
    }

    const valid = await bcryptjs.compare(data.password, user.password)

    if (!valid) {
        throw new Error('Incorrect password')
    }

    const token = await getToken(user.username)

    return token

}

async function getToken(username: string){
    return jwt.sign({username},config.JWTSECRET,{expiresIn: '12h'})
}

