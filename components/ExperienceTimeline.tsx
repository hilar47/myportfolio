import TimelineColumn from "./TimelineColumn";
import { FiBriefcase } from "react-icons/fi";

const experience = [
  {
    period: "September 2019 - Present",
    title: "Technical Lead, Full Stack & Sr. Frontend Developer",
    subtitle: "Dubai Municipality",
    current: true,
  },
  {
    period: "September 2018 - September 2019",
    title: "Frontend Technical Lead",
    subtitle: "HCL, Bangalore India - Onsite (Schneider Electric)",
  },
  {
    period: "July 2011 - September 2018",
    title: "Frontend Technical Lead & Lead Developer",
    subtitle: "Creative Capsule Infotech, Goa, India",
  },
  {
    period: "January 2010 - June 2011",
    title: "Web Designer & Frontend Developer",
    subtitle: "Online Productivity Pvt. Ltd, Goa, India",
  },
  {
    period: "May 2009 - December 2009",
    title: "Web Designer & Technical Support Engineer",
    subtitle: "VirtualWebs Servers Pvt. Ltd, Goa, India",
  },
];

export default function ExperienceTimeline() {
  return (
    <TimelineColumn
      heading="Work Experience"
      accent="Experience"
      items={experience}
      icon={<FiBriefcase />}
    />
  );
}
