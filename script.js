let compressedFile;

function handleFileUpload(files) {
  if (files.length > 0) {
    const file = files[0];
    const fileInfo = `文件名: ${file.name}, 大小: ${(file.size / 1024).toFixed(2)} KB`;
    document.getElementById('file-info').textContent = fileInfo;
    document.getElementById('compress-btn').disabled = false;
    document.getElementById('decompress-btn').disabled = false;
  } else {
    document.getElementById('file-info').textContent = '';
    document.getElementById('compress-btn').disabled = true;
    document.getElementById('decompress-btn').disabled = true;
  }
}

document.getElementById('compress-btn').addEventListener('click', async () => {
  const file = document.getElementById('file-input').files[0];
  compressedFile = await compressFile(file);
  document.getElementById('file-info').textContent += ', 压缩后大小: ${(compressedFile.size / 1024).toFixed(2)} KB';
  saveCompressedFile(compressedFile);
});

document.getElementById('decompress-btn').addEventListener('click', async () => {
  const decompressedFile = await decompressFile(compressedFile);
  downloadFile(decompressedFile, compressedFile.name);
});

async function compressFile(file) {
  // 使用 Pako 库进行 gzip 压缩
  const compressedData = await new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      reader.onload = () => {
        const compressed = pako.gzip(reader.result);
        resolve(new Blob([compressed], { type: file.type }));
      };
      reader.readAsArrayBuffer(file);
    } catch (error) {
      reject(error);
    }
  });
  return compressedData;
}

async function decompressFile(file) {
  // 使用 Pako 库进行 gzip 解压
  const decompressedData = await new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      reader.onload = () => {
        const decompressed = pako.ungzip(reader.result);
        resolve(new Blob([decompressed], { type: file.type }));
      };
      reader.readAsArrayBuffer(file);
    } catch (error) {
      reject(error);
    }
  });
  return decompressedData;
}

function saveCompressedFile(file) {
  // 将压缩后的文件保存到 IndexedDB
  const db = new Dexie('ZippyDB');
  db.version(1).stores({ compressedFiles: '++id,file' });
  db.compressedFiles.add({ file: file }).then(() => {
    console.log('Compressed file saved to IndexedDB');
  }).catch((error) => {
    console.error('Error saving compressed file to IndexedDB:', error);
  });
}

function downloadFile(file, fileName) {
  const url = URL.createObjectURL(file);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
