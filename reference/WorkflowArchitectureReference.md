# Workflow Architecture Reference

A concise reference manual for Workflow Architecture.

This document is NOT a tutorial and NOT a derivation guide.

It is a **lookup specification** for implementation, review, and tooling.

---

# 1. Concepts Index

## 1.1 Core Concepts

| Concept      | Meaning                      | Category       |
| ------------ | ---------------------------- | -------------- |
| Workflow     | Business boundary definition | Structural     |
| StateMachine | Workflow coordinator         | Runtime        |
| State        | Stable business fact         | Data semantics |
| Event        | Intent signal                | Input          |
| Rule         | Boolean decision             | Policy         |
| Step         | Execution unit               | Action         |
| Service      | Reusable capability          | Implementation |
| Store        | Persistent data              | Storage        |

---

## 1.2 Concept Roles (One-line Definitions)

- Workflow → defines business boundary
- StateMachine → coordinates execution
- State → represents business truth
- Event → expresses intent
- Rule → evaluates condition
- Step → performs action
- Service → provides capability
- Store → holds data

---

# 2. Execution Reference

## 2.1 Canonical Flow

```
Event → StateMachine → Rule → Step → Service → Store
```

---

## 2.2 Execution Semantics

| Stage        | Responsibility       |
| ------------ | -------------------- |
| Event        | Entry trigger        |
| StateMachine | orchestration        |
| Rule         | permission check     |
| Step         | business execution   |
| Service      | implementation logic |
| Store        | persistence          |

---

# 3. Dependency Reference

## 3.1 Allowed Dependency Direction

```
Workflow
  ↓
StateMachine
  ↓
Step → Service → Store
  ↑
 Rule (read-only)
```

---

## 3.2 Forbidden Dependencies

- Service → StateMachine ❌
- Rule → Step ❌
- Step → Event ❌
- Store → any logic ❌

---

# 4. Interaction Reference

## 4.1 Allowed Runtime Interaction

| From         | To           | Type       |
| ------------ | ------------ | ---------- |
| UI           | Event        | dispatch   |
| Event        | StateMachine | submit     |
| StateMachine | Rule         | evaluate   |
| StateMachine | Step         | execute    |
| Step         | Service      | invoke     |
| Step         | Store        | read/write |
| Rule         | Store        | read       |

---

## 4.2 Forbidden Interaction

Any shortcut of:

- UI → StateMachine ❌
- Service → Store ❌
- Rule → mutation ❌
- Step → StateMachine ❌

---

# 5. Derivation Reference

## 5.1 Derivation Order

```
Workflow
→ State
→ Event
→ Rule
→ Step
→ Service
→ Store
```

---

## 5.2 Interpretation Rule

Each layer is derived ONLY from its parent layer.

No cross-layer derivation is allowed.

---

# 6. Validation Reference

## 6.1 Positive Constraints (must pass)

- Single Workflow boundary
- Single StateMachine per Workflow
- Deterministic execution
- Rule purity
- Step exclusivity

---

## 6.2 Violation Patterns (must not exist)

- UI-driven execution
- Rule side effects
- Step coordination logic
- Service store coupling
- multiple StateMachines per Workflow

---

## 6.3 Validity Condition

A system is valid iff:

```
Pass(All Constraints)
AND
No Violations Exist
AND
Execution is Deterministic
```

---

# 7. File Organization Reference

## 7.1 Standard Structure

```
workflows/
  WorkflowName/
    stateMachine.ts
    index.ts
    events/
    rules/
    steps/
    services/
```

---

## 7.2 Naming Rules

| Type     | Naming     |
| -------- | ---------- |
| Workflow | PascalCase |
| Event    | camelCase  |
| Rule     | camelCase  |
| Step     | camelCase  |
| Service  | camelCase  |
| Store    | camelCase  |

---

# 8. Mental Model Reference

## 8.1 One Sentence Model

> Everything begins with an Event and ends in Store mutation, coordinated by a StateMachine.

---

## 8.2 Minimal Cognitive Model

```
Intent → Decision → Execution → Persistence
```

---

# 9. Anti-pattern Quick Lookup

| Pattern                 | Problem                       |
| ----------------------- | ----------------------------- |
| UI calls StateMachine   | breaks Event boundary         |
| Rule has side effects   | breaks determinism            |
| Step calls StateMachine | breaks coordination ownership |
| Service touches Store   | breaks separation             |
| Store contains logic    | breaks purity                 |

---

# 10. Reference Status

This document is:

- deterministic
- non-derivative
- non-explanatory
- implementation-oriented

It is intended for:

- engineers
- reviewers
- agents
- architecture validators
