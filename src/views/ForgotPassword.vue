<template>
  <form method="post" @submit.prevent="submit">
    <AdminField label="Usuário">
      <InputText v-model="form.username" />
    </AdminField>
    <div class="flex flex-col lg:flex-row-reverse space-y-4 lg:space-y-0 items-center justify-between">
      <AdminButton
        type="submit"
        icon="pi pi-send"
        label="Esqueci minha senha"
        :loading="loading"
      />
      <AdminButton
        v-if="$auth.options.routes.login.enabled"
        @click="$admin.visit({ name: $auth.options.routes.login.name })"
        label="Voltar"
        icon="pi pi-arrow-left"
        class="p-button-text p-button-sm p-button-secondary"
      />
    </div>
  </form>
</template>

<script>
import { ref, reactive } from 'vue'
import InputText from 'primevue/inputtext'
import { useAuth } from '@/'

export default {
  components: {
    InputText
  },

  setup () {
    const auth = useAuth()
    const loading = ref(false)
    const form = reactive({ username: '' })

    const submit = () => {
      loading.value = true

      auth.forgotPassword(form)
        .finally(() => {
          loading.value = false
          form.username = ''
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
