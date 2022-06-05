<template>
    <section @click="goToPost" :class="[{hidden: isHidden}, 'post']">        
        <div class="post__interaction">{{ cheepInteraction }}</div>
        <div class="post__main">
            <!-- <div class="post__icon"></div> -->
            <img :src="icon" class="post__icon"/>
            <div class="post__content">
                <div class="post__header">
                    <div class="post__userinfo">
                        <div @click.stop="goToProfile" class="post__username">{{ username }}</div>
                        <div class="post__handle">{{ handle }}</div>
                        <div class="post__age">10h</div>
                    </div>
                    <div @click.stop="updateIsOptionsClicked" class="post__options" v-if="!isOptionsClicked">&#183;&#183;&#183;</div>
                    <div @click.stop="deleteCheep" class="post__options-action" v-else>Delete</div>
                </div>
                <div class="post__body">
                    {{ content }}
                </div>
                <div class="post__actions">
                    <div @click.stop="updateIsReplyClicked" class="post__reply">
                        <div class="post__reply-icon"></div>
                        <div class="post__reply-counter">{{ replyCount }}</div>
                    </div>
                    <div @click.stop="recheep" :class="[{post__actionsActive: isRecheepActive}, 'post__recheep']">
                        <div class="post__recheep-icon"></div>
                        <div class="post__recheep-counter">{{ recheepCount }}</div>
                    </div>
                    <div @click.stop="like" :class="[{post__actionsActive: isReactActive}, 'post__react']">
                        <div class="post__react-icon"></div>
                        <div class="post__react-counter">{{ likeCount }}</div>
                    </div>
                </div>  
            </div>                                  
            
        </div>
    </section>
    <Teleport to="#app">
        <base-modal v-if="isReplyClicked">
            <div class="modal__main">
                <div class="post__main">
                    <img :src="icon" class="post__icon"/>
                    <div class="post__content">
                        <div class="post__header">
                            <div class="post__username">{{ username }}</div>
                            <div class="post__handle">{{ handle }}</div>
                        </div>
                        <div class="post__body">
                            {{ content }}
                        </div>
                    </div>
                </div>
                <div class="post__main">
                    <img :src="this.$store.getters.icon" class="post__icon"/>
                    <div class="post__content">
                        <form @submit.prevent="reply" class="modal__reply">
                            <textarea id="reply" class="modal__input-text" placeholder="Add another cheep" v-model="replyContent" required></textarea>
                            <base-button type="submit" mode="primary">Cheep</base-button>
                        </form> 
                    </div>
                </div>
               
            </div>
            <div @click="updateIsReplyClicked" class="modal__close"></div>
        </base-modal>
    </Teleport>
</template>

