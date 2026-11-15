# Course workspace

Routes: `/course` (catalogue) and `/course/:courseId` (course learning and trainer CRUD).

Backend: `/course`, `/enrollment`, `/course/module`, `/course/lecture`, `/course/quiz`, and `/dashboard/event`. Authentication uses the existing cookie/Bearer API helper.

Quiz grading is local practice only: the backend has no quiz attempt/grade submission endpoint. The quiz API currently returns answer keys publicly, so do not treat local grading as a secure assessment. A server-side submission endpoint and answer-redacted student DTO are needed for production assessment.
