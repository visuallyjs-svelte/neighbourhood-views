<script>
    import { HierarchyLayout } from '@visuallyjs/browser-ui'
    import { PaperProvider } from '@visuallyjs/browser-ui-svelte'
    import Canvas from './Canvas.svelte'
    import renderOptions from './render-options.js'
    import { createView } from './view-options.js'

    let { kind, data, focusId, hidden, onToggle, onNodeTap } = $props()
    const title = $derived(kind[0].toUpperCase() + kind.slice(1))
    const viewOptions = createView(id => onNodeTap(id))
    const options = $derived({
        ...renderOptions,
        layout: kind === 'successors' || kind === 'predecessors'
            ? { type: HierarchyLayout.type, options: { invert: kind === 'predecessors', getRootNode: () => focusId } }
            : renderOptions.layout,
        zoom: { wheel: false },
        pan: { enabled: false },
        zoomToFit: true
    })
</script>

<div id={kind} class="popup" data-hidden={hidden}>
    <button class="title popup-title" onclick={onToggle} aria-expanded={!hidden}>
        {title}<span class="toggle-btn">{hidden ? '+' : '_'}</span>
    </button>
    {#if !hidden}
        <div class="content">
            {#key focusId}
                <PaperProvider>
                    <Canvas paper {data} renderOptions={options} {viewOptions} />
                </PaperProvider>
            {/key}
        </div>
    {/if}
</div>
