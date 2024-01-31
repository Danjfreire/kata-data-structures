export default class MinHeap {
    public length: number;
    private data: number[];

    constructor() {
        this.data = [];
        this.length = 0;
    }

    insert(value: number): void {
        this.data[this.length] = value;
        this.heapifyUp(this.length);
        this.length++;
    }

    delete(): number {
        if (this.length === 0) {
            return -1;
        }

        const headValue = this.data[0];
        this.length--;

        if (this.length === 0) {
            this.data = [];
            return headValue;
        }
        this.data[0] = this.data[this.length];
        this.heapifyDown(0);

        return headValue;
    }

    private heapifyUp(idx: number): void {
        if (idx === 0) {
            return;
        }

        const parentIdx = this.parent(idx);
        const parentValue = this.data[parentIdx];
        const value = this.data[idx];

        if (parentValue > value) {
            this.data[parentIdx] = value;
            this.data[idx] = parentValue;
            this.heapifyUp(parentIdx);
        }
    }

    private heapifyDown(idx: number): void {
        const leftIdx = this.leftChild(idx);
        const rightIdx = this.rightChild(idx);

        if (idx >= this.length || leftIdx >= this.length) {
            return;
        }

        const leftValue = this.data[leftIdx];
        const rightValue = this.data[rightIdx];
        const value = this.data[idx];

        if (rightValue < leftValue && rightValue < value) {
            this.data[rightIdx] = value;
            this.data[idx] = rightValue;
            this.heapifyDown(rightIdx);
        } else if (leftValue < rightValue && leftValue < value) {
            this.data[leftIdx] = value;
            this.data[idx] = leftValue;
            this.heapifyDown(leftIdx);
        }
    }

    private parent(idx: number): number {
        return Math.floor((idx - 1) / 2);
    }

    private leftChild(idx: number): number {
        return idx * 2 + 1;
    }

    private rightChild(idx: number): number {
        return idx * 2 + 2;
    }
}
