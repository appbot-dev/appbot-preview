// JavaScript code for the website, including functionality for the Product Catalog and Shopping Cart pages

// Product Catalog functionality
const productCatalogLink = document.querySelector('a[href="pages/product-catalog.html"]');
productCatalogLink.addEventListener('click', (event) => {
  event.preventDefault();
  window.location.href = 'pages/product-catalog.html';
});

// Shopping Cart functionality
const shoppingCartLink = document.querySelector('a[href="pages/shopping-cart.html"]');
shoppingCartLink.addEventListener('click', (event) => {
  event.preventDefault();
  window.location.href = 'pages/shopping-cart.html';
});
