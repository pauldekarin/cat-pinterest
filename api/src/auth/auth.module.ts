// auth.module.ts

import { Module, forwardRef } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { UsersModule } from "src/users/users.module";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./auth.strategy";
import { PassportModule } from "@nestjs/passport";

@Module({
    imports:[
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (config: ConfigService) => {
                return {
                secret: 'b+jjhfWvcP1ZYYnagnf4gj+DBNbw6BvqwySYSez4ElA=',
                signOptions: {
                    expiresIn: '3600s'
                }
                }
            }
        }),
        forwardRef(() => UsersModule),
        PassportModule.register({
            defaultStrategy: 'jwt'
        })
    ],
    providers: [AuthService, JwtStrategy, AuthService]
})
export class AuthModule{}