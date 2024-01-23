import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'tickets'})
@ObjectType()
export class Ticket {

  @PrimaryGeneratedColumn('uuid')
  @Field( () => ID )
  id: string;

  @Column()
  @Field(() => String)
  descrition: string;

  @Column()
  @Field(() => Boolean)
  state: boolean;

  // usres

}
