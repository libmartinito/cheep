<template>
    <button class="button">
        <slot></slot>
    </button>
</template>

<style scoped>
    .button {
        padding: 0.5rem 1rem;
        border-radius: 2rem;
        font: inherit;
        background-color: var(--neutral-700);
        color: var(--neutral-50);
        cursor: pointer;
    }
    .button:hover {
        background-color: var(--neutral-900);
    }
</style>