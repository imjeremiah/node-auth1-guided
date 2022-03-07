const router = require('express').Router();
const { add, findBy } = require('../users/users-model');
const bcrypt = require('bcryptjs');
const validatePayload = (req, res, next) => {
    next()
}

router.post('/register', validatePayload, async (req, res, next) => {
    try {
        const { username, password } = req.body
        const hash = bcrypt.hashSync(password, 8) // 2^8 !
        const user = { username, password: hash }
        const createdUser = await add(user)
        res.status(201).json(createdUser)
    } catch (err) {
        next(err)
    }
})
router.post('/login', validatePayload, async (req, res, next) => {
    try {
        const { username, password } = req.body
        // does username correspond to an existing user?
        const [user] = await findBy({ username })

        // if existing has length, awesome
        // otherwise, send her packing
        if (user && bcrypt.compareSync(password, user.password)) {
            console.log(user)
            console.log(req.session)
            // we have determined the username & password are legit
            // we have to start a session with this user !!!
            req.session.user = user;
            // 1 - a cookie will be set on the repsonse containing a sessionId
            // 2 - the session will be stored with a sessionId matching that of the cookie
            res.json({ message: `welcome, ${username}, have a cookie` })
        } else {
            next({ status: 401, message: 'bad credentials!' })
        }
    } catch (err) {
        next(err)
    }
})
router.get('/logout', async (req, res) => {
    if (req.session.user) {
        // destroy the session
        req.session.destroy(err => {
            if (err) {
                res.json({ message: 'sorry, you cannot leave' })
            } else {
                res.json({ message: 'bye!' })
            }
        })
    } else {
        res.json({ message: 'but I do not know you!' })
    }
})

module.exports = router;