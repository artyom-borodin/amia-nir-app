<template>
  <div class="nir-ref" :class="{ 'is-multiple': multiple }">
    <div class="nir-ref-control">
      <el-select
        :model-value="modelValue"
        :multiple="multiple"
        :reserve-keyword="multiple"
        filterable
        remote
        clearable
        :remote-method="search"
        :loading="loading"
        :placeholder="effectivePlaceholder"
        :popper-class="REF_POPPER_CLASS"
        class="nir-ref-select"
        @change="$emit(UPDATE_MODEL_EVENT, $event)"
      >
        <template v-if="multiple" #tag>
          <span v-if="selectedItems.length > 0" class="nir-ref-multi-summary">
            {{ TEXT_SELECTED_COUNT }}: {{ selectedItems.length }}
          </span>
        </template>
        <template v-if="multiple && options.length > 0" #header>
          <div class="nir-ref-dropdown-header">
            <span class="nir-ref-dropdown-stats">
              {{ TEXT_FOUND_COUNT }}: <b>{{ options.length }}</b>
              <template v-if="selectedItems.length > 0">
                {{ DOT_JOINER }}{{ TEXT_SELECTED_COUNT }}: <b>{{ selectedItems.length }}</b>
              </template>
            </span>
            <div class="nir-ref-dropdown-actions">
              <el-button
                v-if="unselectedVisibleValues.length > 0"
                link
                :type="BTN_PRIMARY"
                :size="UI_SIZE_SMALL"
                @click.stop="selectVisible"
              >
                + {{ TEXT_ADD_FOUND }} ({{ unselectedVisibleValues.length }})
              </el-button>
              <el-button
                v-if="selectedItems.length > 0"
                link
                :type="BTN_DANGER"
                :size="UI_SIZE_SMALL"
                @click.stop="clearSelected"
              >
                {{ TEXT_CLEAR_ALL }}
              </el-button>
            </div>
          </div>
        </template>
        <el-option v-for="o in options" :key="o.value" :value="o.value" :label="o.label">
          <EntityCard :card="o.card" :label="o.label" />
        </el-option>
        <template #empty>
          <div class="nir-ref-empty">
            <div class="nir-ref-empty-title">{{ emptyState.title }}</div>
            <div v-if="emptyState.hint" class="nir-ref-empty-hint">{{ emptyState.hint }}</div>
          </div>
        </template>
      </el-select>
      <el-button v-if="addRoute" :size="UI_SIZE_SMALL" class="nir-ref-add" :title="addHint" @click="goAdd">{{ addButtonLabel }}</el-button>
    </div>

    <div v-if="multiple && selectedItems.length > 0" class="nir-ref-selected-panel">
      <div class="nir-ref-selected-head">
        <span class="nir-ref-selected-title">
          {{ TEXT_SELECTED_COUNT }}:
          <span class="nir-ref-selected-count">{{ selectedItems.length }}</span>
        </span>
        <el-button link :type="BTN_DANGER" :size="UI_SIZE_SMALL" @click="clearSelected">
          {{ TEXT_CLEAR_ALL }}
        </el-button>
      </div>
      <div class="nir-ref-selected-list">
        <div v-for="item in selectedItems" :key="item.value" class="nir-ref-selected-row">
          <div class="nir-ref-selected-main">
            <el-popover v-if="item.card && item.card.rich" v-bind="ENTITY_POPOVER_ATTRS">
              <template #reference>
                <span class="nir-cell-card-trigger">
                  <span class="nir-cell-trigger-text nir-ref-selected-name">{{ item.card.title }}</span>
                </span>
              </template>
              <EntityCard :card="item.card" :label="item.label" />
            </el-popover>
            <span v-else class="nir-ref-selected-name">{{ item.label }}</span>
            <span v-if="item.shortMeta" class="nir-ref-selected-sub">{{ item.shortMeta }}</span>
          </div>
          <button
            type="button"
            class="nir-ref-selected-remove"
            :title="TEXT_DELETE"
            @click="removeSelected(item.value)"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useDictionarySelect } from '../composables/useDictionarySelect.js'
import {
  TEXT_ALL,
  TEXT_EMPTY,
  TEXT_DELETE,
  TEXT_ADD_HINT,
  TEXT_NEW_ITEM,
  TEXT_SELECT_LEARNER_FIRST,
  TEXT_SELECT_LEARNER_HINT,
  TEXT_NO_LEARNER_CONFERENCES,
  TEXT_NO_LEARNER_CONFERENCES_HINT,
  TEXT_NO_LEARNER_GROUPS,
  TEXT_NO_LEARNER_GROUPS_HINT,
  TEXT_NO_SEARCH_RESULTS,
  TEXT_NO_SEARCH_RESULTS_HINT,
  TEXT_MULTI_SEARCH_PLACEHOLDER,
  TEXT_SELECTED_COUNT,
  TEXT_FOUND_COUNT,
  TEXT_ADD_FOUND,
  TEXT_CLEAR_ALL
} from '../constants/texts.js'
import { NEW_TAB_TARGET, DOT_JOINER } from '../constants/formats.js'
import {
  UI_SIZE_SMALL,
  BTN_PRIMARY,
  BTN_DANGER,
  DICT_VALUE_FIELD,
  DICT_LABEL_FIELD,
  REF_POPPER_CLASS,
  ENTITY_POPOVER_ATTRS
} from '../constants/ui.js'
import { ENDPOINTS } from '../constants/endpoints.js'
import { getEndpoint } from '../constants/tables.js'
import { isEmptyValue } from '../constants/api.js'
import { UPDATE_MODEL_EVENT } from '../constants/events.js'
import { unknownLabel } from '../features/_shared.js'
import { buildShortMeta } from '../utils/entityCards.js'
import EntityCard from './EntityCard.vue'

