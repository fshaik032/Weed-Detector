const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;
const cors = require("cors");

app.use(cors());

app.use(express.json());

// Define a route for the homepage
const multer = require('multer')

app.post("/upload", multer().single('file'), async function (req, res, next) {
  try {
      console.log("done")
      console.log(req.file)
      fs.writeFile("bo.png", req.file.buffer, (err) => {
        if (err)
          console.log(err);
        else {
          console.log("File written successfully\n");
          console.log("The written has the following contents:");
          //console.log(fs.readFileSync("books.txt", "utf8"));
        }
      });
  } catch (err) {
      next(err)
  } 
});

// Define a route for an about page
app.get('/retrieve', (req, res) => {
  res.send('This is the about page.');
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
