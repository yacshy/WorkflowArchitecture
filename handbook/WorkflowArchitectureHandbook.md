# Workflow Architecture Handbook

## Table of Contents

- **Part I. Foundations**
  - Chapter 1. Why Workflow Architecture Exists
  - Chapter 2. Architecture Axioms
- **Part II. Core Concepts**
  - Chapter 3. Workflow
  - Chapter 4. StateMachine
  - Chapter 5. State
  - Chapter 6. Event
  - Chapter 7. Rule
  - Chapter 8. Step
  - Chapter 9. Service
  - Chapter 10. Store
- **Part III. Derivation Rules**
  - Chapter 11. Workflow Derivation
  - Chapter 12. State Derivation
  - Chapter 13. Event Derivation
  - Chapter 14. Rule Derivation
  - Chapter 15. Step Derivation
  - Chapter 16. Service Derivation
- **Part IV. Architecture Grammar**
  - Chapter 17. Responsibility Matrix
  - Chapter 18. Dependency Rules
  - Chapter 19. Interaction Rules
  - Chapter 20. Project Organization
- **Part V. Validation**
  - Chapter 21. Architecture Verification Checklist
  - Chapter 22. Common Anti-patterns (Violation Patterns)
  - Chapter 23. Complete Example
  - Chapter 24. Summary

---

## Part I. Foundations

---

### Chapter 1. Why Workflow Architecture Exists

#### 1.1 Introduction

Software architecture has evolved significantly over the past decades. Numerous architectural styles and design methodologies have been proposed to improve maintainability, scalability and software quality.

Examples include:

- MVC
- MVVM
- Domain-Driven Design (DDD)
- Clean Architecture
- Hexagonal Architecture
- State Machine

These methodologies successfully address many important concerns, including:

- Module organization
- Dependency management
- Domain modeling
- Layer isolation
- State transition

Workflow Architecture does **not** attempt to replace any of these existing methodologies.

Instead, it focuses on a different problem:

> **How should business workflows be modeled, decomposed and evolved in a stable and derivable manner?**

---

#### 1.2 The Problem

As software evolves, business workflows continuously change.

New features are introduced.

Existing workflows are extended.

Different developers participate in the same project.

Over time, business logic gradually becomes scattered across multiple layers.

Typical symptoms include:

- Business flow tightly coupled with UI.
- One StateMachine gradually becomes responsible for unrelated workflows.
- Business rules duplicated across UI, Store and Services.
- Different developers decomposing workflows using different standards.
- Similar business requirements producing entirely different implementations.
- New team members unable to determine where new business logic should belong.

These problems are independent of programming languages, frameworks or implementation technologies.

They originate from inconsistent business workflow decomposition.

---

#### 1.3 Root Cause Analysis

The root cause of the above problems is the absence of a stable decomposition unit for business workflows.

Without a universally accepted decomposition unit, developers naturally organize business logic according to implementation details such as:

- UI pages
- Components
- API boundaries
- Modules
- Personal experience

These decomposition strategies may appear reasonable during early development.

However, as business requirements evolve, implementation boundaries continue changing while business semantics remain relatively stable.

Consequently, workflow boundaries become inconsistent across the system, making business logic increasingly difficult to understand, extend and maintain.

Therefore, Workflow Architecture first attempts to establish a stable workflow decomposition unit before defining any implementation details.

---

#### 1.4 Existing Solutions

Modern software engineering already provides mature solutions for many architectural concerns.

For example:

- MVC separates presentation from business logic.
- DDD models business domains.
- Clean Architecture controls dependency directions.
- State Machines manage state transitions.

These solutions remain fully applicable within Workflow Architecture.

However, they intentionally avoid defining how business workflows themselves should be decomposed.

Workflow decomposition therefore remains largely dependent on individual experience rather than explicit architectural principles.

---

#### 1.5 Design Goals

Workflow Architecture establishes a unified language for modeling business workflows.

Its objectives are:

1. Every architectural concept MUST have a single responsibility.

2. Every architectural concept MUST be derivable.

3. Business workflows MUST be independent from UI implementation.

4. Workflow boundaries SHOULD remain stable as business requirements evolve.

5. Architectural decisions SHOULD be explainable through derivation rather than personal experience.

6. The architecture SHOULD be understandable by both humans and AI agents.

Workflow Architecture values derivation over convention.

Its purpose is not to prescribe implementation details, but to establish architectural principles from which implementation decisions can be derived.

---

#### 1.6 Scope

Workflow Architecture defines principles for:

- Business workflow decomposition
- Workflow boundary identification
- Business state modeling
- Business event modeling
- Business rule modeling
- Workflow collaboration
- Business action organization

Workflow Architecture focuses exclusively on the structure and evolution of business workflows.

---

#### 1.7 Applicability

Workflow Architecture is suitable when:

- Business workflows evolve continuously.
- Multiple developers collaborate on the same business domain.
- Workflow consistency is more important than implementation convenience.
- Long-term maintainability is a primary concern.
- AI-assisted architecture or development is expected.

Workflow Architecture may be unnecessary when:

- The application contains almost no business workflows.
- The project is a short-lived prototype.
- Business requirements are unlikely to evolve.
- Workflow decomposition is not a significant architectural concern.

Applicability is intentionally defined to make Workflow Architecture falsifiable.

A theory that cannot define where it should not be applied cannot be objectively evaluated.

---

#### 1.8 Non-goals

Workflow Architecture does **not** attempt to:

- replace Domain-Driven Design.
- replace MVC or MVVM.
- replace Clean Architecture.
- replace State Machine frameworks.
- define UI architecture.
- define component architecture.
- define network communication.
- define database design.
- define programming language features.
- introduce a new frontend framework.
- introduce a new state management library.

These concerns belong to other architectural disciplines.

Workflow Architecture focuses exclusively on business workflow modeling.

---

#### 1.9 Core Principle

Workflow Architecture follows one supreme principle.

> **Every architectural concept MUST be derivable.**

A concept is considered **derivable** only if all of the following dimensions are satisfied.

##### Necessity

The concept MUST solve a problem that cannot be adequately solved by any existing architectural concept.

Introducing a new concept to merely improve naming, organization or implementation convenience does not satisfy this requirement.

##### Sufficiency

The concept MUST have a single, clearly distinguishable responsibility.

Its responsibility MUST NOT substantially overlap with any existing architectural concept.

##### Stability

The concept SHOULD remain valid as business requirements evolve.

Changes in business requirements SHOULD lead to changes in workflow composition rather than changes to the architectural concept itself.

##### Falsifiability

The concept MUST clearly define the situations in which it is not applicable.

A concept that cannot define its own limits cannot be objectively validated and therefore MUST NOT become part of Workflow Architecture.

Only concepts satisfying all four dimensions may be introduced into Workflow Architecture.

The objective of Workflow Architecture is not to introduce more concepts.

The objective is to explain more business problems using fewer, clearer and more stable concepts.

---

### Chapter 2. Architecture Axioms

---

#### 2.1 Purpose

Workflow Architecture is not defined by implementations.

It is defined by a small set of architectural axioms.

Every concept introduced in subsequent chapters MUST be derivable from these axioms.

Any concept that violates an axiom MUST either be rejected or require the Evolution Process to modify the axioms themselves.

The axioms therefore form the immutable foundation of Workflow Architecture.

---

#### 2.2 Axiom 1 — Single Responsibility

Every architectural concept MUST have exactly one responsibility.

A responsibility MUST belong to one and only one architectural concept.

If two concepts can completely replace each other, they SHOULD be merged.

If one concept performs multiple independent responsibilities, it SHOULD be decomposed.

---

#### 2.3 Axiom 2 — Derivability

Every architectural concept MUST satisfy the derivability requirements defined in Chapter 1.

No architectural concept may exist solely because it is convenient, familiar or commonly used.

Every concept MUST emerge as the unique solution to a previously unsolved architectural problem.

---

#### 2.4 Axiom 3 — Business First

Architecture MUST be decomposed according to business semantics rather than implementation details.

Implementation details include, but are not limited to:

- UI
- Components
- APIs
- Database schemas
- Network protocols
- Programming language constructs

Business semantics always take precedence.

---

#### 2.5 Axiom 4 — Stability

Architectural concepts SHOULD remain stable while business requirements evolve.

Business evolution SHOULD change workflow composition rather than architectural concepts themselves.

If a concept requires repeated modification in response to business changes, it indicates that the concept has been incorrectly defined.

---

#### 2.6 Axiom 5 — Explicit Responsibility

Every architectural decision MUST have exactly one owner.

Responsibilities MUST NOT be shared implicitly.

If ownership cannot be determined unambiguously, the architecture is considered invalid.

---

#### 2.7 Axiom 6 — Observable Business Facts

Architecture MUST model business facts rather than execution details.

Only observable business facts may participate in workflow evolution.

Temporary execution progress, UI presentation states and implementation details are not business facts.

---

#### 2.8 Axiom 7 — One-way Control Flow

Architectural control MUST flow from higher-level concepts toward lower-level concepts.

Lower-level concepts MUST NOT influence architectural decisions belonging to higher-level concepts.

This guarantees deterministic workflow evolution.

---

#### 2.9 Axiom 8 — Separation of Decision and Execution

Business decision and business execution MUST belong to different architectural concepts.

A concept responsible for deciding whether an action may occur MUST NOT execute that action.

Likewise, a concept responsible for executing an action MUST NOT decide whether it should occur.

---

#### 2.10 Summary

Workflow Architecture is founded upon eight architectural axioms.

All concepts introduced in subsequent chapters MUST be derivable from these axioms.

Any future modification to these axioms MUST follow the Evolution Process defined in Appendix B.

---

## Part II. Core Concepts

> Concepts are ordered from highest-level abstraction to lowest-level abstraction. Dependency direction MUST follow chapter order.

---

### Chapter 3. Workflow

#### 3.1 Purpose

Workflow is the highest-level architectural concept in Workflow Architecture.

It defines the boundary of a business workflow and serves as the organizational unit for a single business state machine.

All lower-level concepts ultimately exist to support the execution of a Workflow.

This chapter establishes what a Workflow is and, equally importantly, what it is not.

---

#### 3.2 Derivation

Modern applications often begin with a single business flow.

As business requirements evolve, new flows are continuously introduced.

Without a stable decomposition principle, business logic is commonly partitioned according to implementation details such as pages, components or APIs.

Eventually, a single StateMachine becomes responsible for unrelated business processes, causing state explosion, unclear ownership and increasing maintenance cost.

A stable architectural unit is therefore required to determine where one business process ends and another begins.

Workflow is introduced to solve this architectural problem.

Its purpose is not to execute business logic, but to provide a stable semantic boundary within which exactly one business process is managed.

---

#### 3.3 Definition

A Workflow is the architectural boundary of one complete business evolution.

A business evolution begins with one stable business State and terminates at another stable business State.

A Workflow owns exactly one StateMachine.

A Workflow is identified by its business semantics rather than its implementation.

A Workflow is an organizational concept rather than an execution mechanism.

---

#### 3.3.1 Workflow Naming

A Workflow name SHALL describe one complete business evolution.

The canonical naming form is:

`<InitialBusinessState>To<TerminalBusinessState>`

where:

- InitialBusinessState represents the stable business fact at which the Workflow begins.
- TerminalBusinessState represents the stable business fact produced when the Workflow completes.

The name SHALL describe business evolution rather than business domain, software module or UI structure.

Examples:

TaskDraftToTaskReady
LayerSelectedToVisibilityCalculated
GoalSelectedToGoalDeleted
GoalSelectedToGoalUpdated
AttachmentReadyToAttachmentUploaded

Counter Examples:

GoalManagement
TaskModule
LayerPanel
GoalFeature

These names describe software organization, modules or UI structures rather than business evolution.

GoalManagementWorkflow
TaskManagementWorkflow
LayerManagementWorkflow

These names describe business domains or software modules rather than complete business evolution.

---

#### 3.4 Responsibilities

A Workflow MUST:

- define the semantic boundary of a business process;
- own exactly one StateMachine;
- provide a stable organizational unit for business logic;
- serve as the primary entry point for understanding a business process.

---

#### 3.5 Non-responsibilities

A Workflow MUST NOT be responsible for:

- executing business logic;
- managing business data;
- performing state transitions;
- implementing business rules;
- communicating with external systems;
- organizing UI components.

These responsibilities belong to other architectural concepts.

---

#### 3.6 Constraints

A Workflow:

- MUST own exactly one StateMachine.
- MUST NOT own another Workflow.
- MUST NOT reference another Workflow.
- MUST NOT directly execute business logic.
- MUST NOT directly modify Store.
- MUST NOT directly evaluate Rule.
- MUST NOT directly invoke Service.
- MUST remain independent of any UI framework.

---

#### 3.7 Invariants

The following properties are always true.

- A Workflow always corresponds to one business process boundary.
- A Workflow always owns exactly one StateMachine.
- A Workflow remains stable even when the internal implementation evolves.
- The semantic meaning of a Workflow is independent of implementation technologies.

---

#### 3.8 Relationships

Workflow collaborates with the following architectural concepts.

