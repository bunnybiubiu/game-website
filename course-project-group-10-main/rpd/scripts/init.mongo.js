const db = db.getSiblingDB("retroplay");

db.googleUsers.deleteMany({});
db.counters.deleteMany({});
db.snakeGame.deleteMany({});
db.breakoutGame.deleteMany({});
const initialGamers = [
  {
    id: 1,
    name: "Rahul",
    email: "e0129839@u.nus.edu",
  },
  {
    id: 2,
    name: "Rohit",
    email: "alksdfjlak@gmail.com",
  },
  {
    id: 3,
    name: "Rose",
    email: "0901293@ekj.com",
  },
];
db.googleUsers.insertMany(initialGamers);

/*Q1 code ends here*/

const count = db.googleUsers.countDocuments();
print("Inserted", count, "Travellers");

//The _id below is just a placeholder. The below collection, in fact, has only one row and one column. We can denote this by any name but we call this fixedindex.
db.counters.deleteOne({ _id: "fixedindex" });
db.counters.insertOne({ _id: "fixedindex", current: count });

db.googleUsers.createIndex({ id: 1 }, { unique: true });
db.googleUsers.createIndex({ name: 1 });
db.googleUsers.createIndex({ email: 1 }, { unique: true });
db.snakeGame.createIndex({ id: 1 }, { unique: true });
db.breakoutGame.createIndex({ id: 1 }, { unique: true });

db.snakeGame.insertOne({
  id: 1,
  score: 100,
  snake: [
    { x: 2, y: 2 },
    { x: 3, y: 2 },
    { x: 4, y: 2 },
    { x: 5, y: 2 },
  ],
  food: { x: 8, y: 3 },
});
