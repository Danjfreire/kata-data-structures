export default function compare(
    a: BinaryNode<number> | null,
    b: BinaryNode<number> | null,
): boolean {
    if (a === null && b === null) {
        return true;
    }

    if (a === null || b === null) {
        return false;
    }

    if (a.value !== b.value) {
        return false;
    }

    const leftIsEqual = compare(a.left, b.left);
    const rightIsEqual = compare(a.right, b.right);

    return leftIsEqual && rightIsEqual;
}
