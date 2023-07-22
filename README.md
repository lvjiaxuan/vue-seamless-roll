# vue-seamless-roll

[![](https://img.shields.io/npm/v/vue-seamless-roll?color=a1b858&label=npm)](https://www.npmjs.com/package/vue-seamless-roll)
![](https://img.shields.io/badge/supports-vue%202%2F3-brightgreen)
[![](https://img.shields.io/npm/dependency-version/vue-seamless-roll/vue-demi)](https://github.com/vueuse/vue-demi)

[Vue3 Demo](https://lvjiaxuan.github.io/vue-seamless-roll)

[Vue2 Demo](https://lvjiaxuan.github.io/vue-seamless-roll/vue2)

## Install

```sh
npm i vue-seamless-roll
```

## Props

<!-- eslint-skip -->
```ts
props: {
  rollList: {
    // As the name implies.
    type: Array as PropType<(string | number)[]>,
    default: () => [],
  },
  interval: {
    // How long is the item Staying.
    type: [ Number, String ],
    default: 2000,
  },
  transitions: {
    // No need to describe more.
    type: Object as PropType<{
      'transition-delay': string
      'transition-duration': string
      'transition-timing-function': string
    }>,
    default: () => ({
      'transition-delay': '0',
      'transition-duration': '1s', // Actually, the whole duration time is added with the `transition-delay`.
      'transition-timing-function': 'linear',
    }),
  },
},
```

## TODO

- [ ] Support slot.
- [ ] define and expose methods like `startRoll` \ `stopRoll` \ `rollTo` .