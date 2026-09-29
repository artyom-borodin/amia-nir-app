<template>
  <CrudListPage
    :crud-key="TABLE_KEYS.EXHIBITIONS"
    :columns="COLUMNS"
    :filter-defs="FILTERS"
    :empty-form="emptyForm"
    :form-component="FormView"
    :validate="validateLearner"
  />
</template>
<script setup>
import CrudListPage from '../../_components/CrudListPage.vue'
import FormView from './FormView.vue'
import { COLUMNS, FILTERS, emptyForm } from '../schema.js'
import { validateLearner } from '../../_shared.js'
import { TABLE_KEYS } from '../../../constants/endpoints.js'
</script>
