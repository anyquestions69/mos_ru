const fs = require("fs");
const Pool = require("pg").Pool;
const fastcsv = require("fast-csv");
const path = require('path');
let status=''
let stream = fs.createReadStream(path.join(__dirname, "groups.csv"));
let csvData = [];
let csvStream = fastcsv
  .parse()
  .on("data", function(data) {
    csvData.push(data);
  })
  .on("end", function() {
    // remove the first line: header
    csvData.shift();

    // create a new connection to the database
    const pool = new Pool({
      host: "db",
      user: process.env.DB_USER,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: 5432
    });

    const query =
      "INSERT INTO groups (id, cat_1, cat_2, activity, address, okrug, district, schedule, schedule_1, schedule_2) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)";

    pool.connect((err, client, done) => {
      if (err) throw err;

      try {
        csvData.forEach(row => {
          client.query(query, row, (err, res) => {
            if (err) {
              console.log(err.stack);
            } else {
              console.log("inserted " + res.rowCount + " row:", row);
            }
          });
        });
      } finally {
        status='ok'
        done();
      }
    });
  });

stream.pipe(csvStream);
module.exports=status