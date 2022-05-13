<template>
    <li class="main-nav__item">
        <slot></slot>
    </li>
</template>

<style scoped>
.main-nav__item {
    display: flex;
    justify-content: flex-start;
    padding: 0.5rem 1rem;
    border-radius: 2rem;
    cursor: pointer;
    width: fit-content;
}

.main-nav__item:hover {
    background-color: var(--neutral-200);
}

</style>