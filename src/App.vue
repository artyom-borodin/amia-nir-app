<template>
  <el-container class="nir-layout">
    <el-aside v-if="showSidebar" class="nir-aside">
      <div class="nir-aside-head">
        <span class="nir-aside-label">{{ TEXT_MENU }}</span>
        <el-button class="nir-aside-toggle" text :title="TEXT_COLLAPSE_MENU" @click="onCollapse">
          <el-icon><Fold /></el-icon>
        </el-button>
      </div>

      <div class="nir-menu-scroll">
        <el-menu :default-active="activeMenu" :default-openeds="MENU_OPENED_DEFAULT" router class="nir-nav-menu">
          <el-menu-item :index="ROUTE_HOME" class="nir-menu-item">
            <el-icon><HomeFilled /></el-icon>
            <span>{{ TEXT_HOME }}</span>
          </el-menu-item>

          <el-sub-menu :index="TABLE_GROUP_RESULTS">
            <template #title>
              <el-icon><component :is="NAV_GROUP_ICONS[TABLE_GROUP_RESULTS]" /></el-icon>
              <span>{{ TEXT_RESULTS_GROUP }}</span>
            </template>
            <el-menu-item
              v-for="t in RESULT_TABLES"
              :key="t.key"
              :index="crudPath(t.key)"
              :title="t.title"
              class="nir-menu-item nir-ellipsis"
            >
              <el-icon><component :is="getTableIcon(t.key)" /></el-icon>
              <span class="nir-ellipsis">{{ t.title }}</span>
            </el-menu-item>
          </el-sub-menu>

          <el-sub-menu :index="MENU_GROUP_REPORTS">
            <template #title>
              <el-icon><component :is="NAV_GROUP_ICONS[MENU_GROUP_REPORTS]" /></el-icon>
              <span>{{ TEXT_REPORTS }}</span>
            </template>
            <el-menu-item
              v-for="r in REPORT_KINDS"
              :key="r.value"
              :index="reportPath(r.value)"
              :title="r.label"
              class="nir-menu-item nir-ellipsis"
            >
              <el-icon><component :is="getReportIcon(r.value)" /></el-icon>
              <span class="nir-ellipsis">{{ r.label }}</span>
            </el-menu-item>
          </el-sub-menu>

          <el-sub-menu :index="TABLE_GROUP_DICTS">
            <template #title>
              <el-icon><component :is="NAV_GROUP_ICONS[TABLE_GROUP_DICTS]" /></el-icon>
              <span>{{ TEXT_DICTS_GROUP }}</span>
            </template>
            <el-menu-item
              v-for="t in DICT_TABLES"
              :key="t.key"
              :index="crudPath(t.key)"
              :title="t.title"
              class="nir-menu-item nir-ellipsis"
            >
              <el-icon><component :is="getTableIcon(t.key)" /></el-icon>
              <span class="nir-ellipsis">{{ t.title }}</span>
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </div>

      <div v-if="isAuth" class="nir-aside-foot">
        <div class="nir-user-chip">
          <div class="nir-user-avatar">
            <el-icon><UserFilled /></el-icon>
          </div>
          <div class="nir-user-meta nir-ellipsis">
            <div class="nir-user-name nir-ellipsis">{{ username }}</div>
          </div>
        </div>
        <el-button class="nir-logout-btn" text :title="TEXT_LOGOUT" @click="onLogout">
          <el-icon><SwitchButton /></el-icon>
          <span>{{ TEXT_LOGOUT }}</span>
        </el-button>
      </div>

      <div
        class="nir-resizer"
        :class="{ 'is-active': hoverResizer || dragResizer }"
        :title="TEXT_RESIZE_HINT"
        @pointerdown="onResizeStart"
        @dblclick="onResizeReset"
        @mouseenter="hoverResizer = true"
        @mouseleave="hoverResizer = false"
      />
    </el-aside>

    <el-container direction="vertical" class="nir-content">
      <div v-if="isAuth && collapsed" class="nir-toolbar-top">
        <el-button :title="TEXT_SHOW_MENU" @click="onExpand">
          <el-icon><Expand /></el-icon>
          <span>{{ TEXT_MENU }}</span>
        </el-button>
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
import {
  Fold,
  Expand,
  HomeFilled,
  UserFilled,
  SwitchButton
} from '@element-plus/icons-vue'
import { useAuthStore } from './stores/auth.js'
import {
  RESULT_TABLES,
  DICT_TABLES,
  REPORT_KINDS,
  TABLE_GROUP_RESULTS,
  TABLE_GROUP_DICTS,
  MENU_GROUP_REPORTS
} from './constants/tables.js'
import { ROUTE_LOGIN, ROUTE_HOME, crudPath, reportPath } from './constants/routes.js'
import { MENU_OPENED_DEFAULT } from './constants/ui.js'
import { NAV_GROUP_ICONS, getTableIcon, getReportIcon } from './constants/icons.js'
import { useSidebarResize } from './composables/useSidebarResize.js'
import {
  TEXT_COLLAPSE_MENU,
  TEXT_SHOW_MENU,
  TEXT_HOME,
  TEXT_RESULTS_GROUP,
  TEXT_DICTS_GROUP,
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
