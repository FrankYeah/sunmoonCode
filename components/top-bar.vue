<template>
  <div
  :class="['top', {'top-scroll': isScroll}]"
  >
    <div class="top-box">
      <div class="top-left">

        <a v-if="$route.name != 'index'" href="./">
          <img class="top-small-logo" src="@/assets/img/icon/icon-single-logo.png" alt="sunmoon">
        </a>
        <a v-else href="./">
          <img class="top-logo" src="@/assets/img/sunmoon-logo-bg.png" alt="sunmoon">
        </a>
        
        <div v-if="$route.name != 'index'" class="top-search">
          <img class="top-search-icon" src="@/assets/img/icon/icon-search.svg" alt="search">
          <input v-model="searchText" @click="focusInput" @keypress.enter="goToCompany(searchText)"
            class="top-search-input" type="text" placeholder="Company name"
          >
          <div v-if="showAutocomplete" class="top-search-popup">
            <div v-for="(company, index) in companyList"
              :key="index"
              @click="goToCompany(company.name)"
              class="top-search-recommend"
            >{{ company.name }}</div>
          </div>
        </div>

        <div v-if="showRwdInput" class="top-rwd-search-popup">
          <div class="top-rwd-search-input-box">
            <img @click="showRwdInput = false" class="top-rwd-search-arrow" src="@/assets/img/icon/grey-arrow.svg" alt="arrow">
            <input v-model="searchText" ref="rwdInput"
              @keypress.enter="goToCompany(searchText)"
              class="top-rwd-search-input"  type="text"
            >
            <img @click="searchText = ''"  class="top-rwd-search-close"  src="@/assets/img/icon/icon-close.svg" alt="close">
          </div>
          <div v-for="(company, index) in companyList"
            :key="index"
            @click="goToCompany(company.name)"
            class="top-rwd-search-text-box"
          >
            <img class="top-rwd-search-search"  src="@/assets/img/icon/icon-search.svg" alt="search">
            <div class="top-rwd-search-text" >{{ company.name }}</div>
          </div>
          
        </div>

      </div>

      <img @click="isMenu = !isMenu"
        class="top-menu" src="@/assets/img/icon/rwd-menu.svg" alt="menu"
      >
      <div v-if="isMenu" class="top-right">
        <a class="top-link" href="./">
          <div>HOME</div>
        </a>
        <a class="top-link" href="./about">
          <div>ABOUT</div>
        </a>
        <div @click="isDark = !isDark" class="top-switch">
          <img v-if="!isDark" class="top-sun" src="@/assets/img/icon/icon-sun.svg" alt="sun">
          <img v-else class="top-moon" src="@/assets/img/icon/icon-moon.svg" alt="moon">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {

  },
  props: {
    
  },
  data: () => ({
    screenWidth: null,
    isMenu: true,
    showRwdInput: false,
    searchText: '',
    isDark: false,
    showAutocomplete: false,
    isScroll: false,
    companyList: [
      { name: 'Apple inc. | Consumer electronic・Cupertino, California' },
      { name: 'Adobe | Consumer electronic・San Francisco, CA' },
      { name: 'Airbnb | Internet・San Francisco, CA' },
      { name: 'Airbnb | Internet・San Francisco, CA' },
      { name: 'Airbnb | Internet・San Francisco, CA' }
    ]
  }),
  mounted () {
    this.screenWidth = window.screen.width
    if (this.screenWidth < 500) {
      this.isMenu = false
    }
    window.onscroll = () => {
      if (window.scrollY > 100) {
        this.isScroll = true
      } else {
        this.isScroll = false
      }
    }
    
    document.addEventListener('click', this.autoHide, false)
    document.addEventListener('click', this.autoHideMenu, false)
  },
  destroyed () {
    document.removeEventListener('click', this.autoHide, false)
    document.removeEventListener('click', this.autoHideMenu, false)
  },
  methods: {
    focusInput () {
      if (this.screenWidth < 500) {
        this.showRwdInput = true
        // this.$refs.rwdInput.focus()
      } else {
        this.showAutocomplete = true
      }
      
    },
    autoHide (evt) {
      if (!this.isMenu) return false
      if (!this.$el.contains(evt.target)) {
        this.isMenu = false
      }
    },
    autoHideMenu (evt) {
      if (!this.showAutocomplete) return false
      if (!this.$el.contains(evt.target)) {
        this.showAutocomplete = false
      }
    },
    goToCompany (name) {
      this.showRwdInput = false
      // this.searchText = name
      if (name == 'error') {
        this.$router.push({
          path: 'noResult',
          query: {
            step: name
          }
        })
      } else {
        this.$router.push({
          path: 'company',
          query: {
            step: name
          }
        })
      }
    },
  },
  watch: {
    '$route.name': {
      handler: function(search) {

      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>

  .top {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 92px;
    background-color: white;
    z-index: 2;

    &-desktop {
      display: block;
    }

    &-rwd {
      display: none;
    }

    &-scroll {
      box-shadow: 0px 3px 12px #00000014;
    }

    &-box {
      max-width: 1100px;
      width: 100%;
      height: 92px;
      margin: auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    // left

    &-left {
      display: flex;
      align-items: center;
      height: 92px;
    }

    &-logo {
      width: 176px;
      height: auto;
      margin-right: 56px;

      &:hover {
        opacity: 0.8;
      }
    }

    &-small-logo {
      display: none;
      width: 48px;
      height: auto;
    }

    &-search {
      position: relative;
    }

    &-search-icon {
      position: absolute;
      top: 14px;
      left: 20px;
    }

    &-search-input {
      width: 319px;
      height: 44px;
      padding-left: 58px;
      border: 1px solid #D2D2D2;
      border-radius: 31px;
      font-size: 16px;
    }

    &-search-popup {
      position: absolute;
      top: 58px;
      left: 0px;
      width: 538px;
      padding: 16px 0px;
      box-shadow: 0px 3px 24px #00000029;
      border-radius: 15px;
      background-color: white;
      z-index: 1;
    }

    &-search-recommend {
      padding: 10px 45px;
      cursor: pointer;

      &:hover {
        opacity: 0.8;
        background: #F7F7F7;
      }
    }



    // right

    &-menu {
      display: none;
    }

    &-right {
      display: flex;
      align-items: center;
      height: 92px;
    }

    &-link {
      margin-right: 48px;
      letter-spacing: 0.8px;
      cursor: pointer;

      &:hover {
        opacity: 0.8;
      }

      div {
        color: #646464;
      }
    }

    &-switch {
      display: flex;
      align-items: center;
      width: 85px;
      height: 40px;
      box-shadow: 0px 0px 5px #FDC43F80;
      border: 1px solid #FDC43F;
      border-radius: 22px;
      cursor: pointer;

      img {
        
        &:hover {
          opacity: 0.8;
        }
      }
    }

    &-sun {
      margin-left: 8px;
      transition: all 0.2s;
    }

    &-moon {
      margin-left: 42px;
      transition: all 0.2s;
    }

  }

@media( max-width: 500px ){

  .top {
    height: 64px;

    &-desktop {
      display: none;
    }

    &-rwd {
      display: block;
    }

    &-scroll {

    }

    &-box {
      max-width: initial;
      width: initial;
      margin: auto 20px;
      height: 64px;
    }

    // left

    &-left {
      height: 64px;
    }

    &-logo {
      width: 160px;
    }

    &-small-logo {    
      display: block;
      margin-right: 29px;
    }

    &-search {

    }

    &-search-icon {
      width: 16px;
      height: auto;
      top: 11px;
      left: 16px;
    }

    &-search-input {
      width: 158px;
      height: 34px;
      padding-left: 40px;
    }

    &-search-popup {

    }

    &-search-recommend {

    }

    // rwd input popup

    &-rwd-search-popup {
      position: fixed;
      top: 0px;
      left: 0px;
      width: 100vw;
      height: 100vh;
      background-color: #fff;
    }

    &-rwd-search-input-box {
      height: 42px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 37px;
    }

    &-rwd-search-arrow {
      position: absolute;
      top: 40px;
      left: 12px;
      width: 14px;
      height: auto;
      transform: rotate(180deg);
    }

    &-rwd-search-input {
      width: calc(100% - 50px);
      padding: 0px 0px 11px 36px;
      border: 0px;
      border-bottom: 1px solid #D2D2D2;
      font-size: 20px;
    }

    &-rwd-search-close {
      position: absolute;
      top: 43px;
      right: 28px;
      width: 14px;
      height: auto;
    }

    &-rwd-search-text-box {
      display: flex;
      width: calc(100% - 48px);
      margin: 28px auto 0px;
    }

    &-rwd-search-search {
      margin-right: 18px;
    }

    &-rwd-search-text {

    }



    // right

    &-menu {
      display: block;
    }

    &-right {
      position: absolute;
      left: 0px;
      top: 74px;
      flex-direction: column;
      height: initial;
      width: 100%;
      padding:0px 0px 46px;
      background-color: #fff;
      box-shadow: 0px 6px 6px #2E2E2E14;
    }

    &-link {
      margin:0px 0px 36px;

      div {
        font-size: 16px;
      }
    }

    &-switch {


      img {

      }
    }

    &-sun {

    }

    &-moon {

    }

  }

}

</style>