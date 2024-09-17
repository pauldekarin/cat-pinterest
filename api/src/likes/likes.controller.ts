// likes.controller.ts

import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Req, Res, UseGuards } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like } from "src/entities/like.entity";
import { Repository } from "typeorm";
import { LikesService } from "./likes.service";
import { JwtAuthGuard } from "src/auth/auth.guard";
import { Response, Request } from 'express'
import { JwtService } from "@nestjs/jwt";

@Controller('likes')
export class LikesController{
    constructor(
        private readonly likesService: LikesService,
        private readonly jwtService: JwtService
    ){}

    private getUserIdFromToken(token: string): number{
        const decodedToken = this.jwtService.decode(token) as { id: number };
        return decodedToken.id;
    }
    @UseGuards(JwtAuthGuard)
    @Get()
    @HttpCode(HttpStatus.OK)
    async listLikes(@Res() res: Response, @Req() req: Request): Promise<void>{
        const userId = this.getUserIdFromToken(req.headers.authorization.split(' ')[1]);
        const likes = await this.likesService.listLikes(userId);
        res.status(HttpStatus.OK).json(likes);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async newLike(@Body() likeData: Like, @Res() res: Response, @Req() req: Request){
        const userId = this.getUserIdFromToken(req.headers.authorization.split(' ')[1]);
        try{
            const like = await this.likesService.newLike(userId, likeData);
            res.status(HttpStatus.CREATED).send({
                cat_id: likeData.cat_id,
                created_at: likeData.created_at
            });
        }catch(error){
            res.status(HttpStatus.METHOD_NOT_ALLOWED).send();
        }
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':cat_id')
    async dropLike(@Param('cat_id') cat_id: string, @Res() res: Response, @Req() req: Request): Promise<void>{
        const userId = this.getUserIdFromToken(req.headers.authorization.split(' ')[1]);
        const found = await this.likesService.findById(userId,cat_id);
        if(found){
            this.likesService.dropLike(userId, cat_id);
            res.status(HttpStatus.OK).send();
        }else{
            res.status(HttpStatus.NOT_FOUND).send();
        }
    }
}