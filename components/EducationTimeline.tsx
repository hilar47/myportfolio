import TimelineColumn from "./TimelineColumn";
import { FiBook } from "react-icons/fi";

const education = [
  {
    period: "2009",
    title: "Bachelor of Computer Applications",
    subtitle: "Rosary College of Commerce and Arts (Goa University)",
    grade: "DISTINCTION"
  },
  {
    period: "2006",
    title: "Higher Secondary Education",
    subtitle: "St. Alex Higher Secondary School (Goa Board)",
    grade: "FIRST CLASS",
  },
  {
    period: "2004",
    title: "Secondary Education",
    subtitle: "Loyola High School (Goa Board)",
    grade: "FIRST CLASS",
  },
  {
    period: "2010 - 2013",
    title: "Website Development Certificates (Linux, Web Designing, Visual Basic)",
    subtitle: "Manipal Institute of Computer Education (India)",
    grade: "FIRST CLASS",
  }
];

export default function EducationTimeline() {
  return (
    <TimelineColumn
      heading="Education Certifications"
      accent="Education"
      items={education}
      icon={<FiBook />}
    />
  );
}
