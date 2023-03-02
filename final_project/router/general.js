const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


const doesExist = (username)=>{
    let userswithsamename = users.filter((user)=>{
      return user.username === username
    });
    if(userswithsamename.length > 0){
      return true;
    } else {
      return false;
    }
  }


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!isValid(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});    
    }
  } 
  return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books,null,4));
});


public_users.get('/books',function (req, res) {

    const get_books = new Promise((resolve, reject) => {
        resolve(res.send(JSON.stringify({books}, null, 4)));
      });

      get_books.then(() => console.log("Promise for Task 10 resolved"));

  });


  public_users.get('/books/:isbn',function (req, res) {

    const get_books = new Promise((resolve, reject) => {
        const isbn = req.params.isbn;
        res.send(books[isbn])
      });

      get_books.then(() => console.log("Promise for Task 11 resolved"));

  });


  public_users.get('/book-author/:author',function (req, res) {

    const get_books = new Promise((resolve, reject) => {
        let keys = Object.keys(books);
        const author2 = req.params.author;
      
        for(let i =1;i<keys.length+1;i++)
        {
              if(books[i].author==author2)
              {
                  res.send(books[i]);
              }
        }
      });

      get_books.then(() => console.log("Promise for Task 12 resolved"));

  });


  public_users.get('/book-title/:title',function (req, res) {

    const get_books = new Promise((resolve, reject) => {
        let keys = Object.keys(books);
        const title2 = req.params.title;

         for(let i =1;i<keys.length+1;i++)
            {
                if(books[i].title==title2)
                {
                res.send(books[i]);
                }
            }
      });

      get_books.then(() => console.log("Promise for Task 13 resolved"));

  });
  
// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  res.send(books[isbn])
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  let keys = Object.keys(books);
  const author2 = req.params.author;

  for(let i =1;i<keys.length+1;i++)
  {
        if(books[i].author==author2)
        {
            res.send(books[i]);
        }
  }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
    
  let keys = Object.keys(books);
  const title2 = req.params.title;

  for(let i =1;i<keys.length+1;i++)
  {
        if(books[i].title==title2)
        {
            res.send(books[i]);
        }
  }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  let keys = Object.keys(books);
  const isbn = req.params.isbn;
    res.send(books[isbn].reviews);
});

module.exports.general = public_users;
