const express = require('express');
const app = express();
const { comics, input } = require('./data');

// console.log(comics);

app.get('/', (req, res) => {
    res.send('<style>*{background-color: lightgrey}</style><h1>WetSocks API Documentation</h1><a href="/api/comics">comics </a><a href="/api/input"> inputs</a><br><h6 style="color: grey">This is a pretty straightforward api...</h6><p>In order to pull a comic, you use "[url]/api/comics/comicid", where comicid is the number of the comic you want to display. This will return an object that includes the name of the comic, the id, and the image relating to the comic. For example:</p><code style="padding: 0.5rem; border: 1px solid black; background-color: grey; color: white; box-shadow: 0.4rem 0.3rem 0 0 rgba(0, 0, 0, 0.15);">const url = "wetsocks.com/comics/1"</code><p>If you want to see peoples\' inputs, i.e. suggestions for what action the character should perform next, you would use "[url]/api/input/comicid", where "comicid" is the comic whose inputs you\'re looking for. For example:</p><code style="padding: 0.5rem; border: 1px solid black; background-color: grey; color: white; box-shadow: 0.4rem 0.3rem 0 0 rgba(0, 0, 0, 0.15);">const url = "wetsocks.com/input/1"</code><p>Or, if you wanted a specific input from that list:</p><code style="padding: 0.5rem; border: 1px solid black; background-color: grey; color: white; box-shadow: 0.4rem 0.3rem 0 0 rgba(0, 0, 0, 0.15);">const url = "wetsocks.com/input/1/1"</code>');
});
app.get('/api/comics', (req, res) => {
    const newComics = comics.map((comic) => {
        const { id, name, img } = comic;
        return { id, name, img }
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

app.get('/api/v1/query', (req, res) => {
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

app.listen(5000, () => {
    console.log('Listening on port 5000...');
});