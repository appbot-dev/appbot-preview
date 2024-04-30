// IndexedDB or localStorage implementation for student and course data // JavaScript logic for managing student and course data
// Initialize IndexedDB const dbName = 'studentRecords'; const dbVersion = 1; let db;
// Open IndexedDB const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, dbVersion);
    request.onerror = (event) => {
      console.error('Error opening IndexedDB:', event.target.errorCode);
      reject(event.target.errorCode);
    };
    request.onsuccess = (event) => {
      db = event.target.result;
      resolve();
    };
    request.onupgradeneeded = (event) => {
      db = event.target.result;
      db.createObjectStore('students', { keyPath: 'id' });
      db.createObjectStore('courses', { keyPath: 'id' });
    };
  });
};
// CRUD operations for students const createStudent = (student) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['students'], 'readwrite');
    const store = transaction.objectStore('students');
    const request = store.add(student);
    request.onsuccess = () => {
      resolve(student);
    };
    request.onerror = (event) => {
      console.error('Error creating student:', event.target.errorCode);
      reject(event.target.errorCode);
    };
  });
};
const getStudents = () => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['students'], 'readonly');
    const store = transaction.objectStore('students');
    const request = store.getAll();
    request.onsuccess = (event) => {
      resolve(event.target.result);
    };
    request.onerror = (event) => {
      console.error('Error getting students:', event.target.errorCode);
      reject(event.target.errorCode);
    };
  });
};
const updateStudent = (student) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['students'], 'readwrite');
    const store = transaction.objectStore('students');
    const request = store.put(student);
    request.onsuccess = () => {
      resolve(student);
    };
    request.onerror = (event) => {
      console.error('Error updating student:', event.target.errorCode);
      reject(event.target.errorCode);
    };
  });
};
const deleteStudent = (id) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['students'], 'readwrite');
    const store = transaction.objectStore('students');
    const request = store.delete(id);
    request.onsuccess = () => {
      resolve();
    };
    request.onerror = (event) => {
      console.error('Error deleting student:', event.target.errorCode);
      reject(event.target.errorCode);
    };
  });
};
// CRUD operations for courses const createCourse = (course) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['courses'], 'readwrite');
    const store = transaction.objectStore('courses');
    const request = store.add(course);
    request.onsuccess = () => {
      resolve(course);
    };
    request.onerror = (event) => {
      console.error('Error creating course:', event.target.errorCode);
      reject(event.target.errorCode);
    };
  });
};
const getCourses = () => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['courses'], 'readonly');
    const store = transaction.objectStore('courses');
    const request = store.getAll();
    request.onsuccess = (event) => {
      resolve(event.target.result);
    };
    request.onerror = (event) => {
      console.error('Error getting courses:', event.target.errorCode);
      reject(event.target.errorCode);
    };
  });
};
const updateCourse = (course) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['courses'], 'readwrite');
    const store = transaction.objectStore('courses');
    const request = store.put(course);
    request.onsuccess = () => {
      resolve(course);
    };
    request.onerror = (event) => {
      console.error('Error updating course:', event.target.errorCode);
      reject(event.target.errorCode);
    };
  });
};
const deleteCourse = (id) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['courses'], 'readwrite');
    const store = transaction.objectStore('courses');
    const request = store.delete(id);
    request.onsuccess = () => {
      resolve();
    };
    request.onerror = (event) => {
      console.error('Error deleting course:', event.target.errorCode);
      reject(event.target.errorCode);
    };
  });
};
// Initialize IndexedDB and start the application openDB().then(() => {
  // Add your application logic here
}).catch((error) => {
  console.error('Error initializing IndexedDB:', error);
});