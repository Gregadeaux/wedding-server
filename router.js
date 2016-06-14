const Authentication = require('./controllers/authentication')
const PhotoRoutes = require('./controllers/photo_routes')
const passportService = require('./services/passport')
const passport = require('passport')

const requireAuth = passport.authenticate('jwt', { session: false })
const requireSignin = passport.authenticate('local', { session: false })

module.exports = function(app) {
	app.get('/', requireAuth, PhotoRoutes.all)
	app.get('/add', requireAuth, PhotoRoutes.add)
	app.post('/signin', requireSignin, Authentication.signin)
	app.post('/signup', Authentication.signup)
}