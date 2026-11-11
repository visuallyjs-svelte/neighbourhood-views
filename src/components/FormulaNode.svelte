<script>
    let { data } = $props()
    const parts = $derived((data.formula || '').match(/([A-Z]+)|([0-9]+)|-/g) || [])
</script>

<div class="formula">
    <div class="title">{data.label}</div>
    <div class="formula-value">
        {#each parts as part, i (i)}
            {#if /^\d+$/.test(part)}
                <sub>{part}</sub>
            {:else}
                <span data-c={part}>{part}</span>
            {/if}
        {/each}
    </div>
</div>
