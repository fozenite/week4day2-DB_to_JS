const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

let firstName = process.argv[2];

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  console.log("Searching...");
  client.query(`SELECT first_name, last_name, birthdate from famous_people WHERE (first_name LIKE '%${firstName}%' OR last_name LIKE '%${firstName}%')`, (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    let resPath = result.rows;    //Creting shorter path to use results
    console.log(`Found ${resPath.length} person(s) by the name '${firstName}':`);
    for ( let i in resPath){
      console.log(`${Number(i) + 1}: ${resPath[i].first_name} ${resPath[i].last_name}, born ${resPath[i].birthdate.getFullYear()}/${resPath[i].birthdate.getMonth() + 1}/${resPath[i].birthdate.getDate()} `); //output: 1
    }
    client.end();
  });
});