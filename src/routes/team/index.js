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
    memberTwo: req.body.memberTwo,
    memberThree: req.body.memberThree,
    memberFour: req.body.memberFour,
    memberFive: req.body.memberFive,
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

export default teamRouter;
