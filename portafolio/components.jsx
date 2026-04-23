// Shared small components
const { useState, useEffect, useRef, useMemo } = React;

function Gutter({ start = 1, count = 8, activeLine }) {
  if (!window.__TWEAKS__.showLineNumbers) return null;
  return (
    <div className="gutter" aria-hidden>
      {Array.from({ length: count }).map((_, i) => {
        const n = start + i;
        return <span key={i} className={`ln ${n === activeLine ? 'active' : ''}`}>{n}</span>;
      })}
    </div>
  );
}

function SectionHeader({ idx, total, label, file }) {
  return (
    <div className="section-header">
      <span className="hash">##</span>
      <span className="label">{label}</span>
      <span className="rule" />
      <span className="idx">{String(idx).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
      <span style={{ color: 'var(--fg-muted)' }}>{file}</span>
    </div>
  );
}

function Tabline({ sections, active, onPick }) {
  return (
    <div className="tabline" role="tablist">
      {sections.map((s, i) => (
        <div
          key={s.id}
          role="tab"
          className={`tab ${active === s.id ? 'active' : ''}`}
          onClick={() => onPick(s.id)}
        >
          <span className="ico">{s.ico}</span>
          <span>{s.file}</span>
          <span className="num">[{i + 1}]</span>
        </div>
      ))}
    </div>
  );
}

function Statusline({ section, mode, lineInfo }) {
  return (
    <div className="statusline">
      <div className="seg mode">{mode}</div>
      <div className="chevron right" />
      <div className="seg file">
        <span>~/portfolio/{section}.jsx</span>
      </div>
      <div className="chevron right-hollow" />
      <div className="spacer" />
      <div className="chevron left" />
      <div className="seg file">utf-8 · lf · jsx</div>
      <div className="chevron left" style={{ borderRightColor: 'var(--bg)' }} />
      <div className="seg mode">{lineInfo}</div>
    </div>
  );
}

function Mock({ kind }) {
  if (kind === 'ds') {
    return (
      <div className="mock">
        <div className="bar"><span/><span/><span/></div>
        <div className="content">
          <div className="bone accent" />
          <div className="bone med" />
          <div className="grid">
            <div /><div /><div />
            <div /><div /><div />
          </div>
        </div>
      </div>
    );
  }
  if (kind === 'chart') {
    return (
      <div className="mock">
        <div className="bar"><span/><span/><span/></div>
        <div className="content" style={{ justifyContent: 'flex-end' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: '70%' }}>
            {[40, 65, 30, 80, 55, 90, 45, 70, 35].map((h, i) => (
              <div key={i} style={{
                flex: 1,
                height: `${h}%`,
                background: i === 5 ? 'var(--accent)' : 'var(--line)',
              }} />
            ))}
          </div>
          <div className="bone sm" style={{ marginTop: 8 }} />
        </div>
      </div>
    );
  }
  if (kind === 'editor') {
    return (
      <div className="mock">
        <div className="bar"><span/><span/><span/></div>
        <div className="content" style={{ gap: 5 }}>
          <div className="bone" style={{ width: '85%' }} />
          <div className="bone med" />
          <div className="bone accent" />
          <div className="bone" style={{ width: '75%' }} />
          <div className="bone sm" />
          <div className="bone med" />
          <div className="bone" style={{ width: '50%' }} />
        </div>
      </div>
    );
  }
  // dashboard
  return (
    <div className="mock">
      <div className="bar"><span/><span/><span/></div>
      <div className="content">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
          <div style={{ height: 42, background: 'var(--bg-3)', border: '1px solid var(--line)', padding: 6 }}>
            <div style={{ height: 4, width: '40%', background: 'var(--accent)', marginBottom: 4 }} />
            <div style={{ height: 4, width: '70%', background: 'var(--line)' }} />
          </div>
          <div style={{ height: 42, background: 'var(--bg-3)', border: '1px solid var(--line)', padding: 6 }}>
            <div style={{ height: 4, width: '30%', background: 'var(--fg-dim)', marginBottom: 4 }} />
            <div style={{ height: 4, width: '55%', background: 'var(--line)' }} />
          </div>
        </div>
        <div style={{ height: 54, background: 'var(--bg-3)', border: '1px solid var(--line)', marginTop: 6, position: 'relative' }}>
          <svg viewBox="0 0 100 40" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
            <polyline points="0,30 15,25 30,28 45,15 60,18 75,8 90,12 100,5" fill="none" stroke="var(--accent)" strokeWidth="1" />
          </svg>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Gutter, SectionHeader, Tabline, Statusline, Mock });
