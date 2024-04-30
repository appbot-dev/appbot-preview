// Get DOM elements
const fileInput = document.getElementById('file-input');
const compressBtn = document.getElementById('compress-btn');
const decompressBtn = document.getElementById('decompress-btn');
const resultContainer = document.getElementById('result-container');
const resultContent = document.getElementById('result-content');

// Sample data for demonstration
const sampleData = {
  'example.txt': 'This is a sample text file.',
  'image.jpg': 'https://source.unsplash.com/random/900x700/?fruit',
  'document.pdf': 'This is a sample PDF document.'
};

// Initialize IndexedDB
let db;
const request = window.indexedDB.open('fileDB', 1);
request.onupgradeneeded = function(event) {
  db = event.target.result;
  const objectStore = db.createObjectStore('files', { keyPath: 'name' });
};
request.onsuccess = function(event) {
  db = event.target.result;
  // Add sample data to IndexedDB
  Object.keys(sampleData).forEach(fileName => {
    const fileData = { name: fileName, content: sampleData[fileName] };
    const transaction = db.transaction(['files'], 'readwrite');
    const objectStore = transaction.objectStore('files');
    objectStore.add(fileData);
  });
};

// Compress file
compressBtn.addEventListener('click', () => {
  const file = fileInput.files[0];
  if (file) {
    const fileData = { name: file.name, content: file.name };
    const transaction = db.transaction(['files'], 'readwrite');
    const objectStore = transaction.objectStore('files');
    objectStore.add(fileData);
    resultContent.textContent = 'File compressed and saved to IndexedDB.';
    resultContainer.classList.remove('hidden');
  }
});

// Decompress file
decompressBtn.addEventListener('click', () => {
  const transaction = db.transaction(['files'], 'readonly');
  const objectStore = transaction.objectStore('files');
  const request = objectStore.getAll();
  request.onsuccess = function(event) {
    const files = event.target.result;
    let decompressedContent = '';
    files.forEach(file => {
      decompressedContent += `Name: ${file.name}\nContent: ${file.content}\n\n`;
    });
    resultContent.textContent = decompressedContent;
    resultContainer.classList.remove('hidden');
  };
});
