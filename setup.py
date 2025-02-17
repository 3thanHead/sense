from setuptools import setup, find_packages

setup(
    name="sense",
    version="0.1.0",
    description="A service for publishing Raspberry Pi Sense HAT data to Redis",
    author="Ethan Head",
    packages=find_packages(),
    entry_points={
        'console_scripts': [
            'sense=main:main',
        ],
    },
    python_requires='>=3.8',
    extras_require={
        'dev': [
            'pytest>=6.2.4',
        ],
    },
)