import type { Options } from '@mikro-orm/core';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { NotFoundException } from '@nestjs/common';
export default {
  entities: ['./dist/**/*.entity.js'],
  entitiesTs: ['./src/**/*.entity.ts'],
  type: 'postgresql',
  metadataProvider: TsMorphMetadataProvider,
  debug: true,
  forceUtcTimezone: true,
  allowGlobalContext: true,
  findOneOrFailHandler: (entityName: string) => {
    throw new NotFoundException(`${entityName} not found`);
  },
} as Options;
