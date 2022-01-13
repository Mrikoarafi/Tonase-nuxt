<template>
  <v-dialog v-model="loading" hide-overlay persistent width="300">
    <v-card color="primary" dark>
      <v-card-text class="pt-2">
        Loading..
        <v-progress-linear
          indeterminate
          color="white"
          class="mb-0"
        ></v-progress-linear>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'LoadingItem',
  // eslint-disable-next-line vue/require-prop-types
  props: ['value'],
  data() {
    return {
      loading: this.value || true,
    }
  },
  // computed: {
  //   loading: {
  //     get() {
  //       return this.value
  //     },
  //   },
  // },
}
</script>
