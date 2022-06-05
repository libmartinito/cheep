<template>
    <header class="header">
        <div @click="goBack" class="header__back"></div>
        <div class="header__title">Cheep</div>
    </header>
    <cheep-post
        :key="parentCheep.id"
        :userId="parentCheep.user_id"
        :cheepId="parentCheep.id"
        :content="parentCheep.content"
        :username="parentCheep.username"
        :handle="parentCheep.handle"
        :icon="parentCheep.icon"
    ></cheep-post>
    <cheep-post v-for="reply in replies"
        :key="reply.id"
        :userId="reply.user_id"
        :cheepId="reply.id"
        :content="reply.content"
        :username="reply.username"
        :handle="reply.handle"
        :icon="reply.icon"
    ></cheep-post>
</template>

<script>
    import CheepPost from '../components/home/CheepPost.vue'

    export default {
        props: ['id'],
        components: {
            CheepPost,
        },
        data() {
            return {
                parentCheep: null,
                replyIds: [],
                replies: []
            }
        },
        methods: {
            async getParentCheep() {
                this.parentCheep = null
                try {
                    let response = await fetch("http://localhost:3333/api/cheep/" + this.id, {
                        method: 'GET',
                        mode: 'cors',
                        headers: {
                            'Authorization': 'Bearer ' + this.$store.getters.token,
                            'Content-Type': 'application/json'
                        }
                    })
                    response = await response.json()
                    this.parentCheep = response[0]
                } catch(error) {
                    console.log(error)
                }                
            },
            async getCheep(cheepid) {
                try {
                    let response = await fetch("http://localhost:3333/api/cheep/" + cheepid, {
                        method: 'GET',
                        mode: 'cors',
                        headers: {
                            'Authorization': 'Bearer ' + this.$store.getters.token,
                            'Content-Type': 'application/json'
                        }
                    })
                    response = await response.json()
                    return response[0]
                } catch(error) {
                    console.log(error)
                }
            },
            async getAllReplies() {
                this.replyIds = []
                this.replies = []
                try {
                    let response = await fetch("http://localhost:3333/api/reply/all/cheep/" + this.id, {
                        method: 'GET',
                        mode: 'cors',
                        headers: {
                            'Authorization': 'Bearer ' + this.$store.getters.token,
                            'Content-Type': 'application/json'
                        }
                    })
                    response = await response.json()
                    response.forEach(instance => {
                        this.replyIds.push(instance.cheep_id)
                    })
                } catch(error) {
                    console.log(error)
                }  
                try {
                    const replyIdsLength = this.replyIds.length
                    for(let i = 0; i < replyIdsLength; i++) {
                        const cheep = await this.getCheep(this.replyIds[i])
                        console.log(cheep)
                        this.replies.push(cheep)
                    }
                    console.log(this.replies)
                } catch(error) {
                    console.log(error)
                }            
            },
            goBack() {
                this.$router.go(-1)
            }
        },
        created() {
            this.getParentCheep()
            this.getAllReplies()
        },
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
</style>