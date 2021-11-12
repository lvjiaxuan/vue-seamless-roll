<script setup lang="ts">
import Seamless from './components/Seamless.vue'
</script>

<template>
  <main class="app">
    <seamless :roll-list="['哈哈哈', 'xxxxxxx', 'sadfasdf']" />
  </main>
</template>

<style>
.app {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
