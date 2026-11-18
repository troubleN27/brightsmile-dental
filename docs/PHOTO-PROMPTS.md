# Промпты для фото и видео (Google Flow)

Промпты на английском: так модель понимает их точнее. Это итоговые версии, по которым сделаны текущие фото и видео сайта. Куда класть файлы, в каком размере и как сжимать — в [IMAGES.md](IMAGES.md).

## Общие правила

**Полный хвост** добавляйте в конец промптов для: кабинета, разделов услуг, блока про детей и портретов врачей.

```
Shot on a full-frame camera, 35mm lens, soft natural daylight from a large window, realistic skin texture, no retouching gloss, calm and quiet mood. Modern dental clinic in central Moscow: white walls, light oak details, matte surfaces, small light blue accents. Documentary photo style, not a stock photo. No text, no logos, no watermarks.
```

**Сокращённый хвост** — только для фото «до» (крупный план улыбки, интерьер не нужен):

```
Shot on a full-frame camera, 100mm macro lens, soft even daylight, realistic skin and lip texture, natural tooth enamel with slight translucency, no retouching gloss. Clinical documentary photo, not a stock photo. No text, no logos, no watermarks.
```

**Без хвоста:** фото «после» (это правка готового «до») и видео (у них свой текст).

- Генерируйте 3–4 варианта и выбирайте тот, где руки, зубы и инструменты выглядят естественно.
- Форма врачей голубая (`light blue scrubs`) или тёмно-синяя (`navy blue scrubs`), не бирюзовая.
- Без бейджей с надписями: нейросеть пишет на них абракадабру. Если бейдж появился, допишите `The scrubs are completely plain.`
- Не берите кадры, где врач в стетоскопе (стоматологи его не носят).

## 1. Видео для первого экрана — `videos/hero`

16:9, самое высокое качество. Люди в правой половине кадра, слева спокойный фон: по центру будет заголовок.

```
Cinematic shot inside a bright modern dental clinic in central Moscow. A friendly dentist in light blue scrubs sits on a low stool facing a relaxed woman in her 30s in a beige sweater who sits in a light grey dental chair. They are having an easy conversation: she laughs softly, he nods and smiles, both hands relaxed, no tools, no screens. The two people are close to each other on the right half of the frame; the left half shows soft background: white walls, light oak cabinets, a large window with daylight and a plant. Clear unobstructed view throughout the shot: nothing ever passes between the camera and the people, no pillars, no columns, no door frames, no walls or furniture in the foreground. Calm warm mood, natural soft daylight, subtle light blue accents, shallow depth of field. Realistic, documentary style, not a commercial. No tablets, no phones, no monitors, no x-rays, no dental instruments in the mouth. No text, no logos, no watermarks.
```

Если перед людьми мелькает стойка или дверной проём, допишите `The camera moves only in open space in front of the people.`

## 2. Видео-тур по клинике — `videos/tour`

```
Smooth slow walk-through of a bright modern dental clinic: starting at a calm reception with a light oak counter and plants, moving down a white corridor, then into a treatment room with a light grey dental chair by a large window. A friendly dentist in light blue scrubs looks up and smiles. Natural soft daylight, light blue accents, steady gimbal camera, no cuts. Realistic, documentary style. No text, no logos, no watermarks.
```

## 3. Кабинет — `images/clinic/room-wide.webp`

16:9. Используется как фон под цветной подложкой.

```
Interior of a calm, bright dental treatment room: a white dental chair with a light grey upholstery, a large window with sheer curtains, light oak cabinet along the wall, a small plant on the windowsill, no people. Eye-level view, clean and uncluttered.
```

## 4. Разделы услуг — `images/services/<раздел>.webp`

Горизонтально, 3:2.

| Файл | Промпт |
|---|---|
| `therapy.webp` | `A dentist in light blue scrubs working with a dental microscope on a patient lying in the chair, close-up of hands and the microscope, the patient's face partly visible and relaxed.` |
| `hygiene.webp` | `A dental hygienist in mask and gloves doing a professional teeth cleaning, the patient wears protective glasses, close-up from the side.` |
| `implants.webp` | `A dental surgeon reviewing a 3D jaw scan on a large monitor together with a middle-aged male patient sitting in the chair, both looking at the screen.` |
| `orthodontics.webp` | `Close-up of a young woman's hand holding a clear aligner tray in front of her smile, soft focus background of a dental office.` |
| `aesthetics.webp` | `A dentist holding a tooth shade guide next to a smiling woman's teeth to pick the right color, close-up from the side.` |
| `kids.webp` | `A pediatric dentist in light blue scrubs showing a small dental mirror to a 6-year-old boy sitting in the dental chair, the boy is curious and smiling, his mother sits nearby.` |

## 5. Врачи — `images/doctors/<id>.webp`

