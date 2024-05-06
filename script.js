// Initialize the IndexedDB database
const dbName = 'onlineContestDB';
const storeName = 'contests';
let db;

// Open the IndexedDB database
const openDB = () => {
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
};

// Add a new contest to the database
const addContest = (contest) => {
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
};

// Retrieve all contests from the database
const getAllContests = () => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], 'readonly');
    const store = transaction.objectStore(storeName);
    const request = store.getAll();
    
    request.onsuccess = (event) => {
      resolve(event.target.result);
    };
    
    request.onerror = (event) => {
      reject(event.target.errorCode);
    };
  });
};

// Render the contest list on the page
const renderContestList = async () => {
  await openDB();
  const contests = await getAllContests();
  
  const contestList = document.getElementById('contest-list');
  contestList.innerHTML = '';
  
  contests.forEach((contest) => {
    const contestCard = `
      <div class="bg-white rounded-lg shadow-md p-4">
        <img src="https://source.unsplash.com/random/900x700/?contest" alt="Contest Image" class="w-full h-48 object-cover rounded-t-lg">
        <div class="pt-4">
          <h3 class="text-xl font-bold mb-2">${contest.name}</h3>
          <p class="text-gray-600 mb-4">${contest.description}</p>
          <a href="#" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">View Details</a>
        </div>
      </div>
    `;
    contestList.innerHTML += contestCard;
  });
};

// Render the problem set list on the page
const renderProblemList = async () => {
  await openDB();
  const problemSets = await getAllProblemSets();
  
  const problemList = document.getElementById('problem-list');
  problemList.innerHTML = '';
  
  problemSets.forEach((problemSet) => {
    const problemCard = `
      <div class="bg-white rounded-lg shadow-md p-4">
        <img src="https://source.unsplash.com/random/900x700/?problem" alt="Problem Image" class="w-full h-48 object-cover rounded-t-lg">
        <div class="pt-4">
          <h3 class="text-xl font-bold mb-2">${problemSet.name}</h3>
          <p class="text-gray-600 mb-4">${problemSet.description}</p>
          <a href="#" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">View Details</a>
        </div>
      </div>
    `;
    problemList.innerHTML += problemCard;
  });
};

// Initialize the application
const init = async () => {
  await renderContestList();
  await renderProblemList();
};

init();
