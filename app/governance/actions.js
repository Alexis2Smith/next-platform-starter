'use server';

import { getStore } from '@netlify/blobs';
import { revalidatePath } from 'next/cache';

const store = () => getStore({ name: 'governance-records', consistency: 'strong' });

function id(prefix) { return `${prefix}-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`; }

const jurisdictionMap = {
  'European Union / EEA': 'EU AI Act applicability and risk-classification review; human-oversight obligations when applicable',
  'United Kingdom': 'UK AI regulatory principles and applicable sector-regulator requirements',
  'United States — Federal': 'Applicable federal AI, civil-rights, privacy, procurement and sector requirements',
  'United States — State / Local': 'Applicable state/local AI, privacy, employment, consumer-protection and sector requirements',
  'United Arab Emirates': 'Applicable UAE AI, data-protection and emirate/sector requirements',
  'Saudi Arabia': 'Applicable Saudi data, AI and sector requirements',
  'Canada': 'Applicable Canadian federal/provincial AI, privacy and sector requirements',
  'Australia': 'Applicable Australian AI, privacy, safety and sector requirements',
  'Singapore': 'Applicable Singapore AI governance, data-protection and sector requirements',
  'India': 'Applicable India digital, data-protection and sector requirements',
  'Japan': 'Applicable Japan AI governance, privacy and sector requirements',
  'Africa — Multi-jurisdiction': 'Applicable national/regional AI, data-protection and sector requirements; country-level review required',
  'Latin America — Multi-jurisdiction': 'Applicable national AI, data-protection and sector requirements; country-level review required',
  'Global / Multi-jurisdiction': 'Multi-jurisdiction legal and regulatory applicability assessment required',
};

const sectorMap = {
  'Education — K-12': 'Student safety, privacy, accessibility, instructional integrity, human educational judgment and education-record requirements',
  'Higher Education': 'Student privacy, accessibility, academic integrity, admissions/employment fairness and institutional governance',
  'Healthcare': 'Patient safety, privacy, clinical oversight, data governance and applicable health-sector requirements',
  'Public Sector / Government': 'Public accountability, procurement, due process, records, transparency and accessibility',
  'Financial Services': 'Consumer protection, model risk, fair lending/decisioning, privacy and security',
  'Nonprofit / Ministry': 'Mission stewardship, beneficiary protection, privacy, safeguarding and accountability',
  'Small Business': 'Consumer protection, privacy, employment, security and commercial requirements',
  'Enterprise / Corporate': 'Enterprise risk, privacy, security, employment and consumer protection',
  'Human Resources / Employment': 'Employment fairness, discrimination risk, privacy, transparency and human review of consequential decisions',
  'Media / Communications': 'Content integrity, provenance, intellectual property, disclosure, privacy and accountable publication review',
  'Cross-sector / Other': 'Sector-specific applicability assessment required',
};

function assuranceFor(record, evidenceId) {
  const isEU = record.jurisdiction === 'European Union / EEA';
  const status = record.regulatoryApplicability === 'Not applicable' ? 'Not Applicable' : record.regulatoryApplicability === 'Confirmed applicable' ? 'Satisfied' : 'Partial';
  return {
    ascendControl: 'Meaningful Human Oversight',
    internalRequirement: `Named reviewer + intervention authority + retained approval + Delegation Boundary™ (${record.boundary.id})`,
    nistAiRmf: 'NIST AI RMF · GOVERN / MAP / MEASURE / MANAGE crosswalk candidate',
    iso42001: 'ISO/IEC 42001 · AI management system, roles, controls, monitoring and documented evidence crosswalk candidate',
    euAiAct: isEU ? 'EU AI Act · Article 14 human oversight candidate mapping; final applicability depends on system role and classification' : 'Not automatically applicable · evaluate territorial scope and system role',
    localJurisdiction: `${record.jurisdiction} · ${jurisdictionMap[record.jurisdiction] || 'Jurisdiction-specific applicability review required'}`,
    sectorRequirement: `${record.sector} · ${sectorMap[record.sector] || 'Sector-specific applicability review required'}`,
    deploymentScope: record.deploymentScope,
    regulatoryApplicability: record.regulatoryApplicability,
    evidenceId,
    status,
    mappingBasis: 'Universal control first; jurisdiction, regulation and sector obligations are applicability layers.',
    legalReview: record.regulatoryApplicability === 'Confirmed applicable' ? 'Applicability declared; legal/compliance validation remains required for clause-level claims.' : 'Applicability review required before treating candidate mappings as legal conclusions.',
  };
}

export async function listGovernanceRecords() {
  const result = await store().list({ prefix: 'record:' });
  const records = await Promise.all(result.blobs.map(({ key }) => store().get(key, { type: 'json' })));
  return records.filter(Boolean).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export async function createGovernanceRecord(formData) {
  const now = new Date().toISOString();
  const recordId = id('GVR');
  const boundaryId = id('DB');
  const record = {
    id: recordId,
    system: String(formData.get('system') || '').trim(), owner: String(formData.get('owner') || '').trim(),
    frameworkPhase: String(formData.get('frameworkPhase') || 'Govern'), riskTier: String(formData.get('riskTier') || 'Moderate'),
    decisionRight: String(formData.get('decisionRight') || '').trim(), aiAuthority: String(formData.get('aiAuthority') || 'RECOMMEND'),
    reviewer: String(formData.get('reviewer') || '').trim(), jurisdiction: String(formData.get('jurisdiction') || '').trim(),
    sector: String(formData.get('sector') || '').trim(), deploymentScope: String(formData.get('deploymentScope') || '').trim(),
    regulatoryApplicability: String(formData.get('regulatoryApplicability') || '').trim(),
    boundary: { id: boundaryId, may: String(formData.get('may') || '').trim(), mayNot: String(formData.get('mayNot') || '').trim(), expiresAt: String(formData.get('expiresAt') || '').trim() },
    approval: { status: 'Pending human approval', approver: null, approvedAt: null }, evidence: null, createdAt: now, updatedAt: now,
  };
  if (!record.system || !record.owner || !record.frameworkPhase || !record.decisionRight || !record.reviewer || !record.jurisdiction || !record.sector || !record.deploymentScope || !record.regulatoryApplicability) throw new Error('All governance, jurisdiction, sector, deployment and applicability fields are required.');
  await store().setJSON(`record:${recordId}`, record);
  revalidatePath('/governance/new'); revalidatePath('/governance');
}

export async function approveGovernanceRecord(formData) {
  const recordId = String(formData.get('recordId') || ''); const approver = String(formData.get('approver') || '').trim();
  if (!recordId || !approver) throw new Error('Record and approver are required.');
  const key = `record:${recordId}`; const record = await store().get(key, { type: 'json' });
  if (!record) throw new Error('Governance record not found.');
  const approvedAt = new Date().toISOString(); const evidenceId = id('EC');
  const evidence = { id: evidenceId, source: record.system, decision: record.decisionRight, reviewer: approver, timestamp: approvedAt, artifact: `${record.id} / ${record.boundary.id}`, retention: '7 years', control: `${record.frameworkPhase || 'Govern'} · Decision rights + meaningful human oversight`, frameworkPhase: record.frameworkPhase || 'Govern', state: 'Complete' };
  evidence.assurance = assuranceFor(record, evidenceId);
  await store().setJSON(key, { ...record, approval: { status: 'Approved', approver, approvedAt }, evidence, updatedAt: approvedAt });
  revalidatePath('/governance/new'); revalidatePath('/governance');
}
