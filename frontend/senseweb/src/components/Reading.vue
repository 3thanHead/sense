<template>
    <div class="reading-card">
        <v-card @click="toggleExpand">
            <v-card-title>{{ reading.title }}</v-card-title>
            <v-card-text>{{ reading.value }}</v-card-text>
        </v-card>
        <v-expand-transition>
            <div v-if="expanded" class="chart-container">
                <apexchart type="line" :options="chartOptions" :series="chartSeries"></apexchart>
            </div>
        </v-expand-transition>
    </div>
</template>

<script>
import VueApexCharts from 'vue3-apexcharts'

export default {
    name: 'Reading',
    components: {
        apexchart: VueApexCharts
    },
    data() {
        return {
            expanded: false,
            reading: {
                title: 'Sample Reading',
                value: '123'
            },
            chartOptions: {
                chart: {
                    id: 'reading-chart'
                },
                xaxis: {
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
                }
            },
            chartSeries: [{
                name: 'Reading',
                data: [30, 40, 35, 50, 49, 60, 70]
            }]
        }
    },
    methods: {
        toggleExpand() {
            this.expanded = !this.expanded
        }
    }
}
</script>

<style scoped>
.reading-card {
    margin: 20px;
}
.chart-container {
    margin-top: 20px;
}
</style>