// likes.module.ts

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { Like } from "src/entities/like.entity";
import { LikesController } from "./likes.controller";
import { LikesService } from "./likes.service";
import { UsersService } from "src/users/users.service";
import { AuthModule } from "src/auth/auth.module";
import { JwtStrategy } from "src/auth/auth.strategy";
import { JwtAuthGuard } from "src/auth/auth.guard";
import { UsersModule } from "src/users/users.module";
import { JwtService } from "@nestjs/jwt";

@Module({
    imports: [TypeOrmModule.forFeature([Like]), AuthModule, UsersModule],
    providers: [LikesService, JwtService],
    controllers: [LikesController],
    exports: [LikesService]
})
export class LikesModule{}