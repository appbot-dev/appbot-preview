// This script handles the functionality of the High School Landing Page.
// Function to fetch and display data from IndexedDB async function fetchAndDisplayData() {
  try {
    // Open the IndexedDB database
    const db = await openDatabase();

    // Fetch data from the database
    const data = await fetchDataFromDB(db);

    // Display the data on the page
    displayDataOnPage(data);
  } catch (error) {
    console.error('Error fetching and displaying data:', error);
  }
}
// Function to open the IndexedDB database async function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open('highSchoolDB', 1);

    request.onerror = () => {
      reject(request.error);
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      db.createObjectStore('pageData', { keyPath: 'id' });
    };
  });
}
// Function to fetch data from the IndexedDB database async function fetchDataFromDB(db) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['pageData'], 'readonly');
    const store = transaction.objectStore('pageData');
    const request = store.getAll();

    request.onerror = () => {
      reject(request.error);
    };

    request.onsuccess = () => {
      resolve(request.result);
    };
  });
}
// Function to display the data on the page function displayDataOnPage(data) {
  // Implement the logic to display the data on the page
  console.log('Data fetched from IndexedDB:', data);
}
// Call the fetchAndDisplayData function when the page loads window.addEventListener('DOMContentLoaded', fetchAndDisplayData);