const { Router } = require('express');
const { userGet, userPost, userPut, userDelete } = require('../controller/user.controller');

const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');
const { isValidRole, emailExists, userExists } = require('../helpers/db-validators');

const router = Router();

router.get('/', userGet);
router.post('/', [
    check('email', 'Invalid email').isEmail(),
    check('email').custom(emailExists),
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Password should be more than 6 letters').isLength({ min: 6 }),
    //check('role', 'Invalid role').isIn(['admin', 'user']),
    check('role').custom(isValidRole),
    validateFields
], userPost);
router.put('/:id', [
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom(userExists),
    check('role').custom(isValidRole),
    validateFields
], userPut);
router.delete('/:id', [
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom(userExists),
    validateFields
], userDelete);

module.exports = router;