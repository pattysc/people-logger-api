var express = require('express')
var bodyParser = require('body-parser')
var sqlite3 = require('sqlite3').verbose()
var cors = require('cors')
var db = new sqlite3.Database(':memory:')

var app = express()
var port = process.env.PORT || 8080

app.use(cors())
app.use(bodyParser.json())

db.serialize(function() {
  db.run("CREATE TABLE IF NOT EXISTS people (rowid integer PRIMARY KEY AUTOINCREMENT, name text NOT NULL, favoriteCity text NOT NULL)");
})

//get all the people logged in the db
app.get('/people', function(req, res){
  db.all("SELECT * FROM people", function(err, rows){
    res.json(rows)
  })
})

//get the ':id'th person on the db
app.get('/people/:id', function(req, res){
  db.get("SELECT * FROM people WHERE rowid = ?", req.params.id, function(err, rows){
    res.json(rows)
  })
})

//save a new person to the db
app.post('/people', function(req, res){
  db.run("INSERT INTO people (name, favoriteCity) VALUES (?, ?)", req.body.name, req.body.favoriteCity)
})

//update the ':id'th person in the db
app.patch('/people/:id', function(req, res){
  db.run("UPDATE people SET name = ?, favoriteCity = ? WHERE rowid = ?", req.body.name, req.body.favoriteCity, req.params.id)
})

//delete the ':id'th person in the db
app.delete('/people/:id', function(req, res){
  db.run("DELETE FROM people WHERE rowid = ?", req.params.id)
})

app.listen(port)
