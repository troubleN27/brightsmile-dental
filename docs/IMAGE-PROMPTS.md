# Промпты для Google Flow

Промпты на английском — копируйте блок целиком. После генерации сохраните файл в WebP (или пришлите PNG/JPG, я конвертирую) с указанным именем в `public/images/`. Код менять не нужно: фото подхватится вместо плейсхолдера.

**Перед запуском сайта** сгенерированные фото врачей и «до/после» нужно заменить реальными: показывать сгенерированных людей под именами врачей и чужие результаты лечения нельзя (38-ФЗ «О рекламе»).

## Общие советы

- **Формат.** Если в Flow нет точного соотношения сторон, берите ближайшее (3:4 вместо 4:5, 4:3 для горизонтальных) — сайт сам аккуратно обрежет по центру.
- **Единый стиль.** Во всех промптах повторяется одна и та же «стилевая» часть (свет, цвета, камера). Не удаляйте её, тогда фото будут выглядеть как одна съёмка.
- **Врачи.** Генерируйте всех четырёх подряд в одной сессии. Если Flow позволяет добавить готовое изображение как референс, приложите первый удачный портрет как образец фона и света для остальных.
- **«До/после».** Сначала сгенерируйте фото **«после»**, затем в Flow откройте его в режиме редактирования (или приложите как референс) и попросите изменить только зубы по промпту **«до»**. Так ракурс, свет и масштаб совпадут, и слайдер сравнения не будет «прыгать».
- Если в кадре появились надписи, логотипы, лишние пальцы или искажённые зубы — перегенерируйте.

Общая стилевая часть (уже включена в каждый промпт ниже):

```
Realistic editorial photograph, natural soft daylight, airy and calm mood, color palette of white, soft sky blue and light grey with a touch of warm skin tones, shot on a full-frame camera with a 50mm lens, shallow depth of field, true-to-life colors, no text, no logos, no watermark.
```

---

## 1. Первый экран — `hero.webp`

Где: большая голубая панель вверху сайта, справа. Формат **3:4** (вертикальный), минимум 1200×1600.

```
A friendly dentist in light blue scrubs sits on a stool beside a dental chair and talks calmly with a smiling woman in her thirties who is sitting relaxed in the chair, both looking at each other, a modern bright dental treatment room in Moscow with large windows, white cabinets and soft sky-blue accents, the dental lamp is switched off, no instruments in anyone's mouth, the moment feels like a relaxed conversation before treatment. Both people placed in the middle of the frame with some space above their heads. Realistic editorial photograph, natural soft daylight, airy and calm mood, color palette of white, soft sky blue and light grey with a touch of warm skin tones, shot on a full-frame camera with a 50mm lens, shallow depth of field, true-to-life colors, no text, no logos, no watermark.
```

## 2. О клинике — `about.webp`

Где: секция «О клинике», справа от текста. Формат **3:4** (вертикальный), минимум 1200×1600.

```
A quiet waiting area of a small private dental clinic, two soft armchairs in pale blue fabric, a low round wooden table with a glass of water and a plant, a large window with sheer curtains, light walls, warm wooden floor, nobody in the frame, peaceful and tidy, looks like a real clinic rather than a hotel lobby. Realistic editorial photograph, natural soft daylight, airy and calm mood, color palette of white, soft sky blue and light grey with a touch of warm wood tones, shot on a full-frame camera with a 35mm lens, true-to-life colors, no text, no logos, no watermark.
```

---

## 3. Врачи — формат 3:4 (вертикальный), минимум 900×1200

Все четыре — на одном и том же фоне, по пояс, взгляд в камеру.

### `doctors/anna-sokolova.webp` — Анна Соколова, главный врач

```
Waist-up portrait of a confident Eastern European woman dentist around 40 years old, shoulder-length light brown hair, calm warm smile, looking straight at the camera, wearing navy blue medical scrubs with a white long-sleeve undershirt, arms relaxed, standing against a plain light blue-grey studio backdrop, gentle window light from the left. Realistic editorial photograph, natural soft daylight, airy and calm mood, color palette of white, soft sky blue and light grey with a touch of warm skin tones, shot on a full-frame camera with an 85mm lens, shallow depth of field, true-to-life skin texture, no text, no logos, no watermark.
```

### `doctors/mikhail-remizov.webp` — Михаил Ремизов, хирург-имплантолог

```
Waist-up portrait of a calm Eastern European man dental surgeon around 45 years old, short dark hair with some grey at the temples, neatly trimmed beard, friendly reserved smile, looking straight at the camera, wearing dark grey medical scrubs, arms relaxed, standing against a plain light blue-grey studio backdrop, gentle window light from the left. Realistic editorial photograph, natural soft daylight, airy and calm mood, color palette of white, soft sky blue and light grey with a touch of warm skin tones, shot on a full-frame camera with an 85mm lens, shallow depth of field, true-to-life skin texture, no text, no logos, no watermark.
```

