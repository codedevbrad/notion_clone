
const Writable = require('./writable.model');

// === finder queries === 

const writableFindByID = ( workspaceID ) => {
    return Writable.findByPk( workspaceID );
}

// === mutable queries ===

const writableCreate = ( Writable_MODEL ) => {
    return Writable.create( Writable_MODEL );
}

const writableUpdate = ( Writable_MODEL , spaceID ) => {
    return Writable.update( 
      Writable_MODEL , { where: { id: spaceID } , returning: true, plain: true }
    );
}

const writableDelete = ( spaceID ) => {
    return Writable.destroy({ where: { id: spaceID } })
}

// === authorization queries ===

const writableFindByUserPK = ( userID ) => {
    return Writable.findAll({
        where: {
          userID
        }
    });
}

module.exports.finderqueries = {
    writableFindByID
}

module.exports.mutableQueries = {
    writableCreate , writableUpdate , writableDelete
}

module.exports.authorizationQueries = {
    writableFindByUserPK 
}