<template>
  <div class="company">

      <!-- 首圖 -->
      <div class="company-title">Valaris plc</div>
          <!-- chart -->
      <div class="company-chart">
        <div class="company-chart-box">
          <div class="company-chart-left">
            <div class="company-chart-chart">
              <div class="company-chart-level">Level</div>
              <div class="company-chart-period">Period of time</div>
              <div id="myChart"></div>
              <div class="company-chart-horizon">Horizon</div>
            </div>
          </div>
          <div class="company-chart-right">
            <div class="company-chart-industry">Industry: Petroleum</div>
            <div class="company-chart-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis convallis id enim pharetra aliquam. Maecenas aliquet facilisis massa eu fringilla.</div>
            <a href="./about">
              <div class="company-chart-btn">Contact us for more info</div>
            </a>
            <div class="company-chart-desc">
              <div class="company-chart-desc-text">Default boundary</div>
              <div class="company-chart-desc-text-2">Lower boundary</div>
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
            <div class="company-rotate-box">
              <div class="company-rotate-title">{{ chart.title }}</div>
              <div class="company-rotate-chart"
                :id="chart.title"
              ></div>
            </div>
          </swiper-slide>
        </swiper>
      </div>

      <!-- 相關搜尋 -->
      <div class="company-relate">

        <div class="company-relate-title-box">
          <div class="company-relate-line"></div>
          <div class="company-relate-title">Related Companies</div>
          <div class="company-relate-line"></div>
        </div>

        <div class="company-relate-box"
          v-for="(relate, index) in relateData"
          v-show="index < 2 || isload"
          :key="index"
        >
          <div class="company-relate-chart-box">
            <div class="company-relate-chart-title">{{ relate.title }}</div>
            <div class="company-relate-chart" :id="relate.title"></div>
          </div>
          <div class="company-relate-desc">
            <div class="company-relate-desc-title">Agilent Technologies</div>
            <div class="company-relate-desc-text">
              Status:
              <span
                :style="`color : ${relate.dataY1[0] > relate.dataY2[0] ? '#50E3C1' : '#FF4866'}`"
              >Danger
              </span>
            </div>
            <div class="company-relate-desc-text">Industry: Biotechnology</div>
          </div>
        </div>

        <div v-if="!isload" @click="isload = true" class="company-relate-load">Load more</div>

      </div>

  </div>
</template>

