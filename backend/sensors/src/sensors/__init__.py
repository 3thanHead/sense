# Import submodules to make them available at the package level
from .color import ColorSensor
from .temperature import TemperatureSensor
from .humidity import HumiditySensor
from .orientation import OrientationSensor
from .pressure import PressureSensor

# Specify what is available for import when using 'from sensors import *'
__all__ = ['ColorSensor', 'OrientationSensor', 'TemperatureSensor', 'HumiditySensor', 'PressureSensor']