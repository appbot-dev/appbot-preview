// Contest model
class Contest {
  constructor(id, name, description, startDate, endDate) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}

// Add a new contest
const addContest = async (contest) => {
  await openDB();
  await addContest(contest);
  await renderContestList();
};

// Retrieve all contests
const getAllContests = async () => {
  await openDB();
  return await getAllContests();
};
