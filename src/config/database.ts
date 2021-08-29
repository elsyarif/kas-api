import { createConnection, getConnectionManager } from "typeorm";

const connectionManager = getConnectionManager();
export const connection = connectionManager.create({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "test",
  password: "test",
  database: "test",
});

connection.connect();
