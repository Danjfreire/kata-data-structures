function walk(
    graph: WeightedAdjacencyList,
    curr: number,
    needle: number,
    seen: boolean[],
    path: number[],
): boolean {
    if (curr === needle) {
        path.push(curr);
        return true;
    }

    if (seen[curr]) {
        return false;
    }

    // pre
    seen[curr] = true;
    path.push(curr);

    // recursion
    const children = graph[curr];
    for (let i = 0; i < children.length; i++) {
        let edge = children[i];
        if (walk(graph, edge.to, needle, seen, path)) {
            return true;
        }
    }

    // post
    path.pop();

    return false;
}

export default function dfs(
    graph: WeightedAdjacencyList,
    source: number,
    needle: number,
): number[] | null {
    const path: number[] = [];
    const seen = new Array(graph.length).fill(false);

    walk(graph, source, needle, seen, path);

    if (path.length === 0) {
        return null;
    }

    return path;
}
