import requests

def is_palindrome(data: dict, response: dict):
    """
    data: Data coming from the server
    response: The response that goes to the server
    """
    if data['message'].lower() == data['message'][::-1].lower():
        response["is_palindrome"] = f"✅ '{data['message']}' => '{data['message'][::-1]}' is Palindrome"
    else:
        response["is_palindrome"] = f"❌ '{data['message']}' => '{data['message'][::-1]}' is not Palindrome!"
    
    print(" New Word ".center(50, "-"))
    print(f"{data['message']} => {data['message'][::-1]}")
    
    requests.post("http://127.0.0.1:9090/is-palindrome", json=response)