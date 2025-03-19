const fs = require("fs");
const express = require("express");
const { OpenAI } = require("openai");
const { ApolloServer, UserInputError } = require("apollo-server-express");
const { MongoClient } = require("mongodb");
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 8080;

let db; //Variable that points to the real DB.
const resolvers = {
  Query: {
    getGoogleUser,
    getSnakeGame,
    getBreakoutGame,
  },
  Mutation: {
    addGoogleUser,
    syncSnakeGame,
    syncBreakoutGame,
  },
};

async function startServer() {
  const app = express();
  const schemaPath = path.join(__dirname, "./rpdSchema.graphql");
  const server = new ApolloServer({
    typeDefs: fs.readFileSync(schemaPath, "utf-8"),
    resolvers,
    introspection: true, // Enables introspection in production
    playground: true, // Enables the Playground
  });
  app.use(
    cors({
      origin: "http://localhost:3000",
    }),
  );
  // app.use(express.static(path.join(__dirname, "..", "client", "build")));
  app.use(express.json());
  // apollo server graphql
  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });
  // theme generator
  app.post("/api/generate-theme", async (req, res) => {
    try {
      const { weather } = req.body;
      const theme = await handleThemeGeneration(weather);
      res.json(theme); // Send the generated theme back to the frontend
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  // catch-all routes
  // app.get("/*", function (req, res) {
  //   res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
  // });
  app.listen(port, () => {
    console.log(`🚀 Server ready at http://localhost:${port}/graphql`);
    console.log(
      `theme generator ready at http://localhost:${port}/api/generate-theme`,
    );
  });
}

async function connectToDb() {
  const url = "mongodb://mongodb:27017/retroplay";
  const client = new MongoClient(url);
  await client.connect();
  console.log("Connected to retroplay MongoDB at", url);
  db = client.db();
}

(async function () {
  try {
    await connectToDb();
    await startServer();
  } catch (err) {
    console.log("ERROR:", err);
  }
})();
async function handleThemeGeneration(weather) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const { temp_c, cloud } = weather.current;
  const { localtime, country } = weather.location;
  const { text } = weather.current.condition;
  const prompt = `Given the current weather conditions in ${country} is ${text}. The temperature is ${temp_c}°C, and cloud cover is ${cloud}%. The local time is ${localtime}. When it is night time, it is better to use some darker color to comfort people's eyes. The colors should be represented in hex code format suitable for CSS. The background color should reflect the warmth and cloudiness of the weather and the local time. The board is above the background, so choose a color that is warm and also compatible with the background-color, and the text color should be easily readable against this background-color, but a color other than #FFFFFF is prefered for text-color. Return only the JSON object with 'background-color', 'board-color', and 'color' fields, no additional comments or data.`;
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });
  const rawContent = completion.choices[0].message.content;
  const cleanedContent = rawContent.replace(/```json|```/g, "").trim();
  const theme = JSON.parse(cleanedContent);
  console.log("Generated Theme:", theme);
  return theme;
}

async function addGoogleUser(_, { user }) {
  console.log("input user", user);
  async function getNextSequence(name) {
    const result = await db
      .collection("counters")
      .findOneAndUpdate(
        { _id: name },
        { $inc: { current: 1 } },
        { returnDocument: "after" },
      );
    console.log("result", result);
    return result.current;
  }
  const existingUser = await db
    .collection("googleUsers")
    .findOne({ email: user.email });
  if (existingUser) {
    console.log("User with this email already exists:", existingUser);
    return existingUser; // Return the existing user if found
  }
  user.id = await getNextSequence("fixedindex");
  await db.collection("googleUsers").insertOne(user);
  console.log("added googleUsers", user);
  return user;
}

async function getGoogleUser(_, { email }) {
  const user = await db.collection("googleUsers").findOne({ email });
  if (!user) {
    throw new UserInputError("User not found", { email });
  }
  return user;
}

async function syncSnakeGame(_, { snakeGame }) {
  console.log("input snakeGame", snakeGame);
  const { id, score, snake, food, direction } = snakeGame;
  const result = await db.collection("snakeGame").findOneAndUpdate(
    { id: id },
    {
      $set: {
        score: score,
        snake: snake,
        food: food,
        direction: direction,
      },
    },
    { returnDocument: "after", upsert: true },
  );
  console.log("result", result);
  return result;
}

async function getSnakeGame(_, { id }) {
  const snakeGame = await db.collection("snakeGame").findOne({ id });
  if (!snakeGame) {
    throw new UserInputError("Snake game not found", { id });
  }
  return snakeGame;
}

async function syncBreakoutGame(_, { breakoutGame }) {
  const { id, score, bricks, ball } = breakoutGame;
  const result = await db.collection("breakoutGame").findOneAndUpdate(
    { id: id },
    {
      $set: {
        score: score,
        bricks: bricks,
        ball: ball,
      },
    },
    { returnDocument: "after", upsert: true },
  );
  return result;
}

async function getBreakoutGame(_, { id }) {
  const breakoutGame = await db.collection("breakoutGame").findOne({ id });
  if (!breakoutGame) {
    throw new UserInputError("breakout game not found", { id });
  }
  return breakoutGame;
}
