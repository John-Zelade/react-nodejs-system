const {check, validationResult}=require("express-validator");
exports.validateNewUser=[
    check('username')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('Username can not be empty!'),
    check('email')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Email can not be empty!')
        .isEmail()
        .withMessage('Email must be valid!')
        .normalizeEmail()
        .toLowerCase(),
    check('password')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Password can not be empty!')
        .isLength({min:8})
        .withMessage('Minimum 8 characters required!'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({
        errors: errors.array()
    });
    next();
  },
];
exports.validateUpdateUser=[
  check('username')
      .trim()
      .escape()
      .not()
      .isEmpty()
      .withMessage('Username can not be empty!'),
  check('password')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Password can not be empty!')
      .isLength({min:8})
      .withMessage('Minimum 8 characters required!'),
(req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(422).json({
      errors: errors.array()
  });
  next();
},
];