// IndexedDB setup const request = indexedDB.open('zippy_db', 1); request.onupgradeneeded = (event) => {
  const db = event.target.result;
  db.createObjectStore('files', { keyPath: 'name' });
};
// File compression/decompression functions const compressFile = async (file) => {
  const compressed = await pako.gzip(await file.arrayBuffer());
  return compressed;
};
const decompressFile = async (compressed) => {
  const decompressed = await pako.ungzip(compressed, { to: 'string' });
  return decompressed;
};
// Event listeners document.getElementById('compress-btn').addEventListener('click', async () => {
  const fileInput = document.getElementById('file-input');
  const file = fileInput.files[0];
  if (file) {
    const compressed = await compressFile(file);
    saveFile(file.name, compressed);
  }
});
document.getElementById('decompress-btn').addEventListener('click', async () => {
  const fileInput = document.getElementById('file-input');
  const file = fileInput.files[0];
  if (file) {
    const compressed = await readFile(file.name);
    const decompressed = await decompressFile(compressed);
    // Display decompressed content or download the file
  }
});
// IndexedDB file management const saveFile = (name, data) => {
  const request = indexedDB.open('zippy_db', 1);
  request.onsuccess = (event) => {
    const db = event.target.result;
    const transaction = db.transaction(['files'], 'readwrite');
    const store = transaction.objectStore('files');
    store.put({ name, data });
  };
};
const readFile = (name) => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('zippy_db', 1);
    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction(['files'], 'readonly');
      const store = transaction.objectStore('files');
      const getRequest = store.get(name);
      getRequest.onsuccess = () => {
        resolve(getRequest.result.data);
      };
      getRequest.onerror = () => {
        reject(new Error('Failed to read file from IndexedDB'));
      };
    };
  });
};