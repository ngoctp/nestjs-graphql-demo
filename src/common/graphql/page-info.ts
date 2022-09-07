import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class PageInfo {
  @Field()
  totalCount: number;

  @Field()
  nodeCount: number;

  @Field()
  nodesPerPage: number;

  @Field()
  currentPage: number;

  @Field()
  totalPages: number;
}
