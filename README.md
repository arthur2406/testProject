# REST API 
---
**Get lessons**
----
 Return json data about all lessons
* **URL**
/lessons
* **Method:**
`GET`
* **Url params**
None
* **Data params**
None
* **Success Response**
    * **Code:**  200
    * **Content:** 
```
[
    {
        "_id": "5e307a591f5cc1283cc745b5",
        "name": "Physics",
        "teacher": "5e3071e8a464951154dfc0dd",
        "startsAt": "1996-10-17T02:35:32.000Z",
        "groupOfStudents": {
            "name": "IK-95"
        },
        "audience": 400,
        "__v": 0
    },
    {
        "_id": "5e307b2719051832f8cdb087",
        "name": "Math",
        "teacher": "5e3071e8a464951154dfc0dd",
        "startsAt": "1996-10-17T02:35:32.000Z",
        "groupOfStudents": {
            "name": "IK-96"
        },
        "audience": 400,
        "__v": 0
    },
]
```
**Get groups**
----
 Return json data about all groups
* **URL**
/groups
* **Method:**
`GET`
* **Url params**
None
* **Data params**
None
* **Success Response**
    * **Code:**  200
    * **Content:** 
```
[
    {
        "_id": "5e2c30527890f72bc87ae8ae",
        "name": "IA-84",
    },
    {
        "_id": "5e2c5848d5e25331080089d5",
        "name": "IK-82",
    },
]
```
**Get one group**
----
 Return json data about specific group and its lessons
 * **URL**
/groups/:id
* **Method:**
`GET`
* **Url params**
id=[ObjectId]
* **Data params**
None
* **Success Response**
    * **Code:**  200
    * **Content:** 
```
{
    "lessons": [
        {
            "_id": "5e307c965a0f1f141c60697e",
            "name": "Computer Science",
            "teacher": {
                "name": "Orlovsky"
            },
            "startsAt": "2020-10-17T02:35:32.000Z",
            "groupOfStudents": {
                "name": "IK-82"
            },
            "audience": 400,
            "__v": 0
        },
        {
            "_id": "5e307dabf7925c3500b78adb",
            "name": "Ukrainian language",
            "teacher": {
                "name": "Cibulenko"
            },
            "startsAt": "2020-10-17T02:35:32.000Z",
            "groupOfStudents": {
                "name": "IK-82"
            },
            "audience": 303,
            "__v": 0
        }
    ],
    "_id": "5e2c5848d5e25331080089d5",
    "name": "IK-82",
    "__v": 0
}
```
* **Error Response:**
    * **Code:** 404 NOT FOUND
    **Content:**
```
{
    "error": "Group is not found!"
}
```
**Get one lesson**
----
 Return json data about specific lesson
 * **URL**
/lessons/:id
* **Method:**
`GET`
* **Url params**
id=[ObjectId]
* **Data params**
None
* **Success Response**
    * **Code:**  200
    * **Content:** 
```
{
    "_id": "5e307a591f5cc1283cc745b5",
    "name": "Physics",
    "teacher": {
        "seniority": 20,
        "name": "Orlovsky"
    },
    "startsAt": "1996-10-17T02:35:32.000Z",
    "groupOfStudents": {
        "name": "IK-95"
    },
    "audience": 400,
    "__v": 0
}
```
* **Error Response:**
    * **Code:** 404 NOT FOUND
    **Content:**
```
{
    "error": "Lesson is not found!"
}
```
**Get teacher**
----
 Return json data about authorized teacher and his lessons
 * **URL**
/teachers/me
* **Method:**
`GET`
* **Url params**
None
* **Data params**
None
* **Success Response**
    * **Code:**  200
    * **Content:** 
```
{
    "_id": "5e307a591f5cc1283cc745b5",
    "name": "Physics",
    "teacher": {
        "seniority": 20,
        "name": "Orlovsky"
    },
    "startsAt": "1996-10-17T02:35:32.000Z",
    "groupOfStudents": {
        "name": "IK-95"
    },
    "audience": 400,
    "__v": 0
}
```
* **Error Response:**
    * **Code:** 401 Unauthorized
    **Content:**
```
{
    "error": "Please authenticate"
}
```
**Create lesson**
----
 Create lesson with provided data. Requires be authorized.
 * **URL**
/lessons
* **Method:**
`POST`
* **Url params**
None
* **Data params**
```
{
	"name": "Ukrainian language",
	"teacher": "5e3071e8a464951154dfc0dd",
	"startsAt": "October 16, 2020 05:35:32",
	"groupOfStudents": "5e2c5848d5e25331080089d5",
	"audience": 400
}
```
* **Success Response**
    * **Code:**  200
    * **Content:** 
