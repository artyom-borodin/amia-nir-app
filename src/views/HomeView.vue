<template>
  <div class="nir-home">
    <div class="nir-page-header">
      <div class="nir-page-titles">
        <h2 class="nir-crud-title">{{ TEXT_APP_TITLE }}</h2>
      </div>
    </div>

    <div class="nir-dash-grid">
      <el-card v-for="section in TABLE_SECTIONS" :key="section.key" class="nir-dash-section-card" :shadow="UI_CARD_SHADOW">
        <template #header>
          <div class="nir-section-header">
            <div class="nir-section-title">
              <el-icon class="nir-section-icon"><component :is="NAV_GROUP_ICONS[section.key]" /></el-icon>
              <span>{{ section.title }}</span>
            </div>
          </div>
        </template>
        <div class="nir-dash-list">
          <div v-for="t in section.tables" :key="t.key" class="nir-dash-row-wrap">
            <router-link :to="crudPath(t.key)" :title="t.title" class="nir-dash-row">
              <el-icon class="nir-dash-row-icon"><component :is="getTableIcon(t.key)" /></el-icon>
              <span class="nir-dash-name nir-ellipsis">{{ t.title }}</span>
              <span class="nir-dash-arrow">
                <el-icon><ArrowRight /></el-icon>
              </span>
            </router-link>
            <router-link :to="crudCreatePath(t.key)" class="nir-dash-quick-add" :title="TEXT_QUICK_CREATE + KV_JOINER + t.title">
              <el-icon><Plus /></el-icon>
            </router-link>
          </div>
        </div>
      </el-card>

      <el-card class="nir-dash-section-card nir-dash-section-wide" :shadow="UI_CARD_SHADOW">
        <template #header>
          <div class="nir-section-header">
            <div class="nir-section-title">
              <el-icon class="nir-section-icon"><component :is="NAV_GROUP_ICONS[MENU_GROUP_REPORTS]" /></el-icon>
              <span>{{ TEXT_REPORTS }}</span>
            </div>
          </div>
        </template>
        <div class="nir-dash-report-grid">
          <router-link
            v-for="r in REPORT_KINDS"
            :key="r.value"
            :to="reportPath(r.value)"
            :title="r.label"
            class="nir-dash-row"
          >
            <el-icon class="nir-dash-row-icon"><component :is="getReportIcon(r.value)" /></el-icon>
            <span class="nir-dash-name nir-ellipsis">{{ r.label }}</span>
            <span class="nir-dash-arrow">
              <el-icon><ArrowRight /></el-icon>
            </span>
          </router-link>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { Plus, ArrowRight } from '@element-plus/icons-vue'
import { TABLE_SECTIONS, REPORT_KINDS, MENU_GROUP_REPORTS } from '../constants/tables.js'
import { crudPath, crudCreatePath, reportPath } from '../constants/routes.js'
import { KV_JOINER } from '../constants/formats.js'
import { NAV_GROUP_ICONS, getTableIcon, getReportIcon } from '../constants/icons.js'
import { UI_CARD_SHADOW } from '../constants/ui.js'
import {
  TEXT_APP_TITLE,
  TEXT_REPORTS,
  TEXT_QUICK_CREATE
} from '../constants/texts.js'
</script>
