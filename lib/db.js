import mongoose from 'mongoose';
const upsertMany = require('@meanie/mongoose-upsert-many');

//Global plugin
mongoose.plugin(upsertMany);

export default function getDbService() {
	if (mongoose.connection.db == undefined) {
		const url = process.env.MONGODB_URI + '/' + process.env.MONGODB_DB;
		console.log(`[db.js] Establishing connection to MongoDB: ${url}`);

		mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true  });

		// db = mongoose.connection;
		mongoose.connection.once('open', _ => {
		  console.log('[db.js] Database connected:', url);
		});

		mongoose.connection.on('error', err => {
		  console.error('[db.js] connection error:', err);
		});

		mongoose.model('User', new mongoose.Schema({
			email: String,
			username: String,
			password: String
		}));

		mongoose.model('CustomDataModel', new mongoose.Schema({
			name: String
		}));

		mongoose.model('System', new mongoose.Schema({
			name: String,
			author: String,
			version: String,
			privacy: String,
			description: String,
			rules: String,
			owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
			dataModels: [/*{dataModel: */{type: mongoose.Schema.Types.ObjectId, ref: 'CustomDataModel'}/*}*/]
		}));
	}
	return DbService;
}

class DbService {
	static get User() {
		// retrieve existing model, otherwise create and enter new model
		return mongoose.models['User'];
	}

	static get System() {
		// retrieve existing model, otherwise create and enter new model
		return mongoose.models['System'];
	}

	static get CustomDataModel() {
		// retrieve existing model, otherwise create and enter new model
		return mongoose.models['CustomDataModel'];
	}

	static docObjectToSerializable(docObject) {
	  if (typeof docObject == 'object' && docObject._id != undefined) {
	    docObject._id = docObject._id.toString();
	    for (var property in docObject) {
	      docObject[property] = DbService.docObjectToSerializable(docObject[property]);
	    }
	  } else if (Array.isArray(docObject)) {
	  	for (var i = 0; i < docObject.length; i++) {
	  		docObject[i] = DbService.docObjectToSerializable(docObject[i]);
	  	}
	  }
	  return docObject;
	}

	// static async saveCollection(model, collection) {
	// 	const updateCollection = collection.filter((_) => _._id != undefined);
	// 	const insertCollection = collection.filter((_) => _._id == undefined);

	// 	const asyncInsertMany = util.promisify(model.insertMany);
	// 	var insertData;
	// 	await asyncInsertMany([insertCollection], function(err, data) {
	// 		insertData = data;
	// 	});

	// 	const asyncUpdateMany = util.promisify(model.updateMany);
	// 	var updateData;
	// 	await asyncInsertMany([updateCollection], function(err, data) {
	// 		updateData = data;
	// 	});

	// 	return insertData.concat(updateData);
	// }
}