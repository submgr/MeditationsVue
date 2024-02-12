declare module "*.svg?inline" {
    const content: any;
    export default content;
  }

  import * as gamificationEngine from "./modules/gamificationEngine"

  declare module '@vue/runtime-core' {
    export interface ComponentCustomProperties {
      $achievements: typeof gamificationEngine.createAchievementsSystem
    }
  }

  export {}