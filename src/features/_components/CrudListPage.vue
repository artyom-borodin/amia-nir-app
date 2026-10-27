<template>
  <div class="nir-page">
    <FilterPanel v-model="filters" collapsible @search="onSearch" @reset="onReset">
      <el-form-item v-for="f in filterDefs" :key="f.prop" :label="f.label">
        <el-input v-if="f.type === FIELD_TYPES.TEXT" v-model="filters[f.prop]" clearable :placeholder="TEXT_ALL" />
        <el-input v-else-if="f.type === FIELD_TYPES.NUMBER" v-model="filters[f.prop]" type="number" :min="f.min" :max="f.max" clearable :placeholder="TEXT_ALL" />
        <el-select v-else-if="f.type === FIELD_TYPES.SELECT" v-model="filters[f.prop]" clearable :placeholder="TEXT_ALL">
          <el-option v-for="o in f.options" :key="o.value" :value="o.value" :label="o.label" />
        </el-select>
        <el-date-picker v-else-if="f.type === FIELD_TYPES.DATE" v-model="filters[f.prop]" type="date" :value-format="DATE_VALUE_FORMAT" :placeholder="TEXT_DATE_PLACEHOLDER" clearable />
        <ReferenceSelect v-else-if="f.type === FIELD_TYPES.REF" :model-value="filters[f.prop]" :endpoint="getEndpoint(f.ref)" :query-params="f.queryFn ? f.queryFn(filters) : undefined" :placeholder="TEXT_ALL" @update:modelValue="onFilterRefChange(f.prop, $event)" />
      </el-form-item>
    </FilterPanel>
    <ErrorAlert :message="error" :fields="fieldErrors" />
    <div class="nir-toolbar">
      <ActiveFilterTags :filters="filters" :filter-defs="filterDefs" @remove="onRemoveFilter" @clear="onReset" />
      <div class="nir-toolbar-actions">
        <el-button
          v-if="selectedRows.length > 0"
          :type="BTN_DANGER"
          :icon="Delete"
          @click="onRemoveSelected"
        >
          {{ TEXT_DELETE_SELECTED }} ({{ selectedRows.length }})
        </el-button>
        <ExportXlsxButton
          :mode="EXPORT_TARGET_CRUD"
          :columns="exportColumns"
          :total-count="total"
          :page-count="rows.length"
          :selected-count="selectedRows.length"
          :exporting="exporting"
          :disabled="loading"
          @export="onExport"
        />
        <el-button :type="BTN_PRIMARY" :icon="Plus" @click="onCreate">{{ TEXT_CREATE_RECORD }}</el-button>
      </div>
    </div>
    <DataTable
      :rows="rows"
      :columns="columns"
      :loading="loading"
      :total="total"
      :page="page"
      :page-size="pageSize"
      @edit="onEdit"
      @remove="onRemove"
      @selection-change="onSelectionChange"
      @page-change="onPage"
      @size-change="onSize"
      @sort-change="onSortChange"
    />
    <FormDrawer v-model="drawer" :title="editId ? TEXT_EDIT_RECORD : TEXT_ADD_RECORD" :loading="saving" @save="onSave">
      <ErrorAlert :message="formError" :fields="formFields" />
      <component :is="formComponent" v-model="form" v-bind="formProps" ref="formViewRef" />
    </FormDrawer>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Plus, Delete } from '@element-plus/icons-vue'
import DataTable from '../../components/DataTable.vue'
import FilterPanel from '../../components/FilterPanel.vue'
import FormDrawer from '../../components/FormDrawer.vue'
import ErrorAlert from '../../components/ErrorAlert.vue'
import ReferenceSelect from '../../components/ReferenceSelect.vue'
import ActiveFilterTags from '../../components/ActiveFilterTags.vue'
import ExportXlsxButton from '../../reports/ExportXlsxButton.vue'
import { getEndpoint } from '../../constants/tables.js'
import { EXPORT_TARGET_CRUD, buildCrudExportColumns } from '../../constants/reports.js'
import { DATE_VALUE_FORMAT } from '../../constants/formats.js'
import { FIELD_TYPES } from '../../constants/fieldTypes.js'
import { BTN_PRIMARY, BTN_DANGER } from '../../constants/ui.js'
import {
  TEXT_ALL,
  TEXT_DATE_PLACEHOLDER,
  TEXT_CREATE_RECORD,
  TEXT_DELETE_SELECTED,
  TEXT_EDIT_RECORD,
  TEXT_ADD_RECORD
} from '../../constants/texts.js'
import { useCrudPage } from '../../composables/useCrudPage.js'
import { applyLearnerExclusive } from '../_shared.js'
import CrudFormView from './CrudFormView.vue'

const props = defineProps({
  crudKey: { type: String, required: true },
  columns: { type: Array, default: () => [] },
  filterDefs: { type: Array, default: () => [] },
  emptyForm: { type: Function, required: true },
  formComponent: { type: Object, default: () => CrudFormView },
  formProps: { type: Object, default: () => ({}) },

  validate: { type: Function, default: null },

  normalize: { type: Function, default: null }
})

const {
  rows,
  total,
  loading,
  exporting,
  error,
  fieldErrors,
  page,
  pageSize,
  filters,
  selectedRows,
  drawer,
  editId,
  form,
  saving,
  formError,
  formFields,
  formViewRef,
  onSearch,
  onReset,
  onRemoveFilter,
  onCreate,
  onEdit,
  onRemove,
  onSelectionChange,
  onRemoveSelected,
  onPage,
  onSize,
  onSave,
  onSortChange,
  onExport
} = useCrudPage(props.crudKey, {
  filterDefs: props.filterDefs,
  emptyFormFn: props.emptyForm,
  validateFn: props.validate,
  normalizeFn: props.normalize
})

const exportColumns = computed(() => buildCrudExportColumns(props.columns))

function onFilterRefChange(prop, val) {
  applyLearnerExclusive(filters.value, prop, val, '')
}
</script>
