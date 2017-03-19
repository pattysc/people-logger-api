var express = require('express')
var app = express()
var bodyParser = require('body-parser')

// var Person = require('./Person')

var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database(':memory:')

var cors = require('cors')

var port = process.env.PORT || 8080

app.use(cors())
app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
//   extended: true
// }))

db.serialize(function() {
  db.run("CREATE TABLE IF NOT EXISTS people (rowid integer PRIMARY KEY AUTOINCREMENT, name text NOT NULL, favoriteCity text NOT NULL)");
  db.run("INSERT INTO people (name, favoriteCity) VALUES ('boo', 'cusco')");
  db.run("INSERT INTO people (name, favoriteCity) VALUES ('patty', 'nyc')");
  // var stmt = db.prepare("INSERT INTO lorem VALUES (?)")
  // stmt.finalize();
  //
  // db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
  //     console.log(row.id + ": " + row.info);
  // })
})

app.get('/people', function(req, res){
  console.log('in get /people');
  db.all("SELECT * FROM people", function(err, rows){
    console.log('fetching all people in db...');
    res.json(rows)
  })
})

app.post('/people', function(req, res){
  console.log('in /people')
  console.log(req.body);
  db.run("INSERT INTO people (name, favoriteCity) VALUES (?, ?)", req.body.name, req.body.favoriteCity, function(){
    res.json({saved: success})
  })
})

// app.get('/make', function(req, res){
//   console.log('in /make get');
//   let ids = req.query.ids
//   axios(playlist(ids, token)).then(
//     function(data){
//       console.log(data);
//       res.send(data.data)
//     }
//   ).catch(function(data){
//     console.log(data)
//     res.json({message: "didn't work"})
//   })
// })

app.listen(port)
