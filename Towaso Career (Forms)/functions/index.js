

'use strict';
const functions = require('firebase-functions');

const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);


const express = require('express');

const nodemailer = require('nodemailer');

const gmailEmail = "towasoind@gmail.com";
const gmailPassword = "<**password**>"; // set the password
const mailTransport = nodemailer.createTransport(
    `smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com`);

const APP_NAME = 'ToWaSo';

const app = express();

const exphbs = require('express-handlebars');



app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Business dev details
const BD =  {
  user :
     {
      name : 'Business Development' , posturl : 'bd' ,
    question :'Which plays a great role in a Startup, Business or Marketing?' ,
    department : '<a href="/bd"><h1> Business Development </h1></a>' +
               '<a href="/rd"><h3>Reasearch and Development </h3></a>' + 
               ' <a href="/marketing"> <h3>Marketing </h3> </a> ' +
              ' <a href="/embedded">  <h3>Embedded System</h3></a> ' +
               '<a href="/web">       <h3>Web Development </h3></a>' +
               ' <a href="/app">       <h3>App Develpoment </h3></a>'
      }        
   }
// common data from requests
function getData(req){

  var timeStamp =  Date();
console.log(timeStamp);

     var data = {

   name  :  req.body.name,
   email :  req.body.email,
   mobile : req.body.mobile,
   degree : req.body.degree,
   institution : req.body.institution,
   statusofDegree : req.body.statusofDegree,
   YearofDegree : req.body.year,
   experience : req.body.experience,
   district : req.body.district,
   state : req.body.state,
   discipline : req.body.discipline,
   resumeURL : req.body.resumeURL,
   FitforThis : req.body.answer1,
   WhyJoin : req.body.answer2,
   appliedOn : timeStamp
  };

  return data;
}
 
var bs = JSON.stringify(BD);

// Post links

app.post('/bd' , (req , res) => {

 BD.user.personName = req.body.name ;

  var data = getData(req);

  data.better = req.body.answer3;

admin.database().ref(`/BD/`).push(data).then(function(){

  res.render('index', {
    index : {
      personName : req.body.name 
    }

  });
 
   },function(error){
   
     res.render('index', {  index : {  error : error  }  });

 });

});

app.post('/rd' , (req , res) => {

 
   var data = getData(req);

   data.field=req.body.answer3;

    admin.database().ref(`/RD/`).push(data).then(function(){

    res.render('index', { index : { personName : req.body.name }

  });
 
   },function(error){
   
    res.render('index', { index : { error : error } });
 });

});

app.post('/marketing' , (req , res) => {

 
   var data = getData(req);
  
   data.better = req.body.answer3;
   data.ideaAboutMarketing = req.body.answer4;

    admin.database().ref(`/MARKETING/`).push(data).then(function(){

    res.render('index', { index : { personName : req.body.name }

  });
 
   },function(error){
   
    res.render('index', { index : { error : error } });
 });
    
});


app.post('/embedded' , (req , res) => {

 
   var data = getData(req);

   data.works = req.body.answer3;

    admin.database().ref(`/EMBEDDED/`).push(data).then(function(){

    res.render('index', { index : { personName : req.body.name }

  });
 
   },function(error){
   
    res.render('index', { index : { error : error } });
 });
    
});

app.post('/web' , (req , res) => {
  

 
   var data = getData(req);

   data.works = req.body.answer3;

   data.technologies = req.body.answer4;

    admin.database().ref(`/WEB/`).push(data).then(function(){

    res.render('index', { index : { personName : req.body.name }

  });
 
   },function(error){
   
    res.render('index', { index : { error : error } });
 });
    
});

app.post('/app' , (req , res) => {
  
 
   var data = getData(req);

   data.works = req.body.answer3;

   data.technologies = req.body.answer4;

    admin.database().ref(`/APP/`).push(data).then(function(){

    res.render('index', { index : { personName : req.body.name }

  });
 
   },function(error){
   
    res.render('index', { index : { error : error } });
 });
    
});
// completed Posts

