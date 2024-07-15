import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
    constructor(private postsServices: PostsService){}

    @Get()
    async findPosts(){
        return await this.postsServices.findAll();
    }

    @Get(':id')
    async findPost(@Param('id')id){
        return await this.postsServices.findOneByID(id);
    }

    @Get('user/:id')
    async findUserPosts(@Param('id')id){
        return await this.postsServices.findByUser({id});
    }

    @Post()
    async createPost(
        @Body('user')user,
        @Body('community')community,
        @Body('content')content,
        @Body('id')id,
        ){
        return await this.postsServices.createPost({user, community, content, id})
    }

    @Put(':id')
    async updatePost(
        @Param('id')id,
        @Body('content')content,
    ){
        return await this.postsServices.updatePost(id,{content});
    }

    @Delete(':id')
    async deletePost(@Param('id')id){
        return await this.postsServices.removePost(id);
    }

}
