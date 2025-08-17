# PetBattleBot - Final Game Design

## 1. Luật chơi & Flow PvP

-   **Ban/Pick**: Mỗi người chơi ban 3 pet đối thủ, sau đó pick 5 pet từ
    pool còn lại.
-   **Cơ chế Damage**:
    -   Khắc chế: 20 dmg
    -   Không khắc: 10 dmg
    -   Bị khắc: 0 dmg
-   **Lượt đánh**: Mỗi đòn tấn công đều chuyển lượt.
-   **Hiệu ứng đặc biệt**: Có thể xảy ra ngoài lượt (trigger, passive).
-   **Phân loại hiệu ứng**:
    -   Ảnh hưởng theo lượt (Round-based)
    -   Ảnh hưởng toàn trận (Battle-wide)

------------------------------------------------------------------------

## 2. Dungeon Event

-   **Kích hoạt**: Khi gem pool ≥ ngưỡng định sẵn.
-   **Cách tham gia**: Người chơi nộp phí gem để tham gia, chọn đội hình
    trước khi quái xuất hiện.
-   **Bắt đầu**: Khi đủ 100 người tham gia.
-   **Diễn biến**: Bot random quái, người chơi lần lượt đấu với quái đó.
-   **Phần thưởng**: Toàn bộ gem pool được chia đều cho người thắng.

------------------------------------------------------------------------

## 3. Bảng Hệ & Khắc chế

  Hệ            Khắc chế
  ------------- -----------------------
  Fire 🔥       Ice ❄️, Grass 🌿
  Water 💧      Fire 🔥, Earth 🪨
  Earth 🪨      Electric ⚡️, Ice ❄️
  Electric ⚡️   Water 💧
  Poison ☠️     Grass 🌿
  Grass 🌿      Earth 🪨, Water 💧
  Psychic 🔮    Poison ☠️
  Ice ❄️        Grass 🌿, Dragon 🐉
  Dragon 🐉     Dragon 🐉, Psychic 🔮
  Light 🌞      Dark 🌑
  Dark 🌑       Light 🌞, Psychic 🔮

------------------------------------------------------------------------

## 4. Pet List (JSON)

``` json
[
  {
    "name": "Flametail",
    "element": "Fire",
    "hp": 50,
    "skills": [
      {
        "name": "Blaze Claw",
        "type": "Active",
        "description": "Gây 10 dmg. Nếu khắc chế → thêm 10 dmg.",
        "conditions": ["onAttack"],
        "effects": [{"target": "enemy", "damage": 10}, {"target": "enemy", "extraDamageIfAdvantage": 10}]
      },
      {
        "name": "Fireproof",
        "type": "Passive",
        "description": "Miễn nhiễm hiệu ứng Burn & skill Fire.",
        "conditions": ["whileAlive"],
        "effects": [{"immune": ["burn", "fireSkills"]}]
      }
    ]
  },
  {
    "name": "Aquafy",
    "element": "Water",
    "hp": 50,
    "skills": [
      {
        "name": "Bubble Veil",
        "type": "Passive",
        "description": "Giảm 5 dmg từ Fire (không cộng dồn).",
        "conditions": ["whenAttackedByFire"],
        "effects": [{"reduceDamage": 5}]
      },
      {
        "name": "Tidal Surge",
        "type": "Trigger",
        "description": "Nếu HP <25 → đòn kế gây +10 dmg.",
        "conditions": ["hpBelow25"],
        "effects": [{"nextAttackBonus": 10}]
      }
    ]
  }
]
```

(*Danh sách đầy đủ Pet có trong file chính*)

------------------------------------------------------------------------

## 5. Monster List (JSON)

``` json
[
  {
    "name": "Goblin",
    "element": "Earth",
    "hp": 30,
    "skills": [
      {
        "name": "Rock Throw",
        "type": "Active",
        "description": "Gây 10 dmg.",
        "conditions": ["onAttack"],
        "effects": [{"damage": 10}]
      }
    ]
  },
  {
    "name": "Ice Golem",
    "element": "Ice",
    "hp": 80,
    "skills": [
      {
        "name": "Freeze Aura",
        "type": "Passive",
        "description": "Có 20% làm choáng attacker.",
        "conditions": ["whenAttacked"],
        "effects": [{"chance": 0.2, "apply": "stun"}]
      }
    ]
  }
]
```

(*Danh sách đầy đủ Monster có trong file chính*)

------------------------------------------------------------------------

## 6. Command Bot

-   `/pet list` → xem danh sách pet có thể chọn.\
-   `/pet info <name>` → xem chi tiết pet & skill.\
-   `/pvp challenge @user` → thách đấu người chơi.\
-   `/pvp accept` → chấp nhận trận đấu.\
-   `/pvp ban <pet>` → ban pet của đối thủ.\
-   `/pvp pick <pet>` → chọn pet cho đội hình.\
-   `/dungeon join` → tham gia dungeon.\
-   `/dungeon info` → xem thông tin dungeon.\
-   `/balance` → xem số gem hiện có.

------------------------------------------------------------------------

## 7. Định hướng cân bằng

-   Thường xuyên rà soát skill quá mạnh/yếu.\
-   Ưu tiên skill tạo combo chiến thuật thay vì buff/dmg thuần.\
-   Có thể bổ sung: tiến hóa pet, PvP BO3, Guild vs Dungeon.
