
from time import sleep
from .sensor import Sensor

class Accelerometer(Sensor):
    def __init__(self):
        super().__init__("accelerometer")

    def read(self):
        return self.sense.get_accelerometer_raw() 
