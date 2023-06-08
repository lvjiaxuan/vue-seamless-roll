import {
  type PropType,
  computed,
  defineComponent,
  h,
  onMounted,
  ref,
  watch,
  watchEffect,
} from 'vue-demi'

export default defineComponent({
  name: 'VueSeamlessRoll',

  props: {
    debug: {
      type: Boolean,
      default: false,
    },
    rollList: {
      type: Array as PropType<(string | number)[]>,
      default: () => [],
    },
    interval: {
      type: [ Number, String ],
      default: 2000,
    },
    transitions: {
      type: Object as PropType<{
        'transition-delay': string
        'transition-duration': string
        'transition-timing-function': string
      }>,
      default: () => ({
        'transition-delay': '1s',
        'transition-duration': '2s',
        'transition-timing-function': 'linear',
      }),
    },
  },

  setup(props) {

    const rollListAppend = computed(() => [ ...props.rollList, props.rollList[0] ])

    const liRef = ref<HTMLElement | null>(null)

    const itemHeight = ref(0) // computed(() => liRef.value?.getBoundingClientRect().height ?? 0)
    onMounted(() => itemHeight.value = liRef.value?.getBoundingClientRect().height ?? 0)

    const ulTranslateYPX = ref(0)
    const stop = watch(itemHeight, _itemHeight => {
      if (_itemHeight) {
        stop()
        ulTranslateYPX.value = -itemHeight.value
      }
    })

    const onTransitionend = () =>
      setTimeout(() => ulTranslateYPX.value -= itemHeight.value, +props.interval)

    return () => h(
      'div',
      {
        class: 'of-hidden',
        style: { height: `${ itemHeight.value }px` },
      },
      h(
        'ul',
        {
          class: 'm0 p0 list-none transition-property-transform',
          style: {
            ...props.transitions,
            transform: `translateY(${ ulTranslateYPX.value }px)`,
          },
          onTransitionend,
        },
        rollListAppend.value.map((text, idx) => h(
          'li',
          { ref: liRef },
          `${ idx }-${ text }`,
        )),
      ),
    )
  },
})