### `doctors/elena-pak.webp` — Елена Пак, ортодонт

```
Waist-up portrait of an East Asian woman orthodontist around 35 years old, of Korean descent, long dark hair tied back, bright friendly smile, looking straight at the camera, wearing soft sky-blue medical scrubs, arms relaxed, standing against a plain light blue-grey studio backdrop, gentle window light from the left. Realistic editorial photograph, natural soft daylight, airy and calm mood, color palette of white, soft sky blue and light grey with a touch of warm skin tones, shot on a full-frame camera with an 85mm lens, shallow depth of field, true-to-life skin texture, no text, no logos, no watermark.
```

### `doctors/olga-granina.webp` — Ольга Гранина, детский стоматолог

```
Waist-up portrait of a young Eastern European woman pediatric dentist around 30 years old, wavy auburn hair in a low ponytail, warm open smile, looking straight at the camera, wearing light teal-blue medical scrubs with a small colorful cartoon-patterned scrub cap held in her hand, standing against a plain light blue-grey studio backdrop, gentle window light from the left. Realistic editorial photograph, natural soft daylight, airy and calm mood, color palette of white, soft sky blue and light grey with a touch of warm skin tones, shot on a full-frame camera with an 85mm lens, shallow depth of field, true-to-life skin texture, no text, no logos, no watermark.
```

---

## 4. «До / после» — формат 4:3 (горизонтальный), минимум 1200×900

Для каждой пары: сначала промпт **«после»**, затем на его основе — правка **«до»**. Кадр — крупный план нижней части лица (губы и зубы), без глаз, чтобы человек не был узнаваем.

### Виниры — `cases/veneers-front-after.webp` и `cases/veneers-front-before.webp`

После:
```
Close-up of the lower half of a woman's face, natural smile showing the upper front teeth, even, natural-looking white porcelain veneers with realistic translucency at the edges, healthy pink gums, natural lips without heavy makeup, eyes not visible, plain soft light-blue background. Realistic clinical-style dental photograph, soft even lighting, sharp focus on the teeth, true-to-life colors, no text, no logos, no watermark.
```
До (правка того же фото):
```
Keep the same person, framing, lighting and background. Change only the upper front teeth: make them slightly uneven in length, with a small chip on one front tooth, visible gaps between two teeth and a slightly yellowish, uneven shade. Everything else stays identical.
```

### Элайнеры — `cases/aligners-crowding-after.webp` и `cases/aligners-crowding-before.webp`

После:
```
Close-up of the lower half of a young man's face, relaxed smile showing upper and lower front teeth, straight and evenly aligned natural teeth, healthy gums, eyes not visible, plain soft light-blue background. Realistic clinical-style dental photograph, soft even lighting, sharp focus on the teeth, true-to-life colors, no text, no logos, no watermark.
```
До:
```
Keep the same person, framing, lighting and background. Change only the teeth: make the lower and upper front teeth crowded and overlapping, with one front tooth rotated and pushed slightly forward. Natural tooth color, everything else stays identical.
```

### Имплант — `cases/implant-molar-after.webp` и `cases/implant-molar-before.webp`

После:
```
Intraoral dental photograph of the side of the lower jaw, view of the back teeth with cheek retractor, a complete row of healthy natural-looking molars including one ceramic crown that matches the neighboring teeth in shape and shade, healthy pink gums. Realistic clinical dental photograph, ring-flash style even lighting, sharp focus, true-to-life colors, no text, no logos, no watermark.
```
До:
```
Keep the same framing, lighting and view. Change only one thing: remove the ceramic crown so there is a single missing lower molar with healed pink gum in the gap. All other teeth stay identical.
```

### Отбеливание — `cases/whitening-after.webp` и `cases/whitening-before.webp`

После:
```
Close-up of the lower half of a smiling woman's face, upper and lower front teeth visible, naturally bright white teeth (not unnaturally blue-white), healthy gums, natural lips, eyes not visible, plain soft light-blue background. Realistic clinical-style dental photograph, soft even lighting, sharp focus on the teeth, true-to-life colors, no text, no logos, no watermark.
```
До:
```
Keep the same person, framing, lighting and background. Change only the tooth color: make the teeth noticeably yellowish with light coffee staining near the gums. Shape and position of the teeth stay identical.
```

### Художественная реставрация — `cases/bonding-chip-after.webp` и `cases/bonding-chip-before.webp`

После:
```
Close-up of the lower half of a man's face, slight smile showing the upper front teeth, natural-looking intact front teeth with even edges, healthy gums, eyes not visible, plain soft light-blue background. Realistic clinical-style dental photograph, soft even lighting, sharp focus on the teeth, true-to-life colors, no text, no logos, no watermark.
```
До:
```
Keep the same person, framing, lighting and background. Change only one upper front tooth: add a visible diagonal chip on its edge, as if broken. All other teeth stay identical.
```
