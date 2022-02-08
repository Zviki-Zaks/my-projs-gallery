'use strict'

var gProjs = [
    {
        id: 'books-shop',
        name: 'Books shop',
        title: 'Book shop management',
        desc: `Book shop management system. 
               Allows you to add, read, update and delete books.`,
        url: 'https://zviki-zaks.github.io/book-shop/',
        publishedAt: '03-02-2022',
        labels: ['CRUD', 'table layout'],
    },
    {
        id: 'guess-me',
        name: 'Guess me',
        title: 'Guess me game',
        desc: `Play guess me with the computer, 
               and teach him more and more...`,
        url: "projs/guess-me",
        publishedAt: '06-02-2022',
        labels: ['jQuery', 'bootstrap'],
    },
]

function getProjsToDisplay(){
    return gProjs
}

function getProjById(projId){
    return gProjs.find(proj => {return proj.id===projId})
}