import express from 'express';
import path from 'path';
import upload from '../mutlter.js';
import User from '../model/user.model.js';
import errorHanlder from '../utils/errorHandler.js';

const router = express.Router();

router.post('/create-user', upload.single('file'), async (req, res) => {
    const {name, email, password} = req.body;
    const userEmail = await User.findOne({email});

    if (userEmail) {
        return next(new errorHanlder('User already exsits', 400));
    }

    const filename = req.file.filename;
    const fileUrl = path.join(filename);

    const user = {
        name: name,
        email: email,
        password: password,
        avatar: fileUrl,
    };

    console.log(user);
});
