import readline from 'node:readline'; 

import { cliCommands } from './cli.js';
import { initiateFile } from './crud.js';

const rl = readline.createInterface({
    input: process.stdin, 
    output: process.stdout
})

// Starting the program
await initiateFile()

function showPrompt(label = 'todo:> ') {
    rl.setPrompt(label)
    rl.prompt()
}

showPrompt()

rl.on('line', async (input) => {
    const [command, ...args] = input.trim().split(/\s+/)

    const action = cliCommands.find( c => c.name === command)

    if (!action) {
        console.log(`Cannot find command: ${command}, try again please.`)
        showPrompt()
        return 
    }

    if (action.name === 'exit') {
        rl.close()
        return 
    }
    
    const userInput = args.join(' ')
    try {
        rl.pause()

        await action.handler(userInput)
    } catch(err) {
        console.log('Error:', err?.message || err);
    } finally {
       rl.resume()
       showPrompt();
    }
})