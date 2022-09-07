import { PageInfo } from './page-info';
import { PaginationArgs } from './args/pagination.args';
import { SelectQueryBuilder } from 'typeorm';
import { IPaginatedType } from './paginated';

export async function paginate<T>(
  query: SelectQueryBuilder<T>,
  paginationArgs: PaginationArgs,
  maxLimit = 100,
): Promise<IPaginatedType<T>> {
  const currentPage = paginationArgs.page > 0 ? paginationArgs.page : 1;
  const limit = Math.min(paginationArgs.limit, maxLimit);

  query.take(limit).skip(limit * (currentPage - 1));
  const [result, count] = await query.getManyAndCount();

  const pageInfo = new PageInfo();
  pageInfo.totalCount = count;
  pageInfo.nodeCount = result.length;
  pageInfo.nodesPerPage = limit;
  pageInfo.currentPage = currentPage;
  pageInfo.totalPages = Math.ceil(count / limit);

  return { nodes: result, pageInfo };
}
