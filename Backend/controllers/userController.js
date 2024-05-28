const bcrypt = require('bcrypt');
const crypto = require('crypto');

const User = require('../models/user');
const Cliente = require('../models/cliente');

exports.signup = async (req, res) => {
    try {
        const { username, password, nome, email, dataNascimento, telemovel, nif } = req.body;

        // Verifique se o usuário já existe
        const existingUser = await User.findOne({ name: username });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists. Please choose a different username.' });
        }

        // Crie o cliente associado ao usuário
        const cliente = new Cliente({
            nome,
            email,
            dataNascimento,
            telemovel,
            nif
        });
        await cliente.save();

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Crie o novo usuário associado ao cliente
        const newUser = new User({
            name: username,
            password: hashedPassword,
            clientId: cliente._id 
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        console.error('Error in signup:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};


exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ name: username });

        if (!user) {
            return res.status(400).json({ message: "User name not found" });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Wrong password" });
        }

        res.status(200).json({ message: "Login successful" });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};