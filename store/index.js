export const strict = false

export const state = () => ({
  lightMode: true,
  searchCompany: {}
})

export const mutations = {
  switchMode (state, data) {
    state.lightMode = data
  },
  setSearchCompany (state, data) {
    state.searchCompany = data
  }
}
