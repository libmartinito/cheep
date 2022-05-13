<template>
    <header class="header">
        <div>Home</div>
    </header>
    <section class="input">
        <div class="input__icon"></div>
        <div class="input__main">
            <textarea id="input__text" placeholder="What's happening?"></textarea>
            <div class="input__actions">
                <base-button mode="secondary">Cheep</base-button>
            </div>
        </div>
    </section>
    <section class="post">
        <div class="post__interaction"></div>
        <div class="post__icon"></div>
        <div class="post__content">
            <div class="post__header"></div>
            <div class="post__body"></div>
            <div class="post__actions"></div>            
        </div>
        <div class="post__options"></div>
    </section>
</template>

<style scoped>
.header {
    padding: 0.5rem;
}
.input__icon {
    background-image: url("../assets/icon.svg");
    background-size: contain;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    border: 2px solid var(--neutral-700);
}
.input__main {
    width: calc(100% - 3rem);
}
.input {
    display: flex;
    padding: 1rem 0rem;
    border-bottom: 1px solid var(--neutral-200);
}
#input__text {
    font: inherit;
    box-sizing: border-box;
    width: 100%;
    height: 7rem;
    padding: 1rem;
    background-color: var(--neutral-50);
    border: none;
    outline: none;
}
.input__actions {
    display: flex;
    width: 100%;
    justify-content: flex-end;
}
</style>