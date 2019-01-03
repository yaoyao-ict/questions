import express from 'express';

const router = express.Router();

/* GET home page. */
router.get('/', (_req, res) => {
  res.send({ title: 'Stack OverFlow1' });
});

module.exports = router;