<script>
    export default {
        props: ["cheepId", "icon", "username", "handle", "content", "interaction", "interactionUsername", "handleProp", "userInfo"],
        data() {
            return {
                isReactActive: false,
                isRecheepActive: false,
                isReplyClicked: false,
                isOptionsClicked: false,
                isHidden: false,
                likeId: null,
                likeCount: null,
                recheepId: null,
                recheepCount: null,
                replyContent: "",
                replyCount: null,
            }
        },
        computed: {
            cheepInteraction() {
                if (this.interaction === "recheep") {
                    if (!this.handleProp) {
                        return "You recheeped this"
                    } else {
                        return `${this.userInfo.username} recheeped this`
                    }                    
                } else if (this.interaction === "reply") {
                    if (!this.handleProp) {
                        return `You replied to ${this.interactionUsername}`
                    } else {
                        return `${this.userInfo.username} replied to ${this.interactionUsername}`
                    }
                }
                return null
            }
        },
        methods: {
            updateIsReactActive() {
                this.isReactActive = !this.isReactActive
            },
            updateIsRecheepActive() {
                this.isRecheepActive = !this.isRecheepActive
            },
            updateIsReplyClicked() {
                this.isReplyClicked = !this.isReplyClicked
            },
            updateIsOptionsClicked() {
                this.isOptionsClicked = !this.isOptionsClicked
            },
            updateIsHidden() {
                this.isHidden = !this.isHidden
            },
            goToPost() {                
                this.$router.push("/cheep/" + this.cheepId)
            },
            goToProfile() {
                const authenticatedHandle = this.$store.getters.handle
                if (this.handle === authenticatedHandle) {
                    return
                }
                this.$router.push("/user/" + this.handle)
            },
            async like() {
                if (!this.isReactActive) {
                    this.updateIsReactActive()
                    try {
                        let response = await fetch("http://localhost:3333/api/like", {
                            method: 'POST',
                            mode: 'cors',
                            headers: {
                                'Authorization': 'Bearer ' + this.$store.getters.token,
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                userid: this.$store.getters.userId,
                                cheepid: this.cheepId
                            })
                        })
                        response = await response.json()
                        this.likeId = response.id
                    } catch(error) {
                        console.log(error)
                    }                
                } else {
                    this.updateIsReactActive()
                    try {
                        await fetch("http://localhost:3333/api/like/" + this.likeId, {
                            method: 'DELETE',
                            mode: 'cors',
                            headers: {
                                'Authorization': 'Bearer ' + this.$store.getters.token,
                                'Content-Type': 'application/json'
                            }
                        })
                    } catch(error) {
                        console.log(error)
                    }
                }     
                this.updateLikeCount()           
            },
            async recheep() {
                if (!this.isRecheepActive) {
                    this.updateIsRecheepActive()
                    try {
                        let response = await fetch("http://localhost:3333/api/recheep", {
                            method: 'POST',
                            mode: 'cors',
                            headers: {
                                'Authorization': 'Bearer ' + this.$store.getters.token,
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                userid: this.$store.getters.userId,
                                cheepid: this.cheepId
                            })
                        })
                        response = await response.json()
                        this.recheepId = response.id
                    } catch(error) {
                        console.log(error)
                    } 
                } else {
                    this.updateIsRecheepActive()
                    try {
                        await fetch("http://localhost:3333/api/recheep/" + this.recheepId, {
                            method: 'DELETE',
                            mode: 'cors',
                            headers: {
                                'Authorization': 'Bearer ' + this.$store.getters.token,
                                'Content-Type': 'application/json'
                            }
                        })
                    } catch(error) {
                        console.log(error)
                    }
                }
                this.updateRecheepCount()
            },
            async reply() {
                try {
                    let response = await fetch("http://localhost:3333/api/cheep", {
                        method: 'POST', 
                        mode: 'cors',
                        headers: {
                            'Authorization': 'Bearer ' + this.$store.getters.token,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            user_id: this.$store.getters.userId,
                            content: this.replyContent
                        })
                    })
                    response = await response.json()
                    console.log(response)

                    await fetch("http://localhost:3333/api/reply", {
                        method: 'POST',
                        mode: 'cors',
                        headers: {
                            'Authorization': 'Bearer ' + this.$store.getters.token,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            userid: this.$store.getters.userId,
                            cheepid: response.id,
                            parentcheepid: this.cheepId,                            
                        })
                    })                                        
                } catch(error) {
                    console.log(error)
                }
                this.replyContent = ""
                this.updateIsReplyClicked()
                this.updateReplyCount()
            },
            async updateIfPostIsLiked() {
                let response = await fetch("http://localhost:3333/api/like/all/", {
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                        'Authorization': 'Bearer ' + this.$store.getters.token,
                        'Content-Type': 'application/json'
                    }
                })
                response = await response.json()
                response.forEach(likeInstance => {
                    if (likeInstance.cheep_id === this.cheepId) {
                        this.updateIsReactActive()
                        this.likeId = likeInstance.id
                    }
                })
            },
            async updateLikeCount() {
                let response = await fetch("http://localhost:3333/api/like/count/" + this.cheepId, {
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                        'Authorization': 'Bearer ' + this.$store.getters.token,
                        'Content-Type': 'application/json'
                    }
                })
                response = await response.json()
                this.likeCount = response[0].total            
            },
            async updateIfPostIsRecheeped() {
                let response = await fetch("http://localhost:3333/api/recheep/all", {
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                        'Authorization': 'Bearer ' + this.$store.getters.token,
                        'Content-Type': 'application/json'
                    }
                })
                response = await response.json()
                response.forEach(recheepInstance => {
                    if (recheepInstance.cheep_id === this.cheepId) {
                        this.updateIsRecheepActive()
                        this.recheepId = recheepInstance.id
                    }
                })
            },
            async updateRecheepCount() {
                let response = await fetch("http://localhost:3333/api/recheep/count/" + this.cheepId, {
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                        'Authorization': 'Bearer ' + this.$store.getters.token,
                        'Content-Type': 'application/json'
                    }
                })
                response = await response.json()
                this.recheepCount = response[0].total
            },
            async updateReplyCount() {
                let response = await fetch("http://localhost:3333/api/reply/count/" + this.cheepId, {
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                        'Authorization': 'Bearer ' + this.$store.getters.token,
                        'Content-Type': 'application/json'
                    }
                })
                response = await response.json()
                this.replyCount = response[0].total
            },
            async deleteCheep() {
                if (this.handle === this.$store.getters.handle) {
                    this.updateIsHidden()
                }              
                await fetch("http://localhost:3333/api/cheep/" + this.cheepId, {
                    method: 'DELETE',
                    mode: 'cors',
                    headers: {
                        'Authorization': 'Bearer ' + this.$store.getters.token,
                        'Content-Type': 'application/json'
                    }
                })
                await fetch("http://localhost:3333/api/reply/" + this.cheepId, {
                    method: 'DELETE',
                    mode: 'cors',
                    headers: {
                        'Authorization': 'Bearer ' + this.$store.getters.token,
                        'Content-Type': 'application/json'
                    }
                })
            },
        },
        created() {
            this.updateIfPostIsLiked()
            this.updateLikeCount()
            this.updateIfPostIsRecheeped()
            this.updateRecheepCount()
            this.updateReplyCount()            
        }
    }
