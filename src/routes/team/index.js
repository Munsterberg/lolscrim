import {Router} from 'express';

import Team from '../../models/team';

const teamRouter = Router(); // eslint-disable-line

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

teamRouter.get('/create-team', isLoggedIn, (req, res) => {
  res.render('team/create-team', {title: 'Create Team'});
});

teamRouter.post('/create-team', isLoggedIn, (req, res) => {
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
    res.render('team/show', {team, title: team.teamName});
  }).catch((e) => {
    if (e) {
      res.status(400).send(e);
    }
  });
});

teamRouter.get('/team/:id/edit', (req, res) => {
  Team.findById(req.params.id).then((team) => {
    res.render('team/edit', {team, title: team.teamName});
  }).catch((e) => {
    if (e) {
      res.status(400).send(e);
    }
  });
});

export default teamRouter;
