//Wypisanie dannych z DB w konsoli
const mongo = require("mongodb");


const client = new mongo.MongoClient('mongodb://localhost:27017', {
    useNewUrlParser: true
});

client.connect(err => {
    if(err){
        console.log('Error in connecting to Database!');
    }else{
        console.log('Connected to Database!');
        const db = client.db('Kierowcy');
        const driver = db.collection('kierowcy_table');


        driver.find({}).toArray((err, data) => {
            if(err){
                console.log('Error!')
            } else {
                console.log(data)
            }
        });
        client.close();
    }
});