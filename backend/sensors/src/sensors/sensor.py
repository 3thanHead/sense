from sense_hat import SenseHat
from abc import ABC, abstractmethod

class Sensor(ABC):
    _sense = SenseHat()
    _sense.clear()
    
    def __init__(self, channel):
        self.channel = channel

    @property
    def sense(self):
        return self.__class__._sense

    @abstractmethod
    def read(self):
        pass