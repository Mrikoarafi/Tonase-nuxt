<template>
  <div class="container">
    <header class="row justify-content-center mb-5 py-4">
      <h1 class="my-auto">Popular Movies</h1>
    </header>
    <div class="row mt-4">
      <div class="col-12">
        <ListMovies />
      </div>
    </div>
  </div>
</template>

<script>
import ListMovies from '../components/Medium/Index/ListMovies'
export default {
  name: 'IndexPage',
  components: {
    ListMovies,
  },
  head() {
    return {
      title: 'Tonase Nuxt',
    }
  },
}
</script>
