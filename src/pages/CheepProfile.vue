<template>
    <header>
        User
    </header>
    <section class="profile">
        <div class="profile__wrapper">
            <!-- <div class="profile__pic"></div> -->
            <img :src="icon" class="profile__pic"/>
            <base-button mode="edit">Edit Profile</base-button>    
        </div>
        <div class="profile__username">{{ username }}</div>
        <div class="profile__handle">{{ handle }}</div>
        <div class="profile__bio">{{ bio }}</div>
        <div class="profile__age">Joined May 2022</div>
        <div class="profile__follow-info">
            <div class="profile__following">10 following</div>
            <div class="profile__followers">10 followers</div>
        </div>
    </section>
    <nav class="secondary-nav">
        <ul class="secondary-nav__list">
            <base-link mode="secondary-nav__item" :class="{active: cheepsIsActive}" @click="updateSelected('cheeps')">Cheep</base-link>
            <base-link mode="secondary-nav__item" :class="{active: repliesIsActive}" @click="updateSelected('replies')">Recheeps & replies</base-link>
            <base-link mode="secondary-nav__item" :class="{active: likesIsActive}" @click="updateSelected('likes')">Likes</base-link>
        </ul>
    </nav>
    <div v-if="cheepsIsActive">
        <cheep-post v-for="post in userPosts" 
            :key="post.id" 
            :cheepId="post.id"
            :content="post.content" 
            :username="username"
            :handle="handle"
            :icon="icon"
        ></cheep-post>
    </div>
    <div v-if="repliesIsActive">
        <cheep-post v-for="post in recheepedAndReplyPosts"
            :key="post.id" 
            :cheepId="post.id"
            :content="post.content" 
            :username="post.username"
            :handle="post.handle"
            :icon="post.icon"
            :interaction = "post.interaction"
            :interactionUsername = "post.interactionUsername"
        ></cheep-post>
    </div>
    <div v-if="likesIsActive">
        <cheep-post v-for="post in likedPosts"
            :key="post.id"
            :cheepId="post.id"
            :content="post.content"
            :username="post.username"
            :handle="post.handle"
            :icon="post.icon"
        ></cheep-post>
    </div>
</template>

