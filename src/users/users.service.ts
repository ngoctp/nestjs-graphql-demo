import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate } from '../common/graphql/paginate';
import { Repository } from 'typeorm';
import { FilterUsersArgs } from './dto/args/filter-users.args';
import { PaginationArgs } from '../common/graphql/args/pagination.args';
import { CreateUserInput } from './dto/input/create-user.input';
import { PaginatedUser } from './paginated.output';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserInput: CreateUserInput) {
    const user = this.usersRepository.create({
      ...createUserInput,
    });
    const userRecord = await this.usersRepository.save(user);
    return userRecord;
  }

  protected buildQuery(filterUsersArgs: FilterUsersArgs) {
    const query = this.usersRepository.createQueryBuilder('user').select();
    if (filterUsersArgs.name) {
      query.where('user.name = :name', { name: filterUsersArgs.name });
    }
    if (filterUsersArgs.occupation) {
      query.where('user.occupation = :occupation', {
        occupation: filterUsersArgs.occupation,
      });
    }
    if (filterUsersArgs.username) {
      query.where('user.username = :username', {
        username: filterUsersArgs.username,
      });
    }
    if (filterUsersArgs.dob_from) {
      query.where('user.dob >= :dob_from', {
        dob_from: filterUsersArgs.dob_from,
      });
    }
    if (filterUsersArgs.dob_to) {
      query.where('user.dob <= :dob_to', {
        dob_to: filterUsersArgs.dob_to,
      });
    }

    const sortableFields = ['id', 'name', 'occupation', 'username', 'dob'];
    if (
      filterUsersArgs.sortBy &&
      sortableFields.indexOf(filterUsersArgs.sortBy) > -1
    ) {
      query.orderBy(
        'user.' + filterUsersArgs.sortBy,
        filterUsersArgs.sortDirection,
      );
    }

    return query;
  }

  async getList(filterUsersArgs: FilterUsersArgs): Promise<User[]> {
    const query = this.buildQuery(filterUsersArgs);

    return query.getMany();
  }

  async search(
    paginationArgs: PaginationArgs,
    filterUsersArgs: FilterUsersArgs,
  ): Promise<PaginatedUser> {
    const query = this.buildQuery(filterUsersArgs);

    return paginate(query, paginationArgs);
  }

  async findOne(id: number) {
    return this.usersRepository.findOneBy({ id });
  }
}
