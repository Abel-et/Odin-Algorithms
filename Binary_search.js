const Node = require("./Node");

class Tree {
  constructor(array) {
    const cleanArray = [...new Set(array)].sort((a, b) => a - b);
    this.root = this.#buildTree(cleanArray);
  }

  // PRIVATE: build balanced BST
  #buildTree(arr) {
    if (arr.length === 0) return null;

    const mid = Math.floor(arr.length / 2);
    const root = new Node(arr[mid]);

    root.left = this.#buildTree(arr.slice(0, mid));
    root.right = this.#buildTree(arr.slice(mid + 1));

    return root;
  }

  // VISUALIZATION
  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (!node) return;

    if (node.right) {
      this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }

    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);

    if (node.left) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  // SEARCH
  includes(value) {
    let current = this.root;
    while (current) {
      if (value === current.data) return true;
      current = value < current.data ? current.left : current.right;
    }
    return false;
  }

  // INSERT
  insert(value) {
    const insertRec = (node) => {
      if (!node) return new Node(value);
      if (value === node.data) return node;

      if (value < node.data) node.left = insertRec(node.left);
      else node.right = insertRec(node.right);

      return node;
    };

    this.root = insertRec(this.root);
  }

  // DELETE
  deleteItem(value) {
    const deleteRec = (node, value) => {
      if (!node) return null;

      if (value < node.data) {
        node.left = deleteRec(node.left, value);
      } else if (value > node.data) {
        node.right = deleteRec(node.right, value);
      } else {
        if (!node.left) return node.right;
        if (!node.right) return node.left;

        let successor = node.right;
        while (successor.left) successor = successor.left;

        node.data = successor.data;
        node.right = deleteRec(node.right, successor.data);
      }
      return node;
    };

    this.root = deleteRec(this.root, value);
  }

  // LEVEL ORDER
  levelOrderForEach(callback) {
    if (!callback) throw new Error("Callback required");

    const queue = [this.root];
    while (queue.length) {
      const node = queue.shift();
      callback(node.data);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  // DEPTH-FIRST TRAVERSALS
  inOrderForEach(callback, node = this.root) {
    if (!callback) throw new Error("Callback required");
    if (!node) return;

    this.inOrderForEach(callback, node.left);
    callback(node.data);
    this.inOrderForEach(callback, node.right);
  }

  preOrderForEach(callback, node = this.root) {
    if (!callback) throw new Error("Callback required");
    if (!node) return;

    callback(node.data);
    this.preOrderForEach(callback, node.left);
    this.preOrderForEach(callback, node.right);
  }

  postOrderForEach(callback, node = this.root) {
    if (!callback) throw new Error("Callback required");
    if (!node) return;

    this.postOrderForEach(callback, node.left);
    this.postOrderForEach(callback, node.right);
    callback(node.data);
  }

  // HEIGHT
  height(value, node = this.root) {
    if (!node) return undefined;

    if (value === node.data) return this.#nodeHeight(node);

    return value < node.data
      ? this.height(value, node.left)
      : this.height(value, node.right);
  }

  #nodeHeight(node) {
    if (!node) return -1;
    return 1 + Math.max(this.#nodeHeight(node.left), this.#nodeHeight(node.right));
  }

  // DEPTH
  depth(value, node = this.root, depth = 0) {
    if (!node) return undefined;
    if (value === node.data) return depth;

    return value < node.data
      ? this.depth(value, node.left, depth + 1)
      : this.depth(value, node.right, depth + 1);
  }

  // BALANCE CHECK
  isBalanced(node = this.root) {
    if (!node) return true;

    const leftHeight = this.#nodeHeight(node.left);
    const rightHeight = this.#nodeHeight(node.right);

    if (Math.abs(leftHeight - rightHeight) > 1) return false;

    return this.isBalanced(node.left) && this.isBalanced(node.right);
  }

  // REBALANCE
  rebalance() {
    const values = [];
    this.inOrderForEach((v) => values.push(v));
    this.root = this.#buildTree(values);
  }
}

module.exports = Tree;