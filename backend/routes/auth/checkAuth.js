import jwt from 'jsonwebtoken';
import userModel from '../../models/userModel.js';


const checkAuth = (req, res, next)=>{
    const { authorization } = req.headers;
    if(!authorization){
        res.send('You must be loggged in')
    }

    const token = authorization.replace('Bearer ', '');
    jwt.verify(token, 'MY_SECRET_KEY', (err, data)=>{
        console.log(data);
    });
}

export default checkAuth;

