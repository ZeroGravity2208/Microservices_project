const mongo = require('mongodb');
const client = new mongo.MongoClient('mongodb://localhost:27017', {
  useNewUrlParser: true,
});

function showAllPolicemen(policemenCollection, callback) {
  policemenCollection.find({}).toArray((err, data) => {
    if (err) {
      console.log('Error!')
    } else {
      callback(data);
    }
  })
}

function policemenOperations(params) {

  client.connect(err => {
    if (err) {

      console.log('Connection err!', err)

    } else {

      // console.log('Connected ;)');

      const db = client.db('policjanci');
      const policemenCollection = db.collection('policjanci');
      const {
        type
      } = params;

      switch (type) {

        case 'showAll':
          showAllPolicemen(policemenCollection, function (data) {
            console.log(data)
          });

          break;


        case 'show':
          const {
            id
          } = params;

          policemenCollection.find({
            _id: id
          }).toArray((err, data) => {
            if (err) {
              console.log('Error!')
            } else {
              console.log(data);
            }
          })
          break;

        case 'insert':
          const {
            imie, nazwisko, nr_identyfikacyjny, nr_legitymacji, stopien, data_waznosci_legitymacji
          } = params;

          console.log(nazwisko);
          break;

        default:
          console.log('default')
          break;
      }
      client.close();
    }
  })
}
const params = {
  type: 'showAll',
  id: 1,
  imie: 'Grzegorz',
  nazwisko: 'Gorniak',
  nr_identyfikacyjny: 123,
  nr_legitymacji: 123,
  stopien: 'jakis',
  data_waznosci_legitymacji: '1',
}
policemenOperations(params)

module.exports = policemenOperations;