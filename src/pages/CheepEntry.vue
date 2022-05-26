<template>
    <div class="entry">
        <section class="entry__image"></section>
        <section class="entry__options">
            <div class="entry__logo"></div>
            <div class="entry__header">Happening now</div>
            <div class="entry__subheader">Join Cheep today.</div>
            <div class="entry__actions">
                <base-button @click="updateSignUpModalDisplay" mode="primary">Sign up with email</base-button>
                <div class="entry__login">
                    <div class="entry__login-header">Already have an account?</div>
                    <base-button @click="updateSignInModalDisplay" mode="primary">Sign in</base-button>
                </div>
            </div>
        </section>
    </div>
    <base-modal v-if="isSignUpModalDisplayed">
        <div class="modal__main">
            <div class="modal__logo"></div>
            <form @submit.prevent="signUp" class="modal__signup">
                <div class="modal__header">Create your account</div>
                <input type="text" id="username" placeholder="User Name" v-model="username" required/>
                <input type="text" id="handle" placeholder="@handle" v-model="handle" required/>
                <input type="text" id="email" placeholder="Email" v-model="email" required/>
                <input type="text" id="password" placeholder="Password" v-model="password" required/>
                <textarea id="bio" placeholder="Profile Bio" v-model="bio" requireds></textarea>
                <base-button type="submit" mode="primary">Create Account</base-button>
            </form>
        </div>
        <div @click="updateSignUpModalDisplay" class="modal__close"></div>
    </base-modal>
    <base-modal v-if="isSignInModalDisplayed">
        <div class="modal__main">
            <div class="modal__logo"></div>
            <form @submit.prevent="signIn" class="modal__signup">
                <div class="modal__header">Sign in to Cheep</div>
                <input type="text" id="email" placeholder="Email" v-model="email" required/>
                <input type="text" id="password" placeholder="Password" v-model="password" required/>
                <base-button type="submit" mode="primary">Sign In</base-button>
            </form>
        </div>
        <div @click="updateSignInModalDisplay" class="modal__close"></div>
    </base-modal>
</template>

<script>
    export default {
        data() {
            return {
                isSignUpModalDisplayed: false,
                isSignInModalDisplayed: false,
                username: "",
                handle: "",
                email: "",
                password: "",
                bio: "",
                uwuBio: ""
            }
        },
        methods: {
            updateSignUpModalDisplay() {
                this.isSignUpModalDisplayed = !this.isSignUpModalDisplayed
            },
            updateSignInModalDisplay() {
                this.isSignInModalDisplayed = !this.isSignInModalDisplayed
            },
            async updateBio() {
                try {
                    let uwufiedBio = await fetch("https://uwuaas.herokuapp.com/api/", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            text: this.bio
                        })
                    })
                    const response = await uwufiedBio.json()
                    this.uwuBio = response.text
                } catch(error) {
                    console.log(error)
                }
            },
            updateLocalStorage() {
                localStorage.setItem('userid', this.$store.getters.userid)
                localStorage.setItem('token', this.$store.getters.token)
                localStorage.setItem('tokenExpiration', this.$store.getters.tokenExpiration)
                localStorage.setItem('isSignedIn', this.$store.getters.isSignedIn)
            },
            async signUp() {
                await this.updateBio()
                this.$store.dispatch('signup', {
                    email: this.email,
                    password: this.password,
                    username: this.username,
                    handle: this.handle,
                    icon: "https://avatars.dicebear.com/api/croodles/" + this.handle + ".svg",
                    bio: this.uwuBio

                })

                this.username = ""
                this.handle = ""
                this.email = ""
                this.password = ""
                this.bio = ""
                this.uwuBio = ""

                this.updateSignUpModalDisplay()
                this.$store.commit('setSignInStatus', {
                    status: true
                })

                this.updateLocalStorage()
                
                this.$router.push('/home')
            },
            async signIn() {
                this.$store.dispatch('signin', {
                    email: this.email,
                    password: this.password
                })

                this.email = "",
                this.password = ""

                this.updateSignInModalDisplay()
                this.$store.commit('setSignInStatus', {
                    status: true
                })

                this.updateLocalStorage()

                this.$router.push('/home')
            }
        }
    }
</script>

<style scoped>
    .entry {
        display: flex;
        width: 100vw;
        height: 100vh
    }
    .entry__image {
        background-image: url("../assets/entry.jpg");
        background-size: cover;
        width: 55%;
    }
    .entry__options {
        padding: 2rem;
    }
    .entry__logo {
        background-image: url("../assets/logo.svg");
        width: 3rem;
        height: 3rem;
        margin: 2rem 0rem;
    }
    .entry__header {
        font-size: 3rem;
        font-weight: 700;
    }
    .entry__subheader {
        font-size: 1.8rem;
    }
    .modal__main,
    .modal__signup {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .modal__logo {
        background-image: url("../assets/logo.svg");
        background-size: cover;
        width: 2rem;
        height: 2rem;
    }
    .modal__header {
        font-weight: 700;
        font-size: 1.5rem;
        padding: 0.5rem 0rem;
    }
    input,
    textarea {
        font: inherit;
        font-size: 1rem;
        padding: 0.2rem;
        margin: 0.5rem 0rem;
        width: 100%;
    }
    textarea {
        resize: none;
    }
    .modal__close {
        background-image: url("../assets/close.svg");
        width: 1rem;
        height: 1rem;
        cursor: pointer;
    }
</style>