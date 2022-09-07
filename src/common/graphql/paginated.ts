import { Field, ObjectType } from '@nestjs/graphql';
import { Type } from '@nestjs/common';
import { PageInfo } from './page-info';

export interface IPaginatedType<T> {
  nodes: T[];
  pageInfo: PageInfo;
}

export function Paginated<T>(classRef: Type<T>): Type<IPaginatedType<T>> {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedType {
    @Field(() => [classRef], { nullable: true })
    nodes: T[];

    @Field(() => PageInfo, { nullable: true })
    pageInfo: PageInfo;
  }

  return PaginatedType as Type<IPaginatedType<T>>;
}
