const { Router } = require('express');
const { userGet, userPost, userPut, userDelete } = require('../controller/user.controller');

const router = Router();

router.get('/:id', userGet);
router.post('/', userPost);
router.put('/:id', userPut);
router.delete('/:id', userDelete);


module.exports = router;