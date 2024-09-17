import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = bcryptjs.hashSync(password, 10);

    // Check if user already exists (optional but recommended)
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: '¡El correo ya está registrado!' });
    }
    const existingEmail = await User.findOne({ username });
    if (existingEmail) {
      return res.status(400).json({ message: '¡El usuario ya existe!' });
    }

    const newUser = new User({ username, email, password: hashedPassword });

    await newUser.save();
    res.status(201).json("¡El usuario fue creado satisfactoriamente!");
  } catch (error) {
    console.error('Error during user signup:', error);  // Log error to console
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, '¡El usuario no existe!'));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, '¡Contraseña incorrecta!'))
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest} = validUser._doc;
    res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);
  } catch (error) {
    next(error);
  }
}
