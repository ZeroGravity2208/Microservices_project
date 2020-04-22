const mongo = require('mongodb');

const client = new mongo.MongoClient('mongodb://localhost:27017', {
    useNewUrlParser: true
});

client.connect(err => {
    if (err) {
        console.log('Błąd połączenia');
    } else {
        console.log('Połączono');

        const db = client.db('samochody');
        const cars = db.collection('samochody');

        cars.find({
            _id: 1
        }).toArray((err, data) => {
            if (err) {
                console.log('Błąd!')
            } else {
                console.log(data)
            }
        });

        client.close();
    }
})


















// var express = require('express');
// var bodyParser = require('body-parser');
// var MongoClient = require('mongodb').MongoClient;


// var app = express();
// var db;

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//     extended: true
// }));

// var artists = [{
//         id: 1,
//         name: 'AAAAAAA'
//     },
//     {
//         id: 1,
//         name: 'BBBBBBBB'
//     },
//     {
//         id: 1,
//         name: 'CCCCCCCC'
//     }
// ];

// app.get('/', function (req, res) {
//     res.send('Hello API');
// })

// app.get('/artists', function (req, res) {
//     res.send(artists);
// })


// app.get('/artists/:id', function (req, res) {
//     console.log(req.params);
//     var artist = artists.find(function (artist) {
//         return artist.id === Number(req.params.id)
//     });
//     res.send(artist);
// })

// app.post('/artists', function (req, res) {
//     var artist = {
//         id: Date.now(),
//         name: req.body.name
//     };
//     artists.push(artist);
//     res.send(artist);

// })

// app.put('/artists/:id', function (req, res) {
//     var artist = artists.find(function (artist) {
//         return artist.id === Number(req.params.id)
//     });
//     artist.name = req.body.name;
//     res.sendStatus(200);
// });

// app.delete('/artists/:id', function (req, res) {
//     artists = artists.filter(function (artist) {
//         return artist.id !== Number(req.params.id);
//     })
//     res.sendStatus(200);
// })




// MongoClient.connect('mongo:/localhost:27017/myapi', function (err, database) {
//     if (err) {
//         return console.log(err);
//     }
//     db = database;

//     app.listen(3012, function () {
//         console.log('API app started');
//     })
// })