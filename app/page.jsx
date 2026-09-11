const nav = [
  { label: 'Command Center', href: '/', active: true },
  { label: 'AI Governance', href: '/governance' },
  { label: 'Clients', href: '#' },
  { label: 'Research', href: '#' },
  { label: 'Content', href: '#' },
  { label: 'Speaking', href: '#' },
  { label: 'Academy', href: '#' },
  { label: 'Digital Steward Team', href: '#' },
];

const metrics = [
  { value: '8', label: 'Governance Workstreams', detail: '3 require executive review', tone: 'orange' },
  { value: '12', label: 'Evidence Chains', detail: '91% complete', tone: 'blue' },
  { value: '4', label: 'Decision Boundaries', detail: '1 expires this month', tone: 'navy' },
  { value: '6', label: 'Active Strategic Priorities', detail: '2 high-impact', tone: 'gold' },
];

const decisions = [
  { priority: 'HIGH', title: 'AI vendor access boundary', context: 'Review data-access scope before production authorization.', due: 'Executive review', status: 'Action required' },
  { priority: 'MED', title: 'Evidence retention standard', context: 'Confirm retention window for governance artifacts.', due: 'Policy architecture', status: 'In review' },
  { priority: 'LOW', title: 'Board briefing refresh', context: 'Update risk narrative with September governance developments.', due: 'Thought leadership', status: 'Draft ready' },
];

const workstreams = [
  ['AI Readiness Diagnostic', 82, 'Evidence collection'],
  ['Decision Rights Matrix™', 64, 'Executive mapping'],
  ['Digital Stewardship Framework™', 91, 'Control validation'],
  ['Board Command Center™', 48, 'Prototype architecture'],
];

function Icon({ name }) {
  const common = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };
  const paths = {
    Command: <><rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/></>,
    Bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/></>,
    Search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/></>,
    Arrow: <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
  };
  return <svg {...common}>{paths[name]}</svg>;
}

