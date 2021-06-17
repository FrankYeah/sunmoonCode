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
          <input v-model="searchText" @click.stop="focusInput" @keypress.enter="goToCompany(searchText)"
            placeholder="Company name" class="index-intro-search-input" type="text"
          >
          <div @click="goToCompany(searchText)" class="index-intro-search-btn">Search</div>
          <div v-if="showAutocompleteIndex" class="index-intro-search-popup">
            <div v-for="(company, index) in companyList"
              :key="index"
              @click.stop="goToCompany(company.name)"
              class="index-intro-search-recommend"
            >{{ company.name }}</div>
          </div>
        </div>

        
      </div>

      <!-- intro right -->
      <img class="index-intro-city" src="@/assets/img/index/map-light.png" alt="map">

    </div>

    <!-- rwd input popup -->

    <div v-if="showRwdInput" class="index-intro-rwd-search-popup">
      <div class="index-intro-rwd-search-input-box">
        <img @click="showRwdInput = false" class="index-intro-rwd-search-arrow" src="@/assets/img/icon/grey-arrow.svg" alt="arrow">
        <input v-model="searchText" ref="rwdInput"
          @keypress.enter="goToCompany(searchText)"
          class="index-intro-rwd-search-input"  type="text"
        >
        <img @click="searchText = ''"  class="index-intro-rwd-search-close"  src="@/assets/img/icon/icon-close.svg" alt="close">
      </div>
      <div v-for="(company, index) in companyList"
        :key="index"
        @click="goToCompany(company.name)"
        class="index-intro-rwd-search-text-box"
      >
        <img class="index-intro-rwd-search-search"  src="@/assets/img/icon/icon-search.svg" alt="search">
        <div class="index-intro-rwd-search-text" >{{ company.name }}</div>
      </div>
    </div>

    <!-- wave -->
    <div class="index-wave">
      <div class="index-wave-down-box">
        <div @click="scrollEvent('startChart')" :class="`index-wave-down index-wave-down-${randomNum}`">
          <div class="index-wave-down-btn"></div>
          <div class="index-wave-down-text">Learn about the Graphic rapidly</div>
        </div>
      </div>

      <img class="index-wave-img" alt="wave"
        :src="require(`@/assets/img/index/mountain-light-${randomNum}.svg`)"
        :style="[
          { backgroundImage: 'url(' + require('@/assets/img/index/mountain-light-'+ randomNum +'.svg') + ')' }
        ]"
      >
      <div @click="goToCompany('valaris')"
        :class="`index-wave-talk index-wave-talk-${randomNum}`"
      >
        <div class="index-wave-talk-left">
          <div class="index-wave-year">JAN, 2021</div>
          <div class="index-wave-name">Valaris plc</div>
          <div class="index-wave-industry">Petroleum industry</div>
        </div>
        <div class="index-wave-talk-right">
          <img class="index-wave-arrow" src="@/assets/img/icon/arrow-green.svg" alt="arrow">
          <div class="index-wave-arrown-text">SAFE</div>
        </div>  
      </div>
    </div>

    <!-- chart -->
    <div id="startChart" class="index-chart">
      <div class="index-chart-head">Get started with the chart!</div>
      <div class="index-chart-box">
        <div class="index-chart-left">
          <div class="index-chart-chart">
            <div class="index-chart-level">Level</div>
            <div class="index-chart-period">Period of time</div>
            <div id="myChart"></div>
            <div class="index-chart-horizon">Horizon</div>
          </div>
        </div>
        <div class="index-chart-right">
          <div class="index-chart-industry">Industry: Petroleum</div>
          <div class="index-chart-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis convallis id enim pharetra aliquam. Maecenas aliquet facilisis massa eu fringilla.</div>
          <a class="index-chart-btn-href" href="./about">
            <div class="index-chart-btn">Contact us for more info</div>
          </a>
          <div class="index-chart-desc">
            <div class="index-chart-desc-text">Default boundary</div>
            <div class="index-chart-desc-text-2">Lower boundary</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Technical Report -->

    <div class="index-report">
      <div class="index-report-head">Technical Report</div>
      <div class="index-report-box">
        <div class="index-report-pre">The technical reports and their associated addendum in the section explain in details the CRI’s working models for credit ratings and the implementation requirements in its operations. By design, a technical report published later includes all charges made to the earlier versions and the associate addendum. Please refer to the user guide for the chronicle of the document releasing.</div>
        <div class="index-report-title">User Guide for Technical Documents and Addenda</div>
        <div class="index-report-subtitle">2020</div>
        <div class="index-report-text">- Version 2020 Update 2 Addendum 1: Replacement of Switzerland’s 1-year and 3-month interest rates.</div>
        <div class="index-report-text">- Version 2020 Update 2</div>
        <div class="index-report-text">- Version 2020 Update 1 Addendum 1: Increasing the updating frequency for one DTD parameter from monthly to daily</div>
        <div class="index-report-text">- Version 2020 Update 1</div>
        <div class="index-report-text">- Version 2020 Update 1 Addendum 15: Replacement of stock index in Egypt</div>
        <div class="index-report-text">- Version 2017 Update 1 Addendum 14: Replacement of stock index in Italy and Ghana’s 1-year interest rate</div>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  head: {
    title: 'Intro',
  },
  layout: 'default',
  components: {

  },
  props: {

  },
  data () {
    return {
      screenWidth: null,
      showRwdInput: false,
      randomNum: 1,
      searchText: '',
      showAutocompleteIndex: false,
      companyList: [
        { name: 'Apple inc. | Consumer electronic・Cupertino, California' },
        { name: 'Adobe | Consumer electronic・San Francisco, CA' },
        { name: 'Airbnb | Internet・San Francisco, CA' },
        { name: 'Airbnb | Internet・San Francisco, CA' },
        { name: 'Airbnb | Internet・San Francisco, CA' }
      ],
      chartData: [
        {
          title: 'Nov, 2020',
          dataX: [0, 10 , 20 , 30 ,40 , 50],
          dataY1: [0.94, 0.96, 0.98, 0.95, 0.93, 0.9],
          dataY2: [0.92, 0.9, 0.87, 0.86, 0.85, 0.84]
        }
      ]
    }
  },
  mounted () {
    this.screenWidth = window.screen.width
    this.randomNum = Math.floor(Math.random()*3) + 1
    let myChart = this.$echarts.init(document.getElementById('myChart'))
    myChart.setOption(this.completeChart(
      this.chartData[0].dataX,
      this.chartData[0].dataY1,
      this.chartData[0].dataY2
    ))
  },
  destroyed () {

  },
  computed: {

  },
  methods: {
    scrollEvent (id) {
      document.getElementById(id).scrollIntoView({ behavior: 'smooth' })
    },
    focusInput () {
      if (this.screenWidth < 500) {
        this.showRwdInput = true
        // this.$refs.rwdInput.focus()
      } else {
        this.showAutocompleteIndex = true
      }
    },
    goToCompany (name) {
      // this.searchText = name
      if (name == 'error') {
        this.$router.push({
          path: '/noResult',
          query: {
            step: name
          }
        })
      } else {
        this.$router.push({
          path: '/company',
          query: {
            step: name
          }
        })
      }
    },
    completeChart (dataX, dataY1, dataY2) {
      let chart = {
        title: {
          text: ''
        },
        // 移動到 chart
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        // chart 跟四周的距離
        grid: {
          top: '30px',
          left: '30px',
          right: '30px',
          bottom: '30px',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            // 是否顯示 x 格線
            axisTick: {
              show: true
            },
            //  改變x軸顏色
            axisLine:{
              lineStyle:{
                color:'#9C9C9C'
              }
            },  
            // x 座標值的顏色/大小
            axisLabel: {
              textStyle: {
                color: '#9C9C9C',
                fontSize:'14'
              },
            }, 
            data: dataX
          }
        ],
        yAxis: [
          {
            type: 'value',
            max:Math.max(...dataY1.concat(dataY2)),
            min:Math.min(...dataY1.concat(dataY2)),
            splitNumber:3,
            // minInterval: 0.05,
            axisTick: {
              show: false
            },
            axisLine:{
              lineStyle:{
                show: false,
              }
            }, 
            axisLabel: {
              textStyle: {
                color: '#9C9C9C',
                fontSize:'14'
              },
            }, 
          }
        ],
        series: [
          {
            type: 'line',
            areaStyle: {},
            itemStyle:{
              normal:{
                color: dataY1[0] > dataY2[0] ?'rgba(80,227,193,0.3)' : 'rgba(255,119,141,0.3)'
              },
            },
            lineStyle: {
              color: dataY1[0] > dataY2[0] ?'rgba(80,227,193)' : 'rgba(255,119,141)'
            },
            data: dataY1,
          },
        {
          type: 'line',
          areaStyle: {},
          itemStyle:{
            normal:{
              color:'rgba(253,196,63,0.3)'
            },
          },
          lineStyle: {
            color: 'rgb(253,196,63)'
          },
          data: dataY2,
        },
        ]
      }
      return chart
    },

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
      z-index: 2;
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

    
    // intro right

    &-city {
      width: 630px;
      position: absolute;
      right: -98px;
      top: -38px;
      z-index: -1;
    }

  }

  // 結束 intro

  // wave

  &-wave {
    position: relative;
    width: 100%;
    height: 110px;
    margin: 160px auto 0px;
    z-index: 1;

    &-down-box {
      max-width: 1100px;
      width: 100%;
      margin: auto;
      z-index: 1;
    }

    &-down {
      position: absolute;
      display: flex;
      align-items: center;
      cursor: pointer;

      &:hover {
        opacity: 0.8;
      }
    }

    &-down-1 {
      transform: translateY(-71px);
    }

    &-down-2 {
      transform: translateY(-41px);
    }

    &-down-3 {
      transform: translateY(-97px);
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
      color: #9C9C9C;
      width: 132px;
      margin-left: 16px;
    }
    
    &-img {
      position: absolute;
      top: -239px;
      right: 0px;
      z-index: -1;
    }

    &-talk {
      position: absolute;
      top: -397px;
      width: 314px;
      height: 140px;
      display: flex;
      justify-content: space-between;
      background-image: url('../assets/img/icon/icon-talk.svg');
      background-repeat: no-repeat;
      background-size: cover;
      background-position-x: center;
      background-position-y: top;
      cursor: pointer;

      &:hover {
        opacity: 0.8;
      }
    }

    &-talk-1 {
      right: 287px;
    }

    &-talk-2 {
      right: 228px;
    }

    &-talk-3 {
      right: 102px;
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
      font-weight: bold;
      color: #50E3C1;
    }


  }

  // chart

  &-chart {
    position: relative;
    max-width: 1100px;
    width: 100%;
    margin: 180px auto 0px auto;

    &-head {
      font-size: 40px;
      font-weight: bold;
      text-align: center;
    }
    
    &-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 48px;
      padding: 60px 72px 60px 4px;
      box-shadow: 0px 3px 6px #00000014;
      border: 1px solid #EDEDED;
      border-radius: 10px;
    }
    
    &-left {
      width: 590px;
      text-align: center;
    }
    
    &-chart {
      position: relative;
      margin-left: 50px;
    }

    #myChart{
      width: 580px;
      height: 352px;
    }

    &-level {
      position: absolute;
      left: -30px;
      top: 180px;
      color: #9C9C9C;
      transform: rotate(270deg);
    }

    &-period {
      margin-left: 70px;
      font-size: 20px;
      color: #9C9C9C;
    }

    &-horizon {
      margin-left: 70px;
      text-align: center;
      color: #9C9C9C;
    }
    
    &-right {
      width: 344px;
    }
    
    &-industry {
      font-size: 20px;
    }
    
    &-text {
      margin-top: 16px;
      line-height: 24px;
    }
    
    &-btn {
      width: 344px;
      height: 48px;
      line-height: 48px;
      margin-top: 51px;
      border: 1px solid #D2D2D2;
      font-size: 14px;
      color: #646464;
      text-align: center;
      cursor: pointer;

      &:hover {
        opacity: 0.8;
      }
    }
    
    &-desc {
      display: flex;
      justify-content: space-between;
      margin-top: 37px;
    }
    
    &-desc-text {
      position: relative;
      padding-left: 32px;

      &:before {
        content: '';
        position: absolute;
        left: 0px;
        top: 1px;
        width: 16px;
        height: 16px;
        border-radius: 100%;
        background-color: #FF4866;
      }
    }

    &-desc-text-2 {
      position: relative;

      &:before {
        content: '';
        position: absolute;
        left: -32px;
        top: 1px;
        width: 16px;
        height: 16px;
        border-radius: 100%;
        background-color: #FDC43F;
      }
    }
  }

  // Technical Report

  &-report {
    max-width: 1100px;
    width: 100%;
    margin: 80px auto 0px auto;

    &-head {
      font-size: 40px;
      font-weight: bold;
    }

    &-box {
      margin-top: 48px;
      padding: 64px 40px;
      border: 1px solid #D2D2D2;
    }
    
    &-pre {
      line-height: 20px;
      color: #9C9C9C;
    }
    
    &-title {
      margin-top: 64px;
      font-size: 20px;
    }
    
    &-subtitle {
      margin-top: 32px;
      font-size: 20px;
    }
    
    &-text {
      margin-top: 32px;
      color: #9C9C9C;
    }
  }

}

