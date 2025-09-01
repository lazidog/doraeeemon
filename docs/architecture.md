
# Clean Architecture in SpiritBattleBot

## Why Clean Architecture?

**Clean Architecture**, inspired by Robert C. Martin, is adopted for **SpiritBattleBot** to create a modular, testable, and maintainable codebase. The key motivations are:

- **Separation of Concerns**: Divides the application into distinct layers (Domain, Application, Infrastructure, Presentation), each with a specific role, reducing complexity and improving clarity.
- **Testability**: Isolates business logic from external systems (e.g., Mezon SDK), enabling unit tests without mocking external dependencies.
- **Framework Independence**: Decouples core logic from the Mezon SDK, allowing seamless integration with other platforms (e.g., Discord) by swapping infrastructure implementations.
- **Scalability**: Facilitates adding new features (e.g., new commands, skill effects, or persistence) with minimal changes to existing code.
- **Maintainability**: Clear layer boundaries simplify debugging, refactoring, and onboarding new developers.

## Folder Structure

├── src/
│   ├── domain/
│   │   ├── entities/
│   │   │   ├── spirit.ts
│   │   │   ├── monster.ts
│   │   │   ├── battle.ts
│   │   │   └── dungeon.ts
│   │   ├── interfaces/
│   │   │   ├── battle.repository.ts
│   │   │   ├── dungeon.repository.ts
│   │   │   └── message.service.ts
│   │   └── types.ts
│   ├── application/
│   │   ├── services/
│   │   │   ├── battle.service.ts
│   │   │   └── dungeon.service.ts
│   │   └── usecases/
│   │       ├── startBattle.ts
│   │       ├── handleBan.ts
│   │       ├── handlePick.ts
│   │       ├── joinDungeon.ts
│   │       └── getDungeonInfo.ts
│   ├── infrastructure/
│   │   ├── repositories/
│   │   │   ├── battle.repository.ts
│   │   │   ├── dungeon.repository.ts
│   │   │   └── spirit.repository.ts
│   │   └── mezon/
│   │       ├── mezon-message.service.ts
│   │       └── message.builder.ts
│   ├── presentation/
│   │   └── commands.ts
│   └── index.ts
└── docs/
    └── spirit.json

## Directory Responsibilities and Principles

The project is organized into directories under `src/`, each adhering to specific **Object-Oriented Programming (OOP)** principles and Clean Architecture guidelines.

### 1. `domain/`
- **Purpose**: Defines the core business logic, entities, and interfaces, independent of external frameworks or databases. This layer encapsulates the application's essence, such as spirit battles and dungeon events.
- **OOP Principles**:
  - **Single Responsibility Principle (SRP)**: Each entity (e.g., `Spirit`, `Battle`) handles one aspect of the domain.
  - **Dependency Inversion Principle (DIP)**: Interfaces define contracts without relying on implementation details.
  - **Encapsulation**: Entities expose only necessary data and behavior, hiding internal logic.
- **Subdirectories and Responsibilities**:
  - **`entities/`**:
    - **Files**: `spirit.ts`, `monster.ts`, `battle.ts`, `dungeon.ts`
    - **Responsibility**: Represents core business objects with their properties and rules. For example, `Spirit` and `Monster` define attributes (name, element, HP, skills), while `Battle` manages battle state (players, spirits, phase).
    - **Actions**: Implements business rules, such as calculating elemental damage (e.g., Fire vs. Grass deals 20 damage) or managing battle phases (ban, pick, battle).
    - **Example**: `Battle` class tracks players, spirits, and effects, ensuring rules like banning 6 spirits or picking 5 spirits per player are enforced.
  - **`interfaces/`**:
    - **Files**: `battle.repository.ts`, `dungeon.repository.ts`, `message.service.ts`
    - **Responsibility**: Defines contracts for data access (repositories) and external interactions (message service), ensuring loose coupling between layers.
    - **Actions**: Specifies methods like `create`, `findById` for repositories or `sendMessage`, `onButtonClick` for messaging, without dictating how they are implemented.
    - **Example**: `MessageService` interface allows sending messages and handling button clicks, abstracting the Mezon SDK.
  - **`types.ts`**:
    - **Responsibility**: Centralizes TypeScript types and enums (e.g., `Element`, `SkillType`, `SkillEffect`, `ELEMENTAL_ADVANTAGES`) for consistent use across the application.
    - **Actions**: Provides shared definitions, such as elemental relationships (e.g., Fire counters Ice) or skill effects (e.g., Buff, Heal).
    - **Example**: `Element` enum ensures valid elements are used in `Spirit` and `Monster` calculations.

### 2. `application/`
- **Purpose**: Orchestrates business logic through services and use cases, connecting the Domain layer to Infrastructure implementations.
- **OOP Principles**:
  - **Single Responsibility Principle (SRP)**: Each use case or service handles one specific task.
  - **Open/Closed Principle (OCP)**: New use cases can be added without modifying existing ones.
  - **Dependency Injection**: Services and use cases receive dependencies (e.g., repositories, message services) via constructors, enhancing testability.
