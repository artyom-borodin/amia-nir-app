<template>
  <el-link v-if="drillable" :type="BTN_PRIMARY" @click="$emit('drill')">{{ value }}</el-link>
  <span v-else-if="showCourseTags && isCourseMap(value)" class="nir-course-tags">
    <el-tag v-for="(count, course) in value" :key="course" :size="UI_SIZE_SMALL">{{ course }} {{ TEXT_COURSE_WORD }}: {{ count }}</el-tag>
  </span>
  <span v-else>{{ formatTableCell(value) }}</span>
</template>

<script setup>
import { BTN_PRIMARY, UI_SIZE_SMALL } from '../constants/ui.js'
import { TEXT_COURSE_WORD } from '../constants/texts.js'
import { formatTableCell } from '../utils/format.js'
import { isCourseMap } from './reportHelpers.js'

defineProps({
  value: { type: [String, Number, Boolean, Array, Object], default: '' },
  drillable: { type: Boolean, default: false },
  showCourseTags: { type: Boolean, default: false }
})

defineEmits(['drill'])
</script>
