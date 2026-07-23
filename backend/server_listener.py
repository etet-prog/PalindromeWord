from requests import get, post
from time import sleep

def is_palindrome(data: dict, response: dict):
    """
    data: Data coming from the server
    response: The response that goes to the server
    """
    if data['message'].lower() == data['message'][::-1].lower():
        response["word"] = f"✅ '{data['message']}' => '{data['message'][::-1]}' is a Palindrome"
    else:
        response["word"] = f"❌ '{data['message']}' => '{data['message'][::-1]}' is not a Palindrome!"
    
    print(" New Word ".center(50, "-"))
    print(f"{data['message']} => {data['message'][::-1]}")
    
    post("http://127.0.0.1:9090/is-palindrome", json=response)

def create_listener(time_sleep=1):
    """
    time_sleep: Specifies how many seconds to check whether a new message has arrived from the server
    default: Every second
    """
    print("listening on server...")
    while True:
        res = get("http://127.0.0.1:9090/message")
        data = res.json()
        if data['message']:
            if data['status'] == "Sent":
                is_palindrome(data, {"word" : None})
                post("http://127.0.0.1:9090/status", json={"status" : "Received"})

        sleep(time_sleep)

create_listener()