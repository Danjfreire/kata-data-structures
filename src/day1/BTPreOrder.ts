function traverse(node: BinaryNode<number> | null, path: number[]): number[] {
    // base case
    if (node === null) {
        return path;
    }

    // pre-recursion
    path.push(node.value);

    // recursion
    traverse(node.left, path);
    traverse(node.right, path);

    // post-recursion
    return path;
}

export default function pre_order_search(head: BinaryNode<number>): number[] {
    const path: number[] = [];
    return traverse(head, path);
}
