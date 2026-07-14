"""
Monday Nov 10, 2025
Loading with Counter
Coded by Emad
"""
from time import sleep

def loading_msg(msg = "LOADING", _range = 100, tick = 1, is_on=True):
    """
    Loading message with animation and custom msg , range, tick
    msg: The message you want to be written | Default: "LOADING"
    _range: Set the number range | Default: 100
    tick: Set the tick | Default: 1
    """
    i = 0
    counter = 0
    while is_on:
        print("\r" + msg, end="", flush=True)
        counter += 1
        i += 1
        i %= 4
        print(i * ".", end="", flush=True)
        print(" " * 3 + "\b" * 3, end="", flush=True)
        sleep(tick)
    print()
    print("\r" + "\b" * len(msg) + " " * len(msg), end="", flush=True)

