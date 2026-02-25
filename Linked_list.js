// Node class
class Node {
  constructor(value = null, nextNode = null) {
    this.value = value;
    this.nextNode = nextNode;
  }
}

// LinkedList class
class LinkedList {
  constructor() {
    this._head = null;
  }

  // add to end
  append(value) {
    const newNode = new Node(value);

    if (!this._head) {
      this._head = newNode;
      return;
    }

    let current = this._head;
    while (current.nextNode) {
      current = current.nextNode;
    }
    current.nextNode = newNode;
  }

  // add to start
  prepend(value) {
    this._head = new Node(value, this._head);
  }

  // number of nodes
  size() {
    let count = 0;
    let current = this._head;
    while (current) {
      count++;
      current = current.nextNode;
    }
    return count;
  }

  // first node value
  head() {
    return this._head ? this._head.value : undefined;
  }

  // last node value
  tail() {
    if (!this._head) return undefined;

    let current = this._head;
    while (current.nextNode) {
      current = current.nextNode;
    }
    return current.value;
  }

  // value at index
  at(index) {
    if (index < 0) return undefined;

    let current = this._head;
    let i = 0;

    while (current) {
      if (i === index) return current.value;
      current = current.nextNode;
      i++;
    }
    return undefined;
  }

  // remove head
  pop() {
    if (!this._head) return undefined;

    const value = this._head.value;
    this._head = this._head.nextNode;
    return value;
  }

  // check existence
  contains(value) {
    let current = this._head;
    while (current) {
      if (current.value === value) return true;
      current = current.nextNode;
    }
    return false;
  }

  // find index
  findIndex(value) {
    let current = this._head;
    let index = 0;

    while (current) {
      if (current.value === value) return index;
      current = current.nextNode;
      index++;
    }
    return -1;
  }

  // string representation
  toString() {
    if (!this._head) return "";

    let result = "";
    let current = this._head;

    while (current) {
      result += `( ${current.value} ) -> `;
      current = current.nextNode;
    }
    return result + "null";
  }

  // EXTRA CREDIT: insert at index
  insertAt(index, ...values) {
    if (index < 0 || index > this.size()) {
      throw new RangeError("Index out of bounds");
    }

    if (index === 0) {
      for (let i = values.length - 1; i >= 0; i--) {
        this.prepend(values[i]);
      }
      return;
    }

    let prev = this._head;
    for (let i = 0; i < index - 1; i++) {
      prev = prev.nextNode;
    }

    let next = prev.nextNode;
    for (const value of values) {
      const newNode = new Node(value);
      prev.nextNode = newNode;
      prev = newNode;
    }
    prev.nextNode = next;
  }

  // EXTRA CREDIT: remove at index
  removeAt(index) {
    if (index < 0 || index >= this.size()) {
      throw new RangeError("Index out of bounds");
    }

    if (index === 0) {
      return this.pop();
    }

    let prev = this._head;
    for (let i = 0; i < index - 1; i++) {
      prev = prev.nextNode;
    }

    const removedValue = prev.nextNode.value;
    prev.nextNode = prev.nextNode.nextNode;
    return removedValue;
  }
}

module.exports = LinkedList;