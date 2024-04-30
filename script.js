// IndexedDB setup let db; const request = window.indexedDB.open("vibrant-marketplace-venture", 1);
request.onupgradeneeded = function(event) {
  db = event.target.result;
  const objectStore = db.createObjectStore("products", { keyPath: "id" });
};
request.onsuccess = function(event) {
  db = event.target.result;
  renderProductCards();
};
// Sample product data const sampleProducts = [
  {
    id: 1,
    name: 'Product 1',
    description: 'This is a sample product description.',
    imageUrl: 'https://source.unsplash.com/random/900x700/?fruit'
  },
  {
    id: 2,
    name: 'Product 2',
    description: 'This is another sample product description.',
    imageUrl: 'https://source.unsplash.com/random/900x700/?fruit'
  },
  {
    id: 3,
    name: 'Product 3',
    description: 'This is a third sample product description.',
    imageUrl: 'https://source.unsplash.com/random/900x700/?fruit'
  },
  {
    id: 4,
    name: 'Product 4',
    description: 'This is a fourth sample product description.',
    imageUrl: 'https://source.unsplash.com/random/900x700/?fruit'
  }
];
// Function to save sample products to IndexedDB function saveProductsToIndexedDB() {
  const transaction = db.transaction(["products"], "readwrite");
  const objectStore = transaction.objectStore("products");

  sampleProducts.forEach(product => {
    objectStore.add(product);
  });
}
// Function to render product cards function renderProductCards() {
  const productGrid = document.getElementById('product-grid');
  productGrid.innerHTML = '';

  const transaction = db.transaction(["products"], "readonly");
  const objectStore = transaction.objectStore("products");
  const request = objectStore.getAll();

  request.onsuccess = function(event) {
    const products = event.target.result;

    products.forEach(product => {
      const productCard = document.createElement('div');
      productCard.classList.add('bg-white', 'shadow-md', 'rounded-lg', 'overflow-hidden');

      const productImage = document.createElement('img');
      productImage.src = product.imageUrl;
      productImage.alt = product.name;
      productImage.classList.add('w-full', 'h-48', 'object-cover');

      const productContent = document.createElement('div');
      productContent.classList.add('p-4');

      const productName = document.createElement('h3');
      productName.textContent = product.name;
      productName.classList.add('text-lg', 'font-bold', 'mb-2');

      const productDescription = document.createElement('p');
      productDescription.textContent = product.description;
      productDescription.classList.add('text-gray-600', 'mb-4');

      productContent.appendChild(productName);
      productContent.appendChild(productDescription);

      productCard.appendChild(productImage);
      productCard.appendChild(productContent);

      productGrid.appendChild(productCard);
    });
  };
}
// Initialize the application saveProductsToIndexedDB();