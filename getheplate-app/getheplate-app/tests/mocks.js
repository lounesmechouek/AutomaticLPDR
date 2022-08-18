export const Mock = {
    Login : (username,password) => Promise.resolve(userLog ) ,
    LoginFailed : (username,password)=> Promise.reject(noUserLog ) ,
    verifLogin : token => Promise.resolve(verifToken),
    verifLoginFailed : token => Promise.reject(verifTokenFailed),
    getScans : user_id => Promise.resolve(scans.data),
    getScansFailed : user_id => Promise.resolve(emptyScans),
    getScanPhotos : scan_id => Promise.resolve(scanPhotos.data)
}

export const userLog = {
    "data": {
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY2MDY1NzE3OCwianRpIjoiZWY4NzYzNzAtMTFlNi00YWM2LWI5N2UtNjI5NzBiYzBiMzk4IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6eyJpZCI6MSwidXNlcm5hbWUiOiJtYWRqaWQiLCJoc2hfcGFzc3dvcmQiOiJwYmtkZjI6c2hhMjU2OjI2MDAwMCRJMWxlbnZwc3Zzb0dYNEJwJDQzZWQ3YmFjYzU5YjI2MDkxYWNkNzQ0ZDdjNWM4ZTllY2QwNjEyMTQ3YzIwMDkwNGY3ZWJkYzYxNTliOGU0N2MifSwibmJmIjoxNjYwNjU3MTc4LCJleHAiOjE2NjE1NzUxNzh9.wkxqcCL7vmxkLeiSysdoVRfK6xVwmISF6KeudNzjAX8",
        "user": {
            "hsh_password": "pbkdf2:sha256:260000$I1lenvpsvsoGX4Bp$43ed7bacc59b26091acd744d7c5c8e9ecd0612147c200904f7ebdc6159b8e47c",
            "id": 1,
            "username": "madjid"
        }
    },
    "message": "Logged in",
    "success": true
}

export const noUserLog = {
    "error": "Incorrect username.",
    "success": false
}

export const expToken = {
    "msg": "Token has expired"
}

export const verifTokenFailed = {
    "error": "No Token or expired",
    "success": false
}

export const verifToken = {
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY2MDY1NzE3OCwianRpIjoiZWY4NzYzNzAtMTFlNi00YWM2LWI5N2UtNjI5NzBiYzBiMzk4IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6eyJpZCI6MSwidXNlcm5hbWUiOiJtYWRqaWQiLCJoc2hfcGFzc3dvcmQiOiJwYmtkZjI6c2hhMjU2OjI2MDAwMCRJMWxlbnZwc3Zzb0dYNEJwJDQzZWQ3YmFjYzU5YjI2MDkxYWNkNzQ0ZDdjNWM4ZTllY2QwNjEyMTQ3YzIwMDkwNGY3ZWJkYzYxNTliOGU0N2MifSwibmJmIjoxNjYwNjU3MTc4LCJleHAiOjE2NjE1NzUxNzh9.wkxqcCL7vmxkLeiSysdoVRfK6xVwmISF6KeudNzjAX8",
    "message" : "Token still valid",  
    "success": true
}

export const scanPhotos ={
    "data": [
        {
            "created_at": "Thu, 04 Aug 2022 11:18:48 GMT",
            "file_name_link": "https://i.ibb.co/vsMGb9M/car-dz.png",
            "id": 2,
            "isLabeled": false
        },
        {
            "created_at": "Thu, 04 Aug 2022 11:25:41 GMT",
            "file_name_link": "https://i.ibb.co/cJrQjbQ/image-2.png",
            "id": 3,
            "isLabeled": false
        }
    ],
    "message": "List of Photos",
    "success": true
}

export const scans = {
    data: [
        {
            "accuracy": 0.97,
            "created_at": "Thu, 04 Aug 2022 11:18:49 GMT",
            "deleted": false,
            "id": 1,
            "note": "",
            "photo_id": 2,
            "plate_id": 1,
            "lat" : 48.8566,
            "lon" : 2.3522,
            "plate_text":  "19254 125 15",
            "is_flagged" : false,
            "user_id": 1
        },
        {
            "accuracy": 0.92,
            "created_at": "Thu, 04 Aug 2022 11:25:41 GMT",
            "deleted": false,
            "id": 2,
            "note": "",
            "photo_id": 3,
            "plate_id": 1,
            "lat" : 45.767,
            "lon" : 4.833,
            "plate_text":  "15-GFE-48",
            "is_flagged" : true,
            "user_id": 1
        },
        {
            "accuracy": 0.92,
            "created_at": "Thu, 04 Aug 2022 11:25:41 GMT",
            "deleted": false,
            "id": 3,
            "note": "",
            "photo_id": 3,
            "plate_id": 1,
            "lat" : 45.767,
            "lon" : 4.833,
            "plate_text":  "15-GFE-48",
            "is_flagged" : false,
            "user_id": 1
        },
        {
            "accuracy": 0.92,
            "created_at": "Thu, 04 Aug 2022 11:25:41 GMT",
            "deleted": false,
            "id": 4,
            "note": "",
            "photo_id": 3,
            "plate_id": 1,
            "lat" : 45.767,
            "lon" : 4.833,
            "plate_text":  "15-GFE-48",
            "is_flagged" : false,
            "user_id": 1
        },
        {
            "accuracy": 0.92,
            "created_at": "Thu, 04 Aug 2022 11:25:41 GMT",
            "deleted": false,
            "id": 5,
            "note": "",
            "photo_id": 3,
            "plate_id": 1,
            "lat" : 0,
            "lon" : 0,
            "plate_text":  "AV-054-SL",
            "is_flagged" : false,
            "user_id": 1
        },
        {
            "accuracy": 0.92,
            "created_at": "Thu, 04 Aug 2022 11:25:41 GMT",
            "deleted": false,
            "id":6,
            "note": "",
            "photo_id": 3,
            "plate_id": 1,
            "lat" : 45.767,
            "lon" : 4.833,
            "plate_text":  "09854 113 42",
            "is_flagged" : false,
            "user_id": 1
        },
        {
            "accuracy": 0.53,
            "created_at": "Thu, 04 Aug 2022 11:25:41 GMT",
            "deleted": false,
            "id": 7,
            "note": "",
            "photo_id": 3,
            "plate_id": 1,
            "lat" : 45.767,
            "lon" : 4.833,
            "plate_text":  "47-RHF-48",
            "is_flagged" : true,
            "user_id": 1
        }
    ],
    "message": "List of Scans",
    "success": true
}

export const emptyScans = {
    success : true,
    data : [],
    message : "List of Scans"
}