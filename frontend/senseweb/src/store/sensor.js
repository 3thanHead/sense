import { defineStore } from 'pinia'

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useCounterStore = defineStore('counter', () => {
    const temperature = ref(0)
    const humidity = ref(0)
    const pressure = ref(0)
    const color = ref({ r: 0, g: 0, b: 0 })
    const position = ref({ x: 0, y: 0, z: 0 })
    // Create a GraphQL WebSocket client
    const client = createClient({
        url: `ws://${window.location.hostname}:8080/graphql`,
    });



    function subscribeToSensorUpdates() {
        return client.subscribe(
            {
                query: `
                    subscription {
                        sensorData {
                            temperature
                            humidity
                            pressure
                            color {
                                r
                                g
                                b
                            }
                            position {
                                x
                                y
                                z
                            }
                        }
                    }
                `,
            },
            {
                next: (data) => {
                    const sensorData = data.data.sensorData;
                    temperature.value = sensorData.temperature;
                    humidity.value = sensorData.humidity;
                    pressure.value = sensorData.pressure;
                    position.value = sensorData.position;
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

    return { temperature, humidity, pressure, color, position, subscribeToSensorUpdates } 
})