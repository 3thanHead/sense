from .sensor import Sensor

class PressureSensor(Sensor):
    def __init__(self):
        super().__init__("pressure")

    def read(self):
        return {
            "value": self.sense.get_pressure()
        }
