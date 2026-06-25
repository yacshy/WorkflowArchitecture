## 1. Requirements Analysis

### Summary of the understood requirements and business context.

- **Business Context**: A task management system where users can create draft tasks, submit them for review, and have them either approved to a ready state or returned to the draft state if not approved.

---

## 2. Workflow Identification

### List of identified workflows with their boundaries (initial state → final state).

1. **TaskDraftToTaskReady**
   - Initial State: TaskDraft
   - Final State: TaskReady

---

## 3. Detailed Design per Workflow

### Workflow: TaskDraftToTaskReady

- **Description**: This workflow manages the transition from a draft task to a ready task after successful review.

#### StateMachine

State transitions:

1. TaskDraft → TaskReviewing
2. TaskReviewing → TaskReady (if approved)
3. TaskReviewing → TaskDraft (if rejected)

#### States

| State | Description |
|-------|------------|
| **TaskDraft** | A task that has been created but not yet submitted for review. |
| **TaskReviewing** | A task that is currently under review by an approver. |
| **TaskReady** | A task that has been approved and is ready to be executed. |

#### Events

| Event | Source Transition | Description |
|-------|-----------------|------------|
| **SubmitForReview** | TaskDraft → TaskReviewing | User submits a draft task for review. |
| **ApproveTask** | TaskReviewing → TaskReady | Approver approves the task. |
| **RejectTask** | TaskReviewing → TaskDraft | Approver rejects the task, returning it to the draft state. |

#### Rules

| Rule | Evaluated For | Condition |
|------|--------------|-----------|
| **CanSubmitForReview** | TaskDraft → TaskReviewing | The user has created a valid task and is authorized to submit for review. |
| **CanApproveTask** | TaskReviewing → TaskReady | The approver has reviewed the task and finds it meets all criteria. |
| **CanRejectTask** | TaskReviewing → TaskDraft | The approver finds issues with the task that need addressing before submission. |

#### Steps

| Step | Triggered By | Action |
|------|-------------|--------|
| **SubmitForReviewStep** | SubmitForReview | Saves the draft task and sends it for review. |
| **ApproveTaskStep** | ApproveTask | Marks the task as ready after approval. |
| **RejectTaskStep** | RejectTask | Returns the task to the draft state with feedback. |

#### Services

| Service | Used By Step(s) | Capability |
|---------|----------------|------------|
| **TaskApiService** | SubmitForReviewStep, ApproveTaskStep, RejectTaskStep | Handles API calls for creating and updating tasks. |

---

## 4. Directory Structure

Recommended file tree for the project.

```
src/
├── stores/
│   └── taskStore.ts
├── workflows/
│   └── TaskDraftToTaskReady/
│       ├── index.ts
│       ├── README.md
│       ├── stateMachine.ts
│       ├── events/
│       │   ├── submitForReview.ts
│       │   ├── approveTask.ts
│       │   └── rejectTask.ts
│       ├── rules/
│       │   ├── canSubmitForReview.ts
│       │   ├── canApproveTask.ts
│       │   └── canRejectTask.ts
│       ├── services/
│       │   └── taskApiService.ts
│       └── steps/
│           ├── submitForReviewStep.ts
│           ├── approveTaskStep.ts
│           └── rejectTaskStep.ts
└── ...
```

---

## 5. Store Design

Data structures needed.

```typescript
// src/stores/taskStore.ts
export interface Task {
    id: string;
    title: string;
    description: string;
    state: 'draft' | 'reviewing' | 'ready';
    feedback?: string; // Feedback for rejected tasks
}
```

---

## 6. Dependency Diagram

Allowed dependencies between components.

- `TaskStore` depends on `TaskApiService`.
- `StateMachine` uses events, rules, and steps.
- Steps use services to perform actions.

---

## 7. Notes and Considerations

- **User Authentication**: Ensure that only authorized users can submit tasks for review.
- **Feedback Mechanism**: Provide clear feedback to the user when a task is rejected, including specific reasons why it was not approved.
- **Error Handling**: Implement robust error handling in both steps and services to manage API failures or other issues gracefully.