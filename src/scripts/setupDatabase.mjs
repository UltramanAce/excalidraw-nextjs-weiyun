import { pool } from '../app/lib/db.mjs';

async function main() {
  let connection;
  try {
    // 获取连接
    connection = await pool.getConnection();

    // 创建数据库
    await connection.execute('CREATE DATABASE IF NOT EXISTS excalidraw_libraries_db');
    console.log('Database created or already exists.');

    // 切换到新创建的数据库
    await connection.query('USE excalidraw_libraries_db');

    // 创建 list 表
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS list (
        id CHAR(10) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        authors JSON,
        source VARCHAR(255),
        preview VARCHAR(255),
        created DATE,
        updated DATE,
        version INT,
        item_names JSON
      )
    `);
    console.log('Table "list" created or already exists.');

    // 创建 libraries 表
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS libraries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        type VARCHAR(50) NOT NULL,
        version INT NOT NULL,
        source VARCHAR(255),
        library_items JSON
      )
    `);
    console.log('Table "libraries" created or already exists.');
  } catch (error) {
    console.error('Error setting up database:', error);
  } finally {
    if (connection) {
      connection.release(); // 释放连接回连接池
    }
  }
}

main();



