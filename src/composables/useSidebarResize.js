import { ref, watch } from 'vue'
import { STORAGE_SIDEBAR_WIDTH_KEY, STORAGE_SIDEBAR_COLLAPSED_KEY } from '../constants/api.js'
import { SIDEBAR_MIN_WIDTH, SIDEBAR_WIDTH_VAR, POINTER_MOVE_EVT, POINTER_UP_EVT } from '../constants/ui.js'
import { getCollapsedFlag, setCollapsedFlag, getWidthValue, writeStorage, removeStorage } from '../utils/storage.js'

export function useSidebarResize() {
  const collapsed = ref(getCollapsedFlag(STORAGE_SIDEBAR_COLLAPSED_KEY))
  const customW = ref(getWidthValue(STORAGE_SIDEBAR_WIDTH_KEY))
  const hoverResizer = ref(false)
  const dragResizer = ref(false)

  watch(
    customW,
    (v) => {
      if (v > SIDEBAR_MIN_WIDTH) document.documentElement.style.setProperty(SIDEBAR_WIDTH_VAR, v + 'px')
      else document.documentElement.style.removeProperty(SIDEBAR_WIDTH_VAR)
    },
    { immediate: true }
  )

  function setCollapsed(v) {
    collapsed.value = v
    setCollapsedFlag(STORAGE_SIDEBAR_COLLAPSED_KEY, v)
  }

  function onCollapse() {
    setCollapsed(true)
  }

  function onExpand() {
    setCollapsed(false)
  }

  function onResizeStart(e) {
    e.preventDefault()
    const asideEl = e.currentTarget.parentElement
    const startX = e.clientX
    const startW = asideEl ? asideEl.getBoundingClientRect().width : SIDEBAR_MIN_WIDTH
    dragResizer.value = true
    const onMove = (ev) => {
      customW.value = Math.max(SIDEBAR_MIN_WIDTH, Math.round(startW + ev.clientX - startX))
    }
    const onUp = () => {
      dragResizer.value = false
      window.removeEventListener(POINTER_MOVE_EVT, onMove)
      window.removeEventListener(POINTER_UP_EVT, onUp)
      if (customW.value > SIDEBAR_MIN_WIDTH) writeWidth()
    }
    window.addEventListener(POINTER_MOVE_EVT, onMove)
    window.addEventListener(POINTER_UP_EVT, onUp)
  }

  function writeWidth() {
    writeStorage(STORAGE_SIDEBAR_WIDTH_KEY, String(customW.value))
  }

  function onResizeReset() {
    customW.value = SIDEBAR_MIN_WIDTH
    removeStorage(STORAGE_SIDEBAR_WIDTH_KEY)
  }

  return {
    collapsed,
    customW,
    hoverResizer,
    dragResizer,
    setCollapsed,
    onCollapse,
    onExpand,
    onResizeStart,
    onResizeReset
  }
}

