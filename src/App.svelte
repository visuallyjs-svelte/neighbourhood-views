<script>
    import { SurfaceProvider } from '@visuallyjs/browser-ui-svelte'
    import Canvas from './Canvas.svelte'
    import Popup from './Popup.svelte'
    import { parse } from './data-adapter.js'
    import rawData from './assets/dataset.js'
    import renderOptions from './render-options.js'
    import { createView } from './view-options.js'
    import { neighbourhood, neighbourhoodKinds } from './neighbourhood.js'

    const initialData = parse(rawData)
    let surface = $state()
    let focusId = $state(initialData.nodes[0].id)
    let hidden = $state({ successors: false, predecessors: false, neighbours: false, siblings: false })
    const viewOptions = createView(focusNode)
    const panels = $derived(neighbourhoodKinds.map(kind => ({
        kind, data: neighbourhood(initialData, focusId, kind)
    })))

    function focusNode(id) {
        focusId = id
        surface?.getSurface()?.centerOn(id)
        surface?.getModel()?.setSelection(id)
    }
    function toggle(kind) { hidden[kind] = !hidden[kind] }
    function setAll(value) {
        hidden = { successors: value, predecessors: value, neighbours: value, siblings: value }
    }
</script>

<div class="vjs-nv-main">
    <div class="vjs-nv-taskbar">
        <div class="vjs-nv-taskbar-links">
            {#each neighbourhoodKinds as kind (kind)}
                <button class:active={!hidden[kind]} aria-pressed={!hidden[kind]} onclick={() => toggle(kind)}>
                    {kind[0].toUpperCase() + kind.slice(1)}
                </button>
            {/each}
        </div>
        <div class="vjs-nv-taskbar-actions">
            <button onclick={() => setAll(false)}>Show All</button>
            <button onclick={() => setAll(true)}>Hide All</button>
        </div>
    </div>
    <SurfaceProvider>
        <Canvas bind:this={surface} data={initialData} {renderOptions} {viewOptions} />
    </SurfaceProvider>
    {#each panels as panel (panel.kind)}
        <Popup kind={panel.kind} data={panel.data} {focusId} hidden={hidden[panel.kind]}
            onToggle={() => toggle(panel.kind)} onNodeTap={focusNode} />
    {/each}
</div>
