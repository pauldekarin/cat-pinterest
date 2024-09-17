// likes.service.ts

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like } from "src/entities/like.entity";
import { UsersService } from "src/users/users.service";
import { Repository } from "typeorm";

@Injectable()
export class LikesService{
    constructor(
        @InjectRepository(Like)
        private readonly likesRepository: Repository<Like>,
        private readonly usersService: UsersService
    ){}

    async listLikes(userId: number): Promise<Like[]>{
        return this.likesRepository.find({ where: {user:{ id:userId }} });
    }

    async newLike(userId: number, likeData: Like): Promise<Like>{
        const cat_id = likeData.cat_id;
        const like = await this.likesRepository.create({
            cat_id,
            user:{
                id: userId
            }
        });
        return this.likesRepository.save(like);
    }

    async findById(userId:number, cat_id: string): Promise<boolean>{
        const like = await this.likesRepository.findOne( {where: {user: {id: userId}, cat_id: cat_id } } );
        console.log(like);
        return like != null ? true : false;
    }

    async dropLike(userId:number, cat_id: string): Promise<void>{
        await this.likesRepository.delete( {cat_id, user: { id : userId } } );
    }
}