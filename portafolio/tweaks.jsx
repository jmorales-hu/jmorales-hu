// Tweaks Panel
const { useEffect: _ue, useState: _us } = React;

const ACCENT_SWATCHES = [
  { name: 'orange', value: '#ff6b1a' },
  { name: 'ember', value: '#e85d04' },
  { name: 'amber', value: '#ffa94d' },
  { name: 'crimson', value: '#ff4d4d' },
  { name: 'lime', value: '#a3e635' },
  { name: 'cyan', value: '#22d3ee' },
];

function TweaksPanel({ open, tweaks, setTweaks }) {
  if (!open) return null;

  const update = (patch) => {
    const next = { ...tweaks, ...patch };
    setTweaks(next);
    try {
      window.parent.postMessage({ type: '__edit_mode_set_keys', edits: patch }, '*');
    } catch (e) {}
  };

  return (
    <div className="tweaks-panel">
      <div className="tweaks-header">
        <span>:set tweaks</span>
        <span>ON</span>
      </div>
      <div className="tweaks-body">
        <div className="tweak-row">
          <label>accent color</label>
          <div className="swatches">
            {ACCENT_SWATCHES.map((s) => (
              <div
                key={s.value}
                className={`sw ${tweaks.accent === s.value ? 'on' : ''}`}
                style={{ background: s.value }}
                title={s.name}
                onClick={() => update({ accent: s.value })}
              />
            ))}
          </div>
        </div>

        <div className="tweak-row">
          <label>density</label>
          <div className="opts">
            {['compact', 'comfortable', 'spacious'].map((d) => (
              <div key={d} className={`opt ${tweaks.density === d ? 'on' : ''}`} onClick={() => update({ density: d })}>{d}</div>
            ))}
          </div>
        </div>

        <div className="tweak-row">
          <label>line numbers</label>
          <div className="opts">
            <div className={`opt ${tweaks.showLineNumbers ? 'on' : ''}`} onClick={() => update({ showLineNumbers: true })}>on</div>
            <div className={`opt ${!tweaks.showLineNumbers ? 'on' : ''}`} onClick={() => update({ showLineNumbers: false })}>off</div>
          </div>
        </div>

        <div className="tweak-row">
          <label>statusline</label>
          <div className="opts">
            <div className={`opt ${tweaks.showStatusline ? 'on' : ''}`} onClick={() => update({ showStatusline: true })}>on</div>
            <div className={`opt ${!tweaks.showStatusline ? 'on' : ''}`} onClick={() => update({ showStatusline: false })}>off</div>
          </div>
        </div>

        <div style={{ fontSize: 10, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', paddingTop: 4, borderTop: '1px dotted var(--line)' }}>
          <kbd style={{ background: 'var(--bg-2)', border: '1px solid var(--line)', padding: '1px 5px', marginRight: 4 }}>?</kbd>
          for shortcuts
        </div>
      </div>
    </div>
  );
}

window.TweaksPanel = TweaksPanel;
