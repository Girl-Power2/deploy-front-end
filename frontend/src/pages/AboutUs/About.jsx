import React from "react";
import "./style.css";
const About = () => {
  return (
    <>
    <div className="vision">
      <p className="title" style={{ backgroundColor: "#B2DFDB" }}>Our Vision</p>
      <p style={{textAlign:"left" ,fontSize:"1.2rem"}}>
        Cure App will provide an unparalleled experience as the most trusted
        partner for health care. Although Cure App's mission statement is short,
        it describes what it provides today: Health oriented home services . But
        is the clinic "the most trusted partner for health care"? It's certainly
        regarded as among the top health-care providers. But the phrase"the most
        trusted" is something that they'll likely never be able to actually
        claim, because some organizations or individuals likely will name other
        institutions as their "most trusted." It's something Mayo Clinic can
        reach for, as it will inspire them to do their best. That's a vision
        statement.
      </p>
      
    </div>
    <div className="vision" style={{ backgroundColor: "#B2DFDB" }}>
        <p className="title">Our Mission</p>
      <p style={{textAlign:"left" ,fontSize:"1.2rem"}}>
        Inspiring hope and promoting health through harnessing the powers of providers to meet the need of the seekers at their homes.
      </p>
    </div>
    </>
  );
};

export default About;
