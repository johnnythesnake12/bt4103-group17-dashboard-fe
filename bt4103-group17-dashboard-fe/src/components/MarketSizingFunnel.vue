<template>
    <div style="margin-top: 60px;">
      <h3 class="funnel-title">📊 Market Sizing Funnel – {{ selectedFunnelMarket }}</h3>
      <div class="funnel-header-top-left">
        <div class="dropdown-wrapper inline">
          <label for="market-select">Market:</label>
          <select id="market-select" v-model="selectedFunnelMarket" class="dropdown">
            <option v-for="market in funnelMarkets" :key="market" :value="market">
              {{ market }}
            </option>
          </select>
        </div>
      </div>
  
      <apexchart
        type="bar"
        height="400"
        :options="funnelOptions"
        :series="funnelSeries"
      />
  
      <div class="revenue-connector">
        <div class="line"></div>
        <svg height="30" width="30" viewBox="0 0 24 24" fill="#2196F3">
          <path d="M12 2v14.17l-4.59-4.58L6 13l6 6 6-6-1.41-1.41L12 16.17V2z" />
        </svg>
      </div>
      <div class="revenue-annotation">
        <div class="revenue-text">
          <strong>Revenue Potential:</strong>
          {{ revenueText[selectedFunnelMarket] }}
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import ApexChart from 'vue3-apexcharts';
  
  export default {
    name: 'MarketSizingFunnel',
    components: { apexchart: ApexChart },
    data() {
      return {
        selectedFunnelMarket: 'Malaysia',
        funnelMarkets: ['Malaysia', 'Indonesia', 'Thailand', 'Singapore', 'Vietnam'],
        funnelDataMap: {
          Malaysia: [31028030, 780000, 370000, 296000],
          Indonesia: [275000000, 20000000, 3000000, 150000],
          Thailand: [70000000, 6280000, 945000, 472500],
          Singapore: [5870750, 1990185, 522497, 417998],
          Vietnam: [97000000, 4330000, 649500, 324750]
        },
        revenueText: {
          Malaysia: '$230,400',
          Indonesia: '$3.2M',
          Thailand: '$1.13M',
          Singapore: '$316,040',
          Vietnam: '$779,400'
        },
        funnelSeries: [
          {
            name: 'Market Sizing (Malaysia)',
            data: [31028030, 780000, 370000, 296000]
          }
        ],
        funnelOptions: {
          chart: {
            type: 'bar',
            height: 400
          },
          plotOptions: {
            bar: {
              borderRadius: 4,
              horizontal: true,
              barHeight: '70%',
              isFunnel: true
            }
          },
          dataLabels: {
            enabled: true,
            formatter: function (val, opt) {
              const stage = opt.w.globals.labels[opt.dataPointIndex];
              return `${stage}: ${val >= 1e6 ? (val / 1e6).toFixed(1) + 'M' : val.toLocaleString()}`;
            },
            style: {
              fontSize: '12px',
              colors: ['#fff']
            },
            dropShadow: {
              enabled: true
            }
          },
          xaxis: {
            categories: [
              'Total Population',
              'Diabetic Population',
              'VTDR Cases',
              'Target Population (Customers)'
            ],
            labels: {
              formatter: (val) => (val >= 1e6 ? val / 1e6 + 'M' : val.toLocaleString())
            }
          },
          fill: {
            colors: ['#1976D2', '#1E88E5', '#2196F3', '#42A5F5', '#64B5F6']
          },
          title: {
            text: '',
            align: 'center'
          },
          legend: {
            show: false
          }
        }
      };
    },
    watch: {
      selectedFunnelMarket(newMarket) {
        this.funnelSeries = [
          {
            name: `Market Sizing (${newMarket})`,
            data: this.funnelDataMap[newMarket]
          }
        ];
      }
    }
  };
  </script>
  
  <style scoped>
  .funnel-header-top-left {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 12px;
  }
  .dropdown-wrapper.inline {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .dropdown {
    padding: 6px 12px;
    border-radius: 6px;
    border: 1px solid #ccc;
    font-size: 14px;
  }
  .funnel-title {
    font-size: 20px;
    font-weight: 600;
    margin: 0;
  }
  .revenue-annotation {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    font-size: 16px;
    font-weight: 500;
  }
  </style>
  