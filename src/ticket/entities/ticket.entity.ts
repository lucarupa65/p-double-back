import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'tickets' })
@ObjectType()
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field(() => String)
  descrition: string;

  @Column()
  @Field(() => Boolean)
  state: boolean;

  // usres
  @ManyToOne(() => User, (user) => user.tickest, {
    nullable: false,
    lazy: true,
  })
  @Index('userId-index')
  @Field(() => User)
  userCreateBy: User;

  @ManyToOne(() => User, (user) => user.id, {
    nullable: true,
    lazy: true,
  })
  @JoinColumn({ name: 'lastUpdateBy' })
  @Field(() => User, { nullable: true })
  lastUpdateBy?: User;
}
