import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('likes')
export class Like{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    cat_id:string

    @Column({nullable:true, type:"timestamptz"})
    created_at:string

    @ManyToOne(() => User, user => user.likes)
    user: User
}