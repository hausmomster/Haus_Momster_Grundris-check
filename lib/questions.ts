export type Lang = 'de' | 'en'

export type Option = {
  value: string
  label: Record<Lang, string>
  points: number
  recommendation?: Record<Lang, string>
}

export type Question = {
  id: number
  block: number
  blockTitle: Record<Lang, string>
  blockEmoji: string
  question: Record<Lang, string>
  type: 'single' | 'text'
  scorable: boolean
  options?: Option[]
}

export const questions: Question[] = [
  // ─── BLOCK 1 – BASISINFOS (context only, no score) ───────────────────────
  {
    id: 1,
    block: 1,
    blockTitle: { de: 'Basisinfos', en: 'Basic Info' },
    blockEmoji: '🏠',
    question: {
      de: 'Befindet sich dein Projekt aktuell in welcher Phase?',
      en: 'What phase is your project currently in?',
    },
    type: 'single',
    scorable: false,
    options: [
      { value: 'search', label: { de: 'Grundstückssuche', en: 'Looking for a plot' }, points: 0 },
      { value: 'planning', label: { de: 'Grundriss in Planung', en: 'Floor plan in planning' }, points: 0 },
      { value: 'permit', label: { de: 'Bauantrag läuft', en: 'Building permit in progress' }, points: 0 },
      { value: 'construction', label: { de: 'Bau läuft bereits', en: 'Construction underway' }, points: 0 },
      { value: 'done', label: { de: 'Haus steht schon', en: 'House already built' }, points: 0 },
    ],
  },
  {
    id: 2,
    block: 1,
    blockTitle: { de: 'Basisinfos', en: 'Basic Info' },
    blockEmoji: '🏠',
    question: {
      de: 'Wie groß ist dein Haus / deine Wohnung?',
      en: 'How large is your house / apartment?',
    },
    type: 'single',
    scorable: false,
    options: [
      { value: 'small', label: { de: 'Unter 120 m²', en: 'Under 120 m²' }, points: 0 },
      { value: 'medium', label: { de: '120–160 m²', en: '120–160 m²' }, points: 0 },
      { value: 'large', label: { de: '160–200 m²', en: '160–200 m²' }, points: 0 },
      { value: 'xlarge', label: { de: 'Über 200 m²', en: 'Over 200 m²' }, points: 0 },
    ],
  },
  {
    id: 3,
    block: 1,
    blockTitle: { de: 'Basisinfos', en: 'Basic Info' },
    blockEmoji: '🏠',
    question: {
      de: 'Wie viele Personen leben dort?',
      en: 'How many people live there?',
    },
    type: 'single',
    scorable: false,
    options: [
      { value: '1-2', label: { de: '1–2 Personen', en: '1–2 people' }, points: 0 },
      { value: '3', label: { de: '3 Personen', en: '3 people' }, points: 0 },
      { value: '4', label: { de: '4 Personen', en: '4 people' }, points: 0 },
      { value: '5+', label: { de: '5 oder mehr', en: '5 or more' }, points: 0 },
    ],
  },

  // ─── BLOCK 2 – EINGANGSBEREICH (10 pts) ──────────────────────────────────
  {
    id: 4,
    block: 2,
    blockTitle: { de: 'Eingangsbereich', en: 'Entrance Area' },
    blockEmoji: '🚪',
    question: {
      de: 'Gibt es eine Garderobennische oder Garderobenfläche?',
      en: 'Is there a wardrobe niche or dedicated wardrobe area?',
    },
    type: 'single',
    scorable: true,
    options: [
      { value: 'yes', label: { de: 'Ja', en: 'Yes' }, points: 5 },
      {
        value: 'planned',
        label: { de: 'Noch nicht geplant', en: 'Not yet planned' },
        points: 2,
        recommendation: {
          de: 'Plant eine Garderobennische ein – mindestens 60 cm tief und 80 cm breit. Sie ist der erste Schritt zu einem aufgeräumten Zuhause.',
          en: "Plan a wardrobe niche – at least 60 cm deep and 80 cm wide. It's the first step to a tidy home.",
        },
      },
      {
        value: 'no',
        label: { de: 'Nein', en: 'No' },
        points: 0,
        recommendation: {
          de: 'Ohne Garderobenlösung stapeln sich Jacken und Schuhe sofort im Flur. Plane mindestens eine Nische (60 cm tief, 80 cm breit) ein.',
          en: 'Without a wardrobe solution, coats and shoes pile up in the hallway immediately. Plan at least a niche (60 cm deep, 80 cm wide).',
        },
      },
    ],
  },
  {
    id: 5,
    block: 2,
    blockTitle: { de: 'Eingangsbereich', en: 'Entrance Area' },
    blockEmoji: '🚪',
    question: {
      de: 'Ist der Eingangsbereich vom Wohnbereich getrennt?',
      en: 'Is the entrance area separated from the living area?',
    },
    type: 'single',
    scorable: true,
    options: [
      { value: 'yes', label: { de: 'Ja', en: 'Yes' }, points: 5 },
      {
        value: 'partial',
        label: { de: 'Teilweise', en: 'Partially' },
        points: 3,
        recommendation: {
          de: 'Eine vollständige Trennung lohnt sich. Selbst eine Sichtblende oder ein halbhoher Raumteiler verhindert, dass Gäste sofort ins Wohnzimmer schauen.',
          en: 'A full separation is worth it. Even a visual screen or half-height divider prevents guests from looking straight into the living room.',
        },
      },
      {
        value: 'no',
        label: { de: 'Nein', en: 'No' },
        points: 0,
        recommendation: {
          de: 'Ein offener Eingang ohne Trennung lässt das Chaos ins Wohnzimmer sickern. Überlege einen Raumteiler, eine Schiebetür oder eine Wandnische als Puffer.',
          en: 'An open entrance without separation lets clutter seep into the living room. Consider a room divider, sliding door, or wall niche as a buffer.',
        },
      },
    ],
  },

  // ─── BLOCK 3 – DURCHGÄNGE (15 pts) ───────────────────────────────────────
  {
    id: 6,
    block: 3,
    blockTitle: { de: 'Durchgänge', en: 'Corridors & Passages' },
    blockEmoji: '📏',
    question: {
      de: 'Wie breit sind die Hauptdurchgänge im Wohnbereich?',
      en: 'How wide are the main passages in the living area?',
    },
    type: 'single',
    scorable: true,
    options: [
      {
        value: 'under90',
        label: { de: 'Unter 90 cm', en: 'Under 90 cm' },
        points: 0,
        recommendation: {
          de: 'Kritisch: Unter 90 cm werden Durchgänge zur täglichen Frustration. Mit Möbeln beidseitig ist der Weg kaum passierbar. Hier muss umgeplant werden.',
          en: 'Critical: Under 90 cm, passages become daily frustration. With furniture on both sides, the path is barely passable. Replanning is necessary here.',
        },
      },
      {
        value: '90-110',
        label: { de: '90–110 cm', en: '90–110 cm' },
        points: 5,
        recommendation: {
          de: 'Knapp ausreichend – aber bei 90–110 cm wird es mit Möbeln, Kinderwagen oder beim Tragen von Einkäufen schnell eng. Prüfe, ob du an einer Stelle 10–20 cm gewinnen kannst.',
          en: 'Barely enough – but at 90–110 cm, things get tight with furniture, strollers, or carrying groceries. Check if you can gain 10–20 cm somewhere.',
        },
      },
      { value: 'over110', label: { de: 'Über 110 cm', en: 'Over 110 cm' }, points: 8 },
      {
        value: 'unknown',
        label: { de: 'Weiß ich nicht', en: "I don't know" },
        points: 3,
        recommendation: {
          de: 'Miss die Breite der Hauptdurchgänge sofort nach – das ist eine der wichtigsten Maßzahlen deines Grundrisses. Standard sind mindestens 90 cm, empfohlen 110 cm.',
          en: 'Measure the width of the main passages right away – it is one of the most important dimensions in your floor plan. Standard is at least 90 cm, recommended is 110 cm.',
        },
      },
    ],
  },
  {
    id: 7,
    block: 3,
    blockTitle: { de: 'Durchgänge', en: 'Corridors & Passages' },
    blockEmoji: '📏',
    question: {
      de: 'Wie breit sind die Nebendurchgänge (z.B. Nebenflur, Abstellraum)?',
      en: 'How wide are the secondary passages (e.g. secondary hallway, storage room)?',
    },
    type: 'single',
    scorable: false,
    options: [
      { value: 'under80', label: { de: 'Unter 80 cm', en: 'Under 80 cm' }, points: 0, recommendation: {
        de: 'Nebendurchgänge unter 80 cm werden im Alltag zur Engstelle – besonders beim Tragen von Gegenständen oder mit Kindern.',
        en: 'Secondary passages under 80 cm become bottlenecks in everyday use – especially when carrying items or with children.',
      }},
      { value: '80-90', label: { de: '80–90 cm', en: '80–90 cm' }, points: 0, recommendation: {
        de: 'Ausreichend für Nebenwege – aber prüfe ob du auf 90 cm erweitern kannst, das macht einen spürbaren Unterschied im Alltag.',
        en: 'Sufficient for secondary routes – but check if you can expand to 90 cm, which makes a noticeable difference in everyday use.',
      }},
      { value: 'over90', label: { de: 'Über 90 cm', en: 'Over 90 cm' }, points: 0 },
      { value: 'none', label: { de: 'Keine Nebendurchgänge', en: 'No secondary passages' }, points: 0 },
      { value: 'unknown', label: { de: 'Weiß ich nicht', en: "I don't know" }, points: 0, recommendation: {
        de: 'Miss alle Durchgänge im Grundriss nach – auch Nebenwege sollten mindestens 80 cm breit sein.',
        en: 'Measure all passages in the floor plan – secondary routes should also be at least 80 cm wide.',
      }},
    ],
  },
  {
    id: 8,
    block: 3,
    blockTitle: { de: 'Durchgänge', en: 'Corridors & Passages' },
    blockEmoji: '📏',
    question: {
      de: 'Gibt es Engstellen zwischen Möbeln oder an Türen?',
      en: 'Are there bottlenecks between furniture or at doors?',
    },
    type: 'single',
    scorable: true,
    options: [
      { value: 'no', label: { de: 'Nein', en: 'No' }, points: 7 },
      {
        value: 'unsure',
        label: { de: 'Unsicher', en: 'Unsure' },
        points: 4,
        recommendation: {
          de: 'Erstelle einen Möblierungsplan im Maßstab 1:50 und miss alle Abstände nach. Viele Engstellen entstehen erst, wenn Möbel im Raum stehen.',
          en: 'Create a furniture plan at 1:50 scale and measure all distances. Many bottlenecks only become apparent once furniture is in the room.',
        },
      },
      {
        value: 'yes',
        label: { de: 'Ja', en: 'Yes' },
        points: 0,
        recommendation: {
          de: 'Identifiziere die genauen Engstellen und plane Umstellungen. Der Mindestabstand zwischen Möbeln im Durchgangsbereich beträgt 90 cm.',
          en: 'Identify the exact bottlenecks and plan rearrangements. The minimum clearance between furniture in passage areas is 90 cm.',
        },
      },
    ],
  },

  // ─── BLOCK 4 – KÜCHE (20 pts) ─────────────────────────────────────────────
  {
    id: 9,
    block: 4,
    blockTitle: { de: 'Küche', en: 'Kitchen' },
    blockEmoji: '🍳',
    question: {
      de: 'Welche Küchenform ist geplant?',
      en: 'What kitchen layout is planned?',
    },
    type: 'single',
    scorable: true,
    options: [
      { value: 'island', label: { de: 'Inselküche', en: 'Island kitchen' }, points: 7 },
      { value: 'l-shape', label: { de: 'L-Form', en: 'L-shape' }, points: 6 },
      { value: 'u-shape', label: { de: 'U-Form', en: 'U-shape' }, points: 6 },
      {
        value: 'galley',
        label: { de: 'Zweizeiler', en: 'Galley kitchen' },
        points: 4,
        recommendation: {
          de: 'Ein Zweizeiler ist funktional, aber begrenzt. Achte besonders auf einen Mindestabstand von 110 cm zwischen den Zeilen für komfortables Arbeiten.',
          en: 'A galley kitchen is functional but limited. Pay particular attention to a minimum clearance of 110 cm between the two rows for comfortable working.',
        },
      },
      {
        value: 'open',
        label: { de: 'Noch offen', en: 'Not yet decided' },
        points: 2,
        recommendation: {
          de: 'Definiere die Küchenform jetzt – sie bestimmt Elektro-, Wasseranschlüsse und alle weiteren Planungsschritte. Inselküche und L-Form bieten die größte Flexibilität.',
          en: 'Define the kitchen layout now – it determines electrical, plumbing connections and all further planning steps. Island and L-shape offer the greatest flexibility.',
        },
      },
    ],
  },
  {
    id: 10,
    block: 4,
    blockTitle: { de: 'Küche', en: 'Kitchen' },
    blockEmoji: '🍳',
    question: {
      de: 'Ist genug Abstand zwischen Küche und Insel eingeplant?',
      en: 'Is enough clearance planned between the kitchen and island?',
    },
    type: 'single',
    scorable: true,
    options: [
      {
        value: 'under100',
        label: { de: 'Unter 100 cm', en: 'Under 100 cm' },
        points: 0,
        recommendation: {
          de: 'Kritisch: Ein Abstand von unter 100 cm zwischen Küche und Insel ist einer der häufigsten und folgenschwersten Planungsfehler. Zwei Personen können nicht gleichzeitig in der Küche arbeiten, ohne sich ständig im Weg zu stehen. Sofort umplanen – Ziel sind mindestens 120 cm.',
          en: 'Critical: A clearance of under 100 cm between the kitchen counter and island is one of the most common and consequential planning errors. Two people cannot work in the kitchen at the same time without constantly being in each other\'s way. Replan immediately – aim for at least 120 cm.',
        },
      },
      {
        value: '100-115',
        label: { de: '100–115 cm', en: '100–115 cm' },
        points: 6,
        recommendation: {
          de: 'Ausreichend, aber nicht komfortabel. Bei 100–115 cm kann man nicht aneinander vorbeigehen, ohne sich zu berühren. Wenn möglich, auf 120 cm erweitern.',
          en: 'Sufficient but not comfortable. At 100–115 cm, you can\'t pass each other without touching. Expand to 120 cm if possible.',
        },
      },
      { value: 'ab120', label: { de: 'Ab 120 cm', en: 'From 120 cm' }, points: 8 },
      {
        value: 'unknown',
        label: { de: 'Weiß ich nicht / keine Insel', en: "Don't know / no island" },
        points: 3,
        recommendation: {
          de: 'Falls du eine Kücheninsel planst: Miss den Abstand zwischen Insel und Küchenzeile sofort nach. Mindestens 100 cm, besser 120 cm – alles darunter wird im Alltag zur Engstelle.',
          en: 'If you are planning a kitchen island: measure the clearance between the island and the kitchen counter right away. At least 100 cm, preferably 120 cm – anything less becomes a bottleneck in daily use.',
        },
      },
    ],
  },
  {
    id: 11,
    block: 4,
    blockTitle: { de: 'Küche', en: 'Kitchen' },
    blockEmoji: '🍳',
    question: {
      de: 'Gibt es eine Speisekammer oder Vorratslösung?',
      en: 'Is there a pantry or storage solution?',
    },
    type: 'single',
    scorable: true,
    options: [
      { value: 'yes', label: { de: 'Ja', en: 'Yes' }, points: 5 },
      {
        value: 'unsure',
        label: { de: 'Noch unsicher', en: 'Not yet sure' },
        points: 2,
        recommendation: {
          de: 'Plane die Vorratslösung jetzt. Ein Hochschrank als Speisekammer oder eine begehbare Nische ab 80 cm Tiefe reicht – und wird später täglich vermisst, wenn nicht vorhanden.',
          en: 'Plan the storage solution now. A tall cupboard as a pantry or a walk-in niche from 80 cm depth is enough – and will be missed daily if not included.',
        },
      },
      {
        value: 'no',
        label: { de: 'Nein', en: 'No' },
        points: 0,
        recommendation: {
          de: 'Ohne Vorratslösung wirst du schnell Stauraum in der Küche vermissen. Eine Speisekammer oder ein Hochschranksystem ist ein Muss – plane mindestens 2–3 Hochschränke ein.',
          en: 'Without a storage solution, you\'ll quickly miss space in the kitchen. A pantry or tall cabinet system is a must – plan at least 2–3 tall cabinets.',
        },
      },
    ],
  },

  // ─── BLOCK 5 – STAURAUM (20 pts) ─────────────────────────────────────────
  {
    id: 12,
    block: 5,
    blockTitle: { de: 'Stauraum', en: 'Storage' },
    blockEmoji: '📦',
    question: {
      de: 'Gibt es einen Hauswirtschaftsraum?',
      en: 'Is there a utility room (laundry room)?',
    },
    type: 'single',
    scorable: true,
    options: [
      { value: 'yes', label: { de: 'Ja', en: 'Yes' }, points: 8 },
      {
        value: 'planned',
        label: { de: 'Noch geplant', en: 'Still being planned' },
        points: 4,
        recommendation: {
          de: 'Priorisiere den Hauswirtschaftsraum – 4–6 m² reichen. Er ist der am häufigsten bereute fehlende Raum bei Bauherrinnen.',
          en: 'Prioritise the utility room – 4–6 m² is enough. It\'s the most commonly regretted missing room among homebuilders.',
        },
      },
      {
        value: 'no',
        label: { de: 'Nein', en: 'No' },
        points: 0,
        recommendation: {
          de: 'Der Hauswirtschaftsraum ist Nr. 1 auf der Liste der "Das hätte ich anders geplant"-Aussagen. Waschmaschine, Trockner, Bügelbrett, Putzmittel – alles unsichtbar. Mindestens 4 m² einplanen.',
          en: 'The utility room is #1 on the "I should have planned that differently" list. Washing machine, dryer, ironing board, cleaning supplies – all hidden. Plan at least 4 m².',
        },
      },
    ],
  },
  {
    id: 13,
    block: 5,
    blockTitle: { de: 'Stauraum', en: 'Storage' },
    blockEmoji: '📦',
    question: {
      de: 'Ist Stauraum im Flur vorgesehen?',
      en: 'Is storage planned in the hallway?',
    },
    type: 'single',
    scorable: true,
    options: [
      { value: 'yes', label: { de: 'Ja', en: 'Yes' }, points: 6 },
      {
        value: 'no',
        label: { de: 'Nein', en: 'No' },
        points: 0,
        recommendation: {
          de: 'Der Flur ist der erste Ort, an dem Chaos entsteht. Plane Einbauschränke oder eine Nische (min. 40–60 cm tief) für Jacken, Schuhe, Taschen und Reinigungsartikel.',
          en: 'The hallway is the first place chaos develops. Plan built-in wardrobes or a niche (min. 40–60 cm deep) for coats, shoes, bags and cleaning items.',
        },
      },
    ],
  },
  {
    id: 14,
    block: 5,
    blockTitle: { de: 'Stauraum', en: 'Storage' },
    blockEmoji: '📦',
    question: {
      de: 'Gibt es Einbauschränke in der Planung?',
      en: 'Are built-in wardrobes planned?',
    },
    type: 'single',
    scorable: true,
    options: [
      { value: 'yes', label: { de: 'Ja', en: 'Yes' }, points: 6 },
      {
        value: 'partial',
        label: { de: 'Teilweise', en: 'Partly' },
        points: 3,
        recommendation: {
          de: 'Maximiere Einbauschränke überall wo möglich – besonders in Schlafzimmern und Fluren. Schreiner oder Systeme wie IKEA PAX bieten Maßlösungen für jedes Budget.',
          en: 'Maximise built-ins everywhere possible – especially in bedrooms and hallways. Carpenters or systems like IKEA PAX offer custom solutions for every budget.',
        },
      },
      {
        value: 'no',
        label: { de: 'Nein', en: 'No' },
        points: 0,
        recommendation: {
          de: 'Einbauschränke nutzen jeden Zentimeter und schaffen bis zu doppelt so viel Stauraum wie freistehende Möbel. Jetzt noch einplanen – besonders in Schlafzimmern.',
          en: 'Built-in wardrobes use every centimetre and create up to twice as much storage as freestanding furniture. Plan them now – especially in bedrooms.',
        },
      },
    ],
  },

  // ─── BLOCK 6 – MÖBLIERBARKEIT (15 pts) ───────────────────────────────────
  {
    id: 15,
    block: 6,
    blockTitle: { de: 'Möblierbarkeit', en: 'Furniture Placement' },
    blockEmoji: '🛋️',
    question: {
      de: 'Ist bereits klar, wo Sofa und Esstisch stehen werden?',
      en: 'Is it already clear where the sofa and dining table will go?',
    },
    type: 'single',
    scorable: true,
    options: [
      { value: 'yes', label: { de: 'Ja', en: 'Yes' }, points: 7 },
      {
        value: 'partial',
        label: { de: 'Teilweise', en: 'Partly' },
        points: 4,
        recommendation: {
          de: 'Lege jetzt fest, wo Sofa und Esstisch stehen werden. Diese beiden Möbel bestimmen die Positionen von Steckdosen, Lichtpunkten und Türen – wer das offen lässt, riskiert teure Nacharbeiten in der Elektroplanung.',
          en: 'Decide now where the sofa and dining table will go. These two pieces of furniture determine the positions of sockets, light points and doors – leaving this open risks costly changes to the electrical planning later.',
        },
      },
      {
        value: 'no',
        label: { de: 'Nein', en: 'No' },
        points: 0,
        recommendation: {
          de: 'Ohne festgelegte Position für Sofa und Esstisch riskierst du Fenster dort, wo Möbel stehen sollen, und Steckdosen an der falschen Wand. Erstelle einen Möblierungsplan im Maßstab 1:50 – das ist der einzige Weg, Fehler zu erkennen bevor sie gebaut sind.',
          en: 'Without a fixed position for the sofa and dining table, you risk windows where furniture should stand and sockets on the wrong wall. Create a furniture plan at 1:50 scale – that is the only way to spot mistakes before they are built.',
        },
      },
    ],
  },
  {
    id: 16,
    block: 6,
    blockTitle: { de: 'Möblierbarkeit', en: 'Furniture Placement' },
    blockEmoji: '🛋️',
    question: {
      de: 'Sind Fenster so geplant, dass Möbel sinnvoll platziert werden können?',
      en: 'Are windows planned so that furniture can be placed sensibly?',
    },
    type: 'single',
    scorable: true,
    options: [
      { value: 'yes', label: { de: 'Ja', en: 'Yes' }, points: 8 },
      {
        value: 'unsure',
        label: { de: 'Unsicher', en: 'Unsure' },
        points: 4,
        recommendation: {
          de: 'Erstelle einen Möblierungsplan und überprüfe: Gibt es mindestens 2 m breite zusammenhängende Wandflächen für Sofa und Schrank? Fenster unter 80 cm Höhe blockieren Stellflächen.',
          en: 'Create a furniture plan and check: Are there at least 2 m wide continuous wall areas for sofa and wardrobe? Windows below 80 cm height block placement areas.',
        },
      },
      {
        value: 'no',
        label: { de: 'Nein', en: 'No' },
        points: 0,
        recommendation: {
          de: 'Zu viele oder falsch positionierte Fenster sind einer der häufigsten Fehler. Regel: Mindestens eine 2,5 m breite freie Wandfläche pro Hauptraum für Möbelaufstellung sichern.',
          en: 'Too many or wrongly positioned windows are one of the most common mistakes. Rule: Secure at least one 2.5 m wide free wall area per main room for furniture placement.',
        },
      },
    ],
  },

  // ─── BLOCK 7 – KINDERFREUNDLICHKEIT (10 pts) ─────────────────────────────
  {
    id: 17,
    block: 7,
    blockTitle: { de: 'Kinderfreundlichkeit', en: 'Child-Friendliness' },
    blockEmoji: '👶',
    question: {
      de: 'Wie groß sind die Kinderzimmer?',
      en: "How large are the children's rooms?",
    },
    type: 'single',
    scorable: true,
    options: [
      {
        value: 'under10',
        label: { de: 'Unter 10 m²', en: 'Under 10 m²' },
        points: 0,
        recommendation: {
          de: 'Unter 10 m² ist ein Kinderzimmer kaum nutzbar – Bett, Schrank und Schreibtisch passen kaum rein. Prüfe ob Wände verschoben werden können.',
          en: "Under 10 m², a child's room is barely usable – bed, wardrobe and desk barely fit. Check if walls can be shifted.",
        },
      },
      {
        value: '12-15',
        label: { de: '12–15 m²', en: '12–15 m²' },
        points: 3,
        recommendation: {
          de: 'Solide Größe – Bett, Schrank und Schreibtisch haben Platz. Wenn möglich auf 15 m²+ erweitern für mehr Spielraum.',
          en: 'Solid size – bed, wardrobe and desk have room. Expand to 15 m²+ if possible for more play space.',
        },
      },
      { value: 'over20', label: { de: 'Über 20 m²', en: 'Over 20 m²' }, points: 5 },
    ],
  },
  {
    id: 18,
    block: 7,
    blockTitle: { de: 'Kinderfreundlichkeit', en: 'Child-Friendliness' },
    blockEmoji: '👶',
    question: {
      de: 'Gibt es kurze Wege zwischen Eltern- und Kinderzimmern?',
      en: "Are there short routes between parents' and children's rooms?",
    },
    type: 'single',
    scorable: true,
    options: [
      { value: 'yes', label: { de: 'Ja', en: 'Yes' }, points: 5 },
      {
        value: 'partial',
        label: { de: 'Teilweise', en: 'Partly' },
        points: 3,
        recommendation: {
          de: 'Kurze Wege sind vor allem in den ersten Jahren entscheidend – nachts zu einem Kleinkind über Treppen zu müssen, wird schnell zur Belastung. Plane Eltern- und Kinderzimmer auf derselben Ebene, aber nicht Wand an Wand: Ein kleiner Flur oder ein Bad dazwischen gibt später – wenn Kinder Teenager werden – natürliche Distanz und akustische Privatsphäre für beide Seiten. Du planst heute für die nächsten 20 Jahre.',
          en: "Short distances matter most in the early years — having to climb stairs to a toddler at night quickly becomes exhausting. Plan parents' and children's rooms on the same floor, but not wall to wall: a small hallway or bathroom in between gives natural distance and acoustic privacy later, when children become teenagers and both sides need their own space. You are planning today for the next 20 years.",
        },
      },
      {
        value: 'no',
        label: { de: 'Nein', en: 'No' },
        points: 0,
        recommendation: {
          de: 'Verschiedene Ebenen für Eltern- und Kinderzimmer bedeuten in den ersten Lebensjahren nächtliche Treppengänge – das summiert sich über Monate und Jahre erheblich. Gleichzeitig gilt: völlige Nähe ist langfristig auch nicht ideal. Teenagers brauchen Abstand und Privatsphäre – und Eltern auch. Das optimale Layout liegt auf derselben Ebene, mit einem natürlichen Puffer wie Flur, Bad oder Abstellraum dazwischen. Wenn eine Ebenenänderung nicht vermeidbar ist, lohnt sich zumindest ein Babyfon-System oder eine temporäre Lösung für die ersten Jahre einzuplanen.',
          en: "Separate floors for parents and children mean nightly stair trips in the early years — that adds up significantly over months and years. At the same time, being too close is not ideal long-term either. Teenagers need distance and privacy — and so do parents. The optimal layout is on the same floor with a natural buffer like a hallway, bathroom, or storage room in between. If a floor change is unavoidable, at least plan for a monitor system or a temporary solution for the first years.",
        },
      },
    ],
  },

  // ─── BLOCK 8 – BADEZIMMER (10 pts) ───────────────────────────────────────
  {
    id: 19,
    block: 8,
    blockTitle: { de: 'Badezimmer', en: 'Bathroom' },
    blockEmoji: '🛁',
    question: {
      de: 'Hat das Hauptbad Tageslicht?',
      en: 'Does the main bathroom have natural light?',
    },
    type: 'single',
    scorable: true,
    options: [
      { value: 'yes', label: { de: 'Ja', en: 'Yes' }, points: 5 },
      {
        value: 'no',
        label: { de: 'Nein', en: 'No' },
        points: 0,
        recommendation: {
          de: 'Ein Bad ohne Tageslicht wirkt schnell bedrückend und fühlt sich wie ein Bunker an. Prüfe Dachfenster, Oberlichter oder Lichtschächte als Alternative – das ist möglich, auch bei Innenbädern.',
          en: 'A bathroom without natural light quickly feels oppressive and bunker-like. Check skylights, clerestory windows or light wells as alternatives – possible even for interior bathrooms.',
        },
      },
    ],
  },
  {
    id: 20,
    block: 8,
    blockTitle: { de: 'Badezimmer', en: 'Bathroom' },
    blockEmoji: '🛁',
    question: {
      de: 'Ist Platz für Stauraum im Bad vorgesehen?',
      en: 'Is storage space planned in the bathroom?',
    },
    type: 'single',
    scorable: true,
    options: [
      { value: 'yes', label: { de: 'Ja', en: 'Yes' }, points: 5 },
      {
        value: 'unsure',
        label: { de: 'Unsicher', en: 'Unsure' },
        points: 2,
        recommendation: {
          de: 'Plane jetzt konkret: Nischen in der Dusche, Unterschränke am Waschtisch und ein Hochschrank (min. 30 cm tief) sind das Minimum für ein funktionales Bad.',
          en: 'Plan concretely now: niches in the shower, under-sink cabinets and a tall cabinet (min. 30 cm deep) are the minimum for a functional bathroom.',
        },
      },
      {
        value: 'no',
        label: { de: 'Nein', en: 'No' },
        points: 0,
        recommendation: {
          de: 'Bäder brauchen mehr Stauraum als du denkst: Handtücher, Putzmittel, Medikamente, Kosmetik. Plane Wandnischen, Unterschränke oder mindestens einen Hochschrank ein.',
          en: 'Bathrooms need more storage than you think: towels, cleaning supplies, medicines, cosmetics. Plan wall niches, under-sink cabinets, or at least one tall cabinet.',
        },
      },
    ],
  },

  // ─── BLOCK 9 – BONUSFRAGE (no score, lead capture) ───────────────────────
  {
    id: 21,
    block: 9,
    blockTitle: { de: 'Bonusfrage', en: 'Bonus Question' },
    blockEmoji: '💬',
    question: {
      de: 'Was bereitet dir aktuell am meisten Unsicherheit bei deinem Grundriss?',
      en: 'What is currently causing you the most uncertainty about your floor plan?',
    },
    type: 'text',
    scorable: false,
  },
]

export const TOTAL_QUESTIONS = questions.length
export const MAX_SCORE = 100
