<template>
    <li :class="mode">
        <slot></slot>
    </li>
</template>

<script>
    export default {
        props: ["mode"]
    }
</script>
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
.secondary-nav__item {
  padding: 0.5rem 1rem; 
  cursor: pointer; 
  margin: 1rem 0rem;
}
.secondary-nav__item:hover {
    background-color: var(--neutral-200);
}
</style>