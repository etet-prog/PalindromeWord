from requests import get, post
from fetch import is_palindrome
from time import sleep

def create_listener(time_sleep=1):
    """
    time_sleep: Specifies how many seconds to check whether a new message has arrived from the server
    default: Every second
    """
    print("listening on server...")
    while True:
        res = get("http://127.0.0.1:9090/message-get")
        data = res.json()
        if data['message']:
            if data['status'] == "Sent":
                is_palindrome(data, {"is_palindrome" : None})
                post("http://127.0.0.1:9090/status-post", json={"status" : "Received"})

        sleep(time_sleep)

create_listener()