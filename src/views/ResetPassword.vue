<template>
  <form method="post" @submit.prevent="submit">
    <AdminField label="Nova senha">
      <Password v-model="form.password" toggleMask class="w-full" />
    </AdminField>
    <AdminField label="Confirme a nova senha">
      <Password v-model="form.password_confirmation" toggleMask class="w-full" />
    </AdminField>
    <Button type="submit" label="Alterar senha" :loading="loading" />
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

  props: {
    token: {
      type: String,
      required: true
    }
  },

  setup (props) {
    const auth = useAuth()
    const loading = ref(false)
    const form = reactive({
      password: '',
      password_confirmation: '',
      token: props.token
    })

    const submit = () => {
      loading.value = true

      auth.resetPassword(form)
        .finally(() => {
          loading.value = false
          form.password = ''
          form.password_confirmation = ''
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
