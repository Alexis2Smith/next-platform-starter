const nav = [
  { label: 'Command Center', href: '/' },
  { label: 'AI Governance', href: '/governance', active: true },
  { label: 'Clients', href: '#' },
  { label: 'Research', href: '#' },
  { label: 'Content', href: '#' },
  { label: 'Speaking', href: '#' },
  { label: 'Academy', href: '#' },
  { label: 'Digital Steward Team', href: '#' },
];

const systems = [
  { system: 'Executive AI Assistant', owner: 'Office of the CEO', tier: 'High', role: 'Recommend only', boundary: 'DB-004', reviewer: 'Dr. Alexis S. Smith', evidence: '9/10', status: 'Review due' },
  { system: 'Research Intelligence', owner: 'Strategy & Research', tier: 'Moderate', role: 'Analyze + summarize', boundary: 'DB-007', reviewer: 'Research Lead', evidence: '12/12', status: 'Active' },
  { system: 'Client Governance Copilot', owner: 'Advisory Services', tier: 'High', role: 'Draft + recommend', boundary: 'DB-011', reviewer: 'Engagement Executive', evidence: '7/8', status: 'Conditional' },
  { system: 'Content Production Agent', owner: 'Thought Leadership', tier: 'Low', role: 'Draft content', boundary: 'DB-014', reviewer: 'Content Owner', evidence: '15/15', status: 'Active' },
];

const decisionRights = [
  ['Approve high-risk AI use', 'Human executive', 'Recommend', 'Required', 'Board / executive'],
  ['Change data-access scope', 'Data owner', 'No', 'Required', 'Security + privacy'],
  ['Generate governance draft', 'Policy owner', 'Draft', 'Required', 'Policy owner'],
  ['Publish external content', 'Content owner', 'Draft', 'Required', 'Human publisher'],
  ['Retain governance evidence', 'Records owner', 'Automate', 'Exception review', 'Governance office'],
];

const boundaries = [
  { id: 'DB-004', scope: 'Executive AI Assistant', may: 'Recommend, analyze, prepare options', mayNot: 'Approve, commit funds, change policy', expires: 'Sep 30', owner: 'CEO', state: 'Expiring' },
  { id: 'DB-007', scope: 'Research Intelligence', may: 'Search approved sources, synthesize', mayNot: 'Publish externally, alter source evidence', expires: 'Dec 15', owner: 'Strategy', state: 'Active' },
  { id: 'DB-011', scope: 'Client Governance Copilot', may: 'Draft controls and mappings', mayNot: 'Make client decisions, sign approvals', expires: 'Oct 18', owner: 'Advisory', state: 'Conditional' },
];

const evidence = [
  { id: 'EC-1024', event: 'Vendor access scope reviewed', source: 'AI System Registry', reviewer: 'Dr. Alexis S. Smith', control: 'Access governance', retained: '7 years', state: 'Complete' },
  { id: 'EC-1025', event: 'Delegation boundary updated', source: 'DB-004', reviewer: 'Office of the CEO', control: 'Human oversight', retained: '7 years', state: 'Complete' },
  { id: 'EC-1026', event: 'Policy draft generated', source: 'Client Governance Copilot', reviewer: 'Policy owner', control: 'Content integrity', retained: '3 years', state: 'Needs evidence' },
];

function Icon({ name }) {
  const common = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };
  const paths = {
    Command: <><rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/></>,
    Bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/></>,
    Search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/></>,
    Arrow: <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
    Plus: <><path d="M12 5v14"/><path d="M5 12h14"/></>,
  };
  return <svg {...common}>{paths[name]}</svg>;
}

function State({ children }) {
  const key = String(children).toLowerCase().replaceAll(' ', '-');
  return <span className={`gov-state ${key}`}>{children}</span>;
}