**StateMachine**

A Workflow owns exactly one StateMachine.

The StateMachine is responsible for coordinating the execution of the Workflow.

**State**

The business progress of a Workflow is represented by the states of its StateMachine.

**Event**

A Workflow is entered through Events processed by its StateMachine.

**Rule**

Rules determine whether state transitions inside the Workflow are permitted.

**Step**

Steps perform individual business actions coordinated by the StateMachine.

**Service**

Services provide reusable business capabilities consumed by Steps.

**Store**

Stores hold business data that may be produced or consumed during Workflow execution.

---

#### 3.9 Rationale

Workflow exists because neither StateMachine nor Step can define the semantic boundary of a business process.

A StateMachine manages state transitions, but it does not determine whether multiple business processes should share the same state machine.

A Step performs a single business action, but it has no understanding of the overall business process.

Workflow provides the missing architectural boundary.

It determines the scope within which a StateMachine operates while remaining independent of implementation details.

---

#### 3.10 Examples

The following are representative Workflow examples.

- TaskDraftToTaskReady
- LayerSelectionToVisibilityAnalysis
- EquipmentIdleToTakeoff
- IconSelectionToIconPlaced

Each name describes a business process boundary rather than a software feature.

---

#### 3.11 Counter Examples

The following are not Workflows.

**TaskService**

It represents an implementation capability rather than a business process.

**TaskPanel**

It represents a UI component rather than a business workflow.

**TaskManagement**

It describes a business domain rather than a specific business process boundary.

**ApprovalButtonClicked**

It represents a single interaction rather than a complete business workflow.

---

#### 3.12 Summary

Workflow is the highest-level architectural concept in Workflow Architecture.

It provides the semantic boundary of a business process and owns exactly one StateMachine.

Workflow neither executes business logic nor manages business data.

Its primary purpose is to establish a stable architectural boundary that remains valid as business requirements evolve.

---

### Chapter 4. StateMachine

#### 4.1 Purpose

StateMachine is the execution coordinator of a Workflow.

It determines how a business workflow evolves by accepting Events, evaluating transition conditions and coordinating business actions.

Unlike Workflow, which defines the semantic boundary of a business process, StateMachine governs how that process progresses over time.

This chapter defines the role of StateMachine within Workflow Architecture.

---

#### 4.2 Derivation

After introducing Workflow as the semantic boundary of a business process, an architectural mechanism is required to coordinate its evolution.

Without such a mechanism, business progression becomes scattered across UI components, business services or arbitrary control flow, making workflow behavior difficult to understand and maintain.

This coordinating responsibility cannot belong to Workflow itself, because Workflow defines boundaries rather than execution.

Nor can it belong to Step, because individual actions cannot determine the progression of an entire business process.

StateMachine is therefore introduced as the sole coordinator of workflow execution.

---

#### 4.3 Definition

A StateMachine is the execution coordinator of exactly one Workflow.

It receives Events, evaluates whether state transitions are permitted, performs state transitions and coordinates the execution of Steps.

A StateMachine models the evolution of a business process rather than the execution of business logic.

---

#### 4.4 Responsibilities

A StateMachine MUST:

- own the business states of its Workflow;
- receive Events as its only external input;
- determine whether state transitions may occur;
- perform state transitions;
- coordinate the execution of Steps;
- preserve the deterministic evolution of the Workflow.

---

#### 4.5 Non-responsibilities

A StateMachine MUST NOT be responsible for:

- implementing business logic;
- reading or writing business data directly;
- communicating with external systems;
- implementing business rules;
- rendering UI;
- coordinating other StateMachines.

These responsibilities belong to other architectural concepts.

---

#### 4.6 Constraints

A StateMachine:

- MUST belong to exactly one Workflow.
- MUST NOT belong to multiple Workflows.
- MUST receive external requests only through Events.
- MUST NOT invoke another StateMachine.
- MUST NOT reference another Workflow.
- MUST NOT read Store directly.
- MUST NOT evaluate business conditions directly.
- MUST evaluate transition conditions only through Rules.
- MUST coordinate business execution only through Steps.

---

#### 4.7 Invariants

The following properties are always true.

- Every StateMachine belongs to exactly one Workflow.
- Every state transition is triggered by an Event.
- Every transition decision is made before any Step is coordinated.
- Business logic is never executed directly by the StateMachine.
- The StateMachine remains independent of UI frameworks and storage mechanisms.

---

#### 4.8 Relationships

**Workflow**

Every Workflow owns exactly one StateMachine.

The StateMachine governs the evolution of that Workflow.

**State**

The StateMachine owns and transitions between business States.

**Event**

Events are the only external input accepted by the StateMachine.

**Rule**

Rules determine whether a requested state transition is permitted.

**Step**

The StateMachine coordinates the execution of Steps after a transition has been accepted.

**Service**

Services are never invoked directly by the StateMachine.

They are accessed only through Steps.

**Store**

The StateMachine never reads or writes Store directly.

Business data remains outside the StateMachine.

---

#### 4.9 Rationale

Workflow establishes the semantic boundary of a business process but intentionally contains no execution behavior.

Step performs individual business actions but cannot coordinate the overall progression of a workflow.

Rule determines whether an action is permitted but cannot control workflow execution.

StateMachine exists to coordinate these concepts without assuming their responsibilities.

By centralizing workflow progression while delegating execution and decision-making to dedicated concepts, StateMachine preserves clear responsibility boundaries throughout the architecture.

---

#### 4.10 Examples

Representative StateMachine examples include:

- TaskDraftToTaskReadyStateMachine
- LayerSelectionToVisibilityAnalysisStateMachine
- EquipmentIdleToTakeoffStateMachine
- IconSelectionToIconPlacedStateMachine

Each StateMachine coordinates exactly one Workflow.

---

#### 4.11 Counter Examples

The following are not StateMachines.

**TaskService**

Executes business capabilities but does not coordinate workflow evolution.

**TaskStore**

Stores business data but does not determine workflow progression.

**ApprovalDialog**

Represents a UI component rather than a business coordinator.

**WorkflowManager**

Coordinates multiple workflows and therefore violates the ownership boundary of a StateMachine.

---

#### 4.12 Summary

StateMachine is the execution coordinator of a single Workflow.

It is the only architectural concept responsible for coordinating business progression through state transitions.

StateMachine accepts Events, evaluates transition conditions through Rules and coordinates Steps to evolve the Workflow while remaining independent of business implementation, business data and UI technologies.

---

### Chapter 5. State

---

#### 5.1 Purpose

State describes the current business fact of a Workflow.

It represents what is true about the business process at a specific moment.

Unlike StateMachine, which coordinates workflow evolution, State represents the current position within that evolution.

This chapter defines what constitutes a valid business State and distinguishes it from implementation details and temporary execution conditions.

---

#### 5.2 Derivation

A StateMachine coordinates the evolution of a Workflow.

To coordinate that evolution deterministically, it requires a finite set of well-defined business situations that can be observed, reasoned about and restored.

Execution progress alone cannot satisfy this requirement because execution is transient and may be interrupted or restarted.

Likewise, UI presentation and technical progress indicators do not describe business semantics.

A separate concept is therefore required to represent stable business facts.

State is introduced to fulfill this responsibility.

---

#### 5.3 Definition

A State is an observable business fact within a Workflow.

Each State represents a stable stage of business progression.

A State describes **what has become true**, rather than **what is currently being executed**.

Only States participate in workflow evolution.

---

#### 5.4 Responsibilities

A State MUST:

- represent an observable business fact;
- describe a stable stage of a Workflow;
- be owned by exactly one StateMachine;
- participate in state transitions;
- remain independent of implementation details.

---

#### 5.5 Non-responsibilities

A State MUST NOT be responsible for:

- describing execution progress;
- representing UI presentation;
- storing business data;
- implementing business logic;
- performing business decisions;
- indicating temporary technical conditions.

---

#### 5.6 Constraints

A State:

- MUST represent a business fact.
- MUST be restorable after application restart whenever the corresponding business fact still exists.
- MUST NOT represent loading, waiting, rendering or execution progress.
- MUST NOT contain business data.
- MUST NOT execute business logic.
- MUST NOT depend on UI implementation.

---

#### 5.7 Invariants

The following properties are always true.

- Every State belongs to exactly one StateMachine.
- Every State represents a business fact rather than an implementation detail.
- States evolve only through StateMachine transitions.
- The meaning of a State is independent of UI frameworks and execution technologies.
- Removing all business data does not change the semantic definition of a State.

---

#### 5.8 Relationships

**Workflow**

States collectively describe the progression of a Workflow.

**StateMachine**

Every State is owned and managed by exactly one StateMachine.

The StateMachine determines when transitions occur.

**Event**

Events request transitions between States.

Events themselves do not constitute States.

**Rule**

Rules determine whether transitions between States are permitted.

**Step**

Steps execute business actions that may cause new business facts to become true, enabling subsequent State transitions.

**Service**

Services support the execution of Steps but do not define or modify States.

**Store**

Store contains business data associated with the current State.

Business data and State remain independent concepts.

---

#### 5.9 Rationale

Business workflows require a representation of their current business situation.

This responsibility cannot belong to Workflow, whose purpose is to define business boundaries.

It cannot belong to StateMachine, whose purpose is to coordinate progression.

Nor can it belong to Store, which manages business data rather than business semantics.

State therefore exists as the unique representation of observable business facts.

Separating business facts from execution details enables workflows to remain deterministic, recoverable and stable as implementations evolve.

---

#### 5.10 Examples

Representative States include:

- TaskDraft
- TaskReady
- LayerReady
- IconReady
- EquipmentAirborne
- MissionCompleted

Each example represents a business fact that remains meaningful independently of execution progress.

---

#### 5.11 Counter Examples

The following are not valid States.

**Loading**

Represents temporary execution progress rather than a business fact.

**RequestingTaskList**

Describes an ongoing implementation activity rather than an established business condition.

**DialogOpened**

Represents UI presentation rather than business semantics.

**Rendering**

Represents a technical process rather than business progression.

---

#### 5.12 Summary

State represents an observable business fact within a Workflow.

Only business facts participate in workflow evolution.

Execution progress, UI presentation and temporary technical conditions are not States.

By separating business facts from implementation details, State provides a stable foundation for deterministic workflow evolution.

---

### Chapter 6. Event

---

#### 6.1 Purpose

Event is the sole external input of a StateMachine.

It represents an explicit request to evolve a Workflow.

By introducing Event as an independent architectural concept, Workflow Architecture separates user intent from business execution, ensuring that business workflows remain independent of UI implementations and other event sources.

---

#### 6.2 Derivation

A Workflow evolves only when an external actor requests it to do so.

Without a unified input mechanism, UI components, lifecycle hooks, timers and other event sources would invoke the StateMachine directly, coupling business workflows to implementation details.

Furthermore, business workflows evolve over time.

If external callers invoke StateMachine transitions directly, every workflow evolution would require modifications across multiple callers.

A stable architectural boundary is therefore required between external intent and workflow execution.

Event is introduced to provide this boundary.

It accepts requests from any external source, transforms them into workflow-specific business requests and submits them to the StateMachine for decision.

---

#### 6.3 Definition

An Event is an application-level request submitted to a StateMachine.

It expresses an intention to evolve a Workflow.

An Event contains the information required for the StateMachine to evaluate whether the requested evolution may occur.

An Event neither executes business logic nor determines whether the request will be accepted.

---

#### 6.4 Responsibilities

An Event MUST:

- represent an explicit request to evolve a Workflow;
- serve as the only external input accepted by a StateMachine;
- encapsulate the information required by the requested business operation;
- remain independent of the source that generated it.

---

#### 6.5 Non-responsibilities

An Event MUST NOT be responsible for:

- executing business logic;
- modifying business data;
- determining whether a request is permitted;
- performing state transitions;
- representing UI events;
- storing workflow state.

---

#### 6.6 Constraints

An Event:

- MUST be immutable after creation.
- MUST target exactly one StateMachine.
- MUST NOT execute business logic.
- MUST NOT modify Store.
- MUST NOT invoke Step or Service.
- MUST NOT evaluate Rule.
- MUST NOT depend on any UI framework or platform event model.

---

#### 6.7 Invariants

The following properties are always true.

- Every StateMachine receives external requests exclusively through Events.
- An Event represents intent rather than outcome.
- An Event does not guarantee that the requested workflow evolution will occur.
- The meaning of an Event is independent of its origin.

---

#### 6.8 Relationships

**Workflow**

Events request the evolution of a Workflow.

They do not define the Workflow itself.

**StateMachine**

A StateMachine accepts Events as its only external input.

Whether an Event is accepted is determined entirely by the StateMachine.

**State**

Events request transitions between States.

States represent business facts; Events represent requests.

**Rule**

Rules evaluate whether the requested Event may result in a state transition.

**Step**

If an Event is accepted, the StateMachine may coordinate one or more Steps.

Events never invoke Steps directly.

**Service**

Events never communicate with Services.

Any Service invocation occurs indirectly through Steps.

**Store**

Events neither read nor write Store.

Business data remains outside the Event.

