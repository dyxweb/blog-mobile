// 复制index.html为404.html
const fs = require('fs');

// 定义源文件路径和新文件名
const sourceFilePath = './docs/index.html'; // 将此处替换为源文件的真实路径
const newFileName = './docs/404.html'; // 将此处替换为想要设置的新文件名（包括后缀）

// 读取源文件内容并写入新文件
fs.readFile(sourceFilePath, (err, data) => {
  if (err) throw err;

  const destinationFilePath = `./${newFileName}`; // 在当前目录创建新文件

  fs.writeFile(destinationFilePath, data, (error) => {
    if (error) throw error;

    console.log(`404.html生成成功!`);
  });
});