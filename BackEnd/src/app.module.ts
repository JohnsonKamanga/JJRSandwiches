import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecipeModule } from './recipe/recipe.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngredientsModule } from './ingredient/ingredient.module';
import { InstructionsModule } from './instruction/instruction.module';
import { AuthModule } from './auth/auth.module';
import { CommunitiesModule } from './communities/communities.module';
import { PostsModule } from './posts/posts.module';
import { CommentModule } from './comment/comment.module';
import { SubCommentModule } from './sub-comment/sub-comment.module';

@Module({
  imports: [
    RecipeModule,
    UsersModule,
    IngredientsModule,
    InstructionsModule,

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'johnson',
      database: 'jjrsandwiches',
      autoLoadEntities: true,//remember to change to entities: [] before deploying
      synchronize: true,
    }),

    AuthModule,

    CommunitiesModule,

    PostsModule,

    CommentModule,

    SubCommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
