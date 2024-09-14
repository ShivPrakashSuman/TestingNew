const { Router } = require('express');
const AuthController = require('../controllers/AuthController');
const DashboardController = require('../controllers/DashboardController');
const router = Router();

router.get('/login', AuthController.login);
router.post('/login-store', AuthController.loginStore);
router.get('/register', AuthController.register);
router.post('/register-store', AuthController.registerStore);

router.get('/dashboard', DashboardController.index);
router.delete('/delete/:id', DashboardController.destroy);

module.exports = router;     