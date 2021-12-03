import requests
import json
payload={}
headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer {{token}}'
}
def order_status(orderid):
    url = f"https://apiv2.shiprocket.in/v1/external/orders/show/{orderid}"
    response = requests.request("GET", url, headers=headers, data=payload)
    if response.status_code == 200 or response.status_code == 202: #cool
        pass
    if response.status_code == 404 : #not found
        pass
    if response.status_code == 401 : #unauth
        pass

    if response.status_code == 400 : #Bad request
        pass

    if response.status_code == 422 : #error code
        pass

    if response.status_code == 405: #method not allowed
        pass
    if response.status_code == 429 :# to manu
        pass

    if response.status_code == 500 or response.status_code ==  502 or \
            response.status_code ==  503 or response.status_code ==  504 :#internal error
        pass