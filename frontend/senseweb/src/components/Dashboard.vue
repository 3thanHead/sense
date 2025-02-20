<template>
  <v-container class="fill-height">
    <v-responsive
      class="align-centerfill-height mx-auto"
      max-width="900"
    >
      <div class="text-center">
        <h1 class="text-h2 font-weight-bold">SEL Demo</h1>
      </div>
      <div class="py-4" />
      <v-row>
        <v-col cols="6" v-if="selected == 'temperature' || selected == null">
          <v-card
            class="py-4"
            color="surface-variant"
            @click="selected = 'temperature'"
            rel="noopener noreferrer"
            rounded="lg"
            target="_blank"
            variant="outlined"
          >
            <v-card-item>
              <v-row>
                <v-col class="align-self-center" cols="5">
                  Temperature
                </v-col>
                <v-col class="align-self-center" cols="7">
                  {{ sensorStore.temperature }}
                </v-col>
              </v-row>
            </v-card-item>
          </v-card>
        </v-col>
        <v-col cols="6"  v-if="selected == 'pressure' || selected == null">
          <v-card
            class="py-4"
            color="surface-variant"
            @click="selected = 'pressure'"
            rel="noopener noreferrer"
            rounded="lg"
            target="_blank"
            variant="outlined"
          >
            <v-card-item>
              <v-row>
                <v-col class="align-self-center" cols="5">
                  Pressure
                </v-col>
                <v-col class="align-self-center" cols="7">
                  {{ sensorStore.pressure }}
                </v-col>
              </v-row>
            </v-card-item>
          </v-card>
        </v-col>

        <v-col cols="6" v-if="!selected">
          <v-card
            class="py-4"
            color="surface-variant"
            @click="selected = 'color'"
            rel="noopener noreferrer"
            rounded="lg"
            target="_blank"
            variant="outlined"
          >
            <v-card-item>
              <v-row>
                <v-col class="align-self-center" cols="5">
                  Color
                </v-col>
                <v-col class="align-self-center" cols="7">
                  <div :style="{ 
                    textAlign: 'center',
                    borderRadius: '8px', 
                    backgroundColor: `rgb(${sensorStore.color.r}, ${sensorStore.color.g}, ${sensorStore.color.b})`,
                    color: 'white'}"
                  >{{ sensorStore.color }}</div>
                </v-col>
              </v-row>
            </v-card-item>
          </v-card>
        </v-col>
        <v-col cols="6" v-if="!selected">
          <v-card
            class="py-4"
            color="surface-variant"
            rel="noopener noreferrer"
            rounded="lg"
            target="_blank"
            variant="outlined"
          >
            <v-card-item>
              <v-row>
                <v-col class="align-self-center" cols="3">
                  Orientation
                </v-col>
                <v-col class="align-self-center" cols="9">
                  {{ sensorStore.isLevel ? "It's Level 👍": sensorStore.orientation }}
                </v-col>
              </v-row>
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>
      <br>
      <apexchart v-if="selected" type="line" :options="sensorStore.chartOptions.chart" :series="sensorStore.chartOptions.series[selected]"></apexchart>
    </v-responsive>
  </v-container>
</template>

<script setup>
  import { useSensorStore } from '@/store/sensor'
  import { ref } from 'vue';

  const sensorStore = useSensorStore()
  const unsubscribe = sensorStore.subscribe()

  const selected = ref(null)
</script>
