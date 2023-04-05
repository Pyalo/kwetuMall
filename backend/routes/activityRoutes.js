import  express  from "express";

const router =express.Router();

router.post('/post/students', (req, res)=>{
    let avrgPercentage = (req.body.math + req.body.eng + req.body.swa + req.body.phy + req.body.geo)/5;
    res.send(avrgPercentage + '%');
});

export default router;