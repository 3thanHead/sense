from time import sleep
from .sensor import Sensor

class HumiditySensor(Sensor):
    def __init__(self):
        super().__init__("humidity")
        # Initialize humidity sensor specific settings if any

    def read(self):
        return self.sense.get_humidity()
