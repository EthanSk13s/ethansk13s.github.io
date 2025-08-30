# Alarm-board
> A bedside alarm clock with third-party weather forecasting and auto-brightness adjustments.

[Repository](https://github.com/EthanSk13s/alarm-board)

It started as a project to replace my old alarm clock out of annoyance of having to reset my alarm settings due to
the occasional breaker trip that happens a little too often. It is also a project started out of interest in the
Embedded software world. In this case, for future experimenting and familiarity, the Raspberry Pi 4 was selected.

The auto-brightness adjustment is handled by an I2C communication with the Pi's GPIO pins, and is adjusted by writing
to the monitor's brightness file located in the UNIX system. This reading is made with a custom library that reads from the
chip with the help of an external library.

As for the original goal of having to reset my alarm settings, the alarm is saved to a configuration file that is
read and written to, so there is no need to reset it over and over again :)

![Front Preview](/imgs/alarm-board-front.jpg)

Weather forecasting is taken from [OpenWeatherMap](https://openweathermap.org/)'s OneCall API, and is updated hourly.

![Weekly Preview](/imgs/alarm-board-weather-weekly.jpg)
![Current Preview](/imgs/alarm-board-weather-current.jpg)

There are future plans to integrate other kinds of things for the application, such as custom theming, more customizability, and
other third-party integrations to make it more of a nightstand dashboard that can be helpful after waking up.

It is built in C with minimal dependencies in mind with only three external libraries. [Raylib](https://www.raylib.com/) 
for lightweight graphics, input, and audio handling. [cJSON](https://github.com/DaveGamble/cJSON) for handling third-party
weather forecasting. Lastly, [pigpio](https://abyz.me.uk/rpi/pigpio/index.html) for handling I2C communication with the light
sensor.

## Full parts list
- Raspberry Pi 4
- Raspberry Pi Touch Display 2
- [Pibow Frame](https://shop.pimoroni.com/products/pibow-frame-for-raspberry-pi-touch-display-2?variant=53514323001723)
- Adafruit VEML7700 Lux Sensor
- Any External USB speaker