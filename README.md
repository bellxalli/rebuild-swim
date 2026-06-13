# NextSwim Lite - Project Specification

## Project Overview

NextSwim Lite is a simple web application designed to help new swimmers identify their current swimming skill level and discover resources that can help them improve.

The application is intended for beginner and intermediate swimmers who want guidance on where to start their swimming journey. Users can complete a short swim assessment and receive a recommended swim level along with learning resources tailored to their results.

This project is a simplified version of the original NextSwim application and focuses only on assessment and educational resources.

---

## Features

### 1. Home Page

The home page introduces the application and explains its purpose.

The page should include:

* Brief description of NextSwim Lite
* Navigation links
* Button to begin the swim assessment
* Button to browse resources

This page serves as the main entry point for the application.

---

### 2. Swim Assessment Page

Users can complete a short multiple-choice quiz that evaluates their swimming ability.

Questions should assess:

* Comfort in the water
* Ability to float
* Ability to tread water
* Distance able to swim
* Knowledge of basic swim strokes

When the user submits the quiz:

* Responses are scored
* A swim level is assigned
* Results are displayed immediately on the page

Possible swim levels:

* Beginner
* Developing Swimmer
* Intermediate Swimmer
* Advanced Swimmer

The results section should include:

* Assigned swim level
* Short description of the level
* Suggested next steps
* Recommended resource categories

#### Edge Cases

* User attempts to submit without answering all questions
* User changes answers before submission
* User receives the minimum or maximum possible score

---

### 3. Resources Page

The resources page provides educational swimming content.

Resources are grouped into categories:

* Stroke Technique
* Water Safety
* Breath Control
* Training Tips

Each resource contains:

* Title
* Description
* External link

Users should be able to:

* View all resources
* Filter resources by category
* Open resources in a new tab

All resources will be stored in a local JSON file.

---

## Technical Stack

### Frontend

* React
* Vite
* JavaScript
* CSS

### Data Storage

All application data will be stored in local JSON files.

Example data files:

```text
data/
├── swimQuiz.json
├── resources.json
└── levels.json
```

No backend server or database is required.

---

## Testing Requirements

The application should be tested to ensure:

### Assessment Testing

* Quiz questions display correctly
* Users can select answers
* Scores are calculated correctly
* The correct swim level is assigned
* Results display properly

### Resource Testing

* Resources load from JSON
* Category filtering works
* Links open correctly
* Missing data does not crash the application

### Navigation Testing

* Users can move between pages
* Navigation works on desktop and mobile devices
* No console errors occur during normal use

---

## Constraints

* No database
* No user accounts
* No backend services
* No admin functionality
* No social features
* All data must be loaded from local JSON files
* Application should remain lightweight and easy to maintain

---

## Success Criteria

The project is successful if a user can:

1. Visit the site and understand its purpose.
2. Complete the swim assessment.
3. Receive an accurate swim level recommendation.
4. Browse swimming resources relevant to their skill level.
5. Use the application without creating an account.
