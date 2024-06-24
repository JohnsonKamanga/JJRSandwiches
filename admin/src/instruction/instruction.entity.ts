import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Instruction{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    instruction: string;
}