const Validator = require('validatorjs')
const Admin = require('../models/admin');
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
    }

    const validation = new Validator(data, rules)

    if(validation.fails()){
        const errors = validation.errors
        res.status(400)
        res.json({...errors})
    }

    let admin;
    try{
        admin = await Admin.findOne({ email: email })
        if(admin === null) {
            admin = new Admin({
                name: name,
                email: email,
                password: bcrypt.hashSync(password, salt),
                phone:phone
            });
            admin = await admin.save()
            res.status(200)
            res.json({ admin: admin.toObject({ getters: true }) })
        } else {
            const error = new HttpError('admin Already Exits!', 400)
            return next(error)
        }
    } catch (err) {
        console.log(err)
        const error = new HttpError("Unable to signup admin", 400)
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

    let admin;
    try{
        admin = await Admin.findOne({ email: email })
        if(admin == null){
            const error = new HttpError("admin not found!", 404)
            return next(error)
        }
        if(bcrypt.compareSync(password, admin.password)){
            admin.token = jwt.sign({ adminId: admin.id, email: admin.email }, "secret");
            
            await admin.save()
            res.status(200)
            res.json({ admin: admin.toObject({ getters: true }) })
        } else {
            const error = new HttpError("Password not correct", 400)
            return next(error)
        }

    } catch (err) {
        const error = new HttpError("Unable to login admin", 400)
        return next(error)
    }
}

const logout = async (req, res, next) => {
    if(req.adminData == undefined) {
        const error = new HttpError('Admin not logged in', 400)
        return next(error)
    }

    try{
        const admin = await Admin.findById(req.adminData.adminId)
        admin.token = null
        
        admin.save()
        
    } catch (err) {
        const error = new HttpError('admin not logged in', 400)
        return next(error)
    }

    res.status(200)
    res.json({ adminData: req.adminData })
}

const getAdmins = async (req, res, next) => {
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

    let admins = [];
    try {
        admins = await Admin.find(matchCondition)
        .limit(typeof limit != undefined ? limit : null)
        .skip(typeof page != undefined ? (page-1)*limit : null)

        // admins = await admin.aggregate([
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

        res.status(200).json({admins})
        // return next()

    } catch(err) {
        console.log(err)
        const error = new HttpError('Unable to fetch admins', 400)
        return next(error)
    }
}


exports.signup = signup
exports.login = login   
exports.logout = logout 
exports.getadmins = getAdmins 