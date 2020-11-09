import { createRouter, RouteRecordRaw } from 'vue-router'
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

type routes = {
  hidden? : Boolean
}

declare module 'vue/types/vue' {
  interface Vue {
    routes: RouteRecordRaw | routes
  }
}
