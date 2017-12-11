const express=require('express');
const hbs=require('hbs');
const fs= require('fs');
const PORT=process.env.PORT || 3000;
var app=express();
app.use((req,res,next)=>{
  //server wont have been done until call next();
  var now = new Date().toString();
  var log=`${now}:${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log',log + '\n');
  next();
});

app.use((req,res,next)=>{
  res.render('maintenance.hbs');
}
);
app.use(express.static(__dirname+'/public'));

//setup all of our HTTP route handlers.EX: if someone visits the root of website
//--> send something back maybe JSON data,html Page
// app.get to register a handler
// app.get('url handle',functionToRun)

// app.get('/',(req,res)=>{
//   res.send('<h1>Hello world</h1>');
// });
hbs.registerHelper('getCurentYear',()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
  return text.toLowerCase();
});

app.get('/',(req,res)=>{
  res.render(
    'homePage.hbs',
    {
      pageTitle:'Home Page',
      welcomeMessage:'Welcome to our Home Page'
    }
  );
});

app.get('/about',(req,res)=>{
    res.render(
      'about.hbs',
      {
        pageTitle:'About Page',

      }
    );
});
//express.static take an absolute path you want to serve up
//dirname store the path to your projects directory E:\Udemy\node-web-server
//we have to concatenate
app.use('/burden',(req,res)=>{
  res.send({
    word:'burden',
    meaning: 'a duty responsibility etx. that cause worry difficult or hard work',
  });
});


//app.listen(3000);
app.listen(PORT,()=>{
  console.log(`Server up is on port ${PORT}`);
});
//for hbs:handlebars packet
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');
