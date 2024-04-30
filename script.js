// This script.js file contains the JavaScript code to implement the core functionality // of the Engage Learn Evolve platform.
// Initialize IndexedDB for storing user learning data const request = window.indexedDB.open('engagelearnevolve', 1);
request.onupgradeneeded = (event) => {
  const db = event.target.result;
  const objectStore = db.createObjectStore('courses', { keyPath: 'id' });
  objectStore.createIndex('progress', 'progress', { unique: false });
};
request.onsuccess = (event) => {
  const db = event.target.result;

  // Function to save course progress
  function saveCourseProgress(courseId, progress) {
    const transaction = db.transaction(['courses'], 'readwrite');
    const objectStore = transaction.objectStore('courses');
    objectStore.put({ id: courseId, progress: progress });
  }

  // Function to retrieve course progress
  function getCourseProgress(courseId, callback) {
    const transaction = db.transaction(['courses'], 'readonly');
    const objectStore = transaction.objectStore('courses');
    const request = objectStore.get(courseId);

    request.onsuccess = (event) => {
      const course = event.target.result;
      callback(course ? course.progress : 0);
    };
  }

  // Example usage of the functions
  saveCourseProgress('course-1', 75);
  getCourseProgress('course-1', (progress) => {
    console.log(`Course progress: ${progress}%`);
  });
};
request.onerror = (event) => {
  console.error('Error initializing IndexedDB:', event.target.errorCode);
};