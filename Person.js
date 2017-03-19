// Please make the person object have the following attributes:
// id,
// name : “Sean”,
// favoriteCity : “New York”

class Person{
  constructor(name, favoriteCity){
    this.name = name
    this.favoriteCity = favoriteCity
    Person.all.push(this)
    this.id = People.all.length - 1
  }
}

Person.all = []

module.exports = Person
