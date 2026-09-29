import { createRouter, createWebHistory } from 'vue-router'
import { getAccess } from '../api/tokens.js'
import { getTable, hasReportKind } from '../constants/tables.js'
import {
  ROUTE_LOGIN,
  ROUTE_HOME,
  ROUTE_CRUD_PATTERN,
  ROUTE_REPORT_PATTERN,
  ROUTE_NOT_FOUND,
  ROUTE_CRUD_PREFIX,
  ROUTE_REPORT_PREFIX,
  ROUTE_REPORT_DEFAULT,
  ROUTE_PARAM_KEY,
  ROUTE_PARAM_KIND,
  ROUTE_META_PUBLIC,
  APP_BASE_URL
} from '../constants/routes.js'

import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import CrudView from '../views/CrudView.vue'
import ReportView from '../views/ReportView.vue'

const routes = [
  { path: ROUTE_LOGIN, component: LoginView, meta: { [ROUTE_META_PUBLIC]: true } },
  { path: ROUTE_HOME, component: HomeView },
  { path: ROUTE_CRUD_PATTERN, component: CrudView, props: (route) => ({ tableKey: route.params[ROUTE_PARAM_KEY] }) },
  { path: ROUTE_REPORT_PATTERN, component: ReportView, props: true },
  { path: ROUTE_NOT_FOUND, redirect: ROUTE_HOME }
]

const router = createRouter({
  history: createWebHistory(APP_BASE_URL),
  routes
})

function validateCrudRoute(to) {
  const key = to.params[ROUTE_PARAM_KEY]
  if (!getTable(key)) return ROUTE_HOME
  return null
}

function validateReportRoute(to) {
  const kind = to.params[ROUTE_PARAM_KIND]
  if (!hasReportKind(kind)) return ROUTE_REPORT_DEFAULT
  return null
}

router.beforeEach((to) => {
  const isPublic = to.meta && to.meta[ROUTE_META_PUBLIC]
  if (!isPublic && !getAccess()) {
    return ROUTE_LOGIN
  }
  if (to.path.startsWith(ROUTE_CRUD_PREFIX)) {
    return validateCrudRoute(to) || true
  }
  if (to.path.startsWith(ROUTE_REPORT_PREFIX)) {
    return validateReportRoute(to) || true
  }
  return true
})

export default router
