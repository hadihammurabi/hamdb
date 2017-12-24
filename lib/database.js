const fs = require('fs')
const readline = require('readline')
const color = require('colors')
const prompt = readline.createInterface(process.stdin, process.stdout)
const log = require('./logger')
const env = require('../environment')
const message = require('./message')
const error = message.error()
const success = message.success()

const database = function(){
    
    const promptdb = function (dbname) {
        prompt.question(color.blue('Hambase')+'[' + color.green(dbname).bold + ']'+color.white(' > ').bold, ans => {
            if (ans == 'exit') return prompt.close()
            console.log(ans)
            promptdb(dbname)
        })
    }

    this.create = function(name) {
        let newname = name+env.extension
        if(fs.existsSync(newname)){
            let errmsg = {
                name:'FEXISTS',
                message:'Failed to create database, "'+name+'" does exists',
                resolve:'Create new database with another name'
            }
            error(errmsg).print()
            log.write(errmsg.message)
            return
        }
        success({
            name: 'DBCREATED',
            message: 'Database "'+name+'" has been created as "'+newname+'"'
        }).print()
        fs.writeFileSync(newname,'{}')
    }

    this.use = function(name){
        let newname = name + env.extension
        if(!fs.existsSync(newname)){
            let errmsg = {
                name: 'FNEXISTS',
                message: 'Database "' + name + '" doesn\'t exists',
                resolve: 'Create new database'
            }
            error(errmsg).print()
            log.write(errmsg.message)
        }

        log.write('Using database "'+name+'" from "'+newname+'"')
        promptdb(name)
    }

    return this
}

module.exports = database()