const props = defineProps({
  modelValue: { type: [String, Number, Array, null], default: null },
  endpoint: { type: String, required: true },
  valueField: { type: String, default: DICT_VALUE_FIELD },
  labelField: { type: String, default: DICT_LABEL_FIELD },
  multiple: { type: Boolean, default: false },
  placeholder: { type: String, default: TEXT_ALL },
  queryParams: { type: Object, default: undefined },
  addRoute: { type: String, default: '' },
  addLabel: { type: String, default: '' }
})

const emit = defineEmits([UPDATE_MODEL_EVENT])

const router = useRouter()
const { options, allOptions, loading, search } = useDictionarySelect(
  props.endpoint,
  props.valueField,
  props.labelField,
  () => props.queryParams,
  (list) => {
    if (!props.multiple && !isEmptyValue(props.modelValue) && !list.some((o) => o.value === props.modelValue)) {
      emit(UPDATE_MODEL_EVENT, null)
    }
  }
)

const selectedIds = computed(() => (Array.isArray(props.modelValue) ? props.modelValue : []))
const selectedIdSet = computed(() => new Set(selectedIds.value))

const optionsByValue = computed(() => {
  const map = new Map()
  for (const o of allOptions.value) {
    map.set(o.value, o)
  }
  return map
})

const selectedItems = computed(() =>
  selectedIds.value.map((id) => {
    const found = optionsByValue.value.get(id)
    if (found) {
      return {
        ...found,
        shortMeta: buildShortMeta(found.card)
      }
    }
    return {
      value: id,
      label: unknownLabel(id),
      card: null,
      shortMeta: ''
    }
  })
)

const unselectedVisibleValues = computed(() =>
  options.value.filter((o) => !selectedIdSet.value.has(o.value)).map((o) => o.value)
)

function selectVisible() {
  if (!unselectedVisibleValues.value.length) return
  emit(UPDATE_MODEL_EVENT, [...selectedIds.value, ...unselectedVisibleValues.value])
}

function removeSelected(val) {
  emit(
    UPDATE_MODEL_EVENT,
    selectedIds.value.filter((id) => id !== val)
  )
}

function clearSelected() {
  emit(UPDATE_MODEL_EVENT, [])
}

const normEndpoint = computed(() => getEndpoint(props.endpoint))
const isMissingDependency = computed(() => props.queryParams === null)
const isFilteredEmpty = computed(
  () =>
    !loading.value &&
    props.queryParams !== null &&
    props.queryParams !== undefined &&
    allOptions.value.length === 0
)

const emptyState = computed(() => {
  if (isMissingDependency.value) {
    return {
      title: TEXT_SELECT_LEARNER_FIRST,
      hint: TEXT_SELECT_LEARNER_HINT
    }
  }
  if (isFilteredEmpty.value) {
    if (normEndpoint.value === getEndpoint(ENDPOINTS.CONFERENCE_PARTS)) {
      return {
        title: TEXT_NO_LEARNER_CONFERENCES,
        hint: TEXT_NO_LEARNER_CONFERENCES_HINT
      }
    }
    if (normEndpoint.value === getEndpoint(ENDPOINTS.PROBLEM_GROUPS)) {
      return {
        title: TEXT_NO_LEARNER_GROUPS,
        hint: TEXT_NO_LEARNER_GROUPS_HINT
      }
    }
  }
  if (allOptions.value.length > 0 && options.value.length === 0) {
    return {
      title: TEXT_NO_SEARCH_RESULTS,
      hint: TEXT_NO_SEARCH_RESULTS_HINT
    }
  }
  return {
    title: TEXT_EMPTY,
    hint: ''
  }
})

const effectivePlaceholder = computed(() => {
  if (isMissingDependency.value) return TEXT_SELECT_LEARNER_FIRST
  if (isFilteredEmpty.value) return emptyState.value.title
  if (props.multiple) return TEXT_MULTI_SEARCH_PLACEHOLDER
  return props.placeholder
})

const addButtonLabel = computed(() => (props.addLabel ? '+ ' + props.addLabel : TEXT_NEW_ITEM))
const addHint = TEXT_ADD_HINT

function goAdd() {
  if (!props.addRoute) return
  const resolved = router.resolve(props.addRoute)
  window.open(resolved.href, NEW_TAB_TARGET)
}

onMounted(() => search(''))
</script>
