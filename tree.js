class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(array) {
        this.array = array;
        this.root = this.buildTree(array);
    }

    buildTree(arr) {
        let array = [...new Set(arr)];
        array.sort((a, b) => a - b);

        if (array.length === 0) {
            return null;
        }

        let midpoint = parseInt(array.length / 2);
        let newNode = new Node(array[midpoint]);
        let leftHalf = array.slice(0, midpoint);
        let rightHalf = array.slice(midpoint + 1);

        newNode.left = this.buildTree(leftHalf);
        newNode.right = this.buildTree(rightHalf);

        return newNode;
    }

    insert(value, root = this.root) {
        if (root === null) return new Node(value);

        if (value === root.data) return root;

        if (value < root.data) {
            root.left = this.insert(value, root.left);
        } else {
            root.right = this.insert(value, root.right);
        }

        return root;
    }

    deleteItem(value, root = this.root) {
        function getSuccessor(curr) {
            curr = curr.right;
            while (curr !== null && curr.left !== null) {
                curr = curr.left;
            }
            return curr;
        }

        if (root === null) {
            return root;
        }

        if (value < root.data) {
            root.left = this.deleteItem(value, root.left);
        } else if (value > root.data) {
            root.right = this.deleteItem(value, root.right);
        } else {
            if (root.left === null) return root.right;
            if (root.right === null) return root.left;

            let succ = getSuccessor(root);
            root.data = succ.data;
            root.right = this.deleteItem(succ.data, root.right);
        }

        return root;
    }

    find(value, root = this.root) {
        if (root === null) {
            return root;
        }

        if (value === root.data) {
            return root;
        }

        if (value < root.data) {
            return this.find(value, root.left);
        } else {
            return this.find(value, root.right);
        }
    }

    levelOrder(callback) {
        if (typeof callback !== 'function') {
            throw new Error('A callback function is required');
        }
    
        const queue = [];
        if (this.root !== null) {
            queue.push(this.root);
        }
    
        while (queue.length > 0) {
            let currentNode = queue.shift();
            callback(currentNode);
    
            if (currentNode.left !== null) {
                queue.push(currentNode.left);
            }
            if (currentNode.right !== null) {
                queue.push(currentNode.right);
            }
        }
    }

    inOrder(callback, root = this.root) {
        if (typeof callback !== 'function') {
            throw new Error('A callback function is required');
        }
    
        function traverse(node) {
            if (node !== null) {
                traverse(node.left);
                callback(node);
                traverse(node.right);
            }
        }
    
        traverse(root);
    }

    preOrder(callback, root = this.root) {
        if (typeof callback !== 'function') {
            throw new Error('A callback function is required');
        }
    
        function traverse(node) {
            if (node !== null) {
                callback(node);
                traverse(node.left);
                traverse(node.right);
            }
        }
    
        traverse(root);
    }

    postOrder(callback, root = this.root) {
        if (typeof callback !== 'function') {
            throw new Error('A callback function is required');
        }
    
        function traverse(node) {
            if (node !== null) {
                traverse(node.left);
                traverse(node.right);
                callback(node);
            }
        }
    
        traverse(root);
    }

    height(node) {
        if (node === null) return -1;
    
        let leftHeight = this.height(node.left);
        let rightHeight = this.height(node.right);
    
        return Math.max(leftHeight, rightHeight) + 1;
    }

    depth(node, current = this.root, depthValue = 0) {
        if (current === null) return -1;
        if (node.data === current.data) return depthValue;
    
        if (node.data < current.data) {
            return this.depth(node, current.left, depthValue + 1);
        } else {
            return this.depth(node, current.right, depthValue + 1);
        }
    }

    isBalanced(root = this.root) {
        if (root === null) return true;
    
        const leftHeight = this.height(root.left);
        const rightHeight = this.height(root.right);
    
        const heightDiff = Math.abs(leftHeight - rightHeight) <= 1;
    
        return heightDiff && this.isBalanced(root.left) && this.isBalanced(root.right);
    }

    rebalance() {
        const nodes = [];
        
        this.inOrder((node) => {
            nodes.push(node.data);
        });
    
        this.root = this.buildTree(nodes);
    }
}

export { Tree };
