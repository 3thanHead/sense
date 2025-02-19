from .sensor import Sensor

class PressureSensor(Sensor):
    def __init__(self):
        super().__init__("pressure")

    def read(self):
        return self.sense.get_pressure()
