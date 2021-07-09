<template>
  <div class="result">
    <div class="result-title">We couldn’t find results for your search!</div>
    <div class="result-subtitle">It seems we can’t find any results based on your search. Try these top search companies below or search again!</div>
    <div class="result-main">Top search queries</div>
    <div class="result-chart-outer">
      <div :class="['result-chart-box', {'result-chart-box-none': index > 2 && !isload}]"
        v-for="(chart, index) in resultData"
        :key="index"
        @click="goToCompany(chart.title)"
      >
        <div class="result-chart-title">{{ chart.title }}</div>
        <div class="result-chart-subtitle">{{ chart.subtitle }}</div>
        <div class="result-chart" :id="chart.title"></div>
      </div>

    </div>
    <div v-if="!isload" @click="isload = true" class="result-load">Load more</div>
  </div>
</template>

<script>

import * as echarts from 'echarts'
export default {
  head: {
    title: 'No Result',
  },
  layout: 'default',
  components: {

  },
  props: {

  },
  data () {
    return {
      screenWidth: null,
      isload: false,
      resultData: [
        {
          title: 'Adobe',
          subtitle: 'Dec, 2020',
          dataX: [0, 10 , 20 , 30 ,40 , 50],
          dataY1: [0.94, 0.96, 0.98, 0.95, 0.93, 0.9],
          dataY2: [0.92, 0.9, 0.87, 0.86, 0.85, 0.84]
        },
        {
          title: 'Airbnb',
          subtitle: 'Dec, 2020',
          dataX: [0, 10 , 20 , 30 ,40 , 50],
          dataY1: [0.94, 0.96, 0.98, 0.95, 0.88, 0.82],
          dataY2: [0.96, 0.94, 0.92, 0.9, 0.88, 0.86]
        },
        {
          title: 'Agilent Technologies',
          subtitle: 'Dec, 2020',
          dataX: [0, 10 , 20 , 30 ,40 , 50],
          dataY1: [0.94, 0.96, 0.98, 0.95, 0.88, 0.82],
          dataY2: [0.96, 0.94, 0.92, 0.9, 0.88, 0.86]
        },
        {
          title: 'AdobeX',
          subtitle: 'Dec, 2020',
          dataX: [0, 10 , 20 , 30 ,40 , 50],
          dataY1: [0.94, 0.96, 0.98, 0.95, 0.93, 0.9],
          dataY2: [0.92, 0.9, 0.87, 0.86, 0.85, 0.84]
        },
        {
          title: 'AirbnbX',
          subtitle: 'Dec, 2020',
          dataX: [0, 10 , 20 , 30 ,40 , 50],
          dataY1: [0.94, 0.96, 0.98, 0.95, 0.88, 0.82],
          dataY2: [0.96, 0.94, 0.92, 0.9, 0.88, 0.86]
        },
        {
          title: 'Agilent TechnologiesX',
          subtitle: 'Dec, 2020',
          dataX: [0, 10 , 20 , 30 ,40 , 50],
          dataY1: [0.94, 0.96, 0.98, 0.95, 0.93, 0.9],
          dataY2: [0.92, 0.9, 0.87, 0.86, 0.85, 0.84]
        },
      ],
    }
  },
  mounted () {
    this.screenWidth = window.screen.width
    // 相關搜尋
    for (let i = 0; i < this.resultData.length; i++) {
      this.$echarts.init(document.getElementById(this.resultData[i].title)).setOption(this.lessChart(
        this.resultData[i].dataX,
        this.resultData[i].dataY1,
        this.resultData[i].dataY2
      ))
    }

  },
  computed: {
    lightMode() { return this.$store.state.lightMode },
  },
  methods: {
    goToCompany (name) {
      this.$router.push({
        path: '/company',
        query: {
          step: name
        }
      })
    },
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
  },
  watch: {
    
  }
}
</script>

<style lang="scss" scoped>

.result {
  margin: 88px auto 148px;
  text-align: center;

  &-dbg {
    background-color: #242345;
  }

  &-title {
    font-size: 24px;
    font-weight: bold;
  }

  &-subtitle {
    margin-top: 28px;
  }

  &-main {
    margin-top: 72px;
    font-size: 20px;
  }

  &-chart-outer {
    width: 1058px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin: 28px auto 0px;
  }

  &-chart-box {
    width: 274px;
    height: 196px;
    padding: 24px 30px 0px;
    margin-bottom: 40px;
    box-shadow: 0px 3px 6px #00000014;
    border: 1px solid #EDEDED;
    border-radius: 10px;
    text-align: center;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }

  &-chart-box-none {
    display: none;
  }

  &-chart-title {
    font-size: 20px;
    font-weight: bold;
    color: #9C9C9C;
  }

  &-chart-subtitle {
    margin-top: 4px;
    color: #9C9C9C;
  }

  &-chart {
    width: 282px;
    height: 140px;
  }

  &-load {
    width: 344px;
    height: 48px;
    line-height: 48px;
    margin: 32px auto 0px;
    font-size: 14px;
    background-color: #F7F7F7;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }

}

@media( max-width: 500px ){

  .result {
    width: calc(100% - 42px);
    margin: 96px auto 80px;

    &-title {
      font-size: 20px;
    }

    &-subtitle {
      margin-top: 20px;
    }

    &-main {
      margin-top: 48px;
      font-size: 16px;
    }

    &-chart-outer {
      width: auto;
      padding: 0px;
      margin: 20px auto auto;
    }

    &-chart-box {
      width: calc(100% - 0px);
      margin-bottom: 24px;
      padding: 16px 0px;
    }

    &-chart-title {

    }

    &-chart-subtitle {

    }

    &-chart {
      width: 260px;
      height: 160px;
      margin: auto;
    }

    &-load {
      width: 100%;
      margin: 24px auto 0px;
    }

  }

}

</style>
