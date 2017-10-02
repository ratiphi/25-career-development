//Pseudocode:
//1. Read the doc into a buffer//
//2. Parse the buffer into a string//
//3. Somehow pick out the "root element", which is the <html> tag, which we will assign to be the first Tree Node - we have to convert it into a node too?//
//4. Make it then build the tree//

//BIG O NOTATION OF THIS SOLUTION IS...?//

//We need the file system//
const fs = require('fs');
//we need the html file//
const tree = require('./lib/tree.js');

fs.readFile('./assets/minimal.html', (err, data) => {
  if(err) console.error(err);
  console.log(data);
  let stringBuffer = Buffer.from(data);
  console.log(stringBuffer);
  let htmlWords = stringBuffer.toString();
  //do we have to split everything up so that the children live in the right spot? Hrmmmm...//

  //Things I've tried so far
  // let inner = htmlWords.innerHTML;
  // console.log(htmlWords);
  // htmlWords.trim();
  // console.log(htmlWords.trim());
  // console.log(htmlWords.innerHTML);
});

//Ok maybe we put all <> things in an arr? A thought

//From the instructions: parse the buffer and use the root <html> element, subsequent HTML tags, and their text content to build a tree data structure
//hint: you will need to refactor your node to allow a different type of data to be stored in the .value property. The remainder of the node should not change//
var TreeNode = module.exports = class {
  constructor(data) {
    this.val = data;
    this.children = [];
  }

  breadthFirstTraverse(cb) {
    let q = [this];
    let current;

    while(q.length) {
      current = q.shift();
      if(cb) cb(current);
      if(current.children.length) q = [...q, ...current.children];
    }
  }

  preOrderTraverse(cb) {
    _walk(this);

    function _walk(node) {
      cb(node);
      node.children.forEach(_walk);
    }
  }

  postOrderTraverse(cb) {
    _walk(this);

    function _walk(node) {
      node.children.forEach(_walk);
      cb(node);
    }
  }

  insert(newNode, parentVal) {
    if (!newNode instanceof TreeNode) {
      throw new Error('must be a valid Tree Node');
    }

    this.preOrderTraverse(node => {
      if(!node) return;
      if(node.val === parentVal) node.children.push(newNode);
      return this;
    });
  }

  prune(val) {
    this.breadthFirstTraverse(node => {
      if(!node) return;
      node.children = node.children.filter(child => child.val !== val);
    });
  }

  remove(val) {
    this.breadthFirstTraverse(node => {
      if(!node) return;

      //Fill in//
    });
  }
};
