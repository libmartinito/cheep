<template>
    <header class="header">
        <div>Home</div>
    </header>
    <section class="input">
        <div class="input__icon"></div>
        <div class="input__main">
            <textarea id="input__text" placeholder="What's happening?" v-model="postContent"></textarea>
            <div class="input__actions">
                <base-button @click="postCheep" mode="secondary">Cheep</base-button>
            </div>
        </div>
    </section>
    <cheep-post v-for="post in posts" 
        :key="post.id" 
        :userId="post.user_id"
        :cheepId="post.id"
        :content="post.content"
        :username="post.username"
        :handle="post.handle"
        :icon="post.icon"
    ></cheep-post>
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
                    this.posts = []
                    console.log(this.posts)
                    let response = await fetch("http://localhost:3333/api/cheep", {
                        method: 'GET',
                        mode: 'cors',
                        headers: {
                            'Authorization': 'Bearer ' + this.$store.getters.token,
                            'Content-Type': 'application/json'
                        },
                    })
                    const allPosts = await response.json()
                    console.log(allPosts)
                    // console.log(this.$store.getters.userId)
                    // this.posts = []
                    const currentUserId = parseInt(this.$store.getters.userId)
                    
                    this.posts = allPosts.filter(post => post.user_id !== currentUserId)
                    // allPosts.forEach(post => {
                    //     if (post.user_id === this.$store.getters.userId) {
                    //         // console.log('post not pushed')
                    //         return
                    //         // this.posts.push(post)
                    //     }
                    //     this.posts.push(post)
                    // })
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
                            'Authorization': 'Bearer ' + this.$store.getters.token,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            content: this.postContent
                        })
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
        },
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