<script>
    import CheepPost from '../components/home/CheepPost.vue'
    export default {
        components: {
            CheepPost
        },
        data() {
            return {
                selected: "",
                cheepsIsActive: false,
                repliesIsActive: false,
                likesIsActive: false,
                userPosts: [],
                username: this.$store.getters.username,
                handle: this.$store.getters.handle,
                icon: this.$store.getters.icon,
                bio: this.$store.getters.bio,
                likedPostIds: [],
                likedPosts: [],
                recheepedPostIds: [],
                recheepedPosts: [],
                replyPostIds: [],
                replyPosts: [],
                replyInfo: [],
                recheepedAndReplyPosts: []
            }
        },
        methods: {
            async updateSelected(selected) {
                this.selected = selected

                this.cheepsIsActive = false
                this.repliesIsActive = false
                this.likesIsActive = false

                if (selected === "cheeps") {
                    this.cheepsIsActive = !this.cheepsIsActive
                } else if (selected === "replies") {
                    this.repliesIsActive = !this.repliesIsActive
                } else if (selected === "likes") {
                    this.likesIsActive = !this.likesIsActive
                }
                await this.getUserPosts()
                await this.getLikedPosts()
                await this.getRecheepedAndReplyPosts()
            },
            async getUserPosts() {
                try {
                    const url = "http://localhost:3333/api/cheep/all/" + this.$store.getters.userId
                    let response = await fetch(url, {
                        method: 'GET',
                        mode: 'cors',
                        headers: {
                            'Authorization': 'Bearer ' + this.$store.getters.token,
                            'Content-Type': 'application/json'
                        },
                    })
                    response = await response.json()
                    this.userPosts = response
                } catch(error) {
                    console.log(error)
                }
            },
            async getLikedPostIds(){
                let response = await fetch("http://localhost:3333/api/like", {
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                        'Authorization': 'Bearer ' + this.$store.getters.token,
                        'Content-Type': 'application/json'
                    }
                })
                response = await response.json()
                response.forEach(likeInstance => {
                    this.likedPostIds.push(likeInstance.cheep_id)
                })
            },
            async getLikedPosts() {
                this.likedPostIds = []
                this.likedPosts = [] 
                await this.getLikedPostIds()               
                let response = await fetch("http://localhost:3333/api/cheep/", {
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                        'Authorization': 'Bearer ' + this.$store.getters.token,
                        'Content-Type': 'application/json'
                    }
                })
                response = await response.json()
                response.forEach(post => {
                    if (this.likedPostIds.includes(post.id)) {
                        this.likedPosts.push(post)
                    }
                })
            },
            async getRecheepedPostIds() {
                let response = await fetch("http://localhost:3333/api/recheep", {
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                        'Authorization': 'Bearer ' + this.$store.getters.token,
                        'Content-Type': 'application/json'
                    }
                })
                response = await response.json()
                response.forEach(recheepInstance => {
                    this.recheepedPostIds.push(recheepInstance.cheep_id)
                })
            },
            async getRecheepedPosts() {
                this.recheepedPostIds = []
                this.recheepedPosts = []
                await this.getRecheepedPostIds()
                let response = await fetch("http://localhost:3333/api/cheep", {
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                        'Authorization': 'Bearer ' + this.$store.getters.token,
                        'Content-Type': 'application/json'
                    }
                })
                response = await response.json()
                response.forEach(post => {
                    if (this.recheepedPostIds.includes(post.id)) {
                        post["interaction"] = "recheep"
                        this.recheepedPosts.push(post)
                    }
                })
            },
            async getReplyPostIds() {
                let response = await fetch("http://localhost:3333/api/reply", {
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                        'Authorization': 'Bearer ' + this.$store.getters.token,
                        'Content-Type': 'application/json'
                    }
                })
                response = await response.json()
                response.forEach(replyInstance => {
                    this.replyPostIds.push(replyInstance.cheep_id)
                })
            },
            async getReplyPosts() {
                this.replyPostIds = []
                this.replyPosts = []
                await this.getReplyPostIds()
                let response = await fetch("http://localhost:3333/api/cheep", {
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                        'Authorization': 'Bearer ' + this.$store.getters.token,
                        'Content-Type': 'application/json'
                    }
                })
                response = await response.json()
                const postsLength = response.length
                
                for (let i = 0; i < postsLength; i++) {
                    if (this.replyPostIds.includes(response[i].id)) {
                        const post = response[i]
                        post["interaction"] = "reply"
                        const interactionUsername = await this.getParentUsername(post.id)
                        post["interactionUsername"] = interactionUsername
                        this.replyPosts.push(post)
                    }
                }
            },
            async getParentId(id) {
                const replyInfo = []
                let response  = await fetch("http://localhost:3333/api/reply", {
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                        'Authorization': 'Bearer ' + this.$store.getters.token,
                        'Content-Type': 'application/json'
                    }
                })
                response = await response.json()
                response.forEach(replyInstance => {
                    replyInfo.push(replyInstance)
                })

                const replyInfoLength = replyInfo.length
                let parentCheepId = null
                for (let i = 0; i < replyInfoLength; i++) {
                    if (replyInfo[i].cheep_id === id) {
                        parentCheepId = replyInfo[i].reply_to
                    }
                }
                return parentCheepId
            },
            async getParentUsername(id) {
                const parentId = await this.getParentId(id)
                let parentCheep = await fetch("http://localhost:3333/api/cheep/" + parentId, {
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                        'Authorization': 'Bearer ' + this.$store.getters.token,
                        'Content-Type': 'application/json'
                    }
                })
                parentCheep = await parentCheep.json()
                return parentCheep[0].username
            },
            async getRecheepedAndReplyPosts() {
                await this.getRecheepedPosts()
                await this.getReplyPosts()
                this.recheepedAndReplyPosts = this.recheepedPosts.concat(this.replyPosts)
                this.recheepedAndReplyPosts.sort((a, b) => {
                    return (a.created_at < b.created_at) ? -1 : ((a.created_at > b.created_at) ? 1 : 0)
                })
            },
        },
        created() {
            this.getUserPosts()
            this.getLikedPosts()
        }
    }
</script>

<style scoped>
.profile__wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.8rem 0rem;
}
.profile__pic {
    /* background-image: url("../assets/icon.svg"); */
    width: 7rem;
    height: 7rem;
    border: 2px solid var(--neutral-600);
    border-radius: 50%;
}
.profile__username {
    font-weight: 700;
}
.profile__handle,
.profile__age,
.profile__follow-info {
    font-size: 0.8rem;
    color: var(--neutral-600);
}
.profile__follow-info {
    display: flex;
    gap: 1rem;
    cursor: pointer;
}
.profile__bio {
    padding: 1rem 0rem;
}
.profile__following:hover,
.profile__followers:hover {
    text-decoration: underline;
}
.secondary-nav__list {
    display: flex;
    justify-content: space-between;
    list-style-type: none;
}
.active {
    border-bottom: 5px solid var(--neutral-600);
    font-weight: 700
}
</style>