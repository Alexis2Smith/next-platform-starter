'use server';

import { getStore } from '@netlify/blobs';
import { revalidatePath } from 'next/cache';

const store = () => getStore({ name: 'governance-records', consistency: 'strong' });

function id(prefix) {
  return `${prefix}-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
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
    system: String(formData.get('system') || '').trim(),
    owner: String(formData.get('owner') || '').trim(),
    frameworkPhase: String(formData.get('frameworkPhase') || 'Govern'),
    riskTier: String(formData.get('riskTier') || 'Moderate'),
    decisionRight: String(formData.get('decisionRight') || '').trim(),
    aiAuthority: String(formData.get('aiAuthority') || 'RECOMMEND'),
    reviewer: String(formData.get('reviewer') || '').trim(),
    boundary: {
      id: boundaryId,
      may: String(formData.get('may') || '').trim(),
      mayNot: String(formData.get('mayNot') || '').trim(),
      expiresAt: String(formData.get('expiresAt') || '').trim(),
    },
    approval: {
      status: 'Pending human approval',
      approver: null,
      approvedAt: null,
    },
    evidence: null,
    createdAt: now,
    updatedAt: now,
  };

  if (!record.system || !record.owner || !record.frameworkPhase || !record.decisionRight || !record.reviewer) {
    throw new Error('System, owner, framework phase, decision right, and human reviewer are required.');
  }

  await store().setJSON(`record:${recordId}`, record);
  revalidatePath('/governance/new');
  revalidatePath('/governance');
}

export async function approveGovernanceRecord(formData) {
  const recordId = String(formData.get('recordId') || '');
  const approver = String(formData.get('approver') || '').trim();
  if (!recordId || !approver) throw new Error('Record and approver are required.');

  const key = `record:${recordId}`;
  const record = await store().get(key, { type: 'json' });
  if (!record) throw new Error('Governance record not found.');

  const approvedAt = new Date().toISOString();
  const evidenceId = id('EC');
  const updated = {
    ...record,
    approval: { status: 'Approved', approver, approvedAt },
    evidence: {
      id: evidenceId,
      source: record.system,
      decision: record.decisionRight,
      reviewer: approver,
      timestamp: approvedAt,
      artifact: `${record.id} / ${record.boundary.id}`,
      retention: '7 years',
      control: `${record.frameworkPhase || 'Govern'} · Decision rights + human oversight`,
      frameworkPhase: record.frameworkPhase || 'Govern',
      state: 'Complete',
      assurance: {
        ascendControl: 'Meaningful Human Oversight',
        internalRequirement: 'Named reviewer + intervention authority + retained approval',
        nistAiRmf: 'NIST AI RMF · GOVERN / MAP · accountability and human oversight',
        iso42001: 'ISO/IEC 42001 · AI management system · roles, responsibilities and oversight',
        euAiAct: 'EU AI Act · Article 14 human oversight (where applicable)',
        localJurisdiction: 'Applicability review required · jurisdiction-specific requirement',
        sectorRequirement: 'Applicability review required · sector-specific requirement',
        evidenceId,
        status: 'Satisfied',
        mappingBasis: 'Universal control first; jurisdiction, regulation and sector obligations are applicability layers.',
      },
    },
    updatedAt: approvedAt,
  };

  await store().setJSON(key, updated);
  revalidatePath('/governance/new');
  revalidatePath('/governance');
}
