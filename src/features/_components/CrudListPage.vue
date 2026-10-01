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
        <ReferenceSelect v-else-if="f.type === FIELD_TYPES.REF" v-model="filters[f.prop]" :endpoint="getEndpoint(f.ref)" :placeholder="TEXT_ALL" />
      </el-form-item>
    </FilterPanel>
    <ErrorAlert :message="error" :fields="fieldErrors" />
    <div class="nir-toolbar">
      <el-button :type="BTN_PRIMARY" @click="onCreate">{{ TEXT_CREATE_RECORD }}</el-button>
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
      @page-change="onPage"
      @size-change="onSize"
      @sort-change="onSortChange"
    />
    <FormDrawer v-model="drawer" :title="editId ? TEXT_EDIT_RECORD : TEXT_ADD_RECORD" :loading="saving" @save="onSave">
      <ErrorAlert :message="formError" :fields="formFields" />
      <component :is="formComponent" v-model="form" ref="formViewRef" />
    </FormDrawer>
  </div>
</template>

<script setup>
import DataTable from '../../components/DataTable.vue'
import FilterPanel from '../../components/FilterPanel.vue'
import FormDrawer from '../../components/FormDrawer.vue'
import ErrorAlert from '../../components/ErrorAlert.vue'
import ReferenceSelect from '../../components/ReferenceSelect.vue'
import { getEndpoint } from '../../constants/tables.js'
import { DATE_VALUE_FORMAT } from '../../constants/formats.js'
import { FIELD_TYPES } from '../../constants/fieldTypes.js'
import { BTN_PRIMARY } from '../../constants/ui.js'
import {
  TEXT_ALL,
  TEXT_DATE_PLACEHOLDER,
  TEXT_CREATE_RECORD,
  TEXT_EDIT_RECORD,
  TEXT_ADD_RECORD
} from '../../constants/texts.js'
import { useCrudPage } from '../../composables/useCrudPage.js'

const props = defineProps({
  crudKey: { type: String, required: true },
  columns: { type: Array, default: () => [] },
  filterDefs: { type: Array, default: () => [] },
  emptyForm: { type: Function, required: true },
  formComponent: { type: Object, required: true },

  validate: { type: Function, default: null },

  normalize: { type: Function, default: null }
})

const {
  rows,
  total,
  loading,
  error,
  fieldErrors,
  page,
  pageSize,
  filters,
  drawer,
  editId,
  form,
  saving,
  formError,
  formFields,
  formViewRef,
  onSearch,
  onReset,
  onCreate,
  onEdit,
  onRemove,
  onPage,
  onSize,
  onSave,
  onSortChange
} = useCrudPage(props.crudKey, {
  filterDefs: props.filterDefs,
  emptyFormFn: props.emptyForm,
  validateFn: props.validate,
  normalizeFn: props.normalize
})
</script>
