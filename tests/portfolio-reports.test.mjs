import test from 'node:test';
import assert from 'node:assert/strict';
import { getDemoPortfolio } from '../Backend/src/services/demoInvestment.service.js';
import { filterTransactions, csvText } from '../frontend/src/ClientDashboard/reportUtils.js';

test('dashboard totals and allocation reconcile to report holdings', () => {
  const p = getDemoPortfolio({ id: 'test', fullName: 'Demo Investor' });
  assert.equal(p.summary.currentValue, p.holdings.reduce((s, h) => s + h.current, 0));
  assert.equal(p.summary.totalGain, p.holdings.reduce((s, h) => s + h.gain, 0));
  assert.equal(p.allocation.reduce((s, a) => s + a.amount, 0), p.summary.currentValue);
  assert.equal(p.summary.activeSips, p.plans.filter((p) => p.type === 'SIP' && p.status === 'Active').length);
});

test('transaction filters combine text, type and inclusive date boundaries', () => {
  const { transactions } = getDemoPortfolio({ id: 'test' });
  assert.equal(filterTransactions(transactions, { from: '2026-10-12', to: '2026-10-18' }).length, 2);
  assert.equal(filterTransactions(transactions, { query: 'large cap', type: 'Purchase' }).length, 0);
  assert.equal(filterTransactions(transactions, { query: ' txn-24018 ' }).length, 1);
  assert.equal(filterTransactions(transactions, { from: '2027-01-01' }).length, 0);
  assert.equal(filterTransactions(transactions)[0].id, 'TXN-24018');
});

test('CSV quotes delimiters and prevents formula execution without altering numeric losses', () => {
  assert.equal(csvText([['=1+2', 'a,"b', -12]]), '\uFEFF"\'=1+2","a,""b","-12"');
  assert.ok(csvText([['  @SUM(A1)', '+cmd', '-text']]).includes("'  @SUM(A1)"));
});
