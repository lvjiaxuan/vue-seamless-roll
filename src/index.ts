import {
  type PropType,
  computed,
  defineComponent,
  h,
  ref,
} from 'vue-demi'

export default defineComponent({
  name: 'VueSeamlessRoll',

  props: {
    debug: {
      type: Boolean,
      default: false,
    },
    rollList: {
      type: Array as PropType<string[] | number[]>,
      default: () => [],
    },
    interval: {
      type: [ Number, String ],
      default: 2000,
    },
  },

  setup(props) {

    const rollListAppend = computed(() => [ ...props.rollList, props.rollList[0] ])

    const vueNumberRollRef = ref<HTMLElement | null>(null)

    return () => h(
      'ul',
      {
        class: '',
        ref: vueNumberRollRef,
      },
    )
  },
})
