const express = require('express')
const router = express.Router()
const protectRoute = require('../middleware/authMiddleware.js')
const { 
    registerUser,
    authUser,
    logOut,
    getUserProfile,
    updateUserProfile,
    deleteUser
 } = require('../controllers/user.js');

router.post('/', registerUser)
router.post('/auth', authUser)
router.post('/logout', logOut)
router.route('/profile').get(protectRoute, getUserProfile).put(protectRoute, updateUserProfile)
router.delete('/:id', deleteUser)


module.exports = router;