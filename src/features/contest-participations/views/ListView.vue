<template>
  <CrudListPage
    :crud-key="TABLE_KEYS.CONTEST_PARTS"
    :columns="COLUMNS"
    :filter-defs="FILTERS"
    :empty-form="emptyForm"
    :form-component="FormView"
    :validate="validateLearner"
    :normalize="(form) => normalizeMonths(form, FIELDS)"
  />
</template>
<script setup>
import CrudListPage from '../../_components/CrudListPage.vue'
import FormView from './FormView.vue'
import { COLUMNS, FILTERS, FIELDS, emptyForm } from '../schema.js'
import { normalizeMonths, validateLearner } from '../../_shared.js'
import { TABLE_KEYS } from '../../../constants/endpoints.js'
</script>