```
{
    "_id": "5e31c9d101571e2ccc5bd56b",
    "name": "Ukrainian language",
    "teacher": {
        "seniority": 20,
        "name": "Orlovsky"
    },
    "startsAt": "2020-10-20T02:35:32.000Z",
    "groupOfStudents": {
        "name": "IK-82"
    },
    "audience": 305,
    "__v": 0
}
```
* **Error Response:**
    * **Code:** 401 Unauthorized
    **Content:**
```
{
    "error": "Please authenticate"
}
```
OR
* **Error Response:**
    * **Code:** 400 Bad Request
    **Content:**
```
{}
```
**Create group**
----
 Create group with provided data. Requires authorization.
 * **URL**
/groups
* **Method:**
`POST`
* **Url params**
None
* **Data params**
```
{
	"name": "IK-120"
}
```
* **Success Response**
    * **Code:**  200
    * **Content:** 
```
{
    "lessons": [],
    "_id": "5e31ca8d01571e2ccc5bd56f",
    "name": "IK-120",
    "__v": 0
}
```
* **Error Response:**
    * **Code:** 401 Unauthorized
    **Content:**
```
{
    "error": "Please authenticate"
}
```
OR
* **Error Response:**
    * **Code:** 400 Bad Request
    **Content:**
```
{}
```
**Create teacher**
----
 Create teacher with provided data. 
 * **URL**
/teachers
* **Method:**
`POST`
* **Url params**
None
* **Data params**
```
{
	"name": "Ivashenko",
	"email": "ivaschenko@gmail.com",
	"password": "ivashenko123",
	"age": 50,
	"seniority": 20,
}
```
* **Success Response**
    * **Code:**  200
    * **Content:** 
```
{
    "teacher": {
        "age": 50,
        "seniority": 20,
        "lessons": [],
        "_id": "5e31d0be01571e2ccc5bd575",
        "name": "Ivashenko",
        "email": "ivaschenko@gmail.com",
        "__v": 1
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTMxZDBiZTAxNTcxZTJjY2M1YmQ1NzUiLCJpYXQiOjE1ODAzMjMwMDZ9.KAhunuyIWY4pSheX-gXq55TfIGGLciYcQOZh7rDFJMk"
}
```
* **Error Response:**
    * **Code:** 400 Bad request
    **Content:**
```
{}
```
**Logout teacher**
----
 Logout teacher. Requires authorization.
 * **URL**
/teachers/logout
* **Method:**
`POST`
* **Url params**
None
* **Data params**
None
* **Success Response**
    * **Code:**  200 OK
    * **Content:** 
```
{}
```
* **Error Response:**
    * **Code:** 401 Unauthorized
    **Content:**
```
{
    "error": "Please authenticate"
}
```
**LogoutAll teacher**
----
 Logout teacher from all devices (delete all tokens). Requires authorization.
 * **URL**
/teachers/logoutAll
* **Method:**
`POST`
* **Url params**
None
* **Data params**
None
* **Success Response**
    * **Code:**  200 OK
    * **Content:** 
```
{}
```
* **Error Response:**
    * **Code:** 401 Unauthorized
    **Content:**
```
{
    "error": "Please authenticate"
}
```
**Login teacher**
----
 Login teacher. 
 * **URL**
/teachers/login
* **Method:**
`POST`
* **Url params**
None
* **Data params**
```
{
	"email": "sample@gmail.com",
	"password": "samplepass"
}
```
* **Success Response**
    * **Code:**  200 OK
    * **Content:** 
```
{
    "teacher": {
        "age": 30,
        "seniority": 20,
        "_id": "5e3071e8a464951154dfc0dd",
        "name": "Sample",
        "email": "sample@gmail.com",
        "__v": 27
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTMwNzFlOGE0NjQ5NTExNTRkZmMwZGQiLCJpYXQiOjE1ODAzMjQyNjd9.ptGniZ3zzy7JsoiUu70fB86u0cmWa_QlViMsRHlu0x4"
}
```
* **Error Response:**
    * **Code:** 400 Bad request
    **Content:**
```
{
    "error": "Incorrect email or password"
}
```
**Update group**
----
 Update group. Requires authorization
 * **URL**
/groups/:id
* **Method:**
`PATCH`
* **Url params**
id=[ObjectId]
* **Data params**
```
{
	"name": "IK-9001230"
}
```
* **Success Response**
    * **Code:**  200 OK
    * **Content:** 
