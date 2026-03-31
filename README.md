# Notification System (Multi-Channel, Queue-Based)

A production-ready, scalable notification system built with Node.js, BullMQ, Redis, and MongoDB.
Supports asynchronous processing of notifications across multiple channels including Email, SMS, and WhatsApp.

---

## Overview

This project implements a decoupled architecture for handling notifications using a queue-based system. Instead of processing notifications synchronously in API requests, jobs are pushed to a queue and processed by background workers.

This design improves reliability, scalability, and performance.

---

## Features

* Multi-channel notifications (Email, SMS, WhatsApp)
* Asynchronous job processing using BullMQ
* Redis-backed queue system
* Retry mechanism with exponential backoff
* Dead Letter Queue for failed jobs
* MongoDB-based notification tracking
* Bull Board UI for monitoring jobs
* Modular and extensible architecture
* Environment-based configuration

---

## Tech Stack

* Node.js
* Express.js
* BullMQ
* Redis
* MongoDB (Mongoose)
* Nodemailer

---

## Architecture

Client → API → Queue (Redis) → Worker → Notification Service → Database

* API handles incoming requests
* Queue stores jobs
* Worker processes jobs asynchronously
* Services handle channel-specific logic
* MongoDB tracks notification status

---

## Project Structure

```
src/
├── config/
├── controllers/
├── queues/
├── workers/
├── services/
├── models/
├── routes/
├── middlewares/
├── utils/
├── bullBoard.js
├── app.js
└── server.js
```

---

## Installation

### 1. Clone the repository

```
git clone https://github.com/mohdabid701148/NOTIFICATION_SYSTEM
cd notification-system/backend
```

### 2. Install dependencies

```
npm install
```

### 3. Setup environment variables

Create a `.env` file in the root directory:

```
PORT=5000
MONGO_URI=your_mongodb_connection
REDIS_URL=your_redis_url
EMAIL_USER=your_email
EMAIL_PASS=your_app_password
```

---

## Running the Application

### Start Redis (WSL / local)

```
redis-server
```

### Start Backend Server

```
npm run dev
```

### Start Worker

```
npm run worker
```

---

## API Endpoints

### Send Notification

```
POST /api/notify/send
```

#### Request Body

```
{
  "type": "email | sms | whatsapp",
  "recipient": "user@example.com",
  "subject": "Optional (for email)",
  "message": "Notification content"
}
```

#### Response

```
{
  "message": "Queued",
  "jobId": "123"
}
```

---

## Supported Notification Channels

| Type     | Description           |
| -------- | --------------------- |
| email    | Sent using Nodemailer |
| sms      | Mock implementation   |
| whatsapp | Mock implementation   |

---

## Job Processing Flow

1. Client sends request to API
2. Controller pushes job to queue
3. Worker consumes job
4. Notification service processes message
5. Status is updated in MongoDB

---

## Bull Board Dashboard

Access queue monitoring UI at:

```
http://localhost:5000/admin/queues
```

Provides:

* Job status tracking
* Failed job inspection
* Retry controls

---

## Error Handling

* Failed jobs are retried automatically
* After max attempts, jobs are moved to Dead Letter Queue
* Errors are logged and stored in database

---

## Deployment

Recommended setup:

* Backend & Worker: Render
* Database: MongoDB Atlas
* Redis: Upstash

---

## Future Improvements

* Push notifications (Firebase)
* User notification preferences
* Template engine (OTP, alerts)
* Rate limiting per user
* Analytics dashboard

---

## Author

Abid Rayeen

---

## License

This project is for educational and demonstration purposes.
