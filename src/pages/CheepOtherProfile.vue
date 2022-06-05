<template>
    <header class="header">
        <div @click="goBack" class="header__back"></div>
        <div class="header__title">{{ userInfo.username}}</div>
    </header>
    <section class="profile">
        <div class="profile__wrapper">
            <img :src="userInfo.icon" class="profile__pic"/>
            <base-button mode="primary">Follow</base-button>
        </div>
        <div class="profile__username">{{ userInfo.username }}</div>
        <div class="profile__handle">{{ userInfo.handle }}</div>
        <div class="profile__bio">{{ userInfo.bio }}</div>
        <div class="profile__age">Joined May 2022</div>
        <div class="profile__follow info">
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
            :username="post.username"
            :handle="post.handle"
            :icon="post.icon"
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
        props: ['handle'],
        data() {
            return {
                selected: "",
                cheepsIsActive: false,
                repliesIsActive: false,
                likesIsActive: false,
                userInfo: {},
                userPosts: [],
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
                // await this.getRecheepedAndReplyPosts()
            },
            async getUserInfo() {
                try {
                    let response = await fetch("http://localhost:3333/api/user/" + this.handle, {
                        method: 'GET',
                        mode: 'cors',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    response = await response.json()
                    this.userInfo = response[0]
                    console.log(this.userInfo)
                } catch(error) {
                    console.log(error)
                }
            },
            async getUserPosts() {
                try {
                    const url = "http://localhost:3333/api/cheep/all/" + this.userInfo.id
                    let response = await fetch(url, {
                        method: 'GET',
                        mode: 'cors',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    response = await response.json()
                    this.userPosts = response
                    console.log(this.userPosts)
                } catch(error) {
                    console.log(error)
                }
            },
            async getLikedPostIds() {
                try {
                    const url = "http://localhost:3333/api/like/" + this.userInfo.id
                    let response = await fetch(url, {
                        method: 'GET',
                        mode: 'cors',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    response = await response.json()
                    response.forEach(likeInstance => {
                        this.likedPostIds.push(likeInstance.cheep_id)
                    })
                } catch(error) {
                    console.log(error)
                }
            },
            async getLikedPosts() {
                try {
                    this.likedPostIds = []
                    this.likedPosts = []
                    await this.getLikedPostIds()
                    let response = await fetch("http://localhost:3333/api/cheep/", {
                        method: 'GET',
                        mode: 'cors',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    response = await response.json()
                    response.forEach(post => {
                        if(this.likedPostIds.includes(post.id)) {
                            this.likedPosts.push(post)
                        }
                    })
                } catch(error) {
                    console.log(error)
                }
                
            },
            goBack() {
                this.$router.go(-1)
            }
        },
        created() {
            this.getUserInfo()
            this.getUserPosts()
            this.getLikedPosts()
        }
    }

</script>

<style scoped>
.header__back {
    background-image: url("../assets/back.svg");
    background-size: cover;
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
}
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