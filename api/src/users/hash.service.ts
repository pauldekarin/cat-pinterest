import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { createHash } from "crypto";
import { User } from "src/entities/user.entity";

@Injectable()
export class HashService{
    hash(value: string): string{
        return createHash('sha256').update(value).digest('hex')
    }

    validate(user: User, hash: string): boolean{
        return this.hash(user.password) == hash;
    }
}