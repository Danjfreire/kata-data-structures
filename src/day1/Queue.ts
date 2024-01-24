type Node<T> = {
    val: T;
    next?: Node<T>;
};
export default class Queue<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;

    constructor() {
        this.length = 0;
        this.head = undefined;
        this.tail = undefined;
    }

    enqueue(item: T): void {
        this.length++;
        const node = { val: item } as Node<T>;
        if (!this.tail) {
            this.head = node;
            this.tail = node;
            return;
        }

        this.tail.next = node;
        this.tail = node;
    }

    deque(): T | undefined {
        if (!this.head) {
            return undefined;
        }

        this.length--;
        const headRef = this.head;
        this.head = this.head.next;

        headRef.next = undefined;

        if (this.length === 0) {
            this.tail = undefined;
        }

        return headRef.val;
    }

    peek(): T | undefined {
        return this.head?.val;
    }
}
