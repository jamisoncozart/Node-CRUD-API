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
  // UPDATE NOTE
  app.put('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    if(req.body.body && req.body.title) {
      const note = { text: req.body.body, title: req.body.title };
      db.collection('notes').update(details, note, (err, result) => {
        if(err) {
          res.send({'error': 'An error has occurred'});
        } else {
          res.send(note);
        }
      });
    } else {
      res.send({'error': 'Please add a body and title key/value pair to the PUT request'});
    }
  });
  // DELETE NOTE
  app.delete('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('notes').remove(details, (err, item) => {
      if(err) {
        res.send({'error': 'An error has occurred'});
      } else {
        res.send('Note ' + id + ' deleted!');
      }
    });
  });
};