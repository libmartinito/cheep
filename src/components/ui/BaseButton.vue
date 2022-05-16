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
        border: none;
        background-color: var(--neutral-600);
        color: var(--neutral-50);
        cursor: pointer;
        margin: 1rem 0rem;
    }
    button:hover {
        background-color: var(--neutral-800);
    }
    .primary {
        padding: 0.5rem 2.5rem;
    }
    .secondary {
        padding: 0.2rem 0.5rem;
    }
</style>