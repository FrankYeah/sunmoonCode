<template>
  <div
  :class="[
    'top',
    {'top-scroll': isScroll},
    {'top-dbg': !isLight},
    {'top-scroll-dark': !isLight && isScroll},
  ]"
  >
    <div class="top-box">
      <div class="top-left">

        <!-- 兩種 Logo 呈現 -->
        <router-link to="./" v-if="$route.name != 'index' && screenWidth < 500">
          <img @click="closeRwdMenu()" class="top-small-logo" src="@/assets/img/icon/icon-single-logo.png" alt="sunmoon">
        </router-link>
        <router-link to="./" v-else>
          <img v-if="isLight" @click="closeRwdMenu()" class="top-logo" src="@/assets/img/sunmoon-logo-bg.png" alt="sunmoon">
          <img v-else @click="closeRwdMenu()" class="top-logo" src="@/assets/img/sunmoon-logo-dark.png" alt="sunmoon">
        </router-link>
        
        <!-- 搜尋框 -->
        <div v-if="$route.name != 'index'" class="top-search">
          <img v-if="isLight" class="top-search-icon" src="@/assets/img/icon/icon-search.svg" alt="search">
          <img v-else class="top-search-icon" src="@/assets/img/icon/icon-search-dark.svg" alt="search">
          <input v-model="searchText" @click="focusInput" @keypress.enter="goToCompany(currentSelect)"
            :class="['top-search-input', {'top-search-input-dark': !isLight}]" type="text" placeholder="Company name"
          >
          <div v-if="showAutocomplete" :class="['top-search-popup', {'top-search-popup-dark': !isLight}]">
            <div v-for="(company, index) in companyList"
              :key="index"
              @click="goToCompany(index)"
              :class="['top-search-recommend',
                {'top-search-recommend-dark': !isLight},
                {'top-search-recommend-hover': index == currentSelect},
                {'top-search-recommend-dark-hover': !isLight && index == currentSelect}
              ]"
            >{{ company.name }}</div>
          </div>
        </div>

        <!-- g.手機版點擊搜尋框的畫面 -->
        <div v-if="showRwdInput" id="rwdSearchPopup" :class="['top-rwd-search-popup', {'top-rwd-search-popup-dark': !isLight}]">
          <div class="top-rwd-search-input-box">
            <img v-if="isLight" @click="showRwdInput = false" class="top-rwd-search-arrow" src="@/assets/img/icon/grey-arrow.svg" alt="arrow">
            <img v-else @click="showRwdInput = false" class="top-rwd-search-arrow" src="@/assets/img/icon/grey-arrow-dark.svg" alt="arrow">
            <input v-model="searchText" ref="rwdInput"
              @keypress.enter="goToCompany(0)"
              :class="['top-rwd-search-input', {'top-rwd-search-input-dark': !isLight}]" type="text"
            >
            <img @click="searchText = ''" v-if="searchText && isLight" class="top-rwd-search-close"  src="@/assets/img/icon/icon-close.svg" alt="close">
            <img @click="searchText = ''" v-if="searchText && !isLight" class="top-rwd-search-close"  src="@/assets/img/icon/icon-close-dark.svg" alt="close">
          </div>
          <div v-for="(company, index) in companyList"
            :key="index"
            @click="goToCompany(index)"
            class="top-rwd-search-text-box"
          >
            <img v-if="isLight" class="top-rwd-search-search"  src="@/assets/img/icon/icon-search.svg" alt="search">
            <img v-else class="top-rwd-search-search"  src="@/assets/img/icon/icon-search-dark.svg" alt="search">
            <div :class="['top-rwd-search-text', {'top-rwd-search-text-dark': !isLight}]">{{ company.name }}</div>
          </div>
        </div>

        <img v-if="isLight" @click="isMenu = !isMenu"
          class="top-menu" src="@/assets/img/icon/rwd-menu.svg" alt="menu"
        >
        <img v-else @click="isMenu = !isMenu"
          class="top-menu" src="@/assets/img/icon/rwd-menu-dark.svg" alt="menu"
        >

      </div>

      <!-- 右測畫面 -->
      <div v-if="isMenu" :class="['top-right', {'top-right-dark': !isLight}]">
        <router-link to="./" :class="[
          'top-link', {'top-link-dark': !isLight}, {'top-link-on': currentRoute == 'index' && isLight}, {'top-link-on-dark': currentRoute == 'index' && !isLight}
        ]">
          <div @click="closeRwdMenu()">HOME</div>
        </router-link>
        <router-link to="./about" :class="[
          'top-link', {'top-link-dark': !isLight}, {'top-link-on': currentRoute == 'about' && isLight}, {'top-link-on-dark': currentRoute == 'about' && !isLight}
        ]">
          <div @click="closeRwdMenu()">ABOUT US</div>
        </router-link>
        <div @click="isLight = !isLight" :class="['top-switch', {'top-switch-dark': !isLight}]">
          <img v-if="isLight" class="top-sun" src="@/assets/img/icon/icon-sun.svg" alt="sun">
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
    isMenu: false,
    currentSelect: -1,
    showRwdInput: false,
    searchText: '',
    isLight: true,
    showAutocomplete: false,
    isScroll: false,
    currentRoute: null,
    companyList: [
      { name: '' }
    ]
  }),
  mounted () {
    this.screenWidth = window.screen.width
    if (this.screenWidth > 500) {
      this.isMenu = true
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
    document.addEventListener('keydown', this.keydownSelect, false)
  },
  destroyed () {
    document.removeEventListener('click', this.autoHide, false)
    document.removeEventListener('click', this.autoHideMenu, false)
    document.removeEventListener('keydown', this.keydownSelect, false)
  },
  methods: {
    keydownSelect(e) {
      if(this.showAutocomplete) {
        if(e.keyCode == 38) {
          // 上 計算數值
          if(this.currentSelect != 0) {
            this.currentSelect--
            console.log(this.currentSelect)
          }
          
        } else if(e.keyCode == 40) {
          // 下 計算數值
          if(this.currentSelect != this.companyList.length - 1) {
            this.currentSelect++
          }

        } 
      }
    },
    focusInput () {
      if (this.screenWidth < 500) {
        this.isMenu = false
        this.showRwdInput = true
        // 解決無法 refs 的問題
        this.$nextTick(() => {
          this.$refs.rwdInput.focus()
        })
      } else {
        this.showAutocomplete = true
      }
      
    },
    autoHide (evt) {
      if(this.screenWidth < 500) {
        if (!this.isMenu) return false
        if (!this.$el.contains(evt.target)) {
          this.isMenu = false
        }
      }
    },
    autoHideMenu (evt) {
      if (!this.showAutocomplete) return false
      if (!this.$el.contains(evt.target)) {
        this.showAutocomplete = false
      }
    },
    closeRwdMenu () {
      if (this.screenWidth < 500) {
        this.isMenu = false
      }
    },
    goToCompany (key) {
      this.showRwdInput = false
      this.showAutocomplete = false

      if(this.companyList.length == 0) {
        return
      } else if(!this.companyList[0].name) {
        return
      }

      // 把最後搜尋的結果傳到 vuex
      this.$store.commit('setSearchCompany', this.companyList[key].data)
      this.searchText = ''

      if (key == 'error') {
        this.$router.push({
          path: '/noResult',
          query: {

          }
        })
      } else {
        this.currentSelect = -1
        this.$router.push({
          path: '/blank',
          query: {

          }
        })
      }
    },
  },
  computed: {
    // only here name it
    lightMode() { return this.$store.state.lightMode },
    searchCompany() { return this.$store.state.searchCompany },
    apiAddress() { return this.$store.state.apiAddress },
  },
  watch: {
    '$route.name': {
      handler: function(route) {
        this.currentRoute = route
      },
      deep: true,
      immediate: true
    },
    isLight: {
      handler: function(mode) {
        if (mode) {
          document.querySelector('body').setAttribute("class", "top-body-light")
        } else {
          document.querySelector('body').setAttribute("class", "top-body-dark")
        }
        this.$store.commit('switchMode', mode)
      },
    },
    showRwdInput: {
      handler: function(change) {
        if (change) {
          // 點開手機版輸入框時，要避免畫面滑動
          let mo = function (e) { e.preventDefault() }
          document.body.style.overflow='hidden'
          document.addEventListener('touchmove', mo, false)
          this.$nextTick(() => {
            document.getElementById('rwdSearchPopup').style.overflow='hidden'
            document.getElementById('rwdSearchPopup').addEventListener('touchmove', mo, {passive:false})
          })
        } else {
          let mo = function (e) { e.preventDefault() } 
          document.body.style.overflow = ''
          document.removeEventListener('touchmove', mo, false)
        }
      },
    },
    searchText: {
      handler: function(text) {
        this.$axios.get(`${this.apiAddress}/app/company/?text=${text}`)
        .then(res => {
          let temp = null
          temp = res.data
          this.companyList = []
          for (let i = 0; i < temp.length; i++) {
            this.companyList.push(
              {
                name: `${temp[i].name} | ${temp[i].industry_group} | ${temp[i].industry_subgroup}`,
                data: temp[i]
              }
            )
          }
        })
        .catch(er => {
        })
      }
    },
  }
}
</script>

