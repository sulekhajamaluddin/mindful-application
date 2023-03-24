export default function MentorItem({ mentor }) {
  return (
    <div className="mentor flex-column-center">
      <img src={`../assets/${mentor.picture}`} alt="A mentor" />
      <span>{mentor.name}</span>
      <p>{mentor.description}</p>
    </div>
  );
}
