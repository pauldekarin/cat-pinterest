import { IsString } from "class-validator";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Like } from './like.entity'

@Entity('users')
export class User{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    login: string;

    @Column()
    password: string;

    @OneToMany(() => Like, like => like.user)
    likes: Like[];
}