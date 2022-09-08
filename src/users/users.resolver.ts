import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/input/create-user.input';
import * as moment from 'moment';
import { FilterUsersArgs } from './dto/args/filter-users.args';
import { PaginatedUser } from './paginated.output';
import { PaginationArgs } from '../common/graphql/args/pagination.args';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.usersService.create(createUserInput);
  }

  @Query(() => [User], { name: 'userList' })
  async getList(@Args() filterUsersArgs: FilterUsersArgs): Promise<User[]> {
    const users = await this.usersService.getList(filterUsersArgs);
    return users;
  }

  @Query(() => PaginatedUser, { name: 'search' })
  async search(
    @Args() paginationArgs: PaginationArgs,
    @Args() filterUsersArgs: FilterUsersArgs,
  ): Promise<PaginatedUser> {
    return this.usersService.search(paginationArgs, filterUsersArgs);
  }

  @Query(() => User, { name: 'user', nullable: true })
  async findOne(@Args('id', { type: () => Int }) id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @ResolveField('age', () => Int, { nullable: true })
  age(@Parent() user: User): number | null {
    const age = user.dob ? moment().diff(user.dob, 'years') : null;
    return age;
  }
}
