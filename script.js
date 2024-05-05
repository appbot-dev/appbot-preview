// IndexedDB setup
const dbName = 'contestDB';
const storeName = 'contests';
let db;

// Open IndexedDB
function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);
    request.onupgradeneeded = (event) => {
      db = event.target.result;
      db.createObjectStore(storeName, { keyPath: 'id' });
    };
    request.onsuccess = (event) => {
      db = event.target.result;
      resolve();
    };
    request.onerror = (event) => {
      reject(event.target.errorCode);
    };
  });
}

// Add a new contest
function addContest(contest) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], 'readwrite');
    const store = transaction.objectStore(storeName);
    const request = store.add(contest);
    request.onsuccess = () => {
      resolve();
    };
    request.onerror = () => {
      reject(request.error);
    };
  });
}

// Get all contests
function getContests() {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], 'readonly');
    const store = transaction.objectStore(storeName);
    const request = store.getAll();
    request.onsuccess = (event) => {
      resolve(event.target.result);
    };
    request.onerror = () => {
      reject(request.error);
    };
  });
}

// Render contest cards on the homepage
async function renderContestCards() {
  await openDB();
  const contests = await getContests();
  const contestList = document.getElementById('contest-list');
  contestList.innerHTML = '';

  contests.forEach((contest) => {
    const card = document.createElement('div');
    card.classList.add('bg-white', 'shadow-lg', 'rounded-lg', 'overflow-hidden');
    card.innerHTML = `
      <img src="https://source.unsplash.com/random/900x700/?contest" alt="${contest.name}" class="w-full h-48 object-cover">
      <div class="p-6">
        <h3 class="text-xl font-bold mb-2">${contest.name}</h3>
        <p class="text-gray-600 mb-4">${contest.description}</p>
        <a href="pages/contest-management.html?id=${contest.id}" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg">Manage Contest</a>
      </div>
    `;
    contestList.appendChild(card);
  });
}

// Initialize the page
renderContestCards();
