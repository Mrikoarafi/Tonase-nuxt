<template>
  <div class="row vh-100">
    <div class="col-12 text-center pb-0 mb-n10">
      <NuxtLink to="/" class="text-decoration-none">
        <button class="btn px-6 btn-outline-primary">Back Home</button>
      </NuxtLink>
    </div>

    <div v-if="!localStorageFilms" class="col-12 text-center my-auto">
      <h1>Uups..</h1>
      <h3>Anda belum memilih film favorite..</h3>
      <NuxtLink to="/" class="text-decoration-none">
        <button class="btn px-6 btn-primary mt-5">Choose film</button>
      </NuxtLink>
    </div>
    <div
      v-for="item in dataMovies"
      v-else
      :key="item.id"
      class="col-12 col-sm-6 col-md-4 col-lg-2"
    >
      <NuxtLink
        :to="'details-movie/' + item.imDbId"
        class="text-decoration-none"
      >
        <v-card class="mx-auto">
          <v-card class="px-1 py-1">
            <v-img class="text-white" :src="item.thumbnailUrl" max-height="200">
              <v-card-title
                class="mx-auto mt-n2"
                style="font-size: 15px; text-shadow: 2px 2px 8px #000000"
                >{{ item.title }}</v-card-title
              >
            </v-img>
            <div class="ml-1">Year : {{ item.year || item.description }}</div>
          </v-card>
        </v-card>
      </NuxtLink>
    </div>
    <div class="col-12 text-center mt-auto">
      <v-pagination
        v-model="page"
        :length="
          !localStorageFilms ? 1 : Math.ceil(localStorageFilms.length / perPage)
        "
        :total-visible="7"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailsMovie',
  data() {
    return {
      localStorageFilms: null,
      page: 1,
      perPage: 12,
    }
  },
  computed: {
    dataMovies() {
      if (!this.localStorageFilms) {
        return
      }
      return this.localStorageFilms.slice(
        (this.page - 1) * this.perPage,
        this.page * this.perPage
      )
    },
  },
  mounted() {
    const getLocal = localStorage.getItem('favoriteFilms')
    this.localStorageFilms = JSON.parse(getLocal)
  },
}
</script>
