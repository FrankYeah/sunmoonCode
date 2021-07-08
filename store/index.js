export const strict = false

export const state = () => ({
  lightMode: true
})

export const mutations = {
  switchMode (state, data) {
    state.lightMode = data
  }
}
