export default{
    HOST: "127.0.0.1",
    USER: "root",
    PASSWORD: "Hari@123",
    DB: "users",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 5000,
      idle: 3306,
    },
};