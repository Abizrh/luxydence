export {} // Ensure this file is parsed as a module regardless of dependencies.

declare module 'vue-router' {
  interface RouteMeta {
    auth?: boolean
    layout?: string
    full?: boolean
    allowAgent?: boolean
  }
}
