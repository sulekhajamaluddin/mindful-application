//Project Files
import hero from "../../assets/hero.png";
import benefits from "../../assets/benefits.png";
import MentorItem from "../../components/common/MentorItem";
import data from "../../data.json";

export default function LandingPage() {
  const mentors = data.mentors.map((mentor) => (
    <MentorItem key={mentor.id} mentor={mentor} />
  ));

  return (
    <main className="landing-page">
      <img className="main-img" src={hero} alt="A girl holding a rainbow" />
      <div className="top-white-background"></div>
      <div className="background"></div>
      <section className="mindful flex-column-center">
        <h1 className="title flex-column-center">Why mindful??</h1>
        <p>
          The art of mindful living is a very essential knowledge in this modern
          world in which there never is “enough time”. One stumble from one task
          to the next, checking off done tasks, without even realising it.
        </p>
        <p>
          Mindfulness, simply put, means paying attention on purpose, being
          present. Mindful living is an art that can be learned. Once you enter
          into the realms of mindful living, there will always be “enough life”
          in the moment. Also, there will be more time to do everything.
        </p>
      </section>
      <section className="benefits flex-column-center">
        <h2>Strengths you will learn here..</h2>
        <img src={benefits} alt="A list of benefits from the course" />
      </section>
      <section className="mentors flex-column-center">
        <h2>Our Mentors</h2>
        <div className="mentor-list">{mentors}</div>
      </section>
    </main>
  );
}
