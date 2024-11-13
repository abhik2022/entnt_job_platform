# Job-Portal



## Table of Contents
1. [About](#About)
2. [Installation](#installation)
3. [Tech Stack](#tech-stack)
4. [Features](#features)



### About
The **JobPortal** is a user-friendly React application where an admin can manage job postings, track candidates who apply for those jobs, and create job-specific assessments. The platform will help streamline the hiring process by allowing admins to post jobs, review candidate details, and assign tailored assessments for each open position.



### Installation

To run the application locally:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/abhik2022/entnt_job_platform.git
   cd entnt_job_platform

2. **Add node modules**:
   ```bash
     npm install
   
3. **to run locally**:
   ```bash
      npm run start



### Features

1. **Dashboard for Managing Job Postings**:
   - An admin interface to monitor and edit job listings, each including:
     - Job title
     - Job description
     - Number of candidates who applied
   - Admin can add, edit, or delete job postings as needed.


2. **Candidate Tracking & Details Page**:
   - A detailed view of candidates applying for each job:
     - Candidate name, application date, and status (e.g., "Under Review," "Interview Scheduled").
   - Clicking on a candidate opens a profile page displaying:
     - Candidate’s profile details (e.g., name, email, contact information, skills, and experience)
     - Resume preview or download link
     - Option to update application status

3. **Job-Specific Test/Assessment Creation**:
   - Admins can create unique, job-specific assessments:
     - Select a job from a dropdown menu to associate it with an assessment.
     - Multiple-choice assessment for the selected position
     - Add, edit, or delete questions and answers as needed
   -  each job has a distinct, custom assessment.

4. **User Interface & User Experience**:
   - A responsive interface optimized for both desktop and mobile views.
   - Clean, consistent design utilizing Material UI.
   - Efficient state management using Redux.

### Tech Stack

- **Frontend**: React, React Router, Redux
- **UI Library**: Material UI for a polished, consistent look
- **Data management**: Use local storage for efficient data management.
