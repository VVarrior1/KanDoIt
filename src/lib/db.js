import mysql from "mysql2/promise";

//once we host the database, we should update these:
const pool = mysql.createPool({
  host: "localhost", 
  user: "root",      
  password: "kandoitpassword", 
  database: "kandoit_db", 
});

export default pool;