---

#### 6.9 Rationale

Workflow evolution should depend only on business intent, not on implementation mechanisms.

UI interactions, route changes, lifecycle callbacks, scheduled tasks and system notifications are merely different sources of intent.

Treating these sources as direct workflow controllers would tightly couple business logic to implementation details.

Event provides a stable contract between external intent and workflow execution.

As business workflows evolve, external callers continue expressing the same intent through Events, while the internal workflow implementation remains free to change.

---

#### 6.10 Examples

Representative Events include:

- RequestTaskCreation
- RequestTaskApproval
- RequestLayerLoading
- RequestVisibilityAnalysis
- RequestEquipmentTakeoff
- RequestMissionExecution

Each Event expresses an intention to initiate or continue a business workflow.

---

#### 6.11 Counter Examples

The following are not Events.

**MouseClick**

A platform interaction rather than an application-level business request.

**onMounted**

An application lifecycle callback rather than a workflow request.

**fetchTaskList**

A business action rather than a request.

**TaskApproved**

A business fact rather than a request.

---

#### 6.12 Summary

Event is the sole external input of a StateMachine.

It represents business intent while remaining independent of UI frameworks and other implementation details.

Event neither executes business logic nor determines workflow evolution.

Its responsibility is to provide a stable contract through which external actors request changes to a Workflow.

---

### Chapter 7. Rule

---

#### 7.1 Purpose

Rule is the architectural concept responsible for evaluating business conditions.

It answers one question only:

> May this business action occur under the current application snapshot?

By separating business decision from business execution, Rule enables business policies to remain centralized, reusable and independent of workflow implementation.

---

#### 7.2 Derivation

A StateMachine determines how a Workflow evolves.

However, a StateMachine should not directly inspect application data, other StateMachines or implementation-specific details when deciding whether a transition may occur.

Doing so would tightly couple workflow evolution to business data and create dependencies between otherwise independent workflows.

Similarly, placing business conditions inside UI components, Steps or Services scatters business policies throughout the application, making them difficult to discover, reuse and maintain.

A dedicated architectural concept is therefore required to evaluate business conditions while remaining independent of execution.

Rule is introduced to fulfill this responsibility.

---

#### 7.3 Definition

A Rule is a pure business predicate evaluated against the current application snapshot.

A Rule determines whether a business condition is satisfied.

A Rule performs no business execution and produces no side effects.

Its result is solely a boolean value.

---

#### 7.4 Responsibilities

A Rule MUST:

- evaluate a business condition;
- return only a boolean result;
- evaluate the current application snapshot;
- remain deterministic for the same snapshot;
- be reusable across multiple Workflows.

---

#### 7.5 Non-responsibilities

A Rule MUST NOT be responsible for:

- executing business logic;
- modifying Store;
- changing any StateMachine;
- invoking Step or Service;
- producing user-visible side effects;
- representing general-purpose utility predicates.

---

#### 7.6 Constraints

A Rule:

- MUST be side-effect free.
- MUST return only `true` or `false`.
- MUST evaluate only the current application snapshot.
- MUST NOT modify Store.
- MUST NOT dispatch Events.
- MUST NOT execute Steps.
- MUST NOT invoke Services.
- MUST NOT change any StateMachine.
- MUST remain independent of any specific Workflow.

---

#### 7.7 Invariants

The following properties are always true.

- The same application snapshot always produces the same Rule result.
- Rule evaluation never changes application state.
- Rules remain reusable across multiple Workflows.
- Rules describe business policy rather than execution behavior.

---

#### 7.8 Relationships

**Workflow**

Rules are not owned by any Workflow.

A Workflow may reference Rules through its StateMachine.

**StateMachine**

StateMachine evaluates Rules before determining whether a requested transition may occur.

The StateMachine never evaluates business conditions directly.

**State**

Rules may evaluate current business States as part of the application snapshot.

States themselves do not contain Rules.

**Event**

Rules determine whether an Event may result in workflow evolution.

Events never evaluate Rules directly.

**Step**

Steps execute business actions after a transition has been accepted.

Rules never execute Steps.

Steps SHOULD NOT use Rules to determine whether execution should begin, because that responsibility belongs to the StateMachine.

**Service**

Services never invoke Rules.

Business policy evaluation remains outside implementation capabilities.

**Store**

Rules may read Store.

Rules never modify Store.

---

#### 7.9 Rationale

Business policy should exist independently of workflow execution.

Embedding business conditions inside StateMachines would couple workflow coordination to application data.

Embedding them inside Steps would mix decision with execution.

Embedding them inside UI components would scatter business policy throughout the presentation layer.

Rule centralizes business policy as a reusable, side-effect-free architectural concept.

This separation preserves clear responsibility boundaries and allows multiple Workflows to evaluate identical business conditions consistently.

---

#### 7.10 Examples

Representative Rules include:

- isTaskSelected
- isLayerReady
- isIconReady
- isUserAuthorized
- canStartVisibilityAnalysis
- canApproveTask

Each Rule evaluates whether a business condition currently holds.

---

#### 7.11 Counter Examples

The following are not Rules.

**isEmpty(array)**

A general-purpose utility predicate rather than a business policy.

**fetchTaskList**

Executes business logic instead of evaluating a condition.

**approveTask**

Performs business execution rather than business decision.

**showWarningDialog**

Produces side effects rather than evaluating business policy.

---

#### 7.12 Summary

Rule is the architectural concept responsible for business decision.

It evaluates the current application snapshot and returns a boolean result without producing side effects.

Rule separates business policy from workflow execution, enabling business decisions to remain centralized, deterministic and reusable across Workflows.

---

### Chapter 8. Step

---

#### 8.1 Purpose

Step is the architectural concept responsible for executing a single business action.

It is the only concept within Workflow Architecture that directly performs business execution.

By separating execution from coordination, Step enables StateMachine to govern workflow evolution without becoming responsible for business implementation.

---

#### 8.2 Derivation

After a StateMachine accepts an Event and determines that a state transition is permitted, the requested business action must be carried out.

This responsibility cannot belong to the StateMachine, whose purpose is workflow coordination rather than business execution.

Nor can it belong to Service, because Services provide reusable implementation capabilities without understanding business intent.

A dedicated architectural concept is therefore required to execute one business action under the coordination of a StateMachine.

Step is introduced to fulfill this responsibility.

---

#### 8.3 Definition

A Step is the execution unit of a single business action.

A Step performs the business work required by a StateMachine.

A Step may coordinate one or more Services, read or write Store and return an execution result to the StateMachine.

A Step does not determine whether it should execute.

Execution is always coordinated externally by the StateMachine.

---

#### 8.4 Responsibilities

A Step MUST:

- execute one business action;
- coordinate one or more Services when necessary;
- read or write Store when required by the business action;
- report its execution result to the StateMachine;
- remain focused on a single business responsibility.

---

#### 8.5 Non-responsibilities

A Step MUST NOT be responsible for:

- coordinating workflow evolution;
- determining whether execution is permitted;
- evaluating business policy;
- owning business state;
- defining workflow boundaries;
- providing reusable implementation capabilities.

---

#### 8.6 Constraints

A Step:

- MUST execute only under the coordination of a StateMachine.
- MUST NOT invoke another StateMachine.
- MUST NOT dispatch Events.
- MUST NOT determine whether execution should begin.
- MUST NOT evaluate Rule as a precondition for execution.
- MAY invoke one or more Services.
- MAY read Store.
- MAY modify Store.
- SHOULD perform only one business action.

---

#### 8.7 Invariants

The following properties are always true.

- Every Step represents exactly one business action.
- A Step executes only after being coordinated by a StateMachine.
- A Step never owns workflow progression.
- A Step may modify business data but never business state.
- A Step remains independent of any specific UI implementation.

---

#### 8.8 Relationships

**Workflow**

Steps do not belong exclusively to any Workflow.

They may be physically organized under a representative Workflow directory for discoverability, but they remain reusable architectural units.

**StateMachine**

StateMachine coordinates the execution of Steps.

Steps never coordinate StateMachines.

**State**

A Step never modifies State directly.

State evolution is determined exclusively by the StateMachine.

**Event**

Events never invoke Steps directly.

Step execution always occurs through StateMachine coordination.

**Rule**

Rules determine whether execution is permitted before a Step begins.

Steps themselves never perform permission decisions.

**Service**

Steps coordinate one or more Services to accomplish business work.

Services remain unaware of workflow semantics.

**Store**

Step is the only architectural concept permitted to modify Store.

Reading Store is also permitted when required by the business action.

---

#### 8.9 Rationale

Workflow Architecture separates business decision, workflow coordination and business execution into independent architectural responsibilities.

StateMachine coordinates.

Rule decides.

Service provides capabilities.

None of these concepts should perform business execution.

Step exists to isolate execution as an independent responsibility.

This separation prevents coordination logic from becoming coupled with implementation logic while preserving a single location where business actions are performed.

---

#### 8.10 Examples

Representative Steps include:

- fetchTaskList
- submitTask
- importLayer
- placeIcon
- startVisibilityAnalysis
- controlEquipmentTakeoff

Each Step performs one complete business action under StateMachine coordination.

---

#### 8.11 Counter Examples

The following are not Steps.

**TaskStateMachine**

Coordinates workflow evolution rather than executing business work.

**CanApproveTask**

Evaluates business policy rather than executing business actions.

**TaskApiService**

Provides reusable implementation capability rather than business execution.

**LoadingAnimation**

Represents UI behavior rather than business execution.

---

#### 8.12 Summary

Step is the execution unit of a single business action.

It executes business work under the coordination of a StateMachine while remaining independent of workflow progression and business decision.

Step is the only architectural concept permitted to modify Store, making it the exclusive execution boundary within Workflow Architecture.

---

### Chapter 9. Service

---

#### 9.1 Purpose

Service is the architectural concept responsible for providing reusable implementation capabilities.

Unlike Step, which executes a business action, Service provides the technical or domain capabilities required to perform that action.

A Service has no knowledge of Workflow, StateMachine or business progression.

Its responsibility is solely to perform reusable work upon request.

---

#### 9.2 Derivation

Business execution frequently requires operations that are independent of any particular business workflow.

Examples include calling external APIs, reading local storage, performing calculations, converting data formats or interacting with third-party systems.

Embedding these implementation details directly within Steps would make business execution difficult to reuse and maintain.

However, extracting them into reusable components must not introduce knowledge of business workflows.

A dedicated architectural concept is therefore required to encapsulate reusable implementation capabilities while remaining independent of business semantics.

Service is introduced to fulfill this responsibility.

---

#### 9.3 Definition

A Service is a reusable implementation capability.

A Service performs implementation work requested by a Step.

A Service neither understands business workflows nor participates in workflow evolution.

Its behavior is entirely determined by its inputs.

---

#### 9.4 Responsibilities

A Service MUST:

- provide reusable implementation capabilities;
- perform implementation work requested by a Step;
- remain independent of business workflow semantics;
- produce deterministic results for the same inputs whenever practical;
- expose a clear and reusable interface.

---

#### 9.5 Non-responsibilities

A Service MUST NOT be responsible for:

- coordinating workflow execution;
- determining whether business execution is permitted;
- modifying business state;
- dispatching Events;
- evaluating Rules;
- defining business workflow boundaries.

---

#### 9.6 Constraints

A Service:

- MUST execute only when invoked by a Step.
- MUST NOT invoke a StateMachine.
- MUST NOT dispatch Events.
- MUST NOT evaluate Rules.
- MUST NOT read any StateMachine.
- MUST NOT read or write Store directly.
- SHOULD remain reusable across multiple Steps and Workflows.
- SHOULD depend only on its explicit inputs.

---

#### 9.7 Invariants

The following properties are always true.

- A Service has no knowledge of Workflow.
- A Service has no knowledge of StateMachine.
- A Service performs implementation work rather than business coordination.
- A Service never determines workflow evolution.
- A Service remains reusable independently of business processes.

---

#### 9.8 Relationships

**Workflow**

Services are independent of Workflows.

A Service may be reused by multiple Workflows without modification.

**StateMachine**

Services never communicate with StateMachines directly.

Workflow coordination remains outside the Service.

**State**

Services neither read nor modify business States.

**Event**

Services neither receive nor dispatch Events.

**Rule**

Services never evaluate business Rules.

Business policy remains outside implementation capabilities.

**Step**

Steps coordinate Services to accomplish business actions.

Service execution always occurs under Step coordination.

**Store**

Services neither read nor modify Store.

Any required business data must be supplied by the Step through explicit parameters.

---

#### 9.9 Rationale

Workflow Architecture distinguishes business execution from implementation capability.

Step performs business actions.

Service provides reusable implementation mechanisms.

If Services were allowed to access StateMachine, Store or Rule directly, implementation capabilities would gradually accumulate business responsibilities, eventually becoming an alternative execution layer.

By restricting Services to explicit inputs and outputs, Workflow Architecture preserves their reusability, predictability and independence from business workflows.

---

#### 9.10 Examples

Representative Services include:

- requestTaskList
- submitTaskRequest
- uploadFile
- calculateCoverage
- convertCoordinates
- parseGeoJson

