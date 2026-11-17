# Промпты для фотографий (Google Flow)

Промпты на английском — так модель понимает их точнее. Готовый файл переведите в WebP (качество 80–85) и положите по указанному пути: сайт подхватит фото сам, код менять не нужно (см. [IMAGES.md](IMAGES.md)).

## Общие правила, чтобы фото выглядели как одна съёмка

Добавляйте в конец **каждого** промпта этот хвост:

```
Shot on a full-frame camera, 35mm lens, soft natural daylight from a large window, realistic skin texture, no retouching gloss, calm and quiet mood. Modern dental clinic in central Moscow: white walls, light oak details, matte surfaces, small teal accents. Documentary photo style, not a stock photo. No text, no logos, no watermarks.
```

- Генерируйте 3–4 варианта и выбирайте тот, где руки, зубы и инструменты выглядят естественно.
- Не берите кадры, где врач в стетоскопе (стоматологи его не носят) или пациент неестественно широко улыбается в кресле.

## 1. Первый экран — `public/images/hero.webp`

Горизонтально, 3:2, от 1500×1000. Сайт обрезает фото по краям, поэтому главное держите в центре.

```
A dentist in a light teal scrub top sits next to a female patient in her 30s in a modern dental chair, both turned slightly towards each other, the dentist is showing her something on a tablet and the patient is smiling naturally, relaxed. Medium shot from the side, room for empty white wall on the left side of the frame.
```

## 2. Кабинет — `public/images/clinic/room.webp`

Вертикально, 4:5, от 1200×1500.

```
Interior of a calm, bright dental treatment room: a white dental chair with a light grey upholstery, a large window with sheer curtains, light oak cabinet along the wall, a small plant on the windowsill, no people. Eye-level view, clean and uncluttered.
```

## 3. Разделы услуг — `public/images/services/<раздел>.webp`

Горизонтально, 3:2, от 1200×800. Шесть файлов.

| Файл | Промпт |
|---|---|
| `therapy.webp` | `A dentist working with a dental microscope on a patient lying in the chair, close-up of hands and the microscope, the patient's face partly visible and relaxed.` |
| `hygiene.webp` | `A dental hygienist in mask and gloves doing a professional teeth cleaning, the patient wears protective glasses, close-up from the side.` |
| `implants.webp` | `A dental surgeon reviewing a 3D jaw scan on a large monitor together with a middle-aged male patient sitting in the chair, both looking at the screen.` |
| `orthodontics.webp` | `Close-up of a young woman's hand holding a clear aligner tray in front of her smile, soft focus background of a dental office.` |
| `aesthetics.webp` | `A dentist holding a tooth shade guide next to a smiling woman's teeth to pick the right color, close-up from the side.` |
| `kids.webp` | `A pediatric dentist showing a small dental mirror to a 6-year-old boy sitting in the dental chair, the boy is curious and smiling, his mother sits nearby.` |

## 4. Блок «Лечим детей» — `public/images/kids.webp`

Горизонтально, 4:3, от 1200×900.

```
A friendly female pediatric dentist in a light teal scrub top kneels at eye level with a 5-year-old girl who sits in a small dental chair holding a soft toy, they are laughing together. Warm, gentle moment, medium shot.
```

## 5. Врачи — `public/images/doctors/<id>.webp`

Вертикально, 4:5, от 600×750. Делайте все четыре портрета подряд в одной сессии, чтобы фон и свет совпали. Общая часть:

```
Waist-up portrait against a plain light grey wall, soft window light from the left, looking into the camera with a calm slight smile, arms relaxed, wearing a {одежда}.
```

| Файл | Кто |
|---|---|
| `anna-sokolova.webp` | `Russian woman in her early 40s, chief dentist, short dark hair, white medical coat over a navy top` |
| `mikhail-remizov.webp` | `Russian man in his mid 40s, oral surgeon, short greying hair, light beard, dark teal scrubs` |
| `elena-pak.webp` | `Korean-Russian woman in her mid 30s, orthodontist, long dark hair tied back, white medical coat` |
| `olga-granina.webp` | `Russian woman around 35, pediatric dentist, light brown hair in a ponytail, light teal scrubs with a small colorful badge` |

## 6. «До / после» — `public/images/cases/<id>-before.webp` и `-after.webp`

4:3, от 1200×900. Сначала сгенерируйте «до», затем загрузите его в Flow как основу и попросите изменить только зубы — так ракурс, свет и лицо совпадут.

> **Важно:** сейчас под блоком написано, что пациенты разрешили показать фото. Если «до/после» будут сгенерированы, эту подпись нужно поменять, иначе это вводит в заблуждение, а медицинская реклама в РФ за такое отвечает (38-ФЗ). Лучше всего поставить сюда реальные работы врачей, когда они появятся.

Общая часть для «до»: `Close-up of a smile, lips slightly parted, lower half of the face only, neutral light background, front view, {состояние}.`
Для «после»: `Same photo, same angle, light and framing, change only the teeth: {результат}. Keep it natural, not overly white.`

| Пара | Состояние «до» | Результат «после» |
|---|---|---|
| `veneers-front` | `front teeth slightly uneven in shape with small chips and yellowish tone` | `six upper front teeth with natural-looking porcelain veneers, even shape` |
| `aligners-crowding` | `crowded lower and upper front teeth, one tooth overlapping another` | `straight, evenly aligned teeth` |
| `implant-molar` | `side view of the mouth with a missing lower back tooth, visible gap` | `the gap filled with a natural-looking crown matching neighbouring teeth` |
| `whitening` | `healthy straight teeth with a yellowish coffee stain tone` | `the same teeth three shades lighter` |
| `bonding-chip` | `a noticeable chip on the edge of one upper front tooth` | `the chip restored, the tooth edge even` |
