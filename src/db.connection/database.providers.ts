import { Sequelize } from 'sequelize-typescript';
import { books } from '../entities/books.entity';
import { users, users_roles, roles } from '../entities/users.entity';

import env from '../enviroment/config'

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: env.Production.DB_HOST,
        port: env.Production.DB_PORT,
        username: env.Production.DB_USER,
        password: env.Production.DB_PASSWORD,
        database: env.Production.DB_NAME,
        define: {
          timestamps: false
        }
      });
      sequelize.addModels([books, users, users_roles, roles]);
      await sequelize.sync();
      return sequelize;
    },
  }
];