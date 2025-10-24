import readline from 'node:readline'; 

import { cliCommands } from './cli.js';
import { initiateFile } from './crud.js';

const rl = readline.createInterface({
    input: process.stdin, 
    output: process.stdout
})


// Starting the program
const msg = await initiateFile()
console.log(msg)
rl.setPrompt('>> ')
rl.prompt()

rl.on('line', async (input) => {
    const [command, ...args] = input.trim().split(/\s+/)

    const action = cliCommands.find( c => c.name === command)

    if (!action) {
        console.log(`Cannot find command: ${command}`)
        return 
    }

    if (action.name === 'exit') {
        rl.close()
    }
    
    const userInput = args.join(' ')
    console.log('DEBUG typeof handler:', typeof action.handler)
    console.log('DEBUG handler value:', action.handler)
    action.handler(userInput)
})