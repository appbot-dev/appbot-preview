// IndexedDB setup const dbName = 'pixelPlayground'; const storeName = 'images'; let db;
// Open IndexedDB function openDB() {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(dbName, 1);

    request.onerror = () => {
      console.error('Error opening IndexedDB');
      reject(request.error);
    };

    request.onsuccess = () => {
      db = request.result;
      resolve();
    };

    request.onupgradeneeded = (event) => {
      db = event.target.result;
      db.createObjectStore(storeName, { keyPath: 'id' });
    };
  });
}
// Save image to IndexedDB async function saveImage(image) {
  await openDB();
  const transaction = db.transaction([storeName], 'readwrite');
  const store = transaction.objectStore(storeName);
  store.add(image);
}
// Retrieve images from IndexedDB async function getImages() {
  await openDB();
  const transaction = db.transaction([storeName], 'readonly');
  const store = transaction.objectStore(storeName);
  const images = await new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onerror = () => {
      console.error('Error retrieving images from IndexedDB');
      reject(request.error);
    };
    request.onsuccess = () => {
      resolve(request.result);
    };
  });
  return images;
}
// Image Editor functionality const resizeBtn = document.getElementById('resizeBtn'); const flipBtn = document.getElementById('flipBtn'); const blurBtn = document.getElementById('blurBtn'); const exportBtn = document.getElementById('exportBtn'); const editedImage = document.getElementById('editedImage');
resizeBtn.addEventListener('click', () => {
  // Implement image resizing functionality
  console.log('Resizing image...');
});
flipBtn.addEventListener('click', () => {
  // Implement image flipping functionality
  console.log('Flipping image...');
});
blurBtn.addEventListener('click', () => {
  // Implement image blurring functionality
  console.log('Blurring image...');
});
exportBtn.addEventListener('click', () => {
  // Implement image exporting functionality
  console.log('Exporting image...');
});
// Image Gallery functionality async function loadImages() {
  const images = await getImages();
  const galleryContainer = document.getElementById('galleryContainer');
  galleryContainer.innerHTML = '';

  images.forEach((image) => {
    const imageElement = document.createElement('div');
    imageElement.classList.add('bg-gray-200', 'rounded-lg', 'overflow-hidden', 'cursor-pointer');

    const img = document.createElement('img');
    img.src = image.dataUrl;
    img.alt = `Image ${image.id}`;
    img.classList.add('w-full', 'h-48', 'object-cover');

    const imageInfo = document.createElement('div');
    imageInfo.classList.add('p-4');

    const title = document.createElement('h3');
    title.classList.add('text-lg', 'font-bold', 'text-gray-800', 'mb-2');
    title.textContent = `Image ${image.id}`;

    const description = document.createElement('p');
    description.classList.add('text-gray-600');
    description.textContent = image.description;

    imageInfo.appendChild(title);
    imageInfo.appendChild(description);
    imageElement.appendChild(img);
    imageElement.appendChild(imageInfo);
    galleryContainer.appendChild(imageElement);
  });
}
loadImages();