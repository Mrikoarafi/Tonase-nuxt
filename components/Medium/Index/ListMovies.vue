<template>
  <div class="row">
    <Loading v-if="allData.isLoading" value="true" />
    <div v-else class="col-12">
      <div class="row">
        <div class="col-5 col-lg-3">
          <NuxtLink to="/favorite-movies" class="text-decoration-none">
            <button class="btn btn-sm btn-primary mt-5">
              My Favorite Movies
            </button>
          </NuxtLink>
        </div>
        <div class="ml-auto col-6">
          <v-text-field
            v-model="search"
            label="Search"
            clearable
            @keydown.enter="searchMovies"
          ></v-text-field>
        </div>
      </div>
      <div class="row">
        <div
          v-for="item in dataMovies"
          :key="item.id"
          class="col-12 col-sm-6 col-md-4 col-lg-2"
        >
          <NuxtLink
            :to="'details-movie/' + item.id"
            class="text-decoration-none"
          >
            <v-card class="mx-auto">
              <v-card class="px-1 py-1">
                <v-img class="text-white" :src="item.image" max-height="200">
                  <v-card-title
                    class="mx-auto mt-n2"
                    style="font-size: 15px; text-shadow: 2px 2px 8px #000000"
                    >{{ item.title }}</v-card-title
                  >
                </v-img>
                <v-rating
                  :value="item.imDbRating / 2"
                  color="amber"
                  dense
                  half-increments
                  readonly
                  size="15"
                ></v-rating>
                <div class="grey--text ml-1">
                  {{ item.imDbRating }} ({{ item.imDbRatingCount }})
                </div>
                <div class="ml-1">
                  Year : {{ item.year || item.description }}
                </div>
              </v-card>
            </v-card>
          </NuxtLink>
        </div>
      </div>
      <div class="row justify-content-center mt-4">
        <v-pagination
          v-model="page"
          :length="Math.ceil(allData.data.length / perPage)"
          :total-visible="7"
          class="py-4"
        ></v-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Loading from '../../Small/Loading'
export default {
  components: {
    Loading,
  },
  data() {
    return {
      search: null,
      page: 1,
      perPage: 12,
    }
  },
  computed: {
    ...mapGetters({ allData: 'movies/getData' }),
    dataMovies() {
      return this.allData.data.slice(
        (this.page - 1) * this.perPage,
        this.page * this.perPage
      )
    },
  },
  async mounted() {
    await this.getAll()
  },
  methods: {
    ...mapActions({ getAll: 'movies/getAll', searching: 'movies/search' }),
    searchMovies() {
      if (this.search === '' || this.search === null) {
        return this.getAll()
      }
      this.searching(this.search)
    },
  },
}
</script>
