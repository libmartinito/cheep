<template>
    <section class="sidebar">
        <div>
            <img src="../../assets/logo.svg" class="logo">
            <nav class="main-nav">
                <ul class="main-nav__list">
                    <base-link @click="updateSelected('home')" mode="main-nav__item">
                        <div :class="[home, 'icon']"></div>
                        <div :class="{active: homeIsActive}">Home</div>
                    </base-link>
                    <base-link @click="updateSelected('explore')" mode="main-nav__item">                    
                        <div :class="[explore, 'icon']"></div>
                        <div :class="{active: exploreIsActive}">Explore</div>                    
                    </base-link>
                    <base-link @click="updateSelected('notifications')" mode="main-nav__item">                    
                        <div :class="[notifications, 'icon']"></div>
                        <div :class="{active: notifIsActive}">Notifications</div>
                    </base-link>
                    <base-link @click="updateSelected('messages')" mode="main-nav__item">                                      
                        <div :class="[messages, 'icon']"></div>
                        <div :class="{active: messageIsActive}">Messages</div>
                    </base-link>
                    <base-link @click="updateSelected('profile')" mode="main-nav__item">              
                        <div :class="[profile, 'icon']"></div>
                        <div :class="{active: profileIsActive}">Profile</div>
                    </base-link>
                </ul>
            </nav>
            <base-button mode="primary">Cheep</base-button>
        </div>
        <base-link @click="signOut" mode="main-nav__item">Sign Out</base-link>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                selected: "",
                homeIsActive: false,
                exploreIsActive: false,
                notifIsActive: false,
                messageIsActive: false,
                profileIsActive: false,
            }
        },
        computed: {
            home() {
                if (this.selected === "home") {
                    return "home-selected"
                }
                return "home"
            },
            explore() {
                if (this.selected === "explore") {
                    return "explore-selected"
                }
                return "explore"
            },
            notifications() {
                if (this.selected === "notifications") {
                    return "notifications-selected"
                }
                return "notifications"
            },
            messages() {
                if (this.selected === "messages") {
                    return "messages-selected"
                }
                return "messages"
            },
            profile() {
                if (this.selected === "profile") {
                    return "profile-selected"
                }
                return "profile"
            }
        },
        methods: {
            updateSelected(selected) {
                this.selected = selected

                this.homeIsActive = false
                this.exploreIsActive = false
                this.notifIsActive = false
                this.messageIsActive = false
                this.profileIsActive = false

                if (selected === "home") {
                    this.homeIsActive = !this.homeIsActive
                } else if (selected === "explore") {
                    this.exploreIsActive = !this.exploreIsActive
                } else if (selected === "notifications") {
                    this.notifIsActive = !this.notifIsActive
                } else if (selected === "messages") {
                    this.messageIsActive = !this.messageIsActive
                } else if (selected === "profile") {
                    this.profileIsActive = !this.profileIsActive
                }
                this.$router.push('/' + selected)
            },
            signOut() {
                this.$store.dispatch('signOut')
                this.$router.push('/')
            }
        }
    }
</script>

<style scoped>
    .logo {
        width: 1.5rem;
        height: 1.5rem;
        margin: 1rem;
    }
    .icon {
        width: 1.2rem;
        height: 1.2rem;
        background-size: cover;
    }
    .main-nav__list {
        display: flex;
        flex-direction: column;
        gap: 0.8rem;
        align-items: flex-start;
    }
    .sidebar {
        width: 10rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .active {
        font-weight: 700;
    }
    .home {
        background-image: url('../../assets/home.svg');
    }
    .home-selected {
        background-image: url('../../assets/home-selected.svg');
    }
    .explore {
        background-image: url('../../assets/explore.svg');
    }
    .explore-selected {
        background-image: url('../../assets/explore-selected.svg')
    }
    .notifications {
        background-image: url('../../assets/notifications.svg');
    }
    .notifications-selected {
        background-image: url('../../assets/notifications-selected.svg')
    }
    .messages {
        background-image: url('../../assets/messages.svg');
    }
    .messages-selected {
        background-image: url('../../assets/messages-selected.svg')
    }
    .profile {
        background-image: url('../../assets/profile.svg');
    }
    .profile-selected {
        background-image: url('../../assets/profile-selected.svg')
    }
</style>