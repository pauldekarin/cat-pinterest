//users.service.ts

import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "../entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class UsersService{
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        private readonly jwtService: JwtService,
        private readonly config: ConfigService
    ){}

    async new(userData : User): Promise<string>{
        const user = await this.usersRepository.save(userData);
        return this.generateToken(user);
    }

    private generateToken(user: User){
        const payload = { id: user.id, login: user.login };
        return this.jwtService.sign( payload, {secret: "b+jjhfWvcP1ZYYnagnf4gj+DBNbw6BvqwySYSez4ElA="} );
    }

    async findById(id: number): Promise<User> {
        const user = await this.usersRepository.findOne({ where: { id } });

        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }

        return user;
    }
}