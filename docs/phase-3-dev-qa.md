# Phase 3 End-to-End Dev QA

## Purpose
Validate that one governance transaction persists and propagates across the Ascend AI NOW Digital Headquarters after Phase 3 merge.

## Test environment
- Production branch: `main`
- Workflow: `/governance/new`
- Governance workspace: `/governance`
- Command Center: `/`

## Primary international test scenario
Use this first because it exercises the global applicability layer.

| Field | Test value |
| --- | --- |
| AI System / Use Case | Decision Support System |
| Business Owner | Academic / Instructional Leadership |
| Ascend Framework Phase | Govern |
| Risk Tier | High |
| AI Authority | RECOMMEND |
| Decision Right | Recommend a decision |
| Human Reviewer Role | Human Executive |
| Primary Jurisdiction | United Arab Emirates |
| Sector | Higher Education |
| Deployment Scope | Global / cross-border |
| Regulatory Applicability | Potentially applicable — review required |
| AI MAY | Recommend and prepare options |
| AI MAY NOT | Approve or make the accountable decision |
| Boundary Expires | 2026-12-31 |
| Human Approver | Dr. Alexis S. Smith |

## Acceptance sequence

### 1. Create governance record
Expected:
- all required controlled fields accept values
- record persists
- user is routed to `#human-approval`
- page refresh does not remove the record
- no Evidence Chain™ exists yet

### 2. AI Governance Workspace propagation
Open `/governance` before approval.
Expected:
- new AI system appears in the AI System Registry
- owner, risk, authority, boundary and human reviewer match the submitted record
- Delegation Boundary™ appears with AI MAY / AI MAY NOT / expiration
- summary metrics increase from persisted data rather than static samples
- pending record is distinguishable from approved evidence

### 3. Human approval
Enter the named human approver and select `Approve + generate evidence`.
Expected:
- approval status becomes `Approved`
- approved timestamp is stored
- duplicate approval is prevented
- user is routed to `#evidence-chain`

### 4. Evidence Chain™ generation
Expected:
- unique Evidence Chain™ ID exists
- source = governed AI system
- decision = governed decision right
- reviewer = named human approver
- artifact references both governance record and Delegation Boundary™
- retention is present
- state = Complete

### 5. Global Assurance Mapping
Expected:
- Ascend Control displays Meaningful Human Oversight
- Internal Requirement includes named reviewer, intervention authority, retained approval and Delegation Boundary™
- NIST AI RMF mapping is present
- ISO/IEC 42001 mapping is present
- EU AI Act field does not falsely declare applicability for a UAE record
- Jurisdiction shows United Arab Emirates and candidate UAE applicability language
- Sector shows Higher Education and candidate sector obligations
- Deployment Scope shows Global / cross-border
- Regulatory Applicability shows Potentially applicable — review required
- Status is Partial until applicability is confirmed
- legal/compliance review warning remains visible

### 6. AI Governance Workspace after approval
Expected:
- registry record now shows Approved / Active posture
- evidence indicator reflects the generated Evidence Chain™
- Evidence Chain™ appears in the workspace evidence registry
- boundary remains linked to the system
- evidence completeness metrics recalculate

### 7. Command Center propagation
Open `/`.
Expected:
- governed-system / workstream count reflects persisted record population
- Evidence Chain™ count reflects approved evidence
- Decision Boundary count reflects stored boundaries
- high-impact / high-risk metrics reflect the test record
- Executive Decision Queue no longer treats the approved record as pending
- Governance Pulse metrics are calculated from current stored records
- no hard-coded sample-only metric contradicts the persisted dataset

## Negative tests
- missing AI MAY should block record creation
- missing AI MAY NOT should block record creation
- missing boundary expiration should block record creation
- missing jurisdiction, sector, deployment scope or applicability should block record creation
- missing human approver should block approval
- re-submitting approval for an already approved record should not create a second Evidence Chain™

## Responsive checks
Review Command Center, Governance Workspace and Governance Workflow at desktop and narrow/mobile widths.
Expected:
- no clipped navigation
- tables can scroll where necessary
- five governance gates remain readable and usable
- Evidence Chain™ crosswalk collapses cleanly to one column
- action buttons remain visible

## Phase 3 acceptance condition
Phase 3 is considered operationally validated only when all seven acceptance stages pass, negative tests pass, and responsive review is acceptable.

Do not treat visual approval alone as completion. The acceptance condition is an end-to-end persisted governance transaction.