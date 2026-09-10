/**
 * Fixed ambient layer behind every page: a masked dot grid plus three
 * slowly drifting colour fields. All of the work happens in CSS
 * (`.ambient*` / `.aurora*` in globals.css) so this stays a server
 * component with zero runtime cost, and the global reduced-motion rule
 * freezes the drift for anyone who asks for that.
 */
export function AmbientBackground() {
  return (
    <div className="ambient" aria-hidden>
      <div className="aurora aurora-a" />
      <div className="aurora aurora-b" />
      <div className="aurora aurora-c" />
      <div className="ambient-dots" />
    </div>
  );
}
