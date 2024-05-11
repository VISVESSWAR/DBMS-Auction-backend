export default{
    HOST: "localhost",
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