const router = require('express').Router()

router.post('/register', async (req, res, next) => {
  try {
    res.json('register!!!')
  } catch (err) {
    next(err)
  }
})
router.post('/login', async (req, res, next) => {
  try {
    res.json('login!!!')
  } catch (err) {
    next(err)
  }
})
router.get('/register', async (req, res, next) => {
  try {
    res.json('register!!!')
  } catch (err) {
    next(err)
  }
})

module.exports = router
