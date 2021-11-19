import { getSession } from 'next-auth/client';
import DbService from '../../lib/db'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return;
  }

  const reqSystemData = req.body.systemData;
  const session = await getSession({ req: req });

  if (session.user._id != reqSystemData.ownerId) {
    res.status(401).json({ message: 'You are not the owner!' });
    return;
  }

  const existingSystem = await DbService().System.findOne({ name: reqSystemData.name });

  if (existingSystem) {
    res.status(422).json({ message: 'That name is taken!' });
    return;
  }

  const systemDoc = new DbService().System(
    { 
      name: reqSystemData.name, 
      owner: reqSystemData.ownerId, 
      author: session.user.name,
      privacy: 'private',
      version: "0.0"
    });
  systemDoc.save();
  res.status(201).json({ message: 'New system saved!' });
}