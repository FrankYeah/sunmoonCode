<template>
  <div @click="showAutocompleteIndex = false" class="index">

    <!-- intro -->
    <div class="index-intro">

      <!-- intro left -->
      <div class="index-intro-left">
        <div class="index-intro-head">Credit risks prediction Made simple</div>
        <div class="index-intro-text">Explore the brand new way to easily find the right company with us!</div>
        
        <div class="index-intro-search">
          <img class="index-intro-search-icon" src="@/assets/img/icon/icon-search.svg" alt="search">
          <input v-model="searchText" @click.stop="focusInput" class="index-intro-search-input" type="text">
          <div class="index-intro-search-btn">Search</div>
          <div v-if="showAutocompleteIndex" class="index-intro-search-popup">
            <div v-for="(company, index) in companyList"
              :key="index"
              @click.stop="goToCompany(company.name)"
              class="index-intro-search-recommend"
            >{{ company.name }}</div>
          </div>
        </div>

        <div class="index-intro-down">
          <div class="index-intro-down-btn"></div>
          <div class="index-intro-down-text">Learn about the Graphic rapidly</div>
        </div>
      </div>

      <!-- intro right -->
      <img class="index-intro-city" src="@/assets/img/world-map.png" alt="arrow">
      
      <div class="index-intro-talk">
        <div class="index-intro-talk-left">
          <div class="index-intro-year">JAN, 2021</div>
          <div class="index-intro-name">Valaris plc</div>
          <div class="index-intro-industry">Petroleum industry</div>
        </div>
        <div class="index-intro-talk-right">
          <img class="index-intro-arrow" src="@/assets/img/icon/arrow-green.svg" alt="arrow">
          <div class="index-intro-arrown-text">SAFE</div>
        </div>  
      </div>

    </div>

    <!-- wave -->
    <div class="index-wave">
      <img class="index-wave-img" src="@/assets/img/wave-move.svg" alt="arrow">
    </div>

    <!-- chart -->


    <!-- Technical Report -->



  </div>
</template>

<script>

export default {
  head: {
    title: '首頁',
  },
  layout: 'default',
  components: {

  },
  props: {

  },
  data () {
    return {
      searchText: '',
      showAutocompleteIndex: false,
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
    document.addEventListener('click', this.autoHideIndex, false)
  },
  destroyed () {
    document.removeEventListener('click', this.autoHideIndex, false)
  },
  computed: {

  },
  methods: {
    focusInput () {
      this.showAutocompleteIndex = true
    },
    autoHideIndex (evt) {
      if (!this.showAutocompleteIndex) return false
      if (!this.$el.contains(evt.target)) {
        this.showAutocompleteIndex = false
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

<style lang="scss" scoped>

.index {
  position: relative;
  margin: 92px 0px 159px;

  &-intro {
    position: relative;
    max-width: 1100px;
    width: 100%;
    margin: 0px auto;

    &-left {
      width: 538px;
    }

    &-head {
      font-size: 48px;
      font-weight: bold;
      color: #2E2E2E;
    }

    &-text {
      width: 500px;
      line-height: 35px;
      font-size: 20px;
      margin-top: 20px;
    }

    &-search {
      position: relative;
      margin-top: 44px;
    }

    &-search-icon {
      position: absolute;
      top: 22px;
      left: 24px;
    }

    &-search-input {
      width: 320px;
      height: 62px;
      padding: 0px 118px 0px 58px;
      border: 1px solid #D2D2D2;
      border-radius: 31px;
      font-size: 16px;

      &:focus {
        outline: none;
      }
    }

    &-search-btn {
      position: absolute;
      top: 9px;
      right: 49px;
      width: 100px;
      height: 48px;
      line-height: 48px;
      color: white;
      text-align: center;
      background: #FDC43F;
      box-shadow: 3px 0px 18px #F5DD82;
      border-radius: 31px;
      cursor: pointer;

      &:hover {
        opacity: 0.8;
      }
    }

    &-search-popup {
      position: absolute;
      top: 74px;
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

    &-down {
      display: flex;
      align-items: center;
      margin-top: 148px;
      cursor: pointer;

      &:hover {
        opacity: 0.8;
      }
    }

    &-down-btn {
      width: 48px;
      height: 48px;
      position: relative;
      border: 1px solid #9C9C9C;
      border-radius: 100%;

      &:before {
        content: '';
        position: absolute;
        left: 16px;
        top: 21px;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 9px 7px 0 7px;
        border-color: #9C9C9C transparent transparent transparent;
      }
    }

    &-down-text {
      width: 132px;
      margin-left: 16px;
    }

    // intro right

    &-city {
      position: absolute;
      right: -80px;
      top: 0px;
    }

    &-talk {
      position: absolute;
      top: 100px;
      right: 138px;
      width: 314px;
      height: 140px;
      display: flex;
      justify-content: space-between;
      background-image: url('../assets/img/icon/icon-talk.svg');
      background-repeat: no-repeat;
      background-size: cover;
      background-position-x: center;
      background-position-y: top;
    }

    &-talk-left {
      padding: 40px 0px 0px 45px;
    }

    &-year {
      font-size: 14px;
      color: #9C9C9C;
    }

    &-name {
      font-size: 20px;
      color: #EFB86D;
      margin-top: 4px;
    }

    &-industry {
      font-size: 14px;
      color: #646464;
      margin-top: 4px;
    }

    &-talk-right {
      padding: 36px 50px 0px 0px;
    }

    &-arrow {
      
    }

    &-arrown-text {
      font-size: 14px;
      color: #50E3C1;
    }
  
  }

  // wave

  &-wave {
    position: relative;
    max-width: 1100px;
    width: 100%;
    height: 500px;
    margin: 0px auto;
    z-index: -1;
    
    &-img {
      position: absolute;
      top: -255px;
      right: -147px;
    }
  }

}

@media( max-width: 500px ){

  .index {
    

  }

}

</style>
