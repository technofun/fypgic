const express = require('express');
const router = express.Router();
const User = require('../models/Admin');
const bcrypt = require('bcrypt');


// Reagister Admin 
router.post('/registeradmin', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        })
        //Save Admin to database and response
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error)
    }
});

// admin login 
router.post('/login', async (req, res) => {
    try {
        //find user in the database 
        const user = await User.findOne({ email: req.body.email });
        !user && res.status(404).json("user not found")

        // check if the password is wrong 
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        !validPassword && res.status(404).json("wrong Password")

        //send response if user founds
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
})


//update the user
router.put('/:id', async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt)
            } catch (error) {
                return res.status(500).json(error)
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            })
            res.status(200).json("Account has been updated")
        } catch (error) {
            return res.status(500).json(error)
        }
    } else {
        return res.status(404).json("you can update only your account")
    }
});

//delete the user
router.delete('/:id', async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account has been deleted successfully");
        } catch (error) {
            return res.status(500).json(error)
        }
    } else {
        return res.status(403).json("you can delet only your account account")
    }
});

//get user 
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, updatedAt, ...other } = user._doc
        res.status(200).json(other);
    } catch (error) {
        return res.status(500).json(error)
    }
});
module.exports = router;