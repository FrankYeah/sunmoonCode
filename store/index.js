export const strict = false

export const state = () => ({
  lightMode: true,
  searchCompany: {
    name: ''
  }
})

export const mutations = {
  switchMode (state, data) {
    state.lightMode = data
  },
  setSearchCompany (state, data) {
    state.searchCompany = data
  }
}
