# API Documentation - Fitness Quest

## Base URL
```
http://localhost:5000/api
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## Endpoints

### Authentication

#### Register
- **POST** `/auth/register`
- **Body**: `{ username, email, password, firstName, lastName }`
- **Response**: `{ token, user }`

#### Login
- **POST** `/auth/login`
- **Body**: `{ email, password }`
- **Response**: `{ token, user }`

#### Refresh Token
- **POST** `/auth/refresh`
- **Response**: `{ token }`

### Users

#### Get Profile
- **GET** `/users/me`
- **Auth**: Required
- **Response**: User object with stats

#### Update Profile
- **PUT** `/users/me`
- **Auth**: Required
- **Body**: User profile fields
- **Response**: Updated user object

#### Get Leaderboard
- **GET** `/users/leaderboard`
- **Query**: `?limit=50&offset=0`
- **Response**: Array of users with ranks

#### Get User Stats
- **GET** `/users/:userId/stats`
- **Response**: User statistics

### Workouts

#### Create Workout
- **POST** `/workouts`
- **Auth**: Required
- **Body**: Workout data
- **Response**: Created workout with XP earned

#### Get Workouts
- **GET** `/workouts`
- **Auth**: Required
- **Query**: `?startDate=2024-01-01&endDate=2024-01-31&type=strength`
- **Response**: Array of workouts

#### Get Workout by ID
- **GET** `/workouts/:id`
- **Auth**: Required
- **Response**: Workout object

#### Update Workout
- **PUT** `/workouts/:id`
- **Auth**: Required
- **Body**: Updated workout fields
- **Response**: Updated workout

#### Delete Workout
- **DELETE** `/workouts/:id`
- **Auth**: Required
- **Response**: `{ success: true }`

#### Get Workout Statistics
- **GET** `/workouts/stats/summary`
- **Auth**: Required
- **Query**: `?period=month`
- **Response**: Aggregated workout stats

### Quests

#### Get Daily Quests
- **GET** `/quests/daily`
- **Auth**: Required
- **Response**: Array of 3 daily quests

#### Get All Quests
- **GET** `/quests`
- **Auth**: Required
- **Query**: `?type=daily&completed=false`
- **Response**: Array of quests

#### Complete Quest
- **POST** `/quests/:questId/complete`
- **Auth**: Required
- **Response**: `{ success: true, xpEarned, levelUp }`

#### Skip Quest
- **POST** `/quests/:questId/skip`
- **Auth**: Required
- **Response**: `{ success: true }`

### Achievements

#### Get Achievements
- **GET** `/achievements`
- **Auth**: Required
- **Response**: Array of achievements with unlock status

#### Get User Achievements
- **GET** `/users/me/achievements`
- **Auth**: Required
- **Response**: Array of unlocked achievements

### Guilds

#### Create Guild
- **POST** `/guilds`
- **Auth**: Required
- **Body**: `{ name, description, logo }`
- **Response**: Created guild

#### Get Guild
- **GET** `/guilds/:guildId`
- **Response**: Guild object with members

#### Get User's Guild
- **GET** `/guilds/my-guild`
- **Auth**: Required
- **Response**: User's current guild

#### Join Guild
- **POST** `/guilds/:guildId/join`
- **Auth**: Required
- **Response**: `{ success: true }`

#### Leave Guild
- **POST** `/guilds/:guildId/leave`
- **Auth**: Required
- **Response**: `{ success: true }`

#### Get Guild Leaderboard
- **GET** `/guilds/:guildId/leaderboard`
- **Response**: Array of guild members ranked by XP

### Nutrition

#### Log Meal
- **POST** `/nutrition/log`
- **Auth**: Required
- **Body**: `{ food, calories, protein, carbs, fat, mealType }`
- **Response**: Created nutrition log entry

#### Get Nutrition Logs
- **GET** `/nutrition/logs`
- **Auth**: Required
- **Query**: `?startDate=2024-01-01&endDate=2024-01-31`
- **Response**: Array of nutrition logs

#### Get Daily Summary
- **GET** `/nutrition/daily-summary`
- **Auth**: Required
- **Query**: `?date=2024-01-15`
- **Response**: Daily nutrition totals

## Response Format

### Success Response
```json
{
  "success": true,
  "data": { },
  "message": "Operation successful"
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "INVALID_INPUT",
    "message": "Detailed error message"
  }
```

## Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error