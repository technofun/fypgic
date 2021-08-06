const express = require('express');
const router = express.Router();
const Student = require('../models/Student')
const bcrypt = require('bcrypt');

router.post('/registerstudent', async (req, res) => {
    try {
        // const salt = bcrypt.genSalt(10);
        // const hashedpassword = bcrypt.hash(req.body.rollnumber,salt);
        const newStudent = await new Student({
            name: req.body.name,
            rollnumber: req.body.rollnumber,
            registrationNumber: req.body.registrationNumber,
            universityRollNumber: req.body.universityRollNumber,
            username: req.body.username,
            email: req.body.email,
            semester:req.body.semester,
            session:req.body.session,
            currentSemester:req.body.currentSemester
        })
        const student = await newStudent.save();
        res.status(200).json(student);
    } catch (err) {
        console.log(err);
    }
});

//get user 
router.get('/:id', async (req, res) => {
    
    try {
        const student = await Student.findById(req.params.id);
        // const { password, updatedAt, ...other } = user._doc
        res.status(200).json(student);
    } catch (error) {
        return res.status(500).json(error)
    }
});
// delete student 
router.delete('/:id', async (req, res) => {
    console.log(req.params.id);
        try {
            await Student.findByIdAndDelete(req.params.id);
            res.status(200).json("Student has been deleted successfully");
        } catch (error) {
            return res.status(500).json(error)
        }
    
});
module.exports = router;