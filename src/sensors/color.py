
from time import sleep
from .sensor import Sensor

class ColorSensor(Sensor):
    def __init__(self):
        super().__init__("color")
        self.sense.color.gain = 64
        self.sense.color.integration_cycles = 128

    def read(self):
        color = self.sense.colour.colour 
        return {
            "r": color[0],
            "g": color[1],
            "b": color[2]
        }
