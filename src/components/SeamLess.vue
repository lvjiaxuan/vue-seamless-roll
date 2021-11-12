<script setup lang="ts">
import { ref, watch, computed, nextTick } from 'vue'
/**
 * props
 */
const props = withDefaults(
  defineProps<{
    rollList: number[] | string[]
    stepTimeout: number | string
  }>(),
  {
    rollList: () => [1, 2],
    stepTimeout: 2000,
  }
)

/**
 * data
 */
const ulRef = ref<Element>()
const ulStyle = ref<{ [k: string]: string }>({
  transition: 'transform 1.5s',
})

/**
 * computed
 */
const rollListRender = computed(() => [...props.rollList, props.rollList[0]])

const itemHeight = computed(() => {
  if (!ulRef.value || !rollListRender.value.length) {
    return 0
  }
  return ulRef.value.clientHeight / rollListRender.value.length
})

// const keyFramesFlag = Date.now()
// const keyframesStr = computed(() => {
//   if (!ulRef.value || !itemHeight.value) {
//     return ''
//   }

//   let str = ''
//   for (let i = 1, n = rollListRender.value.length + 1; i < n; i++) {
//     str += `@keyframes#sp#roll-${keyFramesFlag}-${i} {
//       from {
//         transform: translateY(${-(i - 1) * itemHeight.value}px);
//       }
//       to {
//         transform: translateY(${-i * itemHeight.value}px);
//       }
//     }`
//   }
//   return str.replace(/[\s\r\n]/g, '').replace(/#sp#/g, ' ')
// })

/**
 * watch
 */
// let frameStep = 1
// const stopFun = watch(keyframesStr, newValue => {
//   if (newValue) {
//     stopFun()
//     const style = document.createElement('style')
//     style.type = 'text/css'
//     style.innerHTML = newValue
//     document.getElementsByTagName('head')[0].appendChild(style)
//     ulStyle.value['animation-name'] = `roll-${keyFramesFlag}-${frameStep}`
//   }
// })
let frameStep = 0
const stopWatch = watch(itemHeight, newValue => {
  if (newValue) {
    stopWatch()
    ulStyle.value['transform'] = `translateY(-${frameStep++ * itemHeight.value}px)` // transition initial start
  }
})

/**
 * methods
 */
let lastTransitionTime = 0
let stepTime = 0
const transitionstart = () => {
  if (lastTransitionTime == 0) {
    console.log('动画开始')
  } else {
    console.log('动画开始，停留时间', Date.now() - stepTime)
  }
  console.log('\n')
  lastTransitionTime = Date.now()
}
const transitionend = () => {
  console.log('动画结束', Date.now() - lastTransitionTime)
  stepTime = Date.now()

  if (frameStep == rollListRender.value.length) {
    console.log('立即无感重置')
    // 1. 到底 无感重置
    ulStyle.value['transition'] = 'transform 0s'
    frameStep = 0
    ulStyle.value['transform'] = `translateY(-${frameStep++ * itemHeight.value}px)`

    // 2. 继续翻滚 window.requestAnimationFrame 传入的是下一个帧之前的的函数
    window.requestAnimationFrame(() => {
      // 下一个帧为真实重绘
      window.requestAnimationFrame(() => {
        // 再下一个帧，已经重置完毕，此时设置过渡时间
        ulStyle.value['transition'] = 'transform 1.5s'
      })
    })
  }

  setTimeout(
    () => (ulStyle.value['transform'] = `translateY(-${frameStep++ * itemHeight.value}px)`),
    +props.stepTimeout
  ) // 浏览器在下一个animation frame才开始执行动画
}

// let step = 0
// let lastTransitionTime: number
// function stepFun(timestamp: number) {
//   lastTransitionTime = lastTransitionTime ?? timestamp
//   const elapsed = timestamp - lastTransitionTime

//     console.log(elapsed)
//   if (elapsed >= props.stepTimeout) {
//     lastTransitionTime = timestamp
//   }

//   // console.log('stepFun', elapsed, step)
//   // if (elapsed > props.stepTimeout || elapsed == 0) {
//   //   lastFrameTime = timestamp
//   //   ulStyle.value['transform'] = `translateY(-${step++ * itemHeight.value})`
//   // }
//   // window.requestAnimationFrame(stepFun)

//   // setTimeout(() => window.requestAnimationFrame(stepFun), props.stepTimeout)

// }
</script>

<template>
  <section class="app-seamless" :style="{ height: itemHeight + 'px' }">
    <ul ref="ulRef" :style="ulStyle" @transitionstart="transitionstart" @transitionend="transitionend">
      <li v-for="text in rollListRender" :key="text">{{ text }}-</li>
    </ul>
  </section>
</template>

<style lang="scss">
.app-seamless {
  position: relative;
  background-color: red;
  font-size: 0;
  overflow: hidden;

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
    background-color: blue;
    // animation-name: roll-a;
    // animation-duration: 0.5s;
    // animation-timing-function: linear;
    // animation-delay: 0s;
    // animation-iteration-count: 1; // infinite
    // animation-direction: normal; // alternate
    // animation-fill-mode: forwards; // 停在最后一帧
    // animation-play-state: running;

    & > li {
      background-color: green;
      font-size: 16px;
    }
  }
}
</style>
