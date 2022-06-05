<template>
    <header class="header">
        <div>Home</div>
    </header>
    <section class="input">
        <!-- <div class="input__icon"></div> -->
        <img class="input__icon" :src="this.$store.getters.icon"/>
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
                postContent: "",
                followingIds: []
            }
        },
        methods: {
            async getFollowingIds() {
                try {
                    let response = await fetch("http://localhost:3333/api/connection/", {
                        method: 'GET',
                        mode: 'cors',
                        headers: {
                            'Authorization': 'Bearer ' + this.$store.getters.token,
                            'Content-Type': 'application/json'
                        }
                    })
                    response = await response.json()
                    response.forEach(connection => {
                        if (this.$store.getters.userId === connection.user_id) {
                            this.followingIds.push(connection.isfollowing_id)
                        }
                    })
                } catch(error) {
                    console.log(error)
                }
            },
            async getPostsExceptForUser() {
                try {
                    this.posts = []
                    let response = await fetch("http://localhost:3333/api/cheep/all", {
                        method: 'GET',
                        mode: 'cors',
                        headers: {
                            'Authorization': 'Bearer ' + this.$store.getters.token,
                            'Content-Type': 'application/json'
                        },
                    })
                    const allPosts = await response.json()
                    console.log(allPosts)

                    const currentUserId = parseInt(this.$store.getters.userId)
                    
                    this.posts = allPosts.filter(post => post.user_id !== currentUserId)

                    await this.getFollowingIds()

                    this.posts = this.posts.filter(post => this.followingIds.includes(post.id))
                } catch(error) {
                    console.log(error)
                }
            },
            async postCheep() {
                try {
                    await fetch("http://localhost:3333/api/cheep", {
                        method: 'POST',
                        mode: 'cors',
                        headers: {
                            'Authorization': 'Bearer ' + this.$store.getters.token,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            user_id: this.$store.getters.userId,
                            content: this.postContent
                        })
                    })
                } catch(error) {
                    console.log(error)
                }
            }
        },
        created() {
            this.getPostsExceptForUser()
        },
    }
</script>
<style scoped>
.header {
    padding: 0.5rem 0rem; 
}
.input__icon {
    /* background-image: url("../assets/icon.svg"); */
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
