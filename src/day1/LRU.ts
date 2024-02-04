type Node<T> = {
    value: T;
    next?: Node<T>;
    prev?: Node<T>;
};

export default class LRU<K, V> {
    private length: number;
    private head?: Node<V>;
    private tail?: Node<V>;
    private lookup: Map<K, Node<V>>;
    private reverseLoookup: Map<Node<V>, K>;

    constructor(private capacity: number = 10) {
        this.length = 0;
        this.head = undefined;
        this.tail = undefined;
        this.lookup = new Map<K, Node<V>>();
        this.reverseLoookup = new Map<Node<V>, K>();
    }

    update(key: K, value: V): void {
        // check if it exists
        let node = this.lookup.get(key);

        if (node) {
            // if it does, update it and add it to the front
            this.detach(node);
            this.prepend(node);
            node.value = value;
        } else {
            // if it does not exist, add it to the front and trim the cache if necessary
            node = { value };
            this.length++;
            this.prepend(node);
            this.trimCache();
            this.lookup.set(key, node);
            this.reverseLoookup.set(node, key);
        }
    }

    get(key: K): V | undefined {
        // check if it exists
        const node = this.lookup.get(key);

        if (!node) {
            return undefined;
        }

        // if it exists detach it and it to the front
        this.detach(node);
        this.prepend(node);

        return node.value;
    }

    private prepend(node: Node<V>): void {
        if (!this.head) {
            this.head = node;
            this.tail = node;
            return;
        }

        node.next = this.head;
        this.head.prev = node;
        this.head = node;
    }

    private detach(node: Node<V>): void {
        if (node.prev) {
            node.prev.next = node.next;
        }

        if (node.next) {
            node.next.prev = node.prev;
        }

        if (this.head === node) {
            this.head = node.next;
        }

        if (this.tail === node) {
            this.tail = node.prev;
        }

        node.next = undefined;
        node.prev = undefined;
    }

    private trimCache() {
        if (this.length <= this.capacity) {
            return;
        }

        // remove tail
        const tail = this.tail as Node<V>;
        this.detach(tail);

        const key = this.reverseLoookup.get(tail) as K;
        this.lookup.delete(key);
        this.reverseLoookup.delete(tail);
        this.length--;
    }
}
