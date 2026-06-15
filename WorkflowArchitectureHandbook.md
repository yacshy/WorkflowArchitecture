# Workflow Architecture Handbook

Version: 0.1

---

# 1. 背景

随着业务复杂度提升，项目通常会出现以下问题：

* 业务逻辑散落在组件、Store、API 调用中
* 状态切换与业务实现耦合
* 相同业务流程在多个地方重复实现
* 不同开发者采用不同抽象方式
* 需求迭代后难以定位业务流程

最终导致：

* 新需求难以扩展
* 代码可读性下降
* 状态流转难以追踪
* 团队协作成本增加

为解决上述问题，引入 Workflow Architecture。

---

# 2. 核心思想

业务目标与实现细节分离。

Workflow Architecture 将业务拆分为四个层次：

Workflow
↓
StateMachine
↓
Transition
↓
Service

各层职责单一，避免耦合。

---

# 3. 核心概念

## 3.1 Workflow

### 定义

Workflow 表示一个完整业务目标。

Workflow 关注：

"要完成什么"

而不是：

"如何完成"

---

### 示例

正确：

* TaskApprovalWorkflow
* LayerImportWorkflow
* IconPlotWorkflow
* EquipmentControlWorkflow

错误：

* DialogWorkflow
* TableWorkflow
* ButtonWorkflow

---

### 判断标准

如果一个业务目标可以独立存在，则应该成为 Workflow。

例如：

任务审批

即使没有界面也成立。

因此属于 Workflow。

而：

审批弹窗

只是界面表现形式。

不属于 Workflow。

---

## 3.2 StateMachine

### 定义

StateMachine 是 Workflow 的调度器。

负责管理：

* 当前状态
* 状态迁移
* Transition 调度
* 生命周期推进

---

### 职责

负责：

当前在哪

下一步允许去哪

不负责：

具体业务实现

---

### 示例

当前状态：

PendingApproval

允许：

ApproveTransition
RejectTransition

禁止：

SubmitTransition

---

## 3.3 State

### 定义

State 表示业务对象所处的稳定状态。

---

### 特征

稳定

可持久化

系统重启后仍然成立

---

### 正确示例

Draft

PendingApproval

Approved

Rejected

Completed

Cancelled

---

### 错误示例

Loading

Clicking

Saving

Hovering

这些属于过程，而不是状态。

---

## 3.4 Transition

### 定义

Transition 表示一次状态迁移过程。

负责：

组织业务流程

调用 Service

产生新的 State

---

### 特征

Transition 对应一条边。

而不是一个状态。

---

### 正确示例

SubmitTransition

ApproveTransition

RejectTransition

CancelTransition

---

### 错误示例

DraftTransition

PendingApprovalTransition

ApprovedTransition

这些描述的是状态而不是行为。

---

### 示例

Draft
↓ SubmitTransition
PendingApproval

Transition 中可能包含：

* 数据校验
* 数据保存
* 创建审批任务
* 发送通知

---

## 3.5 Service

### 定义

Service 表示可复用业务能力。

负责具体执行。

---

### 特征

无状态

可复用

可测试

---

### 正确示例

saveTask()

createApprovalTask()

sendNotification()

updateLayer()

---

### 错误示例

approveWorkflow()

submitWorkflow()

这些已经属于流程编排。

不属于 Service。

---

# 4. 建模原则

## Principle 1

Workflow 对应业务目标

不要对应页面。

不要对应组件。

不要对应弹窗。

---

## Principle 2

State 必须是稳定状态

能够持久化。

能够被恢复。

能够用于描述当前业务阶段。

---

## Principle 3

Transition 必须表达行为

使用动词命名。

例如：

Approve

Reject

Submit

Cancel

---

## Principle 4

Service 必须无状态

Service 不保存流程状态。

状态由 StateMachine 管理。

---

## Principle 5

Transition 负责编排

Service 负责执行

例如：

ApproveTransition

负责：

* save()
* notify()
* createLog()

Service 只负责具体执行。

---

# 5. 建模流程

收到需求后按照以下步骤分析。

---

## Step1

识别业务目标

回答：

这个需求最终想完成什么？

得到：

Workflow

---

## Step2

识别核心业务对象

回答：

是谁在经历生命周期？

得到：

Entity

例如：

Task

Layer

Equipment

Mission

---

## Step3

识别生命周期

回答：

业务对象会经历哪些阶段？

例如：

Draft
↓
PendingApproval
↓
Approved

---

## Step4

识别 State

将生命周期中的稳定阶段提取出来。

---

## Step5

识别 Transition

寻找：

状态A
↓
状态B

之间发生的行为。

---

## Step6

识别 Service

寻找：

哪些动作是可复用能力。

例如：

save()

sendNotification()

queryEquipment()

---

# 6. 设计模式

## Human In The Loop

流程需要等待用户操作。

例如：

Draft
↓ Submit
PendingApproval

等待用户审批

PendingApproval
↓ Approve
Approved

---

## Long Running Workflow

流程可能持续数小时甚至数天。

例如：

CreateOrder
↓
PendingPayment

等待支付

↓
Paid

---

## External Callback

流程依赖外部系统。

例如：

SubmitMission
↓
WaitingCallback

收到后端回调

↓
Completed

---

# 7. 反模式

## Anti Pattern 1

Workflow = 页面

错误：

LayerPanelWorkflow

正确：

LayerImportWorkflow

---

## Anti Pattern 2

Transition = State

错误：

PendingApprovalTransition

正确：

ApproveTransition

---

## Anti Pattern 3

Service 编排流程

错误：

approveTask()

内部包含：

save()
notify()
createLog()

正确：

ApproveTransition 负责编排。

Service 负责执行。

---

## Anti Pattern 4

状态过细

错误：

LoadingData

Validating

Saving

这些通常属于过程。

不应该成为 State。

---

# 8. 示例

## Task Approval Workflow

### States

Draft

PendingApproval

Approved

Rejected

---

### Transitions

SubmitTransition

Draft
↓
PendingApproval

---

ApproveTransition

PendingApproval
↓
Approved

---

RejectTransition

PendingApproval
↓
Rejected

---

### Services

saveTask()

createApprovalTask()

sendNotification()

---

# 9. 架构评审检查清单

新增需求时必须检查：

[ ] 是否真的需要新增 Workflow

[ ] Workflow 是否对应业务目标

[ ] State 是否属于稳定状态

[ ] Transition 是否描述行为

[ ] Service 是否保持无状态

[ ] 是否出现 Service 编排流程

[ ] 是否出现 UI 驱动建模

[ ] 是否出现状态爆炸

[ ] 是否能够画出清晰状态图

---

# 10. 一句话原则

Workflow 决定业务目标。

StateMachine 决定何时执行。

Transition 决定执行哪些步骤。

Service 决定具体如何执行。

任何需求都必须先完成建模，再开始编码。
