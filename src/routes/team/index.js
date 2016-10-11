import {Router} from 'express';

import models from '../../models';

const teamRouter = Router(); // eslint-disable-line

function isLoggedIn(req, res, next) { // eslint-disable-line
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

function checkTeamOwner(req, res, next) {
  if (req.isAuthenticated()) {
    models.team.findById(req.params.id).then((team) => {
      if (res.locals.user.username === team.teamCaptain) {
        next();
      } else {
        res.status(403).send({error: 'You are not the captain of this team!'});
      }
    }).catch((e) => {
      if (e) {
        res.send(e);
      }
    });
  } else {
    res.status(401).send({error: 'You must be logged in and the Team Captain!'});
  }
}

teamRouter.get('/team/new', isLoggedIn, (req, res) => {
  res.render('team/new', {title: 'Create Team'});
});

teamRouter.post('/team/new', isLoggedIn, (req, res) => {
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

teamRouter.get('/team/:id/edit', checkTeamOwner, (req, res) => {
  models.team.findById(req.params.id).then((team) => {
    res.render('team/edit', {team, title: team.teamName});
  }).catch((e) => {
    if (e) {
      res.status(400).send(e);
    }
  });
});

teamRouter.post('/team/:id/edit', checkTeamOwner, (req, res) => {
  models.team.findById(req.params.id).then((team) => {
    team.update({
      teamName: req.body.teamName,
      teamRegion: req.body.teamRegion,
    })
    .then(() => {
      res.redirect(`/team/${req.params.id}`);
    });
  }).catch((e) => {
    if (e) {
      res.send(e);
    }
  });
});

teamRouter.get('/team/:id/invite', (req, res) => {
  if (req.query.playerSearch) {
    models.user.find({where: {username: req.query.playerSearch.toLowerCase()}}).then((user) => {
      res.redirect(`/user/${user.id}`);
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
