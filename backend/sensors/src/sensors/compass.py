
from time import sleep
from .sensor import Sensor

class Compass(Sensor):
    def __init__(self):
        super().__init__("compass")

    def read(self):
        return self.sense.get_compass_raw() 
