<template>
  <div class="company">

      <!-- 首圖 -->
      <div :class="['company-title', {'company-title-dark': !isLight}]">{{ this.searchCompany.name }}</div>
          <!-- chart -->
      <div class="company-chart">
        <div :class="['company-chart-box', {'company-chart-box-dark': !isLight}]">
          <div class="company-chart-left">
            <div :class="['company-chart-chart', {'company-chart-chart-dark': !isLight}]">
              <div class="company-chart-level">Level</div>
              <div :class="['company-chart-period', {'company-chart-period-dark': !isLight}]">Period of time</div>
              <div id="myChart"></div>
              <div class="company-chart-horizon">Horizon</div>
            </div>
          </div>
          <div class="company-chart-right">
            <div class="company-chart-industry">{{ searchCompany.industry_group }}</div>
            <div class="company-chart-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis convallis id enim pharetra aliquam. Maecenas aliquet facilisis massa eu fringilla.</div>
            <router-link to="./about">
              <div :class="['company-chart-btn', {'company-chart-btn-dark': !isLight}]">Contact us for more info</div>
            </router-link>
            <div :class="['company-chart-desc', {'company-chart-desc-dark': !isLight}]">
              <div :class="[
                'company-chart-desc-text', {'company-chart-desc-text-dark': !isLight},
                {'company-chart-desc-text-3': isAllSafe.first },
                {'company-chart-desc-text-3-dark': isAllSafe.first && !isLight }
                ]">Default boundary</div>
              <div :class="['company-chart-desc-text-2', {'company-chart-desc-text-2-dark': !isLight}]">Lower boundary</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 輪播 -->

      <div class="company-rotate">
        <swiper class="swiper" :options="swiperOption" ref="mySwiper">
          <swiper-slide
            v-for="(chart, index) in chartData"
            :key="index"
          >
            <div @click="changeMonthDisplay(index)" :class="['company-rotate-box', {'company-rotate-box-dark': !isLight}]">
              <div :class="['company-rotate-title', {'company-rotate-title-dark': !isLight}]">{{ chart.title }}</div>
              <div class="company-rotate-chart"
                :id="chart.title"
              ></div>
              <div :class="['company-rotate-desc', {'company-rotate-desc-dark': !isLight}]">
                <div :class="[
                  'company-rotate-desc-text', {'company-rotate-desc-text-dark': !isLight},
                  {'company-rotate-desc-text-3': chart.dataY1[0] > chart.dataY2[0] },
                  {'company-rotate-desc-text-3-dark': chart.dataY1[0] > chart.dataY2[0]  && !isLight }
                ]">Default boundary</div>
                <div :class="['company-rotate-desc-text-2', {'company-rotate-desc-text-2-dark': !isLight}]">Lower boundary</div>
              </div>
              <div :class="['company-rotate-hint', {'company-rotate-hint-dark': !isLight}]">Industry: {{ searchCompany.industry_group }}</div>
            </div>
          </swiper-slide>
        </swiper>
        <img v-if="swiperIndex != 0 && isLight" @click="nextPrev" class="company-rotate-arrow-left"
          src="@/assets/img/icon/grey-arrow.svg" alt="arrow"
        >
        <img v-if="swiperIndex != 0 && !isLight" @click="nextPrev" class="company-rotate-arrow-left"
          src="@/assets/img/icon/grey-arrow-dark.svg" alt="arrow"
        >
        <img v-if="swiperIndex != 33 && isLight" @click="nextSlide" class="company-rotate-arrow-right"
          src="@/assets/img/icon/grey-arrow.svg" alt="arrow"
        >
        <img v-if="swiperIndex != 33 && !isLight" @click="nextSlide" class="company-rotate-arrow-right"
          src="@/assets/img/icon/grey-arrow-dark.svg" alt="arrow"
        >
        
        <router-link to="./about">
          <div :class="['company-rotate-contact', {'company-rotate-contact-dark': !isLight}]">Contact us for more info</div>
        </router-link>
      </div>
      

      <!-- 相關搜尋 -->
      <div class="company-relate">

        <div class="company-relate-title-box">
          <div :class="['company-relate-line', {'company-relate-line-dark': !isLight}]"></div>
          <div :class="['company-relate-title', {'company-relate-title-dark': !isLight}]">Related Companies</div>
          <div :class="['company-relate-line', {'company-relate-line-dark': !isLight}]"></div>
        </div>

        <div :class="['company-relate-box', {'company-relate-box-dark': !isLight}]"
          v-for="(relate, index) in relateData"
          v-show="index < 2 || isload"
          :key="index"
          @click="goToCompany(relate.relateSearchData)"
        >
          <div :class="['company-relate-chart-box', {'company-relate-chart-box-dark': !isLight}]">
            <div class="company-relate-chart-subtitle">{{ relate.subtitle }}</div>
            <div class="company-relate-chart-title">{{ relate.title }}</div>
            <div class="company-relate-chart" :id="relate.title"></div>
          </div>
          <div class="company-relate-desc">
            <div class="company-relate-desc-title">{{ relate.title }}</div>
            <div class="company-relate-desc-text">
              Status:
              <span v-if="isAllSafe.relate[index]" style="color: #50E3C1">Safe</span>
              <span v-else style="color: #FF4866">Danger</span>
            </div>
            <div class="company-relate-desc-text">{{ relate.subtitle }}</div>
          </div>
        </div>

        <div v-if="!isload" @click="isload = true" :class="['company-relate-load', {'company-relate-load-dark': !isLight}]">Load more</div>

      </div>

  </div>
