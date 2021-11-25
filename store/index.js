export const strict = false

export const state = () => ({
  lightMode: true,
  searchCompany: {
    name: ''
  },
  apiAddress: 'http://139.162.106.118:8000'
})

export const mutations = {
  switchMode (state, data) {
    state.lightMode = data
  },
  setSearchCompany (state, data) {
    state.searchCompany = data
  }
}
