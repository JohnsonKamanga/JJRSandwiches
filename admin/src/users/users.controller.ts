import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { genSalt, hash } from 'bcrypt';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService ){

    }

    @Get()
    async getUsers(){
        return await this.userService.findAll();
    }

    @Get(':username')
    async getUser(@Param('username')username: string){
        return await this.userService.findOne(username);
    }

    @Delete(':id')
    async removeUser(@Param('id')id : number){

        return await this.userService.remove(id);
    }

    @Post()
    async createUser(
        @Body('firstName') firstName : string,
        @Body('lastName') lastName : string,
        @Body('username') username : string,
        @Body('userEmail') userEmail : string,
        @Body('location') location : string,
        @Body('dob') dob : string,
        @Body('bio') bio : string,
        @Body('password') password : string,
        @Body('isActive') isActive : boolean,
    ){     
    
        //generate password salt
        const salt = await genSalt(10);
    
        //use salt to generate hashed password
        password = await hash(password, salt);

        return await this.userService.create({firstName, lastName, username, userEmail, location, dob, bio, password, isActive});
    }

    @UseGuards(AuthGuard)
    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body('firstName') firstName : string,
        @Body('lastName') lastName : string,
        @Body('username') username : string,
        @Body('userEmail') userEmail : string,
        @Body('location') location : string,
        @Body('dob') dob : string,
        @Body('bio') bio : string,
        @Body('password') password : string,
        @Body('isActive') isActive : boolean,
    ){
        return this.userService.update(id, {firstName, lastName, username, userEmail, location, dob, bio, password, isActive});
    }
}
