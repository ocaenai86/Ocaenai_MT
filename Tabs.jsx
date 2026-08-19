export default function Tabs({ active, setActive }) {
  return (
    <div className="tabs">
      {["html", "css", "js"].map(key => (
        <button
          key={key}
          className={active === key ? "tab active" : "tab"}
          onClick={() => setActive(key)}
        >
          {key.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