- **Subdirectories and Responsibilities**:
  - **`services/`**:
    - **Files**: `battle.service.ts`, `dungeon.service.ts`
    - **Responsibility**: Implements reusable business workflows, coordinating entities and external services. For example, `BattleService` manages battle phases (ban, pick, combat) and sends messages.
    - **Actions**: Handles complex logic like simulating turn-based battles, applying skill effects (e.g., DOT, Heal), or managing dungeon gem pools.
    - **Example**: `BattleService` calculates damage, applies effects, and sends embeds with buttons (e.g., "Confirm Pick") during battles.
  - **`usecases/`**:
    - **Files**: `startBattle.ts`, `handleBan.ts`, `handlePick.ts`, `joinDungeon.ts`, `getDungeonInfo.ts`
    - **Responsibility**: Encapsulates specific application actions, combining business rules and external interactions. Each use case is a single, focused operation.
    - **Actions**: Executes commands like starting a battle or joining a dungeon, handling errors and coordinating with services.
    - **Example**: `StartBattle` creates a `Battle` entity and triggers the battle start logic in `BattleService`.

### 3. `infrastructure/`
- **Purpose**: Integrates external systems (Mezon SDK) and data storage (in-memory), implementing Domain interfaces.
- **OOP Principles**:
  - **Dependency Inversion Principle (DIP)**: Implements interfaces defined in the Domain layer, keeping business logic independent.
  - **Interface Segregation Principle (ISP)**: Repositories and services expose only necessary methods.
  - **Encapsulation**: Hides Mezon SDK details and in-memory storage mechanics from higher layers.
- **Subdirectories and Responsibilities**:
  - **`repositories/`**:
    - **Files**: `battle.repository.ts`, `dungeon.repository.ts`, `spirit.repository.ts`
    - **Responsibility**: Provides data access for `Battle`, `Dungeon`, and `Spirit` entities, currently using in-memory storage (no database/Redis).
    - **Actions**: Supports CRUD operations (e.g., `create`, `findById`) for battles and dungeons, and loads spirit/monster data from `spirit.json`.
    - **Example**: `ISpiritRepository` reads `spirit.json` and maps data to `Spirit` entities.
  - **`mezon/`**:
    - **Files**: `mezon-message.service.ts`, `message.builder.ts`
    - **Responsibility**: Integrates with Mezon SDK for messaging and formats embeds/buttons.
    - **Actions**: Sends messages, replies, and handles button clicks (`onMessageButtonClicked`) via `MezonMessageService`; formats `ChannelMessageContent` with `MessageFormatter`.
    - **Example**: `MessageFormatter` creates embeds with buttons (e.g., `battle_cancel_<id>`) for interactive responses.

### 4. `presentation/`
- **Purpose**: Manages user input (commands like `/pvp`, `/dungeon`) and output (messages with embeds/buttons).
- **OOP Principles**:
  - **Single Responsibility Principle (SRP)**: Handles command parsing and delegation to use cases.
  - **Dependency Injection**: Receives Mezon client and injects dependencies into use cases.
  - **Loose Coupling**: Interacts with Application layer via use cases, not directly with Domain or Infrastructure.
- **Files and Responsibilities**:
  - **`commands.ts`**:
    - **Responsibility**: Parses commands, delegates to use cases, and handles button clicks (e.g., `battle_confirm_<id>`).
    - **Actions**: Processes `/spirit list`, `/pvp challenge @user`, etc., and coordinates with `BattleService` or `DungeonService` for responses.
    - **Example**: For `/pvp challenge @user`, invokes `StartBattle` and sets up button listeners for canceling or starting battles.

### 5. `index.ts`
- **Purpose**: Application entry point, initializing the Mezon client and command handler.
- **OOP Principles**:
  - **Single Responsibility Principle (SRP)**: Only responsible for bootstrapping.
  - **Dependency Injection**: Passes the Mezon client to `CommandHandler`.
- **Responsibility**: Sets up Mezon client with configuration (token, host) and event listeners (`ready`, `error`, `onChannelMessage`).

## Adhered OOP Principles
- **Encapsulation**: Entities (`Spirit`, `Battle`) hide internal state; `MezonMessageService` abstracts SDK details.
- **Polymorphism**: Interfaces like `MessageService` allow swapping implementations (e.g., Mezon to Discord).
- **Single Responsibility Principle (SRP)**: Each class/file has one purpose (e.g., `BattleService` for battles, `MessageFormatter` for embeds).
- **Open/Closed Principle (OCP)**: New commands or effects can be added without modifying existing code.
- **Dependency Injection**: Dependencies are injected via constructors, enhancing flexibility and testability.

## Benefits
- **Modularity**: Layers are independent, simplifying updates and extensions.
- **Testability**: Domain/Application layers are testable without external dependencies.
- **Extensibility**: Easy to add new commands, skill effects, or persistence (e.g., database).
- **Maintainability**: Clear structure aids debugging and developer onboarding.

## Example Workflow
For `/pvp challenge @user`:
1. `presentation/commands.ts`: Parses command, calls `StartBattle`.
2. `application/usecases/startBattle.ts`: Creates `Battle`, invokes `BattleService`.
3. `application/services/battle.service.ts`: Uses `MessageService` to send embed with buttons (e.g., "Cancel Battle").
4. `infrastructure/mezon/`: Formats and sends message via Mezon SDK.