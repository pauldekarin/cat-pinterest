// users.module.ts

import { Module, forwardRef } from "@nestjs/common";
import { UsersController } from "./users.contoller";
import { UsersService } from "./users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { HashService } from "./hash.service";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { AuthModule } from "src/auth/auth.module";

@Module({
    controllers: [UsersController],
    providers: [UsersService, HashService, JwtService, ConfigService],
    imports: [
        TypeOrmModule.forFeature([User]),
        forwardRef(() => AuthModule)
    ],
    exports: [UsersService]
})

export class UsersModule {}