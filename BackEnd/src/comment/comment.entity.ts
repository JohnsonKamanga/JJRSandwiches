import { Post } from 'src/posts/post.entity';
import { SubComment } from 'src/sub-comment/sub-comment.entity';
import { User } from 'src/users/user.entity';
import {
    Entity,
    Column,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    OneToMany,
    ManyToOne,
  } from 'typeorm';

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({default:'', type: "text"})
    content:string;

    @CreateDateColumn({ type: "timestamp", default: ()=> "CURRENT_TIMESTAMP(6)"})
    commentedAt: Date;

    @UpdateDateColumn()
    editedAt: Date;

    @ManyToOne(()=>Post)
    post: Post;

    @ManyToOne(()=>User, (user)=>{user.comments})
    user: User;

}