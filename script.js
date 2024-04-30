// IndexedDB setup
let db;
const request = indexedDB.open("zippy-compressor", 1);
request.onupgradeneeded = (event) => {
  db = event.target.result;
  const objectStore = db.createObjectStore("files", { keyPath: "id" });
};
request.onsuccess = (event) => {
  db = event.target.result;
  loadExampleData();
};

// Load example data to IndexedDB
function loadExampleData() {
  const exampleData = [
    { id: 1, name: "example.zip", compressed: true, data: "compressed_data" },
    { id: 2, name: "document.pdf", compressed: false, data: "uncompressed_data" },
  ];

  const transaction = db.transaction(["files"], "readwrite");
  const objectStore = transaction.objectStore("files");
  exampleData.forEach((file) => {
    objectStore.add(file);
  });
}

// Compress and decompress files
const fileInput = document.getElementById("file-input");
const compressBtn = document.getElementById("compress-btn");
const decompressBtn = document.getElementById("decompress-btn");
const outputContainer = document.getElementById("output-container");

compressBtn.addEventListener("click", async () => {
  const file = fileInput.files[0];
  if (file) {
    const compressedData = await compressFile(file);
    saveFile({ name: file.name, compressed: true, data: compressedData });
    outputContainer.innerHTML = `<p>File "${file.name}" has been compressed and saved.</p>`;
  }
});

decompressBtn.addEventListener("click", async () => {
  const file = fileInput.files[0];
  if (file) {
    const fileData = await getFileData(file.name);
    const decompressedData = await decompressFile(fileData.data);
    saveFile({ name: file.name, compressed: false, data: decompressedData });
    outputContainer.innerHTML = `<p>File "${file.name}" has been decompressed and saved.</p>`;
  }
});

async function compressFile(file) {
  // Implement file compression logic here
  return "compressed_data";
}

async function decompressFile(data) {
  // Implement file decompression logic here
  return "decompressed_data";
}

function saveFile(file) {
  const transaction = db.transaction(["files"], "readwrite");
  const objectStore = transaction.objectStore("files");
  objectStore.add(file);
}

async function getFileData(fileName) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["files"], "readonly");
    const objectStore = transaction.objectStore("files");
    const request = objectStore.get(fileName);
    request.onsuccess = () => {
      resolve(request.result);
    };
    request.onerror = () => {
      reject(new Error(`Failed to retrieve file data for "${fileName}"`));
    };
  });
}
