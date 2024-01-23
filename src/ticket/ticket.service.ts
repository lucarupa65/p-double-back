import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTicketInput, UpdateTicketInput } from './dto/inputs';
import { Ticket } from './entities/ticket.entity';
import { User } from 'src/users/entities/user.entity';
import { ValidRoles } from 'src/auth/enums/valid-roles.enum';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
  ) {}

  private IsAdmin(currentUser: User): boolean {
    let isAdmin = false;
    for (const role of currentUser.roles) {
      if (role === ValidRoles.admin) isAdmin = true;
    }
    return isAdmin;
  }

  async create(
    createTicketInput: CreateTicketInput,
    userCreateBy: User,
  ): Promise<Ticket> {
    const newTicket = this.ticketRepository.create(createTicketInput);
    newTicket.userCreateBy = userCreateBy;
    newTicket.state = createTicketInput.state ? createTicketInput.state : false;

    return await this.ticketRepository.save(newTicket);
  }

  async findAll(currentUser: User): Promise<Ticket[]> {
    if (this.IsAdmin(currentUser)) return this.ticketRepository.find();
    return this.ticketRepository.findBy({
      userCreateBy: currentUser,
    });
  }

  async findOne(id: string, currentUser: User): Promise<Ticket> {
    let ticket: Ticket;
    if (this.IsAdmin(currentUser)) {
      ticket = await this.ticketRepository.findOneBy({ id });
    } else {
      ticket = await this.ticketRepository.findOneBy({
        id,
        userCreateBy: { id: currentUser.id },
      });
    }

    if (!ticket)
      throw new NotFoundException(
        `El ticket con el ID: #${id} no fue encontrado`,
      );

    return ticket;
  }

  async update(
    id: string,
    updateTicketInput: UpdateTicketInput,
    currentUser: User,
  ): Promise<Ticket> {

    await this.findOne(id, currentUser)

    const ticket = await this.ticketRepository.preload({
      ...updateTicketInput,
      lastUpdateBy: currentUser,
    });

    return this.ticketRepository.save(ticket);
  }

  async remove(id: string, currentUser: User): Promise<Ticket> {
    const ticket = await this.findOne(id, currentUser);
    await this.ticketRepository.remove(ticket);
    return { ...ticket, id };
  }
}