// Get Links
   

 app.get('/', (req, res) => {

   res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
   res.render('index', { index : {  personName : null}
  
   }); 
 });

app.get('/bd', (req, res) => {

  res.set('Cache-Control', 'public, max-age=600, s-maxage=800');
    res.render('user',BD );
   
    });


app.get('/marketing', (req, res) => {

res.set('Cache-Control', 'public, max-age=300, s-maxage=600');

	res.render('user', {
    user: { name : 'Marketing Department', posturl : 'marketing',
    question :'Which plays a great role in a Startup, Business or Marketing?' ,
     department : '<a href="/bd"><h3> Business Development </h3></a>' +
               '<a href="/rd"><h3>Reasearch and Development </h3></a>' + 
               ' <a href="/marketing"> <h1>Marketing </h1> </a> ' +
              ' <a href="/embedded">  <h3>Embedded System</h3></a> ' +
               '<a href="/web">       <h3>Web Development </h3></a>' +
               ' <a href="/app">       <h3>App Develpoment </h3></a>' ,
     extraquestion : 
            '<div class="form-row">' +
               '<label>' +
                    '<span> Do you have an idea to do marketing for a startup ?</span>'+
                    '<textarea name="answer4" id="answer4" ></textarea>' +
                '</label>' +
           '</div>' 
       }
  });


});

app.get('/rd', (req, res) => {

  res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
   res.render('user', {
    user: { name : 'Research and Development', posturl : 'rd',
     department : '<a href="/bd"><h3> Business Development </h3></a>' +
               '<a href="/rd"><h1>Reasearch and Development </h1></a>' + 
               ' <a href="/marketing"> <h3>Marketing </h3> </a> ' +
              ' <a href="/embedded">  <h3>Embedded System</h3></a> ' +
               '<a href="/web">       <h3>Web Development </h3></a>' +
               ' <a href="/app">       <h3>App Develpoment </h3></a>',
      rd :    ' <span>Select the field you prefer to work? </span> '+
               '<select name="answer3" id="answer3"> ' +
               '<option value="Composting">Composting</option>' +
               '<option value="Landfill Site">Landfill Site</option>' +
               '<option value="Plastic Recycling">Plastic Recycling</option>' +
               '<option value="ArcGIS">ArcGIS</option>' +
               '</select>',
      data  : [
                 { field :"Composting" , vacancies : "6", salary :"Rs.20,000 to Rs.80,000" },
                 { field :"Landfill Site" , vacancies : "6", salary :"Rs.20,000 to Rs.80,000" },
                 { field :"Plastic Recycling" , vacancies : "6", salary :"Rs.20,000 to Rs.80,000" },
                 { field :"ArcGIS" , vacancies : "1", salary :"Rs.20,000 to Rs.80,000" }
                 
              ]     
   }
  });

 
});

app.get('/embedded', (req, res) => {

   res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
   res.render('user', {
    user: { name : 'Embedded System', posturl : 'embedded',
    question :'Have you ever worked on MicroControllers?',
     department : '<a href="/bd"><h3> Business Development </h3></a>' +
               '<a href="/rd"><h3>Reasearch and Development </h3></a>' + 
               ' <a href="/marketing"> <h3>Marketing </h3> </a> ' +
              ' <a href="/embedded">  <h1>Embedded System</h1></a> ' +
               '<a href="/web">       <h3>Web Development </h3></a>' +
               ' <a href="/app">       <h3>App Develpoment </h3></a>'
}
  });

 
});

app.get('/web', (req, res) => {

   res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
   res.render('user', {
    user: { name : 'Web Development', posturl : 'web',
    question :'Have you done any websites? If Yes,provide their link and technologies used.' ,
     department : '<a href="/bd"><h3> Business Development </h3></a>' +
               '<a href="/rd"><h3>Reasearch and Development </h3></a>' + 
               ' <a href="/marketing"> <h3>Marketing </h3> </a> ' +
              ' <a href="/embedded">  <h3>Embedded System</h3></a> ' +
               '<a href="/web">       <h1>Web Development </h1></a>' +
               ' <a href="/app">       <h3>App Develpoment </h3></a>',
     extraquestion : 
            '<div class="form-row">' +
               '<label>' +
                    '<span> Technologies & Languages you know </span>'+
                    '<textarea name="answer4" id="answer4"></textarea>' +
                '</label>' +
           '</div>' 
       }

  });

 
});

