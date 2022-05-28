import User from "../models/user";
import { LoginUserInput, UpdateUserInput, UserInput } from "../inputTypes/userInputs"
import bcryptjs from "bcryptjs"
import * as jwt from "jsonwebtoken"
import { config } from "../config";
import { redisClient } from "../redis";
import { cacheHit, dropFromCache, setCache } from "../utils/redisHelpers";

export async function signUp(data: UserInput){
    const user = await User.create({
        username: data.username,
        password: await bcryptjs.hash(data.password, 10),
        name: data.name,
        surname: data.surname,
        role: data.role
    })

    const token = getToken(user.username)
    await setCache(User.name, user.username, user)

    return token

}

export async function logIn(data: LoginUserInput){

    const result = await redisClient.hGetAll(User.name)
    console.log("cache array:", result)

    const user = await getUser(data.username)

    if(!user){
        throw new Error('No user with that username')
    }

    const valid = await bcryptjs.compare(data.password, user.password)

    if (!valid) {
        throw new Error('Incorrect password')
    }

    const token = getToken(user.username)

    return token


}

export function getToken(username: string){
    return jwt.sign({username},config.JWTSECRET,{expiresIn: '12h'})
}

export async function updateUser(username: string, newData: UpdateUserInput){

    console.log("new user data: ",newData)
    console.log("update user: ", username)
    const user = await User.findOne({where: {username}})
    await dropFromCache(User.name, username)

    if(!user){
        throw new Error("user does not exist")
    }
    user.set({
        username: newData.username,
        password: newData.password ? await bcryptjs.hash(newData.password, 10) : user.password,
        name: newData.name || user.name,
        surname: newData.surname || user.surname,
    })

     await user.save()
     console.log(user);
     return user
}

export async function deleteUser(username: string){

    console.log("destroy user: ", username)
    const user = await User.findOne({where: {username}})

    if(!user){
        throw new Error("User does not exist")
    }

    await user.destroy()
    await dropFromCache(User.name, username)
}

export async function getUser(username: string){

    const result = await redisClient.hGetAll(User.name)
    console.log("cache array:", result)

    const cachedVal = await cacheHit(User.name, {username})

    console.log("cache find:",cachedVal)

    if(!cachedVal){
        const user = await User.findOne({where:{username}})

        console.log(JSON.stringify(user));

        await setCache(User.name, username, user)

        console.log('returning from orm');

        return user
    }

    console.log('returning from redis');

    return cachedVal
}