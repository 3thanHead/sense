from time import sleep
from .sensor import Sensor

class TemperatureSensor(Sensor):
    def __init__(self):
        super().__init__("temperature")
        # Initialize temperature sensor specific settings if any

    def read(self):
        temperature = self.sense.get_temperature()
        return {
            "temperature": temperature
        }
