function traverse(node: BinaryNode<number> | null, path: number[]): number[] {
    // base case
    if (node === null) {
        return path;
    }

    // pre-recursion

    // recursion
    traverse(node.left, path);
    path.push(node.value);
    traverse(node.right, path);

    // post-recursion

    return path;
}

export default function in_order_search(head: BinaryNode<number>): number[] {
    const path: number[] = [];
    return traverse(head, path);
}
