var cloudinary = require('cloudinary') , 
         axios = require('axios');

const config   = require('../config/services.js') ,
     cloudKeys = config.cloudinaryConfig();
    cloudinary.config( cloudKeys );

const { asyncSupport } = require('@codedevbrad/serverutils');
const modelQueries = require('./writable.controller.db');

const { writableFindByID } = modelQueries.finderqueries;
const { writableCreate , writableUpdate , writableDelete } = modelQueries.mutableQueries;
const { writableFindByUserPK } = modelQueries.authorizationQueries;

// expect request to be user and user PK IS same as workspace FK..

// ==== WRITABLES ==== // 

module.exports.getWritables = asyncSupport( async( req , res , next ) => {
    let { id } = res.locals.user;
    let writables = await writableFindByUserPk( id );
    res.status( 200 ).send( writables );
});

module.exports.createWritable = asyncSupport( async( req , res , next ) => {
    let { id } = res.locals.user;
    let { data , writablename } = req.body;
    const Writable_MODEL = {
        data , writablename , userId: id
    }

    let newWritable = await writableCreate( Writable_MODEL );
    res.status(201).send( newWritable );
});

module.exports.updateWritable = asyncSupport( async ( req , res , next ) => {
    let { id } = res.locals.user;
    let { writableID , model } = res.data;

    let updatedWritable = await writableUpdate(
        model , 
        id , 
        writableID 
    );
    res.status(201).send( updatedWritable );
});

module.exports.deleteWritable = asyncSupport( async ( req , res , next ) => {
    let { id } = res.locals.user;
    let { writableID } = res.data;

    let deletedWritable = await writableDelete(
        id , 
        writableID 
    );
    res.status(201).send( deleteddWritable );
});

module.exports.Writable__imageUPLOAD = asyncSupport( async( req , res , next ) => {
    // Get image from request...
    let [ file , ...files ] = Object.values( req.files );
    // Upload
    let upload = await cloudinary.v2.uploader.upload( 
        file.path , { folder: "notion_clone/image_blocks" , use_filename: true }
    );
    res.status( 200 ).send( 'test' );
});

module.exports.Writable__imageDELETE = asyncSupport( async( req , res , next ) => {
    // get image ID...
    let { url } = req.query;
    let deleted = await cloudinary.uploader.destroy(`notion_clone/image_blocks/${ url }`);
    let statusOk = deleted.result != 'not found';
    res.status( 202 ).send({ deleted: statusOk });
});

module.exports.Writable__bookmark = asyncSupport( async( req , res , next ) => {
    let { scrapeURL } = req.query;
    // SEND REQUEST TO FLASK SERVICE TO SCRAPE CONTENT.
    if ( !scrapeURL ) return res.status( 504 ).send('url was not provided');
    await axios.get(`${process.env.scrape_service }/api/v0/bookmark?url=${ scrapeURL }`)
               .then(data => res.status(200).json(data.data))
               .catch( next );
});