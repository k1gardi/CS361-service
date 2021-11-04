import express from "express";
import {randomizeArray, InputError} from "./randomize-array";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());

app.get("/api/randomizer", (req, res) => {
  try {
    const body = req.body;

    // Verify body params
    if (
      body !== undefined &&
      "num_wanted" in body &&
      "filenames" in body &&
      Array.isArray(body.filenames) &&
      Number.isInteger(body.num_wanted)
    ) {
      const randArr = randomizeArray(body.filenames, body.num_wanted);
      res.send(randArr);
    } else {
      throw new InputError(
        'Bad Request: Include body with {"filenames": Array, "num_wanted": integer}'
      );
    }
    return;
  } catch (err) {
    if (err instanceof InputError) {
      res.status(err.code).send(err.message);
      return;
    }
    res.status(500).send("Internal Server Error");
  }
});

app.get('*', function(req, res){
  res.status(404).send('Not Found');
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log("App is listening on port " + port);
