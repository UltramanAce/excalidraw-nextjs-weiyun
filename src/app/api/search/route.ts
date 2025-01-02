// src/app/api/search/route.ts
import { pool } from '../../lib/db.mjs';

export async function POST(req: Request) {
  try {
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
    const [data] = await pool.query(
      `
        SELECT * FROM list
        WHERE LOWER(name) LIKE LOWER(?)
           OR LOWER(description) LIKE LOWER(?)
           OR JSON_CONTAINS_PATH(authors, 'one', '$[*].name')
              AND JSON_UNQUOTE(JSON_EXTRACT(authors, '$[*].name')) LIKE LOWER(?)
           OR JSON_CONTAINS(item_names, ?)
      `,
      [`%${query}%`, `%${query}%`, `%${query}%`, `"%${query}%"`]
    );

    // 返回的响应
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    // 错误处理
    console.error(error);
    return new Response(JSON.stringify({ error: '无法获取数据' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}