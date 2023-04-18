import { Injectable } from '@nestjs/common';
import { Context } from '../prelude';

@Injectable()
export class AnotherService {}

export const AnotherServiceTag = Context.Tag<AnotherService>();
export type AnotherServiceTag = typeof AnotherServiceTag;
