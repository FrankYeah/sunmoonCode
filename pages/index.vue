<template>
  <div @click="showAutocompleteIndex = false" class="index">

    <!-- intro -->
    <div class="index-intro">

      <!-- intro left -->
      <div class="index-intro-left">
        <div :class="['index-intro-head', {'index-intro-head-dark': !isLight}]">Credit risks prediction Made simple</div>
        <div class="index-intro-text">Explore the brand new way to easily find the right company with us!</div>
        
        <div class="index-intro-search">
          <img v-if="isLight" class="index-intro-search-icon" src="@/assets/img/icon/icon-search.svg" alt="search">
          <img v-else class="index-intro-search-icon" src="@/assets/img/icon/icon-search-dark.svg" alt="search">
          <input v-model="searchText" @click.stop="focusInput" @keypress.enter="goToCompany(searchText)"
            placeholder="Company name" :class="['index-intro-search-input', {'index-intro-search-input-dark': !isLight}]" type="text"
          >
          <div @click="goToCompany(searchText)" :class="['index-intro-search-btn', {'index-intro-search-btn-dark': !isLight}]">Search</div>
          <div v-if="showAutocompleteIndex" :class="['index-intro-search-popup', {'index-intro-search-popup-dark': !isLight}]">
            <div v-for="(company, index) in companyList"
              :key="index"
              @click.stop="goToCompany(company.name)"
              :class="['index-intro-search-recommend', {'index-intro-search-recommend-dark': !isLight}]"
            >{{ company.name }}</div>
          </div>
        </div>

        
      </div>

      <!-- intro right -->
      <img v-if="isLight" class="index-intro-city" src="@/assets/img/index/map-light.png" alt="map">
      <img v-else class="index-intro-city" src="@/assets/img/index/map-dark.png" alt="map">

    </div>

    <!-- rwd input popup -->

    <div v-if="showRwdInput" id="rwdSearchPopups" :class="['index-intro-rwd-search-popup', {'index-intro-rwd-search-popup-dark': !isLight}]">
      <div class="index-intro-rwd-search-input-box">
        <img v-if="isLight" @click="showRwdInput = false" class="index-intro-rwd-search-arrow" src="@/assets/img/icon/grey-arrow.svg" alt="arrow">
        <img v-else @click="showRwdInput = false" class="index-intro-rwd-search-arrow" src="@/assets/img/icon/grey-arrow-dark.svg" alt="arrow">
        <input v-model="searchText" ref="rwdInputs"
          @keypress.enter="goToCompany(searchText)"
          :class="['index-intro-rwd-search-input', {'index-intro-rwd-search-input-dark': !isLight}]" type="text"
        >
        <img @click="searchText = ''" v-if="searchText && isLight"  class="index-intro-rwd-search-close"  src="@/assets/img/icon/icon-close.svg" alt="close">
        <img @click="searchText = ''" v-if="searchText && !isLight"  class="index-intro-rwd-search-close"  src="@/assets/img/icon/icon-close-dark.svg" alt="close">
      </div>
      <div v-for="(company, index) in companyList"
        :key="index"
        @click="goToCompany(company.name)"
        class="index-intro-rwd-search-text-box"
      >
        <img v-if="isLight" class="index-intro-rwd-search-search"  src="@/assets/img/icon/icon-search.svg" alt="search">
        <img v-else class="index-intro-rwd-search-search"  src="@/assets/img/icon/icon-search-dark.svg" alt="search">
        <div :class="['index-intro-rwd-search-text', {'index-intro-rwd-search-text-dark': !isLight}]">{{ company.name }}</div>
      </div>
    </div>

    <!-- wave -->
    <div class="index-wave">
      <div class="index-wave-down-box">
        <div @click="scrollEvent('startChart')" :class="`index-wave-down index-wave-down-${randomNum}`">
          <div :class="['index-wave-down-btn', {'index-wave-down-btn-dark': !isLight}]"></div>
          <div :class="['index-wave-down-text', {'index-wave-down-text-dark': !isLight}]">Learn about the Graphic rapidly</div>
        </div>
      </div>

      <div :class="`index-wave-img index-wave-img-${randomNum}`"
        :style="[isLight ? {'backgroundImage': 'url(' + require('@/assets/img/index/mountain-light-'+ randomNum +'.svg') + ')'}
          : {'backgroundImage': 'url(' + require('@/assets/img/index/mountain-dark-'+ randomNum +'.svg') + ')'}]
        "
      >

        <div @click="goToCompany('valaris')"
          :class="`index-wave-talk index-wave-talk-${randomNum}`"
        >
          <div class="index-wave-talk-left">
            <div :class="['index-wave-year', {'index-wave-year-dark': !isLight}]">JAN, 2021</div>
            <div :class="['index-wave-name', {'index-wave-name-dark': !isLight}]">Valaris plc</div>
            <div :class="['index-wave-industry', {'index-wave-industry-dark': !isLight}]">Petroleum industry</div>
          </div>
          <div class="index-wave-talk-right">
            <img class="index-wave-arrow" src="@/assets/img/icon/arrow-green.svg" alt="arrow">
            <div class="index-wave-arrow-text">SAFE</div>
          </div>  
        </div>
      
      </div>

    </div>
    

    <!-- chart -->
    <div class="index-chart">
      <div :class="['index-chart-dot-1', {'index-chart-small-dot-dark': !isLight}]"></div>
      <div :class="['index-chart-dot-2', {'index-chart-small-dot-dark': !isLight}]"></div>
      <div :class="['index-chart-dot-3', {'index-chart-small-dot-dark': !isLight}]"></div>
      <div :class="['index-chart-dot-4', {'index-chart-small-dot-dark': !isLight}]"></div>
      <div :class="['index-chart-dot-5', {'index-chart-small-dot-dark': !isLight}]"></div>
      <div :class="['index-chart-dot-6', {'index-chart-dot-dark': !isLight}]"></div>
      <div class="index-chart-float" id="startChart"></div>
      <div  class="index-chart-head">Get started with the chart!</div>
      <div :class="['index-chart-box', {'index-chart-box-dark': !isLight}]">
        <div :class="['index-chart-left', {'index-chart-left-dark': !isLight}]">
          <div class="index-chart-chart">
            <div class="index-chart-level">Level</div>
            <div :class="['index-chart-period', {'index-chart-period-dark': !isLight}]">Period of time</div>
            <div id="myChart"></div>
            <div class="index-chart-horizon">Horizon</div>
          </div>
        </div>
        <div class="index-chart-right">
          <div class="index-chart-industry">Industry: Petroleum</div>
          <div class="index-chart-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis convallis id enim pharetra aliquam. Maecenas aliquet facilisis massa eu fringilla.</div>
          <router-link to="./about" class="index-chart-btn-href">
            <div :class="['index-chart-btn', {'index-chart-btn-dark': !isLight}]">Contact us for more info</div>
          </router-link>
          <div :class="['index-chart-desc', {'index-chart-desc-dark': !isLight}]">
            <div :class="[
              'index-chart-desc-text', {'index-chart-desc-text-dark': !isLight},
              {'index-chart-desc-text-3': chartData[0].dataY1[0] > chartData[0].dataY2[0] },
              {'index-chart-desc-text-3-dark': chartData[0].dataY1[0] > chartData[0].dataY2[0] && !isLight }
            ]">Default boundary</div>
            <div :class="['index-chart-desc-text-2', {'index-chart-desc-text-2-dark': !isLight}]">Lower boundary</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Technical Report -->

    <div class="index-report">
      <div :class="['index-report-dot-1', {'index-report-dot-dark': !isLight}]"></div>
      <div class="index-report-head">Technical Report</div>
      <div :class="['index-report-box', {'index-report-box-dark': !isLight}]">
        <div :class="['index-report-pre', {'index-report-pre-dark': !isLight}]">The technical reports and their associated addendum in the section explain in details the CRI’s working models for credit ratings and the implementation requirements in its operations. By design, a technical report published later includes all charges made to the earlier versions and the associate addendum. Please refer to the user guide for the chronicle of the document releasing.</div>
        <div class="index-report-title">User Guide for Technical Documents and Addenda</div>
        <div class="index-report-subtitle">2020</div>
        <div :class="['index-report-text', {'index-report-text-dark': !isLight}]">- Version 2020 Update 2 Addendum 1: Replacement of Switzerland’s 1-year and 3-month interest rates.</div>
        <div :class="['index-report-text', {'index-report-text-dark': !isLight}]">- Version 2020 Update 2</div>
        <div :class="['index-report-text', {'index-report-text-dark': !isLight}]">- Version 2020 Update 1 Addendum 1: Increasing the updating frequency for one DTD parameter from monthly to daily</div>
        <div :class="['index-report-text', {'index-report-text-dark': !isLight}]">- Version 2020 Update 1</div>
        <div :class="['index-report-text', {'index-report-text-dark': !isLight}]">- Version 2020 Update 1 Addendum 15: Replacement of stock index in Egypt</div>
        <div :class="['index-report-text', {'index-report-text-dark': !isLight}]">- Version 2017 Update 1 Addendum 14: Replacement of stock index in Italy and Ghana’s 1-year interest rate</div>
      </div>
    </div>

  </div>
