import {Router} from 'express';

import Team from '../../models/team';

const teamRouter = Router(); // eslint-disable-line

teamRouter.get('/create-team', (req, res) => {
  res.render('team/create-team', {title: 'Create Team'});
});

teamRouter.post('/create-team', (req, res) => {
  const newTeam = {
    teamName: req.body.teamName,
    teamCaptain: req.user.username,
    teamRegion: req.body.region,
  };

  Team
    .build(newTeam)
    .save()
    .then(() => {
      res.status(201).send();
    }).catch((e) => {
      if (e) {
        res.status(400).send(e);
      }
    });
});

teamRouter.get('/team/:id', (req, res) => {
  Team.findById(req.params.id).then((team) => {
    res.send(team);
  }).catch((e) => {
    if (e) {
      res.status(400).send(e);
    }
  });
});

export default teamRouter;