Ракурс как у портрета Анны Соколовой: анфас, взгляд в камеру. Если Flow позволяет добавить картинку-образец, загрузите `anna-sokolova.webp`: первая строка промпта говорит взять из образца только ракурс и свет.

Общая часть (подставьте описание врача вместо `{кто}`):

```
Use the reference image only for camera angle, framing, crop and lighting. Different person. Waist-up portrait of {кто}. Standing facing the camera straight on, shoulders square to the camera, head straight, looking directly into the lens with a calm slight smile, arms relaxed. Centered in the frame with some space above the head. Plain light grey wall behind, no furniture, no interior visible. Soft window light from the left. Shot on a full-frame camera, 85mm lens, realistic skin texture, visible skin pores, no retouching gloss, calm and quiet mood. Documentary portrait style, not a stock photo. No text, no logos, no watermarks.
```

| Файл | `{кто}` |
|---|---|
| `anna-sokolova.webp` | `a Russian woman in her early 40s, chief dentist, short dark hair, wearing a white medical coat over a navy top` |
| `mikhail-remizov.webp` | `a Russian man in his mid 40s, oral surgeon, short greying hair, light beard, wearing navy blue scrubs` |
| `elena-pak.webp` | `a Korean-Russian woman in her mid 30s, orthodontist, long dark hair tied back in a low ponytail, wearing a white medical coat` |
| `olga-granina.webp` | `a Russian woman around 35, pediatric dentist, light brown hair in a ponytail, wearing light blue scrubs` |

## 6. Блок «Детей лечит отдельный врач» — `images/kids.webp`

Образец — портрет Ольги Граниной, чтобы на фото была та же женщина.

```
Use the reference image for the woman's face, hair and light blue scrubs only. The same friendly female pediatric dentist, around 35, light brown hair in a ponytail, wearing plain light blue scrubs with no badge, no name tag and no text or pictures on the clothing, kneels at eye level next to a 5-year-old girl who sits in a light blue dental chair holding a soft toy; they are laughing together. Bright modern dental clinic, white walls, light oak details, a large window with daylight and a plant. Warm, gentle moment, medium shot, both faces clearly visible. Shot on a full-frame camera, 35mm lens, soft natural daylight, realistic skin texture, no retouching gloss. Documentary photo style, not a stock photo. No text, no logos, no watermarks.
```

## 7. «До / после» — `images/cases/<id>-before.webp` и `-after.webp`

1. Сгенерируйте «до» по промпту из таблицы (в нём уже есть ракурс; в конец добавьте сокращённый хвост).
2. Загрузите «до» в Flow как исходник и попросите изменить только зубы промптом «после». Если модель меняет лицо или фон, допишите `Do not change the camera angle, zoom, crop, lips, skin, background or lighting.`

Начало промпта «до» для фронтальных пар:

```
Straight-on frontal photo, camera exactly at mouth level, face perfectly centered and symmetrical, no head tilt or turn. Crop from the tip of the nose to the chin, mouth in the center of the frame, both corners of the mouth visible. Smile with lips parted showing upper teeth: {состояние}. Neutral light beige background.
```

| Пара | `{состояние}` для «до» | Промпт «после» |
|---|---|---|
| `veneers-front` | `front teeth slightly uneven in shape with small chips and yellowish tone` | `Same photo, same angle, light and framing, change only the teeth: six upper front teeth with natural-looking porcelain veneers, even shape. Keep it natural, not overly white.` |
| `aligners-crowding` | `crowded lower and upper front teeth, one tooth overlapping another` | `Same photo, same angle, light and framing, change only the teeth: straight, evenly aligned teeth. Keep it natural, not overly white.` |
| `whitening` | `healthy straight teeth with a yellowish coffee stain tone` | `Same photo, same angle, light and framing, change only the teeth: the same teeth three shades lighter. Keep it natural, not overly white.` |
| `bonding-chip` | `a noticeable chip on the edge of one upper front tooth, all other teeth healthy` | `Same photo, same angle, light and framing, change only the teeth: the chip restored, the tooth edge even. Keep it natural, not overly white.` |

Имплант снимается сбоку, поэтому у него свой промпт «до»:

```
Three-quarter view from the right side, head turned 30 degrees, camera at mouth level. Crop from the tip of the nose to the chin. Wide smile with the right corner of the mouth pulled back slightly to show the back teeth: one lower back tooth is missing, a visible gap between the neighbouring teeth, gums healthy. Neutral light beige background.
```

«После»: `Same photo, same angle, light and framing, change only the teeth: the gap filled with a natural-looking crown matching neighbouring teeth. Keep it natural, not overly white.`

> Подпись под блоком нейтральная: «Двигайте ползунок, чтобы сравнить, как было до лечения и как стало после». Если поставите реальные работы врачей с согласия пациентов, подпись можно вернуть к «Пациенты разрешили нам показать эти фотографии».
