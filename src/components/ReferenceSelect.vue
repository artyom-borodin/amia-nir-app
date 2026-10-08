<template>
  <div class="nir-ref">
    <el-select
      :model-value="modelValue"
      filterable
      remote
      clearable
      :remote-method="searchDebounced"
      :loading="loading"
      :placeholder="placeholder"
      class="nir-ref-select"
      @change="$emit(UPDATE_MODEL_EVENT, $event)"
    >
      <el-option v-for="o in options" :key="o.value" :value="o.value" :label="o.label">
        <span v-if="o.raw && o.raw.report_title" class="nir-ref-option">
          <span class="nir-ref-option-row">
            <el-tag :size="UI_SIZE_SMALL">Доклад</el-tag>
            <span class="nir-ellipsis">{{ o.raw.report_title }}</span>
          </span>
          <span v-if="o.raw.conference_title" class="nir-ref-option-row">
            <el-tag :size="UI_SIZE_SMALL">Конференция</el-tag>
            <span class="nir-ellipsis">{{ o.raw.conference_title }}</span>
          </span>
        </span>
        <span v-else>{{ o.label }}</span>
      </el-option>
    </el-select>
    <el-button v-if="addRoute" :size="UI_SIZE_SMALL" class="nir-ref-add" :title="addHint" @click="goAdd">{{ addButtonLabel }}</el-button>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useDictionarySelect } from '../composables/useDictionarySelect.js'
import { TEXT_ALL, TEXT_ADD_HINT } from '../constants/texts.js'
import { NEW_TAB_TARGET } from '../constants/formats.js'
import { UI_SIZE_SMALL, DICT_VALUE_FIELD, DICT_LABEL_FIELD } from '../constants/ui.js'

import { UPDATE_MODEL_EVENT } from '../constants/events.js'

const props = defineProps({
  modelValue: { type: [String, Number, null], default: null },
  endpoint: { type: String, required: true },
  valueField: { type: String, default: DICT_VALUE_FIELD },
  labelField: { type: String, default: DICT_LABEL_FIELD },
  placeholder: { type: String, default: TEXT_ALL },
  addRoute: { type: String, default: '' },
  addLabel: { type: String, default: '' }
})

defineEmits([UPDATE_MODEL_EVENT])

const router = useRouter()
const { options, loading, search, searchDebounced } = useDictionarySelect(props.endpoint, props.valueField, props.labelField)

const addButtonLabel = computed(() => (props.addLabel ? '+ ' + props.addLabel : '+ Новый'))
const addHint = TEXT_ADD_HINT

function goAdd() {
  if (!props.addRoute) return

  const resolved = router.resolve(props.addRoute)
  window.open(resolved.href, NEW_TAB_TARGET)
}

onMounted(() => search(''))
</script>

