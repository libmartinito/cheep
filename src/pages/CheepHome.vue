<template>
    <header class="header">
        <div>Home</div>
    </header>
    <section class="input">
        <div class="input__icon"></div>
        <div class="input__main">
            <textarea id="input__text" placeholder="What's happening?" v-model="postContent"></textarea>
            <div class="input__actions">
                <base-button mode="secondary">Cheep</base-button>
            </div>
        </div>
    </section>
    <cheep-post v-for="post in posts" :key="post.id" :content="post.content"></cheep-post>
</template>

<script>
    import CheepPost from '../components/home/CheepPost.vue'

    export default {
        components: {
            CheepPost,
        },
        data() {
            return {
                posts: [],
                postContent: ""
            }
        },
        methods: {
            async getData() {
                try {
                    let response = await fetch("http://localhost:3333/api/cheep", {
                        method: 'GET',
                        mode: 'cors',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    })
                    this.posts = await response.json()
                    console.log(this.posts)
                } catch(error) {
                    console.log(error)
                }
            },
            async postCheep() {
                try {
                    let response = await fetch("http://localhost:3333/api/cheep", {
                        method: 'POST',
                        mode: 'cors',
                        headers: {
                            'Authentication': 'Bearer ' + this.$store.getters.token,
                            'Content-Type': 'application/json'
                        },
                    })
                    response = await response.json()
                    this.posts.concat(response)
                } catch(error) {
                    console.log(error)
                }
            }
        },
        created() {
            this.getData()
        }
    }
</script>
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
