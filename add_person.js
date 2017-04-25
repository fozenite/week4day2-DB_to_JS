const settings = require("./settings"); // settings.json
var knex = require('knex')({
  client: 'pg',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database
  },
  pool: { min: 0, max: 7 }
});

//Take user command line input for firstname, lastname and date of famous person
let insertFname = process.argv[2];
let insertLname = process.argv[3];
let insertDate = process.argv[4];

// console.log(insertDate," ",insertLname," ", insertFname);

knex('famous_people').insert({first_name: insertFname,
                              last_name: insertLname,
                              birthdate: insertDate})
                     .then (function(){
                        knex.select().from('famous_people')
                            .then (function(rows){
                              console.log(rows);
                            })
                     })
