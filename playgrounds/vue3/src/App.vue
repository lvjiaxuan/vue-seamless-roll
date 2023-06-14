<script lang="ts" setup>
import seamless from 'vue-seamless-roll'
import { version } from 'vue'
// import Seamless from './../../../src'
// import './../../../dist/index.css'
</script>

<template>
  <seamless :roll-list="['哈哈哈😀', 'sadfasdf', 123]" />

  <p text-center>
    Vue version: {{ version }}
  </p>

  <p text-center>
    <a
      href="https://lvjiaxuan.github.io/vue-seamless-roll/vue2"
      target="_blank"
      rel="noopener noreferrer"
      decoration-none
      italic
    >
      vue2 version
    </a>
  </p>
</template>
