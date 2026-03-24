/*Building GraphQL API's*/
import express from 'express';
import {graphqlHTTP} from 'express-graphql';
import {buildSchema} from 'graphql';

const app=express();
const PORT=5000;

//sample data
let books=[
    {'id':1,'Title':"Harry Potter",'Author':'J.K Rowling'},
    {'id':2,'Title':"Austrian Painter",'Author':'Blitzkreg'},
    {'id':3,'Title':"Journey to the center of Earth",'Author':'Jules Verne'},
];

//define schema
const myschema = buildSchema(`
    type Book {
        id: Int
        Title: String
        Author: String
    }

    type Query {
        books: [Book]
        book(id: Int!): Book
    }
`);

const root={
    getBooks:()=>books,
    getBook:({id})=>books.find(b=>b.id===id),
    addBook:({title,author})=>{
        const newBook={
            id:books.length+1,
            title,
            author
        };
        books.push(newBook);
        return newBook;
    }
};

//3. Setup GraphQL endpoint
app.use('/graphql',graphqlHTTP({
    schema:myschema,
    rootValue:root,
    graphiql:true //enables UI
}));

app.listen(PORT,()=>{
    console.log(`Server Running on http://localhost:${PORT}/graphql`);
});
