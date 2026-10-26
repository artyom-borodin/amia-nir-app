<template>
  <el-link v-if="drillable" :type="BTN_PRIMARY" :underline="false" class="nir-drill-pill" @click="$emit('drill')">
    <span>{{ value }}</span>
  </el-link>
  <span v-else-if="showCourseTags && isCourseMap(value)" class="nir-course-tags">
    <el-tag v-for="(count, course) in value" :key="course" :size="UI_SIZE_SMALL" :effect="TAG_EFFECT_LIGHT">
      {{ formatCourseTagLabel(course, count) }}
    </el-tag>
  </span>
  <span v-else-if="value === 0" class="nir-zero-cell">0</span>
  <span v-else class="nir-cell" :title="formatTableCell(value)">{{ formatTableCell(value) }}</span>
</template>

<script setup>
import { BTN_PRIMARY, UI_SIZE_SMALL, TAG_EFFECT_LIGHT } from '../constants/ui.js'
import { formatCourseTagLabel } from '../constants/texts.js'
import { formatTableCell } from '../utils/format.js'
import { isCourseMap } from './reportHelpers.js'

defineProps({
  value: { type: [String, Number, Boolean, Array, Object], default: '' },
  drillable: { type: Boolean, default: false },
  showCourseTags: { type: Boolean, default: false }
})

defineEmits(['drill'])
</script>