<script>

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
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 0,
      },
      isload: false,
      relateData: [
        {
          title: 'Jan, 2021',
          dataX: [0, 10 , 20 , 30 ,40 , 50],
          dataY1: [0.94, 0.96, 0.98, 0.95, 0.93, 0.9],
          dataY2: [0.92, 0.9, 0.87, 0.86, 0.85, 0.84]
        },
        {
          title: 'Feb, 2021',
          dataX: [0, 10 , 20 , 30 ,40 , 50],
          dataY1: [0.94, 0.96, 0.98, 0.95, 0.88, 0.82],
          dataY2: [0.96, 0.94, 0.92, 0.9, 0.88, 0.86]
        },
        {
          title: 'Mar, 2021',
          dataX: [0, 10 , 20 , 30 ,40 , 50],
          dataY1: [0.94, 0.96, 0.98, 0.95, 0.88, 0.82],
          dataY2: [0.96, 0.94, 0.92, 0.9, 0.88, 0.86]
        },
      ],
      chartData: [
        {
          title: 'Jan, 2020',
          dataX: [0, 10 , 20 , 30 ,40 , 50],
          dataY1: [0.94, 0.96, 0.98, 0.95, 0.93, 0.9],
          dataY2: [0.92, 0.9, 0.87, 0.86, 0.85, 0.84]
        },
        {
          title: 'Feb, 2020',
          dataX: [0, 10 , 20 , 30 ,40 , 50],
          dataY1: [0.94, 0.96, 0.98, 0.95, 0.88, 0.82],
          dataY2: [0.96, 0.94, 0.92, 0.9, 0.88, 0.86]
        },
        {
          title: 'Mar, 2020',
          dataX: [0, 10 , 20 , 30 ,40 , 50],
          dataY1: [0.94, 0.96, 0.98, 0.95, 0.88, 0.82],
          dataY2: [0.96, 0.94, 0.92, 0.9, 0.88, 0.86]
        },
        {
          title: 'Apr, 2020',
          dataX: [0, 10 , 20 , 30 ,40 , 50],
          dataY1: [0.94, 0.96, 0.98, 0.95, 0.93, 0.9],
          dataY2: [0.92, 0.9, 0.87, 0.86, 0.85, 0.84]
        },
        {
          title: 'May, 2020',
          dataX: [0, 10 , 20 , 30 ,40 , 50],
          dataY1: [0.94, 0.96, 0.98, 0.95, 0.93, 0.9],
          dataY2: [0.92, 0.9, 0.87, 0.86, 0.85, 0.84]
        },
        {
          title: 'Jun, 2020',
          dataX: [0, 10 , 20 , 30 ,40 , 50],
          dataY1: [0.94, 0.96, 0.98, 0.95, 0.88, 0.82],
          dataY2: [0.96, 0.94, 0.92, 0.9, 0.88, 0.86]
        },
        {
          title: 'Jul, 2020',
          dataX: [0, 10 , 20 , 30 ,40 , 50],
          dataY1: [0.94, 0.96, 0.98, 0.95, 0.88, 0.82],
          dataY2: [0.96, 0.94, 0.92, 0.9, 0.88, 0.86]
        },
        {
          title: 'Aug, 2020',
          dataX: [0, 10 , 20 , 30 ,40 , 50],
          dataY1: [0.94, 0.96, 0.98, 0.95, 0.93, 0.9],
          dataY2: [0.92, 0.9, 0.87, 0.86, 0.85, 0.84]
        },
        {
          title: 'Sep, 2020',
          dataX: [0, 10 , 20 , 30 ,40 , 50],
          dataY1: [0.94, 0.96, 0.98, 0.95, 0.93, 0.9],
          dataY2: [0.92, 0.9, 0.87, 0.86, 0.85, 0.84]
        },
        {
          title: 'Oct, 2020',
          dataX: [0, 10 , 20 , 30 ,40 , 50],
          dataY1: [0.94, 0.96, 0.98, 0.95, 0.88, 0.82],
          dataY2: [0.96, 0.94, 0.92, 0.9, 0.88, 0.86]
        },
        {
          title: 'Nov, 2020',
          dataX: [0, 10 , 20 , 30 ,40 , 50],
          dataY1: [0.94, 0.96, 0.98, 0.95, 0.88, 0.82],
          dataY2: [0.96, 0.94, 0.92, 0.9, 0.88, 0.86]
        },
        {
          title: 'Dec, 2020',
          dataX: [0, 10 , 20 , 30 ,40 , 50],
          dataY1: [0.94, 0.96, 0.98, 0.95, 0.93, 0.9],
          dataY2: [0.92, 0.9, 0.87, 0.86, 0.85, 0.84]
        },
      ]
    }
  },
  mounted () {
    // 首圖
    let myChart = this.$echarts.init(document.getElementById('myChart'))
    myChart.setOption(this.completeChart(
      this.chartData[0].dataX,
      this.chartData[0].dataY1,
      this.chartData[0].dataY2
    ))

    // 輪播圖
    for (let i = 0; i < this.chartData.length; i++) {
      this.$echarts.init(document.getElementById(this.chartData[i].title)).setOption(this.lessChart(
        this.chartData[i].dataX,
        this.chartData[i].dataY1,
        this.chartData[i].dataY2
      ))
    }
    
    // 相關搜尋
    for (let i = 0; i < this.relateData.length; i++) {
      this.$echarts.init(document.getElementById(this.relateData[i].title)).setOption(this.lessChart(
        this.relateData[i].dataX,
        this.relateData[i].dataY1,
        this.relateData[i].dataY2
      ))
    }

  },
  computed: {

  },
  methods: {
    lessChart (dataX, dataY1, dataY2) {
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
            areaStyle: {},
            itemStyle:{
              normal:{
                color: dataY1[0] > dataY2[0] ?'#50E3C1' : '#FF4866'
              },
            },
            data: dataY1,
        },
        {
          type: 'line',
          showSymbol:false,
          areaStyle: {},
          itemStyle:{
            normal:{
              color:'#FDC43F'
            },
          },
          data: dataY2,
        },
        ]
      }
      return chart
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
                color: dataY1[0] > dataY2[0] ?'#50E3C1' : '#FF4866'
              },
            },
            data: dataY1,
        },
        {
          type: 'line',
          areaStyle: {},
          itemStyle:{
            normal:{
              color:'#FDC43F'
            },
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

.company {
  position: relative;
  max-width: 1100px;
  width: 100%;
  margin: 86px auto 148px auto;

  &-title {
    font-size: 48px;
    font-weight: bold;
    color: #2E2E2E;
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

  // rotate

  &-rotate {
      width: 100%;
      margin-top: 40px;

    &-box {
      width: 336px;
      height: 218px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      box-shadow: 0px 3px 6px #00000014;
      border: 1px solid #EDEDED;
      border-radius: 10px;
    }

    &-title {
      text-align: center;
      color: #9C9C9C;
      margin-top: 20px;
    }

    &-chart {
      width: 272px;
      height: 160px;
      margin: 6px 0px 0px 0px;
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

    &-title {
      font-size: 20px;
      color: #D2D2D2;
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
    }

    &-chart-box {
      margin-right: 69px;
    }

    &-chart-title {
      text-align: center;
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
  }


}

@media( max-width: 500px ){

  .company {


  }

}

</style>
