export default function bfs(
    graph: WeightedAdjacencyMatrix,
    source: number,
    needle: number,
): number[] | null {
    const seen = new Array(graph.length).fill(false);
    const parent = new Array(graph.length).fill(-1);
    const queue = [source];
    seen[source] = true;

    do {
        const curr = queue.shift() as number;

        if (curr === needle) {
            break;
        }

        const adjs = graph[curr];
        for (let i = 0; i < adjs.length; i++) {
            if (adjs[i] === 0) {
                // no child
                continue;
            }

            if (seen[i]) {
                // already seen
                continue;
            }

            seen[i] = true;
            parent[i] = curr;
            queue.push(i);
        }
    } while (queue.length > 0);

    if (parent[needle] === -1) {
        return null;
    }
    // build the path
    let curr = needle;
    const path: number[] = [];

    while (parent[curr] !== -1) {
        path.push(curr);
        curr = parent[curr];
    }

    return [source].concat(path.reverse());
}
