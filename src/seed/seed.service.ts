import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


import { Ticket } from 'src/ticket/entities/ticket.entity';
import { User } from 'src/users/entities/user.entity';

import { UsersService } from 'src/users/users.service';
import { TicketService } from 'src/ticket/ticket.service';

import { SEED_TICKETS, SEED_USERS } from './data/seed-data';

@Injectable()
export class SeedService {

    private isProd: boolean;

    constructor (
        private readonly configService: ConfigService,
        @InjectRepository(Ticket)
        private readonly ticketsRepository: Repository<Ticket>,
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        private readonly userService: UsersService,
        private readonly ticketService: TicketService
    ) {
        this.isProd = this.configService.get('STATE') === 'prod';
    }

    async executeSeed(): Promise<boolean> {

        if (this.isProd) {
            throw new UnauthorizedException('Los Seed no se puede ejecutar en produccion ')
        }

        await this.deleteDataBase();

        const user = await this.loadUsers()

        await this.loadTicket( user );

        return true
    }

    async deleteDataBase() {
        
        await this.ticketsRepository.createQueryBuilder().delete().where({}).execute();
        await this.usersRepository.createQueryBuilder().delete().where({}).execute();
    }

    async loadUsers(): Promise<User> {
        const users = [];

        for ( const user of SEED_USERS ) {
            users.push( await this.userService.create(user) )
        }

        return users[0]

    }

    async loadTicket(user: User): Promise<void> {
        const ticketsPromises = [];
        for (const item of SEED_TICKETS ) {
            ticketsPromises.push( this.ticketService.create( item, user ) );
        }

        await Promise.all( ticketsPromises );
    }

}
