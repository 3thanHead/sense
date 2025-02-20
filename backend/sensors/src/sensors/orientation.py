
from time import sleep
from .sensor import Sensor

class OrientationSensor(Sensor):
    def __init__(self):
        super().__init__("orientation")

    def read(self):
        orientation = self.sense.get_orientation()
        return {
            "pitch": round(orientation["pitch"], 0),
            "roll": round(orientation["roll"], 0),
            "yaw": round(orientation["yaw"], 0)
        }
