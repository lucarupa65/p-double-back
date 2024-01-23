import { Injectable } from '@nestjs/common';
import { CreateTickestInput } from './dto/create-tickest.input';
import { UpdateTickestInput } from './dto/update-tickest.input';

@Injectable()
export class TickestService {
  create(createTickestInput: CreateTickestInput) {
    return 'This action adds a new tickest';
  }

  findAll() {
    return `This action returns all tickest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tickest`;
  }

  update(id: number, updateTickestInput: UpdateTickestInput) {
    return `This action updates a #${id} tickest`;
  }

  remove(id: number) {
    return `This action removes a #${id} tickest`;
  }
}
