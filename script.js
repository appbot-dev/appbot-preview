// Initialize IndexedDB const request = indexedDB.open("catsDB", 1); let db;
request.onupgradeneeded = (event) => {
  db = event.target.result;
  const objectStore = db.createObjectStore("cats", { keyPath: "id" });
  objectStore.createIndex("name", "name", { unique: false });
};
request.onsuccess = (event) => {
  db = event.target.result;
  displayFeaturedCats();
};
request.onerror = (event) => {
  console.error("Error opening database:", event.target.errorCode);
};
// Display featured cats function displayFeaturedCats() {
  const featuredCatsContainer = document.getElementById("featured-cats");
  featuredCatsContainer.innerHTML = "";

  const transaction = db.transaction(["cats"], "readonly");
  const objectStore = transaction.objectStore("cats");
  const request = objectStore.getAll();

  request.onsuccess = (event) => {
    const cats = event.target.result;
    cats.slice(0, 6).forEach((cat) => {
      const catCard = createCatCard(cat);
      featuredCatsContainer.appendChild(catCard);
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
// Add some sample cats to the database const sampleCats = [
  {
    id: 1,
    name: "Whiskers",
    breed: "Persian",
    description: "A fluffy and affectionate Persian cat looking for a loving home."
  },
  {
    id: 2,
    name: "Mittens",
    breed: "Siamese",
    description: "A playful and intelligent Siamese cat ready to bring joy to your family."
  },
  {
    id: 3,
    name: "Simba",
    breed: "Maine Coon",
    description: "A gentle giant Maine Coon cat with a big personality."
  },
  {
    id: 4,
    name: "Luna",
    breed: "British Shorthair",
    description: "A calm and affectionate British Shorthair cat looking for a forever home."
  },
  {
    id: 5,
    name: "Oreo",
    breed: "Ragdoll",
    description: "A cuddly and loving Ragdoll cat waiting to be your new feline companion."
  },
  {
    id: 6,
    name: "Bella",
    breed: "Bengal",
    description: "An energetic and playful Bengal cat with a stunning coat."
  }
];
const transaction = db.transaction(["cats"], "readwrite"); const objectStore = transaction.objectStore("cats"); sampleCats.forEach((cat) => {
  objectStore.add(cat);
});