<style lang="scss">

  .top {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 72px;
    background-color: white;
    z-index: 3;

    &-dbg {
      background-color: #242345;
    }

    &-body-light {
      background-color:#fff;
      color:#646464;
    }

    &-body-dark {
      background-color:#242345;
      color:#BAC0E6;
    }

    &-desktop {
      display: block;
    }

    &-rwd {
      display: none;
    }

    &-scroll {
      box-shadow: 0px 3px 12px #00000014;
    }

    &-scroll-dark {
      background-color: #28274D;
      box-shadow: 0px 3px 12px #00000029;
    }

    &-box {
      max-width: 1100px;
      width: 100%;
      height: 72px;
      margin: auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    // left

    &-left {
      display: flex;
      align-items: center;
      height: 72px;
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
      background-color: transparent;
    }

    &-search-input-dark {
      border: 1px solid #747BAA;
      color: #EAECF4;

      &::placeholder {
        color: #747BAA;
      }
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

    &-search-popup-dark {
      box-shadow: 0px 3px 24px #00000029;
      background-color:#BAC0E6;
    }

    &-search-recommend {
      padding: 10px 45px;
      text-align: left;
      cursor: pointer;

      &:hover {
        opacity: 0.8;
        background: #F7F7F7;
      }
    }

    &-search-recommend-hover {
      opacity: 0.8;
      background: #F7F7F7;
    }

    &-search-recommend-dark {
      color: #242345;

      &:hover {
        background-color: #747BAA;
        color: #EAECF4;
      }
    }

    &-search-recommend-dark-hover {
      opacity: 0.8;
      background-color: #747BAA;
      color: #EAECF4;
    }



    // right

    &-menu {
      display: none;
    }

    &-right {
      display: flex;
      align-items: center;
      height: 72px;
    }

    &-right-dark {

    }

    &-link {
      margin-right: 48px;
      letter-spacing: 1.5px;
      cursor: pointer;

      &:hover {
        opacity: 0.8;
      }

      div {
        color: #646464;
      }
    }

    &-link-dark {

      div {
        color: #ddd;
      }

    }

    &-link-on {
      
      div {
        color: #FDC43F;
        font-weight: bold;
      }
    }

    &-link-on-dark {
      
      div {
        color: #F5DD82;
        font-weight: bold;
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
    
    &-switch-dark {
      box-shadow: 0px 0px 5px #3F729F;
      border: 1px solid #3F729F;
    }

    &-sun {
      margin: 0px 0px 1px 8px;
      transition: all 0.2s;
    }

    &-moon {
      margin: 0px 0px 1px 42px;
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
      width: 100%;
      height: 64px;
      justify-content: space-between;
    }

    &-logo {
      width: 160px;
    }

    &-small-logo {    
      display: block;
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
      height: 100%;
      background-color: #fff;
      overflow: hidden;
    }

    &-rwd-search-popup-dark {
      background-color: #242345;
    }

    &-rwd-search-popup-noscroll {
      overflow: hidden;
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
      left: 27px;
      width: 14px;
      height: auto;
      transform: rotate(180deg);
    }

    &-rwd-search-input {
      width: calc(100% - 86px);
      padding: 0px 0px 11px 36px;
      border: 0px;
      border-bottom: 1px solid #D2D2D2;
      font-size: 20px;
      background-color: transparent;
    }

    &-rwd-search-input-dark {
      color: #EAECF4;
    }

    &-rwd-search-close {
      position: absolute;
      top: 43px;
      right: 26px;
      width: 14px;
      height: auto;
    }

    &-rwd-search-text-box {
      display: flex;
      align-items: center;
      width: calc(100% - 48px);
      margin: 28px auto 0px;
    }

    &-rwd-search-search {
      margin-right: 18px;
    }

    &-rwd-search-text {
      font-size: 18px;
    }

    &-rwd-search-text-dark {
      color: #EAECF4;
    }



    // right

    &-menu {
      display: block;
    }

    &-right {
      position: absolute;
      left: 0px;
      top: 64px;
      flex-direction: column;
      height: initial;
      width: 100%;
      padding: 20px 0px 23px;
      background-color: #fff;
      box-shadow: 0px 6px 6px #2E2E2E14;
    }

    &-right-dark {
      background-color: #242345;
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

@media( max-width: 340px ){

  .top {

    &-small-logo {
      margin-right: 6px;
    }

  }

}

</style>