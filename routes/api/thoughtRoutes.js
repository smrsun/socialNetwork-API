const router = require('express').Router();

const {
  getThought,
  getSingleThought,
  createThought,
  deleteThought,
  updateThought,
} = require('../../controllers/thoughtController.js')

router.route('/').get(getThought).post(createThought);

router.route('/:thoughtId')
.get(getSingleThought)
.delete(deleteThought)
.put(updateThought);


module.exports = router;
