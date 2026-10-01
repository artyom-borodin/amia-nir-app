<template>
  <CrudListPage
    :crud-key="TABLE_KEYS.CONFERENCE_INFOS"
    :columns="COLUMNS"
    :filter-defs="FILTERS"
    :empty-form="emptyForm"
    :form-component="FormView"
    :validate="validateEventDates"
  />
</template>
<script setup>
import CrudListPage from '../../_components/CrudListPage.vue'
import FormView from './FormView.vue'
import { COLUMNS, FILTERS, emptyForm } from '../schema.js'
import { validateEventDates } from '../../_shared.js'
import { TABLE_KEYS } from '../../../constants/endpoints.js'
</script>
