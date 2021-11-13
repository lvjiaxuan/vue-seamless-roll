# vue3-seamless-roll

Vue3 无缝滚动组件 单行

demo

## Install

```shell
npm i vue3-seamless-roll
```

## Usage

**Props:**

| prop            | description                              | type                                                                                                      | default                                                                                               |
| --------------- | ---------------------------------------- | --------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| rollList        | 要滚动轮播的文本数组                     | `number[]`                                                                                                | []                                                                                                    |
| stayDuration    | 滚动间隔时间即停留时间，不包含滚动的时间 | `number`                                                                                                  | 2000                                                                                                  |
| transitionProps | CSS过渡相关属性                          | `{ ['transition-delay']: string ['transition-duration']: string ['transition-timing-function']: string }` | `{ 'transition-delay': '0s', 'transition-duration': '1s', 'transition-timing-function': 'initial', }` |

**Expose Methods:**

## Notes

- [ ] slot