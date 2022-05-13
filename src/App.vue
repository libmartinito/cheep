<template>
  <the-sidebar></the-sidebar>
  <router-view></router-view>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --neutral-50: #fafafa;
  --neutral-100: #f5f5f5;
  --neutral-200: #e5e5e5;
  --neutral-700: #404040;
  --neutral-800: #262626;
  --neutral-900: #171717;
  font-size: 18px;
  box-sizing: inherit;
}

#app {
  background-color: var(--neutral-50);
  color: var(--neutral-700);
}
</style>