</template>

<script>

import * as echarts from 'echarts'
export default {
  head: {
    title: 'Sunmoon',
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
    this.drawChart()
  },
  destroyed () {

  },
  computed: {
    isLight() { return this.$store.state.lightMode },
  },
  methods: {
    drawChart () {
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      if (this.isLight) {
        myChart.setOption(this.completeChart(
          this.chartData[0].dataX,
          this.chartData[0].dataY1,
          this.chartData[0].dataY2
        ), true)
      } else {
        myChart.setOption(this.completeChartDark(
          this.chartData[0].dataX,
          this.chartData[0].dataY1,
          this.chartData[0].dataY2
        ), true)
      }
    },
    scrollEvent (id) {
      document.getElementById(id).scrollIntoView({ behavior: 'smooth' })
    },
    focusInput () {
      if (this.screenWidth < 500) {
        this.showRwdInput = true
        // 解決無法 refs 的問題
        this.$nextTick(() => {
          this.$refs.rwdInputs.focus()
        })
      } else {
        this.showAutocompleteIndex = true
      }
    },
    goToCompany (name) {
      let mo = function (e) { e.preventDefault() } 
      document.body.style.overflow = ''
      document.removeEventListener('touchmove', mo, false)
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
            areaStyle: {
              normal:{
                // 颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { 
                  offset: 0,
                  color: dataY1[0] > dataY2[0] ?'rgba(80,227,193,0.3)' : 'rgba(255,119,141,0.3)'
                  },
                  {
                    offset: .43,
                    color: dataY1[0] > dataY2[0] ?'rgba(80,227,193,0.3)' : 'rgba(255,119,141,0.3)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(253,196,63,0.3)'
                  }
                ])
              }
            },
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
    completeChartDark (dataX, dataY1, dataY2) {
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
                color:'#A5ABD6'
              }
            },  
            // x 座標值的顏色/大小
            axisLabel: {
              textStyle: {
                color: '#A5ABD6',
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
            splitLine: {
              show: true,
              //  改變軸線顏色
              lineStyle: {
                  color: ['#A5ABD6']
              }                            
            },
            axisLabel: {
              textStyle: {
                color: '#A5ABD6',
                fontSize:'14'
              },
            }, 
          }
        ],
        series: [
          {
            type: 'line',
            areaStyle: {
              normal:{
                // 颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { 
                  offset: 0,
                  color: dataY1[0] > dataY2[0] ?'rgba(80,227,193,0.3)' : 'rgba(255,119,141,0.3)'
                  },
                  {
                    offset: .43,
                    color: dataY1[0] > dataY2[0] ?'rgba(80,227,193,0.3)' : 'rgba(255,119,141,0.3)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(47,46,78,0.3)'
                  }
                ])
              }
            },
            itemStyle:{
              normal:{
                color: dataY1[0] > dataY2[0] ? 'rgba(80,227,193,0.3)' : 'rgba(255,119,141,0.3)'
              },
            },
            lineStyle: {
              color: dataY1[0] > dataY2[0] ? 'rgba(80,227,193,0.3)' : 'rgba(255,119,141,0.3)'
            },
            data: dataY1,
          },
          {
            type: 'line',
            areaStyle: {},
            itemStyle:{
              normal:{
                color:'rgba(129,146,255, 0.3)'
              },
            },
            lineStyle: {
              color: 'rgba(129,146,255, 0.3)'
            },
            data: dataY2,
          },
        ]
      }
      return chart
    },

  },
  watch: {
    showRwdInput: {
      handler: function(change) {
        if (change) {
          let mo = function (e) { e.preventDefault() }
          document.body.style.overflow='hidden'
          document.addEventListener('touchmove', mo, false)
          this.$nextTick(() => {
            document.getElementById('rwdSearchPopups').style.overflow='hidden'
            document.getElementById('rwdSearchPopups').addEventListener('touchmove', mo, {passive:false})
          })
        } else {
          let mo = function (e) { e.preventDefault() } 
          document.body.style.overflow = ''
          document.removeEventListener('touchmove', mo, false)
        }
      },
    },
    isLight: {
      handler: function(light) {
        this.drawChart()
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.index {
  position: relative;
  margin: 92px 0px 159px;

  &-dbg {
    background-color: #242345;
  }

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
      line-height: 56px;
      font-weight: bold;
      color: #2E2E2E;
    }

    &-head-dark {
      color: #EAECF4;
    }

    &-text {
      width: 500px;
      line-height: 25px;
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
      background-color: transparent;
    }

    &-search-input-dark {
      border: 1px solid #747BAA;
      color: #EAECF4;

      &::placeholder {
        color: #747BAA;
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
      background-color: #FDC43F;
      box-shadow: 3px 0px 18px #F5DD82;
      border-radius: 31px;
      cursor: pointer;

      &:hover {
        opacity: 0.8;
      }
    }

    &-search-btn-dark {
      color: #242345;
      background-color: #F5DD82;
      box-shadow: 3px 0px 18px #F5DD82;
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

    &-search-popup-dark {
      background-color: #BAC0E6;
      box-shadow: 0px 3px 24px #00000029;
    }

    &-search-recommend {
      padding: 10px 45px;
      text-align: left;
      cursor: pointer;

      &:hover {
        opacity: 0.8;
        background-color: #F7F7F7;
      }
    }

    &-search-recommend-dark {
      color: #242345;

      &:hover {
        background-color: #747BAA;
        color: #EAECF4;
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
      transform: translateY(-86px);
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

    &-down-btn-dark {
      border: 1px solid #747BAA;

      &:before {
        border-color: #747BAA transparent transparent transparent;
      }
    }

    &-down-text {
      color: #9C9C9C;
      width: 132px;
      margin-left: 16px;
      line-height: 19px;
    }

    &-down-text-dark {
      color: #747BAA;
    }
    
    &-img {
      max-width: 1400px;
      width: 100%;
      height: 370px;
      position: absolute;
      top: -239px;
      left: 50%;
      transform: translatex(-50%);
      background-repeat: no-repeat;
      background-size: contain;
      background-position-x: center;
      background-position-y: top;
      z-index: -1;
    }

    &-img-2 {
      top: -185px;
    }

    &-talk {
      position: absolute;
      top: -158px;
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

      &::before {
        content: '';
        position: absolute;
        bottom: -43px;
        left: 133px;
        width: 52px;
        height: 52px;
        background: transparent radial-gradient(closest-side at 50% 50%, #F5DD82 0%, #F5DD8280 42%, #F5DD8200 100%) 0% 0% no-repeat padding-box;
      }

      &::after {
        content: '';
        position: absolute;
        bottom: -26px;
        left: 152px;
        width: 18px;
        height: 18px;
        border-radius: 100%;
        background: #F5DD82 0% 0% no-repeat padding-box;
      }
    }

    &-talk-1 {
      right: calc(31% - 154px);
    }

    &-talk-2 {
      right: calc(26% - 156px);
    }

    &-talk-3 {
      right: calc(17% - 147px);
    }

    &-talk-left {
      padding: 47px 0px 0px 58px;
    }

    &-year {
      font-size: 14px;
      color: #9C9C9C;
    }

    &-year-dark {
      color: #A5ABD6;
    }

    &-name {
      font-size: 20px;
      color: #EFB86D;
      margin-top: 4px;
    }

    &-name-dark {
      color: #001A90;
    }

    &-industry {
      font-size: 14px;
      color: #646464;
      margin-top: 4px;
    }

    &-industry-dark {
      color: #747BAA;
    }

    &-talk-right {
      padding: 39px 55px 0px 0px;
    }

    &-arrow {
      
    }

    &-arrow-text {
      margin-left: 6.5px;
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

    &-dot-1 {
      position: absolute;
      top: -166px;
      left: 61px;
      width: 4px;
      height: 4px;
      border-radius: 100%;
      box-shadow: 0px 0px 6px #50E3C1;
      background-color: #50E3C1;
    }

    &-dot-2 {
      position: absolute;
      top: -141px;
      left: 173px;
      width: 4px;
      height: 4px;
      border-radius: 100%;
      box-shadow: 0px 0px 6px #50E3C1;
      background-color: #50E3C1;
    }

    &-dot-3 {
      position: absolute;
      top: 10px;
      left: 138px;
      width: 4px;
      height: 4px;
      border-radius: 100%;
      box-shadow: 0px 0px 6px #50E3C1;
      background-color: #50E3C1;
    }

    &-dot-4 {
      position: absolute;
      top: 46px;
      right: 0px;
      width: 4px;
      height: 4px;
      border-radius: 100%;
      box-shadow: 0px 0px 6px #50E3C1;
      background-color: #50E3C1;
    }

    &-dot-5 {
      position: absolute;
      top: -96px;
      right: -42px;
      width: 4px;
      height: 4px;
      border-radius: 100%;
      box-shadow: 0px 0px 6px #50E3C1;
      background-color: #50E3C1;
    }

    &-dot-6 {
      position: absolute;
      top: -10px;
      right: 248px;
      width: 8px;
      height: 8px;
      border-radius: 100%;
      background-color: #50E3C1;
      box-shadow: 0px 0px 6px #50E3C1;
    }

    
    &-dot-dark {
      background: #F5DD82 0% 0% no-repeat padding-box;
      box-shadow: 0px 0px 6px #F5DD82;
    }

    &-small-dot-dark {
      background: #FFFFFF 0% 0% no-repeat padding-box;
      box-shadow: 0px 0px 6px #FFFFFF;
    }

    &-float {
      position: absolute;
      left: 0px;
      top: -100px;
    }

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

    &-box-dark {
      background: #2F2E4E 0% 0% no-repeat padding-box;
      box-shadow: 0px 3px 6px #00000029;
      border: 1px solid #2F2E4E;
    }
    
    &-left {
      width: 590px;
      text-align: center;
      color: #9C9C9C;
    }

    &-left-dark {
      color: #A5ABD6;
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
      transform: rotate(270deg);
    }

    &-period {
      margin-left: 70px;
      font-size: 20px;
    }

    &-period-dark {
      color: #BAC0E6;
    }

    &-horizon {
      margin-left: 70px;
      text-align: center;
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

    &-btn-dark {
      border: 1px solid #747BAA;
      color: #BAC0E6;
    }
    
    &-desc {
      display: flex;
      justify-content: space-between;
      margin-top: 37px;
      color: #D2D2D2;
    }

    &-desc-dark {
      color: #747BAA;
    }
    
    &-desc-text {
      position: relative;
      padding-left: 32px;

      &:before {
        content: '';
        position: absolute;
        left: 0px;
        top: 0px;
        width: 16px;
        height: 16px;
        border-radius: 100%;
        background-color: #646464;
      }
    }

    &-desc-text-dark {

      &:before {
        background-color: #ff778d;
      }
    }

    &-desc-text-3 {  

      &:before {
        background-color: #50E3C1;
      }
    }

    &-desc-text-3-dark {
      
      &:before {
        background-color: #50E3C1;
      }
    }

    &-desc-text-2 {
      position: relative;

      &:before {
        content: '';
        position: absolute;
        left: -32px;
        top: 0px;
        width: 16px;
        height: 16px;
        border-radius: 100%;
        background-color: #FDC43F;
      }
    }

    &-desc-text-2-dark {

      &:before {
        background-color: #8192FF;
      }
    }
  }

  // Technical Report

  &-report {
    position: relative;
    max-width: 1100px;
    width: 100%;
    margin: 80px auto 0px auto;

    &-dot-1 {
      position: absolute;
      top: 0px;
      left: 248px;
      width: 8px;
      height: 8px;
      border-radius: 100%;
      background-color: #50E3C1;
      box-shadow: 0px 0px 6px #50E3C1;
    }

    &-dot-dark {
      background: #F5DD82 0% 0% no-repeat padding-box;
      box-shadow: 0px 0px 6px #F5DD82;
    }

    &-head {
      font-size: 40px;
      font-weight: bold;
      text-align: center;
    }

    &-box {
      margin-top: 48px;
      padding: 64px 40px;
      border: 1px solid #D2D2D2;
    }

    &-box-dark {
      border: 1px solid #747BAA;
    }
    
    &-pre {
      line-height: 20px;
      color: #9C9C9C;
    }

    &-pre-dark {
      color: #A5ABD6;
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

    &-text-dark {
      color: #A5ABD6;
    }
  }

}

@media( max-width: 1300px ){

  .index-intro-city {
    right: -42px;
  }

}

@media( max-width: 1200px ){

  .index-intro-city {
    right: calc(37.5% - 235px);
  }

  .index-chart-dot-5 {
    right: 0px;
  }

  .index-chart-dot-6 {
    right: 10px;
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
        width: 270px;
        line-height: 28px;
        font-size: 24px;
      }

      &-text {
        width: initial;
        margin-top: 16px;
        font-size: 16px;
        line-height: 20px;
      }

      &-search {
        margin: 76px auto 0px;
        text-align: center;
        background-color: transparent;
      }

      &-search-icon {
        width: 22px;
        top: 19px;
        left: 20px;
      }

      &-search-input {
        width: calc(100% - 46px);
        height: 58px;
        padding: 0px 0px 0px 46px;
        background-color: transparent;
        outline: none;
      }

      &-search-input-dark {

      &::placeholder {
        
      }
    }

      &-search-btn {
        top: 8px;
        right: 8px;
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
        height: 100%;
        background-color: #fff;
        overflow: hidden;
        z-index: 3;
      }

      &-rwd-search-popup-dark {
        background-color: #242345;
        
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
        background-color: transparent;
        font-size: 20px;
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
        font-size: 16px;
      }

      &-rwd-search-text-dark {
        color: #EAECF4;
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
        transform: translate(0px, 12px);
      }

      &-down-2 {
        transform: translate(0px, -12px);
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
        line-height: 19px;
      }
      
      &-img {
        top: 0px;
        width: 100%;
        height: 250px;
        background-image: url('../assets/img/icon/icon-talk.svg');
        background-repeat: no-repeat;
        background-size: contain;
        background-position-x: center;
        background-position-y: top;
      }

      &-img-2 {
      top: 0px;
    }

      &-talk {
        top: -76px;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        width: 125px;
        height: 75px;
        background-image: url('../assets/img/icon/icon-talk-rwd.svg');

        &::before {
          bottom: -24px;
          left: 45px;
          width: 40px;
          height: 40px;
        }

        &::after {
          bottom: -8px;
          left: 60px;
          width: 10px;
          height: 10px;
          border-radius: 100%;
        }
      }

      &-talk-1 {
        right: calc(30% - 56px);
      }

      &-talk-2 {
        right: calc(23.3% - 49px);
      }

      &-talk-3 {
        right: calc(15% - 50px);
      }

      &-talk-left {
        padding: 0px;
        margin-top: 15px;
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

      &-arrow-text {
        margin-left: 0px;
      }


    }

    // chart

    &-chart {
      max-width: initial;
      width: calc(100% - 42px);
      margin-top: 95px;

      &-dot-1 {
        top: 25px;
        left: 17px;
      }

      &-dot-2 {
        display: none;
      }

      &-dot-3 {
        display: none;
      }

      &-dot-4 {
        display: none;
      }

      &-dot-5 {
        display: none;
      }

      &-dot-6 {
        top: -50px;
        right: 52px;
        width: 4px;
        height: 4px;
        
      }

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
          top: 3px;
          width: 12px;
          height: 12px;
        }
      }

      &-desc-text-2 {
        padding-left: 18px;

        &:before {
          top: 3px;
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

      &-dot-1 {
        top: -20px;
        left: 57px;
        width: 4px;
        height: 4px;
      }

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
