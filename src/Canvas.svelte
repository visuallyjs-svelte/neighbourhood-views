<script>
    import { onDestroy } from 'svelte'
    import { SurfaceComponent, PaperComponent } from '@visuallyjs/browser-ui-svelte'

    let { data, renderOptions, viewOptions, paper = false } = $props()
    let component = $state()

    export function getSurface() { return component?.getSurface?.() }
    export function getModel() { return component?.getModel() }

    // The current Svelte bindings do not destroy their UI on unmount.
    onDestroy(() => {
        const ui = paper ? component?.getPaper() : component?.getSurface()
        ui?.destroy()
    })
</script>

{#if paper}
    <PaperComponent bind:this={component} className="neighbourhood-paper" {data} {renderOptions} {viewOptions} />
{:else}
    <SurfaceComponent bind:this={component} className="neighbourhood-surface" {data} {renderOptions} {viewOptions} />
{/if}
