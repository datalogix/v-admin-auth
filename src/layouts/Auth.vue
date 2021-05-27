<template>
  <div class="bg-gray-200 h-screen flex flex-col items-center justify-center text-gray-700">
    <div class="mb-6 grid gap-4">
      <img
        v-if="$auth.admin.options.logo"
        :src="$auth.admin.options.logo"
        :alt="$auth.admin.options.name"
        class="max-h-48 mx-auto"
      />

      <span
        v-else
        v-text="$auth.admin.options.name"
        class="text-2xl font-semibold text-center"
      />
    </div>

    <div class="rounded shadow bg-white p-8 w-full max-w-xs sm:max-w-sm">
      <slot />
    </div>
  </div>
</template>
