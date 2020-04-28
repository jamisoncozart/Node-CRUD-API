module.exports = function(app, db) {
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