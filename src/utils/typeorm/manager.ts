import { EntityManager } from 'typeorm';
import { Context, Layer } from '../../prelude';
import { getService } from '../runtime';

export const EntityManagerTag = Context.Tag<EntityManager>();

export const EntityManagerLive = Layer.effect(
  EntityManagerTag,
  getService(EntityManager),
);
