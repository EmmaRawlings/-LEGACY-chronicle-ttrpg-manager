import { hashPassword } from '../../../lib/auth';
import DbService from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return;
  }

  const { email, username, password, passwordConfirm } = req.body;

  if (
    !email ||
    !email.includes('@') ||
    !password ||
    password.trim().length < 8 ||
    !(password === passwordConfirm)
  ) {
    res.status(422).json({
      message:
        'Invalid input - password should also be at least 8 characters long, and should match.',
    });
    return;
  }

  const existingUser = await DbService().User.findOne({ email: email });

  if (existingUser) {
    res.status(422).json({ message: 'User exists already!' });
    return;
  }
  
  const sameNameUser = await DbService().User.findOne({ username: username });

  if (sameNameUser) {
    res.status(422).json({ message: 'Username has been taken!' });
    return;
  }

  const hashedPassword = await hashPassword(password);

  // const result = await DbService().User.insertOne({
  //   email: email,
  //   username: username,
  //   password: hashedPassword
  // });
  const userDoc = new DbService().User({
    email: email,
    username: username,
    password: hashedPassword
  });
  userDoc.save();

  res.status(201).json({ message: 'Created user!' });
}