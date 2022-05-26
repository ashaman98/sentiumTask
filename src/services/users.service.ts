import User from "../models/user";
import { LoginUserInput, UpdateUserInput, UserInput } from "../inputTypes/userInputs"
import bcryptjs from "bcryptjs"
import * as jwt from "jsonwebtoken"
import { config } from "../config";

export async function signUp(data: UserInput){
    const user = await User.create({
        username: data.username,
        password: await bcryptjs.hash(data.password, 10),
        name: data.name,
        surname: data.surname,
        role: data.role
    })

    const token = getToken(user.username)

    return token

}

export async function logIn(data: LoginUserInput){
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

    if(!user){
        throw new Error("user does not exist")
    }
    user.set({
        username: newData.username,
        password: await bcryptjs.hash(newData.password, 10),
        name: newData.name,
        surname: newData.surname,
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
}

export async function getRole(username: string){
    const user = await User.findOne({where: {username}})
    if(!user){
        throw new Error("User does not exist")
    }
    return user.role
}

export async function getUser(username: string){
    return User.findOne({where: {username}})
}