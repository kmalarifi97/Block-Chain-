/**
 this project for learning purpose 

 explanation: 
 the class block is to construct the blocks while  
 class Blockchain is to construct the chain that links blocks 
 which contain array attribute chain to hold the blocks 
 and difficulty attribute to determine block difficulty 
 in order to implement proof of work 

 next phase : 
 use level DB to store block.
 bulid routes to enable users to post blocks

  
 */
let SHA256 = require("crypto-js/sha256");

const Block = require('./Block')


class Blockchain {
    constructor() {
        this.chain = [];
        //line11:to determine block difficulty while implement proof of work 
        //difficulty[0] to be used with substring 
        //difficulty[1] to be compared with result of substring
        this.difficulty=[3,"000"];  
    }

    addBlock(newBlock) {
        // if condition to keep previousblockhash null for the first block 
        if (this.chain.length > 0) {
            //link new block with previous block
            newBlock.previousblockhash = this.chain[this.chain.length - 1].hash
            newBlock.height = this.chain[this.chain.length - 1].height + 1
            newBlock.time = new Date().getTime();
            newBlock.hash = SHA256(newBlock.height + newBlock.previousblockhash + newBlock.time + this.nonce).toString();

            // mine block to fit difficulty
            while (newBlock.hash.substring(0, this.difficulty[0]) !== this.difficulty[1]) {
                newBlock.nonce++;
                newBlock.hash = SHA256(newBlock.height +newBlock.previousblockhash+ newBlock.time + JSON.stringify(newBlock.data) +newBlock.nonce).toString();
            }


        }
        else {
            newBlock.height = 0
            newBlock.time = new Date().getTime();
            newBlock.hash = SHA256(newBlock.height  + newBlock.time + JSON.stringify(newBlock.data) + newBlock.nonce).toString();

            // mine block to fit difficulty
            while (newBlock.hash.substring(0, this.difficulty[0]) !== this.difficulty[1]) {
               
                newBlock.nonce++;

                newBlock.hash = SHA256(newBlock.height + newBlock.time + JSON.stringify(newBlock.data) +newBlock.nonce).toString();
            }


        }
    
        this.chain.push(newBlock);
    }



}
 let blockchain=new Blockchain()

 function generateChain(){
    blockchain.addBlock(new Block("first block "))
    blockchain.addBlock(new Block("second block "))
    blockchain.addBlock(new Block("third block "))
    console.log(blockchain.chain)


 }

 generateChain()













