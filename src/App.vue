<template>
  <!-- <cheep-entry v-if="isSignedIn"></cheep-entry> -->
  <div class="feed-wrapper">
    <the-sidebar v-if="isSignedIn"></the-sidebar>
    <section :class="{feed: isSignedIn}">
      <router-view v-slot="{Component, route}">
        <component :is="Component" :key="route.path"/>
      </router-view>
    </section>
  </div>
</template>

<script>
// import CheepEntry from './pages/CheepEntry.vue'

  export default {
    // components: {
    //   CheepEntry
    // },
    computed: {
      isSignedIn() {
        return this.$store.getters.isSignedIn
      }
    },
    beforeCreate() {  
      const userId = localStorage.getItem('userid')
      const token = localStorage.getItem('token')
      const tokenExpiration = localStorage.getItem('tokenExpiration')
      const isSignedIn = localStorage.getItem('isSignedIn')
      const username = localStorage.getItem('username')
      const handle = localStorage.getItem('handle')
      const icon = localStorage.getItem('icon')
      const bio = localStorage.getItem('bio')

      if (userId && token && tokenExpiration) {
        this.$store.commit('setUser', {
          userId: userId,
          token: token,
          tokenExpiration: tokenExpiration,
          username: username,
          handle: handle,
          icon: icon,
          bio: bio
        })
        this.$store.commit('setSignInStatus', {
          status: isSignedIn
        })
      }
    }
  }
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --neutral-50: #fafafa;
  --neutral-100: #f5f5f5;
  --neutral-200: #e5e5e5;
  --neutral-300: rgba(212, 212, 212, 0.5);
  --neutral-600: #525252;
  --neutral-700: #404040;
  --neutral-800: #262626;
  --neutral-900: #171717;
  font-size: 24px;
  font-family: 'Inter', sans-serif;
  box-sizing: inherit;
}

#app {
  background-color: var(--neutral-50);
  color: var(--neutral-800);
}

.feed-wrapper {
  display: flex;
  justify-content: center;
}

.feed {
  width: 600px;
}
</style>
