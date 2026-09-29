export { APP_BASE_URL, APP_LOCALE } from './config.js'

export const ROUTE_LOGIN = '/login'
export const ROUTE_HOME = '/'
export const ROUTE_CRUD_PREFIX = '/crud/'
export const ROUTE_REPORT_PREFIX = '/reports/'
export const ROUTE_CRUD_PATTERN = '/crud/:key'
export const ROUTE_REPORT_PATTERN = '/reports/:kind'
export const ROUTE_NOT_FOUND = '/:pathMatch(.*)*'
export const ROUTE_DEFAULT_REPORT_KIND = 'summary'
export const ROUTE_REPORT_DEFAULT = ROUTE_REPORT_PREFIX + ROUTE_DEFAULT_REPORT_KIND

export const ROUTE_PARAM_KEY = 'key'
export const ROUTE_PARAM_KIND = 'kind'
export const ROUTE_META_PUBLIC = 'public'

export const ROUTE_CREATE_QUERY_KEY = 'create'
export const ROUTE_CREATE_QUERY_VALUE = '1'

export function shouldAutoCreate(route) {
  return String(route?.query?.[ROUTE_CREATE_QUERY_KEY]) === ROUTE_CREATE_QUERY_VALUE
}

export function crudPath(key) {
  return ROUTE_CRUD_PREFIX + key
}

export function crudCreatePath(key) {
  return crudPath(key) + '?' + ROUTE_CREATE_QUERY_KEY + '=' + ROUTE_CREATE_QUERY_VALUE
}

export function reportPath(kind) {
  return ROUTE_REPORT_PREFIX + kind
}
