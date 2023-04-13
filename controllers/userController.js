import User from '../models/userModel.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
    //get all data
    const { userType, email, password, confirmPassword, firstName, lastName, phoneNumber, location, securityQuestion, securityAnswer} = req.body;
        //console.log('body',req.body);

    try {
        //check if user exists
        const userExists = await User.findOne({ email });

        if(userExists) return res.status(400).json({ message: 'User already exist'});

        //check if inputs are valid
        if(password !== confirmPassword) return res.status(400).json({ message: 'Passwords do not match' });

        //hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create( { 
            userType,
            email,
            password: hashedPassword,
            firstName,
            lastName,
            phoneNumber,
            location,
            securityQuestion,
            securityAnswer
        });
        const token = jwt.sign({ email: result.email, id: result._id }, 'testSecret', { expiresIn: '1h'})

        res.status(200).json({ result, token })


    } catch (error) {
        res.status(500).json({ message: 'Something went wrong in Sign up'})
    }
}