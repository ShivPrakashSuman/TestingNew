const Joi = require('joi');
const bcrypt = require('bcrypt');
const User = require('../models/UserModel');

const login = (req, res) => {
    let resp = { status: false, message: 'Oops! Something went wrong?', data: null };
    try {
        resp.status = true;
        resp.message = 'Login page Loding successful';
        res.render('login', { result: resp });
    } catch (e) {
        console.log('catch error', e);
        return res.json(resp);
    }
};
const loginStore = async (req, res) => {
    let resp = { status: false, message: 'Oops! Something went wrong?', data: null };
    const schema = Joi.object({
        email: Joi.string().trim().email().required(),
        password: Joi.string().min(4).max(8).required()
    }).validate(req.body);
    if (schema.error) {
        resp.message = schema.error.details[0].message;
        return res.render('login', { result: resp });
        // return res.json(resp);
    }
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            resp.message = 'Invalid email ?';
            return res.render('login', { result: resp });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            resp.message = 'Invalid password? ';
            return res.render('login', { result: resp });
        }
        resp.message = 'Login successful!';
        return res.redirect(302, '/dashboard'); 
    } catch (e) {
        console.log('catch error', e);
        return res.json(resp);
    }
};

const register = (req, res) => {
    let resp = { status: false, message: 'Oops! Something went wrong?', data: null };
    try {
        resp.status = true;
        resp.message = 'Register page Loding successful';
        res.render('register', { result: resp });
    } catch (e) {
        console.log('catch error', e);
        return res.json(resp);
    }
};

const registerStore = async (req, res) => {
    let resp = { status: false, message: 'Oops! Something went wrong?', data: null };
    const schema = Joi.object({
        username: Joi.string().required(),
        email: Joi.string().trim().email().required(),
        password: Joi.string().min(4).max(8).required(),
        image: Joi.string().uri().optional()
    }).validate(req.body);
    if (schema.error) {
        resp.message = schema.error.details[0].message;
        res.render('register', { result: resp });
        // return res.json(resp);
    }
    try {
        const { username, email, password, image } = req.body;
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(password, salt);
        const usernameExists = await User.findOne({ username });
        if (usernameExists) {
            resp.message = 'Username already exists. Please choose another.';
            return res.render('register', { result: resp });
        }
        const emailExists = await User.findOne({ email });
        if (emailExists) {
            resp.message = 'Email already exists. Please use another email.';
            return res.render('register', { result: resp });
        }
        const user = new User({
            username: username,
            email: email,
            password: hash,
            is_admin: 0
        })
        let result = await user.save();
        if (result) {
            resp.message = 'Register successful';
            res.render("register", { result: resp });
        } else {
            resp.message = 'Not Record Registered';
            res.render("register", { result: resp });
        }
    } catch (e) {
        console.log('catch error', e);
        return res.json(resp);
    }
};

module.exports = { login, loginStore, register, registerStore };
