import BaseNode from './components/BaseNode.svelte'
import FormulaNode from './components/FormulaNode.svelte'

export function createView(onNodeTap) {
    const events = { tap: ({ obj }) => onNodeTap(obj.id) }
    return { nodes: {
        base: { component: BaseNode, events },
        formula: { component: FormulaNode, events }
    } }
}
