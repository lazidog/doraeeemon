# Doraeeemon

It's a Mezon bot :D

I name it "Doraeeemon" because it will do anything with Doraemon's gadgets

## Project Structure

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
└── package.json