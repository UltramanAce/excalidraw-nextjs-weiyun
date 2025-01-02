import { pool } from '../../lib/db.mjs';

export async function POST(req: Request) {
  let connection;
  try {
    // 获取连接
    connection = await pool.getConnection();

    // 切换到目标数据库
    await connection.query('USE excalidraw_libraries_db');

    // 解析请求体中的 JSON 数据
    const body = await req.json();
    const { query } = body;

    if (!query) {
      return new Response(JSON.stringify({ error: '缺少查询参数' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 构建 SQL 查询语句，注意防止 SQL 注入
    const [data] = await connection.query(
      `
        SELECT * FROM list
        WHERE LOWER(name) LIKE LOWER(?)
           OR LOWER(description) LIKE LOWER(?)
           OR JSON_SEARCH(authors, 'one', ?) IS NOT NULL
           OR JSON_SEARCH(item_names, 'one', ?) IS NOT NULL
      `,
      [`%${query.toLowerCase()}%`, `%${query.toLowerCase()}%`, query.toLowerCase(), query.toLowerCase()]
    );

    // 返回的响应
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    // 错误处理
    console.error('Error in search route:', error);
    return new Response(JSON.stringify({ error: '无法获取数据' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  } finally {
    if (connection) {
      connection.release(); // 释放连接回连接池
    }
  }
}