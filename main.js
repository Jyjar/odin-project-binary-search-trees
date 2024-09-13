import { Tree } from "./tree.js";

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) return;

    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }

    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);

    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

function hundredRandomArray() {
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
    
    let arr = [];
    for(let i = 0; i < 101; i++) {
        arr.push(getRandomInt(100));
    }

    return arr;
}

// Test

const tree = new Tree(hundredRandomArray());

prettyPrint(tree.root);

console.log(tree.isBalanced());

console.log("Level Order:");
tree.levelOrder((node) => console.log(node.data));

console.log("Preorder:");
tree.preOrder((node) => console.log(node.data));

console.log("Inorder:");
tree.inOrder((node) => console.log(node.data));

console.log("Postorder:");
tree.postOrder((node) => console.log(node.data));

tree.insert(110);
tree.insert(120);
tree.insert(130);

console.log(tree.isBalanced());

tree.rebalance();

console.log(tree.isBalanced());

console.log("Level Order:");
tree.levelOrder((node) => console.log(node.data));

console.log("Preorder:");
tree.preOrder((node) => console.log(node.data));

console.log("Inorder:");
tree.inOrder((node) => console.log(node.data));

console.log("Postorder:");
tree.postOrder((node) => console.log(node.data));
