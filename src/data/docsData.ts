export interface DocItem {
  id: string;
  title: string;
  parent?: string;
  method?: 'GET' | 'POST' | 'PUT';
  endpoint?: string;
  description: string;
  requestHeaders?: string;
  requestBody?: string;
  responseBody?: string;
  table?: {
    headers: string[];
    rows: string[][];
  };
  extraHtml?: string;
}

export const docsSections: DocItem[] = [
  {
    id: "introduction",
    title: "Introduction",
    description: `Rota gives your team a single API to provision and manage group-based rotational savings cycles — handling virtual account creation, contribution tracking, reconciliation, and automated settlement, so you don't have to build any of that yourself.

Each member of a savings group gets their own dedicated NUBAN (virtual account number) tied to their identity. Contributions flow in via standard bank transfer. Rota reconciles every kobo, manages the cycle state machine, and disburses to the right beneficiary on schedule.`,
    extraHtml: `
      <div class="mt-6 p-4 rounded-lg bg-orange-50 border border-[#FF6B00]/20">
        <p class="text-xs font-mono uppercase tracking-wider text-[#FF6B00] mb-1 font-bold">Base URL</p>
        <code class="text-sm font-mono text-[#1A1A1A]">https://api.rota.dev/v1</code>
      </div>
    `
  },
  {
    id: "authentication",
    title: "Authentication",
    description: `Rota uses API key authentication. You get two key types from your dashboard:

* \`sk_live_...\` — secret key, server-side only, never expose in client code
* \`pk_live_...\` — publishable key, safe for client-side use

Every write request (\`POST\`, \`PUT\`) requires an \`X-Idempotency-Key\` header — a unique UUID you generate per request. Duplicate keys within 24 hours return the original response instead of re-executing, protecting against double provisioning or duplicate payouts on network retries.

Keys are scoped per account. You cannot read or act on another account's cycles, participants, or ledger data.`,
    requestHeaders: `Authorization: Bearer sk_live_xxxxxxxxxxxxxxxx
X-Idempotency-Key: 550e8400-e29b-41d4-a716-446655440000
Content-Type: application/json`
  },
  {
    id: "create-a-cycle",
    title: "Create a Cycle",
    parent: "Cycles",
    method: "POST",
    endpoint: "/v1/ajo-cycles",
    description: `Provisions a new savings cycle and automatically creates a dedicated NUBAN for each participant in a single call. The cycle starts in \`DRAFT\` state while accounts are being provisioned, then moves to \`ACTIVE\` once all NUBANs are ready.

If a single participant fails provisioning (e.g. invalid BVN), Rota does not fail the entire cycle. That participant is marked \`PENDING_PROVISION\` and an \`account.provision_failed\` webhook is fired — the rest of the cycle continues.`,
    requestBody: `{
  "cycle_name": "Tech Bros Weekly Contribution",
  "contribution_amount": 50000.00,
  "currency": "NGN",
  "frequency": "WEEKLY",
  "start_date": "2026-07-01T00:00:00Z",
  "participants": [
    {
      "external_user_id": "usr_9981a",
      "legal_name": "Tunde Alao",
      "bvn": "22233344455",
      "kyc_tier": "TIER_2"
    },
    {
      "external_user_id": "usr_9981b",
      "legal_name": "Chinedu Okafor",
      "bvn": "22233344466",
      "kyc_tier": "TIER_2"
    }
  ]
}`,
    responseBody: `{
  "cycle_id": "ajo_cyc_01H7X...",
  "status": "ACTIVE",
  "total_pool_value": 0.00,
  "accounts": [
    {
      "external_user_id": "usr_9981a",
      "allocated_nuban": "9920112233",
      "bank_name": "Nomba Partner Bank",
      "account_name": "PIGGY TUNDE AJO-01"
    },
    {
      "external_user_id": "usr_9981b",
      "allocated_nuban": "9920112244",
      "bank_name": "Nomba Partner Bank",
      "account_name": "PIGGY CHINEDU AJO-01"
    }
  ]
}`
  },
  {
    id: "get-a-cycle",
    title: "Get a Cycle",
    parent: "Cycles",
    method: "GET",
    endpoint: "/v1/ajo-cycles/{id}",
    description: `Returns the current state and metadata of a cycle, including its status, pool value, frequency, and next settlement date.

**Possible status values:** \`DRAFT\`, \`ACTIVE\`, \`CONTRIBUTING\`, \`OVERDUE\`, \`SETTLING\`, \`COMPLETED\``,
    responseBody: `{
  "cycle_id": "ajo_cyc_01H7X...",
  "cycle_name": "Tech Bros Weekly Contribution",
  "status": "CONTRIBUTING",
  "frequency": "WEEKLY",
  "contribution_amount": 50000.00,
  "total_pool_value": 50000.00,
  "next_settlement_date": "2026-07-08T00:00:00Z",
  "current_beneficiary": "usr_9981a"
}`
  },
  {
    id: "update-participant",
    title: "Update Participant",
    parent: "Cycles",
    method: "PUT",
    endpoint: "/v1/ajo-cycles/{id}/participants/{uid}",
    description: `Updates a participant's legal name or KYC tier mid-cycle. The existing NUBAN is preserved — it is never reissued — so contribution history and the identity chain stay intact. The account name on the physical bank record is updated automatically to stay in sync.`,
    requestBody: `{
  "legal_name": "Tunde Alao-Bello",
  "kyc_tier": "TIER_3"
}`
  },
  {
    id: "participant-statement",
    title: "Participant Statement",
    parent: "Statements & Reports",
    method: "GET",
    endpoint: "/v1/ajo-cycles/{cycle_id}/participants/{external_user_id}/statement",
    description: `Returns a participant's full contribution history within the cycle: each posted contribution with date, amount, and ledger reference; their current standing (paid-to-date vs. expected-to-date); and their position in the rotation order.`,
    responseBody: `{
  "external_user_id": "usr_9981a",
  "cycle_id": "ajo_cyc_01H7X...",
  "rotation_position": 1,
  "paid_to_date": 50000.00,
  "expected_to_date": 50000.00,
  "status": "CURRENT",
  "contributions": [
    {
      "date": "2026-07-01T10:22:00Z",
      "amount": 50000.00,
      "ledger_ref": "LDG_001aX..."
    }
  ]
}`
  },
  {
    id: "cycle-report",
    title: "Cycle Report",
    parent: "Statements & Reports",
    method: "GET",
    endpoint: "/v1/ajo-cycles/{cycle_id}/report",
    description: `Returns pool-level transparency for the cycle: total contributed this period, per-member funding status, settlement history for completed rotations, and any quarantined funds linked to this cycle.`,
    responseBody: `{
  "cycle_id": "ajo_cyc_01H7X...",
  "total_contributed_this_period": 50000.00,
  "members": [
    {
      "external_user_id": "usr_9981a",
      "status": "PAID"
    },
    {
      "external_user_id": "usr_9981b",
      "status": "PENDING"
    }
  ],
  "settlement_history": [],
  "quarantined_funds": 0.00
}`
  },
  {
    id: "dashboard-summary",
    title: "Dashboard Summary",
    parent: "Statements & Reports",
    method: "GET",
    endpoint: "/v1/reports/summary?from=&to=",
    description: `Aggregates across all your cycles for the given date range. Returns total value in flight, cycle count by state, and upcoming settlement dates — designed to power your internal dashboard in a single call.`,
    responseBody: `{
  "total_value_in_flight": 250000.00,
  "cycles_by_status": {
    "ACTIVE": 2,
    "CONTRIBUTING": 3,
    "SETTLING": 1,
    "COMPLETED": 5
  },
  "upcoming_settlements": [
    {
      "cycle_id": "ajo_cyc_01H7X...",
      "settlement_date": "2026-07-08T00:00:00Z",
      "estimated_pool": 100000.00
    }
  ]
}`
  },
  {
    id: "webhooks",
    title: "Webhooks",
    description: `Rota sends signed webhook events to your configured endpoint. Validate every inbound payload against the \`X-Rota-Signature\` header using your HMAC secret before processing. Rota retries delivery on failure — use the \`event_id\` field to deduplicate.

### Manual trigger
To manually trigger a reconciliation sweep:
\`\`\`
POST /v1/webhooks/event-logs/sync
\`\`\`
`,
    table: {
      headers: ["Event", "Description"],
      rows: [
        ["payment.received", "Inbound transfer posted to a member NUBAN"],
        ["settlement.completed", "Pool disbursed to the rotation beneficiary"],
        ["settlement.verification_failed", "Balance mismatch detected before disbursement — cycle held for review"],
        ["payment.quarantined", "Funds landed on an inactive or closed cycle"],
        ["account.provision_failed", "BVN or KYC issue prevented NUBAN creation for a participant"],
        ["cycle.overdue", "Contribution deadline passed without full pool funding"]
      ]
    }
  },
  {
    id: "quarantine-misdirected-funds",
    title: "Quarantine & Misdirected Funds",
    description: `If an inbound payment lands on a NUBAN belonging to a closed, completed, or suspended cycle, Rota does not bounce or silently absorb it. The funds are captured in a segregated quarantine ledger, completely separate from any active cycle pool.

You are alerted immediately via a \`payment.quarantined\` webhook containing the amount, the NUBAN it hit, and the reason it was quarantined. From there you choose how to resolve it:

### Resolve a quarantined payment
\`\`\`
POST /v1/quarantine/{id}/resolve
\`\`\`

Quarantined funds unresolved after 14 days trigger an escalation webhook automatically.`,
    requestBody: `{
  "action": "REFUND",
  "reason": "Cycle already completed"
}`,
    extraHtml: `
      <div class="mt-4 text-sm text-[#8A8070] italic">
        * Note: <code class="bg-[#e4dec9]/40 px-1 rounded text-[#1a1a1a]">action</code> can be <code class="text-[#FF6B00]">REFUND</code> (returns funds to the sender's originating account) or <code class="text-[#FF6B00]">REASSIGN</code> (moves funds to an active cycle participant — requires <code class="text-[#FF6B00]">target_cycle_id</code> and <code class="text-[#FF6B00]">target_user_id</code>).
      </div>
    `
  },
  {
    id: "errors",
    title: "Errors",
    description: `All errors return a consistent JSON shape:`,
    responseBody: `{
  "error": {
    "code": "validation_error",
    "message": "bvn must be exactly 11 digits",
    "field": "participants[0].bvn"
  }
}`,
    table: {
      headers: ["Status", "Code", "Meaning"],
      rows: [
        ["400", "bad_request", "Malformed request body"],
        ["401", "unauthorized", "Missing or invalid API key"],
        ["409", "idempotency_conflict", "Idempotency key reused with a different request body"],
        ["422", "validation_error", "Request is well-formed but fails validation"],
        ["500", "server_error", "Something went wrong on Rota's end"]
      ]
    }
  }
];

export interface NavigationGroup {
  title: string;
  items: {
    id: string;
    title: string;
  }[];
}

export const navigationStructure: NavigationGroup[] = [
  {
    title: "Getting Started",
    items: [
      { id: "introduction", title: "Introduction" },
      { id: "authentication", title: "Authentication" }
    ]
  },
  {
    title: "Cycles",
    items: [
      { id: "create-a-cycle", title: "Create a Cycle" },
      { id: "get-a-cycle", title: "Get a Cycle" },
      { id: "update-participant", title: "Update Participant" }
    ]
  },
  {
    title: "Statements & Reports",
    items: [
      { id: "participant-statement", title: "Participant Statement" },
      { id: "cycle-report", title: "Cycle Report" },
      { id: "dashboard-summary", title: "Dashboard Summary" }
    ]
  },
  {
    title: "Webhooks & Management",
    items: [
      { id: "webhooks", title: "Webhooks" },
      { id: "quarantine-misdirected-funds", title: "Quarantine & Misdirected Funds" },
      { id: "errors", title: "Errors" }
    ]
  }
];
