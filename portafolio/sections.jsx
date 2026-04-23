// Section components
const D = window.DATA;

function Hero() {
  const { identity } = D;
  return (
    <section className="hero" data-screen-label="01 Hero" data-section="hero">
      <div className="hero-inner">
        <Gutter count={14} activeLine={3} />
        <div>
          <div className="hero-prompt">
            <span className="caret">❯</span>
            <span className="cmd">whoami</span>
          </div>
          <h1 className="hero-name">
            <span className="at">@</span>moralesbang<span className="cursor" />
          </h1>
          <div className="hero-role">
            <span className="tag">SWE</span>
            <span>{identity.role}</span>
            <span className="sep">·</span>
            <span>{identity.specialty}</span>
          </div>
          <p className="hero-bio">
            Software engineer focused on <em>React</em> and frontend systems.
            I write components that survive refactors, designs that don't <span className="hl">break in production</span>,
            and flows that don't need a manual.
          </p>
          <p className="hero-bio" style={{ color: 'var(--fg-dim)', fontSize: 14 }}>
            I work from <span className="hl">nvim</span> with a workflow increasingly backed by AI —
            <em> claude code</em> as the foundation. I polish the setup every week.
          </p>

          <div className="hero-meta">
            <div className="hero-meta-item">
              <div className="k">status</div>
              <div className="v"><span className="dot" />{identity.status}</div>
            </div>
            <div className="hero-meta-item">
              <div className="k">base</div>
              <div className="v">{identity.location}</div>
            </div>
            <div className="hero-meta-item">
              <div className="k">timezone</div>
              <div className="v">{identity.timezone}</div>
            </div>
            <div className="hero-meta-item">
              <div className="k">email</div>
              <div className="v" style={{ color: 'var(--accent)' }}>{identity.email}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  const { identity, stats } = D;
  return (
    <section className="section" data-screen-label="02 About" data-section="about">
      <div className="container">
        <Gutter count={18} />
        <div>
          <SectionHeader idx={1} total={6} label="about" file="about.md" />
          <div className="about-grid">
            <div className="about-copy">
              <h2>A <em>product</em> engineer, not just a coder.</h2>
              <p>
                I've been building web products for ~6 years — half of it at small startups, the other half on platform
                teams. My sweet spot is where DX, accessibility, and performance meet: design systems, tables with
                thousands of rows, editors, dense dashboards.
              </p>
              <p>
                I work from nvim with a workflow increasingly backed by AI — Claude Code as the foundation, small
                scripts for repetitive stuff, and a tmux + fzf + lazygit setup I refine every week. The goal isn't to
                write more code: it's to make better decisions, faster.
              </p>
              <p style={{ marginTop: 24 }}>
                Currently exploring how LLM agents change the dev loop —
                what they should do for you, what they shouldn't touch, and where the sweet spot sits between
                <span className="inline-code">autocomplete</span> and <span className="inline-code">autopilot</span>.
              </p>
            </div>
            <div className="about-card">
              <div className="about-card-header">
                <span>identity.json</span>
                <div className="dots"><div className="dot" /><div className="dot" /><div className="dot" /></div>
              </div>
              <div className="about-card-body">
                <div className="row"><span className="k">name</span><span className="v">{identity.firstName} {identity.lastName}</span></div>
                <div className="row"><span className="k">alias</span><span className="v accent">@{identity.handle}</span></div>
                <div className="row"><span className="k">role</span><span className="v">{identity.role}</span></div>
                <div className="row"><span className="k">focus</span><span className="v">{identity.specialty}</span></div>
                <div className="row"><span className="k">loc</span><span className="v">{identity.location}</span></div>
                <div className="row"><span className="k">tz</span><span className="v">{identity.timezone}</span></div>
                <div className="row"><span className="k">status</span><span className="v accent">● {identity.status}</span></div>
                <div className="row"><span className="k">editor</span><span className="v">nvim</span></div>
                <div className="row"><span className="k">ai</span><span className="v accent">claude code</span></div>
              </div>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: 0,
            marginTop: 56,
            border: '1px solid var(--line)',
          }}>
            {stats.map((s, i) => (
              <div key={i} style={{
                padding: '20px 18px',
                borderRight: i < stats.length - 1 ? '1px solid var(--line)' : 'none',
              }}>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 36, color: 'var(--accent)', lineHeight: 1 }}>{s.v}</div>
                <div style={{ fontSize: 10, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: 8 }}>{s.k}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const [hovered, setHovered] = useState(null);
  return (
    <section className="section" data-screen-label="03 Projects" data-section="projects">
      <div className="container">
        <Gutter count={20} />
        <div>
          <SectionHeader idx={2} total={6} label="projects" file="work/*" />
          <div className="projects-list">
            {D.projects.map((p, i) => (
              <div key={p.id} className="project" onMouseEnter={() => setHovered(p.id)} onMouseLeave={() => setHovered(null)}>
                <div>
                  <div className="project-head">
                    <span className="project-idx">/{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="project-name">
                    {p.name}{p.italic && <> <em>{p.italic}</em></>}
                  </h3>
                  <p className="project-tagline">{p.tagline}</p>
                  <div className="project-meta">
                    <span className="pill"><span className="d">year:</span> {p.year}</span>
                    <span className="pill"><span className="d">role:</span> {p.role}</span>
                    <span className="pill"><span className="d">status:</span> {p.status}</span>
                  </div>
                  <div className="project-meta" style={{ marginTop: 10 }}>
                    {p.stack.map((s, j) => <span key={j} className="pill">{s}</span>)}
                  </div>
                  <div className="project-links">
                    {p.links.map((l, j) => (
                      <a key={j} href={l.href} onClick={(e) => e.preventDefault()}>
                        {l.label} <span className="arrow">↗</span>
                      </a>
                    ))}
                  </div>
                </div>
                <div className="project-preview">
                  <Mock kind={p.mock} />
                  <span className="label">{p.id}.preview</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Stack() {
  return (
    <section className="section" data-screen-label="04 Stack" data-section="stack">
      <div className="container">
        <Gutter count={18} />
        <div>
          <SectionHeader idx={3} total={6} label="stack" file="tools.yaml" />
          <p style={{ color: 'var(--fg-dim)', fontSize: 14, marginBottom: 32, maxWidth: 640, lineHeight: 1.7 }}>
            The toolbox I use today. Not everything is <span style={{ color: 'var(--accent)' }}>React</span>,
            but React is the thread connecting most of it. Orange-highlighted is what I touch daily.
          </p>
          <div className="stack-grid">
            {D.stack.map((cat, i) => (
              <div key={i} className="stack-cat">
                <div className="stack-cat-title">{cat.cat}</div>
                <div className="stack-items">
                  {cat.items.map((it, j) => (
                    <div key={j} className="stack-item">
                      <span className={`name ${it.primary ? 'primary' : ''}`}>{it.name}</span>
                      <span className="lvl">
                        {Array.from({ length: 5 }).map((_, k) => (
                          <span key={k} className={`blk ${k < it.lvl ? 'on' : ''}`} />
                        ))}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section className="section" data-screen-label="05 Experience" data-section="experience">
      <div className="container">
        <Gutter count={24} />
        <div>
          <SectionHeader idx={4} total={6} label="experience" file="git log --all" />
          <div className="timeline">
            {D.experience.map((e, i) => (
              <div key={i} className={`tl-item ${e.current ? 'current' : ''}`}>
                <div className="tl-date">{e.current && <span className="now">● </span>}{e.date}</div>
                <div className="tl-role">{e.role}{e.italic && <> · <em>{e.italic}</em></>}</div>
                <div className="tl-company">{e.company} <span className="at">— {e.at}</span></div>
                <div className="tl-desc">{e.desc}</div>
                <div className="tl-tags">
                  {e.tags.map((t, j) => <span key={j} className="tg">{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Uses() {
  return (
    <section className="section" data-screen-label="06 Uses" data-section="uses">
      <div className="container">
        <Gutter count={14} />
        <div>
          <SectionHeader idx={5} total={6} label="uses" file="setup.conf" />
          <p style={{ color: 'var(--fg-dim)', fontSize: 14, marginBottom: 32, maxWidth: 560, lineHeight: 1.7 }}>
            What's plugged in while I'm writing this. I update the list every couple of months —
            the last iteration dropped 4 nvim plugins and changed my life by 2%.
          </p>
          <div className="uses-grid">
            {D.uses.map((u, i) => (
              <div key={i} className="uses-card" data-corner={u.corner}>
                <h4>{u.title}</h4>
                <ul>
                  {u.items.map((it, j) => (
                    <li key={j}>
                      <span className="k">{it.k}</span>
                      <span className={`v ${it.accent ? 'accent' : ''}`}>{it.v}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="section" data-screen-label="07 Contact" data-section="contact" style={{ paddingBottom: 160 }}>
      <div className="container">
        <Gutter count={16} />
        <div>
          <SectionHeader idx={6} total={6} label="contact" file=":q · handshake" />
          <div className="contact-wrap">
            <h2 className="contact-title">Let's talk <em>about your idea.</em></h2>
            <p style={{ color: 'var(--fg-dim)', fontSize: 15, maxWidth: 560, lineHeight: 1.7, marginBottom: 40 }}>
              I reply to emails same-day. If it's a React project, a frontend systems gig, or a weird AI experiment —
              I'm especially listening.
            </p>
            <div className="contact-links">
              {D.contact.map((c, i) => (
                <a key={i} className="contact-link" href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                  <div>
                    <div className="k">{c.k}</div>
                    <div style={{ marginTop: 4 }}>{c.v}</div>
                  </div>
                  <span className="arr">→</span>
                </a>
              ))}
            </div>
            <div className="contact-footer">
              <span>© 2026 · @moralesbang · built with ♥ & nvim</span>
              <span className="fortune">"Simplicity is prerequisite for reliability." — Dijkstra</span>
              <span>:wq</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Hero, About, Projects, Stack, Experience, Uses, Contact });
