import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({default : ''})
    firstName: string;

    @Column({default : ''})
    lastName: string;

    @Column({default : false})
    isActive: boolean;
}