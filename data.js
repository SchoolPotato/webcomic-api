const path = require('path');
const dir = path.join(__dirname, 'comics');
const { readFile, writeFile } = require('fs');
let comics = require('./comics.json');

const delComic = (list, id) => {
    list.splice(indexOf(id), 1);
}
const getComic = (id) => {
    return comics.filter((comic) => {
        return comic.id == id;
    });
}

const functions = [
    delComic,
    getComic,
]

console.log(comics);

// module.exports(comics, functions);