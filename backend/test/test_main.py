import requests
import pytest

BASE_URL = "http://localhost:5000"  # Replace with your actual Flask app URL

# /getBasicRoute
def test_get_basic_route_success():
    url = BASE_URL + "/getBasicRoute"
    params = {"start": "location1", "end": "location2"}
    response = requests.get(url, params=params)
    assert response.status_code == 200
    assert "route" in response.json()

def test_get_basic_route_missing_start():
    url = BASE_URL + "/getBasicRoute"
    params = {"end": "location2"}
    response = requests.get(url, params=params)
    assert response.status_code > 200
    # assert "error" in response.json()

def test_get_basic_route_invalid_end():
    url = BASE_URL + "/getBasicRoute"
    params = {"start": "location1", "end": 12345}
    response = requests.get(url, params=params)
    assert response.status_code > 200
    # assert "error" in response.json()

# /getRoute
def test_get_route_success():
    url = BASE_URL + "/getRoute"
    params = {"start": "location1", "end": "location2"}
    response = requests.get(url, params=params)
    assert response.status_code == 200
    assert "route" in response.json()

def test_get_route_missing_start():
    url = BASE_URL + "/getRoute"
    params = {"end": "location2"}
    response = requests.get(url, params=params)
    assert response.status_code > 200
    # assert "error" in response.json()

def test_get_route_invalid_start():
    url = BASE_URL + "/getRoute"
    params = {"start": 12345, "end": "location2"}
    response = requests.get(url, params=params)
    assert response.status_code > 200
    # assert "error" in response.json()

# /createUser
def test_create_user_success():
    url = BASE_URL + "/createUser"
    json_data = {"username": "user123", "password": "password123"}
    response = requests.post(url, json=json_data)
    assert response.status_code == 201
    assert "user_id" in response.json()

def test_create_user_missing_username():
    url = BASE_URL + "/createUser"
    json_data = {"password": "password123"}
    response = requests.post(url, json=json_data)
    assert response.status_code > 200
    # assert "error" in response.json()

def test_create_user_invalid_password():
    url = BASE_URL + "/createUser"
    json_data = {"username": "user123", "password": ""}
    response = requests.post(url, json=json_data)
    assert response.status_code > 200
    # assert "error" in response.json()

# /deleteUser
def test_delete_user_success():
    url = BASE_URL + "/deleteUser"
    json_data = {"user_id": 1}
    response = requests.delete(url, json=json_data)
    assert response.status_code == 200
    assert "message" in response.json()

def test_delete_user_missing_user_id():
    url = BASE_URL + "/deleteUser"
    json_data = {}
    response = requests.delete(url, json=json_data)
    assert response.status_code > 200
    # assert "error" in response.json()

def test_delete_user_invalid_user_id():
    url = BASE_URL + "/deleteUser"
    json_data = {"user_id": "invalid_id"}
    response = requests.delete(url, json=json_data)
    assert response.status_code > 200
    # assert "error" in response.json()

# /editUser
def test_edit_user_success():
    url = BASE_URL + "/editUser"
    json_data = {"user_id": 1, "new_username": "new_user123"}
    response = requests.put(url, json=json_data)
    assert response.status_code == 200
    assert "message" in response.json()

def test_edit_user_missing_user_id():
    url = BASE_URL + "/editUser"
    json_data = {"new_username": "new_user123"}
    response = requests.put(url, json=json_data)
    assert response.status_code > 200
    # assert "error" in response.json()

def test_edit_user_invalid_user_id():
    url = BASE_URL + "/editUser"
    json_data = {"user_id": "invalid_id", "new_username": "new_user123"}
    response = requests.put(url, json=json_data)
    assert response.status_code > 200
    # assert "error" in response.json()

# /login
def test_login_success():
    url = BASE_URL + "/login"
    json_data = {"username": "user123", "password": "password123"}
    response = requests.post(url, json=json_data)
    assert response.status_code == 200
    assert "token" in response.json()

def test_login_missing_username():
    url = BASE_URL + "/login"
    json_data = {"password": "password123"}
    response = requests.post(url, json=json_data)
    assert response.status_code > 200
    # assert "error" in response.json()

def test_login_invalid_password():
    url = BASE_URL + "/login"
    json_data = {"username": "user123", "password": "wrongpassword"}
    response = requests.post(url, json=json_data)
    assert response.status_code == 401
    # assert "error" in response.json()

# /carparksNearby
def test_carparks_nearby_success():
    url = BASE_URL + "/carparksNearby"
    params = {"location": "location1"}
    response = requests.get(url, params=params)
    assert response.status_code == 200
    assert "carparks" in response.json()

def test_carparks_nearby_missing_location():
    url = BASE_URL + "/carparksNearby"
    params = {}
    response = requests.get(url, params=params)
    assert response.status_code > 200
    # assert "error" in response.json()

def test_carparks_nearby_invalid_location():
    url = BASE_URL + "/carparksNearby"
    params = {"location": 12345}
    response = requests.get(url, params=params)
    assert response.status_code > 200
    # assert "error" in response.json()

# /carparkPricing
def test_carpark_pricing_success():
    url = BASE_URL + "/carparkPricing"
    params = {"carpark_id": 1}
    response = requests.get(url, params=params)
    assert response.status_code == 200
    assert "pricing" in response.json()

def test_carpark_pricing_missing_carpark_id():
    url = BASE_URL + "/carparkPricing"
    params = {}
    response = requests.get(url, params=params)
    assert response.status_code > 200
    # assert "error" in response.json()

