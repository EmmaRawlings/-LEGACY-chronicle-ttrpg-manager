import { getSession } from 'next-auth/client';

import { hashPassword, verifyPassword } from '../../../lib/auth';
import DbService from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'PATCH') {
    return;
  }

  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: 'Not authenticated!' });
    return;
  }

  const userId = session.user._id;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  const user = await DbService().User.findOne({ _id: userId });

  if (!user) {
    res.status(404).json({ message: 'User not found.' });
    return;
  }

  const currentPassword = user.password;

  const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword);

  if (!passwordsAreEqual) {
    res.status(403).json({ message: 'Invalid password.' });
    return;
  }

  const hashedPassword = await hashPassword(newPassword);

  const result = await DbService().User.updateOne(
    { _id: userId },
    { $set: { password: hashedPassword } }
  );

  res.status(200).json({ message: 'Password updated!' });
}