Each Service provides an implementation capability without knowledge of business workflows.

---

#### 9.11 Counter Examples

The following are not Services.

**submitTask**

Represents a business action rather than a reusable implementation capability.

**CanApproveTask**

Represents business decision rather than implementation work.

**TaskStateMachine**

Coordinates workflow progression rather than implementation work.

**TaskStore**

Stores business data rather than providing implementation capabilities.

---

#### 9.12 Summary

Service is the architectural concept responsible for reusable implementation capabilities.

It performs implementation work under the coordination of a Step while remaining completely independent of Workflow, StateMachine, Rule and Store.

By isolating implementation capability from business execution, Service preserves architectural separation and maximizes reuse.

---

### Chapter 10. Store

---

#### 10.1 Purpose

Store is the architectural concept responsible for holding business data.

It provides a stable data boundary between workflow execution and business information.

Unlike State, which represents business facts, Store contains the data upon which business actions operate.

By separating business data from workflow progression, Workflow Architecture ensures that business semantics remain independent of data representation and storage mechanisms.

---

#### 10.2 Derivation

Business workflows require access to persistent or shared business information.

However, business data changes independently of workflow evolution.

If business data were stored inside StateMachine or State, workflow semantics would become coupled to data representation.

Likewise, allowing every architectural concept to read or modify business data would blur responsibility boundaries and make workflow behavior difficult to reason about.

A dedicated architectural concept is therefore required to own business data while remaining independent of workflow coordination.

Store is introduced to fulfill this responsibility.

---

#### 10.3 Definition

A Store is the architectural owner of business data.

It exposes business information to the application while remaining independent of workflow progression.

A Store represents data, not business state.

Business state is represented exclusively by State.

---

#### 10.4 Responsibilities

A Store MUST:

- own business data;
- expose business data to authorized architectural concepts;
- provide a stable data boundary;
- remain independent of workflow coordination;
- represent application data rather than business progression.

---

#### 10.5 Non-responsibilities

A Store MUST NOT be responsible for:

- coordinating workflow execution;
- representing business state;
- evaluating business rules;
- executing business actions;
- communicating with external systems;
- determining workflow evolution.

---

#### 10.6 Constraints

A Store:

- MUST NOT contain business workflow logic.
- MUST NOT contain state transition logic.
- MUST NOT evaluate Rules.
- MUST NOT dispatch Events.
- MUST NOT invoke Steps.
- MUST NOT invoke Services.
- MUST NOT modify any StateMachine.
- MAY be read by Rules.
- MAY be read by Steps.
- MAY be modified only by Steps.

---

#### 10.7 Invariants

The following properties are always true.

- Store contains business data rather than business state.
- Store remains independent of Workflow.
- Store remains independent of StateMachine.
- Store never determines workflow evolution.
- Business data may change without changing business State.
- Business State may change without requiring changes to every business datum.

---

#### 10.8 Relationships

**Workflow**

Stores are independent of Workflows.

A Store may support multiple Workflows simultaneously.

**StateMachine**

StateMachines never read or modify Store directly.

Workflow coordination remains independent of business data.

**State**

State represents business facts.

Store represents business data.

These concepts are intentionally independent.

**Event**

Events neither own nor modify Store.

They merely carry requests.

**Rule**

Rules may read Store to evaluate business conditions.

Rules never modify Store.

**Step**

Step is the only architectural concept permitted to modify Store.

Steps may also read Store when executing business actions.

**Service**

Services neither read nor modify Store.

Any required business data must be supplied explicitly by the Step.

---

#### 10.9 Rationale

Workflow Architecture distinguishes business progression from business information.

State answers:

> What business fact is currently true?

Store answers:

> What business data currently exists?

Although these questions are related, they are fundamentally different.

Keeping State and Store independent prevents business semantics from becoming coupled to data structures and enables workflows to remain stable as application data evolves.

Similarly, restricting write access to Steps establishes a single execution boundary for all business data modifications.

---

#### 10.10 Examples

Representative Stores include:

- taskStore
- layerStore
- iconStore
- equipmentStore
- missionStore

Each Store owns business data associated with a business domain.

---

#### 10.11 Counter Examples

The following are not Stores.

**TaskReady**

Represents a business State rather than business data.

**TaskStateMachine**

Coordinates workflow evolution rather than storing business information.

**submitTask**

Executes a business action rather than holding data.

**TaskApiService**

Provides implementation capability rather than business data ownership.

---

#### 10.12 Summary

Store is the architectural owner of business data.

It is intentionally separated from State, which represents business facts.

Store never coordinates workflows, evaluates business policy or executes business actions.

Within Workflow Architecture, Step is the only architectural concept permitted to modify Store, preserving a clear and deterministic boundary for all business data changes.

---

## Part III. Derivation Rules

---

### Chapter 11. Workflow Derivation

---

#### 11.1 Purpose

This chapter defines a systematic method for discovering Workflow boundaries.

Its purpose is not to name Workflows, but to determine where one Workflow ends and another begins.

By providing a deterministic derivation process, Workflow Architecture eliminates arbitrary workflow decomposition and prevents architectural boundaries from drifting as business requirements evolve.

---

#### 11.2 Problem Statement

Without a derivation rule, Workflow boundaries are usually determined by subjective judgment.

Common decomposition strategies include:

- UI pages
- Features
- Components
- Backend APIs
- Developer preference

Although these strategies may appear reasonable, none of them remain stable as business requirements evolve.

As a result:

- unrelated business processes become coupled within a single StateMachine;
- identical business processes are decomposed differently by different developers;
- workflow boundaries continuously change during product evolution.

A stable derivation rule is therefore required.

---

#### 11.3 Derivation Principle

A Workflow is derived from irreversible business divergence.

A Workflow continues to evolve until the business reaches a point at which multiple subsequent business processes become mutually exclusive and cannot naturally return to the same decision point.

This point is called an **irreversible branch**.

An irreversible branch separates one Workflow from the next.

Conversely, if multiple business operations eventually return to the same business situation without preventing one another from occurring, they belong to the same Workflow.

Therefore:

> Workflow boundaries are determined by irreversible business branching rather than implementation structure.

---

#### 11.4 Derivation Algorithm

The derivation process SHALL be performed in the following order.

##### Step 1

Identify the current business objective.

Ignore implementation details such as pages, dialogs, APIs and components.

Describe only the business progression.

---

##### Step 2

Trace the business process from its beginning.

Record every observable business fact encountered during progression.

---

##### Step 3

Identify every business branch.

For each branch, ask:

> Can another branch still be chosen after this branch has completed?

---

##### Step 4

If the answer is **Yes**, the branches belong to the same Workflow.

They eventually converge back to the same business progression.

No Workflow boundary is introduced.

---

##### Step 5

If the answer is **No**, an irreversible branch has been identified.

The current Workflow ends immediately before the branch.

Each branch begins a new Workflow.

---

##### Step 6

Repeat this process recursively for every newly discovered Workflow until no irreversible branches remain.

---

##### Step 7

Determine the semantic name of the derived Workflow.

The Workflow name SHALL express the complete business evolution represented by the Workflow.

Whenever practical, the canonical form SHALL be:

`<InitialBusinessState>To<TerminalBusinessState>`

The chosen name MUST remain independent of:

- UI structure
- feature grouping
- software modules
- API boundaries
- implementation details

The resulting Workflow name SHALL uniquely identify one business evolution.

The Workflow name is a consequence of the derivation process rather than an independent design decision.

---

#### 11.5 Decision Criteria

A derived Workflow is considered correct only if all of the following conditions are satisfied.

##### Criterion 1 — Semantic Completeness

The Workflow represents one relatively complete business process.

Its boundary is understandable without referring to implementation details.

---

##### Criterion 2 — StateMachine Ownership

Exactly one StateMachine is sufficient to coordinate the entire Workflow.

No additional StateMachine is required.

---

##### Criterion 3 — Non-overlapping Boundaries

No business progression belongs simultaneously to two Workflows.

Each business progression has exactly one Workflow owner.

---

##### Criterion 4 — Stable Boundary

The Workflow boundary remains unchanged when implementation details evolve.

Changing UI, APIs or project structure does not require redefining the Workflow.

---

##### Criterion 5 — Irreversible Separation

After crossing the Workflow boundary, the previous business branching point cannot be naturally resumed within the same business progression.

If the previous branching point remains naturally reachable, the Workflow has been split too early.

---

#### 11.6 Counter Examples

##### Feature-based decomposition

```
Task Management Workflow
```

This describes a business domain rather than a business process.

---

##### UI-based decomposition

```
TaskPageWorkflow
```

UI structure changes more frequently than business semantics.

Therefore, UI pages do not determine Workflow boundaries.

---

##### API-based decomposition

```
FetchTaskWorkflow
```

Fetching data is an implementation activity rather than a business workflow.

---

##### Every operation becomes a Workflow

```
CreateTaskWorkflow
DeleteTaskWorkflow
UpdateTaskWorkflow
```

If these operations all return to the same business situation and remain mutually reachable, they belong to a larger Workflow rather than independent Workflows.

---

#### 11.7 Rationale

Workflow Architecture intentionally derives Workflow boundaries from business progression rather than implementation structure.

Business implementation changes continuously.

Business semantics change much more slowly.

Irreversible business branching is observable regardless of programming language, UI framework or backend architecture.

Because the derivation rule depends only on business semantics, Workflow boundaries remain stable throughout implementation evolution.

This stability enables StateMachine ownership, architectural decomposition and business responsibility to evolve predictably without repeated restructuring.

---

#### 11.8 Summary

Workflow boundaries are not chosen arbitrarily.

They are derived from irreversible business branching.

A Workflow continues until business progression reaches a point where multiple mutually exclusive business processes emerge.

Only at that point is a new Workflow introduced.

This derivation rule establishes the architectural foundation for all subsequent Workflow decomposition.

---

### Chapter 12. State Derivation

---

#### 12.1 Purpose

This chapter defines a systematic method for deriving the set of States within a Workflow.

Once the boundary of a Workflow has been determined, the next architectural task is to identify the stable business facts that describe its internal progression.

The purpose of this chapter is to derive those States objectively rather than inventing them arbitrarily.

---

#### 12.2 Problem Statement

Workflow Derivation answers:

> Where does a Workflow begin and end?

However, after a Workflow has been identified, its internal structure remains undefined.

Without a derivation rule, States are often created according to implementation details such as:

- loading progress;
- asynchronous execution;
- UI presentation;
- developer preference.

As a result, business facts become mixed with technical states, making StateMachines unstable and difficult to maintain.

A stable derivation rule is therefore required to discover business States from an already derived Workflow.

---

#### 12.3 Derivation Principle

State is derived from Workflow.

A Workflow consists of a sequence of observable business progression.

Within that progression, only stable business facts are eligible to become States.

A business fact is considered stable if it remains true independently of how the application executes.

Therefore:

> Every State represents an observable and stable business fact within a Workflow.

Temporary execution progress, UI behavior and implementation details never produce States.

---

#### 12.4 Derivation Algorithm

The derivation process SHALL be performed in the following order.

##### Step 1

Take a previously derived Workflow.

Ignore all implementation details.

Describe only the business progression contained within the Workflow boundary.

---

##### Step 2

Traverse the Workflow sequentially.

For each point in the progression, ask:

> Has a new business fact become true?

If the answer is **No**, continue.

If the answer is **Yes**, continue to Step 3.

---

##### Step 3

Evaluate whether the business fact is stable.

Ask:

- Does this fact remain true after the current operation finishes?
- Can another business operation observe this fact?
- Would this fact still be meaningful after application restart?

Only if all answers are **Yes** may the business fact become a State.

---

##### Step 4

Determine whether the candidate State introduces new business meaning.

If removing the candidate does not change workflow semantics, it is redundant and SHALL NOT become a State.

---

##### Step 5

Continue until the Workflow reaches its terminal business fact.

The resulting ordered collection forms the complete State set for the Workflow.

---

#### 12.5 Decision Criteria

A derived State set is considered correct only if all of the following conditions are satisfied.

##### Criterion 1 — Business Semantics

Every State represents a business fact rather than an implementation detail.

---

##### Criterion 2 — Stability

Every State remains meaningful independently of execution progress, rendering process or UI behavior.

---

##### Criterion 3 — Persistence

If the corresponding business fact still exists, the application can restore the State after restart.

---

##### Criterion 4 — Non-redundancy

Removing any State changes the business semantics of the Workflow.

No State merely duplicates another.

---

##### Criterion 5 — Completeness

Every meaningful business progression within the Workflow can be explained entirely by transitions between the derived States.

No business stage exists outside the State set.

---

#### 12.6 Counter Examples

##### Loading

Loading represents execution progress rather than a business fact.

Therefore it is not a State.

---

##### Saving

Saving describes an implementation activity.

Whether the save operation succeeds or fails determines business facts.

The execution itself is not a State.

---

##### Validating

Validation is a business action.

Only the resulting business fact, such as _ValidationSucceeded_ or _ValidationFailed_, may become a State if it satisfies the derivation criteria.

---

