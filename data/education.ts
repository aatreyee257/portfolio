export type Education = {
  degree: string;
  institution: string;
  place: string;
  period: string;
  note?: string;
};

export const education: Education[] = [
  {
    degree: "Master of Information Technology",
    institution: "Monash University",
    place: "Clayton, Victoria, Australia",
    period: "Expected December 2027",
  },
  {
    degree: "Bachelor of Engineering in Computer Science",
    institution: "B.M.S. College of Engineering",
    place: "Bengaluru, India",
    period: "Completed",
    note: "CGPA 7.62 / 10",
  },
];
