# CAMA Student Schedule Generator

A Spring Boot REST API for generating school and college timetables from configurable working days, preferred period count, start time, period duration, subjects, teachers, rooms, and breaks.

## Run locally

```bash
mvn spring-boot:run
```

The API starts on `http://localhost:8081`.

## Endpoints

- `GET /api/health` — service health check
- `POST /api/schedules/generate` — generate a timetable

Example request:

```json
{
  "institutionName": "CAMA College",
  "workingDays": ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"],
  "startTime": "09:00",
  "periodCount": 6,
  "periodDurationMinutes": 50,
  "subjects": [
    {"name": "Mathematics", "teacher": "Ms. Priya", "room": "A-101"},
    {"name": "Physics", "teacher": "Mr. Arun", "room": "Lab 1"},
    {"name": "English", "teacher": "Mrs. Divya", "room": "B-204"}
  ],
  "breaks": [
    {"name": "Short Break", "afterPeriod": 2, "durationMinutes": 15},
    {"name": "Lunch", "afterPeriod": 4, "durationMinutes": 45}
  ]
}
```

The generator rotates subjects through each configured period and inserts breaks without counting them as teaching periods. Validation rejects duplicate or out-of-range break positions.

## Design notes

The API is intentionally stateless for easy integration with the existing CAMA React application. A future persistence layer can store institution templates, classes, teacher availability, and generated schedules without changing the request/response contract.
