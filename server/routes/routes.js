const express = require('express')

const UserCtrl = require("../controllers/schema-controller");
const router = express.Router();

router.put('/user/create/:email/:password', UserCtrl.addUser);
router.get('/login/:email/:password', UserCtrl.loginUser);
router.get('/user/posts/:uid', UserCtrl.getPosts);
module.exports = router
