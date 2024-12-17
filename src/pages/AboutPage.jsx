import "react";
import "./AboutPage.css";

const AboutPage = () => {
  const teamMembers = [
    {
      name: "Alice Johnson",
      role: "CEO & Founder",
      bio: "Alice is the visionary behind FoodOrderApp, with 10 years of experience in the food industry.",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Bob Smith",
      role: "Head Chef",
      bio: "Bob crafts the delicious recipes that make our menu irresistible.",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Charlie Davis",
      role: "Marketing Manager",
      bio: "Charlie connects FoodOrderApp with food lovers worldwide.",
      image: "https://via.placeholder.com/150",
    },
  ];

  return (
    <div className="about-page">
      <h1>About Us</h1>

      {/* Business Story */}
      <section className="business-story">
        <h2>Our Story</h2>
        <p>
          FoodOrderApp began with a simple mission: to bring delicious food to your doorstep with just a few clicks.
          Since our founding in 2015, we’ve grown into a trusted platform for food lovers worldwide.
        </p>
      </section>

      {/* Mission */}
      <section className="mission">
        <h2>Our Mission</h2>
        <p>
          To connect people with great food and exceptional service, while promoting sustainability and supporting local
          businesses.
        </p>
      </section>

      {/* Timeline */}
      <section className="timeline">
        <h2>Our Journey</h2>
        <div className="timeline-container">
          <div className="timeline-item">
            <span>2015</span>
            <p>Founded with the dream of making food ordering seamless.</p>
          </div>
          <div className="timeline-item">
            <span>2018</span>
            <p>Expanded to include over 500 restaurants on our platform.</p>
          </div>
          <div className="timeline-item">
            <span>2023</span>
            <p>Launched eco-friendly packaging initiatives.</p>
          </div>
        </div>
      </section>

      {/* Team Gallery */}
      <section className="team">
        <h2>Meet Our Team</h2>
        <div className="team-gallery">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-member">
              <img src={member.image} alt={`${member.name}`} />
              <div className="member-details">
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
              <div className="member-bio">
                <p>{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
