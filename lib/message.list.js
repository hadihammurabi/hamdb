const message = function () {
    this.DBCREATED = function (name, newname) {
        return {
            name: 'DBCREATED',
            message: 'Database "' + name + '" has been created as "' + newname + '"\n'
        }
    }
    this.DBDROP = function(name){
        return {
            name: 'DBDROP',
            message: 'Database "' + name + '" has been droped'
        }
    }
    
    return this
}

const error = function(){
    this.UNKNOWNPARAMS = function(param){
        return {
            name: 'UNKNOWNPARAMS',
            message: 'Unknown param "' + param + '" to cleaning',
            resolve: 'Use param that knowing by Hamdb'
        }
    }
    this.FEXISTS = function(name){
        return {
            name: 'FEXISTS',
            message: 'Failed to create database, "' + name + '" does exists',
            resolve: 'Create new with another name'
        }
    }
    this.FNEXISTS = function(name){
        return {
            name: 'FNEXISTS',
            message: 'Database "' + name + '" doesn\'t exists',
            resolve: 'Create new database'
        }
    }
    return this
}

module.exports = {
    error:error,
    message:message
}