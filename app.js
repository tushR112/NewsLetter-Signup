const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const https = require('https');

const app = express();

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended : true}));

app.get("/" ,function(req ,res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/" ,function(req ,res){
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  //Data to send
  const data = {
    members : [
      {
        email_address : email,
        status : "subscribed",
        merge_fields:{
          FNAME : firstName,
          LNAME : lastName
        }
      }
    ]
  };

  //Converting Data to JSON String
  const jsonData = JSON.stringify(data);

  const url = "https://us6.api.mailchimp.com/3.0/lists/903981ff62";

  const options = {
    method : "POST",
    auth:"tushar:738faecedc6dd3720afa35a26639f5e9-us6"
  }

  const request = https.request(url ,options,function(response){
    response.on("data" ,function(data){

      if(response.statusCode === 200){
        res.sendFile(__dirname + "/success.html");
      }else{
        res.sendFile(__dirname + "/failure.html");
      }
      // console.log(response.statusCode);
    })
  });

  request.write(jsonData);
  request.end();
  // console.log("Email : " + email + " First name : " + firstName + " LastName : " + lastName);
});

app.post("/failure",function(req ,res){
  res.redirect("/");
});


app.listen(process.env.PORT || 3000 , function(req,res){
  console.log("Server started on port 3000.");
});

//API key
//738faecedc6dd3720afa35a26639f5e9-us6

//List
//903981ff62
