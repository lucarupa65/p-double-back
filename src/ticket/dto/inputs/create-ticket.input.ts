import { InputType, Field } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, minLength } from 'class-validator';

@InputType()
export class CreateTicketInput {

  @Field( () => String)
  @IsNotEmpty()
  @IsString()
  descrition: string;

  @Field(() => Boolean, { nullable: true })
  @IsBoolean()
  @IsOptional()
  state?: boolean


}
