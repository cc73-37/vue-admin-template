import { defineComponent, getCurrentInstance, onBeforeMount, onBeforeUnmount, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
// import store from '@/store'
import { useStore } from 'vuex'

const { body } = document
const WIDTH = 992 // refer to Bootstrap's responsive design

export default defineComponent({
  setup() {
    const store = useStore()
    const route = useRoute()
    const self: any = getCurrentInstance()
    watch(route, (route) => {
      if (self.ctx.device === 'mobile' && self.ctx.sidebar.opened) {
        store.dispatch('app/closeSideBar', { withoutAnimation: false })
      }
    })
    // watch: {
    //   $route(route) {
    //     if (this.device === 'mobile' && this.sidebar.opened) {
    //       store.dispatch('app/closeSideBar', { withoutAnimation: false })
    //     }
    //   },
    // },
    onBeforeMount(() => {
      window.addEventListener('resize', $_resizeHandler)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', $_resizeHandler)
    })

    onMounted(() => {
      const isMobile = $_isMobile()
      if (isMobile) {
        store.dispatch('app/toggleDevice', 'mobile')
        store.dispatch('app/closeSideBar', { withoutAnimation: true })
      }
    })

    const $_isMobile = () => {
      const rect = body.getBoundingClientRect()
      return rect.width - 1 < WIDTH
    }

    const $_resizeHandler = () => {
      if (!document.hidden) {
        const isMobile = $_isMobile()
        store.dispatch('app/toggleDevice', isMobile ? 'mobile' : 'desktop')

        if (isMobile) {
          store.dispatch('app/closeSideBar', { withoutAnimation: true })
        }
      }
    }

    return { $_isMobile, $_resizeHandler }
  }

  // watch: {
  //   $route(route) {
  //     if (this.device === 'mobile' && this.sidebar.opened) {
  //       store.dispatch('app/closeSideBar', { withoutAnimation: false })
  //     }
  //   },
  // },
  // beforeMount() {
  //   window.addEventListener('resize', this.$_resizeHandler)
  // },
  // beforeUnmount() {
  //   window.removeEventListener('resize', this.$_resizeHandler)
  // },
  // mounted() {
  //   const isMobile = this.$_isMobile()
  //   if (isMobile) {
  //     store.dispatch('app/toggleDevice', 'mobile')
  //     store.dispatch('app/closeSideBar', { withoutAnimation: true })
  //   }
  // },
  // methods: {
  //   // use $_ for mixins properties
  //   // https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential
  //   $_isMobile() {
  //     const rect = body.getBoundingClientRect()
  //     return rect.width - 1 < WIDTH
  //   },
  //   $_resizeHandler() {
  //     if (!document.hidden) {
  //       const isMobile = this.$_isMobile()
  //       store.dispatch('app/toggleDevice', isMobile ? 'mobile' : 'desktop')

  //       if (isMobile) {
  //         store.dispatch('app/closeSideBar', { withoutAnimation: true })
  //       }
  //     }
  //   },
  // },
})
