export default {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "Vishman2@sql",
  DB: "users",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 5000,
    idle: 3306,
  },
};
