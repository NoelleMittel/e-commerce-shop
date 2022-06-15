const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

// GET /api/users
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email', 'userID']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// GET /api/user/:id
router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId)
    // include orders/reviews here later
    res.json(user)
  } catch (err) {
    next(err)
  }
})
