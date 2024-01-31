function search(node: BinaryNode<number> | null, value: number): boolean {
    // base cases
    if (node === null) {
        return false;
    }

    if (node.value === value) {
        return true;
    }

    // recursion
    if (node.value < value) {
        return search(node.right, value);
    }

    return search(node.left, value);
}

export default function dfs(head: BinaryNode<number>, needle: number): boolean {
    return search(head, needle);
}
