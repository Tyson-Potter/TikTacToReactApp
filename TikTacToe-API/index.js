const express = require("express");
const admin = require("firebase-admin");
const serviceAccount = require("./tysontest-firebase-adminsdk-yd17p-0cd0b2ede6.json"); // Update with the correct path
const cors = require("cors");
const app = express();
const port = 3001; // This is the port your Express server will run on
app.use(cors());

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "http://127.0.0.1:9000", // This is only needed if you are using Realtime Database
});

// Connect to Firestore emulator
const db = admin.firestore();
db.settings({
  host: "127.0.0.1:8080",
  ssl: false,
});

// Middleware to parse JSON
app.use(express.json());

// Endpoint to get data
app.get("/data", async (req, res) => {
  try {
    const snapshot = await db.collection("games").get();
    const data = snapshot.docs.map((doc) => doc.data());
    console.log(data);

    res.status(200).json(data);
  } catch (error) {
    console.log("fail");
    res.status(500).send(error.toString());
  }
});
app.put("/createGame", async (req, res) => {
  console.log("Creating new game document...");
  try {
    let newGameId = generateRandomId();

    // Extract the JSON object from the request body
    const newGame = {
      id: newGameId,
      gameState: resetGameState,
      currentPlayerTurn: "X",
      gameStatus: "pending",
    };

    // Add the new game document to the "games" collection
    const docRef = await db.collection("games").add(newGame);

    // Respond with the ID of the newly created document
    res.status(201).json({ newGame });
  } catch (error) {
    console.error("Error creating new game document:", error);
    res.status(500).send(error.toString());
  }
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
function generateRandomId(length = 8) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

// Example usage:
const resetGameState = [
  { x: 0, y: 0, owner: "neutral" },
  { x: 1, y: 0, owner: "neutral" },
  { x: 2, y: 0, owner: "neutral" },
  { x: 0, y: 1, owner: "neutral" },
  { x: 1, y: 1, owner: "neutral" },
  { x: 2, y: 1, owner: "neutral" },
  { x: 0, y: 2, owner: "neutral" },
  { x: 1, y: 2, owner: "neutral" },
  { x: 2, y: 2, owner: "neutral" },
];
