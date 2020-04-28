var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
  // READ NOTE
  app.get('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('notes').findOne(details, (err, item) => {
      if(err) {
        res.send({'error': 'An error has occurred'});
      } else {
        res.send(item);
      }
    });
  });
  // CREATE NEW NOTE
  app.post('/notes', (req, res) => {
    const note = {
      title: req.body.title,
      text: req.body.body
    }
    db.collection('notes').insert(note, (err, results) => {
      if(err) {
        res.send({'error': 'An error has occurred' });
      } else {
        res.send(results.ops[0]);
      }
    });
  });
};