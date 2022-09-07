import { InputType, Field } from '@nestjs/graphql';
import {
  IsOptional,
  IsString,
  IsNotEmpty,
  Matches,
  MinLength,
} from 'class-validator';
import { IsDateFormat } from '../../../common/validators/is-date-format.decorator';
import { MaxDateDynamic } from '../../../common/validators/max-date-dynamic.decorator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsString()
  @MinLength(3)
  @Matches(new RegExp('^[a-zA-Z0-9\\.\\-_]+$'), { message: 'Invalid username' })
  username: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDateFormat()
  @MaxDateDynamic(() => new Date())
  dob: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  occupation: string;
}
