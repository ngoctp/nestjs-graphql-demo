import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '../common/graphql/paginated';
import { User } from './entities/user.entity';

@ObjectType()
export class PaginatedUser extends Paginated(User) {}