</template>

<script>

import * as echarts from 'echarts'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
export default {
  head: {
    title: 'Company',
  },
  layout: 'default',
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {

  },
  data () {
    return {
      screenWidth: null,
      swiperOption: {
        mousewheel: true,
        grabCursor: true,
        mousewheelControl: true,
        spaceBetween: -14,
        // autoplay: {
        //   delay: 2500,
        //   disableOnInteraction: false
        // },
        breakpoints: {
          1000: {
            slidesPerView: 3,
            centeredSlides: false,
          },
          500: {
            slidesPerView: 1,
            centeredSlides: true,
          },
        }
      },
      swiperIndex: 0,
      isload: false,
      currentMonth: 0,
      allDataX: [],
      relateData: [],
      chartData: [],
      isAllSafe: {
        first: true,
        relate: [true, true, true, true, true]
      }
    }
  },
  created() {
    for (let i = 0; i < 36; i++) {
      this.chartData.push({
        title: i,
        subtitle: 'Airbnb',
        dataX: [0, 10 , 20 , 30 ,40 , 50],
        dataY1: [0.94, 0.96, 0.98, 0.95, 0.88, 0.82],
        dataY2: [0.96, 0.94, 0.92, 0.9, 0.88, 0.86]
      })
    }
    for (let i = 0; i < 6; i++) {
      this.relateData.push({
        title: i+'a',
        subtitle: 'Airbnb',
        relateSearchData: {},
        dataX: [0, 10 , 20 , 30 ,40 , 50],
        dataY1: [0.94, 0.96, 0.98, 0.95, 0.88, 0.82],
        dataY2: [0.96, 0.94, 0.92, 0.9, 0.88, 0.86]
      })
    }
    for (let i = 0; i < 60; i++) {
      this.allDataX.push(i)
    }

    if(this.searchCompany.name == '') {
      // let temp
      // temp = {
      //   id:27428,
      //   industry_group:"Home Furnishings",
      //   industry_sector:"Consumer, Cyclical",
      //   industry_subgroup:"Appliances",
      //   name:"Fedders Corp"
      // }
      // this.$store.commit('setSearchCompany', temp)

      this.$router.push({
        path: '/',
        query: {

        }
      })
    }
    
  },
  mounted () {
    if(this.searchCompany.name == '') {
      return
    }
    
    this.screenWidth = window.screen.width
    this.swiper.on('slideChange', () => {
      this.swiperIndex = this.swiper.activeIndex
    })
    this.getChartData()
  },
  computed: {
    swiper () { return this.$refs.mySwiper.$swiper },
    isLight() { return this.$store.state.lightMode },
    searchCompany() { return this.$store.state.searchCompany },
    apiAddress() { return this.$store.state.apiAddress },
  },
  methods: {
    getChartData() {
      // 取值後畫首 & 輪播圖
      Promise.all([
        this.$axios.get(`${this.apiAddress}/app/ib/?company_id=${this.searchCompany.id}`),
        this.$axios.get(`${this.apiAddress}/app/ev/?company_id=${this.searchCompany.id}`)
      ]).then(res => {
        this.chartData = []
        
        // dataY2 黃線 ev
        if(res[0].data.length < 36) {
          for (let i = 0; i < res[0].data.length; i++) {
            this.chartData.push({
              title: res[0].data[i].date,
              subtitle: this.searchCompany.name,
              dataY1: res[0].data[i].next_60_m_prediction,
              dataY2: res[1].data[i].next_60_m_prediction
            })
          }
        } else {
          for (let i = 0; i < 36; i++) {
            this.chartData.push({
              title: res[0].data[i].date,
              subtitle: this.searchCompany.name,
              dataY1: res[0].data[i].next_60_m_prediction,
              dataY2: res[1].data[i].next_60_m_prediction
            })
          }
        }
        
        
        // console.log(this.chartData)
        this.drawAllChart()
        
        // this.relateData = []
      }).catch(er => {

      })

      // 取值後畫 relative chart
      Promise.all([
        this.$axios.get(`${this.apiAddress}/app/company/?id=${this.searchCompany.related_companies[0]}`),
        this.$axios.get(`${this.apiAddress}/app/ib/?company_id=${this.searchCompany.related_companies[0]}`),
        this.$axios.get(`${this.apiAddress}/app/ev/?company_id=${this.searchCompany.related_companies[0]}`),
        this.$axios.get(`${this.apiAddress}/app/company/?id=${this.searchCompany.related_companies[1]}`),
        this.$axios.get(`${this.apiAddress}/app/ib/?company_id=${this.searchCompany.related_companies[1]}`),
        this.$axios.get(`${this.apiAddress}/app/ev/?company_id=${this.searchCompany.related_companies[1]}`),
        this.$axios.get(`${this.apiAddress}/app/company/?id=${this.searchCompany.related_companies[2]}`),
        this.$axios.get(`${this.apiAddress}/app/ib/?company_id=${this.searchCompany.related_companies[2]}`),
        this.$axios.get(`${this.apiAddress}/app/ev/?company_id=${this.searchCompany.related_companies[2]}`),
        this.$axios.get(`${this.apiAddress}/app/company/?id=${this.searchCompany.related_companies[3]}`),
        this.$axios.get(`${this.apiAddress}/app/ib/?company_id=${this.searchCompany.related_companies[3]}`),
        this.$axios.get(`${this.apiAddress}/app/ev/?company_id=${this.searchCompany.related_companies[3]}`),
        this.$axios.get(`${this.apiAddress}/app/company/?id=${this.searchCompany.related_companies[4]}`),
        this.$axios.get(`${this.apiAddress}/app/ib/?company_id=${this.searchCompany.related_companies[4]}`),
        this.$axios.get(`${this.apiAddress}/app/ev/?company_id=${this.searchCompany.related_companies[4]}`)
      ]).then(res => {
        // console.log(res)
        this.relateData = []

        for (let i = 0; i < 5; i++) {
          this.relateData.push({
            title: res[i*3].data[0].name,
            subtitle: res[i*3].data[0].industry_group,
            relateSearchData: res[i*3].data[0],
            dataY1: res[i*3+1].data[0].next_60_m_prediction,
            dataY2: res[i*3+2].data[0].next_60_m_prediction
          })
        }
        

        this.drawRelativeChart()
        
      }).catch(er => {

      })

    },
    drawAllChart () {
      let isFirstSafe = true
      this.isAllSafe.first = true

      for(let k = 0; k < this.chartData[this.currentMonth].dataY1.length; k++) {
        if(this.chartData[this.currentMonth].dataY1[k] > this.chartData[this.currentMonth].dataY2[k]) {
          isFirstSafe = false
          this.isAllSafe.first = false
        }
      }

      // 首圖和 swiper
      if (this.screenWidth > 500) {
        this.swiperOption.spaceBetween = 0
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        if (this.isLight) {
          myChart.setOption(this.completeChart(
            // this.chartData[this.currentMonth].dataX,
            this.allDataX,
            this.chartData[this.currentMonth].dataY1,
            this.chartData[this.currentMonth].dataY2,
            isFirstSafe
          ), true)
        } else {
          myChart.setOption(this.completeChartDark(
            // this.chartData[this.currentMonth].dataX,
            this.allDataX,
            this.chartData[this.currentMonth].dataY1,
            this.chartData[this.currentMonth].dataY2,
            isFirstSafe
          ), true)
        }
      }

      // 輪播圖
      for (let i = 0; i < this.chartData.length; i++) {
        let isRotateSafe = true

        for(let j = 0; j < this.chartData[i].dataY1.length; j++) {
          if(this.chartData[i].dataY1[j] > this.chartData[i].dataY2[j]) {
            isRotateSafe = false

          }
        }

        if(this.screenWidth > 500) {
          if (this.isLight) {
            this.$echarts.init(document.getElementById(i)).setOption(this.lessChart(
              // this.chartData[i].dataX,
              this.allDataX,
              this.chartData[i].dataY1,
              this.chartData[i].dataY2,
              isRotateSafe
            ), true)
          } else {
            this.$echarts.init(document.getElementById(i)).setOption(this.lessChartDark(
              // this.chartData[i].dataX,
              this.allDataX,
              this.chartData[i].dataY1,
              this.chartData[i].dataY2,
              isRotateSafe
            ), true)
          }
        } else {
          if (this.isLight) {
            this.$echarts.init(document.getElementById(i)).setOption(this.completeChart(
              // this.chartData[i].dataX,
              this.allDataX,
              this.chartData[i].dataY1,
              this.chartData[i].dataY2,
              isRotateSafe
            ), true)
          } else {
            this.$echarts.init(document.getElementById(i)).setOption(this.completeChartDark(
              // this.chartData[i].dataX,
              this.allDataX,
              this.chartData[i].dataY1,
              this.chartData[i].dataY2,
              isRotateSafe
            ), true)
          }
        }
      }
      
      
    },
    drawRelativeChart() {
      // 相關搜尋
      for (let i = 0; i < this.relateData.length; i++) {
        let isRelateSafe = true
        this.isAllSafe.relate = [true, true, true, true, true]

        for(let j = 0; j < this.relateData[i].dataY1.length; j++) {
          if(this.relateData[i].dataY1[j] > this.relateData[i].dataY2[j]) {
            isRelateSafe = false
            this.isAllSafe.relate[i] = false
          }
        }

        if (this.isLight) {
          this.$echarts.init(document.getElementById(i+'a')).setOption(this.lessChart(
            // this.relateData[i].dataX,
            this.allDataX,
            this.relateData[i].dataY1,
            this.relateData[i].dataY2,
            isRelateSafe
          ), true)
        } else {
          this.$echarts.init(document.getElementById(i+'a')).setOption(this.lessChartDark(
            // this.relateData[i].dataX,
            this.allDataX,
            this.relateData[i].dataY1,
            this.relateData[i].dataY2,
            isRelateSafe
          ), true)
        }
      }
    },
    goToCompany (relateSearchData) {
      this.$store.commit('setSearchCompany', relateSearchData)
      this.$router.push({
        path: '/blank'
      })
    },
    nextPrev () {
      this.swiper.slidePrev()
    },
    nextSlide () {
      this.swiper.slideNext()
    },
    changeMonthDisplay (month) {
      this.currentMonth = month
      let myChart = this.$echarts.init(document.getElementById('myChart'))

      let isChangeSafe = true
      this.isAllSafe.first = true

      for(let j = 0; j < this.chartData[month].dataY1.length; j++) {
        if(this.chartData[month].dataY1[j] > this.chartData[month].dataY2[j]) {
          isChangeSafe = false
          this.isAllSafe.first = false
        }
      }

      if (this.isLight) {
        myChart.setOption(this.completeChart(
          // this.chartData[month].dataX,
          this.allDataX,
          this.chartData[month].dataY1,
          this.chartData[month].dataY2,
          isChangeSafe
        ),true)
      } else {
        myChart.setOption(this.completeChartDark(
          // this.chartData[month].dataX,
          this.allDataX,
          this.chartData[month].dataY1,
          this.chartData[month].dataY2,
          isChangeSafe
        ),true)
      }
    },
    lessChart (dataX, dataY1, dataY2, isSafe) {
      let chart = {
        title: {
          text: ''
        },
         tooltip : {
           show: false,
            },   
        grid: {
          top: '20px',
          left: '10px',
          right: '10px',
          bottom: '20px',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            axisTick: {
              show: false
            },
            axisLine:{
              show: false,
            },  
            axisLabel: {
              show: false,
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
              show: false,
            },  
            splitLine: {
              show: false,
            },
            axisLabel: {
              show: false,
            }, 
          }
        ],
        series: [
          {
            type: 'line',
            showSymbol:false,
            areaStyle: {
              normal:{
                // 颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { 
                  offset: 0,
                  color: isSafe ?'rgba(80,227,193,0.3)' : 'rgba(255,119,141,0.3)'
                  },
                  {
                    offset: .43,
                    color: isSafe ?'rgba(80,227,193,0.3)' : 'rgba(255,119,141,0.3)'
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
                color: isSafe ?'rgba(80,227,193,0.3)' : 'rgba(255,119,141,0.3)'
              },
            },
            lineStyle: {
              color: isSafe ?'rgba(80,227,193)' : 'rgba(255,119,141)'
            },
            data: dataY1,
          },
        {
          type: 'line',
          showSymbol:false,
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
    lessChartDark (dataX, dataY1, dataY2, isSafe) {
      let chart = {
        title: {
          text: ''
        },
         tooltip : {
           show: false,
            },   
        grid: {
          top: '20px',
          left: '10px',
          right: '10px',
          bottom: '20px',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            axisTick: {
              show: false
            },
            axisLine:{
              show: false,
            },  
            axisLabel: {
              show: false,
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
              show: false,
            },  
            splitLine: {
              show: false,
            },
            axisLabel: {
              show: false,
            }, 
          }
        ],
        series: [
          {
            type: 'line',
            showSymbol:false,
            areaStyle: {
              normal:{
                // 颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { 
                  offset: 0,
                  color: isSafe ?'rgba(80,227,193,0.3)' : 'rgba(255,119,141,0.3)'
                  },
                  {
                    offset: .43,
                    color: isSafe ?'rgba(80,227,193,0.3)' : 'rgba(255,119,141,0.3)'
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
                color: isSafe ? 'rgba(80,227,193,0.3)' : 'rgba(255,119,141,0.3)'
              },
            },
            lineStyle: {
              color: isSafe ? 'rgba(80,227,193,0.3)' : 'rgba(255,119,141,0.3)'
            },
            data: dataY1,
          },
        {
          type: 'line',
          showSymbol:false,
          areaStyle: {},
          itemStyle:{
            normal:{
              color: 'rgba(129,146,255, 0.3)'
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
    completeChart (dataX, dataY1, dataY2, isSafe) {
      let chart = {
        title: {
          text: ''
        },
        // 移動到 chart
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // type: 'cross',
            // label: {
            //   backgroundColor: '#6a7985'
            // }
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
              interval: 11
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
              formatter: function(value, index) {
                return value.toFixed(1)
              }
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
                  color: isSafe ?'rgba(80,227,193,0.3)' : 'rgba(255,119,141,0.3)'
                  },
                  // 綠、紅
                  {
                    offset: .43,
                    color: isSafe ?'rgba(80,227,193,0.3)' : 'rgba(255,119,141,0.3)'
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
                color: isSafe ?'rgba(80,227,193,0.3)' : 'rgba(255,119,141,0.3)'
              },
            },
            lineStyle: {
              color: isSafe ?'rgba(80,227,193)' : 'rgba(255,119,141)'
            },
            data: dataY1,
          },
          {
            type: 'line',
            areaStyle: {},
            itemStyle:{
              normal:{
                color:'rgba(253,196,63, 0.3)'
              },
            },
            lineStyle: {
              color: 'rgba(253,196,63, 0.3)'
            },
            data: dataY2,
          },
        ]
      }
      return chart
    },
    completeChartDark (dataX, dataY1, dataY2, isSafe) {
      let chart = {
        title: {
          text: ''
        },
        // 移動到 chart
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // type: 'cross',
            // label: {
            //   backgroundColor: '#6a7985'
            // }
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
              interval: 11
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
              formatter: function(value, index) {
                return value.toFixed(1)
              }
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
                  color: isSafe ?'rgba(80,227,193,0.3)' : 'rgba(255,119,141,0.3)'
                  },
                  {
                    offset: .43,
                    color: isSafe ?'rgba(80,227,193,0.3)' : 'rgba(255,119,141,0.3)'
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
                color: isSafe ? 'rgba(80,227,193,0.3)' : 'rgba(255,119,141,0.3)'
              },
            },
            lineStyle: {
              color: isSafe ? 'rgba(80,227,193,0.3)' : 'rgba(255,119,141,0.3)'
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
    isLight: {
      handler: function(light) {
        this.$router.push({
          path: '/blank',
          query: {

          }
        })
      }
    },
    screenWidth: {
      handler: function() {
        
      },
      deep: false,
      immediate: false
    },
  }
}
</script>

<style lang="scss" scoped>

.company {
  position: relative;
  max-width: 1100px;
  width: 100%;
  margin: 86px auto 148px auto;
  transform: translateY(-90px);

  &-dbg {
    background-color: #242345;
  }

  &-title {
    font-size: 48px;
    font-weight: bold;
    color: #2E2E2E;
    transform: translate(0px, 10px);
  }

  &-title-dark {
    color: #EAECF4;
  }

  // chart
  &-chart {

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
      background-color: #2F2E4E;
      box-shadow: 0px 3px 6px #00000029;
      border: 0px;
    }
    
    &-left {
      width: 590px;
      text-align: center;
    }
    
    &-chart {
      position: relative;
      margin-left: 50px;
      color: #9C9C9C;
    }

    &-chart-dark {
      color: #A5ABD6;
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
      background-color: #2F2E4E;
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
        top: 1px;
        width: 16px;
        height: 16px;
        border-radius: 100%;
        background-color: #FF4866;
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
        top: 1px;
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

  // rotate

  &-rotate {
    position: relative;
    width: 100%;
    margin-top: 40px;

    &-box {
      width: 336px;
      height: 218px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 0px 0px 0px 18px;
      box-shadow: 0px 3px 6px #00000014;
      border: 1px solid #EDEDED;
      border-radius: 10px;
      color: #9C9C9C;
    }

    &-box-dark {
      background-color: #2F2E4E;
      box-shadow: 0px 3px 6px #00000029;
      border: 0px;
      color: #A5ABD6;
    }

    &-title {
      text-align: center;
      margin-top: 20px;
    }

    &-chart {
      width: 272px;
      height: 160px;
      margin: 6px 0px 0px 0px;
    }

      &-desc {
        display: none;
      }
      
      &-desc-text {


        &:before {

        }
      }

      &-desc-text-2 {


        &:before {
        }
      }

      &-hint {
        display: none;
      }


    &-arrow-left{
      position: absolute;
      top: 90px;
      left: -48px;
      width: 20px;
      height: 32px;
      transform: rotate(180deg);
      cursor: pointer;

      &:hover {
        opacity: 0.8;
      }
    }

    &-arrow-right{
      position: absolute;
      top: 90px;
      right: -48px;
      width: 20px;
      height: 32px;
      cursor: pointer;

      &:hover {
        opacity: 0.8;
      }
    }

    &-contact {
      display: none;   
    }
  }

  // relate 相關搜尋

  &-relate {
    margin-top: 105px;

    &-title-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 37px;
    }

    &-line {
      width: 371px;
      height: 1px;
      background-color: #D2D2D2;
    }

    &-line-dark {
      background-color: #747BAA;
    }

    &-title {
      font-size: 20px;
      color: #D2D2D2;
    }

    &-title-dark {
      color: #747BAA;
    }

    &-box {
      display: flex;
      align-items: center;
      height: 240px;
      margin-top: 28px;
      padding-left: 54px;
      box-shadow: 0px 3px 6px #00000014;
      border: 1px solid #EDEDED;
      border-radius: 10px;
      cursor: pointer;

      &:hover {
        opacity: 0.8;
      }
    }

    &-box-dark {
      border: 0px;
      box-shadow: 0px 3px 6px #00000029;
      background-color: #2F2E4E;
    }

    &-chart-box {
      margin-right: 69px;
    }

    &-chart-title {
      text-align: center;
    }

    &-chart-subtitle {
      display: none;
    }

    &-chart {
      width: 292px;
      height: 140px;
    }

    &-desc {

    }

    &-desc-title {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 20px;
    }

    &-desc-text {
      margin-top: 8px;
    }

    &-load {
      width: 344px;
      height: 48px;
      line-height: 48px;
      margin: 72px auto 0px;
      text-align: center;
      font-size: 14px;
      background-color: #F7F7F7;
      cursor: pointer;

      &:hover {
        opacity: 0.8;
      }
    }

    &-load-dark {
      background-color: #2F2E4E;
    }
  }


}

@media( max-width: 500px ){

  .company {
    max-width: initial;
    width: calc(100% - 40px);
    margin-bottom: 80px;
    transform: translateY(0px);

    &-title {
      font-size: 24px;
      transform: translate(0px, 0px);
    }

    // chart
    &-chart {
      display: none;

      &-box {

      }
      
      &-left {
        width: 590px;
        text-align: center;
      }
      
      &-chart {

      }

      #myChart{

      }

      &-level {

      }

      &-period {

      }

      &-horizon {

      }
      
      &-right {

      }
      
      &-industry {

      }
      
      &-text {

      }
      
      &-btn {

      }
      
      &-desc {

      }
      
      &-desc-text {


        &:before {

        }
      }

      &-desc-text-2 {


        &:before {

        }
      }
    }

    // rotate

    &-rotate {
      margin-top: 20px;

      &-box {
        width: calc(100% - 30px);
        height: 380px;
        margin: 0px 0px 0px 0px;
        padding: 24px 0px;
      }

      &-title {
        margin-top: 0px;
      }

      &-title-dark {
        color: #BAC0E6;
      }

      &-chart {
        width: calc(108% - 2px);
        margin-right: 10px;
        height: 300px;
      }

      &-desc {
        width: calc(100% - 16px);
        padding: 0px 0px;
        display: flex;
        color: #D2D2D2;
      }

      &-desc-dark {
        color: #747BAA;
      }
      
      &-desc-text {
        position: relative;
        width: calc(50% - 24px);
        padding-left: 24px;

        &:before {
          content: '';
          position: absolute;
          left: 0px;
          top: -1px;
          width: 16px;
          height: 16px;
          border-radius: 100%;
          background-color: #FF4866;
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
        padding-left: 24px;

        &:before {
          content: '';
          position: absolute;
          left: 0px;
          top: -1px;
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

      &-hint {
        display: block;
        margin: 24px 0px 0px 16px;
        margin-top: 24px;
        font-size: 16px;
        align-self: baseline;
      }

      &-hint-dark {
        color: #BAC0E6;
      }

      &-arrow-left{
        display: none;
      }

      &-arrow-right{
        display: none;
      }

      &-contact {
        display: block;
        width: 100%;
        height: 48px;
        line-height: 48px;
        margin-top: 28px;
        text-align: center;
        color: #646464;
        border: 1px solid #D2D2D2;
      }

      &-contact-dark {
        border: 1px solid #747BAA;
        background-color: transparent;
        color: #BAC0E6;
      }
    }

    // relate 相關搜尋

    &-relate {
      margin-top: 72px;

      &-title-box {
        margin-bottom: 29px;
      }

      &-line {
        width: 24%;
      }

      &-title {

      }

      &-box {
        height: 220px;
        padding-left: 0px;
      }

      &-chart-box {
        margin-right: 0px;
        height: 220px;
        margin: 0px auto;
        color: #9C9C9C;
      }

      &-chart-box-dark {
        color: #A5ABD6;
      }

      &-chart-subtitle {
        display: block;
        text-align: center;
        font-size: 20px;
        font-weight: bold;
        margin-top: 16px;
      }

      &-chart-title {
        text-align: center;
        margin-top: 4px;
      }

      &-chart {
        height: 160px;
      }

      &-desc {
        display: none;
      }

      &-desc-title {

      }

      &-desc-text {

      }

      &-load {
        width: 100%;
        margin-top: 48px;
      }
    }


  }

}

@media( max-width: 430px ){

  .company-rotate-chart {
    width: calc(109% - 2px);
  }

}

@media( max-width: 390px ){

  .company-rotate-chart {
    width: calc(110% - 2px);
  }

}

@media( max-width: 350px ){

  .company-rotate-chart {
    width: calc(111% - 2px);
  }

}

@media( max-width: 332px ){

  .company-rotate-chart {
    width: calc(112% - 2px);
  }

}

</style>
