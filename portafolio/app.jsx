// Main app — keyboard nav, tabline, statusline, help, cmdline
const { useState: uS, useEffect: uE, useRef: uR } = React;

const SECTIONS = [
  { id: 'hero', file: 'whoami.jsx', ico: '󰊤', label: 'hero' },
  { id: 'about', file: 'about.md', ico: '󰦨', label: 'about' },
  { id: 'projects', file: 'projects/', ico: '', label: 'projects' },
  { id: 'stack', file: 'tools.yaml', ico: '', label: 'stack' },
  { id: 'experience', file: 'git.log', ico: '', label: 'experience' },
  { id: 'uses', file: 'setup.conf', ico: '', label: 'uses' },
  { id: 'contact', file: 'contact.jsx', ico: '󰇮', label: 'contact' },
];

function applyTweaks(t) {
  const r = document.documentElement;
  r.style.setProperty('--accent', t.accent);
  // Derive accent-dim
  r.style.setProperty('--accent-dim', t.accent);
  document.body.classList.toggle('no-lines', !t.showLineNumbers);

  const pads = { compact: ['48px', '72px'], comfortable: ['80px', '120px'], spacious: ['120px', '160px'] };
  const [top, bot] = pads[t.density] || pads.comfortable;
  r.style.setProperty('--sec-pt', top);
  r.style.setProperty('--sec-pb', bot);
}

