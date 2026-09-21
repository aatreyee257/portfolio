export type Award = {
  title: string;
  org?: string;
  date: string;
  note: string;
};

export const awards: Award[] = [
  {
    title: "1st Prize — Global Hackathon",
    org: "GSK",
    date: "July 2024",
    note: "Automated anomaly detection using CNNs and SSIM.",
  },
  {
    title: "2nd Rank — IEEE Coding Competition",
    date: "May 2022",
    note: "Among 200+ participants.",
  },
];

export type Talk = {
  title: string;
  audience?: string;
};

export const talks: Talk[] = [
  { title: "EEG and Dyslexia", audience: "approximately 130 students" },
  {
    title: "Image Classification using TensorFlow",
    audience: "approximately 100 attendees",
  },
  {
    title:
      "Early Identification and Training for Dyslexic Students Using Technology",
  },
  {
    title:
      "Computational Approaches for Multi-Omics Data Analysis in Cancer Prognosis",
  },
  { title: "Blockchain, Cryptocurrency, and Smart Contracts" },
];
