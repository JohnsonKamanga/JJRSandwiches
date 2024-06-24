import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";
import { Instruction } from './instruction.entity';

@Injectable()
export class InstructionService {

    constructor(
        @InjectRepository(Instruction)
        private instructionRepository: Repository<Instruction>,
    ){}
}
