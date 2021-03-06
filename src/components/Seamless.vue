<script setup lang="ts">
import { ref, watch, computed, TransitionGroupProps } from 'vue'
/**
 * props
 */
const props = withDefaults(
  defineProps<{
    debug?: boolean
    rollList: number[] | string[]
    stayDuration?: number | string
    transitionProps?: {
      ['transition-delay']: string
      ['transition-duration']: string
      ['transition-timing-function']: string
    }
  }>(),
  {
    rollList: () => [],
    stayDuration: 1800,
    transitionProps: () => ({
      'transition-delay': '0s',
      'transition-duration': '1s',
      'transition-timing-function': 'initial',
    }),
  }
)

/**
 * data
 */
const ulRef = ref<Element>()
const ulStyle = ref<{ [k: string]: string }>(props.transitionProps)

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

/**
 * watch
 */
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
const transitionend = () => {
  // transitionend 在最后一帧渲染之前被触发
  window.requestAnimationFrame(() => {
    // 下一帧绘制前
    window.requestAnimationFrame(() => {
      // 上一帧绘制完成

      if (frameStep == rollListRender.value.length) {
        // 1. 到底 无感重置
        ulStyle.value['transition-duration'] = '0s'
        frameStep = 0
        ulStyle.value['transform'] = `translateY(-${frameStep++ * itemHeight.value}px)`

        // 2. 继续翻滚 window.requestAnimationFrame 传入的是下一个帧之前的的函数
        window.requestAnimationFrame(() => {
          // 下一帧绘制前
          window.requestAnimationFrame(() => {
            // 上一个帧绘制完成，已经重置完毕，此时设置过渡时间
            ulStyle.value['transition-duration'] = props.transitionProps['transition-duration']
          })
        })
      }

      setTimeout(
        () => (ulStyle.value['transform'] = `translateY(-${frameStep++ * itemHeight.value}px)`),
        +props.stayDuration - 1000 / 60 // 浏览器在next frame才开始执行过渡
      )
    })
  })
}
</script>

<template>
  <section class="app-seamless" :style="{ height: itemHeight + 'px' }">
    <ul ref="ulRef" :style="ulStyle" @transitionend="transitionend">
      <li v-for="text in rollListRender" :key="text">{{ text }}</li>
    </ul>
  </section>
</template>

<style lang="scss">
.app-seamless {
  font-size: 0;
  overflow: hidden;
  display: inline-flex;
  align-items: flex-start;
  & > ul,
  & > li {
    margin: 0;
    padding: 0;
  }
  & > ul {
    transition-property: transform;
    list-style: none;
    & > li {
      font-size: initial;
    }
  }
}
</style>
