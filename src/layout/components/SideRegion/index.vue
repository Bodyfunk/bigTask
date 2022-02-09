<template>
    <div :class="{'has-logo':showLogo}" :style="{ backgroundColor: settings.sideTheme === 'theme-dark' ? variables.menuBackground : variables.menuLightBackground }">
        <!-- <logo v-if="showLogo" :collapse="isCollapse" /> -->
        <!-- <div class="noLogo"></div> -->
        <!-- <el-scrollbar :class="settings.sideTheme" wrap-class="scrollbar-wrapper">
            <el-menu
                :default-active="activeMenu"
                :collapse="isCollapse"
                :background-color="settings.sideTheme === 'theme-dark' ? variables.menuBackground : variables.menuLightBackground"
                :text-color="settings.sideTheme === 'theme-dark' ? variables.menuColor : variables.menuLightColor"
                :unique-opened="true"
                :active-text-color="settings.theme"
                :collapse-transition="false"
                mode="vertical"
            > -->
<!-- 湖南省 -->
            <!-- <el-submenu index="1">
               <template slot="title">湖南省</template>
            <el-submenu index="1-1">
                <template slot="title">常德市</template>
                <el-menu-item index="1-1-1">开心炒货厂</el-menu-item>
            </el-submenu>
               <el-menu-item index="1-2">长沙市</el-menu-item>
               <el-menu-item index="1-3">株洲市</el-menu-item> 
            </el-submenu> -->
<!-- 湖北省 -->
            <!-- <el-submenu index="2">
               <template slot="title">湖北省</template>
            <el-submenu index="2-1">
                <template slot="title">武汉市</template>
                <el-menu-item index="2-1-1">磕得香炒货厂</el-menu-item>
            </el-submenu>
               <el-menu-item index="2-2">恩施市</el-menu-item>
               <el-menu-item index="2-3">黄冈市</el-menu-item> 
            </el-submenu>
            
            <el-menu-item index="3">广东省</el-menu-item> 
            <el-menu-item index="4">海外</el-menu-item>
        
            </el-menu>
        </el-scrollbar> -->

        <!-- 树形控件 -->
        <tree-region />
    </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import treeRegion from "./treeRegion.vue";
import variables from "@/assets/styles/variables.scss";

export default {
    name:'SideRegion',
    components: { SidebarItem, Logo, treeRegion },
    computed: {
        ...mapState(["settings"]),
        ...mapGetters(["sidebarRouters", "sidebar"]),
        activeMenu() {
            const route = this.$route;
            const { meta, path } = route;
            // if set path, the sidebar will highlight the path you set
            if (meta.activeMenu) {
                return meta.activeMenu;
            }
            return path;
        },
        showLogo() {
            return this.$store.state.settings.sidebarLogo;
        },
        variables() {
            return variables;
        },
        isCollapse() {
            return !this.sidebar.opened;
        }
    }
};
</script>

<style>
.noLogo {
    width: 200px;
    height: 50px;
    background-color: #1f211e;
}
</style>