#!/usr/bin/env node

const cli = require('commander')
const env = require('./environment')()
const db  = require('./lib/database')
const log = require('./lib/logger')
const errorList = require('./lib/message.list').error()
const message = require('./lib/message')
const error = message.error()

cli
    .version(process.hamdb.name+'@' + process.hamdb.version)
    .description('NoSQL Lite Database')

cli
    .command('new <dbname>')
    .description('Create new database file')
    .action((database)=>{
        db.create(database)
        process.exit(0)
    })

cli
    .command('use <dbname>')
    .description('Use a database')
    .action((database) => {
        db.use(database)
        process.exit(0)
    })

cli
    .command('clean <clean>')
    .description('Clean any useless ones')
    .action((clean) => {
        if(clean == 'log') log.clean()
        else{
            error(errorList.UNKNOWNPARAMS(clean)).print()
            log.write(errorList.UNKNOWNPARAMS(clean).message)
        }

        process.exit(0)
    })

cli
    .command('drop <dbname>')
    .description('Drop an useless database')
    .action((dbname) => {
        db.drop(dbname)

        process.exit(0)
    })

cli.parse(process.argv)