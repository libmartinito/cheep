<template>
    <section class="searchResult">
        <img class="searchResult__icon" :src="icon"/>
        <div class="searchResult__content">
            <div class="searchResult__header">
                <div class="searchResult__identifier">
                    <div @click.stop="goToProfile" class="searchResult__username">{{ username }}</div>
                    <div class="searchResult__handle">{{ handle }}</div>
                </div>
                <base-button @click="followUser" mode="secondary" v-if="!this.isProfileFollowed">Follow</base-button>
                <base-button @click="unfollowUser" mode="secondary" v-else>Following</base-button>
            </div>
            <div class="searchResult__bio">{{ bio }}</div>
        </div>
    </section>
</template>

<script>
    export default {
        props: ["username", "handle", "icon", "bio"],
        data() {
            return {
                isProfileFollowed: false,
                userConnection: null,
                userInfo: {},
                userId: null
            }
        },
        methods: {
            goToProfile() {
                this.$router.push("/user/" + this.handle)
            },
            updateIsProfileFollowed() {
                this.isProfileFollowed = !this.isProfileFollowed
            },
            async getUserInfo() {
                try {
                    let response = await fetch("http://localhost:3333/api/user/" + this.handle, {
                        method: 'GET',
                        mode: 'cors',
                        headers: { 
                            'Authorization': 'Bearer ' + this.$store.getters.token,
                            'Content-Type': 'application/json'
                        }
                    })
                    response = await response.json()
                    this.userInfo = response[0]
                    console.log(response)
                } catch(error) {
                    console.log(error)
                }
            },
            async updateUserInfo() {
                await this.getUserInfo()
                this.userId = this.userInfo.id
            },
            async updateIfUserIsFollowed() {
                try {
                    await this.updateUserInfo()
                    let response = await fetch("http://localhost:3333/api/connection", {
                        method: 'GET',
                        mode: 'cors',
                        headers: {
                            'Authorization': 'Bearer ' + this.$store.getters.token,
                            'Content-Type': 'application/json'
                        }
                    })
                    response = await response.json()
                    response.forEach(connection => {
                        if (this.$store.getters.userId === connection.user_id && this.userId === connection.isfollowing_id) {
                            this.updateIsProfileFollowed()
                            this.userConnection = connection
                        }
                    })
                } catch(error) {
                    console.log(error)
                }
            },
            async followUser() {
                try {
                    await fetch("http://localhost:3333/api/connection", {
                        method: 'POST',
                        mode: 'cors',
                        headers: {
                            'Authorization': 'Bearer ' + this.$store.getters.token,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            user_id: this.$store.getters.userId,
                            isfollowing_id: this.userId
                        })
                    })
                    this.isProfileFollowed = true
                } catch(error) {
                    console.log(error)
                }
            },
            async unfollowUser() {
                try {
                    await fetch("http://localhost:3333/api/connection/" + this.userConnection.id, {
                        method: 'DELETE',
                        mode: 'cors',
                        headers: {
                            'Authorization': 'Bearer ' + this.$store.getters.token,
                            'Content-Type': 'application/json'
                        }
                    })
                    this.isProfileFollowed = false
                } catch(error) {
                    console.log(error)
                }
            },
        },
        created() {
            this.updateIfUserIsFollowed()
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