def test_carpark_pricing_invalid_carpark_id():
    url = BASE_URL + "/carparkPricing"
    params = {"carpark_id": "invalid_id"}
    response = requests.get(url, params=params)
    assert response.status_code > 200
    # assert "error" in response.json()

# /carparkLots
def test_carpark_lots_success():
    url = BASE_URL + "/carparkLots"
    params = {"carpark_id": 1}
    response = requests.get(url, params=params)
    assert response.status_code == 200
    assert "available_lots" in response.json()

def test_carpark_lots_missing_carpark_id():
    url = BASE_URL + "/carparkLots"
    params = {}
    response = requests.get(url, params=params)
    assert response.status_code > 200
    # assert "error" in response.json()

def test_carpark_lots_invalid_carpark_id():
    url = BASE_URL + "/carparkLots"
    params = {"carpark_id": "invalid_id"}
    response = requests.get(url, params=params)
    assert response.status_code > 200
    # assert "error" in response.json()

# /bookCarpark
def test_book_carpark_success():
    url = BASE_URL + "/bookCarpark"
    json_data = {"user_id": 1, "carpark_id": 1, "time_slot": "2025-04-12T12:00:00"}
    response = requests.post(url, json=json_data)
    assert response.status_code == 200
    assert "booking_id" in response.json()

def test_book_carpark_missing_user_id():
    url = BASE_URL + "/bookCarpark"
    json_data = {"carpark_id": 1, "time_slot": "2025-04-12T12:00:00"}
    response = requests.post(url, json=json_data)
    assert response.status_code > 200
    # assert "error" in response.json()

def test_book_carpark_invalid_time_slot():
    url = BASE_URL + "/bookCarpark"
    json_data = {"user_id": 1, "carpark_id": 1, "time_slot": "invalid_time"}
    response = requests.post(url, json=json_data)
    assert response.status_code > 200
    # assert "error" in response.json()

# /getBookings
def test_get_bookings_success():
    url = BASE_URL + "/getBookings"
    params = {"user_id": 1}
    response = requests.get(url, params=params)
    assert response.status_code == 200
    assert "bookings" in response.json()

def test_get_bookings_missing_user_id():
    url = BASE_URL + "/getBookings"
    params = {}
    response = requests.get(url, params=params)
    assert response.status_code > 200
    # assert "error" in response.json()

def test_get_bookings_invalid_user_id():
    url = BASE_URL + "/getBookings"
    params = {"user_id": "invalid_id"}
    response = requests.get(url, params=params)
    assert response.status_code > 200
    # assert "error" in response.json()

# /deleteBooking
def test_delete_booking_success():
    url = BASE_URL + "/deleteBooking"
    json_data = {"booking_id": 1}
    response = requests.delete(url, json=json_data)
    assert response.status_code == 200
    assert "message" in response.json()

def test_delete_booking_missing_booking_id():
    url = BASE_URL + "/deleteBooking"
    json_data = {}
    response = requests.delete(url, json=json_data)
    assert response.status_code > 200
    # assert "error" in response.json()

def test_delete_booking_invalid_booking_id():
    url = BASE_URL + "/deleteBooking"
    json_data = {"booking_id": "invalid_id"}
    response = requests.delete(url, json=json_data)
    assert response.status_code > 200
    # assert "error" in response.json()

# /checkinCarpark
def test_checkin_carpark_success():
    url = BASE_URL + "/checkinCarpark"
    json_data = {"booking_id": 1}
    response = requests.post(url, json=json_data)
    assert response.status_code == 200
    assert "message" in response.json()

def test_checkin_carpark_missing_booking_id():
    url = BASE_URL + "/checkinCarpark"
    json_data = {}
    response = requests.post(url, json=json_data)
    assert response.status_code > 200
    # assert "error" in response.json()

def test_checkin_carpark_invalid_booking_id():
    url = BASE_URL + "/checkinCarpark"
    json_data = {"booking_id": "invalid_id"}
    response = requests.post(url, json=json_data)
    assert response.status_code > 200
    # assert "error" in response.json()

# /PublicTransportRoute
def test_public_transport_route_success():
    url = BASE_URL + "/PublicTransportRoute"
    params = {"start": "location1", "end": "location2"}
    response = requests.get(url, params=params)
    assert response.status_code == 200
    assert "route" in response.json()

def test_public_transport_route_missing_start():
    url = BASE_URL + "/PublicTransportRoute"
    params = {"end": "location2"}
    response = requests.get(url, params=params)
    assert response.status_code > 200
    # assert "error" in response.json()

def test_public_transport_route_invalid_location():
    url = BASE_URL + "/PublicTransportRoute"
    params = {"start": 12345, "end": "location2"}
    response = requests.get(url, params=params)
    assert response.status_code > 200
    # assert "error" in response.json()

# /CongestionData
def test_congestion_data_success():
    url = BASE_URL + "/CongestionData"
    params = {"location": "location1"}
    response = requests.get(url, params=params)
    assert response.status_code == 200
    assert "congestion_level" in response.json()

def test_congestion_data_missing_location():
    url = BASE_URL + "/CongestionData"
    params = {}
    response = requests.get(url, params=params)
    assert response.status_code > 200
    # assert "error" in response.json()

def test_congestion_data_invalid_location():
    url = BASE_URL + "/CongestionData"
    params = {"location": 12345}
    response = requests.get(url, params=params)
    assert response.status_code > 200
    # assert "error" in response.json()
