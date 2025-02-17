
from time import sleep
from .sensor import Sensor

class MotionSensor(Sensor):
    def __init__(self):
        super().__init__("motion")

    def read(self):
        return self.sense.get_accelerometer_raw() 
