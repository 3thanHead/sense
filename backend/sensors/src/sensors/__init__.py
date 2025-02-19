# Import submodules to make them available at the package level
from .color import ColorSensor
from .accelerometer import Accelerometer
from .temperature import TemperatureSensor
from .humidity import HumiditySensor
from .compass import Compass
from .pressure import PressureSensor

# Specify what is available for import when using 'from sensors import *'
__all__ = ['ColorSensor', 'Accelerometer', 'TemperatureSensor', 'HumiditySensor', 'Compass', 'PressureSensor']