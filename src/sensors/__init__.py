# Import submodules to make them available at the package level
from .color import ColorSensor
from .motion import MotionSensor
from .temperature import TemperatureSensor
from .humidity import HumiditySensor

# Specify what is available for import when using 'from sensors import *'
__all__ = ['ColorSensor', 'MotionSensor', 'TemperatureSensor', 'HumiditySensor']