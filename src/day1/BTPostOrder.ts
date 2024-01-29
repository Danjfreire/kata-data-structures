function traverse(node: BinaryNode<number> | null, path: number[]): number[] {
    // base case
    if (node === null) {
        return path;
    }

    // pre-recursion

    // recursion
    traverse(node.left, path);
    traverse(node.right, path);

    // post-recursion
    path.push(node.value);

    return path;
}

export default function post_order_search(head: BinaryNode<number>): number[] {
    const path: number[] = [];
    return traverse(head, path);
}
