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
app.put("/makeMove", async (req, res) => {
  let gameId = req.body.gameId;
  const docRef = db.collection("games").doc(gameId);
  const game = (await docRef.get()).data();
  if (game.numberOfPlayers === 1) {
    res.status(400).send("Game is pending");
    return;
  } else if (game.currentPlayerTurn !== req.body.playerName) {
    res.status(400).send("Not your turn");
    return;
  } else {
    let gameState = game.gameState;
    for (let i = 0; i < gameState.length; i++) {
      if (gameState[i].x == req.body.x && gameState[i].y == req.body.y) {
        if (gameState[i].owner == "neutral") {
          game.gameState[i].owner = req.body.playerName;
          game.currentPlayerTurn = game.currentPlayerTurn === "O" ? "X" : "O";

          await docRef.update(game);
          res.status(201).json({ game });
          return;
        }
      }
    }
  }
});
app.put("/joinGame", async (req, res) => {
  let incomingGameId = req.body.gameId;
  const docRef = db.collection("games").doc(incomingGameId);
  const game = (await docRef.get()).data();

  try {
    if (game.numberOfPlayers === 1) {
      game.numberOfPlayers = 2;
      game.status = "active";
      game.playersName = "O";
      const docRef = db.collection("games").doc(game.id);

      await docRef.update(game);

      res.status(201).json({ game });
    } else {
      res.status(400).send("Game is full");
    }
  } catch (error) {
    console.error("Error joining game:", error);
    res.status(500).send(error.toString());
  }
});
// Endpoint to get data
app.get("/games", async (req, res) => {
  try {
    const snapshot = await db.collection("games").get();
    const data = snapshot.docs.map((doc) => doc.data());

    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});
app.put("/createGame", async (req, res) => {
  try {
    let newGameId = generateRandomId();

    // Extract the JSON object from the request body
    const newGame = {
      id: newGameId,
      gameState: resetGameState,
      currentPlayerTurn: "X",
      status: "pending",
      numberOfPlayers: 1,
    };

    // Add the new game document to the "games" collection
    const docRef = db.collection("games").doc(newGameId);
    await docRef.set(newGame);

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
function generateRandomId(length = 20) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}
app.get("/getGameState", async (req, res) => {
  try {
    const gameId = req.query.gameId;
    const docRef = db.collection("games").doc(gameId);
    const game = (await docRef.get()).data();
    if (game) {
      res.status(200).json({ gameState: game.gameState });
    }

    // res.status(200).json(data);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});
app.put("/deleteGame", async (req, res) => {
  try {
    const gameId = req.body.gameId;
    const docRef = db.collection("games").doc(gameId);

    await docRef.delete();
    if (checkWinner(game.gameState) != null) {
      docRef.delete(docRef);
    }
    res.status(200);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});
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
function checkWinner(gameState) {
  if (gameState == null) {
    return null;
  }
  // Create a 2D array representation of the board
  const board = Array.from({ length: 3 }, () => Array(3).fill(null));
  gameState.forEach(({ owner, x, y }) => {
    if (owner == "neutral") {
    } else {
      board[x][y] = owner;
    }
  });

  // Check rows, columns, and diagonals
  const lines = [
    // Rows
    [board[0][0], board[0][1], board[0][2]],
    [board[1][0], board[1][1], board[1][2]],
    [board[2][0], board[2][1], board[2][2]],
    // Columns
    [board[0][0], board[1][0], board[2][0]],
    [board[0][1], board[1][1], board[2][1]],
    [board[0][2], board[1][2], board[2][2]],
    // Diagonals
    [board[0][0], board[1][1], board[2][2]],
    [board[0][2], board[1][1], board[2][0]],
  ];

  // Check if any line has all the same owner and is not null
  for (const line of lines) {
    if (line[0] && line[0] === line[1] && line[1] === line[2]) {
      return line[0]; // Return the winner ('X' or 'O')
    }
  }

  return null; // No winner found
}
