import express from "express";
import mysql from "mysql";

const app = express();
const PORT = 8000;

// setup to get json type 
app.use(express.json());


// setup db connection
const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "user_test",
  password: "1234",
  database: "db_test",
  port: 3306,
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to db");
  }
});


app.get("/", (req, res) => {
  res.send("Welcome World");
});

// get /hello
app.get("/hello", (req, res) => {
  res.send("Hello World");
});

// post /hello 
app.post("/post-req", (req, res) => {
  console.log(req.body);  
  const { name, age } = req.body;
  console.log(name, age);
  res.send("Hello Post");
});

// get query string
app.get("/qs", (req, res) => {
  const p1 = req.query.p1;
  console.log(req.query);
  res.send(`Hello ${p1}`);
});


// post save
app.post("/save", (req, res) => {
  const { name, capital, population } = req.body;
  console.log(`name: ${name}, capital: ${capital}, population: ${population}`)

  const sql = "insert into nations_table(name, capital, population) values(?,?,?);";
  db.query(sql, [name, capital, population], (err, result, fields) => {
    if (err) {
      console.log(err);
    } else {
      res.send("Values Inserted");
      console.log("result", result);
      console.log("fields", fields);
    }
  });
});

// get list of nations
app.get("/list", (req, res) => {
  const sql = "select * from nations_table";
  db.query(sql, (err, result, fields) => {
    if (err) {
      console.log(err);
    } else {
      // res.send(result);
      res.json(result);
      console.log("result", result);
      console.log("fields", fields);
    }
  });
});


// get nation by id
app.get("/nation/:id", (req, res) => {
  const id = req.params.id;
  const sql = "select * from nations_table where id = ?;";
  db.query(sql, [id], (err, result, fields) => {
    if (err) {
      console.log(err);
    } else {
      if (result.length == 0) {
        // 조회 결과 없음
        res.status(404).send("Not Found");
      }
      res.json(result);
      console.log("result", result);
      console.log("fields", fields);
    }
  });
});

// update nation by id
app.put("/nation/:id", (req, res) => {
  const id = req.params.id;
  const { name, capital, population } = req.body;
  const sql = "update nations_table set name = ?, capital = ?, population = ? where id = ?;";
  db.query(sql, [name, capital, population, id], (err, result, fields) => {
    if (err) {
      console.log(err);
    } else {
      // res.send("Updated");
      console.log("result", result);
      console.log("fields", fields);
      res.status(200).send("Updated");
    }
  });
});

app.delete("/nation/:id", (req, res) => {
  const id = req.params.id;
  const sql = "delete from nations_table where id = ?;";
  db.query(sql, [id], (err, result, fields) => {
    if (err) {
      console.log(err);
    } else {
      // res.send("Deleted");
      console.log("result", result);
      console.log("fields", fields);
      res.status(200).send("Deleted");
    }
  });
});