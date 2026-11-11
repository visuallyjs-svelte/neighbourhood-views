export const neighbourhoodKinds = ['successors', 'predecessors', 'neighbours', 'siblings']

export function neighbourhood(graph, focus, kind) {
    const ids = new Set([focus])
    let edges = []
    if (kind === 'successors') {
        const stack = [focus]
        while (stack.length) {
            const current = stack.pop()
            for (const edge of graph.edges.filter(e => e.source === current)) {
                edges.push(edge)
                if (!ids.has(edge.target)) {
                    ids.add(edge.target)
                    stack.push(edge.target)
                }
            }
        }
    } else if (kind === 'siblings') {
        const parent = graph.edges.find(e => e.target === focus)?.source
        if (parent) {
            ids.add(parent)
            edges = graph.edges.filter(e => e.source === parent)
            edges.forEach(e => ids.add(e.target))
        }
    } else {
        edges = graph.edges.filter(e => e.target === focus || (kind === 'neighbours' && e.source === focus))
        edges.forEach(e => { ids.add(e.source); ids.add(e.target) })
    }
    // Each view owns its data: diagram models may add layout properties to it.
    return {
        nodes: graph.nodes.filter(n => ids.has(n.id)).map(n => ({ ...n })),
        edges: edges.map(e => ({ ...e }))
    }
}
