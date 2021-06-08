<template>
  <div class="top">

    <div class="top-left">
      <a href="./">
        <img class="top-logo" src="@/assets/img/sunmoon-logo.png" alt="sunmoon">
      </a>
      <div class="top-search">
        <img class="top-search-icon" src="@/assets/img/icon/icon-search.svg" alt="search">
        <input v-model="searchText" @click="focusInput" class="top-search-input" type="text">
        <div v-if="showAutocomplete" class="top-search-popup">
          <div v-for="(company, index) in companyList"
            :key="index"
            @click="goToCompany(company.name)"
            class="top-search-recommend"
          >{{ company.name }}</div>
        </div>
      </div>
    </div>

    <div class="top-right">
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
</template>

<script>
export default {
  components: {

  },
  props: {
    
  },
  data () {
    return {
      searchText: '',
      isDark: false,
      showAutocomplete: false,
      companyList: [
        { name: 'Apple inc. | Consumer electronic・Cupertino, California' },
        { name: 'Adobe | Consumer electronic・San Francisco, CA' },
        { name: 'Airbnb | Internet・San Francisco, CA' },
        { name: 'Airbnb | Internet・San Francisco, CA' },
        { name: 'Airbnb | Internet・San Francisco, CA' }
      ]
    }
  },
  mounted () {
    document.addEventListener('click', this.autoHide, false)
  },
  destroyed () {
    document.removeEventListener('click', this.autoHide, false)
  },
  computed: {

  },
  methods: {
    focusInput () {
      this.showAutocomplete = true
    },
    autoHide (evt) {
      if (!this.showAutocomplete) return false
      if (!this.$el.contains(evt.target)) {
        this.showAutocomplete = false
      }
    },
    goToCompany (name) {
      // this.searchText = name
      this.$router.push({
        path: './company',
        query: {
          step: name
        }
      })
    }
  },
  watch: {
    
  }
}
</script>

<style lang="scss">

  .top {
    max-width: 1100px;
    width: 100%;
    margin: 39px auto;
    display: flex;
    justify-content: space-between;
    align-items: center;

    // left

    &-left {
      display: flex;
      align-items: center;
    }

    &-logo {
      margin-right: 56px;
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

      &:focus {
        outline: none;
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

    &-search-recommend {
      padding: 10px 45px;
      cursor: pointer;

      &:hover {
        opacity: 0.8;
        background: #F7F7F7;
      }
    }

    // right

    &-right {
      display: flex;
      align-items: center;
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

      img &:hover {
        opacity: 0.8;
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

  }

}

</style>