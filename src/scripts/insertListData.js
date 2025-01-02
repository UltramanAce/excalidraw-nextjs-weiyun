// insertListData.js
const { promisePool } = require('./lib/db');

async function insertListData(listData) {
  try {
    const [results] = await promisePool.query(
      `
        INSERT INTO list (id, name, description, authors, source, preview, created, updated, version, item_names)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        listData.id,
        listData.name,
        listData.description,
        JSON.stringify(listData.authors),
        listData.source,
        listData.preview,
        new Date(listData.created).toISOString().split('T')[0], // Convert to YYYY-MM-DD format
        new Date(listData.updated).toISOString().split('T')[0], // Convert to YYYY-MM-DD format
        listData.version,
        JSON.stringify(listData.itemNames)
      ]
    );
    console.log(`Inserted list data with ID ${results.insertId}`);
  } catch (error) {
    console.error('Error inserting list data:', error);
  }
}

// 示例数据
const listData1 = {
  "id": "abc123",
  "name": "Sample Library List",
  "description": "This is a sample library list for Excalidraw.",
  "authors": ["John Doe", "Jane Smith"],
  "source": "https://excalidraw.com",
  "preview": "https://example.com/preview.png",
  "created": 1639665256530,
  "updated": 1639665256530,
  "version": 1,
  "itemNames": ["Item 1", "Item 2"]
};

const listData2 = {
  "id": "def456",
  "name": "Another Library List",
  "description": "This is another library list for Excalidraw.",
  "authors": ["Alice Johnson"],
  "source": "https://excalidraw.com",
  "preview": "https://example.com/another-preview.png",
  "created": 1639665256530,
  "updated": 1639665256530,
  "version": 1,
  "itemNames": ["Item A", "Item B"]
};

// 插入示例数据
(async () => {
  await insertListData(listData1);
  await insertListData(listData2);
})();