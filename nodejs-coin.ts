//import secure hash algorithm from the crypto-js package

import {SHA256} from 'crypto-js';

// Create a Javascript class to represent a block
class Block {

    index: number;
    timestamp: string;
    data: any;
    previousHash?: string;
    hash: string;

    constructor(index : number, timestamp : string, data : any, previousHash?: string) {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.generateHash();
    }

    generateHash():string {
        return SHA256(this.index + this.timestamp + this.previousHash + JSON.stringify(this.data)).toString();
    }
}

class BlockChain {

    blockChain: Block[];

    constructor() {
        this.blockChain = [this.createGenesisBlock()];
    }

    createGenesisBlock() : Block {
        return new Block(0, "11/04/2022", "first block on the chain", "0");
    }

    getTheLatestBlock():Block {
        return this.blockChain[this.blockChain.length -1];
    }

    addNewBlock(newBlock : Block): void {
        newBlock.previousHash = this.getTheLatestBlock().hash;
        newBlock.hash = newBlock.generateHash();
        this.blockChain.push(newBlock);
    }

    // testing the integrity of the chain
    validateChainIntegrity() : boolean {
        for (let i=1; i<this.blockChain.length; i++) {
            const currentBlock = this.blockChain[i];
            const previousBlock = this.blockChain[i-1];
            if (currentBlock.hash !== currentBlock.generateHash()) {
                return false;
            }
            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

let logCoin = new BlockChain();
console.log("mining logcoin in progress...");
logCoin.addNewBlock(
    new Block(1, "06/04/2022", {
        sender: "Frank Joseph",
        recipent: "LogRocket",
        quantity: 25
    })
);

logCoin.addNewBlock(
    new Block(2, "08/08/2022", {
        sender: "Paul val",
        recipent: "Lone Wolf",
        quantity: 34
    })
);

logCoin.addNewBlock(
    new Block(3, "13/08/2022", {
        sender: "Elena",
        recipent: "Mary",
        quantity: 34
    })
);

console.log(JSON.stringify(logCoin, null, 5));