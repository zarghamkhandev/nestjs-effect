export * from './data-source';
export * from './manager';
import { findOne } from './find-one';
import { find } from './find';
import { create } from './create';
import { save } from './save';
import { transaction } from './transaction';

export const EffectORM = {
  findOne,
  find,
  create,
  save,
  transaction,
};
