import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService ){

    }

    @Get()
    async getUsers(){
        return await this.userService.findAll();
    }

    @Get(':id')
    async getUser(@Param('id')id : number){
        return await this.userService.findOne(id);
    }

    @Delete(':id')
    async removeUser(@Param('id')id : number){

        return await this.userService.remove(id);
    }

    @Post()
    async createUser(
        @Body('firstName') firstName : string,
        @Body('lastName') lastName : string,
        @Body('isActive') isActive : boolean,
    ){
           return await this.userService.create({firstName, lastName, isActive});
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body('firstName') firstName : string,
        @Body('lastName') lastName : string,
        @Body('isActive') isActive : boolean,
    ){
        return this.userService.update(id, {firstName, lastName, isActive});
    }
}
