import { getSession } from 'next-auth/client';
import DbService from '../../lib/db'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return;
  }

  const reqSystem = req.body.system;
  const session = await getSession({ req: req });

  if (session.user._id != reqSystem.owner._id) {
    res.status(401).json({ message: 'You are not the owner!' });
    return;
  }

  const existingSystem = await DbService().System.findOne({ name: reqSystem.name });

  if (existingSystem && existingSystem._id != reqSystem._id) {
    res.status(422).json({ message: 'That name is taken!' });
    return;
  }

  const dataModelsSaveResult = await DbService().CustomDataModel.upsertMany(reqSystem.dataModels, { ensureModel: true });
  dataModelsSaveResult.result.upserted.forEach((_) => {
    reqSystem.dataModels[_.index]._id = _._id;
  });

  const systemDoc = new DbService().System(reqSystem);
  systemDoc.isNew = false;
  systemDoc.save();
  res.status(201).json({ message: 'System saved!' });
}

function handleError(err, res) {
  res.status(422).json({ message: 'Unknown error: ' + err });
  return;
}