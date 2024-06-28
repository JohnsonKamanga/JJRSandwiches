import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecipeModule } from './recipe/recipe.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { IngredientsModule } from './ingredient/ingredient.module';
import { InstructionsModule } from './instruction/instruction.module';
import { AuthModule } from './auth/auth.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
