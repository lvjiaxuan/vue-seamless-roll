import {
  type PropType,
  defineComponent,
  h,
  nextTick,
  onMounted,
  ref,
  watch,
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
        'transition-delay': '0',
        'transition-duration': '1s',
        'transition-timing-function': 'linear',
      }),
    },
  },

  setup(props) {
    const liRef = ref<HTMLElement | null>(null)

    const itemHeight = ref(0)
    onMounted(() => itemHeight.value = liRef.value?.getBoundingClientRect().height ?? 0)

    const ulTranslateYPX = ref(0)
    const stop = watch(itemHeight, _itemHeight => {
      if (_itemHeight) {
        stop()
        rollNext()
      }
    })

    const zeroDurationImportant = ref(false)
    const onTransitionend = () => {
      if (Math.abs(ulTranslateYPX.value) === itemHeight.value * props.rollList.length) {
        zeroDurationImportant.value = true
        ulTranslateYPX.value = 0
        setTimeout(onTransitionend)
        // window.requestAnimationFrame(() => window.requestAnimationFrame(onTransitionend))
      } else {
        zeroDurationImportant.value = false
        rollNext()
      }
    }

    const rollNext = () => setTimeout(() => ulTranslateYPX.value -= itemHeight.value, +props.interval)

    return () => h(
      'div',
      {
        class: 'of-hidden',
        style: { height: `${ itemHeight.value }px` },
      },
      h(
        'ul',
        {
          class: [ 'm0 p0 list-none transition-property-transform', { '!duration-0': zeroDurationImportant.value } ],
          style: {
            ...props.transitions,
            transform: `translateY(${ ulTranslateYPX.value }px)`,
          },
          onTransitionend,
        },
        [ ...props.rollList, props.rollList[0] ].map((text, idx) => h(
          'li',
          { ref: liRef },
          text,
        )),
      ),
    )
  },
})