</script>

<style soped>
.post{
    padding: 1rem 0rem;
    border-bottom: 1px solid var(--neutral-200);
    cursor: pointer;
}
.post:hover {
    background-color: var(--neutral-100);
}
.post__interaction {
    margin-left: 4rem;
    font-size: 0.8rem;
    font-weight: 700;
    color: var(--neutral-600);
    cursor: pointer;
}
.post__interaction:hover {
    text-decoration: underline;
}
.post__main {
    display: flex;
}
.post__icon {
    /* background-image: url('../../assets/icon2.svg'); */
    background-size: contain;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    border: 2px solid var(--neutral-600);
    cursor: pointer;
}
.post__content {
    width: calc(100% - 3rem - 1rem);
    padding: 0rem 1rem;
}
.post__header,
.post__actions,
.post__userinfo {
    display: flex;
}
.post__header {
    justify-content: space-between;
}
.post__userinfo {
    gap: 0.2rem;
}
.post__username {
    font-weight: 700;
    cursor: pointer;
}
.post__username:hover {
    text-decoration: underline;
}
.post__handle,
.post__age {
    color: var(--neutral-600);
}
.post__actions {
    gap: 6rem;
    margin: 0.5rem 0rem;
}
.post__actionsActive {
    background-color: var(--neutral-300);
    border-radius: 5px;
}
.post__reply,
.post__recheep,
.post__react {
    display: flex;
    gap: 0.1rem;
    cursor: pointer;
}
.post__reply-counter,
.post__recheep-counter,
.post__react-counter {
    font-size: 0.8rem;
    color: var(--neutral-600);
}
.post__reply:hover .post__reply-icon,
.post__recheep:hover .post__recheep-icon,
.post__react:hover .post__react-icon {
    background-color: var(--neutral-200);
    border-radius: 5px;
}
.post__reply:hover .post__reply-counter,
.post__recheep:hover .post__recheep-counter,
.post__react:hover .post__react-counter {
    color: var(--neutral-800);
}
.post__reply-icon {
    background-image: url('../../assets/reply.svg');
    background-size: contain;
    width: 1rem;
    height: 1rem;
}
.post__recheep-icon {
    background-image: url('../../assets/recheep.svg');
    background-size: contain;
    width: 1rem;
    height: 1rem;
}
.post__react-icon {
    background-image: url('../../assets/react.svg');
    background-size: contain;
    width: 1rem;
    height: 1rem;
}
.post__options {
    cursor: pointer;
    border-radius: 5px;
    width: 1rem;
    height: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
}
.post__options:hover {
    background-color: var(--neutral-200);  
}
.post__options-action {
    cursor: pointer;
    border-radius: 5px;
    padding: 0rem 0.2rem; 
}
.post__options-action:hover {
    background-color: var(--neutral-200);
}
.modal__main {
    width: 600px;
    display: flex;
    flex-direction: column;
    gap: 2rem;
}
.modal__input-text {
    width: 19rem;
    height: 7rem;
    font: inherit;
    background-color: var(--neutral-50);
    border: none;
    outline: none;
}
.modal__reply {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}
.modal__close {
    background-image: url("../../assets/close.svg");
    width: 1rem;
    height: 1rem;
    cursor: pointer;
}
.hidden {
    display: none;
}
</style>