app.get('/app', (req, res) => {

   res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
   res.render('user', {
    user: { name : 'App Development', posturl : 'app',
    question :'Have you done any app before?',
     department : '<a href="/bd"><h3> Business Development </h3></a>' +
               '<a href="/rd"><h3>Reasearch and Development </h3></a>' + 
               ' <a href="/marketing"> <h3>Marketing </h3> </a> ' +
              ' <a href="/embedded">  <h3>Embedded System</h3></a> ' +
               '<a href="/web">       <h3>Web Development </h3></a>' +
               ' <a href="/app">       <h1>App Develpoment </h1></a>',
    extraquestion : 
            '<div class="form-row">' +
               '<label>' +
                    '<span> Technologies & Languages you know </span>'+
                    '<textarea  name="answer4" id="answer4"></textarea>' +
                '</label>' +
           '</div>' 
       }

  });

 
});

 // completed Get links

 // exporting all Get and Post thrpugh app
exports.app = functions.https.onRequest(app);




//Cloud function: Welcome email to the candidates from Towaso on submitting the form
exports.sendWelcomeEmail = functions.database.ref('/{Title}/{pushId}').onWrite(event => {
  if (!event.data.val() || event.data.previous.val()) {
    console.log("not a new write event");
    return;
  }
  var valueObject = event.data.val();

  const Email = valueObject.email;
  const displayName = valueObject.name;

  return sendWelcomeEmail(Email, displayName);
});

function sendWelcomeEmail(Email, displayName) {
  const mailOptions = {
    from: `${APP_NAME} <noreply@firebase.com>`,
    to: Email
  };

  mailOptions.subject = `Welcome to ${APP_NAME}!`;
  mailOptions.text = `Dear ${displayName || ''}! 
  Thanks for your interest in TOWASO, a fast growing startup.We received your application. We will get back to you soon.`;
  return mailTransport.sendMail(mailOptions).then(() => {
    console.log('New welcome email sent to:', Email);
  });
}
// Message to Towaso(company) when anyone registerd with his details
// added to send us

exports.sendEmailToUsAPP = functions.database.ref('/APP/{pushId}').onWrite(event => {
  if (!event.data.val() || event.data.previous.val()) {
    console.log("not a new write event");
    return;
  }
  var valueObject = event.data.val();

  const displayName = valueObject.name;
  const state = valueObject.state;
  const district = valueObject.district;
  const college = valueObject.institution;
  const branch =valueObject.discipline;
  const phone = valueObject.mobile;
  const field = "App";
  const eligible = valueObject.FitforThis;
  const cv = valueObject.resumeURL;
  const Email = valueObject.email;
  const current = valueObject.statusofDegree;
  const degree = valueObject.degree;

  return sendEmailToUs(displayName, state, district, college, branch, phone, field, eligible, cv, Email, current, degree);
});

exports.sendEmailToUsWEB = functions.database.ref('/WEB/{pushId}').onWrite(event => {
  if (!event.data.val() || event.data.previous.val()) {
    console.log("not a new write event");
    return;
  }
  var valueObject = event.data.val();

  const displayName = valueObject.name;
  const state = valueObject.state;
  const district = valueObject.district;
  const college = valueObject.institution;
  const branch =valueObject.discipline;
  const phone = valueObject.mobile;
  const field = "Web Development";
  const eligible = valueObject.FitforThis;
  const cv = valueObject.resumeURL;
  const Email = valueObject.email;
  const current = valueObject.statusofDegree;
  const degree = valueObject.degree;

  return sendEmailToUs(displayName, state, district, college, branch, phone, field, eligible, cv, Email, current, degree);
});

