<template>
  <div class="row vh-100 py-5">
    <Loading v-if="allData.isLoading" value="true" />
    <div class="col-9">
      <iframe
        :src="allData.details.linkEmbed"
        width="100%"
        height="100%"
        allowfullscreen="true"
        mozallowfullscreen="true"
        webkitallowfullscreen="true"
        frameborder="no"
        scrolling="no"
      ></iframe>
    </div>
    <div class="col-3">
      <h3>{{ allData.details.title }}</h3>
      <p class="grey--text">Year : {{ allData.details.year }}</p>
      <p>Description : {{ allData.details.videoDescription }}</p>
      <button
        class="btn btn-sm btn-primary"
        :disabled="buttonDisabled"
        @click="AddFavorite(allData.details)"
      >
        Add to Favorite
      </button>
      <br />
      <NuxtLink to="/" class="text-decoration-none">
        <button class="btn btn-sm btn-success mt-5">Back</button>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Loading from '../../../components/Small/Loading'
export default {
  name: 'DetailsMovie',
  components: {
    Loading,
  },
  data() {
    return {
      id: this.$route.params.id,
      valueLocalStorage: null,
      buttonDisabled: true,
    }
  },
  computed: {
    ...mapGetters({ allData: 'movies/getData' }),
  },
  mounted() {
    this.takeLocalStorage()
  },

  methods: {
    ...mapActions({ getDetails: 'movies/getDetails' }),
    async takeLocalStorage() {
      const take = localStorage.getItem('favoriteFilms')
      if (!take) {
        this.getDetails(this.id)
        this.buttonDisabled = false
        return
      }
      const changeToParse = JSON.parse(take)
      this.valueLocalStorage = changeToParse
      await this.getDetails(this.id)
      this.ButtonDisabled()
    },
    AddFavorite(value) {
      const takeLocalStorage = localStorage.getItem('favoriteFilms')
      if (!takeLocalStorage) {
        // eslint-disable-next-line prefer-const
        let arraySet = []
        arraySet.push(value)
        return localStorage.setItem('favoriteFilms', JSON.stringify(arraySet))
      }
      const changeToParse = JSON.parse(takeLocalStorage)
      changeToParse.push(value)
      localStorage.setItem('favoriteFilms', JSON.stringify(changeToParse))
      this.buttonDisabled = true
    },
    ButtonDisabled() {
      if (!this.valueLocalStorage) {
        return
      }
      const value = this.valueLocalStorage.find(
        (x) => x.title === this.allData.details.title
      )
      if (value === undefined) {
        this.buttonDisabled = false
      }
    },
  },
}
</script>
