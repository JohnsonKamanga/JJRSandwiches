import { Recipe } from "src/recipe/recipe.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({default : ''})
    username: string;

    @Column({default : ''})
    userEmail: string;

    @Column({default : ''})
    firstName: string;

    @Column({default : ''})
    lastName: string;

    @Column({default : ''})
    password: string;

    @Column({default : ''})
    location: string;

    @Column({default : ''})
    bio: string;

    @Column({default : '9999-01-01'})
    dob: string;

    @Column({default : ''})
    profilePicture: string;

    @Column({default : false})
    isActive: boolean;

    @OneToMany((type)=> Recipe, (recipe)=> recipe.user)
    recipes: Recipe[];
}