export default function GovernancePage() {
  return (
    <div className="app-shell gov-shell">
      <style>{`
        .gov-shell .main{background:#f5f8fc}.gov-hero{padding:28px 0 18px;display:flex;align-items:flex-end;justify-content:space-between;gap:20px}.gov-hero h1{margin:7px 0 7px;color:#071d3a;font:800 clamp(28px,3vw,38px)/1.12 Manrope,sans-serif;letter-spacing:-.035em}.gov-hero p{margin:0;max-width:760px;color:#6d7b90;font-size:13px;line-height:1.55}.gov-actions{display:flex;gap:8px;flex-wrap:wrap}.gov-actions button{min-height:40px;padding:0 14px;border-radius:9px;font-size:10px;font-weight:800;cursor:pointer}.gov-primary{display:flex;align-items:center;gap:7px;color:white;background:#1457d9;box-shadow:0 8px 20px rgba(20,87,217,.18)}.gov-secondary{color:#071d3a;background:#fff;border:1px solid #e4eaf1}.gov-summary{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin:0 0 12px}.gov-summary article{padding:14px 16px;border:1px solid #e4eaf1;border-radius:12px;background:white;box-shadow:0 8px 24px rgba(13,34,62,.03)}.gov-summary strong{display:block;color:#071d3a;font:800 24px Manrope}.gov-summary span{display:block;margin-top:3px;color:#64758b;font-size:9px}.gov-workspace{display:grid;grid-template-columns:minmax(0,1.55fr) minmax(320px,.75fr);gap:12px}.gov-panel{border:1px solid #e4eaf1;border-radius:13px;background:#fff;overflow:hidden;box-shadow:0 8px 28px rgba(13,34,62,.035)}.gov-panel.full{grid-column:1/-1}.gov-panel-head{min-height:66px;padding:14px 18px;display:flex;align-items:center;justify-content:space-between;gap:14px;border-bottom:1px solid #edf1f5}.gov-panel-head h2{margin:4px 0 0;color:#071d3a;font:800 15px Manrope}.gov-panel-head p{margin:4px 0 0;color:#7b899a;font-size:9px}.gov-tabs{display:flex;gap:6px;flex-wrap:wrap}.gov-tab{padding:6px 9px;border:1px solid #dce5f1;border-radius:20px;background:#f8fbff;color:#5d6e84;font-size:8px;font-weight:800}.gov-tab.active{border-color:#c9dafa;background:#eaf2ff;color:#1457d9}.gov-table-wrap{overflow:auto}.gov-table{width:100%;border-collapse:collapse;min-width:880px}.gov-table th{padding:10px 12px;background:#fafbfd;color:#8390a1;font-size:7px;letter-spacing:.09em;text-align:left;text-transform:uppercase}.gov-table td{padding:12px;border-top:1px solid #edf1f5;color:#3a4c64;font-size:9px;vertical-align:middle}.gov-table td strong{color:#21344d;font:700 9px Manrope}.risk{padding:4px 6px;border-radius:5px;font-size:7px;font-weight:800;text-transform:uppercase}.risk.high{color:#b34e12;background:#fff0e5}.risk.moderate{color:#9a7515;background:#fff8d9}.risk.low{color:#2360b5;background:#ebf2ff}.gov-state{display:inline-flex;padding:5px 7px;border-radius:20px;font-size:7px;font-weight:800}.gov-state.active,.gov-state.complete{color:#258359;background:#effaf5}.gov-state.review-due,.gov-state.expiring,.gov-state.needs-evidence{color:#b34e12;background:#fff0e5}.gov-state.conditional{color:#8d6b13;background:#fff8d9}.matrix-list{padding:8px 18px 14px}.matrix-row{padding:12px 0;display:grid;grid-template-columns:minmax(160px,1.3fr) repeat(4,minmax(90px,.8fr));gap:10px;align-items:center;border-bottom:1px solid #edf1f5}.matrix-row:last-child{border:0}.matrix-row.header{padding:8px 0;color:#8794a5;font-size:7px;font-weight:800;text-transform:uppercase}.matrix-row:not(.header){color:#55667b;font-size:8px}.matrix-row strong{color:#26384f;font-size:9px}.boundary-list{padding:10px 16px}.boundary-card{padding:13px 0;border-bottom:1px solid #edf1f5}.boundary-card:last-child{border:0}.boundary-top{display:flex;align-items:center;justify-content:space-between;gap:10px}.boundary-id{color:#1457d9;font-size:8px;font-weight:800}.boundary-card h3{margin:5px 0 8px;color:#21344d;font:800 11px Manrope}.boundary-rule{display:grid;grid-template-columns:1fr 1fr;gap:8px}.boundary-rule div{padding:8px;border-radius:8px;background:#f8fafc}.boundary-rule span{display:block;color:#8794a5;font-size:7px;font-weight:800;text-transform:uppercase}.boundary-rule p{margin:4px 0 0;color:#52647a;font-size:8px;line-height:1.45}.boundary-meta{margin-top:8px;display:flex;justify-content:space-between;color:#8190a2;font-size:7px}.evidence-list{padding:8px 16px}.evidence-row{padding:12px 0;display:grid;grid-template-columns:70px minmax(160px,1.3fr) 1fr 1fr 86px;gap:10px;align-items:center;border-bottom:1px solid #edf1f5}.evidence-row:last-child{border:0}.evidence-row strong{color:#26384f;font-size:9px}.evidence-row span,.evidence-row small{color:#708096;font-size:8px}.evidence-row small{display:block;margin-top:3px}.gov-footer-note{margin:12px 0 0;padding:12px 14px;border:1px dashed #cdd9e8;border-radius:10px;color:#607187;background:#fbfdff;font-size:9px;line-height:1.5}.gov-footer-note strong{color:#071d3a}.nav-item.active .nav-dot{color:white}.nav-item[href='/governance'].active{box-shadow:inset 3px 0 0 #f47a28}
        @media(max-width:1050px){.gov-workspace{grid-template-columns:1fr}.gov-panel.full{grid-column:auto}.gov-summary{grid-template-columns:repeat(2,1fr)}.matrix-row{grid-template-columns:1.2fr repeat(4,.8fr)}}
        @media(max-width:700px){.gov-hero{align-items:flex-start;flex-direction:column}.gov-actions{width:100%}.gov-actions button{flex:1}.gov-summary{grid-template-columns:1fr 1fr}.boundary-rule{grid-template-columns:1fr}.matrix-list{overflow:auto}.matrix-row{min-width:720px}.evidence-list{overflow:auto}.evidence-row{min-width:720px}}
      `}</style>

      <aside className="sidebar">
        <div className="brand-lockup">
          <div className="brand-logo" role="img" aria-label="Ascend AI NOW official logo" />
          <div className="brand-copy"><strong>Digital Headquarters</strong><span>Executive Governance OS</span></div>
        </div>
        <nav className="nav" aria-label="Primary">
          <p className="nav-label">Headquarters</p>
          {nav.map((item, index) => (
            <a key={item.label} href={item.href} className={item.active ? 'nav-item active' : 'nav-item'}>
              <span className="nav-dot">{index === 0 ? <Icon name="Command" /> : String(index + 1).padStart(2, '0')}</span><span>{item.label}</span>
            </a>
          ))}
        </nav>
        <div className="steward-card"><span className="eyebrow">Stewardship Principle</span><p>Every institution is accountable for what it has been entrusted with. Artificial Intelligence is no exception.</p><span className="steward-mark">ASCEND AI NOW</span></div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div><span className="system-status"><i /> GOVERNANCE SYSTEM ONLINE</span></div>
          <div className="top-actions">
            <button className="icon-btn" aria-label="Search"><Icon name="Search" /></button>
            <button className="icon-btn notification" aria-label="Notifications"><Icon name="Bell" /><span /></button>
            <div className="identity-chip"><div className="identity-monogram">AS</div><div><strong>Dr. Alexis S. Smith</strong><span>Founder & CEO</span></div></div>
          </div>
        </header>

        <section className="gov-hero">
          <div><span className="eyebrow blue">AI GOVERNANCE OPERATING WORKSPACE</span><h1>Govern what AI may do — and prove it.</h1><p>Define decision authority, constrain delegated AI behavior, assign human review, and retain an auditable Evidence Chain™ for every material governance action.</p></div>
          <div className="gov-actions"><button className="gov-secondary">Import governance record</button><button className="gov-primary"><Icon name="Plus" /> New governance record</button></div>
        </section>

        <section className="gov-summary" aria-label="Governance operating metrics">
          <article><strong>4</strong><span>AI systems governed</span></article><article><strong>3</strong><span>Active Delegation Boundaries™</span></article><article><strong>5</strong><span>Decision rights defined</span></article><article><strong>91%</strong><span>Evidence completeness</span></article>
        </section>

        <section className="gov-workspace">
          <article className="gov-panel full">
            <div className="gov-panel-head"><div><span className="eyebrow">AI SYSTEM REGISTRY</span><h2>Systems, owners, authority and evidence posture</h2><p>The operating inventory that connects each AI system to human accountability.</p></div><div className="gov-tabs"><span className="gov-tab active">All systems</span><span className="gov-tab">High risk</span><span className="gov-tab">Review due</span></div></div>
            <div className="gov-table-wrap"><table className="gov-table"><thead><tr><th>AI system</th><th>Business owner</th><th>Risk tier</th><th>AI role</th><th>Boundary</th><th>Human reviewer</th><th>Evidence</th><th>Status</th></tr></thead><tbody>{systems.map((row)=><tr key={row.system}><td><strong>{row.system}</strong></td><td>{row.owner}</td><td><span className={`risk ${row.tier.toLowerCase()}`}>{row.tier}</span></td><td>{row.role}</td><td><strong>{row.boundary}</strong></td><td>{row.reviewer}</td><td>{row.evidence}</td><td><State>{row.status}</State></td></tr>)}</tbody></table></div>
          </article>

          <article className="gov-panel">
            <div className="gov-panel-head"><div><span className="eyebrow">DECISION RIGHTS MATRIX™</span><h2>Who may decide what</h2><p>Separate recommendation authority from accountable decision authority.</p></div><button className="text-btn">Edit matrix →</button></div>
            <div className="matrix-list"><div className="matrix-row header"><span>Decision</span><span>Human owner</span><span>AI authority</span><span>Review</span><span>Escalation</span></div>{decisionRights.map(([decision,owner,ai,review,escalation])=><div className="matrix-row" key={decision}><strong>{decision}</strong><span>{owner}</span><span>{ai}</span><span>{review}</span><span>{escalation}</span></div>)}</div>
          </article>

          <article className="gov-panel">
            <div className="gov-panel-head"><div><span className="eyebrow">DELEGATION BOUNDARY™</span><h2>Approved scope of AI action</h2><p>Every delegated capability has a defined limit, owner and expiration.</p></div><button className="text-btn">Manage →</button></div>
            <div className="boundary-list">{boundaries.map((b)=><div className="boundary-card" key={b.id}><div className="boundary-top"><span className="boundary-id">{b.id}</span><State>{b.state}</State></div><h3>{b.scope}</h3><div className="boundary-rule"><div><span>AI may</span><p>{b.may}</p></div><div><span>AI may not</span><p>{b.mayNot}</p></div></div><div className="boundary-meta"><span>Owner: {b.owner}</span><span>Expires: {b.expires}</span></div></div>)}</div>
          </article>

          <article className="gov-panel full">
            <div className="gov-panel-head"><div><span className="eyebrow">EVIDENCE CHAIN™</span><h2>Proof of governance execution</h2><p>Each material action links source, reviewer, control mapping, retention and completion state.</p></div><button className="text-btn">Open evidence registry →</button></div>
            <div className="evidence-list">{evidence.map((e)=><div className="evidence-row" key={e.id}><strong>{e.id}</strong><div><strong>{e.event}</strong><small>{e.source}</small></div><span>{e.reviewer}</span><div><strong>{e.control}</strong><small>Retain: {e.retained}</small></div><State>{e.state}</State></div>)}</div>
          </article>
        </section>

        <div className="gov-footer-note"><strong>Phase 2 operating principle:</strong> no AI system receives standing authority by default. Authority is explicit, bounded, human-owned, reviewable, evidence-producing, and time-limited.</div>
        <footer className="app-footer"><span>ASCEND AI NOW, LLC · AI GOVERNANCE OPERATING WORKSPACE</span><span>Human Executive. Governed AI.</span></footer>
      </main>
    </div>
  );
}