##### DialogOpened

Opening a dialog changes the UI rather than the business.

UI presentation never determines State.

---

##### RequestInProgress

Network requests represent technical execution.

They do not establish new business facts.

---

#### 12.7 Rationale

Workflow establishes the semantic boundary of a business process.

Only after this boundary has been determined can its internal business progression be analyzed.

Deriving States before deriving the Workflow would force architectural decisions to depend on incomplete business context, often resulting in fragmented or overlapping States.

By deriving States exclusively from an already established Workflow, Workflow Architecture ensures that every State belongs to exactly one Workflow, represents a stable business fact and participates meaningfully in business progression.

This dependency also guarantees that changes to implementation details do not alter the State model.

---

#### 12.8 Summary

State is not designed.

State is derived.

Beginning with an established Workflow, every stable and observable business fact is evaluated as a potential State.

Only business facts that are stable, non-redundant and semantically meaningful become States.

The resulting State set provides the deterministic foundation upon which StateMachine evolution is built.

---

### Chapter 13. Event Derivation

---

#### 13.1 Purpose

This chapter defines a systematic method for deriving the Event set of a Workflow.

Once the Workflow boundary and its State set have been established, the next architectural task is to identify the requests that may cause the Workflow to evolve.

The purpose of this chapter is to derive Events objectively from workflow evolution rather than from implementation details.

---

#### 13.2 Problem Statement

Workflow Derivation defines the business boundary.

State Derivation defines the stable business facts within that boundary.

However, a StateMachine cannot evolve autonomously.

Every state transition must originate from an explicit request.

Without a derivation rule, Events are commonly derived from:

- UI controls;
- DOM events;
- page interactions;
- API endpoints;
- implementation callbacks.

These implementation-specific artifacts change frequently and do not represent stable business semantics.

A stable derivation rule is therefore required to derive Events directly from business evolution.

---

#### 13.3 Derivation Principle

Event is derived from State evolution.

Whenever a Workflow intends to evolve from one business State toward another, an external request is required.

That request becomes an Event.

Therefore:

> Every Event represents an explicit request to initiate or continue business progression between States.

Events describe intention rather than execution.

A State transition without an initiating request SHALL NOT introduce a new Event.

---

#### 13.4 Derivation Algorithm

The derivation process SHALL be performed in the following order.

##### Step 1

Take a previously derived State set.

Examine every transition between adjacent business States.

Ignore implementation mechanisms.

---

##### Step 2

For each transition, ask:

> Must an external actor explicitly request this business progression?

If the answer is **No**, no Event is introduced.

Continue to the next transition.

If the answer is **Yes**, continue to Step 3.

---

##### Step 3

Identify the business intention expressed by the request.

Describe what the requester intends to accomplish rather than how the request is initiated.

This business intention becomes the candidate Event.

---

##### Step 4

Determine whether multiple candidate Events express the same business intention.

If they do, merge them into a single Event regardless of how many UI controls, APIs or system entry points may produce that request.

---

##### Step 5

Repeat the process until every externally initiated business progression within the Workflow has a corresponding Event.

The resulting collection forms the complete Event set of the Workflow.

---

#### 13.5 Decision Criteria

A derived Event set is considered correct only if all of the following conditions are satisfied.

##### Criterion 1 — Intent

Every Event expresses a business intention rather than an implementation action.

---

##### Criterion 2 — External Initiation

Every Event originates from an external requester, including users, application lifecycle, routing, timers or other systems.

Internal workflow progression never introduces additional Events.

---

##### Criterion 3 — Independence

The meaning of an Event remains unchanged regardless of how the request is triggered.

Different UI controls or platforms producing the same business intention share the same Event.

---

##### Criterion 4 — Non-redundancy

No two Events express the same business intention.

Implementation differences alone do not justify multiple Events.

---

##### Criterion 5 — Completeness

Every externally requested business progression within the Workflow can be explained by the derived Event set.

No externally initiated workflow evolution exists without an Event.

---

#### 13.6 Counter Examples

##### ButtonClick

Represents a UI interaction rather than a business request.

Therefore it is not an Event.

---

##### MouseDown

Represents a platform input rather than business intent.

It is not an Event.

---

##### onMounted

Represents an application lifecycle callback.

The lifecycle callback may produce an Event, but it is not the Event itself.

---

##### fetchTaskList

Represents a business action.

Business execution belongs to Step rather than Event.

---

##### TaskApproved

Represents a business fact.

Business facts are States rather than Events.

---

#### 13.7 Rationale

Workflow evolution always begins with intent.

That intent is independent of UI frameworks, operating systems and implementation technologies.

By deriving Events exclusively from business intention, Workflow Architecture establishes a stable contract between external actors and StateMachines.

As implementation evolves, new UI components, APIs or lifecycle hooks may produce existing Events without altering the Event model itself.

This preserves the independence of workflow semantics from implementation structure.

---

#### 13.8 Summary

Event is not derived from UI interactions or technical entry points.

It is derived from business intention.

Beginning with an established State model, every externally requested business progression is evaluated as a potential Event.

Only explicit business requests become Events.

The resulting Event set forms the unique external interface through which a Workflow may evolve.

---

### Chapter 14. Rule Derivation

---

#### 14.1 Purpose

This chapter defines a systematic method for deriving Rules.

Once the Workflow, State and Event models have been established, the next architectural task is to identify the business conditions that determine whether requested workflow evolution is permitted.

The purpose of this chapter is to derive Rules objectively from business decision points rather than from implementation logic.

---

#### 14.2 Problem Statement

Workflow boundaries define business processes.

States define business facts.

Events define business requests.

However, not every requested business progression is always permitted.

Whether a StateMachine accepts an Event depends upon business policy.

Without a derivation rule, business conditions are commonly implemented inside:

- UI components;
- StateMachines;
- Steps;
- Services;
- utility functions.

As business requirements evolve, identical business policies become duplicated across multiple implementation layers, making workflow behavior inconsistent.

A stable derivation rule is therefore required to centralize business policy independently of execution.

---

#### 14.3 Derivation Principle

Rule is derived from business decisions.

Whenever a StateMachine must answer:

> May this requested business progression occur?

the answer SHALL be provided by one or more Rules.

Rules evaluate the current application snapshot.

They never execute business actions.

Therefore:

> Every Rule represents one independent business decision.

---

#### 14.4 Derivation Algorithm

The derivation process SHALL be performed in the following order.

##### Step 1

Take a previously derived Workflow, State set and Event set.

Examine every Event that may cause a State transition.

---

##### Step 2

For each transition, ask:

> Can this transition always occur?

If the answer is **Yes**, no Rule is required.

Continue to the next transition.

If the answer is **No**, continue to Step 3.

---

##### Step 3

Identify every independent business condition that determines whether the transition may occur.

Each condition becomes a candidate Rule.

A candidate Rule SHALL answer exactly one business question.

---

##### Step 4

Determine whether the candidate Rule depends only upon the current application snapshot.

If evaluating the condition requires executing business actions, asynchronous operations or side effects, it is not a Rule.

Continue decomposing until every Rule is a pure snapshot predicate.

---

##### Step 5

Determine whether multiple candidate Rules express the same business policy.

If they do, merge them into one reusable Rule.

Repeat until every business decision is represented exactly once.

---

#### 14.5 Decision Criteria

A derived Rule set is considered correct only if all of the following conditions are satisfied.

##### Criterion 1 — Business Decision

Every Rule answers one business policy question.

---

##### Criterion 2 — Snapshot Evaluation

Every Rule can be evaluated entirely from the current application snapshot.

No execution is required.

---

##### Criterion 3 — Side-effect Freedom

Evaluating a Rule never changes any business data, StateMachine or external system.

---

##### Criterion 4 — Reusability

Rules expressing identical business policy are represented once and reused across Workflows.

---

##### Criterion 5 — Independence

Every Rule remains independent of UI implementation, Step execution and Service implementation.

---

#### 14.6 Counter Examples

##### isEmpty(array)

Represents a generic programming utility rather than business policy.

Therefore it is not a Rule.

---

##### fetchTaskList()

Executes business work.

Execution belongs to Step rather than Rule.

---

##### saveTask()

Modifies business data.

Rule never performs execution.

---

##### requestPermission()

Requires external execution.

Rule evaluates only the existing application snapshot.

---

##### if (...) inside UI

Although the condition may express business policy, embedding it directly within UI prevents reuse and violates the architectural separation of business decision.

---

#### 14.7 Rationale

Business policy is fundamentally different from business execution.

Execution changes the application.

Decision evaluates the application.

By deriving Rules from business decision points rather than implementation structure, Workflow Architecture ensures that policy remains centralized, reusable and deterministic.

Because Rules evaluate only the current application snapshot, they remain stable regardless of execution technology, UI framework or business implementation.

This separation also enables StateMachines to coordinate workflow evolution without directly depending upon application data.

---

#### 14.8 Summary

Rule is derived from business decisions.

Whenever workflow evolution depends upon whether a business condition is satisfied, a Rule is introduced.

Only pure snapshot predicates become Rules.

The resulting Rule set forms the centralized business policy layer of Workflow Architecture.

---

### Chapter 15. Step Derivation

---

#### 15.1 Purpose

This chapter defines a systematic method for deriving Steps.

Once the Workflow, State, Event and Rule models have been established, the next architectural task is to identify the business actions required to realize workflow evolution.

The purpose of this chapter is to derive Steps objectively from business execution rather than from implementation structure.

---

#### 15.2 Problem Statement

Workflow defines business boundaries.

State defines business facts.

Event defines business requests.

Rule defines business decisions.

However, after a requested workflow evolution has been accepted, the application must still perform business work.

Without a derivation rule, business execution is commonly organized according to:

- API endpoints;
- UI pages;
- Components;
- Developer preference;
- Technical modules.

As a result, business execution becomes fragmented, duplicated or coupled with workflow coordination.

A stable derivation rule is therefore required to identify execution units independently of implementation structure.

---

#### 15.3 Derivation Principle

Step is derived from business actions.

Whenever business progression requires work to be performed in order to establish a new business fact, that work becomes a Step.

A Step represents execution rather than decision.

Therefore:

> Every Step performs exactly one business action whose completion may establish one or more new business facts.

Business execution that merely supports another business action does not become a Step.

---

#### 15.4 Derivation Algorithm

The derivation process SHALL be performed in the following order.

##### Step 1

Take a previously derived Workflow, State set, Event set and Rule set.

Identify every accepted State transition.

Ignore implementation details.

---

##### Step 2

For each accepted transition, ask:

> What business work must actually be completed before the target business fact can become true?

Record every required business action.

---

##### Step 3

Determine whether multiple recorded actions together accomplish one indivisible business objective.

If they do, they belong to the same Step.

If they establish different business objectives, they SHALL be separated into different Steps.

---

##### Step 4

Determine whether any recorded action merely provides implementation capability for another action.

If so, it is not a Step.

It SHALL instead become a Service candidate.

---

##### Step 5

Repeat the process until every business action required for workflow progression is represented by exactly one Step.

---

#### 15.5 Decision Criteria

A derived Step set is considered correct only if all of the following conditions are satisfied.

##### Criterion 1 — Business Execution

Every Step performs a business action rather than a business decision.

---

##### Criterion 2 — Single Responsibility

Every Step accomplishes one business objective.

It neither combines unrelated business actions nor fragments a single action across multiple Steps.

---

##### Criterion 3 — Workflow Coordination

Every Step executes only after being coordinated by a StateMachine.

No Step initiates workflow evolution independently.

---

##### Criterion 4 — Business Data Boundary

Business data modifications occur only within derived Steps.

No other architectural concept performs business data updates.

---

##### Criterion 5 — Service Separation

Reusable implementation capabilities remain outside the Step.

Only business execution remains inside.

---

#### 15.6 Counter Examples

##### requestTaskApi()

Represents an implementation capability.

It becomes a Service rather than a Step.

---

##### ButtonClick()

Represents a UI interaction.

It is not business execution.

---

##### CanApproveTask()

Represents business policy.

It becomes a Rule rather than a Step.

---

##### TaskStateMachine

Coordinates workflow progression.

It never performs business execution.

---

##### calculateDistance()

Represents a reusable technical capability.

It becomes a Service.

---

#### 15.7 Rationale

Workflow evolution depends upon business execution.

However, execution should remain independent of workflow coordination, business decision and implementation capability.

By deriving Steps directly from business actions, Workflow Architecture establishes a clear execution boundary.

This boundary prevents business logic from migrating into StateMachines while simultaneously preventing implementation capabilities from accumulating business semantics.

The resulting architecture preserves both separation of responsibility and implementation reuse.

---

#### 15.8 Summary

Step is derived from business execution.

Whenever workflow progression requires business work to establish a new business fact, a Step is introduced.

Only business actions become Steps.

Implementation capabilities become Services.

The resulting Step set forms the exclusive execution layer of Workflow Architecture.

---

### Chapter 16. Service Derivation

---

#### 16.1 Purpose

This chapter defines a systematic method for deriving Services.

Once the Workflow, State, Event, Rule and Step models have been established, the remaining architectural task is to identify the reusable implementation capabilities required by business execution.

