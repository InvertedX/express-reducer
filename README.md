# express-reducer [![Build Status](https://travis-ci.org/InvertedX/express-reducer.svg?branch=master)](https://travis-ci.org/InvertedX/express-reducer)

Middleware for express responses. 

Express-reducer mutate response json body according to client requirements like graphQL
this is will improve client side performance check usage section for more details  
 

## Getting started [![npm version](https://badge.fury.io/js/express-reducer.svg)](https://www.npmjs.com/package/express-reducer)

    $ npm install express-reducer

Then in your middleware
````javascript 
  const express = require('express')
  const app = express() 
  const reducer = require('express-reducer') 
  app.use(reducer)     
````

## Usage

Just hookup with express and we are good to go

**Using with objects and array responses**
```javascript
app.get('/object', function (req, res) {
  res.json({
    name:"jon doe",
    age: 20,
    profile_image: "http://url.com/image",
    phone:"(011)111526456",
    address:"lorem ipsum dolor sit amet meaning "
  });
})

```
The above route will return entire object but the client just need name and profile_image
but creating multiple end points with different response is tedious.

using express-reducer we can solve this issue similar to  **[GraphQL](http://graphql.org)** .client can pass what they need 
using `Pluck` keyword as GET parameter along with required object keys 

for example

 ``
 http://api.dev/object?pluck=name,profile_image
 ``
 
**response will be look like this**

 ```json
  {
     "name":"jon doe",
     "profile_image": "http://url.com/image"
  }
``` 

#### array responses 

we can use `express-reducer` with array responses 

but currently `express-reducer` does not support nested reductions 

**Example**
```javascript
app.get('/characters', function (req, res) {
  res.json([
        {stark: 'arya', lannister: 'tyrion', targaryen: 'daenerys', Greyjoy: 'Theon'},
        {stark: 'rob', lannister: 'jaime', targaryen: 'Viserys', Greyjoy: 'Yara'},
        {stark: 'brandon', lannister: 'tyrion', targaryen: 'Rhaegar', Greyjoy: 'balon'},
        {stark: 'sansa', lannister: 'tywin', targaryen: 'Aegon', Greyjoy: 'euron'}
      ] 
  );
});
```
we can filter out these characters based on the family like this 

``http://api.dev/characters?pluck=stark,targaryen``

*response will be look like this*

```json
[
  {
    "stark":"arya",
    "targaryen":"daenerys"
  },
  {
    "stark":"rob",
    "targaryen":"Viserys"
  },
  {
    "stark":"brandon",
    "targaryen":"Rhaegar"
  },
  {
    "stark":"sansa",
    "targaryen":"Aegon"
  }
]
```



See the mocha [tests](https://github.com/InvertedX/express-reducer/tree/master/test) for some more examples.
 
# License
The MIT license

Copyright © 2017 Sarath kumar ([sarath.me](https://sarath.me) )
