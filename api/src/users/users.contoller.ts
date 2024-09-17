// users.controller.ts

import { Body, Controller, HttpCode, HttpStatus, Post, Res, UnauthorizedException } from "@nestjs/common";
import { User } from "../entities/user.entity";
import { UsersService } from "./users.service";
import { Response } from "express";
import { HashService } from "./hash.service";

@Controller('user')
export class UsersController{
    constructor(
        private readonly usersService : UsersService,
        private readonly hashService: HashService
    ){}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async newUser(@Body() userData: User, @Res() res: Response): Promise<void>{
        try{
            if(!this.validateUserData(userData)){
                throw new UnauthorizedException('Invalid Input');
            }
            const token = await this.usersService.new(userData);

            res.set('X-Auth-Token', token);
            res.set('Content-Type', 'application/json');
            res.status(HttpStatus.CREATED).json({
                login: userData.login,
                password: this.hashService.hash(userData.password)
            });
        }catch(error){
            console.log(error);
            res.status(HttpStatus.METHOD_NOT_ALLOWED).send();
        }

    }

    validateUserData(userData: User): boolean{
        return  (typeof userData.login === 'string') 
        && (typeof userData.password === 'string')
        && userData.login.length != 0 
        && userData.password.length != 0 
        
    }
}