// insertLibraryData.js
const { promisePool } = require('./lib/db');

async function insertLibraryData(libraryData) {
  try {
    const [results] = await promisePool.query(
      `
        INSERT INTO libraries (type, version, source, library_items)
        VALUES (?, ?, ?, ?)
      `,
      [
        libraryData.type,
        libraryData.version,
        libraryData.source,
        JSON.stringify(libraryData.libraryItems || libraryData.library)
      ]
    );
    console.log(`Inserted library data with ID ${results.insertId}`);
  } catch (error) {
    console.error('Error inserting library data:', error);
  }
}

// 示例数据
const libraryData1 = {
  "type": "excalidrawlib",
  "version": 2,
  "source": "https://excalidraw.com",
  "libraryItems": [
    {
      "status": "published",
      "elements": [
        {
          "id": "Uluiqw08oo8Mls40ra_4E",
          "type": "ellipse",
          "x": 1226.6857638888896,
          "y": 465.3394097222224,
          "width": 155.54253472222206,
          "height": 37.11371527777783,
          "angle": 0,
          "strokeColor": "#000000",
          "backgroundColor": "#ced4da",
          "fillStyle": "solid",
          "strokeWidth": 1,
          "strokeStyle": "solid",
          "roughness": 1,
          "opacity": 100,
          "groupIds": ["oY_3Nr1ZhYMXooDGqC6dr"],
          "strokeSharpness": "sharp",
          "seed": 896850279,
          "version": 247,
          "versionNonce": 1652111815,
          "isDeleted": false,
          "boundElements": null,
          "updated": 1639665156472
        },
        {
          "id": "_1xf_DCmDpOu3YhNN9zcR",
          "type": "line",
          "x": 1227.6319444444437,
          "y": 321.3984375000001,
          "width": 157.8862847222224,
          "height": 163.75,
          "angle": 0,
          "strokeColor": "#ced4da",
          "backgroundColor": "#ced4da",
          "fillStyle": "solid",
          "strokeWidth": 1,
          "strokeStyle": "solid",
          "roughness": 1,
          "opacity": 100,
          "groupIds": ["oY_3Nr1ZhYMXooDGqC6dr"],
          "strokeSharpness": "sharp",
          "seed": 211752585,
          "version": 329,
          "versionNonce": 136669737,
          "isDeleted": false,
          "boundElements": null,
          "updated": 1639665156472,
          "points": [
            [0, 0],
            [-0.24305555555567082, 162.33506944444446],
            [157.64322916666674, 162.33940972222229],
            [157.0355902777776, -1.4105902777777146],
            [0, 0]
          ],
          "lastCommittedPoint": [5.203993055555429, 1.3541666666666283],
          "startBinding": null,
          "endBinding": null,
          "startArrowhead": null,
          "endArrowhead": null
        }
      ],
      "id": "cYFPr9pqC5ah8DUpuHzFB",
      "created": 1639665256530,
      "name": "cylinder"
    }
  ]
};

const libraryData2 = {
  "type": "excalidrawlib",
  "version": 1,
  "source": "https://excalidraw.com",
  "library": [
    [
      {
        "type": "ellipse",
        "version": 1452,
        "versionNonce": 180867888,
        "isDeleted": false,
        "id": "pfH8eDbMWVs3zABwRF-8x",
        "fillStyle": "solid",
        "strokeWidth": 2,
        "strokeStyle": "solid",
        "roughness": 0,
        "opacity": 100,
        "angle": 0,
        "x": 947.1015624999998,
        "y": 737.4230238970592,
        "strokeColor": "#000",
        "backgroundColor": "#fff",
        "width": 74.05101102941174,
        "height": 76.09604779411757,
        "seed": 161804592,
        "groupIds": ["35TRTK9eVyZM_a-zjg5zu"],
        "strokeSharpness": "sharp",
        "boundElementIds": []
      },
      {
        "type": "ellipse",
        "version": 593,
        "versionNonce": 1152792528,
        "isDeleted": false,
        "id": "SwOcns-xn_dzcS-IuAVMd",
        "fillStyle": "hachure",
        "strokeWidth": 2,
        "strokeStyle": "solid",
        "roughness": 0,
        "opacity": 100,
        "angle": 0,
        "x": 963.8139328071966,
        "y": 753.18430416976,
        "strokeColor": "#000000",
        "backgroundColor": "transparent",
        "width": 39.10563151041674,
        "height": 10.753995455228363,
        "seed": 71432656,
        "groupIds": ["48zFpaltK-FGnlSzA4NWt", "35TRTK9eVyZM_a-zjg5zu"],
        "strokeSharpness": "round",
        "boundElementIds": []
      },
      {
        "type": "line",
        "version": 1371,
        "versionNonce": 851832112,
        "isDeleted": false,
        "id": "GWrEnyMrPwERn7VxVqBj9",
        "fillStyle": "hachure",
        "strokeWidth": 2,
        "strokeStyle": "solid",
        "roughness": 0,
        "opacity": 100,
        "angle": 0,
        "x": 964.4406911352273,
        "y": 759.2236178068733,
        "strokeColor": "#000000",
        "backgroundColor": "transparent",
        "width": 38.58148220977114,
        "height": 40.48662140675077,
        "seed": 1414482736,
        "groupIds": ["48zFpaltK-FGnlSzA4NWt", "35TRTK9eVyZM_a-zjg5zu"],
        "strokeSharpness": "round",
        "boundElementIds": [],
        "startBinding": null,
        "endBinding": null,
        "lastCommittedPoint": null,
        "startArrowhead": null,
        "endArrowhead": null,
        "points": [
          [0, 0],
          [1.8232186203809988, 32.468548022424216],
          [6.768312737880933, 37.98883103590748],
          [20.34867663261207, 40.48662140675077],
          [32.537268066406114, 38.400380608974274],
          [38.58148220977114, 31.49610332414204],
          [38.295773237179446, 0.09767190004004078]
        ]
      }
    ]
  ]
};

// 插入示例数据
(async () => {
  await insertLibraryData(libraryData1);
  await insertLibraryData(libraryData2);
})();