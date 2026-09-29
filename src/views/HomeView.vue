<template>
  <div>
    <h2>{{ TEXT_HOME }}</h2>
    <div class="nir-dash-grid">
      <el-card :header="TEXT_TABLES">
        <div class="nir-dash-list">
          <router-link v-for="t in TABLES" :key="t.key" :to="crudPath(t.key)" :title="t.title" class="nir-dash-row">
            <span class="nir-dash-name nir-ellipsis">{{ t.title }}</span>
            <el-tag :size="UI_SIZE_SMALL" :type="BTN_INFO" class="nir-dash-count">{{ formatCount(counts[t.key]) }}</el-tag>
          </router-link>
        </div>
      </el-card>
      <el-card :header="TEXT_REPORTS">
        <div class="nir-dash-list">
          <router-link v-for="r in REPORT_KINDS" :key="r.value" :to="reportPath(r.value)" :title="r.label" class="nir-dash-row">
            <span class="nir-dash-name nir-ellipsis">{{ r.label }}</span>
            <span class="nir-dash-arrow">></span>
          </router-link>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { TABLES, REPORT_KINDS } from '../constants/tables.js'
import { crudPath, reportPath } from '../constants/routes.js'
import {
  UI_DASH_COUNT_BATCH,
  DASH_COUNT_RETRIES,
  DASH_LOCALE,
  UI_SIZE_SMALL,
  BTN_INFO
} from '../constants/ui.js'
import { TEXT_HOME, TEXT_TABLES, TEXT_REPORTS } from '../constants/texts.js'
import { getTableCount } from '../api/dashboard.js'

const counts = ref({})

function formatCount(v) {
  if (v === undefined) return '...'
  if (v === null) return '-'
  return Number(v).toLocaleString(DASH_LOCALE)
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
