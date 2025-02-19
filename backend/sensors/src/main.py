import time
from redis_client import RedisClient
from sensors import ColorSensor, Compass, Accelerometer, HumiditySensor, PressureSensor, TemperatureSensor

def publish_sensor_data(sensors):
    redis = RedisClient()
    for sensor in sensors:
        readings = sensor.read()
        redis.publish(sensor.channel, readings)

def main():
    while True:
        publish_sensor_data([
            ColorSensor(), 
            Accelerometer(),
            PressureSensor(),
            TemperatureSensor(), 
            HumiditySensor(),
            Compass()
        ])

if __name__ == "__main__":
    main()