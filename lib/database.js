const fs = require('fs')
const error = require('./error')

const database = function(){
    
    this.create = function(name) {
        let newname = name+'.hb'
        if(fs.existsSync(newname)){
            error({
                name:'FEXISTS',
                message:'Database '+newname+' is exists',
                resolve:'Create new database with another name'
            }).print()
            return
        }
        fs.writeFileSync(newname,'{}')
    }

    return this
}

module.exports = database()