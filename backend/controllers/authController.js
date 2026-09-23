import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { generateTokenAndSetCookie } from '../utils/generateToken.js';

export const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const userExists = await User.findOne({ $or: [{ username }, { email }] });

        if (userExists) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        if (newUser) {
            // Generate JWT token
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                name: newUser.name,
                profilePic: newUser.profilePic,
            });
        } else {
            res.status(400).json({ error: 'Invalid user data' });
        }
    } catch (error) {
        console.log('Error in signup controller', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || '');

        if (!user || !isPasswordCorrect) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            name: user.name,
            profilePic: user.profilePic,
        });
    } catch (error) {
        console.log('Error in login controller', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const logout = (req, res) => {
    try {
        res.cookie('jwt', '', { maxAge: 0 });
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.log('Error in logout controller', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { name, profilePic } = req.body;
        const userId = req.user._id;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { name, profilePic },
            { new: true }
        ).select('-password');

        res.status(200).json(updatedUser);
    } catch (error) {
        console.log('Error in updateProfile controller: ', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};
