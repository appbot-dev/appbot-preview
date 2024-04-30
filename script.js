// This script handles the functionality for the vehicle listing and financing options pages

// Fetch vehicle data from IndexedDB
async function getVehicleData() {
  const db = await openIndexedDB('auto-mart-db', 1, (db) => {
    db.createObjectStore('vehicles', { keyPath: 'id' });
  });
  return await db.getAll('vehicles');
}

// Fetch financing options data from IndexedDB
async function getFinancingData() {
  const db = await openIndexedDB('auto-mart-db', 1, (db) => {
    db.createObjectStore('financing', { keyPath: 'id' });
  });
  return await db.getAll('financing');
}

// Open IndexedDB connection
async function openIndexedDB(dbName, version, onUpgradeNeeded) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, version);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    request.onupgradeneeded = (event) => onUpgradeNeeded(event.target.result);
  });
}

// Populate vehicle listing page
async function populateVehicleListing() {
  const vehicles = await getVehicleData();
  const vehicleListingContainer = document.getElementById('vehicle-listing-container');

  vehicles.forEach((vehicle) => {
    const vehicleCard = createVehicleCard(vehicle);
    vehicleListingContainer.appendChild(vehicleCard);
  });
}

// Populate financing options page
async function populateFinancingOptions() {
  const financingOptions = await getFinancingData();
  const financingOptionsContainer = document.getElementById('financing-options-container');

  financingOptions.forEach((option) => {
    const financingCard = createFinancingCard(option);
    financingOptionsContainer.appendChild(financingCard);
  });
}

// Create vehicle card element
function createVehicleCard(vehicle) {
  const card = document.createElement('div');
  card.classList.add('bg-white', 'shadow-lg', 'rounded-lg', 'overflow-hidden');

  const imageContainer = document.createElement('div');
  imageContainer.classList.add('h-48', 'bg-gray-200', 'flex', 'items-center', 'justify-center');
  const image = document.createElement('img');
  image.src = `https://source.unsplash.com/random/900x700/?${vehicle.make.toLowerCase()}`;
  image.alt = `${vehicle.make} ${vehicle.model}`;
  image.classList.add('w-full', 'h-full', 'object-cover');
  imageContainer.appendChild(image);

  const content = document.createElement('div');
  content.classList.add('p-4');
  const title = document.createElement('h3');
  title.classList.add('text-xl', 'font-bold', 'mb-2');
  title.textContent = `${vehicle.make} ${vehicle.model}`;
  const price = document.createElement('p');
  price.classList.add('text-gray-600', 'mb-4');
  price.textContent = `$${vehicle.price.toFixed(2)}`;
  const description = document.createElement('p');
  description.classList.add('text-gray-500');
  description.textContent = vehicle.description;
  content.appendChild(title);
  content.appendChild(price);
  content.appendChild(description);

  card.appendChild(imageContainer);
  card.appendChild(content);

  return card;
}

// Create financing card element
function createFinancingCard(financingOption) {
  const card = document.createElement('div');
  card.classList.add('bg-white', 'shadow-lg', 'rounded-lg', 'overflow-hidden');

  const content = document.createElement('div');
  content.classList.add('p-4');
  const title = document.createElement('h3');
  title.classList.add('text-xl', 'font-bold', 'mb-2');
  title.textContent = financingOption.title;
  const description = document.createElement('p');
  description.classList.add('text-gray-500', 'mb-4');
  description.textContent = financingOption.description;
  const monthlyPayment = document.createElement('p');
  monthlyPayment.classList.add('text-gray-600', 'font-bold');
  monthlyPayment.textContent = `Monthly Payment: $${financingOption.monthlyPayment.toFixed(2)}`;
  content.appendChild(title);
  content.appendChild(description);
  content.appendChild(monthlyPayment);

  card.appendChild(content);

  return card;
}

// Initialize the pages
document.addEventListener('DOMContentLoaded', async () => {
  await populateVehicleListing();
  await populateFinancingOptions();
});
