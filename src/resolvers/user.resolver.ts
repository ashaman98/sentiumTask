import { MyContext } from "../myContext";
import { Arg, Ctx, Mutation, Query, Resolver, Root, UseMiddleware } from "type-graphql";
import User from "../models/user";
import { LoginUserInput, UpdateUserInput, UserInput } from "../inputTypes/userInputs"
import {deleteUser, getUser, logIn,signUp, updateUser} from "../services/users.service"
import { isAuth } from "../middlewares/isAuth";
import { isAdmin } from "../middlewares/isAdmin";

@Resolver(User)
export class UserResolver {
    @Query(() => User)
    @UseMiddleware(isAuth)
    async Me(@Ctx() { payload }: MyContext) {
      return getUser(payload!.username)
    }

    @Query(() => User)
    @UseMiddleware(isAdmin)
    async getUser(@Arg("username") username: string) {
      return getUser(username)
    }

    @Mutation(returns => String)
    async register(@Arg("data") userData: UserInput){
        const token = await signUp(userData)

        return token
    }

    @Mutation(returns => String)
    async session(@Arg("data") userData: LoginUserInput){
        const token = await logIn(userData)

        return token
    }

    @UseMiddleware(isAdmin)
    @Mutation(returns => String)
    async destroyUser(@Arg("username") username: string){
        console.log("user to delete:", username);

        await deleteUser(username)

        return `user: ${username} destroyed`
    }

    @UseMiddleware(isAdmin)
    @Mutation(returns => User)
    async editUser(
        @Arg('username') username: string,
        @Arg("data") userData: UpdateUserInput
    ){
        console.log("new data", userData)

        return updateUser(username,userData)
    }

}