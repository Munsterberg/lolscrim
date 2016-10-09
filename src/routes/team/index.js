import {Router} from 'express';

import models from '../../models';

const teamRouter = Router(); // eslint-disable-line

function isLoggedIn(req, res, next) { // eslint-disable-line
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

  models.team
    .create(newTeam)
    .then((team) => {
      res.status(201).send();
      models.user.findById(req.user.id)
      .then((user) => {
        user.update({teamId: team.id});
      });
    }).catch((e) => {
      if (e) {
        res.status(400).send(e);
      }
    });
});

teamRouter.get('/team/:id', (req, res) => {
  models.team.findById(req.params.id).then((team) => {
    res.render('team/show', {team, title: team.teamName});
  }).catch((e) => {
    if (e) {
      res.status(400).send(e);
    }
  });
});

teamRouter.get('/team/:id/edit', (req, res) => {
  models.team.findById(req.params.id).then((team) => {
    res.render('team/edit', {team, title: team.teamName});
  }).catch((e) => {
    if (e) {
      res.status(400).send(e);
    }
  });
});

teamRouter.get('/team/:id/invite', (req, res) => {
  if (req.query.playerSearch) {
    models.user.find({where: {username: req.query.playerSearch}}).then((user) => {
      res.redirect(`/${user.id}`);
    }).catch((e) => {
      if (e) {
        res.send(e);
      }
    });
  } else {
    models.team.findById(req.params.id).then((team) => {
      res.render('team/invite', {team, title: team.teamName});
    }).catch((e) => {
      if (e) {
        res.status(400).send(e);
      }
    });
  }
});

export default teamRouter;
