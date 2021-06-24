
const Writable = require('./writable.model');

// === finder queries === 

const writableFindByID = ( writableID ) => {
    return Writable.findByPk( writableID );
}

// === mutable queries ===

const writableCreate = ( Writable_MODEL ) => {
    return Writable.create( Writable_MODEL );
}

const writableUpdate = ( Writable_MODEL , writableID ) => {
    return Writable.update( 
      Writable_MODEL , { where: { id: writableID } , returning: true, plain: true }
    );
}

const writableDelete = ( writableID ) => {
    return Writable.destroy({ where: { 
        id: writableID 
    }})
}

// === authorization queries === //

const writableFindByUserPK = ( userId ) => {
    return Writable.findAll({
        where: {
          userId
        }
    });
}

// === EXPORTS === //

module.exports.finderqueries = {
    writableFindByID
}

module.exports.mutableQueries = {
    writableCreate , writableUpdate , writableDelete
}

module.exports.authorizationQueries = {
    writableFindByUserPK 
}