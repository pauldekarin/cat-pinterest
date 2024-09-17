//auth.strategy.ts

import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt'
import { UsersService } from "src/users/users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        private readonly usersSerivce: UsersService,
        private readonly config: ConfigService
    ){
        const secret_key = 'b+jjhfWvcP1ZYYnagnf4gj+DBNbw6BvqwySYSez4ElA=';

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: secret_key
        });
    }

    async validate(payload: any){
        return this.usersSerivce.findById(payload.id);
    }
}