The purpose of this chapter is to derive Services objectively from implementation reuse rather than from business semantics.

---

#### 16.2 Problem Statement

Workflow defines business boundaries.

State defines business facts.

Event defines business requests.

Rule defines business decisions.

Step defines business execution.

However, business execution frequently depends upon implementation capabilities that are independent of any particular business action.

Without a derivation rule, these capabilities are often embedded directly inside Steps.

As business execution evolves, identical implementation logic becomes duplicated across multiple Steps, reducing maintainability and obscuring business intent.

A stable derivation rule is therefore required to separate implementation capability from business execution.

---

#### 16.3 Derivation Principle

Service is derived from implementation capability.

Whenever a Step requires work that does not itself express business intent and may be reused independently of a specific Workflow, that work becomes a Service.

A Service exists to support business execution rather than define it.

Therefore:

> Every Service represents one reusable implementation capability that is independent of workflow semantics.

Business intent never determines Service boundaries.

Reuse does.

---

#### 16.4 Derivation Algorithm

The derivation process SHALL be performed in the following order.

##### Step 1

Take a previously derived Step set.

Inspect the implementation required by each Step.

Ignore workflow semantics.

Focus only on implementation work.

---

##### Step 2

For each implementation task, ask:

> Does this work itself express business intent?

If the answer is **Yes**, it remains inside the Step.

If the answer is **No**, continue to Step 3.

---

##### Step 3

Ask:

> Could this implementation capability reasonably be reused by another Step or another Workflow without changing its meaning?

If the answer is **No**, it remains inside the Step.

If the answer is **Yes**, continue to Step 4.

---

##### Step 4

Extract the implementation capability into a Service.

The Service SHALL receive all required information through explicit parameters.

It SHALL remain independent of Workflow, StateMachine, Rule and Store.

---

##### Step 5

Repeat until every reusable implementation capability has been separated from business execution.

The resulting collection forms the complete Service set.

---

#### 16.5 Decision Criteria

A derived Service set is considered correct only if all of the following conditions are satisfied.

##### Criterion 1 — Implementation Capability

Every Service provides implementation capability rather than business intent.

---

##### Criterion 2 — Reusability

Every Service can be reused by multiple Steps or Workflows without acquiring workflow semantics.

---

##### Criterion 3 — Independence

Every Service depends only on its explicit inputs.

It has no knowledge of Workflow, StateMachine, Rule or Store.

---

##### Criterion 4 — Business Isolation

Removing a Service changes implementation structure but does not alter business semantics.

Business meaning remains entirely within the Step.

---

##### Criterion 5 — Responsibility Separation

Implementation capability is fully separated from business execution.

No Service performs business decision or workflow coordination.

---

#### 16.6 Counter Examples

##### submitTask()

Represents a business action.

It remains a Step.

---

##### CanApproveTask()

Represents business policy.

It becomes a Rule.

---

##### TaskReady

Represents a business fact.

It becomes a State.

---

##### TaskStateMachine

Coordinates workflow evolution.

It is not a Service.

---

##### updateTaskStore()

Represents direct business data modification.

Business data updates belong to Step rather than Service.

---

#### 16.7 Rationale

Business execution and implementation capability evolve at different rates.

Business intent is relatively stable.

Implementation frequently changes due to technology, infrastructure or optimization.

By deriving Services from reusable implementation capability rather than business semantics, Workflow Architecture isolates implementation change from workflow evolution.

As

---

## Part IV. Architecture Grammar

---

### Chapter 17. Responsibility Matrix

---

#### 17.1 Purpose

This chapter defines the responsibility boundaries of every architectural concept.

Workflow Architecture is founded upon explicit responsibility separation.

Every concept exists to fulfill one unique architectural responsibility.

No responsibility shall belong to multiple concepts.

Likewise, no concept shall assume responsibilities outside its architectural purpose.

This chapter establishes the normative ownership model for the entire architecture.

---

#### 17.2 Responsibility Matrix

| Concept      | Defines  | Coordinates | Decides | Executes   | Owns Data | Owns State |
| ------------ | -------- | ----------- | ------- | ---------- | --------- | ---------- |
| Workflow     | ✓        |             |         |            |           |            |
| StateMachine |          | ✓           |         |            |           | ✓          |
| State        |          |             |         |            |           | Represents |
| Event        | Requests |             |         |            |           |            |
| Rule         |          |             | ✓       |            |           |            |
| Step         |          |             |         | ✓          | Writes    |            |
| Service      |          |             |         | Implements |           |            |
| Store        |          |             |         |            | ✓         |            |

##### Normative Interpretation

The matrix SHALL be interpreted as ownership rather than capability.

For example:

- A Step may invoke a Service.
- A Service may perform implementation work.

However, implementation capability remains owned by Service rather than Step.

Similarly:

- A StateMachine owns workflow coordination.
- A Rule owns business decision.

No architectural concept may assume ownership already assigned to another concept.

---

#### 17.3 Responsibility Rules

The following rules are normative.

##### Workflow

Workflow SHALL define business boundaries.

Workflow SHALL NOT coordinate execution.

Workflow SHALL NOT own business data.

Workflow SHALL NOT implement business logic.

---

##### StateMachine

StateMachine SHALL coordinate workflow evolution.

StateMachine SHALL own State transitions.

StateMachine SHALL NOT evaluate business policy directly.

StateMachine SHALL NOT modify Store.

StateMachine SHALL NOT invoke another StateMachine.

---

##### State

State SHALL represent one observable business fact.

State SHALL NOT contain business data.

State SHALL NOT execute business logic.

State SHALL NOT represent execution progress.

---

##### Event

Event SHALL represent business intention.

Event SHALL be the sole external input of a StateMachine.

Event SHALL NOT execute business logic.

Event SHALL NOT modify Store.

---

##### Rule

Rule SHALL evaluate business policy.

Rule SHALL return only a boolean result.

Rule SHALL remain side-effect free.

Rule SHALL NOT perform business execution.

---

##### Step

Step SHALL execute one business action.

Step SHALL be the only architectural concept permitted to modify Store.

Step SHALL NOT coordinate workflow evolution.

Step SHALL NOT determine whether execution is permitted.

---

##### Service

Service SHALL provide reusable implementation capability.

Service SHALL remain independent of Workflow semantics.

Service SHALL NOT access Store.

Service SHALL NOT evaluate Rule.

---

##### Store

Store SHALL own business data.

Store SHALL NOT execute business logic.

Store SHALL NOT coordinate workflow evolution.

Store SHALL NOT determine business policy.

---

#### 17.4 Consistency Rules

The architecture SHALL satisfy all of the following conditions.

##### Single Responsibility

Each architectural responsibility SHALL have exactly one owner.

Responsibilities SHALL NOT overlap.

---

##### Single Authority

Every architectural decision SHALL have one authoritative concept.

Competing authorities are prohibited.

---

##### Single Execution Boundary

Business execution SHALL occur only inside Step.

All business data modification SHALL therefore originate from Step.

---

##### Single Decision Boundary

Business policy SHALL be evaluated only by Rule.

Execution and decision SHALL remain independent.

---

##### Single Coordination Boundary

Workflow evolution SHALL be coordinated only by StateMachine.

No other concept may coordinate workflow progression.

---

##### Semantic Independence

Business semantics SHALL remain independent of implementation structure.

Changing implementation SHALL NOT require redefining architectural responsibilities.

---

#### 17.5 Summary

Workflow Architecture is founded upon explicit ownership rather than shared capability.

Every architectural concept owns exactly one category of responsibility.

This responsibility matrix establishes the normative ownership model upon which all dependency rules, interaction rules and project organization are derived.

No architectural concept may assume responsibilities owned by another.

---

### Chapter 18. Dependency Rules

---

#### 18.1 Purpose

This chapter defines the normative dependency rules of Workflow Architecture.

Responsibility determines **who owns** an architectural concern.

Dependency determines **who may know whom**.

By explicitly restricting dependencies, Workflow Architecture prevents responsibility leakage and preserves architectural stability as the system evolves.

---

#### 18.2 Dependency Matrix

The following table specifies the normative dependency relationships between architectural concepts.

| From \ To    | Workflow | StateMachine  | State         | Event | Rule | Step | Service | Store         |
| ------------ | -------- | ------------- | ------------- | ----- | ---- | ---- | ------- | ------------- |
| Workflow     | —        | ✓             |               |       |      |      |         |               |
| StateMachine | ✓        | —             | ✓             | ✓     | ✓    | ✓    |         |               |
| State        |          |               | —             |       |      |      |         |               |
| Event        |          |               |               | —     |      |      |         |               |
| Rule         |          | ✓ (Read Only) | ✓ (Read Only) |       | —    |      |         | ✓ (Read Only) |
| Step         |          |               |               |       |      | —    | ✓       | ✓             |
| Service      |          |               |               |       |      |      | —       |               |
| Store        |          |               |               |       |      |      |         | —             |

---

#### 18.3 Dependency Rules

The following rules are normative.

##### Workflow

Workflow MAY own one StateMachine.

Workflow SHALL NOT depend upon any other architectural concept.

---

##### StateMachine

StateMachine MAY reference:

- its own States;
- Events;
- Rules;
- Steps.

StateMachine SHALL NOT reference:

- Store;
- Service;
- another StateMachine.

---

##### State

State SHALL NOT depend upon any architectural concept.

A State is a pure business fact.

---

##### Event

Event SHALL NOT depend upon any architectural concept.

Its meaning is defined solely by business intention.

---

##### Rule

Rule MAY read:

- any StateMachine;
- any State;
- any Store.

Rule SHALL NOT:

- modify Store;
- invoke Step;
- invoke Service;
- dispatch Event.

---

##### Step

Step MAY:

- invoke Service;
- read Store;
- modify Store.

Step SHALL NOT:

- invoke StateMachine;
- dispatch Event;
- evaluate Rule as an execution precondition.

---

##### Service

Service SHALL depend only upon its explicit inputs.

Service SHALL NOT reference:

- Workflow;
- StateMachine;
- State;
- Event;
- Rule;
- Store.

---

##### Store

Store SHALL NOT depend upon any architectural concept.

---

#### 18.4 Dependency Principles

Every dependency SHALL satisfy the following principles.

##### Principle 1 — Directional Dependency

Dependencies SHALL always flow from orchestration toward implementation.

Implementation SHALL never depend upon orchestration.

---

##### Principle 2 — No Cycles

Architectural dependency cycles are prohibited.

No concept may indirectly depend upon itself through another architectural concept.

---

##### Principle 3 — Semantic Independence

Business semantics SHALL NOT depend upon implementation details.

Implementation MAY change without altering architectural meaning.

---

##### Principle 4 — Explicit Access

Whenever a concept requires information from another concept, that dependency SHALL be explicitly permitted by this chapter.

Implicit access is prohibited.

---

##### Principle 5 — Minimal Knowledge

Every concept SHALL know only the minimum set of architectural concepts necessary to fulfill its responsibility.

Additional dependencies are prohibited even if technically possible.

---

#### 18.5 Dependency Hierarchy

The normative dependency hierarchy is illustrated below.

```text
Workflow
    │
    ▼
StateMachine
    │
    ├──────────────┐
    ▼              ▼
 State           Rule
                  │
                  ▼
                Store

StateMachine
    │
    ▼
 Step
    │
    ├───────────┐
    ▼           ▼
Store      Service
```

The hierarchy defines dependency only.

It does not describe execution order.

---

#### 18.6 Summary

Workflow Architecture enforces strict dependency boundaries.

A dependency is permitted only when required by architectural responsibility.

Every dependency flows in a single direction, cycles are prohibited, and implementation remains isolated from business semantics.

These dependency rules preserve architectural stability and prevent responsibility from leaking across concept boundaries.

---

### Chapter 19. Interaction Rules

---

#### 19.1 Purpose

This chapter defines the normative interaction rules between architectural concepts.

Dependency specifies which concepts may know each other.

Interaction specifies how architectural responsibilities collaborate during workflow execution.

Workflow Architecture distinguishes structural dependency from runtime interaction.

A permitted dependency does not necessarily imply a permitted interaction.

---

#### 19.2 Interaction Matrix

The following matrix specifies all normative runtime interactions.

| Initiator      | Receiver     | Interaction  | Result                                 |
| -------------- | ------------ | ------------ | -------------------------------------- |
| External Actor | Event        | Create       | Business request is created            |
| Event          | StateMachine | Submit       | Workflow execution is requested        |
| StateMachine   | Rule         | Evaluate     | Business policy is evaluated           |
| StateMachine   | Step         | Execute      | Business action begins                 |
| Step           | Service      | Invoke       | Implementation capability is performed |
| Step           | Store        | Read / Write | Business data is accessed              |
| Rule           | Store        | Read         | Business snapshot is evaluated         |
| Rule           | StateMachine | Read         | Business state is evaluated            |

All other runtime interactions are prohibited unless explicitly defined by this specification.

---

#### 19.3 Interaction Rules

The following interaction rules are normative.

##### External Actor → Event

External actors MAY create Events.

