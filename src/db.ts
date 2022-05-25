import { Sequelize } from 'sequelize-typescript'
import { config } from './config'

export const sequelize = new Sequelize({
  database: config.PGDATABASE,
  host: config.PGHOST,
  port: config.PGPORT,
  dialect: 'postgres',
  username: config.PGUSER,
  password: config.PGPASSWORD,
  models: [__dirname + '/models'] // or [Player, Team],
})