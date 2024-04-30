// Function to search products function searchProducts() {
  const searchInput = document.getElementById('search-input');
  const searchTerm = searchInput.value.toLowerCase();

  const transaction = db.transaction(["products"], "readonly");
  const objectStore = transaction.objectStore("products");
  const request = objectStore.getAll();

  request.onsuccess = function(event) {
    const products = event.target.result;
    const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm)
    );

    const productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = '';

    filteredProducts.forEach(product => {
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
// Add event listener to the search button const searchBtn = document.getElementById('search-btn'); searchBtn.addEventListener('click', searchProducts);