External actors SHALL NOT invoke StateMachine directly.

---

##### Event → StateMachine

Events SHALL submit requests to exactly one StateMachine.

Events SHALL NOT bypass the StateMachine.

---

##### StateMachine → Rule

StateMachine MAY evaluate one or more Rules before determining workflow evolution.

StateMachine SHALL NOT evaluate business policy directly.

---

##### StateMachine → Step

StateMachine MAY coordinate one or more Steps.

StateMachine SHALL NOT execute business actions itself.

---

##### Step → Service

Step MAY invoke one or more Services.

Service invocation SHALL remain an implementation concern.

---

##### Step → Store

Step MAY read Store.

Step MAY modify Store.

No other architectural concept may modify Store.

---

##### Rule → Store

Rule MAY read Store.

Rule SHALL NOT modify Store.

---

##### Rule → StateMachine

Rule MAY read the current State of any StateMachine as part of the application snapshot.

Rule SHALL NOT modify any StateMachine.

---

#### 19.4 Prohibited Interactions

The following interactions are explicitly prohibited.

| Interaction            | Reason                                          |
| ---------------------- | ----------------------------------------------- |
| UI → StateMachine      | Breaks the Event boundary                       |
| Service → Store        | Breaks the business data boundary               |
| Service → Rule         | Couples implementation to business policy       |
| Service → StateMachine | Couples implementation to workflow coordination |
| Step → Event           | Breaks workflow authority                       |
| Step → StateMachine    | Creates recursive workflow coordination         |
| Rule → Step            | Couples decision to execution                   |
| Rule → Service         | Couples policy to implementation                |
| Store → Any Concept    | Store is passive                                |
| State → Store          | Business facts do not manipulate data           |
| Event → Step           | Bypasses workflow coordination                  |

These prohibitions are normative and SHALL NOT be violated.

---

#### 19.5 Interaction Principles

Every runtime interaction SHALL satisfy the following principles.

##### Principle 1 — Single Entry

Every workflow execution SHALL begin with an Event.

No alternative entry point is permitted.

---

##### Principle 2 — Single Coordinator

Every business action SHALL be coordinated by exactly one StateMachine.

Parallel coordinators are prohibited.

---

##### Principle 3 — Decision Before Execution

Business policy SHALL be evaluated before business execution begins.

Execution SHALL NOT determine permission.

---

##### Principle 4 — Execution Before Persistence

Business execution SHALL determine business data changes.

Persistence SHALL NOT drive workflow evolution.

---

##### Principle 5 — Passive Data

Store SHALL never initiate workflow execution.

Business data is passive.

Workflow progression is active.

---

##### Principle 6 — Explicit Collaboration

Every runtime interaction SHALL correspond to an explicitly permitted interaction defined by this chapter.

Implicit collaboration is prohibited.

---

#### 19.6 Canonical Execution Flow

The normative execution flow is illustrated below.

```text
External Actor
        │
        ▼
      Event
        │
        ▼
   StateMachine
        │
        ├──────────────┐
        ▼              ▼
      Rule          Step
        │              │
        ▼              ├────────────┐
      Store            ▼            ▼
                    Service      Store
```

This flow represents the canonical execution model of Workflow Architecture.

Alternative execution paths SHALL preserve the interaction rules defined by this chapter.

---

#### 19.7 Summary

Workflow Architecture defines not only which concepts may depend upon one another, but also how they are permitted to collaborate at runtime.

Every workflow begins with an Event, every business decision is performed by Rule, every business action is executed by Step, every implementation capability is provided by Service, and every business data modification occurs through Step.

These interaction rules establish the canonical runtime behavior of the architecture and preserve strict responsibility boundaries.

---

### Chapter 20. Project Organization

---

#### 20.1 Purpose

This chapter defines the normative project organization of Workflow Architecture.

The purpose of project organization is not to determine architecture.

Architecture has already been established by the concepts, derivation rules and grammar defined in previous chapters.

Instead, project organization provides a consistent way to express the architecture within a software project so that both humans and tools can navigate it predictably.

Directory structure is therefore a representation of the architecture rather than the architecture itself.

---

#### 20.2 Organization Principles

Project organization SHALL satisfy the following principles.

##### Principle 1 — Architecture First

Directories SHALL reflect architectural concepts rather than technical layers, frameworks or business domains.

---

##### Principle 2 — Semantic Locality

Files SHOULD be placed near the Workflow that most naturally represents their business meaning.

Physical location does not imply ownership.

---

##### Principle 3 — Logical Ownership

Architectural ownership SHALL be determined by responsibility rather than file location.

Moving a file SHALL NOT change its architectural meaning.

---

##### Principle 4 — Discoverability

Developers SHALL be able to locate every architectural concept through a predictable directory structure.

---

##### Principle 5 — Refactor Safety

Project organization SHALL allow reusable artifacts to move without requiring architectural redesign.

---

#### 20.3 Recommended Directory Structure

A Workflow SHOULD be organized as follows.

```text
└───src/
    ├───stores/
    │       taskStore.ts
    │
    ├───workflows/
    │   └───TaskDraftToTaskReady/
    │       │   index.ts
    │       │   README.md
    │       │   stateMachine.ts
    │       │
    │       ├───events/
    │       │       requestTaskList.ts
    │       │       submitTask.ts
    │       │
    │       ├───rules/
    │       │       canSubmitTask.ts
    │       │
    │       ├───services/
    │       │       taskApi.ts
    │       │       taskRepository.ts
    │       │
    │       └───steps/
    │               requestTaskList.ts
    │               submitTask.ts
    └───...
```

This structure is recommended rather than mandatory.

Equivalent organizations MAY be adopted provided they preserve the architectural grammar defined by this specification.

---

#### 20.4 File Naming Rules

The following naming rules are normative.

##### Workflow

Workflow directories SHALL use PascalCase.

The directory name SHALL describe the complete business evolution represented by the Workflow.

Whenever practical, Workflow names SHALL follow the canonical form:

`<InitialBusinessState>To<TerminalBusinessState>`

Examples:

TaskDraftToTaskReady
GoalSelectedToGoalUpdated
GoalSelectedToGoalDeleted
AttachmentReadyToAttachmentUploaded

Counter Examples:

TaskManagement
GoalManagement
TaskPanel
LayerFeature

These names describe domains, modules or UI structures rather than business evolution.

GoalManagementWorkflow
TaskManagementWorkflow
LayerManagementWorkflow

These names describe business domains or software modules rather than complete business evolution.

---

##### StateMachine

Every Workflow SHALL expose exactly one `stateMachine.ts`.

The corresponding `index.ts` SHALL export exactly one StateMachine instance representing that Workflow.

---

##### Event

Event files SHOULD use camelCase.

Names SHALL describe business intention.

Examples:

```text
submitTask.ts
requestTaskList.ts
cancelApproval.ts
```

---

##### Rule

Rule files SHOULD use camelCase.

Names SHOULD begin with a business predicate.

Examples:

```text
canSubmitTask.ts
isLayerReady.ts
hasSelectedTarget.ts
```

---

##### Step

Step files SHOULD use camelCase.

Names SHALL describe the business action performed.

Examples:

```text
submitTask.ts
requestTaskList.ts
approveTask.ts
```

---

##### Service

Service files SHOULD use camelCase.

Names SHALL describe the implementation capability provided.

Examples:

```text
taskApi.ts
httpClient.ts
terrainAnalysis.ts
```

---

##### Store

Store files SHOULD use camelCase.

Names SHALL follow existing project conventions.

Examples:

```text
taskStore.ts
layerStore.ts
iconStore.ts
```

---

#### 20.5 Organization Rules

The following rules are normative.

##### Rule 1 — One Workflow, One StateMachine

Each Workflow SHALL contain exactly one StateMachine.

---

##### Rule 2 — Index as Workflow Boundary

Each Workflow SHALL expose a single architectural entry through `index.ts`.

Consumers SHOULD interact with the Workflow through this entry point.

---

##### Rule 3 — Physical Location Does Not Define Ownership

Steps, Rules and Services MAY be physically relocated without changing their architectural responsibility.

Directory placement is solely an aid to discoverability.

---

##### Rule 4 — Reusable Components

When a Step, Rule or Service becomes broadly reusable, it MAY be extracted to another shared location.

Extraction SHALL NOT change its architectural role.

---

##### Rule 5 — Stable Navigation

Project organization SHOULD minimize the cognitive effort required to locate architectural concepts.

Developers SHOULD be able to infer file locations from architectural responsibility alone.

---

#### 20.6 Rationale

Workflow Architecture separates logical ownership from physical organization.

Responsibility determines architecture.

Directories merely improve discoverability.

This distinction allows reusable Rules, Steps and Services to evolve naturally without affecting architectural semantics.

As projects grow, files may move to improve reuse or maintainability while preserving the same conceptual model.

The architecture therefore remains stable even as the project structure evolves.

---

#### 20.7 Summary

Project organization is the physical representation of Workflow Architecture.

Directories exist to improve navigation rather than define ownership.

Every Workflow exposes one StateMachine, every architectural concept has a predictable location, and reusable artifacts may be reorganized without changing their architectural meaning.

By separating architectural responsibility from directory structure, Workflow Architecture preserves both semantic stability and long-term maintainability.

---

## Part V. Validation

---

### Chapter 21. Architecture Verification Checklist

---

#### 21.1 Purpose

This chapter defines a formal verification system for Workflow Architecture.

The purpose of this checklist is not to evaluate code quality, engineering preference, or implementation style.

Instead, it verifies whether a system is structurally consistent with the architectural axioms, derivation rules, and grammar defined in this handbook.

Each checklist item is a **proof obligation**.

If any item fails, the architecture is considered invalid under Workflow Architecture theory.

---

#### 21.2 Verification Principle

Verification is performed through **traceable correspondence**:

- Every check MUST map to at least one:
  - Concept definition (Part II)
  - Derivation rule (Part III)
  - Grammar constraint (Part IV)

No check is allowed to exist without theoretical grounding.

---

#### 21.3 Workflow Boundary Verification

##### V1 — Unique Workflow Boundary

Each Workflow MUST represent exactly one business process boundary.

- No overlapping business processes.
- No partial workflows spanning multiple unrelated domains.

---

##### V2 — No Global State Machine

The system MUST NOT contain a single StateMachine governing multiple unrelated workflows.

Each Workflow MUST own exactly one StateMachine.

---

##### V3 — Workflow Completeness

Every business process MUST be fully contained within a Workflow boundary.

No business process is allowed to exist outside a Workflow.

---

#### 21.4 State Verification

##### V4 — State is Business Fact Only

All States MUST represent stable, observable business facts.

States MUST NOT represent:

- UI status
- execution progress
- temporary conditions
- intermediate runtime signals

---

##### V5 — State Stability

States MUST be:

- durable across reload
- recoverable from persistence
- independent of execution timing

---

##### V6 — No State Explosion

States MUST be derived from Workflow boundary only.

States MUST NOT be derived from implementation artifacts.

---

#### 21.5 Event Verification

##### V7 — Event as Sole Entry Point

All workflow transitions MUST be initiated via Events.

No alternative entry paths are allowed.

---

##### V8 — Event is Intent Only

Events MUST represent business intention.

Events MUST NOT represent:

- UI interactions
- implementation triggers
- system callbacks

---

##### V9 — Event Uniqueness

Each distinct business intention MUST map to exactly one Event.

---

#### 21.6 Rule Verification

##### V10 — Rule is Pure Predicate

Rules MUST:

- return boolean only
- have no side effects
- be deterministic under same snapshot

---

##### V11 — Rule Snapshot Isolation

Rules MUST only depend on:

- StateMachine snapshot
- Store snapshot

Rules MUST NOT depend on:

- execution order
- UI state
- runtime environment

---

##### V12 — Rule Non-Execution Constraint

Rules MUST NOT perform:

- data mutation
- API calls
- workflow transitions

---

#### 21.7 Step Verification

##### V13 — Step is Exclusive Execution Unit

All business execution MUST occur inside Steps.

No other concept may modify business data.

---

##### V14 — Step Does Not Decide

Steps MUST NOT determine:

- whether execution is allowed
- whether workflow transitions occur

---

##### V15 — Step Single Responsibility

Each Step MUST correspond to one business action.

---

#### 21.8 Service Verification

##### V16 — Service is Pure Capability

Services MUST:

- provide reusable implementation capability
- remain independent of Workflow semantics

---

##### V17 — Service Isolation

Services MUST NOT access:

- StateMachine
- Rule
- Event
- Workflow

---

##### V18 — Service Reuse Criterion

A Service MUST only exist if:

- it is reusable across multiple Steps OR
- it isolates non-business implementation logic

---

#### 21.9 StateMachine Verification

##### V19 — Single Coordinator Principle

Each Workflow MUST have exactly one StateMachine.

---

##### V20 — No Business Execution in StateMachine

StateMachine MUST NOT:

- execute Steps
- mutate Store
- perform business logic

---

##### V21 — Coordination Only

StateMachine MUST only:

- evaluate Rules
- coordinate Steps
- transition States

---

#### 21.10 Store Verification

