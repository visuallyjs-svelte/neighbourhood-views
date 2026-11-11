import { test } from 'node:test'
import assert from 'node:assert/strict'
import { neighbourhood } from '../src/neighbourhood.js'

const graph = {
    nodes: ['root', 'a', 'b', 'child', 'leaf'].map(id => ({ id, label: id, type: 'base' })),
    edges: [
        { source: 'root', target: 'a' }, { source: 'root', target: 'b' },
        { source: 'a', target: 'child' }, { source: 'child', target: 'leaf' }
    ]
}
const ids = data => data.nodes.map(n => n.id).sort()

test('successors include every descendant and their connecting edges', () => {
    const result = neighbourhood(graph, 'a', 'successors')
    assert.deepEqual(ids(result), ['a', 'child', 'leaf'])
    assert.deepEqual(result.edges, graph.edges.slice(2))
})
test('predecessors include only immediate parents', () => {
    assert.deepEqual(ids(neighbourhood(graph, 'child', 'predecessors')), ['a', 'child'])
})
test('neighbours include immediate parents and children', () => {
    assert.deepEqual(ids(neighbourhood(graph, 'a', 'neighbours')), ['a', 'child', 'root'])
})
test('siblings include the parent and every sibling', () => {
    assert.deepEqual(ids(neighbourhood(graph, 'a', 'siblings')), ['a', 'b', 'root'])
    assert.deepEqual(ids(neighbourhood(graph, 'root', 'siblings')), ['root'])
})
test('panels isolate their data from mutations by diagram models', () => {
    const result = neighbourhood(graph, 'a', 'successors')
    result.nodes[0].label = 'Changed'
    result.edges[0].source = 'Changed'
    assert.equal(graph.nodes[1].label, 'a')
    assert.equal(graph.edges[2].source, 'a')
})
test('successor traversal terminates on cyclic input', () => {
    const cyclic = { ...graph, edges: [...graph.edges, { source: 'leaf', target: 'a' }] }
    assert.deepEqual(ids(neighbourhood(cyclic, 'a', 'successors')), ['a', 'child', 'leaf'])
})
