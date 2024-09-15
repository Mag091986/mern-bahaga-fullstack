import bcryptjs from 'bcryptjs';
import User from "../models/user.model.js";

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
