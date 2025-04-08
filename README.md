# Fitness Coach API Documentation

## 1. Token Verification
### Endpoint:
- **URL:** `https://fitnesscoach-production.up.railway.app/auth/verify`
- **Method:** `POST`

### Description:
This endpoint verifies the user's token for authentication.

### Request Headers:
| Key           | Value                 |
|--------------|----------------------|
| Content-Type | application/json      |

### Request Body:
```json
{
  "token": 263202
}
```

### Response:
- `200 OK`: If the token is valid and the user is verified.
- `400 Bad Request`: If the token is invalid or missing.

---

## 2. Create User Profile
### Endpoint:
- **URL:** `https://fitnesscoach-production.up.railway.app/profile/create`
- **Method:** `POST`

### Description:
This endpoint is used to create a profile for a user.

### Request Headers:
| Key           | Value                 |
|--------------|----------------------|
| Content-Type | application/json      |

### Request Body:
```json
{
  "fullName": "John Doe",
  "gender": "Male",
  "birthday": "1994-05-12T00:00:00Z",
  "profilePicture": "https://example.com/profile-pic.jpg",
  "userId": 1
}
```

### Response:
- `201 Created`: If the profile is successfully created.
- `400 Bad Request`: If required fields are missing or invalid.

---

## 3. Get User Profile
### Endpoint:
- **URL:** `https://fitnesscoach-production.up.railway.app/profile/{userId}`
- **Method:** `GET`

### Description:
This endpoint retrieves the profile of a user by their `userId`.

### Request Headers:
| Key           | Value                 |
|--------------|----------------------|
| Content-Type | application/json      |

### Response:
- `200 OK`: Returns the user profile.
- `404 Not Found`: If the profile is not found for the given `userId`.

---

## 4. Update User Profile
### Endpoint:
- **URL:** `https://fitnesscoach-production.up.railway.app/profile/update/{userId}`
- **Method:** `PUT`

### Description:
This endpoint updates the user's profile.

### Request Headers:
| Key           | Value                 |
|--------------|----------------------|
| Content-Type | application/json      |

### Request Body:
```json
{
  "fullName": "Ahmed",
  "gender": "Male",
  "birthday": "1994-05-12T00:00:00Z",
  "profilePicture": "https://example.com/profile-pic.jpg",
  "userId": 1
}
```

### Response:
- `200 OK`: If the profile is successfully updated.
- `404 Not Found`: If the profile for the given `userId` does not exist.
- `400 Bad Request`: If required fields are missing or invalid.

---

## 5. Delete User Profile
### Endpoint:
- **URL:** `https://fitnesscoach-production.up.railway.app/profile/delete/{userId}`
- **Method:** `DELETE`

### Description:
This endpoint deletes the profile of a user by their `userId`.

### Request Headers:
| Key           | Value                 |
|--------------|----------------------|
| Content-Type | application/json      |

### Response:
- `200 OK`: If the profile is successfully deleted.
- `404 Not Found`: If the profile for the given `userId` does not exist.

---

## 6. Create Goal
### Endpoint:
- **URL:** `https://fitnesscoach-production.up.railway.app/goals`
- **Method:** `POST`

### Description:
This endpoint is used to create a goal for a user.

### Request Headers:
| Key           | Value                 |
|--------------|----------------------|
| Content-Type | application/json      |

### Request Body:
```json
{
  "types": ["Optimize general health", "Optimize general health"],
  "userId": 1
}
```

### Response:
- `201 Created`: If the goal is successfully created.
- `400 Bad Request`: If required fields are missing or invalid.

---

## 7. Update Goal
### Endpoint:
- **URL:** `https://fitnesscoach-production.up.railway.app/goals/{goalId}`
- **Method:** `PUT`

### Description:
This endpoint updates an existing goal.

### Request Headers:
| Key           | Value                 |
|--------------|----------------------|
| Content-Type | application/json      |

### Request Body:
```json
{
  "type": "Improve recovery",
  "userId": 1
}
```

### Response:
- `200 OK`: If the goal is successfully updated.
- `404 Not Found`: If the goal with the given `goalId` does not exist.
- `400 Bad Request`: If required fields are missing or invalid.

---

## 8. Get Goal
### Endpoint:
- **URL:** `https://fitnesscoach-production.up.railway.app/goals/{goalId}`
- **Method:** `GET`

### Description:
This endpoint retrieves a specific goal by its `goalId`.

### Request Headers:
| Key           | Value                 |
|--------------|----------------------|
| Content-Type | application/json      |

### Response:
- `200 OK`: Returns the goal.
- `404 Not Found`: If the goal for the given `goalId` does not exist.

---

## 9. Create Fitness Level
### Endpoint:
- **URL:** `https://fitnesscoach-production.up.railway.app/fitness-level`
- **Method:** `POST`

### Description:
This endpoint is used to create a fitness level for a user.

### Request Headers:
| Key           | Value                 |
|--------------|----------------------|
| Content-Type | application/json      |

### Request Body:
```json
{
  "level": "beginner",
  "userId": 1
}
```

### Response:
- `201 Created`: If the fitness level is successfully created.
- `400 Bad Request`: If required fields are missing or invalid.

---

## 10. Update Fitness Level
### Endpoint:
- **URL:** `https://fitnesscoach-production.up.railway.app/fitness-level/{fitnessLevelId}`
- **Method:** `PUT`

### Description:
This endpoint updates the fitness level for a user.

### Request Headers:
| Key           | Value                 |
|--------------|----------------------|
| Content-Type | application/json      |

### Request Body:
```json
{
  "level": "advanced",
  "userId": 1
}
```

### Response:
- `200 OK`: If the fitness level is successfully updated.
- `404 Not Found`: If the fitness level with the given `fitnessLevelId` does not exist.
- `400 Bad Request`: If required fields are missing or invalid.

---
