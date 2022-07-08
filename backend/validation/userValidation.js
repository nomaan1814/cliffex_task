const {check}=require('express-validator');
exports.validate=(method)=>{
    switch(method){
        case 'login_user':{
            return[
                // check('email').notEmpty().withMessage('email is required'),
                check('email').isEmail().withMessage('email is not valid'),
                check('password').notEmpty().withMessage('password is required')
                ]
        }
        case 'register_user':{
            return[
                check('name').isLength(3).withMessage('Enter a valid name').isAlpha().withMessage('Name should not contain numbers or special characters'),
                check('email').isEmail().withMessage('Email is not valid'),
                check('password').isLength(8).withMessage('Password should contain 8 characters'),
                check('mobile').isMobilePhone().withMessage('Mobile no is invalid')
            ]
        }

    }
}