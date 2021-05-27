<template>
  <form method="post" @submit.prevent="submit">
    <AdminField label="Usuário">
      <InputText v-model="form.username" />
    </AdminField>
    <AdminField label="Senha">
      <Password v-model="form.password" :feedback="false" class="w-full" />
    </AdminField>
    <div class="flex items-center justify-between">
      <Button
        v-if="$auth.options.routes.forgotPassword.enabled"
        @click="$admin.visit({ name: $auth.options.routes.forgotPassword.name })"
        label="Esqueci minha senha"
        class="p-button-text p-button-sm"
      />
      <Button
        type="submit"
        icon="pi pi-lock"
        label="Entrar"
        :loading="loading"
      />
    </div>
  </form>
</template>

<script>
import { ref, reactive } from 'vue'
import Password from 'primevue/password'
import { useAuth } from '@/'

export default {
  components: {
    Password
  },

  setup () {
    const auth = useAuth()
    const loading = ref(false)
    const form = reactive({
      username: '',
      password: ''
    })

    const submit = () => {
      loading.value = true

      auth.login(form)
        .finally(() => {
          loading.value = false
        })
    }

    return {
      loading,
      form,
      submit
    }
  }
}
</script>
