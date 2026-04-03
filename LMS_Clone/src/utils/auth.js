export const students = [
  {
    uid: "108683",
    password: "123456",
    name: "Jonty Patel",
    email: "jontypatel1107@gmail.com",
    mobile: "9999999991",
    university: "SUxCG 714",

    image: "https://avatars.githubusercontent.com/u/224968727?s=400&u=7f622f77ba257a170a75088487d8b6cb68cff488&v=4",

    attendance: [
      {
        semester: "Semester 1",
        startDate: "31/07/2025",
        endDate: "28/01/2026",
        present: 179,
        total: 190,
        bonus: 19,
        percentLabel: 94,
      },
      {
        semester: "Semester 2",
        startDate: "29/01/2026",
        endDate: "30/06/2026",
        present: 169,
        total: 193,
        bonus: 1,
      },
    ],

    subjects: [
      "SU11 - GIT & GITHUB",
      "SU12 - C Language",
      "SU13 - HTML/CSS/JS",
      "SU14 - UI/UX FIGMA",
      "SU15 - MATHS",
      "SU16 - JavaScript",
      "SU0201 - ReactJS",
      "SU0202 - NodeJS",
      "SU0203 - NoSQL",
      "SU0204 - OOPS",
      "SU0205 - Maths 2",
      "SU0206 - EVS",
      "SU0207 - IR 01",
      "SU0208 - IR 02",
    ],

    mentors: [
      {
        name: "Ankita",
        batch: "SUxCG 714",
      },
    ],

    assignments: 0,
    pendingAssignments: 0,
    events: [],
  },
];
export const loginDetails = (uid, password) => {
  const student = students.find(
    (s) => s.uid === uid && s.password === password,
  );

  if (!student) return false;

  // Check if user data already exists in localStorage
  const existingUserData = localStorage.getItem("user");
  let userData = student;

  if (existingUserData) {
    try {
      const parsedExistingData = JSON.parse(existingUserData);
      // If the existing user has the same UID, preserve additional data like leaveRequests
      if (parsedExistingData.uid === student.uid) {
        userData = { ...student, ...parsedExistingData };
      }
    } catch (error) {
      // If parsing fails, use the default student data
      console.warn("Failed to parse existing user data:", error);
    }
  }

  localStorage.setItem("user", JSON.stringify(userData));

  return true;
};
