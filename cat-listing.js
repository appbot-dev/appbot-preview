// Initialize IndexedDB const request = indexedDB.open("catsDB", 1); let db;
request.onupgradeneeded = (event) => {
  db = event.target.result;
  const objectStore = db.createObjectStore("cats", { keyPath: "id" });
  objectStore.createIndex("name", "name", { unique: false });
  objectStore.createIndex("breed", "breed", { unique: false });
};
request.onsuccess = (event) => {
  db = event.target.result;
  displayCats();
  populateBreedFilter();
};
request.onerror = (event) => {
  console.error("Error opening database:", event.target.errorCode);
};
// Display cats function displayCats() {
  const catListContainer = document.getElementById("cat-list");
  catListContainer.innerHTML = "";

  const transaction = db.transaction(["cats"], "readonly");
  const objectStore = transaction.objectStore("cats");
  const request = objectStore.getAll();

  request.onsuccess = (event) => {
    const cats = event.target.result;
    cats.forEach((cat) => {
      const catCard = createCatCard(cat);
      catListContainer.appendChild(catCard);
    });
  };

  request.onerror = (event) => {
    console.error("Error retrieving cats:", event.target.errorCode);
  };
}
// Create a cat card element function createCatCard(cat) {
  const catCard = document.createElement("div");
  catCard.classList.add("bg-white", "rounded-lg", "shadow-md", "overflow-hidden");

  const catImage = document.createElement("img");
  catImage.src = `https://source.unsplash.com/random/900x700/?${cat.breed}`;
  catImage.alt = cat.name;
  catImage.classList.add("w-full", "h-48", "object-cover");

  const catDetails = document.createElement("div");
  catDetails.classList.add("p-4");

  const catName = document.createElement("h3");
  catName.classList.add("text-xl", "font-bold", "mb-2");
  catName.textContent = cat.name;

  const catBreed = document.createElement("p");
  catBreed.classList.add("text-gray-600", "mb-2");
  catBreed.textContent = cat.breed;

  const catDescription = document.createElement("p");
  catDescription.classList.add("text-gray-700", "leading-relaxed", "font-['Nunito']");
  catDescription.textContent = cat.description;

  catDetails.appendChild(catName);
  catDetails.appendChild(catBreed);
  catDetails.appendChild(catDescription);

  catCard.appendChild(catImage);
  catCard.appendChild(catDetails);

  return catCard;
}
// Populate the breed filter dropdown function populateBreedFilter() {
  const breedFilterDropdown = document.getElementById("breed-filter");

  const transaction = db.transaction(["cats"], "readonly");
  const objectStore = transaction.objectStore("cats");
  const request = objectStore.getAllKeys();

  request.onsuccess = (event) => {
    const breeds = new Set();
    event.target.result.forEach((key) => {
      const cat = objectStore.get(key);
      cat.onsuccess = (event) => {
        breeds.add(event.target.result.breed);
        if (breeds.size === event.target.result.length) {
          breeds.forEach((breed) => {
            const option = document