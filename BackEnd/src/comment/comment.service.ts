import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { Post } from 'src/posts/post.entity';
import { SubComment } from 'src/sub-comment/sub-comment.entity';
import { SubCommentService } from 'src/sub-comment/sub-comment.service';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment)
        private commentsRepository: Repository<Comment>,
        private subCommentsServices: SubCommentService,
    ){}

    async findAll(): Promise<Comment[]>{
        return await this.commentsRepository.find();
    }

    async findOneByID(id): Promise<Comment | null>{
        return await this.commentsRepository.findOne({
            where:{
                id: id,
            },
            relations:{
                user:true,
                post:true,
            }
        })
    }

    async findByPost(post): Promise<Comment[]>{
        return this.commentsRepository
                   .createQueryBuilder()
                   .relation(Post, "comments")
                   .of(post)
                   .loadMany();
    }


    async findSubComments(id): Promise<SubComment[]>{
        return this.subCommentsServices.findByComment({id});
    }

    async createComment(body): Promise<Comment | null>{
        return await this.commentsRepository.save(body);
    }

    async updateComment(id, data): Promise<any>{
        return await this.commentsRepository.update(id, data);
    }

    async removeComment(id): Promise<void>{
        await this.commentsRepository.delete(id);
    }

}