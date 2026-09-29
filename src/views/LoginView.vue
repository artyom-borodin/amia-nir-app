<template>
  <div class="nir-login-page">
    <el-card class="nir-login-card">
      <h2 class="nir-login-title">{{ TEXT_LOGIN_TITLE }}</h2>
      <p class="nir-login-subtitle">{{ TEXT_APP_TITLE }}</p>
      <ErrorAlert :message="error" :fields="fieldErrors" />
      <el-form :model="form" class="nir-login-form" label-position="top" @submit.prevent="onLogin">
        <el-form-item :label="TEXT_LOGIN">
          <el-input v-model="form.username" autocomplete="username" autofocus />
        </el-form-item>
        <el-form-item :label="TEXT_PASSWORD">
          <el-input v-model="form.password" type="password" autocomplete="current-password" show-password />
        </el-form-item>
        <el-form-item class="nir-login-submit-item">
          <el-button :type="BTN_PRIMARY" :loading="loading" native-type="submit" class="nir-login-submit">{{ TEXT_SIGN_IN }}</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'
import { parseApiError } from '../api/errors.js'
import { LOGIN_ERROR_TEXT } from '../constants/api.js'
import { ROUTE_HOME } from '../constants/routes.js'
import { BTN_PRIMARY } from '../constants/ui.js'
import { TEXT_LOGIN_TITLE, TEXT_LOGIN, TEXT_PASSWORD, TEXT_SIGN_IN, TEXT_APP_TITLE } from '../constants/texts.js'
import ErrorAlert from '../components/ErrorAlert.vue'

const router = useRouter()
const auth = useAuthStore()
const form = ref({ username: '', password: '' })
const loading = ref(false)
const error = ref('')
const fieldErrors = ref({})

async function onLogin() {
  loading.value = true
  error.value = ''
  fieldErrors.value = {}
  try {
    await auth.login(form.value.username, form.value.password)
    router.push(ROUTE_HOME)
  } catch (err) {
    const parsed = parseApiError(err)
    error.value = parsed.message || LOGIN_ERROR_TEXT
    fieldErrors.value = parsed.fields || {}
  } finally {
    loading.value = false
  }
}
</script>
