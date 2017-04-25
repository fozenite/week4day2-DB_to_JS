
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




let searchName = process.argv[2];

knex.select('first_name', 'last_name','birthdate').from('famous_people').where('first_name', 'like',`%${searchName}%`).orWhere('last_name', 'like',`%${searchName}%`)
       .then (function(rows) {
          let resPath = rows;
          for ( let i in resPath){
           console.log(`${Number(i) + 1}: ${resPath[i].first_name} ${resPath[i].last_name}, born ${resPath[i].birthdate.getFullYear()}/${resPath[i].birthdate.getMonth() + 1}/${resPath[i].birthdate.getDate()} `); //output: 1
          }
       })
       .catch (console.error);