function App() {
  const [active, setActive] = uS('hero');
  const [mode, setMode] = uS('NORMAL');
  const [lineInfo, setLineInfo] = uS('1:1');
  const [tweaks, setTweaksRaw] = uS(window.__TWEAKS__);
  const [showHelp, setShowHelp] = uS(false);
  const [cmd, setCmd] = uS(null); // null or string
  const [tweaksOpen, setTweaksOpen] = uS(false);
  const viewportRef = uR(null);
  const cmdInputRef = uR(null);

  const setTweaks = (t) => {
    setTweaksRaw(t);
    window.__TWEAKS__ = t;
    applyTweaks(t);
  };

  uE(() => { applyTweaks(tweaks); }, []);

  // scroll to section
  const goto = (id) => {
    const el = document.querySelector(`[data-section="${id}"]`);
    if (el && viewportRef.current) {
      const top = el.offsetTop - 8;
      viewportRef.current.scrollTo({ top, behavior: 'smooth' });
    }
  };

  // update active section on scroll
  uE(() => {
    const v = viewportRef.current;
    if (!v) return;
    const onScroll = () => {
      const els = SECTIONS.map(s => document.querySelector(`[data-section="${s.id}"]`)).filter(Boolean);
      const scrollTop = v.scrollTop;
      let current = SECTIONS[0].id;
      for (const el of els) {
        if (el.offsetTop - 120 <= scrollTop) current = el.dataset.section;
      }
      setActive(current);
      // fake line info
      const total = v.scrollHeight - v.clientHeight;
      const pct = total > 0 ? Math.min(100, Math.round((scrollTop / total) * 100)) : 0;
      setLineInfo(`${pct}%  ${Math.max(1, Math.round(scrollTop/18))}:1`);
    };
    v.addEventListener('scroll', onScroll);
    onScroll();
    return () => v.removeEventListener('scroll', onScroll);
  }, []);

  // keyboard
  uE(() => {
    let gPending = false;
    const onKey = (e) => {
      if (cmd !== null) return; // cmdline handles its own
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      const v = viewportRef.current;
      if (!v) return;

      if (e.key === '?') { e.preventDefault(); setShowHelp(s => !s); return; }
      if (e.key === 'Escape') { setShowHelp(false); setCmd(null); return; }
      if (e.key === ':') { e.preventDefault(); setCmd(''); setMode('COMMAND'); setTimeout(() => cmdInputRef.current?.focus(), 0); return; }

      if (e.key === 'j') { e.preventDefault(); v.scrollBy({ top: 80, behavior: 'smooth' }); }
      else if (e.key === 'k') { e.preventDefault(); v.scrollBy({ top: -80, behavior: 'smooth' }); }
      else if (e.key === 'G') { e.preventDefault(); v.scrollTo({ top: v.scrollHeight, behavior: 'smooth' }); }
      else if (e.key === 'g') {
        if (gPending) { v.scrollTo({ top: 0, behavior: 'smooth' }); gPending = false; }
        else { gPending = true; setTimeout(() => gPending = false, 500); }
      }
      else if (/^[1-7]$/.test(e.key)) {
        const idx = parseInt(e.key, 10) - 1;
        if (SECTIONS[idx]) goto(SECTIONS[idx].id);
      }
      else if (e.key === 'i') setMode('INSERT');
      else if (e.key === 'v') setMode('VISUAL');
      else if (e.key === 'n' && e.ctrlKey) { e.preventDefault(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [cmd]);

  // Edit mode protocol
  uE(() => {
    const onMsg = (e) => {
      if (!e.data || typeof e.data !== 'object') return;
      if (e.data.type === '__activate_edit_mode') setTweaksOpen(true);
      if (e.data.type === '__deactivate_edit_mode') setTweaksOpen(false);
    };
    window.addEventListener('message', onMsg);
    try {
      window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    } catch (err) {}
    return () => window.removeEventListener('message', onMsg);
  }, []);

  // Reset mode after a moment
  uE(() => {
    if (mode === 'NORMAL' || mode === 'COMMAND') return;
    const t = setTimeout(() => setMode('NORMAL'), 1400);
    return () => clearTimeout(t);
  }, [mode]);

  const runCmd = (c) => {
    const v = c.trim().toLowerCase();
    if (!v) { setCmd(null); setMode('NORMAL'); return; }
    if (v === 'q' || v === 'quit') { setCmd('// nope, no puedes cerrar :)'); setTimeout(() => { setCmd(null); setMode('NORMAL'); }, 1200); return; }
    if (v === 'help' || v === 'h') { setShowHelp(true); setCmd(null); setMode('NORMAL'); return; }
    if (v === 'tweaks') { setTweaksOpen(t => !t); setCmd(null); setMode('NORMAL'); return; }
    const match = SECTIONS.find(s => s.id === v || s.label === v);
    if (match) { goto(match.id); setCmd(null); setMode('NORMAL'); return; }
    setCmd(`// unknown command: ${v}`);
    setTimeout(() => { setCmd(null); setMode('NORMAL'); }, 1500);
  };

  return (
    <div className="app">
      <Tabline sections={SECTIONS} active={active} onPick={goto} />

      <div className="main">
        <div className="viewport" ref={viewportRef}>
          <Hero />
          <About />
          <Projects />
          <Stack />
          <Experience />
          <Uses />
          <Contact />
        </div>
      </div>

      {tweaks.showStatusline && (
        <Statusline section={active} mode={mode} lineInfo={lineInfo} />
      )}

      {!tweaksOpen && !showHelp && cmd === null && (
        <div className="kbd-hint">
          <kbd>?</kbd> shortcuts · <kbd>j</kbd><kbd>k</kbd> scroll · <kbd>:</kbd> cmd
        </div>
      )}

      {showHelp && (
        <div className="help-overlay" onClick={() => setShowHelp(false)}>
          <div className="help-panel" onClick={(e) => e.stopPropagation()}>
            <div className="help-panel-header">
              <span>keybindings · :help</span>
              <span className="x" onClick={() => setShowHelp(false)}>[esc] close</span>
            </div>
            <div className="help-panel-body">
              <div className="help-group">
                <h5>Navigation</h5>
                <div className="row"><span>scroll down</span><kbd>j</kbd></div>
                <div className="row"><span>scroll up</span><kbd>k</kbd></div>
                <div className="row"><span>top of page</span><kbd>gg</kbd></div>
                <div className="row"><span>bottom</span><kbd>G</kbd></div>
                <div className="row"><span>go to section</span><kbd>1-7</kbd></div>
              </div>
              <div className="help-group">
                <h5>Commands</h5>
                <div className="row"><span>open cmdline</span><kbd>:</kbd></div>
                <div className="row"><span>:about / :projects</span><kbd>↵</kbd></div>
                <div className="row"><span>:tweaks</span><kbd>↵</kbd></div>
                <div className="row"><span>show help</span><kbd>?</kbd></div>
                <div className="row"><span>close</span><kbd>esc</kbd></div>
              </div>
              <div className="help-group" style={{ gridColumn: '1 / -1', paddingTop: 12, borderTop: '1px dashed var(--line)' }}>
                <h5>Tip</h5>
                <div style={{ color: 'var(--fg-dim)', fontSize: 11, lineHeight: 1.6 }}>
                  The tabs above are clickable. The <span style={{ color: 'var(--accent)' }}>tweaks</span> panel toggles from the editor toolbar, or by typing <kbd style={{ background: 'var(--bg-2)', border: '1px solid var(--line)', padding: '1px 4px' }}>:tweaks</kbd>.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {cmd !== null && (
        <div className="cmdline">
          <span className="prefix">:</span>
          <input
            ref={cmdInputRef}
            value={cmd.startsWith('//') ? cmd : cmd}
            onChange={(e) => setCmd(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') runCmd(cmd);
              if (e.key === 'Escape') { setCmd(null); setMode('NORMAL'); }
            }}
            readOnly={cmd.startsWith('//')}
            placeholder="about | projects | stack | tweaks | help"
          />
        </div>
      )}

      <TweaksPanel open={tweaksOpen} tweaks={tweaks} setTweaks={setTweaks} />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
