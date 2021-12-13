const express = require('express');
const app = express();
const { comics, input } = require('./data');
// const authorizedUser = require('./authorizedUser');

// console.log(comics);

// app.use(authorizedUser);

app.get('/', (req, res) => {
    res.send(`<style>
        *{
            background-color: lightgrey
        } 
        body{
            padding: 0rem;
            margin: 0rem;
        }

        p{
            max-width: 25rem;
        } 

        code{
            padding: 0.5rem; 
            border: 1px solid black; 
            background-color: grey; 
            color: white; 
            box-shadow: 0.4rem 0.3rem 0 0 rgba(0, 0, 0, 0.15);
        }

        code,p,a#first,h4,h6{
            margin-left: 2rem;
        }
        h6{
            margin-top: 0.4rem;
            margin-bottom: 0rem;
        }
        a#second {
            margin-left: 0.5rem;
        }

        h1{
            margin-top: 0rem;
            padding-bottom: 1rem;
            padding-top: 1rem;
            padding-left: 1rem;
            color: white;
            background-color: grey;
        }
    </style>
    <h1>WetSocks API Documentation</h1>
    <a id="first" href="/api/comics">comics</a>
    <a id="second" href="/api/input">inputs</a>
    <img style = "width: 45%; margin-right: 11rem; box-shadow: 1.2rem 0.7rem 0 0 rgba(0, 0, 0, 0.15); float: right;" src=${comics[0].img}>
    <br>
    <h6 style="color: grey">This is a pretty straightforward api...</h6>
    <p>In order to pull a comic, you use "[url]/api/comics/comicid", where comicid is the number of the comic you want to display. This will return an object that includes the name of the comic, the id, and the image relating to the comic. For example:</p>
    <code style="padding: 0.5rem; border: 1px solid black; background-color: grey; color: white; box-shadow: 0.4rem 0.3rem 0 0 rgba(0, 0, 0, 0.15);">const url = "wetsocks.com/api/comics/1"</code>
    <p>If you want to see peoples\' inputs, i.e. suggestions for what action the character should perform next, you would use "[url]/api/input/comicid", where "comicid" is the comic whose inputs you\'re looking for. For example:</p>
    <code>const url = "wetsocks.com/api/input/1"</code>
    <p>Or, if you wanted a specific input from that list:</p>
    <code>const url = "wetsocks.com/api/input/1/1"</code>
    <p>You can also search for specific comics or inputs using their text/name, as follows:</p>
    <code>const url = "wetsocks.com/api/v1/inputQuery?search=wetsocks"</code>
    <br><br>
    <code>const url = "wetsocks.com/api/v1/comicsQuery?search=Name"</code>
    <p>As well as limit the number of seqarch results:</p>
    <code>const url = "wetsocks.com/api/v1/comicsQuery?search=Name&limit=1"</code>
    <br><br>
    <code>const url = "wetsocks.com/api/v1/inputQuery?search=Text&limit=1</code>`);
});
app.get('/api/comics', (req, res) => {
    const newComics = comics.map((comic) => {
        const { id, name, img, text } = comic;
        return { id, name, img, text }
    });

    res.json(newComics);
});
app.get('/api/input', (req, res) => {
    const newInput = input.map((input) => {
        const { id, comic, text } = input;
        return { id, comic, text }
    });

    res.json(newInput);
});

app.get('/api/comics/:comicID', (req, res) => {
    // console.log(req);
    // console.log(req.params);
    const { comicID } = req.params

    const singleComic = comics.find(
        (comic) => comic.id === Number(comicID)
    );
    if (!singleComic) {
        return res.status(404).send('Comic Does Not Exist');
    }

    return res.json(singleComic);
});
app.get('/api/input/:inputID', (req, res) => {
    // console.log(req);
    // console.log(req.params);
    const { inputID } = req.params

    const singleInput = input.find(
        (input) => input.id === Number(inputID)
    );
    if (!singleInput) {
        return res.status(404).send('Input Does Not Exist');
    }

    return res.json(singleInput);
});

app.get('/api/v1/comicsQuery', (req, res) => {
    // console.log(req.query)
    const { search, limit } = req.query
    let sortedComics = [...comics];

    if (search) {
        sortedComics = sortedComics.filter((comic) => {
            return comic.name.includes(search);
        });
    }
    if (limit) {
        sortedComics = sortedComics.slice(0, Number(limit));
    }
    if (sortedComics.length < 1) {
        // res.status(200).send('no products matched your search');
        return res.status(200).json({ success: true, data: [] });
    }
    res.status(200).json(sortedComics);
});

app.get('/api/v1/inputQuery', (req, res) => {
    // console.log(req.query)
    const { search, limit } = req.query
    let sortedInputs = [...input];

    if (search) {
        sortedInputs = sortedInputs.filter((input) => {
            return input.text.includes(search);
        });
    }
    if (limit) {
        sortedInputs = sortedInputs.slice(0, Number(limit));
    }
    if (sortedInputs.length < 1) {
        // res.status(200).send('no products matched your search');
        return res.status(200).json({ success: true, data: [] });
    }
    res.status(200).json(sortedInputs);
});

app.listen(5000, () => {
    console.log('Listening on port 5000...');
});

let pass = "mongodb+srv://TruPotato:WGPrLoRlWTtu98Bt@task-manager-practice.2lkb4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"