const WritableQueries = require("../writable.controller.db");





















// //CREATE-ONE
// exports.createOne = async (req, res, next) => {
// 	try {
// 		const Writable_MODEL = {
// 			data: req.body.data,
// 			workspace: req.body.workspace,
// 			userId: req.body.userId
// 		}
// 		try {
// 			const writable = await Writable.create( Writable_MODEL );
// 			return res.status(201).json( writable );

// 		} catch (error) {
// 			console.log('ERROR in createOne ' + "Writable:" , error );
// 			return res.status(500).json(error);
// 		}

// 	} catch (error) {
// 		return res.status(400).json("Bad Request");
// 	}
// };

// // GET-BY-USER
// exports.getByUser = async (req, res, next) => {
// 	let { id } = req.query;
// 	let userId = parseInt( id );
// 	try {
// 		const ALL = await Writable.findAll({
// 			where: {
// 			  userId
// 			}
// 		 });
// 		console.log("OK getBYUSER Writable: ", ALL.map(el => el.dataValues));
// 		res.status(200).json(ALL);
// 	} catch (error) {
// 		console.log('ERROR in getAllgetBYUSER ' + "Writable:", error);
// 		return res.status(500).json(error);
// 	}
// }

// //GET-ALL
// exports.getAll = async (req, res, next) => {
// 	try {
// 		const ALL = await Writable.findAll();
// 		console.log("OK getAll Writable: ", ALL.map(el => el.dataValues));
// 		res.status(200).json(ALL);
// 	} catch (error) {
// 		console.log('ERROR in getAll ' + "Writable:", error);
// 		return res.status(500).json(error);
// 	}
// };

// //GET-ONE
// exports.getOne = async (req, res, next) => {
// 	try {
// 		const u = await Writable.findByPk(req.params.id);
// 		console.log("OK getOne Writable: ", u.dataValues);
// 		return res.status(200).json(u);
// 	} catch (error) {
// 		console.log('ERROR in getOne ' + "Writable:", error);
// 		return res.status(500).json(error);
// 	}
// };

// //UPDATE-ONE.
// exports.updateOne = async (req, res, next) => {
// 	try {
// 		const Writable_MODEL = {
// 			data: req.body.data
// 		}
// 		try {
// 			const u = await Writable.update( 
// 				 Writable_MODEL , { where: { id: req.params.id } , returning: true, plain: true }
// 			);
// 			const updatedObj = u[1];

// 			return res.status(200).send( updatedObj );
// 		} catch (error) {
// 			console.log('ERROR in updateOne ' + "Writable:", error);
// 			return res.status(500).json(error);
// 		}
// 	} catch (error) {
// 		return res.status(400).json("Bad Request");
// 	}
// };

// //DELETE-ONE
// exports.deleteOne = async (req, res, next) => {
// 	try {
// 		const u = await Writable.destroy({ where: { id: req.params.id } });
// 		console.log("OK deleteOne Writable: ", );
// 		return res.status(200).json(u);
// 	} catch (error) {
// 		console.log('ERROR in deleteOne ' + "Writable:", error);
// 		return res.status(500).json(error);
// 	}
// }