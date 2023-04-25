import { Effect } from '../../prelude';
import { DataSourceTag } from './data-source';

export const EntityManager = Effect.map(
  DataSourceTag,
  (dataSource) => dataSource.manager,
);
