from sense_hat import SenseHat
from abc import ABC, abstractmethod

class Sensor(ABC):
    def __init__(self, channel):
        self.sense = SenseHat()
        self.sense.clear()
        self.channel = channel

    @abstractmethod
    def read(self):
        pass