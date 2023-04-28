import express from 'express';
import pickupPointModel from '../models/pickupPointModel.js';


const router = express.Router();

// add getting one picku point
// updating a pickup point
// deleting a pick up point

router.get('/', async (req, res) =>{
    try {
        const pickupPoints = await pickupPointModel.find();
        res.send({
            message: 'Pick points fetched successfully!!',
            data: pickupPoints
        });
    } catch (error) {
        console.log(error)
        res.send({
            message: error.message,
        });
    }
})

router.post('/create', async (req, res) => {
    try {
        const newPickupPoint = new pickupPointModel({
            location: req.body.location,
            name: req.body.name,
            lat: req.body.lat, 
            long: req.body.long
        });
        const data = await newPickupPoint.save();
        res.send({
            message: 'Pick point added sucessfully',
            data: data
        });
    } catch (error) {
        console.log(error) 
        res.send({
            message: error.message
        });
    }
});

// router.post('/create/add', async (req, res) => {
//     try {
//         const addPickupPoint = new pickupPointModel({
//             location: req.body.location,
//             name: req.body.name,
//             lat: req.body.lat, 
//             long: req.body.long
//         });
//         const data = await addPickupPoint.save();
//         res.send({
//             message: 'Pick point added sucessfully',
//             data: data
//         });
//     } catch (error) {
//         console.log(error)
//         res.send({
//             message: error.message
//         });
//     }
// });


export default router; 