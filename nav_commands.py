# Evan Widloski - 2017-09-03
# Convenience functions for building mission

"""
Command position arguments:
- target_system    : This can be set to any value (DroneKit changes the value to the MAVLink ID of the connected vehicle before the command is sent).
- target_component : The component id if the message is intended for a particular component within the target system (for example, the camera). Set to zero (broadcast) in most cases.
- seq              : The sequence number within the mission (the autopilot will reject messages sent out of sequence). This should be set to zero as the API will automatically set the correct value when uploading a mission.
- frame            : The frame of reference used for the location parameters (x, y, z). In most cases this will be mavutil.mavlink.MAV_FRAME_GLOBAL_RELATIVE_ALT, which uses the WGS84 global coordinate system for latitude and longitude, but sets altitude as relative to the home position in metres (home altitude = 0). For more information see the wiki here.
- command          : The specific mission command (e.g. mavutil.mavlink.MAV_CMD_NAV_WAYPOINT). The supported commands (and command parameters are listed on the wiki.
- current          : Set to zero (not supported).
- autocontinue     : Set to zero (not supported).
- param1           : Command specific parameter (depends on specific Mission Command (MAV_CMD)).
- param2           : Command specific parameter.
- param3           : Command specific parameter.
- param4           : Command specific parameter.
- x                : (param5) Command specific parameter used for latitude (if relevant to command).
- y                : (param6) Command specific parameter used for longitude (if relevant to command).
- z                : (param7) Command specific parameter used for altitude (if relevant). The reference frame for altitude depends on the frame.
"""

from dronekit import Command, LocationGlobal
from pymavlink import mavutil


# takeoff to specified altitude (meters)
def takeoff(altitude):
    return Command(0, 0, 0, mavutil.mavlink.MAV_FRAME_GLOBAL_RELATIVE_ALT, mavutil.mavlink.MAV_CMD_NAV_TAKEOFF, 0, 0, 0, 0, 0, 0, 0, 0, altitude)

# goto coords (meters)
def goto_absolute_nea(lat, lon, altitude):
    return Command(0, 0, 0, mavutil.mavlink.MAV_FRAME_GLOBAL_RELATIVE_ALT, mavutil.mavlink.MAV_CMD_NAV_WAYPOINT, 0, 0, 0, 0, 0, 0, lat, lon, altitude)

# hold position at waypoint for given seconds
def delay(time):
    return Command(0, 0, 0, mavutil.mavlink.MAV_FRAME_GLOBAL_RELATIVE_ALT, mavutil.mavlink.MAV_CMD_CONDITION_DELAY, 0, 0, time, 0, 0, 0, 0, 0, 0)
