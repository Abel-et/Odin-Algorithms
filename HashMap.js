class HashMap {
  constructor(loadFactor = 0.75, initialCapacity = 16) {
    this.loadFactor = loadFactor;
    this.capacity = initialCapacity;
    this.buckets = Array(this.capacity).fill(null).map(() => []);
    this.size = 0;
  }

  // HASH FUNCTION (with modulo inside loop to avoid overflow)
  hash(key) {
    if (typeof key !== "string") {
      throw new TypeError("Keys must be strings");
    }

    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  // SET KEY-VALUE
  set(key, value) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (let pair of bucket) {
      if (pair[0] === key) {
        pair[1] = value; // overwrite
        return;
      }
    }

    bucket.push([key, value]);
    this.size++;

    if (this.size / this.capacity >= this.loadFactor) {
      this._resize();
    }
  }

  // GET VALUE
  get(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (let pair of bucket) {
      if (pair[0] === key) return pair[1];
    }

    return null;
  }

  // CHECK EXISTENCE
  has(key) {
    return this.get(key) !== null;
  }

  // REMOVE KEY
  remove(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1);
        this.size--;
        return true;
      }
    }

    return false;
  }

  // NUMBER OF KEYS
  length() {
    return this.size;
  }

  // CLEAR MAP
  clear() {
    this.buckets = Array(this.capacity).fill(null).map(() => []);
    this.size = 0;
  }

  // RETURN ALL KEYS
  keys() {
    const keys = [];
    for (let bucket of this.buckets) {
      for (let [key] of bucket) {
        keys.push(key);
      }
    }
    return keys;
  }

  // RETURN ALL VALUES
  values() {
    const values = [];
    for (let bucket of this.buckets) {
      for (let [, value] of bucket) {
        values.push(value);
      }
    }
    return values;
  }

  // RETURN ALL ENTRIES
  entries() {
    const entries = [];
    for (let bucket of this.buckets) {
      for (let pair of bucket) {
        entries.push(pair);
      }
    }
    return entries;
  }

  // PRIVATE: RESIZE & REHASH
  _resize() {
    const oldBuckets = this.buckets;
    this.capacity *= 2;
    this.buckets = Array(this.capacity).fill(null).map(() => []);
    this.size = 0;

    for (let bucket of oldBuckets) {
      for (let [key, value] of bucket) {
        this.set(key, value);
      }
    }
  }
}

module.exports = HashMap;