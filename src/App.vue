<template>
  <el-container class="nir-layout">
    <el-aside v-if="showSidebar" class="nir-aside">
      <div class="nir-aside-head">
        <div class="nir-aside-title">{{ TEXT_APP_TITLE }}</div>
        <el-button class="nir-aside-toggle" :title="TEXT_COLLAPSE_MENU" @click="onCollapse"><<</el-button>
      </div>
      <div class="nir-menu-scroll">
        <el-menu :default-active="activeMenu" router>
          <el-menu-item :index="ROUTE_HOME">{{ TEXT_HOME }}</el-menu-item>
          <el-sub-menu index="crud">
            <template #title>{{ TEXT_TABLES }}</template>
            <el-menu-item v-for="t in TABLES" :key="t.key" :index="crudPath(t.key)" :title="t.title" class="nir-menu-item nir-ellipsis">{{ t.title }}</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="reports">
            <template #title>{{ TEXT_REPORTS }}</template>
            <el-menu-item v-for="r in REPORT_KINDS" :key="r.value" :index="reportPath(r.value)" :title="r.label" class="nir-menu-item nir-ellipsis">{{ r.label }}</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </div>
      <div class="nir-aside-foot">
        <el-button @click="onLogout" v-if="isAuth">{{ TEXT_LOGOUT }} (<span class="nir-user-chip nir-ellipsis">{{ username }}</span>)</el-button>
      </div>
      <div class="nir-resizer" :class="{ 'is-active': hoverResizer || dragResizer }" :title="TEXT_RESIZE_HINT" @pointerdown="onResizeStart" @dblclick="onResizeReset" @mouseenter="hoverResizer = true" @mouseleave="hoverResizer = false" />
    </el-aside>
    <el-container direction="vertical" class="nir-content">
      <div v-if="isAuth && collapsed" class="nir-toolbar-top">
        <el-button :title="TEXT_SHOW_MENU" @click="onExpand">= {{ TEXT_MENU }}</el-button>
      </div>
      <el-main class="nir-main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from './stores/auth.js'
import { TABLES, REPORT_KINDS } from './constants/tables.js'
import { ROUTE_LOGIN, ROUTE_HOME, crudPath, reportPath } from './constants/routes.js'
import { useSidebarResize } from './composables/useSidebarResize.js'
import {
  TEXT_APP_TITLE,
  TEXT_COLLAPSE_MENU,
  TEXT_SHOW_MENU,
  TEXT_HOME,
  TEXT_TABLES,
  TEXT_REPORTS,
  TEXT_MENU,
  TEXT_LOGOUT,
  TEXT_RESIZE_HINT
} from './constants/texts.js'

const { collapsed, hoverResizer, dragResizer, onCollapse, onExpand, onResizeStart, onResizeReset } =
  useSidebarResize()

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()

const isAuth = computed(() => auth.isAuth)
const username = computed(() => auth.username)
const activeMenu = computed(() => route.path)
const showSidebar = computed(() => isAuth.value && !collapsed.value)

function onLogout() {
  auth.logout()
  router.push(ROUTE_LOGIN)
}
</script>
