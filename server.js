//Cannot use the import syntax as it requires Babel or Typescript
//React can use import because it is build based of ES2015 syntax
//For Express, this way of bringing in modules is known as CommonJS
//Main File that handles anything related to server
const express = require('express');
const connectDB = require('./config/db');
const path = require('path')

//Setting up ExpressJS
const app = express();

//Connecting to Database 
connectDB();

//Init Middleware
app.use(express.json({extended: false}));

//Will look for a PORT in the env when app is deployed or else 5000 which is used for development
const PORT = process.env.PORT || 5000;

//Define routes
app.use('/api/users', require('./routes/users')); 
app.use('/api/contacts', require('./routes/contacts'));  
app.use('/api/auth', require('./routes/auth'));

//Serve Static Asset in Production
if (process.env.NODE_ENV==='production'){
    //Set Static Folder
    app.use(express.static('client/build'));
    app.get('*', (req,res)=>{
        //dirname refers to current directory
        //look at current directory, look for client, in client look for build & in build look for index.html to run
        return res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    })
}

//listen to a PORT
app.listen(PORT, ()=>console.log(`Server started on port ${PORT}`));