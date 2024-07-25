const Validator = require('validatorjs')
const User = require('../models/user');
const HttpError = require('../models/http-error');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// get salt for bcrypt
const salt = bcrypt.genSaltSync(10);

const signup = async (req, res, next) => {
    let { email, password, name, phone } = req.body;

    const data = {
        email: email,
        password: password,
        name: name,
        phone: phone,
    }

    const rules = {
        email: 'required|email',
        password: 'required|min:1',
        name: 'required|min:3',
        // phone: 'integer|required|size:10',
    }

    const validation = new Validator(data, rules)

    if(validation.fails()){
        const errors = validation.errors
        res.status(400)
        res.json({...errors})
    }

    let user;
    try{
        user = await User.findOne({ email: email })
        if(user === null) {
            user = new User({
                name: name,
                email: email,
                password: bcrypt.hashSync(password, salt),
                phone:phone
            });
            user = await user.save()
            res.status(200)
            res.json({ user: user.toObject({ getters: true }) })
        } else {
            const error = new HttpError('User Already Exits!', 400)
            return next(error)
        }
    } catch (err) {
        const error = new HttpError("Unable to signup user", 400)
        return next(error)
    }

}

const login = async (req, res, next) => {
    const { email, password } = req.body

    const data = {
        email: email,
        password: password,
    }

    const rules = {
        email: 'required|email',
        password: 'required',
    }

    const validation = new Validator(data, rules)
    
    if(validation.fails()){
        const errors = validation.errors
        res.status(400)
        res.json({errors: errors})
    }

    let user;
    try{
        user = await User.findOne({ email: email })
        if(user == null){
            const error = new HttpError("User not found!", 404)
            return next(error)
        }
        if(bcrypt.compareSync(password, user.password)){
            user.token = jwt.sign({ userId: user.id, email: user.email }, "secret");
            
            await user.save()
            res.status(200)
            res.json({ user: user.toObject({ getters: true }) })
        } else {
            const error = new HttpError("Password not correct", 400)
            return next(error)
        }

    } catch (err) {
        const error = new HttpError("Unable to login user", 400)
        return next(error)
    }
}

const logout = async (req, res, next) => {
    if(req.userData == undefined) {
        const error = new HttpError('User not logged in', 400)
        return next(error)
    }

    try{
        const user = await User.findById(req.userData.userId)
        user.token = null
        
        user.save()
        
    } catch (err) {
        const error = new HttpError('User not logged in', 400)
        return next(error)
    }

    res.status(200)
    res.json({ userData: req.userData })
}

const getUsers = async (req, res, next) => {
    let { page, limit, search } = req.query
    page = parseInt(page)
    limit = parseInt(limit)

    let matchCondition = {}
    if(search) {
        matchCondition.$or = [
            {name: { $regex: ".*" + search + ".*", $options: 'i' }},
            {email: { $regex: ".*" + search + ".*", $options: 'i' }}
        ]
    }

    let users = [];
    try {
        users = await User.find(matchCondition)
        .limit(typeof limit != undefined ? limit : null)
        .skip(typeof page != undefined ? (page-1)*limit : null)

        // users = await User.aggregate([
        //     {
        //         $project: {
        //             name: 1,
        //             email: 1,
        //             id: 1
        //         }
        //     },
        //     {
        //         $match: {
        //             $or: [
        //                 {name: { $regex: ".*" + search + ".*", $options: 'i' }},
        //                 {email: { $regex: ".*" + search + ".*", $options: 'i' }}
        //             ]
        //         }
        //     },
        //     {
        //         $addFields: {
        //             id: "$_id"
        //         }
        //     },
        //     {
        //         $skip: (page-1)*limit
        //     },
        //     {
        //         $limit: limit
        //     }
        // ])

        res.status(200).json({users})
        // return next()

    } catch(err) {
        console.log(err)
        const error = new HttpError('Unable to fetch Users', 400)
        return next(error)
    }
}

const getUserbyId = async (req, res, next) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId)
        res.status(200).json({ user })
    } catch (err) {
        const error = new HttpError('Unable to fetch User', 400)
        return next(error)
    }
}

const deleteUser = async (req, res, next) => {
    const { userId } = req.params;
    try {
        const user = await User.findByIdAndDelete(userId)
        res.status(200).json({ user })
    } catch (err) {
        const error = new HttpError('Unable to delete user', 400)
        return next(error)
    }
}


exports.signup = signup
exports.login = login   
exports.logout = logout 
exports.getUsers = getUsers 
exports.deleteUser = deleteUser 
exports.getUserbyId = getUserbyId 