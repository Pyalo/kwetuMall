import express from 'express';
import adminModel from '../../models/adminModel.js';
import  jwt  from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const router = express.Router();
const saltRound = 10;

router.post('/signIn', async (req, res)=> {
    if(!req.body.email || !req.body.password){
        res.send('Must provide email and password')
    }
    const admin = await adminModel.findOne({email: req.body.email})
    bcrypt.compare(req.body.password, admin.password, (err, response)=>{
        if(err){
            res.send(err);
        }else if (response === true){
            const token = jwt.sign({userId: admin._id}, 'MY_SECTRET_KEY');
            res.send({
                token: token,
                message: 'Admin accepted'
            });
        }else{
            res.send('Invalid password and email')
        }
    });
});
router.post('/signUp', (req, res) => {
    console.log(req.body)
    console.log('text')
    bcrypt.hash(req.body.password, saltRound, async (err, hash)=>{
        if(err){
            res.send(err);
        }
        try {
            console.log(hash)
            const newAdmin = new adminModel ({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                phoneNumber: req.body.phoneNumber,
                password: hash
            });
            let result = await newAdmin.save();
            console.log(result);
            const token = jwt.sign({userId: result._id}, 'MY_SECRET_KEY');
            res.send({
                data: result,
                token: token,
                message: 'Created account successfully!'
            });
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    });
});

export default router;