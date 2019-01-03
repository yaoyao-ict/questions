import express from 'express';
import '../db/models/user';
import Question from '../db/models/question';

const router = express.Router();

/* GET users listing. */
router.get('/', (_req, res) => {
  Question
    .find()
    .limit(5)
    .populate('user')
    .exec((err, questions) => {
      res.send({ questions });
    });
});

router.get('/my', (_req, res) => {
  res.send('Your questions');
});


module.exports = router;
