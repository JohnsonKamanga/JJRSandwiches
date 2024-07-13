import { User } from 'src/users/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToMany, JoinTable } from 'typeorm'

@Entity()
export class Community {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: ''})
    name: string;

    @Column({default: ''})
    description: string;

    @CreateDateColumn({ type: "timestamp", default: ()=> "CURRENT_TIMESTAMP(6)"})
    createdAt: Date;

    @ManyToMany(()=> User, (user)=> user.communities, {
        cascade: true,
    })
    @JoinTable()
    members: User[];
}
