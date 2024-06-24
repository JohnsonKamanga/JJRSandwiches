import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Instruction } from './instruction.entity';
import { InstructionService } from './instruction.service'

@Module({
  imports: [TypeOrmModule.forFeature([Instruction])],
  providers: [InstructionService],
  
})
export class InstructionsModule {}
