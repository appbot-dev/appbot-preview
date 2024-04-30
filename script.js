// IndexedDB 数据库操作 const request = window.indexedDB.open('zippy-db', 1); request.onupgradeneeded = (event) => {
  const db = event.target.result;
  const objectStore = db.createObjectStore('compressions', { keyPath: 'id' });
  objectStore.createIndex('filename', 'filename', { unique: false });
};
// 压缩文件 const compressFile = async (file, filename) => {
  try {
    // 文件类型检查
    if (!['application', 'image', 'video'].some(type => file.type.startsWith(type))) {
      throw new Error('只允许上传文档、图片和视频文件');
    }

    // 压缩文件
    const compressedFile = await compressFileData(file);

    // 保存压缩记录到 IndexedDB
    saveCompressionRecord(filename, compressedFile);

    // 下载压缩文件
    downloadFile(filename, compressedFile);
  } catch (error) {
    showErrorMessage(error.message);
  }
};
// 解压文件 const decompressFile = async (file, folderName) => {
  try {
    // 文件类型检查
    if (!file.type.endsWith('zip')) {
      throw new Error('只允许上传 ZIP 格式的压缩文件');
    }

    // 解压文件
    const extractedFiles = await extractFileData(file);

    // 保存解压记录到 IndexedDB
    saveDecompressionRecord(folderName, extractedFiles);

    // 下载解压后的文件
    downloadFolder(folderName, extractedFiles);
  } catch (error) {
    showErrorMessage(error.message);
  }
};
// 其他辅助函数...