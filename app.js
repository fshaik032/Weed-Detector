const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;
const cors = require("cors");
const path = require('path');


app.use(cors());

app.use(express.static("./frontend/dist"))
app.use(express.json());

// Define a route for the homepage
const multer = require('multer')


app.post("/upload", multer().single('file'), async function (req, res, next) {
  try {
      console.log(req.file)
      fs.writeFile("ok.jpeg", req.file.buffer, (err) => {
        if (err)
          console.log(err);
        else {
          console.log("File written successfully\n");
          console.log("The written has the following contents:");
          const { spawnSync } = require('child_process');
          const pyProg = spawnSync('./test/bin/python', ['detect.py']);

          // pyProg.stdout.on('data', function(data) {
              
          //     console.log(data.toString());
          //     res.write(data);
          //     res.end('end');
          // });
        }
      });
  } catch (err) {
      next(err)
  } 

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  await sleep(1000);

  const options = {
    root: path.join(__dirname)
  };
  // res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.sendFile("tada.jpeg", options, function (err) {
    if (err) {
        next(err);
    } else {
        console.log('Sent:');
    }
});


});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
