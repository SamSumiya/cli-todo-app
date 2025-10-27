import readline from 'node:readline'; 

import { cliCommands } from './cli.js';
import { initiateFile } from './crud.js';

const rl = readline.createInterface({
    input: process.stdin, 
    output: process.stdout
})


// Starting the program
await initiateFile()

rl.setPrompt('todo-> ')
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
        return 
    }
    
    const userInput = args.join(' ')
    rl.setPrompt('>> ')
    rl.prompt()
    console.log(userInput, 'userInput')
    action.handler(userInput)
})