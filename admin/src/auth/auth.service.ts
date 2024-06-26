import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
    constructor(
        private usersService : UsersService,
        private jwtservice : JwtService
    ){}

    async sigIn(username: string, pass: string): Promise<{access_token : string}>{
        const user = await this.usersService.findOne(username);
        
        //compared stored hash to entered password
        const res = bcrypt.compare(pass, user?.password)
        if(!res){
            throw new UnauthorizedException();
        }

        const payload = {sub: user.id, username: user.username};

        return {
            access_token: await this.jwtservice.signAsync(payload),
        }

    }
}
