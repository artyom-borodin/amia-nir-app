import { computed, ref } from 'vue'
import { DRAWER_MIN_WIDTH, DRAWER_MAX_WIDTH_RATIO, POINTER_MOVE_EVT, POINTER_UP_EVT } from '../constants/ui.js'
import { getWidthValue, writeStorage, removeStorage } from '../utils/storage.js'

export function useDrawerResize(storageKey) {
  const customW = ref(getWidthValue(storageKey, DRAWER_MIN_WIDTH))
  const hoverResizer = ref(false)
  const dragResizer = ref(false)

  const drawerSize = computed(() => (customW.value > DRAWER_MIN_WIDTH ? clampWidth(customW.value) + 'px' : ''))

  function clampWidth(v) {
    const max = Math.round(window.innerWidth * DRAWER_MAX_WIDTH_RATIO)
    return Math.min(Math.max(DRAWER_MIN_WIDTH, Math.round(v)), max)
  }

  function onResizeStart(e) {
    e.preventDefault()
    const drawerEl = e.currentTarget.closest('.el-drawer')
    const startX = e.clientX
    const startW = drawerEl ? drawerEl.getBoundingClientRect().width : customW.value
    dragResizer.value = true
    const onMove = (ev) => {
      customW.value = clampWidth(startW - (ev.clientX - startX))
    }
    const onUp = () => {
      dragResizer.value = false
      window.removeEventListener(POINTER_MOVE_EVT, onMove)
      window.removeEventListener(POINTER_UP_EVT, onUp)
      writeStorage(storageKey, String(customW.value))
    }
    window.addEventListener(POINTER_MOVE_EVT, onMove)
    window.addEventListener(POINTER_UP_EVT, onUp)
  }

  function onResizeReset() {
    customW.value = DRAWER_MIN_WIDTH
    removeStorage(storageKey)
  }

  return { drawerSize, hoverResizer, dragResizer, onResizeStart, onResizeReset }
}