@media( max-width: 500px ){

  .index {
    margin: 140px 0px 128px;

    &-intro {
      max-width: initial;
      width: calc(100% - 40px);

      &-left {
        width: auto;
      }

      &-head {
        font-size: 24px;
      }

      &-text {
        width: initial;
        margin-top: 16px;
        font-size: 16px;
      }

      &-search {
        margin: 36px auto 0px;
        text-align: center;
      }

      &-search-icon {
        width: 22px;
        top: 19px;
        left: 32px;
      }

      &-search-input {
        padding: 0px 0px 0px 58px;
        width: calc(100% - 74px);
        height: 58px;
        padding: 0px 0px 0px 46px;
      }

      &-search-btn {
        top: 8px;
        right: 18px;
        width: 80px;
        height: 44px;
        line-height: 44px;
        font-size: 16px;
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
        z-index: 2;
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
        width: calc(100% - 48px);
        margin: 28px auto 0px;
      }

      &-rwd-search-search {
        margin-right: 18px;
      }

      &-rwd-search-text {

      }

      // rwd


      // intro right

      &-city {
        width: 80%;
        top: -79px;
        right: -20px;
      }

    }

    // 結束 intro

    // wave

    &-wave {
      margin-top: 107px;
      z-index: 1;

      &-down-box {
        max-width: initial;
        width: calc(100% - 40px);
      }

      &-down {
        margin-top: 0px;
        transform: translateY(-13px);
      }

      &-down-1 {
        transform: translate(-14px, 12px);
      }

      &-down-2 {
        transform: translate(-14px, -12px);
      }

      &-down-3 {

      }

      &-down-btn {
        width: 34px;
        height: 34px;

        &:before {
          left: 12px;
          top: 15px;
          border-width: 6px 5px 0 5px;
        }
      }

      &-down-text {
        margin-left: 8px;
      }
      
      &-img {
        top: 0px;
        right: 0xpx;
        width: 500px;
        background-image: url('../assets/img/icon/icon-talk.svg');
        background-repeat: no-repeat;
        background-size: cover;
        background-position-x: center;
        background-position-y: top;
      }

      &-talk {
        top: -85px;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        width: 184px;
        height: 103px;
      }

      &-talk-1 {
        right: 66px;
      }

      &-talk-2 {
        right: 41px;
      }

      &-talk-3 {
        right: 0px;
      }

      &-talk-left {
        padding: 0px;
        margin-top: 23px;
      }

      &-year {
        display: none;
      }

      &-name {
        font-size: 16px;
      }

      &-industry {
        display: none;
      }

      &-talk-right {
        padding: 0px;
        margin-top: 2px;
      }

      &-arrow {
        display: none;
      }

      &-arrown-text {

      }


    }

    // chart

    &-chart {
      max-width: initial;
      width: calc(100% - 42px);
      margin-top: 95px;

      &-head {
        font-size: 20px;
      }
      
      &-box {
        flex-direction: column;
        margin-top: 36px;
        padding: 24px 14px;
      }
      
      &-left {
        width: calc(100% - 0px);
      }
      
      &-chart {
        margin-left: 0px;
      }

      #myChart{
        width: calc(100% - 0px);
        height: 260px;
      }

      &-level {
        display: none;
      }

      &-period {
        font-size: 14px;
        margin: 0px;
      }

      &-horizon {
        display: none;
      }
      
      &-right {
        display: flex;
        flex-direction: column;
        width: initial;
      }
      
      &-industry {
        order: 2;
        margin-top: 24px;
        font-size: 16px;
      }
      
      &-text {
        order: 3;
      }

      &-btn-href {
        position: absolute;
        left: 0px;
        bottom: -78px;
      }
      
      &-btn {
        width: calc(100vw - 42px);
      }
      
      &-desc {
        order: 1;
        margin-top: 0px;
        color: #D2D2D2;
        font-size: 16px;
      }
      
      &-desc-text {
        padding-left: 18px;

        &:before {
          top: 4px;
          width: 12px;
          height: 12px;
        }
      }

      &-desc-text-2 {
        padding-left: 18px;

        &:before {
          top: 4px;
          left: 0px;
          width: 12px;
          height: 12px;
        }
      }
    }

    // Technical Report

    &-report {
      max-width: initial;
      width: calc(100vw - 42px);
      margin-top: 136px;

      &-head {
        font-size: 20px;
        text-align: center;
      }

      &-box {
        margin-top: 36px;
        padding: 40px 20px;
      }
      
      &-pre {

      }
      
      &-title {
        font-size: 16px;
      }
      
      &-subtitle {
        font-size: 16px;
      }
      
      &-text {

      }
    }

  }
  

}

</style>
