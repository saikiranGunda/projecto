const router = require('express').Router();
const userCtrl = require('../controllers/userCtrl');
const { isAuth } = require('../middlewares/auth');

//Register User 
router.post('/signUp',userCtrl.registerUser);
//login User
router.post('/login',userCtrl.loginUser);
//editProfile
router.get('/getProfile',isAuth,userCtrl.getProfile)
//updateProfile
router.post('/updateProfile',isAuth,userCtrl.updateprofile);
//logout
router.delete('/logOut',isAuth,userCtrl.logOut);







module.exports = router;