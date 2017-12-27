const fs = require('fs')
const readline = require('readline')
const color = require('colors')
const prompt = readline.createInterface(process.stdin, process.stdout)
const log = require('./logger')
const evaluate = require('./evaluate')
const errorList = require('./message.list').error()
const messageList = require('./message.list').message()
const message = require('./message')
const error = message.error()
const success = message.success()

const database = function(){
    
    const promptdb = function (dbname) {
        prompt.question(color.blue('Hambase')+'[' + color.green(dbname).bold + ']'+color.white(' > ').bold, ans => {
            if (ans == 'exit') return prompt.close()
            console.log(ans)
            evaluate(ans)
            promptdb(dbname)
        })
    }

    this.create = function(name) {
        let newname = name+process.hamdb.extension
        if(fs.existsSync(newname)){
            error(errorList.FEXISTS(name)).print()
            log.write(errorList.FEXISTS(name).message)
            return
        }
        success(messageList.DBCREATED(name,newname)).print()
        log.write(messageList.DBCREATED(name, newname).message)
        fs.writeFileSync(newname,`{
    dbname:"${name}",
}
        `)
    }

    this.use = function(name){
        let newname = name + process.hamdb.extension
        if(!fs.existsSync(newname)){
            error(errorList.FNEXISTS(name)).print()
            log.write(errorList.FNEXISTS(name).message)
            return
        }

        log.write('Using database "'+name+'" from "'+newname+'"')
        promptdb(name)
    }

    this.drop = function(dbname){
        let newname = dbname + process.hamdb.extension
        if (!fs.existsSync(newname)) {
            error(errorList.FNEXISTS(dbname)).print()
            log.write(errorList.FNEXISTS(dbname).message)
            return
        }

        fs.unlinkSync(newname,'')
        success(messageList.DBDROP(dbname)).print()
        log.write('Drop database ' + dbname + ' (' + newname + ')')
    }

    return this
}

module.exports = database()