export default function Page() {
  return (
    <div className="app-shell">
      <style>{`
        @media (min-width: 1180px) {
          .app-shell { grid-template-columns: 292px minmax(0, 1fr) !important; }
          .sidebar { padding-left: 18px !important; padding-right: 18px !important; }
          .brand-lockup { align-items: center !important; }
          .brand-logo { width: 72px !important; height: 72px !important; flex: 0 0 72px; }
          .brand-copy { display: flex !important; }
          .nav-item > span:last-child { display: inline !important; }
          .nav-label { display: block !important; }
          .steward-card { display: block !important; }
        }
        .metric-card { min-height: 118px !important; padding-top: 16px !important; padding-bottom: 16px !important; }
        .metric-card h2 { margin-top: 10px !important; }
        .hero { padding-top: 32px !important; padding-bottom: 20px !important; }
        .human-governance-banner { margin: 0 0 14px; padding: 12px 16px; display: flex; align-items: center; justify-content: space-between; gap: 16px; border: 1px solid #dce7f6; border-radius: 12px; background: linear-gradient(90deg,#f9fbff,#eef5ff); }
        .human-governance-banner strong { color: #071d3a; font: 700 12px Manrope,sans-serif; }
        .human-governance-banner span { color: #63748a; font-size: 10px; }
        .human-governance-banner b { color: #1457d9; font-size: 9px; letter-spacing: .12em; text-transform: uppercase; }
        @media (max-width: 760px) { .human-governance-banner { align-items: flex-start; flex-direction: column; } }
      `}</style>

      <aside className="sidebar">
        <div className="brand-lockup">
          <div className="brand-logo" role="img" aria-label="Ascend AI NOW official logo" />
          <div className="brand-copy"><strong>Digital Headquarters</strong><span>Executive Governance OS</span></div>
        </div>
        <nav className="nav" aria-label="Primary">
          <p className="nav-label">Headquarters</p>
          {nav.map((item, index) => (
            <a key={item.label} href={item.href} title={item.label} className={item.active ? 'nav-item active' : 'nav-item'}>
              <span className="nav-dot">{index === 0 ? <Icon name="Command" /> : String(index + 1).padStart(2, '0')}</span><span>{item.label}</span>
            </a>
          ))}
        </nav>
        <div className="steward-card"><span className="eyebrow">Stewardship Principle</span><p>Every institution is accountable for what it has been entrusted with. Artificial Intelligence is no exception.</p><span className="steward-mark">ASCEND AI NOW</span></div>
      </aside>

      <main className="main">
        <header className="topbar"><div><span className="system-status"><i /> GOVERNANCE SYSTEM ONLINE</span></div><div className="top-actions"><button className="icon-btn" aria-label="Search"><Icon name="Search" /></button><button className="icon-btn notification" aria-label="Notifications"><Icon name="Bell" /><span /></button><div className="identity-chip"><div className="identity-monogram">AS</div><div><strong>Dr. Alexis S. Smith</strong><span>Founder & CEO</span></div></div></div></header>

        <section className="hero"><div><span className="eyebrow blue">EXECUTIVE COMMAND CENTER</span><h1>Good evening, <span>Dr. Alexis S. Smith.</span></h1><p>Your governance intelligence, executive decisions, evidence, and strategic priorities — in one place.</p></div><div className="hero-actions"><a className="secondary-btn" href="/governance#evidence">View Evidence Chain™</a><a className="primary-btn" href="/governance">Open AI Governance Workspace <Icon name="Arrow" /></a></div></section>

        <div className="human-governance-banner" aria-label="Human executive governance principle"><div><strong>Human Executive. Governed AI.</strong> <span>AI may recommend, analyze, and accelerate. Accountable decisions remain human-owned.</span></div><b>Decision Rights • Oversight • Evidence</b></div>

        <section className="metrics-grid" aria-label="Executive metrics">{metrics.map((metric) => <article className="metric-card" key={metric.label}><span className={`metric-accent ${metric.tone}`} /><div className="metric-head"><strong>{metric.value}</strong><span>↗</span></div><h2>{metric.label}</h2><p>{metric.detail}</p></article>)}</section>

        <section className="dashboard-grid">
          <article className="panel decisions-panel"><div className="panel-head"><div><span className="eyebrow">EXECUTIVE DECISION QUEUE™</span><h2>Human decisions that cannot be delegated to AI</h2></div><a className="text-btn" href="/governance">View all →</a></div><div className="decision-list">{decisions.map((decision)=><div className="decision-row" key={decision.title}><span className={`priority ${decision.priority.toLowerCase()}`}>{decision.priority}</span><div className="decision-copy"><strong>{decision.title}</strong><p>{decision.context}</p></div><div className="decision-meta"><span>{decision.due}</span><strong>{decision.status}</strong></div><a className="row-arrow" href="/governance" aria-label={`Open ${decision.title}`}>→</a></div>)}</div></article>

          <article className="panel pulse-panel"><div className="panel-head"><div><span className="eyebrow">AI POWER GAP™ INTELLIGENCE</span><h2>Governance pulse</h2></div><span className="live-chip"><i /> LIVE</span></div><div className="pulse-score"><div className="score-ring"><div><strong>74</strong><span>/100</span></div></div><div><span className="score-label">Readiness posture</span><strong>Advancing</strong><p>Controls are strengthening. Decision-right clarity remains the highest leverage opportunity.</p></div></div><div className="pulse-bars"><div><span>Governance</span><strong>82%</strong><i><b style={{width:'82%'}} /></i></div><div><span>Evidence</span><strong>91%</strong><i><b style={{width:'91%'}} /></i></div><div><span>Oversight</span><strong>69%</strong><i><b style={{width:'69%'}} /></i></div></div></article>

          <article className="panel workstreams-panel"><div className="panel-head"><div><span className="eyebrow">ACTIVE GOVERNANCE WORK</span><h2>Workstream progress</h2></div><a className="text-btn" href="/governance">Open workspace →</a></div><div className="workstream-list">{workstreams.map(([name,progress,stage])=><div className="workstream" key={name}><div><strong>{name}</strong><span>{stage}</span></div><div className="progress-line"><i><b style={{width:`${progress}%`}} /></i><strong>{progress}%</strong></div></div>)}</div></article>

          <article className="panel agenda-panel"><div className="panel-head"><div><span className="eyebrow">EXECUTIVE AGENDA</span><h2>What matters next</h2></div></div><div className="agenda-date"><span>SEP</span><strong>10</strong><small>THURSDAY</small></div><div className="agenda-items"><div><i className="agenda-dot orange"/><span>Governance</span><strong>Review delegation boundary expirations</strong></div><div><i className="agenda-dot blue"/><span>Content</span><strong>Finalize Ascend AI NOW Report™ edition</strong></div><div><i className="agenda-dot navy"/><span>Strategy</span><strong>Digital Headquarters Phase 2 operating build</strong></div></div></article>
        </section>

        <footer className="app-footer"><span>ASCEND AI NOW, LLC · DIGITAL HEADQUARTERS</span><span>Closing THE AI POWER GAP™ — One LLM at a Time.</span></footer>
      </main>
    </div>
  );
}
