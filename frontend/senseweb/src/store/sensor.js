import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { createClient } from 'graphql-ws'

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useSensorStore = defineStore('sensor', () => {
    const temperature = ref(0)
    const humidity = ref(0)
    const pressure = ref(0)
    const color = ref({ r: 0, g: 0, b: 0 })
    const orientation = ref({ roll: 0, pitch: 0, yaw: 0 })
    // Create a GraphQL WebSocket client
    const client = createClient({
        url: `ws://${window.location.hostname}:8080/graphql`,
    });

    const levelThreshold = 5

    const isLevel = computed(() => {
        return (
            orientation.value.roll <= levelThreshold
            && orientation.value.roll >= 0 
            && orientation.value.pitch <= levelThreshold
            && orientation.value.pitch >= 0
        ) || (
            orientation.value.roll <= 360 && orientation.value.roll >= (360 - levelThreshold)
            && orientation.value.pitch <= 360 && orientation.value.pitch >= (360 - levelThreshold)
        );
    });

    const chartOptions = ref({
        series: {
            temperature : [{
                name: 'Temperature',
                data: [],
            }],
            humidity: [{
                name: 'Humidity',
                data: [],
            }],
            pressure: [{
                name: 'Pressure',
                data: [],
            }],
            color: [{
                name: 'Color',
                data: [],
            }],
            orientation: [{
                name: 'Orientation',
                data: [],
            }],
        },
        chart: {
            id: 'realtime',
            height: 350,
            type: 'line',
            animations: {
                enabled: false,
            },
            toolbar: {
                show: false,
            },
            zoom: {
                enabled: false,
            },
        },
        xaxis: {
            type: 'datetime',
        },
        stroke: {
            curve: 'smooth',
        },
        markers: {
            size: 0,
        },
        yaxis: {
            min: 0,
            max: 100,
        },
    })

    function updateChart(newValue, seriesprop) {
        const newData = {
            x: new Date().getTime(),
            y: newValue
        };
        chartOptions.value.series[seriesprop][0].data.push(newData);
        if (chartOptions.value.series[seriesprop][0].data.length > 100) {
            chartOptions.value.series[seriesprop][0].data.shift();
        }
    }


    function colorSubscribe() {
        return client.subscribe(
            {
                query: `
                    subscription {
                        color { r g b }
                    }
                `,
            },
            {
                next: (data) => {
                    color.value = data.data.color;
                },
                error: (err) => {
                    console.error('Subscription error:', err);
                },
                complete: () => {
                    console.log('Subscription complete');
                },
            }
        );
    }

    function temperatureSubscribe() {
        return client.subscribe(
            {
                query: `
                    subscription {
                        temperature {
                            value
                        }
                    }
                `,
            },
            {
                next: (data) => {
                    temperature.value = data.data.temperature.value;
                    updateChart(data.data.temperature.value, 'temperature');
                },
                error: (err) => {
                    console.error('Subscription error:', err);
                },
                complete: () => {
                    console.log('Subscription complete');
                },
            }
        );
    }

    function humiditySubscribe() {
        return client.subscribe(
            {
                query: `
                    subscription {
                        humidity {
                            value
                        }
                    }
                `,
            },
            {
                next: (data) => {
                    humidity.value = data.data.humidity.value;
                },
                error: (err) => {
                    console.error('Subscription error:', err);
                },
                complete: () => {
                    console.log('Subscription complete');
                },
            }
        );
    }

    function pressureSubscribe() {
        return client.subscribe(
            {
                query: `
                    subscription {
                        pressure {
                            value
                        }
                    }
                `,
            },
            {
                next: (data) => {
                    pressure.value = data.data.pressure.value;
                    updateChart(data.data.pressure.value, 'pressure');
                },
                error: (err) => {
                    console.error('Subscription error:', err);
                },
                complete: () => {
                    console.log('Subscription complete');
                },
            }
        );
    }

    function orientationSubscribe() {
        return client.subscribe(
            {
                query: `
                    subscription {
                        orientation { roll pitch yaw }
                    }
                `,
            },
            {
                next: (data) => {
                    orientation.value = data.data.orientation;
                },
                error: (err) => {
                    console.error('Subscription error:', err);
                },
                complete: () => {
                    console.log('Subscription complete');
                },
            }
        );
    }

    function subscribe() {
        colorSubscribe();
        temperatureSubscribe();
        humiditySubscribe();
        pressureSubscribe();
        orientationSubscribe();
    }

    return { temperature, humidity, pressure, color, orientation, subscribe, chartOptions, updateChart, isLevel } 
})