##### V22 — Store is Passive Data Container

Store MUST NOT:

- initiate workflow
- contain business logic
- influence decision making

---

##### V23 — Store Mutability Constraint

Store MAY only be modified by Steps.

---

#### 21.11 Dependency Verification

##### V24 — No Cyclic Dependencies

No architectural cycle is permitted.

---

##### V25 — Directional Dependency Enforcement

Dependencies MUST follow:

Workflow → StateMachine → Step → Service

Rule may read but not initiate execution.

---

#### 21.12 Interaction Verification

##### V26 — Event Driven Entry

All execution MUST begin with Event dispatch.

---

##### V27 — Execution Path Integrity

Execution MUST follow:

Event → StateMachine → Rule → Step → Service

---

##### V28 — No Shortcut Execution

No component may bypass the StateMachine.

---

#### 21.13 Cross-Cutting Verification

##### V29 — Responsibility Uniqueness

Each responsibility MUST have exactly one owning concept.

---

##### V30 — Separation of Concerns

Decision, execution, coordination, and data MUST remain isolated.

---

##### V31 — Determinism

Given identical snapshot and Event, system MUST produce identical result.

---

#### 21.14 Final Validation Rule

A system is considered **valid Workflow Architecture** if and only if:

> ALL verification rules V1–V31 pass without exception.

Failure of any single rule invalidates architectural compliance.

---

#### 21.15 Summary

This checklist defines a formal verification system for Workflow Architecture.

It transforms architectural principles into falsifiable constraints.

A system is not considered “well-designed” unless it can satisfy all proof obligations defined in this chapter.

---

### Chapter 22. Common Anti-patterns (Violation Patterns)

---

#### 22.1 Purpose

This chapter defines common violation patterns that break Workflow Architecture constraints.

Unlike Chapter 21, which defines positive verification rules, this chapter describes **negative architectural states**.

Each violation pattern demonstrates:

- how the architecture fails
- why it fails
- how to correct it

These patterns serve as **diagnostic references for debugging architecture violations**.

---

#### 22.2 Standard Violation Pattern Format

Each violation is defined using the following structure:

###### V{X} Violation: [Violation Name]

---

##### Description

A precise explanation of the architectural violation.

---

##### Example

A concrete scenario demonstrating the violation.

---

##### Violated Rule

Reference to one or more rules from Chapter 21.

---

##### Consequence

The architectural and system-level impact of the violation.

---

##### Correction

The correct architectural transformation that resolves the violation.

---

#### 22.3 V1 Violation: UI-Driven StateMachine Execution

##### Description

The StateMachine is directly triggered by UI components instead of Events.

This bypasses the Event abstraction layer and couples UI structure with workflow logic.

---

##### Example

A button click handler directly calls StateMachine transition logic instead of dispatching an Event.

---

##### Violated Rule

- V7 Event as Sole Entry Point
- V27 Execution Path Integrity
- V28 No Shortcut Execution

---

##### Consequence

- UI changes force workflow refactoring
- business logic becomes coupled to presentation layer
- StateMachine becomes dependent on frontend structure

---

##### Correction

All UI interactions MUST be converted into Events.

UI components must only dispatch Events, never directly invoke StateMachine.

---

#### 22.4 V2 Violation: Rule Contains Side Effects

##### Description

Rules perform operations beyond pure snapshot evaluation, such as API calls or state mutation.

This breaks the deterministic nature of Rules.

---

##### Example

A Rule calls a remote service to determine whether a task can be approved.

---

##### Violated Rule

- V10 Rule is Pure Predicate
- V11 Rule Snapshot Isolation
- V12 Rule Non-Execution Constraint

---

##### Consequence

- nondeterministic workflow behavior
- inconsistent decision results
- inability to reproduce system state

---

##### Correction

All external dependencies must be moved into Steps.

Rules must only evaluate snapshot data.

---

#### 22.5 V3 Violation: Step Performs Workflow Coordination

##### Description

A Step directly triggers another StateMachine transition.

This breaks the single coordination authority principle.

---

##### Example

A Step executes a task and directly triggers approval workflow transition.

---

##### Violated Rule

- V14 Step Does Not Decide
- V19 Single Coordinator Principle
- V28 No Shortcut Execution

---

##### Consequence

- recursive workflow execution loops
- unclear ownership of transitions
- unpredictable state progression

---

##### Correction

Steps must only execute business actions.

All workflow transitions must be initiated by StateMachine.

---

#### 22.6 V4 Violation: Service Accesses Store Directly

##### Description

A Service reads or modifies Store directly.

This couples implementation capability with business data.

---

##### Example

A Service directly updates task status in Store.

---

##### Violated Rule

- V17 Service Isolation
- V23 Store Mutability Constraint

---

##### Consequence

- hidden side effects
- loss of execution traceability
- violation of single mutation boundary

---

##### Correction

Only Steps may access Store.

Services must receive all required data via explicit parameters.

---

#### 22.7 V5 Violation: Multiple StateMachines per Workflow

##### Description

A single Workflow contains multiple StateMachines competing for control.

---

##### Example

A workflow has both TaskStateMachine and ApprovalStateMachine managing overlapping states.

---

##### Violated Rule

- V2 No Global State Machine
- V19 Single Coordinator Principle

---

##### Consequence

- conflicting state transitions
- duplicated workflow logic
- inability to reason about system state

---

##### Correction

Each Workflow MUST contain exactly one StateMachine.

All coordination must be centralized.

---

#### 22.8 V6 Violation: Store Contains Business Logic

##### Description

Store includes computed logic or workflow rules.

---

##### Example

Store automatically determines whether a task is approvable.

---

##### Violated Rule

- V22 Store is Passive Data Container
- V30 Separation of Concerns

---

##### Consequence

- hidden business logic
- unpredictable state changes
- tight coupling between data and behavior

---

##### Correction

All business logic must be moved into Rules or Steps.

Store must remain purely passive.

---

#### 22.9 Summary

Violation patterns represent systematic architectural failures.

They are not implementation bugs but structural violations of Workflow Architecture principles.

By mapping each violation to formal rules, the architecture becomes diagnosable, enforceable, and self-correcting.

---

### Chapter 23. Complete Example

---

#### 23.1 Purpose

This chapter provides a complete, end-to-end example of Workflow Architecture in practice.

The goal is not to demonstrate a real-world product, but to demonstrate **full theoretical consistency across all architectural layers**:

- Workflow
- State
- Event
- Rule
- Step
- Service
- Store
- StateMachine
- Validation rules (Chapter 21)
- Violation constraints (Chapter 22)

This chapter serves as the final proof that the architecture is internally coherent.

---

#### 23.2 Example Domain: Task Approval Workflow

We define a minimal but complete workflow:

> A task is created, submitted for approval, and either approved or rejected.

---

#### 23.3 Workflow Definition

##### Workflow Name

```
TaskDraftToTaskReady
```

##### Boundary

This Workflow covers:

- task creation
- task submission
- approval decision

It does NOT include:

- user authentication
- notification system
- UI rendering

---

#### 23.4 State Model (Derived from Chapter 12)

##### States

- TaskDraft
- TaskSubmitted
- TaskApproved
- TaskRejected

##### Interpretation

Each State represents a stable business fact:

- Task exists in editable form
- Task has been submitted for review
- Task has been approved
- Task has been rejected

---

#### 23.5 Event Model (Derived from Chapter 13)

##### Events

- CreateTask
- SubmitTask
- ApproveTask
- RejectTask

Each Event represents a business intention:

- create a task
- submit for approval
- approve
- reject

---

#### 23.6 Rule Model (Derived from Chapter 14)

##### Rules

- canSubmitTask
- canApproveTask
- canRejectTask

##### Example semantics:

- canSubmitTask → task is complete and valid
- canApproveTask → task is in submitted state
- canRejectTask → task is in submitted state

Rules are pure snapshot predicates.

---

#### 23.7 Step Model (Derived from Chapter 15)

##### Steps

- createTask
- submitTask
- approveTask
- rejectTask

Each Step performs one business action:

- persist task
- change status
- record decision

Steps are the only mutation layer.

---

#### 23.8 Service Model (Derived from Chapter 16)

##### Services

- taskRepository
- taskApiClient

##### Responsibilities

- taskRepository → persistence abstraction
- taskApiClient → external communication

Services contain no business logic.

---

#### 23.9 StateMachine Model

##### Single StateMachine

```
TaskWorkflowStateMachine
```

##### Responsibility

- receives Events
- evaluates Rules
- executes Steps
- transitions States

StateMachine does NOT:

- access Store directly
- execute business logic
- bypass Rules

---

#### 23.10 Execution Flow (Runtime Trace)

##### Scenario: Task Approval

1. External actor dispatches Event: `SubmitTask`

2. StateMachine receives Event

3. StateMachine evaluates Rule:
   - canSubmitTask → true

4. StateMachine executes Step:
   - submitTask

5. Step invokes Service:
   - taskRepository.save()

6. Store is updated:
   - TaskDraft → TaskSubmitted

7. StateMachine transitions State:
   - TaskSubmitted

---

#### 23.11 Validation Mapping (Chapter 21)

This example satisfies:

- V7 Event as Sole Entry Point
- V10 Rule is Pure Predicate
- V13 Step is Exclusive Execution Unit
- V16 Service is Pure Capability
- V19 Single Coordinator Principle
- V22 Store is Passive Data Container
- V31 Determinism

---

#### 23.12 Violation Resistance (Chapter 22)

This example explicitly avoids:

- UI-driven StateMachine execution (V1)
- Rule side effects (V2)
- Step coordinating workflows (V3)
- Service accessing Store (V4)
- multiple StateMachines (V5)
- Store containing logic (V6)

---

#### 23.13 Cross-Layer Consistency Proof

This example demonstrates:

##### 1. Derivation Consistency

Workflow → State → Event → Rule → Step → Service

Each layer is derived from the previous one.

---

##### 2. Responsibility Isolation

Each concept has exactly one responsibility.

---

##### 3. Execution Determinism

Given identical Event + snapshot:

→ identical execution result  
→ identical State transition

---

##### 4. Architectural Closure

All constraints in Part IV are satisfied simultaneously.

---

#### 23.14 Summary

This chapter demonstrates a fully consistent Workflow Architecture instance.

It confirms that:

- derivation rules are composable
- grammar rules are enforceable
- validation rules are satisfiable
- violation patterns are avoidable

The architecture is therefore not only theoretically defined but practically realizable under strict constraints.

---

### Chapter 24. Summary

> Status: Final

---

#### 24.1 Purpose

This chapter provides a structural summary of Workflow Architecture Validation.

It consolidates Part V into a single verification model and clarifies how all validation components relate to each other.

---

#### 24.2 Validation Model Overview

Part V defines a complete verification system composed of three layers:

##### 1. Positive Verification (Chapter 21)

Defines what **must be true**.

- Workflow correctness
- State validity
- Event integrity
- Rule purity
- Execution constraints
- Dependency rules
- Interaction rules

This layer defines the **valid architecture space**.

---

##### 2. Negative Verification (Chapter 22)

Defines what **must not exist**.

- UI-driven execution
- Rule side effects
- Step coordination leakage
- Service-store coupling
- multiple StateMachines
- logic in Store

This layer defines the **invalid architecture space**.

---

##### 3. Behavioral Validation (Chapter 23)

Defines what **must be observable in execution**.

- end-to-end workflow trace
- deterministic execution
- state transition correctness
- full-layer compliance

This layer defines the **runtime proof space**.

---

#### 24.3 Unified Validation Principle

A system is valid under Workflow Architecture if and only if:

1. It satisfies all positive constraints (Chapter 21)
2. It avoids all violation patterns (Chapter 22)
3. It produces correct execution behavior (Chapter 23)

These three perspectives are mutually necessary and jointly sufficient.

---

#### 24.4 Structural Closure of Part V

Part V forms a closed verification system:

```text
Specification (21)
      ↓
Violation Space (22)
      ↓
Runtime Proof (23)
      ↓
System Validity (24)
```

This ensures that architecture correctness is:

- definable
- falsifiable
- observable
- provable

---

#### 24.5 Final Statement

Workflow Architecture is not validated by convention or style.

It is validated by structural constraints, contradiction elimination, and execution consistency.

If a system passes Part V, it is not “well designed” —

it is **structurally valid under the Workflow Architecture model**.

---

## Part VI. Appendices

> _This section is reserved for future appendices._

---

### Chapter Template

Every chapter in Workflow Architecture Handbook MUST follow the same structure.

---

#### Status

Draft / Frozen

---

#### Purpose

Why this chapter exists.

---

#### Definition

Formal definition.

---

#### Responsibilities

What this concept MUST do.

---

#### Non-responsibilities

What this concept MUST NOT do.

---

#### Invariants

Properties that always remain true.

---

#### Relationships

Relationship with other architectural concepts.

---

#### Rationale

Why this concept exists.

Why existing concepts cannot replace it.

---

#### Examples

Representative examples.

---

#### Counter Examples

Examples that appear similar but do not belong to this concept.

---

#### Summary

Key conclusions of this chapter.
