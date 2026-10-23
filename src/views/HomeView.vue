<template>
  <div class="nir-home">
    <div class="nir-page-header">
      <div class="nir-page-titles">
        <h2 class="nir-crud-title">{{ TEXT_APP_TITLE }}</h2>
      </div>
    </div>

    <div class="nir-kpi-grid">
      <div v-for="t in kpiTables" :key="t.key" class="nir-kpi-card">
        <router-link :to="crudPath(t.key)" class="nir-kpi-main">
          <div class="nir-kpi-top">
            <span class="nir-kpi-label nir-ellipsis" :title="t.title">{{ t.title }}</span>
            <el-icon class="nir-kpi-glyph"><component :is="getTableIcon(t.key)" /></el-icon>
          </div>
          <div class="nir-kpi-value">{{ formatCount(counts[t.key]) }}</div>
        </router-link>
        <div class="nir-kpi-foot">
          <router-link :to="crudCreatePath(t.key)" class="nir-kpi-action">
            <el-icon><Plus /></el-icon>
            <span>{{ TEXT_QUICK_CREATE }}</span>
          </router-link>
          <router-link :to="crudPath(t.key)" class="nir-kpi-link">
            <span>{{ TEXT_OPEN_SECTION }}</span>
            <el-icon><ArrowRight /></el-icon>
          </router-link>
        </div>
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
              <el-tag :size="UI_SIZE_SMALL" :type="BTN_INFO" :effect="TAG_EFFECT_PLAIN" class="nir-dash-count">
                {{ formatCount(counts[t.key]) }}
              </el-tag>
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
import { computed, onMounted, ref } from 'vue'
import { Plus, ArrowRight } from '@element-plus/icons-vue'
import { TABLES, TABLE_SECTIONS, KPI_TABLE_KEYS, REPORT_KINDS, MENU_GROUP_REPORTS, getTable } from '../constants/tables.js'
import { crudPath, crudCreatePath, reportPath } from '../constants/routes.js'
import { KV_JOINER } from '../constants/formats.js'
import { NAV_GROUP_ICONS, getTableIcon, getReportIcon } from '../constants/icons.js'
import {
  UI_DASH_COUNT_BATCH,
  DASH_COUNT_RETRIES,
  UI_SIZE_SMALL,
  UI_CARD_SHADOW,
  BTN_INFO,
  TAG_EFFECT_PLAIN
} from '../constants/ui.js'
import {
  TEXT_APP_TITLE,
  TEXT_REPORTS,
  TEXT_QUICK_CREATE,
  TEXT_OPEN_SECTION
} from '../constants/texts.js'
import { formatLocaleNumber } from '../utils/format.js'
import { getTableCount } from '../api/dashboard.js'

const counts = ref({})
const kpiTables = computed(() => KPI_TABLE_KEYS.map((k) => getTable(k)).filter(Boolean))

function formatCount(v) {
  if (v === undefined) return '...'
  if (v === null) return '-'
  return formatLocaleNumber(v)
}

async function fetchCountRaw(t) {
  return getTableCount(t.endpoint)
}

async function fetchCount(t) {
  for (let attempt = 0; attempt < DASH_COUNT_RETRIES; attempt++) {
    try {
      counts.value[t.key] = await fetchCountRaw(t)
      return
    } catch (_) {
      if (attempt === DASH_COUNT_RETRIES - 1) counts.value[t.key] = null
    }
  }
}

async function mapBatched(list, size, fn) {
  for (let i = 0; i < list.length; i += size) {
    await Promise.all(list.slice(i, i + size).map(fn))
  }
}

onMounted(async () => {
  await mapBatched(TABLES, UI_DASH_COUNT_BATCH, fetchCount)
})
</script>
