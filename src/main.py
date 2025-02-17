import time
import json
from redis_client import RedisClient
from sensors import ColorSensor, MotionSensor, TemperatureSensor, HumiditySensor

def publish_sensor_data(sensors):
    redis = RedisClient()
    for sensor in sensors:
        readings = sensor.read()
        redis.publish(sensor.channel, readings)

def main():
    while True:
        publish_sensor_data([
            ColorSensor(), 
            MotionSensor(), 
            TemperatureSensor(), 
            HumiditySensor()
        ])

if __name__ == "__main__":
    main()