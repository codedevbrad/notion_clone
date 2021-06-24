var cloudinary = require('cloudinary') , 
         axios = require('axios');

const config   = require('../config/services.js') ,
     cloudKeys = config.cloudinaryConfig();
    cloudinary.config( cloudKeys );

const { asyncSupport } = require('@codedevbrad/serverutils');
const modelQueries = require('./writable.controller.db');

const { writableCreate , writableUpdate , writableDelete } = modelQueries.mutableQueries;
const { writableFindByUserPK } = modelQueries.authorizationQueries;

// expect request to be user and user PK IS same as workspace FK..


// ==== WRITABLES fetch / create / update / delete ==== // 

module.exports.getWritables = asyncSupport( async( req , res , next ) => {
    let { id } = res.locals.user;
    let writables = await writableFindByUserPK( id );
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
    let { writableID , model } = req.body;

    let updatedWritable = await writableUpdate(
        model , 
        writableID
    );
    res.status(201).send( updatedWritable[1] );
});

module.exports.deleteWritable = asyncSupport( async ( req , res , next ) => {
    let { id } = res.locals.user;
    let { writableID } = req.body;

    let deletedWritable = await writableDelete(
        writableID 
    );

    let wasDeleted = deletedWritable == 1;

    res.status(201).json({ 
        deleted: wasDeleted , msg: wasDeleted ? `deleted id ${ writableID }` : `could not delete id ${ writableID }`
    });
});

// ==== IMAGE CREATE / DELETE ==== //

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


// ==== WRITABLE BOOKMARK ==== //

module.exports.Writable__bookmark = asyncSupport( async( req , res , next ) => {
    let { scrapeURL } = req.query;
    // SEND REQUEST TO FLASK SERVICE TO SCRAPE CONTENT.
    if ( !scrapeURL ) return res.status( 504 ).send('url was not provided');
    await axios.get(`${process.env.scrape_service }/api/v0/bookmark?url=${ scrapeURL }`)
               .then(data => res.status(200).json(data.data))
               .catch( next );
});