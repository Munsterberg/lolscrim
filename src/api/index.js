import {Router} from 'express';

import Sample from '../models/sample';

const sampleRouter = Router(); // eslint-disable-line

sampleRouter.get('/sample', (req, res) => {
  Sample.findAll().then((entries) => {
    res.json(entries);
  }).catch((error) => {
    res.status(400).send(error);
  });
});

sampleRouter.post('/sample', (req, res) => {
  const newEntry = {title: req.body.title, age: req.body.age};

  Sample
    .build(newEntry)
    .save()
    .then((entry) => {
      res.json(entry);
    }).catch((error) => {
      res.status(400).send(error);
    });
});

export default sampleRouter;
