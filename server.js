//Cannot use the import syntax as it requires Babel or Typescript
//React can use import because it is build based of ES2015 syntax
//For Express, this way of bringing in modules is known as CommonJS
const express = require('express');

const app = express();

//Will look for a PORT in the env when app is deployed or else 5000 which is used for development
const PORT = process.env.PORT || 5000;

//Define routes
app.use('/api/users', require('./routes/users')); 
app.use('/api/contacts', require('./routes/contacts'));  
app.use('/api/auth', require('./routes/auth'));

//adding an endpoint to the server
app.get('/', (req,res)=>{res.json({msg: 'Welcome to the Contact Keeper API'})});

//listen to a PORT
app.listen(PORT, ()=>console.log(`Server started on port ${PORT}`));