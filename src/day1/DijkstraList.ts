function hasUnvisited(seen: boolean[], dist: number[]): boolean {
    return seen.some((s, i) => !s && dist[i] !== Infinity);
}

function getLowestUnvisited(seen: boolean[], dist: number[]): number {
    let lowestDistance = Infinity;
    let idx = -1;

    for (let i = 0; i < seen.length; i++) {
        if (seen[i]) {
            continue;
        }

        if (dist[i] < lowestDistance) {
            lowestDistance = dist[i];
            idx = i;
        }
    }

    return idx;
}

export default function djikstra_list(
    source: number,
    needle: number,
    graph: WeightedAdjacencyList,
) {
    // init helper arrays

    const seen = new Array(graph.length).fill(false);
    const prev = new Array(graph.length).fill(-1);
    const dists = new Array(graph.length).fill(Infinity);

    dists[source] = 0;

    while (hasUnvisited(seen, dists)) {
        const curr = getLowestUnvisited(seen, dists);
        seen[curr] = true;

        const adjs = graph[curr];
        for (const edge of adjs) {
            const edgeDist = dists[curr] + edge.weight;

            if (edgeDist < dists[edge.to]) {
                dists[edge.to] = edgeDist;
                prev[edge.to] = curr;
            }
        }
    }

    let curr = needle;
    const path: number[] = [];
    while (prev[curr] !== -1) {
        path.push(curr);
        curr = prev[curr];
    }

    path.push(source);
    return path.reverse();
}
