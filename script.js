// IndexedDB or localStorage code goes here
// Example code to store course data in IndexedDB const request = window.indexedDB.open('courseDB', 1);
request.onupgradeneeded = (event) => {
  const db = event.target.result;
  const objectStore = db.createObjectStore('courses', { keyPath: 'id' });
  objectStore.createIndex('title', 'title', { unique: false });
};
request.onsuccess = (event) => {
  const db = event.target.result;
  const transaction = db.transaction(['courses'], 'readwrite');
  const objectStore = transaction.objectStore('courses');
  
  // Add sample course data
  objectStore.add({ id: 1, title: 'Introduction to Web Development', description: 'Learn the fundamentals of HTML, CSS, and JavaScript to build modern web applications.' });
  objectStore.add({ id: 2, title: 'Data Science with Python', description: 'Explore the world of data science and learn how to analyze and visualize data using Python.' });
  objectStore.add({ id: 3, title: 'Machine Learning Fundamentals', description: 'Dive into the world of machine learning and learn how to build intelligent systems.' });
};
request.onerror = (event) => {
  console.error('Error opening IndexedDB:', event.target.error);
};