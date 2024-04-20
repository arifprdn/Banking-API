const router = require('express').Router()
const accountController = require('../../controllers/v1/accountController')
const userController = require('../../controllers/v1/userController')
const transactionController = require('../../controllers/v1/transactionController')
const authController = require('../../controllers/v1/authController')
const restrict = require('../../middlewares/restrict')


router.get('/', userController.welcome)
router.post('/users', userController.create)
router.get('/users', userController.index)
router.get('/users/:id', userController.show)
router.post('/accounts', accountController.create)
router.get('/accounts', accountController.index)
router.get('/accounts/:id', accountController.show)
router.post('/transactions', transactionController.transfer)
router.get('/transactions', transactionController.index)
router.get('/transactions/:id', transactionController.show)
router.post('/auth/register', authController.register)
router.post('/auth/login', authController.login)
router.get('/auth/authenticate', restrict, authController.authenticate)

module.exports = router