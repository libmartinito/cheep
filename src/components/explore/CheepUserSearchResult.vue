<template>
    <section class="searchResult">
        <img class="searchResult__icon" :src="icon"/>
        <div class="searchResult__content">
            <div class="searchResult__header">
                <div class="searchResult__identifier">
                    <div @click.stop="goToProfile" class="searchResult__username">{{ username }}</div>
                    <div class="searchResult__handle">{{ handle }}</div>
                </div>
                <base-button mode="secondary">Follow</base-button>
            </div>
            <div class="searchResult__bio">{{ bio }}</div>
        </div>
    </section>
</template>

<script>
    export default {
        props: ["username", "handle", "icon", "bio"],
        methods: {
            goToProfile() {
                this.$router.push("/user/" + this.handle)
            }
        }
    }
</script>

<style scoped>
.searchResult {
    padding: 1rem 0rem;
    border-bottom: 1px solid var(--neutral-200);
    cursor: pointer;
    display: flex;
    justify-content: space-between;
}
.searchResult:hover {
    background-color: var(--neutral-100);
}
.searchResult__icon {
    background-size: contain;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    border: 2px solid var(--neutral-600)
}
.searchResult__content {
    width: calc(100% - 3rem - 1rem);
}
.searchResult__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.searchResult__identifier {
    display: flex;
    flex-direction: column;
}
.searchResult__username {
    font-weight: 700;
    cursor: pointer;
}
.searchResult__username:hover {
    text-decoration: underline;
}
.searchResult__handle {
    color: var(--neutral-600);
}
</style>