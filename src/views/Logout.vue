<template>
  <div>
    Saindo...
  </div>
</template>

<script>
import { useAuth } from '@/'

export default {
  setup () {
    useAuth().logout()
  }
}
</script>
