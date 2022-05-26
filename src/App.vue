<template>
  <cheep-entry v-if="!isSignedIn"></cheep-entry>
  <div class="feed-wrapper" v-else>
    <the-sidebar></the-sidebar>
    <section class="feed">
      <router-view></router-view>
    </section>
  </div>
</template>

<script>
  import CheepEntry from './pages/CheepEntry.vue'

  export default {
    components: {
      CheepEntry
    },
    computed: {
      isSignedIn() {
        return this.$store.getters.isSignedIn
      }
    },
    beforeCreate() {
      this.$store.dispatch('loadFromLocalStorage')
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
