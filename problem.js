// Problem Set model
class ProblemSet {
  constructor(id, name, description, difficulty) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.difficulty = difficulty;
  }
}

// Add a new problem set
const addProblemSet = async (problemSet) => {
  await openDB();
  await addProblemSet(problemSet);
  await renderProblemList();
};

// Retrieve all problem sets
const getAllProblemSets = async () => {
  await openDB();
  return await getAllProblemSets();
};
