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
        height: fit-content;
    }
    .primary {
        padding: 0.5rem 2.5rem;
    }
    .secondary {
        padding: 0.2rem 0.5rem;
    }
    .primary:hover,
    .secondary:hover {
        background-color: var(--neutral-800);
    }
    .edit {
        background-color: var(--neutral-50);
        border: 1px solid var(--neutral-600);
        color: var(--neutral-600);
        padding: 0.2rem 0.5rem;
    }
    .edit:hover {
        background-color: var(--neutral-200);
    }
</style>