import { INestApplication } from '@nestjs/common';
import { DataSource } from 'typeorm';

export async function resetDatabase(app: INestApplication): Promise<void> {
  const dataSource = app.get(DataSource); // get the active DataSource from Nest's DI container

  const entities = dataSource.entityMetadatas;

  for (const entity of entities) {
    const repository = dataSource.getRepository(entity.name);
    await repository.query(
      `TRUNCATE TABLE "${entity.tableName}" RESTART IDENTITY CASCADE;`,
    );
  }
}
