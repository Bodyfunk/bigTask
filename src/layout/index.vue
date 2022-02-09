<template>
  <div :class="classObj" class="app-wrapper" :style="{'--current-color': theme}">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"/>
    <!-- <sidebar class="sidebar-container"/> -->
    <side-region class="sidebar-container"/>
    <div :class="{hasTagsView:needTagsView}" class="main-container">
      <div :class="{'fixed-header':fixedHeader}">
        <navbar />
        <tags-view v-if="needTagsView" />
      </div>
      <app-main />
      <right-panel>
        <settings />
      </right-panel>
    </div>
    <div class="footer">
      <img class="ruideerlogo" src="@/assets/logo/ruideerlogo.png" alt="logo">
      <div class="ruideer">瑞德尔-Ruideer</div>
      <div class="ruideer_version">当前版本1.0.1</div>
      <img class="icon" src="@/assets/icons/version.png" alt="logo">
      
    </div>
  </div>
</template>

<script>
import RightPanel from '@/components/RightPanel'
import { AppMain, Navbar, Settings, Sidebar, TagsView, Headbar, SideRegion } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { mapState } from 'vuex'
import variables from '@/assets/styles/variables.scss'

export default {
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    RightPanel,
    Settings,
    Sidebar,
    TagsView,
    Headbar,
    SideRegion
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapState({
      theme: state => state.settings.theme,
      sideTheme: state => state.settings.sideTheme,
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    },
    variables() {
      return variables;
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/assets/styles/mixin.scss";
  @import "~@/assets/styles/variables.scss";

  .footer {
    width: 100%;
    height: 50px;
    
    background-color: #1f211e;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;
  }

  .ruideerlogo {
    vertical-align: middle;
    margin-left: 50px;
    
  }

  .ruideer {
    font-weight: 600;
    line-height: 50px;
    font-size: 20px;
    color: #edf1f2;
    display: inline-block;
    position: absolute;
    left: 110px;
  }

  .icon {
    width: 32px;
    height: 32px;
    margin-top: 9px;
    float: right;
  }

  .ruideer_version {
    margin-left: 25px;
    margin-right: 25px;
    font-size: 14px;
    color: #909190;
    line-height: 50px;
    // display: inline-block;
    float: right;
  }

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;

    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100%);
    transition: width 0.28s;
  }
  .el-popup-parent--hidden .fixed-header {
    padding-right: 0px;
  }
  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }
</style>
