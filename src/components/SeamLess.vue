<script setup lang="ts">
import { ref, watch, computed } from 'vue'
/**
 * props
 */
const props = withDefaults(
  defineProps<{
    rollList: number[] | string[]
  }>(),
  {
    rollList: () => [1, 2, 3],
  }
)

/**
 * data
 */
const ulRef = ref<Element>()
const ulStyle = ref<{ [k: string]: string }>({
  // top: 0,
  // transition: 'top 1s',
})

/**
 * computed
 */
const itemHeight = computed(() => {
  if (!ulRef.value || !props.rollList.length) {
    return 0
  }
  return ulRef.value.clientHeight / props.rollList.length
})

const keyframesStr = computed(() => {
  if (!ulRef.value || !itemHeight.value) {
    return ''
  }

  // const step = 100 / props.rollList.length

  const retObj: { [k: string]: { ['from']: { ['transform']: string }; ['to']: { ['transform']: string } } } = {}
  let str = ''
  for (let i = 1, n = props.rollList.length; i < n; i++) {
    str += `@keyframes#sp#roll-${i} {
      from {
        transform: translateY(${-(i - 1) * itemHeight.value}px);
      }
      to {
        transform: translateY(${-i * itemHeight.value}px);
      }
    }`
  }
  return str.replace(/[\s\r\n]/g, '').replace(/#sp#/g, ' ')
})

/**
 * watch
 */
const stopFun = watch(keyframesStr, newValue => {
  if (newValue) {
    stopFun()
    addKeyframes(newValue)
    ulStyle.value['animation-name'] = 'roll-1'
  }
})

/**
 * methods
 */
const animationstart = () => {
  console.log('start')
}

const animationend = () => {
  console.log('end')
}

const addKeyframes = (runkeyframes: string) => {
  const style = document.createElement('style')
  style.type = 'text/css'
  style.innerHTML = runkeyframes
  document.getElementsByTagName('head')[0].appendChild(style)
}
</script>

<template>
  <section class="app-seamless" :style="{ height: itemHeight + 'px' }">
    <ul ref="ulRef" :style="ulStyle" @animationstart="animationstart" @animationend="animationend">
      <li v-for="text in rollList" :key="text">{{ text }}</li>
    </ul>
  </section>
</template>

<style lang="scss">
.app-seamless {
  position: relative;
  border: 1px solid red;
  // overflow: hidden;

  & > ul,
  & > li {
    margin: 0;
    padding: 0;
  }

  & > ul {
    list-style: none;
    position: absolute;
    left: 0;
    top: 0;
    border: 1px solid blue;
    // animation-name: roll-a;
    animation-duration: 3s;
    animation-timing-function: linear;
    animation-delay: 0s;
    animation-iteration-count: infinite; // infinite
    animation-direction: normal; // alternate
    animation-fill-mode: forwards;
    // animation-play-state: running;

    & > li {
      border: 1px solid green;
    }
  }
}

// @keyframes roll-a {
//   from {
//     transform: translateY(0);
//   }

//   to {
//     transform: translateY(-23px);
//   }
// }
// @keyframes roll-b {
//   from {
//     transform: translateY(-23px);
//   }

//   to {
//     transform: translateY(-46px);
//   }
// }
// @keyframes roll-c {
//   from {
//     transform: translateY(-46px);
//   }

//   to {
//     transform: translateY(-69px);
//   }
// }
</style>
