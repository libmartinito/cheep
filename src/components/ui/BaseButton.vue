<template>
    <button :class="mode">
        <slot></slot>
    </button>
</template>

<script>
export default {
    props: ["mode"]
}
</script>

<style scoped>
    button {
        border-radius: 2rem;
        font: inherit;
        background-color: var(--neutral-700);
        color: var(--neutral-50);
        cursor: pointer;
    }
    button:hover {
        background-color: var(--neutral-900);
    }
    .primary {
        padding: 0.5rem 2.5rem;
    }
    .secondary {
        padding: 0.2rem 0.5rem;
    }
</style>