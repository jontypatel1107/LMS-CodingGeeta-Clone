# LMS-CodingGeeta-Clone

A Learning Management System (LMS) clone inspired by CodingGita, built with React and Vite. This project provides a student dashboard with features for managing assignments, attendance, events, feedback, and more.

## Features

- **Student Dashboard**: Overview of assignments, attendance, and upcoming events
- **Assignments**: View and manage course assignments
- **Attendance**: Track attendance records and semester attendance
- **Events**: Browse and participate in educational events
- **Feedback**: Provide weekly feedback and general feedback
- **Profile Management**: Update student profile information
- **Leave Application**: Apply for leaves
- **Calendar**: View student calendar with important dates

## Tech Stack

- **Frontend**: React.js
- **Build Tool**: Vite
- **Styling**: CSS
- **Linting**: ESLint

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/LMS-CodingGeeta-Clone.git
   cd LMS-CodingGeeta-Clone
   ```

2. Navigate to the LMS_Clone directory:
   ```bash
   cd LMS_Clone
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and visit `http://localhost:5173` (or the port shown in the terminal).

## Usage

- **Login**: Use the login page to authenticate.
- **Dashboard**: Access the main dashboard after logging in.
- **Navigation**: Use the navbar to switch between different sections like assignments, attendance, events, etc.
- **Profile**: Update your profile information in the profile section.

## Project Structure

```
LMS_Clone/
├── public/
├── src/
│   ├── components/
│   │   ├── AssignmentsCard.jsx
│   │   ├── AttendanceCard.jsx
│   │   ├── EventsCard.jsx
│   │   ├── FeatureCard.jsx
│   │   ├── MentorsCard.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProfileCard.jsx
│   │   ├── SmallCard.jsx
│   │   ├── SubjectsCard.jsx
│   │   └── TopCard.jsx
│   ├── pages/
│   │   ├── Apply_Leave.jsx
│   │   ├── Assignments.jsx
│   │   ├── Attendance.jsx
│   │   ├── Events.jsx
│   │   ├── Feedback.jsx
│   │   ├── Landing.jsx
│   │   ├── Login.jsx
│   │   ├── Sem_attendance.jsx
│   │   ├── StudentCalendar.jsx
│   │   ├── studentDashboard.jsx
│   │   ├── StudentProfile.jsx
│   │   └── Weekly_feedback.jsx
│   ├── utils/
│   │   ├── auth.js
│   │   └── getInitials.js
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── eslint.config.js
├── index.html
├── package.json
├── README.md
└── vite.config.js
```

## Contributing

1. Fork the repository.
2. Create a new branch for your feature: `git checkout -b feature-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For questions or support, please contact [your-email@example.com].