type Node<T> = {
    value: T;
    next?: Node<T>;
};

export default class SinglyLinkedList<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;

    constructor() {
        this.length = 0;
    }

    prepend(item: T): void {
        this.length++;
        const node = { value: item } as Node<T>;
        if (!this.head) {
            this.head = node;
            this.tail = node;
            return;
        }

        node.next = this.head;
        this.head = node;
    }

    insertAt(item: T, idx: number): void {
        if (idx > this.length) {
            return;
        }

        if (idx === 0) {
            return this.prepend(item);
        }

        if (idx === this.length) {
            return this.append(item);
        }

        let currentIdx = 0;
        let pointer = this.head as Node<T>;

        while (pointer.next != null && currentIdx <= idx - 1) {
            pointer = pointer.next;
            currentIdx++;
        }
        const node = { value: item } as Node<T>;

        node.next = pointer.next;
        pointer.next = node;

        return;
    }

    append(item: T): void {
        this.length++;
        const node = { value: item } as Node<T>;

        if (!this.head) {
            this.head = node;
            this.tail = node;
            return;
        }

        if (this.tail) {
            this.tail.next = node;
            this.tail = node;
        }
    }

    remove(item: T): T | undefined {
        let pointer = this.head;
        let beforePointer = undefined;

        if (this.head && this.head.value === item) {
            this.length--;
            const pointer = this.head;
            this.head = this.head.next;
            pointer.next = undefined;
            return pointer.value;
        }

        while (pointer && pointer.next && pointer.value != item) {
            beforePointer = pointer;
            pointer = pointer.next;
        }

        if (beforePointer && pointer && pointer.value === item) {
            this.length--;
            if (this.tail === pointer) {
                this.tail = beforePointer;
            }
            beforePointer.next = pointer.next;
            pointer.next = undefined;
            return pointer.value;
        }

        return undefined;
    }

    get(idx: number): T | undefined {
        if (idx >= this.length) {
            return undefined;
        }

        let currentIdx = 0;
        let pointer = this.head;

        while (currentIdx !== idx && pointer && pointer.next) {
            pointer = pointer.next;
        }

        return pointer?.value;
    }

    removeAt(idx: number): T | undefined {
        if (idx >= this.length) {
            return undefined;
        }

        if (idx === 0 && this.head) {
            this.length--;
            const pointer = this.head;
            this.head = this.head?.next;
            pointer.next = undefined;
            return pointer.value;
        }

        let currentIdx = 0;
        let pointer = this.head;
        let beforePointer = undefined;

        while (currentIdx !== idx && pointer && pointer.next) {
            beforePointer = pointer;
            pointer = pointer.next;
            currentIdx++;
        }

        if (beforePointer && pointer) {
            this.length--;
            beforePointer.next = pointer?.next;
            pointer.next = undefined;
            return pointer.value;
        }

        return undefined;
    }
}
