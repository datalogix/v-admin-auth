import { createAdmin } from '@datalogix/v-admin'
import { createAuthModule } from '@/'

import '@datalogix/v-admin/dist/v-admin.css'

createAdmin({
  modules: [
    createAuthModule()
  ]
})