exports.sendEmailToUsEmbedded = functions.database.ref('/EMBEDDED/{pushId}').onWrite(event => {
  if (!event.data.val() || event.data.previous.val()) {
    console.log("not a new write event");
    return;
  }
  var valueObject = event.data.val();

  const displayName = valueObject.name;
  const state = valueObject.state;
  const district = valueObject.district;
  const college = valueObject.institution;
  const branch =valueObject.discipline;
  const phone = valueObject.mobile;
  const field = "Embedded System";
  const eligible = valueObject.FitforThis;
  const cv = valueObject.resumeURL;
  const Email = valueObject.email;
  const current = valueObject.statusofDegree;
  const degree = valueObject.degree;

  return sendEmailToUs(displayName, state, district, college, branch, phone, field, eligible, cv, Email, current, degree);
});

exports.sendEmailToUsRD = functions.database.ref('/RD/{pushId}').onWrite(event => {
  if (!event.data.val() || event.data.previous.val()) {
    console.log("not a new write event");
    return;
  }
  var valueObject = event.data.val();

  const displayName = valueObject.name;
  const state = valueObject.state;
  const district = valueObject.district;
  const college = valueObject.institution;
  const branch =valueObject.discipline;
  const phone = valueObject.mobile;
  const field = "Research and Development";
  const eligible = valueObject.FitforThis;
  const cv = valueObject.resumeURL;
  const Email = valueObject.email;
  const current = valueObject.statusofDegree;
  const degree = valueObject.degree;

  return sendEmailToUs(displayName, state, district, college, branch, phone, field, eligible, cv, Email, current, degree);
});

exports.sendEmailToUsBD = functions.database.ref('/BD/{pushId}').onWrite(event => {
  if (!event.data.val() || event.data.previous.val()) {
    console.log("not a new write event");
    return;
  }
  var valueObject = event.data.val();

  const displayName = valueObject.name;
  const state = valueObject.state;
  const district = valueObject.district;
  const college = valueObject.institution;
  const branch =valueObject.discipline;
  const phone = valueObject.mobile;
  const field = "Business Development";
  const eligible = valueObject.FitforThis;
  const cv = valueObject.resumeURL;
  const Email = valueObject.email;
  const current = valueObject.statusofDegree;
  const degree = valueObject.degree;
console.log("BD posted");
  return sendEmailToUs(displayName, state, district, college, branch, phone, field, eligible, cv, Email, current, degree);
});


exports.sendEmailToUsMarketing = functions.database.ref('/MARKETING/{pushId}').onWrite(event => {
  if (!event.data.val() || event.data.previous.val()) {
    console.log("not a new write event");
    return;
  }
  var valueObject = event.data.val();

  const displayName = valueObject.name;
  const state = valueObject.state;
  const district = valueObject.district;
  const college = valueObject.institution;
  const branch =valueObject.discipline;
  const phone = valueObject.mobile;
  const field = "Marketing";
  const eligible = valueObject.FitforThis;
  const cv = valueObject.resumeURL;
  const Email = valueObject.email;
  const current = valueObject.statusofDegree;
  const degree = valueObject.degree;

  return sendEmailToUs(displayName, state, district, college, branch, phone, field, eligible, cv, Email, current, degree);
});




function sendEmailToUs(displayName, state, district, college, branch, phone, field, eligible, cv, Email, current, degree) {
  const mailOptions = {
    from: `${APP_NAME} <noreply@firebase.com>`,
    to: gmailEmail
  };
console.log("2 step");
  displayName = displayName.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});

  mailOptions.subject = `Career`;
  mailOptions.text = `Dear Sir,
  I, ${displayName || ''}, live at ${district} of ${state}. I am ${current} my ${degree} degree from ${college}. I am interested for ${field} Development. I think I am eligible for this because ${eligible}.
  The link of mt cv ${cv}.

  Looking forward to quick response. My phone number is ${phone} and email is ${Email}.` ;
  return mailTransport.sendMail(mailOptions).then(() => {
    console.log('New welcome email sent to: us');
  });
}




