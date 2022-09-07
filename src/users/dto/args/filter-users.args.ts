import { ArgsType, Field } from '@nestjs/graphql';
import { IsIn, IsOptional, IsString } from 'class-validator';
import { IsDateFormat } from '../../../common/validators/is-date-format.decorator';

@ArgsType()
export class FilterUsersArgs {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  username?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDateFormat()
  dob_from?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDateFormat()
  dob_to?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  occupation?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  sortBy?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsIn(['ASC', 'DESC'])
  sortDirection?: 'ASC' | 'DESC';
}
