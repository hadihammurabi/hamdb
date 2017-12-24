#!/usr/bin/env node

const cli = require('commander')
const env = require('./environment')
const db  = require('./lib/database')
const log = require('./lib/logger')

cli
    .version('Hambase@'+env.version)
    .description('Realtime NoSQL Database')

cli
    .command('new <database>')
    .description('Create new database file')
    .action((database)=>{
        db.create(database)
        process.exit(0)
    })

cli
    .command('use <database>')
    .description('Use a database')
    .action((database) => {
        db.use(database)
    })

cli
    .command('clear <clear>')
    .description('Clear any useless ones')
    .action((clear) => {
        if(clear == 'log')
            log.clear()

        process.exit(0)
    })

cli.parse(process.argv)