```
{
    "lessons": [],
    "_id": "5e2c5848d5e25331080089d5",
    "name": "IK-9001230",
    "__v": 0
}
```
* **Error Response:**
    * **Code:** 404 Not found
OR
* **Error Response:**
    * **Code:** 400 Bad requst
    *  Content: 
```
{
    "error": "Invalid updates"
}
```
OR
* **Error Response:**
    * **Code:** 401 Unauthorized
    **Content:**
```
{
    "error": "Please authenticate"
}
```
**Update lesson**
----
 Update lesson. Requires authorization
 * **URL**
/lessons/:id
* **Method:**
`PATCH`
* **Url params**
id=[ObjectId]
* **Data params**
```
{
	"name": "Calculus 2"
}
```
* **Success Response**
    * **Code:**  200 OK
    * **Content:** 
```
{
    "_id": "5e307b2719051832f8cdb087",
    "name": "Calculus 2",
    "teacher": {
        "seniority": 20,
        "name": "Orlovsky"
    },
    "startsAt": "1996-10-17T02:35:32.000Z",
    "groupOfStudents": {
        "name": "IK-95"
    },
    "audience": 400,
    "__v": 0
}
```
* **Error Response:**
    * **Code:** 404 Not found
OR
* **Error Response:**
    * **Code:** 400 Bad requst
    *  Content: 
```
{
    "error": "Invalid updates"
}
```
OR
* **Error Response:**
    * **Code:** 401 Unauthorized
    **Content:**
```
{
    "error": "Please authenticate"
}
```
**Update teacher**
----
 Update teacher. Requires authorization
 * **URL**
/teachers/me
* **Method:**
`PATCH`
* **Url params**
none
* **Data params**
```
{
	"age": 30
}
```
* **Success Response**
    * **Code:**  200 OK
    * **Content:** 
```
{
    "age": 30,
    "seniority": 20,
    "lessons": [
        "5e307a591f5cc1283cc745b5",
        "5e307b2719051832f8cdb087",
        "5e307b7bcdee7f31f82a4d54",
        "5e307c965a0f1f141c60697e",
        "5e307dabf7925c3500b78adb",
        "5e31c9d101571e2ccc5bd56b",
        "5e31d3a701571e2ccc5bd57b"
    ],
    "_id": "5e3071e8a464951154dfc0dd",
    "name": "Orlovsky",
    "email": "orlovsky@gmail.com",
    "__v": 28
}
```
* **Error Response:**
    * **Code:** 404 Not found
OR
* **Error Response:**
    * **Code:** 400 Bad requst
    *  Content: 
```
{
    "error": "Invalid updates"
}
```
OR
* **Error Response:**
    * **Code:** 401 Unauthorized
    **Content:**
```
{
    "error": "Please authenticate"
}
```
**Delete teacher**
----
 Delete authorized teacher. Requires authorization
 * **URL**
/teachers/me
* **Method:**
`DELETE`
* **Url params**
None
* **Data params**
None
* **Success Response**
    * **Code:**  200 OK
* **Error Response:**
    * **Code:** 401 Unauthorized
    **Content:**
```
{
    "error": "Please authenticate"
}
```
**Delete group**
----
 Delete group by id. Requires authorization
 * **URL**
/groups/:id
* **Method:**
`DELETE`
* **Url params**
id=[ObjectId]
* **Data params**
None
* **Success Response**
    * **Code:**  200 OK
    * **Content:**
```
{
    "lessons": [],
    "_id": "5e2c30527890f72bc87ae8ae",
    "name": "IA-84",
    "__v": 0
}
```
* **Error Response:**
    * **Code:** 401 Unauthorized
    **Content:**
```
{
    "error": "Please authenticate"
}
```
OR
* **Error Response:**
    * **Code:** 404 Not found
**Delete lesson**
----
 Delete lesson by id. Requires authorization
 * **URL**
/lessons/:id
* **Method:**
`DELETE`
* **Url params**
id=[ObjectId]
* **Data params**
None
* **Success Response**
    * **Code:**  200 OK
    * **Content:**
```
{
    "_id": "5e307a591f5cc1283cc745b5",
    "name": "Physics",
    "teacher": "5e3071e8a464951154dfc0dd",
    "startsAt": "1996-10-17T02:35:32.000Z",
    "groupOfStudents": "5e3077b6a464951154dfc0f2",
    "audience": 400,
    "__v": 0
}
```
* **Error Response:**
    * **Code:** 401 Unauthorized
    **Content:**
```
{
    "error": "Please authenticate"
}
```
OR
* **Error Response:**
    * **Code:** 404 Not found

