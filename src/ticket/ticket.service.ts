import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTicketInput, UpdateTicketInput } from './dto/inputs';
import { Ticket } from './entities/ticket.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
  ) {}

  async create(createTicketInput: CreateTicketInput): Promise<Ticket> {
    const newTicket = this.ticketRepository.create(createTicketInput);
    newTicket.state = false;

    return await this.ticketRepository.save(newTicket);
  }

  async findAll(): Promise<Ticket[]> {
    return this.ticketRepository.find();
  }

  async findOne(id: string): Promise<Ticket> {
    const ticket = await this.ticketRepository.findOneBy({ id });

    if (!ticket)
      throw new NotFoundException(
        `El ticket con el ID: #${id} no fue encontrado`,
      );

    return ticket;
  }

  async update(
    id: string,
    updateTicketInput: UpdateTicketInput,
  ): Promise<Ticket> {
    const ticket = await this.ticketRepository.preload(updateTicketInput);

    if (!ticket)
      throw new NotFoundException(
        `El ticket con el ID: #${id} no fue encontrado`,
      );

    return this.ticketRepository.save(ticket);
  }

  async remove(id: string): Promise<Ticket> {
    const ticket = await this.findOne(id);
    await this.ticketRepository.remove(ticket);
    return { ...ticket, id };
  }
}
