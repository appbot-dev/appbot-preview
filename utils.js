// 文件压缩 async function compressFileData(file) {
  // 使用 JSZip 库进行文件压缩
  const zip = new JSZip();
  zip.file(file.name, file);
  const compressedData = await zip.generateAsync({ type: 'blob' });
  return compressedData;
}
// 文件解压 async function extractFileData(file) {
  // 使用 JSZip 库进行文件解压
  const zip = new JSZip();
  const zipData = await zip.loadAsync(file);
  const extractedFiles = await Promise.all(
    Object.keys(zipData.files).map(async (filename) => {
      const file = await zipData.files[filename].async('blob');
      return { filename, file };
    })
  );
  return extractedFiles;
}
// 文件下载 function downloadFile(filename, data) {
  const url = URL.createObjectURL(data);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
function downloadFolder(folderName, files) {
  // 创建一个 ZIP 文件并下载
  const zip = new JSZip();
  files.forEach(({