import { watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import * as echarts from 'echarts'
import { WINDOW_RESIZE_EVT } from '../constants/ui.js'

export function useEcharts(chartRef, dataRef, itemsRef, chartOption) {
  let chart = null

  function destroyChart() {
    if (chart) {
      chart.dispose()
      chart = null
    }
  }

  function renderChart() {
    if (!chartRef.value || !itemsRef.value.length) {
      destroyChart()
      return
    }
    if (!chart) {
      chart = echarts.init(chartRef.value)
    }
    chart.setOption(chartOption.value)
  }

  function onResize() {
    if (chart) chart.resize()
  }

  watch(
    () => dataRef.value,
    () => {
      nextTick(() => renderChart())
    }
  )

  onMounted(() => {
    window.addEventListener(WINDOW_RESIZE_EVT, onResize)
    if (dataRef.value) renderChart()
  })

  onBeforeUnmount(() => {
    window.removeEventListener(WINDOW_RESIZE_EVT, onResize)
    destroyChart()
  })

  return { renderChart, destroyChart }
}
