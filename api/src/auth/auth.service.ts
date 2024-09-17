// src/auth/auth.service.ts

import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService, // Исправлено имя переменной
    ) {}

    async validateUser(login: string, password: string) {
        // Реализация валидации пользователя
    }

    async login(user: any) {
        const payload = { id: user.id, login: user.login };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}