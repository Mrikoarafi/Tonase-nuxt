// inisial/simpan
const state = () => ({
  all: {
    data: [],
    details: [],
    isLoading: true,
  },
})
// mengambil data/mengeset ke state
const getters = {
  getData(state) {
    return state.all
  },
}

// mengubah state
const mutations = {
  SET_ALL_LOADING(state, payload) {
    state.all.isLoading = payload
  },
  SET_DATA(state, payload) {
    state.all.data = payload
  },
  SET_DETAILS(state, payload) {
    state.all.details = payload
  },
}

// menjalankan
const actions = {
  getAll(context, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .$get('https://imdb-api.com/en/API/MostPopularMovies/k_52gc68ar')
        .then((response) => {
          context.commit('SET_DATA', response.items)
          context.commit('SET_ALL_LOADING', false)
          resolve(response)
        })
        .catch((err) => {
          context.commit('SET_DATA', err)
        })
    })
  },
  search(context, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .$get(`https://imdb-api.com/en/API/SearchTitle/k_52gc68ar/${payload}`)
        .then((response) => {
          context.commit('SET_DATA', response.results)
          context.commit('SET_ALL_LOADING', false)
          resolve(response)
        })
        .catch((err) => {
          context.commit('SET_DATA', err)
        })
    })
  },
  getDetails(context, payload) {
    return new Promise((resolve, reject) => {
      console.log('masuk')
      this.$axios
        .$get(`https://imdb-api.com/en/API/Trailer/k_52gc68ar/${payload}`)
        .then((result) => {
          console.log('udah')
          context.commit('SET_DETAILS', result)
          context.commit('SET_ALL_LOADING', false)
          resolve(result)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
