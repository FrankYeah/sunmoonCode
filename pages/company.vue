<template>
  <div class="company">

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




      <swiper class="swiper" :options="swiperOption" ref="mySwiper">
        <swiper-slide
          v-for="(web, index) in chartData"
          :key="index"
        >
        </swiper-slide>
      </swiper>

  </div>
</template>

<script>

import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
export default {
  head: {
    title: '首頁',
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
        slidesPerView: 4,
        spaceBetween: 30,
        loop: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      },
      chartData: [
        {}
      ]
    }
  },
  mounted () {
    this.echartsInit()
  },
  computed: {

  },
  methods: {
    echartsInit () {
      // 找到容器
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      // 开始渲染
      myChart.setOption(this.useChart(
        [0, 10 , 20 , 30 ,40 , 50],
        [0.95, 0.87, 0.98, 0.85, 0.91, 0.87],
        [0.97, 0.93, 0.81, 0.9, 0.87, 0.86],
        1,
        0.8
      ))
    },
    useChart (dataX, dataY1, dataY2, max, min) {
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
            max: max,
            min: min,
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
                color:'#FDC43F'
              },
            },
            data: dataY1,
        },
        {
          type: 'line',
          areaStyle: {},
          itemStyle:{
            normal:{
              color:'#FF4866'
            },
          },
          data: dataY2,
        },
        ]
      }
      return chart
    }
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
  margin: 86px auto 0px auto;

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


}

@media( max-width: 500px ){

  .company {


  }

}

</style>
