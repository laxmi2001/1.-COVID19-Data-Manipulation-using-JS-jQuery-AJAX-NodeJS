const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');
var fs = require('fs');
var covid20=require("./covid19.json");
console.log(covid20);

//When data is send in json format in postmethod
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true
}));

//api - 1
router.get(`/showdetails`,showdetails);
function showdetails(req,res){
  res.status(200).json(covid20);
};

//api-2
router.post(`/adddetails`,adddetails);
function adddetails(req,res){
//const {District_Name,Date,Infected,Recovered,Vaccinated} = req.body;
  const dname = req.body.District_Name;
  const date = req.body.Date;
  const infected = req.body.Infected;
  const recovered = req.body.Recovered;
  const vaccinated = req.body.Vaccinated;
  console.log(dname);
//covid20=[...covid20,{District_Name:dname,Date:date,Infected:infected,Recovered:recovered,Vaccinated:vaccinated}];
  let rec = {District_Name:dname, Date:date, Infected:infected, Recovered:recovered, Vaccinated:vaccinated};
  covid20.push(rec);
  fs.writeFile("covid19.json", JSON.stringify(covid20), err=>{
    if (err) throw err;
    console.log("write Success");
  });
//res.status(200).json([...covid20, {District_Name:dname,Date:date,Infected:infected,Recovered:recovered,Vaccinated:vaccinated}]);
  res.status(200).json(covid20);
};

module.exports = router;
