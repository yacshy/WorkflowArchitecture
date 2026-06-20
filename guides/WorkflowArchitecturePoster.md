╔══════════════════════════════════════════════════════╗
║ WORKFLOW ARCHITECTURE MODEL ║
║ A Derivable & Verifiable System Grammar ║
╚══════════════════════════════════════════════════════╝

┌──────────────────────────────────────────────────────┐
│ CORE IDEA │
│ │
│ Business systems are NOT UI-driven or API-driven │
│ but WORKFLOW-driven. │
│ │
│ Every business process is a StateMachine-driven │
│ evolution of State via Events, Rules and Steps. │
└──────────────────────────────────────────────────────┘

┌──────────────────────── FLOW MODEL ─────────────────────────┐

      Event (Intent)
           │
           ▼

StateMachine (Coordinator)
│
┌─────┼─────┐
▼ ▼ ▼
Rule Step (Guard + Execution)
│ │
│ ▼
│ Service (Implementation)
│
▼
State (Business Fact)
│
▼
Store (Data)

└────────────────────────────────────────────────────────────┘

┌──────────────────────── ROLE MAP ─────────────────────────┐

Workflow → Business Boundary
StateMachine → Orchestration
State → Business Fact
Event → Intent
Rule → Decision (Boolean)
Step → Execution
Service → Capability
Store → Data
└────────────────────────────────────────────────────────────┘

┌────────────────────── STRICT SEPARATION ──────────────────────┐

RULES:

- Rules do NOT execute
- Steps do NOT decide
- Services do NOT know workflows
- Store does NOT control logic
- StateMachine does NOT execute business logic
- UI does NOT call StateMachine directly (must use Event)

└──────────────────────────────────────────────────────────────┘

┌──────────────────────── VALIDATION MODEL ───────────────────────┐

✔ Structural Rules (Chapter 21)
✔ Violation Patterns (Chapter 22)
✔ Execution Trace (Chapter 23)

A system is VALID only if:

    ALL constraints pass

AND NO violation patterns exist
AND execution is deterministic

└──────────────────────────────────────────────────────────────┘

┌──────────────────────── DERIVATION STACK ───────────────────────┐

Workflow
↓
State
↓
Event
↓
Rule
↓
Step
↓
Service
↓
Store

(Each layer is derived from the previous one)

└──────────────────────────────────────────────────────────────┘

┌──────────────────────── MENTAL MODEL ─────────────────────────┐

      “Everything starts from an Event”

      Event → Decision → Execution → Persistence

      Coordinated by StateMachine

└──────────────────────────────────────────────────────────────┘
