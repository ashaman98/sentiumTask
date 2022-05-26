import { MyContext } from "../myContext";
import { Arg, Ctx, FieldResolver, Mutation, Query, Resolver, Root, UseMiddleware } from "type-graphql";
import User from "../models/user";
import {deleteUser, logIn,signUp, updateUser} from "../services/users.service"
import { isAuth } from "../middlewares/isAuth";

@Resolver(User)
export class UserResolver {
    @Query(() => String)
    @UseMiddleware(isAuth)
    async Me(@Ctx() { payload }: MyContext) {
      return `Your user is : ${payload!.username}`;
    }

    @Mutation(returns => String)
    async register(@Arg("data") userData: User){
        const token = await signUp(userData)

        return token
    }

    @Mutation(returns => String)
    async session(@Arg("data") userData: User){
        const token = await logIn(userData)

        return token
    }

    @Mutation(returns => String)
    async destroyUser(@Arg("username") username: string){
        console.log("user to delete:", username);

        await deleteUser(username)

        return `user: ${username} destroyed`
    }

    @Mutation(returns => User)
    async editUser(
        @Arg('username') username: string,
        @Arg("data") userData: User
    ){
        console.log("new data", userData)

        return updateUser(username,userData)
    }

}