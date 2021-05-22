const { asyncSupport } = require('@codedevbrad/serverutils');

const modelQueries = require('./writable.controller.db');

const { writableFindByID } = modelQueries.finderqueries;
const { writableCreate , writableUpdate , writableDelete } = modelQueries.mutableQueries;
const { writableFindByUserPK } = modelQueries.authorizationQueries;

// expect request to be user and user PK IS same as workspace FK

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

