<template>
    <header>
        User
    </header>
    <section class="profile">
        <div class="profile__wrapper">
            <div class="profile__pic"></div>
            <base-button mode="edit">Edit Profile</base-button>    
        </div>
        <div class="profile__username">User</div>
        <div class="profile__handle">@username</div>
        <div class="profile__bio">
            "He who has a why t-to wive fow c-can beaw OwO any (・`ω´・) how."
        </div>
        <div class="profile__age">Joined May 2022</div>
        <div class="profile__follow-info">
            <div class="profile__following">10 following</div>
            <div class="profile__followers">10 followers</div>
        </div>
    </section>
    <nav class="secondary-nav">
        <ul class="secondary-nav__list">
            <base-link mode="secondary-nav__item" :class="{active: cheepsIsActive}" @click="updateSelected('cheeps')">Cheep</base-link>
            <base-link mode="secondary-nav__item" :class="{active: repliesIsActive}" @click="updateSelected('replies')">Cheeps & replies</base-link>
            <base-link mode="secondary-nav__item" :class="{active: likesIsActive}" @click="updateSelected('likes')">Likes</base-link>
        </ul>
    </nav>
    <section class="profile__cheeps" v-if="cheepsIsActive">Profile Cheeps</section>
    <section class="profile__replies" v-if="repliesIsActive">Profile Replies</section>
    <section class="profile__likes" v-if="likesIsActive">Profile Likes</section>
</template>

<script>
    export default {
        data() {
            return {
                selected: "",
                cheepsIsActive: false,
                repliesIsActive: false,
                likesIsActive: false,
            }
        },
        methods: {
            updateSelected(selected) {
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
            }
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
    background-image: url("../assets/icon.svg");
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