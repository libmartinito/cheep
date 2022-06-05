<template>
    <header class="header">
        <div class="header__title">Explore</div>
    </header>
    <form class="explore" @submit.prevent="search">
        <input type="text" class="explore__input" placeholder="Search for someone" v-model="searchInput"/>
    </form>
    <search-result v-for="result in searchResults"
        :key="result.id"
        :username="result.username"
        :handle="result.handle"
        :icon="result.icon"
        :bio="result.bio"
    ></search-result>
</template>

<script>
    import SearchResult from '../components/explore/CheepUserSearchResult.vue'
    export default {
        components: {
            SearchResult
        },
        data() {
            return {
                userHandles: [],
                searchInput: "",
                searchResults: []
            }
        },
        methods: {
            async getAllUserNames() {
                try {
                    let response = await fetch('http://localhost:3333/api/user', {
                        method: 'GET',
                        mode: 'cors',
                        headers: {
                            'Authorization': 'Bearer ' + this.$store.getters.token,
                            'Content-Type': 'application/json'
                        }
                    })
                    response = await response.json()
                    response.forEach(user => {
                        this.userHandles.push(user.handle)
                    })
                } catch(error) {
                    console.log(error)
                }                
            },
            async getUserInfoFromHandle(handle) {
                try {
                    let response = await fetch('http://localhost:3333/api/user/' + handle, {
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
            async search() {
                this.userHandles = []
                this.searchResults = []
                await this.getAllUserNames()
                this.userHandles.forEach(async handle => {
                    const lowerCaseHandle = handle.toLowerCase()
                    const lowerCaseSearchInput = this.searchInput.toLowerCase()
                    if (lowerCaseHandle.includes(lowerCaseSearchInput)) {
                        const userInfo = await this.getUserInfoFromHandle(handle)
                        this.searchResults.push(userInfo)
                    }
                })

            }
        }
    }
</script>

<style scoped>
.header {
    display: flex;
    gap: 0.8rem;
    padding: 0.5rem 0rem;
    align-items: center;
}
.explore__input {
    width: 100%;
    font: inherit;
    border-radius: 3rem;
    padding: 0.3rem 0.8rem;
}
</style>