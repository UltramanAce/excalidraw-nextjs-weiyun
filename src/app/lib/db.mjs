import mysql from 'mysql2/promise'; // 使用 promise 版本的 mysql2
import * as dotenv from 'dotenv';

// 加载 .env.local 文件中的环境变量
dotenv.config({ path: '.env.local' });

const pool = mysql.createPool({
  host: process.env.DB_HOST,             // 数据库主机地址
  user: process.env.DB_USER,             // 数据库用户名
  password: process.env.DB_PASSWORD,     // 数据库密码
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306, // 确保 port 是 number 类型
  waitForConnections: true,              // 是否等待连接池中的连接
  connectionLimit: 10,                   // 最大连接数
  queueLimit: 0                          // 最大排队数
});

export { pool }