export default function StatusBar({ lang, lines, chars, saveState }) {
  return (
    <div className="status-bar">
      <span>{lang.toUpperCase()}</span>
      <span>{lines} خط</span>
      <span>{chars} کاراکتر</span>
      <span>{saveState === "saving" ? "در حال ذخیره…" : "ذخیره شد"}</span>
    </div>
  );
}
