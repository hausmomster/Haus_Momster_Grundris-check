export type Lang = 'de' | 'en'
export type PropertyType = 'both' | 'house' | 'apartment'

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
  skippable?: boolean
  forType?: PropertyType
  skipWhen?: (answers: Record<number, string>, propertyType: 'house' | 'apartment') => boolean
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
      de: 'In welcher Phase befindet sich dein Projekt aktuell?',
      en: 'What phase is your project currently in?',
    },
    type: 'single',
    scorable: false,
    options: [
      { value: 'search', label: { de: 'Grundstücks- oder Wohnungssuche', en: 'Looking for a property' }, points: 0 },
      { value: 'planning', label: { de: 'Grundriss in Planung', en: 'Floor plan in planning' }, points: 0 },
      { value: 'permit', label: { de: 'Bauantrag / Kaufvertrag läuft', en: 'Building permit / purchase contract in progress' }, points: 0 },
      { value: 'construction', label: { de: 'Bau oder Umbau läuft', en: 'Construction or renovation underway' }, points: 0 },
      { value: 'done', label: { de: 'Steht bereits', en: 'Already built' }, points: 0 },
    ],
  },
  {
    id: 2,
    block: 1,
    blockTitle: { de: 'Basisinfos', en: 'Basic Info' },
    blockEmoji: '🏠',
    forType: 'house',
    question: {
      de: 'Wie groß ist dein Haus?',
      en: 'How large is your house?',
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
    id: 26,
    block: 1,
    blockTitle: { de: 'Basisinfos', en: 'Basic Info' },
    blockEmoji: '🏠',
    forType: 'apartment',
    question: {
      de: 'Wie groß ist deine Wohnung?',
      en: 'How large is your apartment?',
    },
    type: 'single',
    scorable: false,
    options: [
      { value: 'xs', label: { de: 'Unter 60 m²', en: 'Under 60 m²' }, points: 0 },
      { value: 'small', label: { de: '60–80 m²', en: '60–80 m²' }, points: 0 },
      { value: 'medium', label: { de: '80–100 m²', en: '80–100 m²' }, points: 0 },
      { value: 'large', label: { de: '100–150 m²', en: '100–150 m²' }, points: 0 },
      { value: 'xlarge', label: { de: 'Über 150 m²', en: 'Over 150 m²' }, points: 0 },
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
          de: 'Eine Garderobennische ist eine der günstigsten und wirkungsvollsten Investitionen im Eingangsbereich. Plane mindestens 60 cm Tiefe (damit Kleiderbügel quer hängen können) und 80 cm Breite ein. Ideal ist eine Kombination aus Kleiderstange oben, Schuhschublade oder Schuhregal unten und Haken für Taschen. Wenn kein Platz für eine Nische ist, reicht auch ein 40 cm tiefer Einbauschrank mit Spiegel – das verändert das tägliche Erlebnis enorm.',
          en: "A wardrobe niche is one of the most cost-effective investments in an entrance area. Plan at least 60 cm depth (for cross-hanging coats) and 80 cm width. Ideal is a combination of a clothes rail above, a shoe drawer or rack below, and hooks for bags. If there is no room for a niche, a 40 cm deep built-in wardrobe with mirror also works – it makes an enormous difference to the daily experience.",
        },
      },
      {
        value: 'no',
        label: { de: 'Nein', en: 'No' },
        points: 0,
        recommendation: {
          de: 'Ohne Garderobenlösung stapeln sich Jacken, Schuhe und Taschen sofort im Flur – und von dort schleicht sich das Chaos in den Rest des Hauses. Das ist kein Stilproblem, sondern ein Planungsfehler. Eine Nische von mindestens 60 cm Tiefe und 80 cm Breite ist das Minimum. Wenn der Grundriss keine Nische erlaubt, lässt sich mit einem 40 cm tiefen Schrank, einer Bank mit Stauraum darunter und Wandhaken eine vollwertige Garderobenlösung schaffen. Prüfe jetzt, ob in der Nähe der Eingangstür Wandfläche vorhanden ist.',
          en: 'Without a wardrobe solution, coats, shoes and bags pile up in the hallway immediately – and from there, clutter creeps into the rest of the home. This is not a style problem, it is a planning error. A niche of at least 60 cm depth and 80 cm width is the minimum. If the floor plan does not allow a niche, a 40 cm deep wardrobe, a bench with storage underneath and wall hooks can create a full wardrobe solution. Check now whether there is wall space near the front door.',
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
          de: 'Eine vollständige Trennung zwischen Eingang und Wohnbereich ist mehr als eine Frage der Ästhetik – sie schützt vor Lärm, Gerüchen und dem Gefühl, dass alles sofort einsehbar ist. Selbst eine Sichtblende, ein halbhoher Raumteiler oder eine Schiebetür erzeugt eine psychologische Schwelle, die den Wohnbereich zur Oase macht. Überleg, ob du mit einer Wandnische, einem Schrank oder einem Raumteiler aus Holz oder Glas die Trennung verbessern kannst – das geht oft mit wenigen Zentimetern Spielraum und ohne Eingriff in die Statik.',
          en: 'A full separation between entrance and living area is more than an aesthetic question – it protects against noise, smells and the feeling that everything is immediately visible. Even a visual screen, half-height divider or sliding door creates a psychological threshold that turns the living area into a sanctuary. Consider whether a wall niche, wardrobe or room divider in wood or glass can improve the separation – often possible with just a few centimetres and without structural changes.',
        },
      },
      {
        value: 'no',
        label: { de: 'Nein', en: 'No' },
        points: 0,
        recommendation: {
          de: 'Ein Eingang direkt ins Wohnzimmer ist eine der am häufigsten bereuten Planungsentscheidungen – besonders wenn man Besuch bekommt oder die Kinder von draußen kommen. Das Chaos des Alltags (Jacken, Schuhe, Taschen) ist sofort sichtbar, der Eingang hat keine Pufferzone. Eine Schiebetür, ein Vorhang, ein halbhoher Raumteiler oder eine Wandnische mit Schrank schafft die notwendige Schwelle. Wenn der Grundriss es zulässt: Ein kleiner Flurbereich von 3–5 m² macht den Unterschied zwischen "komme nach Hause" und "falle direkt ins Wohnzimmer".',
          en: 'An entrance that opens directly into the living room is one of the most commonly regretted planning decisions – especially when having guests or when children come in from outside. The chaos of daily life (coats, shoes, bags) is immediately visible with no buffer zone. A sliding door, curtain, half-height divider or wall niche with wardrobe creates the necessary threshold. If the floor plan allows: even a small hallway area of 3–5 m² makes the difference between arriving home and falling straight into the living room.',
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
          de: 'Kritisch: Unter 90 cm Breite werden Durchgänge zur täglichen Frustration und einem echten Komfortproblem. Zwei Personen können nicht aneinander vorbeigehen, ein Kinderwagen kaum passieren, und mit vollen Einkaufstaschen wird jeder Gang zur Küche zum Hindernislauf. Das ist eine der wenigen Maßzahlen, bei der Nachgeben keine Option ist – hier muss umgeplant werden. Prüfe ob eine nicht-tragende Wand minimal verschoben werden kann: Schon 10–15 cm machen den Unterschied zwischen eng und komfortabel.',
          en: 'Critical: Under 90 cm, passages become daily frustration and a real comfort problem. Two people cannot pass each other, a pushchair barely fits, and every trip to the kitchen with full shopping bags becomes an obstacle course. This is one of the few dimensions where compromising is not an option – replanning is necessary. Check whether a non-load-bearing wall can be shifted slightly: even 10–15 cm makes the difference between tight and comfortable.',
        },
      },
      {
        value: '90-110',
        label: { de: '90–110 cm', en: '90–110 cm' },
        points: 5,
        recommendation: {
          de: 'Knapp ausreichend – aber bei 90–110 cm wird es mit Möbeln beidseits, einem Kinderwagen oder beim Tragen von Einkäufen schnell eng. Alleine passt man problemlos durch, aber sobald zwei Personen gleichzeitig den Flur nutzen, entsteht ein Engpass. Prüfe ob du an einer oder mehreren Stellen 10–20 cm gewinnen kannst – oft durch eine minimal verschwenkte Wand oder durch Aufgabe eines Vorsprungs.',
          en: 'Barely enough – at 90–110 cm, things get tight with furniture on both sides, a pushchair, or when carrying shopping bags. One person passes through easily, but as soon as two people use the hallway simultaneously, a bottleneck forms. Check whether you can gain 10–20 cm in one or more places – often possible by slightly shifting a wall or removing a projection.',
        },
      },
      { value: 'over110', label: { de: 'Über 110 cm', en: 'Over 110 cm' }, points: 8 },
      {
        value: 'unknown',
        label: { de: 'Weiß ich nicht', en: "I don't know" },
        points: 3,
        recommendation: {
          de: 'Die Breite der Hauptdurchgänge ist eine der wichtigsten und am häufigsten übersehenen Maßzahlen im Grundriss. Miss sofort nach: Nimm ein Maßband und messe alle Engstellen – besonders zwischen Türrahmen, Treppen und dem Übergang von Flur zu Wohnbereich. Ziel sind mindestens 90 cm (Minimum), besser 110–120 cm. Alles darunter wird mit zunehmendem Möbelbestand zur spürbaren Einschränkung im Alltag.',
          en: "The width of main passages is one of the most important and most overlooked dimensions in a floor plan. Measure right away: take a tape measure and check all tight spots – especially between door frames, stairs and the transition from hallway to living area. Aim for at least 90 cm (minimum), preferably 110–120 cm. Anything less becomes a noticeable daily restriction as furniture accumulates.",
        },
      },
    ],
  },
  {
    id: 7,
    block: 3,
    blockTitle: { de: 'Durchgänge', en: 'Corridors & Passages' },
    blockEmoji: '📏',
    forType: 'house',
    question: {
      de: 'Wie breit sind die Nebendurchgänge (z.B. Nebenflur, Abstellraum)?',
      en: 'How wide are the secondary passages (e.g. secondary hallway, storage room)?',
    },
    type: 'single',
    scorable: false,
    options: [
      {
        value: 'under80',
        label: { de: 'Unter 80 cm', en: 'Under 80 cm' },
        points: 0,
        recommendation: {
          de: 'Nebendurchgänge unter 80 cm werden im Alltag zur Engstelle – besonders beim Tragen von Wäschekörben, Kisten oder mit Kindern. 80 cm ist der absolute Mindestwert für Nebenwege; Türen brauchen außerdem Aufschlagfläche, die den nutzbaren Durchgang weiter reduziert. Prüfe ob die Wand minimal verschoben werden kann oder ob die Tür durch eine Schiebetür ersetzt werden kann, die keinen Aufschlagbereich benötigt.',
          en: 'Secondary passages under 80 cm become bottlenecks in everyday use – especially when carrying laundry baskets, boxes or with children. 80 cm is the absolute minimum for secondary routes; doors also need swing clearance which further reduces the usable passage. Check whether the wall can be shifted slightly or whether the door can be replaced with a sliding door that needs no swing clearance.',
        },
      },
      {
        value: '80-90',
        label: { de: '80–90 cm', en: '80–90 cm' },
        points: 0,
        recommendation: {
          de: 'Ausreichend für Nebenwege – aber wenn du noch in der Planungsphase bist, prüfe ob du auf 90 cm erweitern kannst. Das macht einen spürbaren Unterschied, besonders mit Wäschekörben, Reinigungsgeräten oder wenn die Kinder größer werden. Schiebetüren statt Drehtüren können hier zusätzlich Nutzfläche zurückgewinnen.',
          en: 'Sufficient for secondary routes – but if you are still in the planning phase, check whether you can expand to 90 cm. This makes a noticeable difference, especially with laundry baskets, cleaning equipment, or as children grow. Sliding doors instead of hinged doors can also reclaim usable space here.',
        },
      },
      { value: 'over90', label: { de: 'Über 90 cm', en: 'Over 90 cm' }, points: 0 },
      { value: 'none', label: { de: 'Keine Nebendurchgänge', en: 'No secondary passages' }, points: 0 },
      {
        value: 'unknown',
        label: { de: 'Weiß ich nicht', en: "I don't know" },
        points: 0,
        recommendation: {
          de: 'Miss alle Durchgänge im Grundriss nach – auch Nebenwege zu Abstellräumen, Hauswirtschaftsraum und Technikraum sollten mindestens 80 cm breit sein. Denk daran: Die nominale Wandöffnung ist nicht der nutzbare Durchgang – Türrahmen und Aufschlagbereich der Tür reduzieren die lichte Breite nochmals um 5–10 cm.',
          en: 'Measure all passages in the floor plan – even secondary routes to storage, utility and technical rooms should be at least 80 cm wide. Remember: the nominal wall opening is not the usable passage – door frames and the door swing area further reduce the clear width by 5–10 cm.',
        },
      },
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
          de: 'Erstelle einen detaillierten Möblierungsplan im Maßstab 1:50 – mit Millimeterpapier oder einer App wie Roomsketcher oder Planner 5D. Zeichne alle geplanten Möbel maßstabsgerecht ein und miss dann die verbleibenden Durchgänge. Viele Engstellen entstehen erst, wenn Sofa, Esstisch und Schrank gleichzeitig im Raum stehen. Der Mindestabstand für einen komfortablen Durchgang beträgt 90 cm, für Hauptwege besser 100–120 cm.',
          en: 'Create a detailed furniture plan at 1:50 scale – using graph paper or an app like Roomsketcher or Planner 5D. Draw all planned furniture to scale and then measure the remaining passage widths. Many bottlenecks only appear when sofa, dining table and wardrobe are all in the room simultaneously. The minimum clearance for comfortable passage is 90 cm, for main routes preferably 100–120 cm.',
        },
      },
      {
        value: 'yes',
        label: { de: 'Ja', en: 'Yes' },
        points: 0,
        recommendation: {
          de: 'Bekannte Engstellen jetzt anzugehen ist entscheidend – sie lassen sich nach dem Bau kaum noch korrigieren. Dokumentiere jede Engstelle und prüfe ob der Möbelplan angepasst werden kann, Wände minimale Korrekturen ermöglichen, oder Türen in eine andere Richtung öffnen können (oder durch Schiebetüren ersetzt werden). Der Mindestabstand für Durchgangsbereiche sind 90 cm – alles darunter ist im Alltag nicht nur unbequem, sondern kann auch Anforderungen für barrierefreies Bauen verletzen.',
          en: 'Addressing known bottlenecks now is crucial – they are nearly impossible to correct after construction. Document each bottleneck and check whether the furniture plan can be adjusted, walls allow minimal corrections, or doors can open in a different direction (or be replaced by sliding doors). The minimum clearance for passage areas is 90 cm – anything less is not just uncomfortable in daily use but may also violate accessibility building requirements.',
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
        label: { de: 'Einzeiler', en: 'Single-line kitchen' },
        points: 4,
        recommendation: {
          de: 'Ein Einzeiler ist funktional, hat aber zwei strukturelle Schwächen: wenig Arbeitsfläche und keine Möglichkeit, dass zwei Personen gleichzeitig komfortabel kochen. Prüfe ob du mit einer L-Erweiterung (selbst 60–80 cm reichen) oder einer kleinen Kücheninsel (min. 80x80 cm) wesentlich mehr Nutzbarkeit gewinnst. Besonders die Kombination mit einer kleinen Frühstückstheke kann den Einzeiler zu einer vollwertigen Küche aufwerten – oft ohne große Grundrissänderung.',
          en: 'A single-line kitchen is functional but has two structural weaknesses: limited worktop space and no way for two people to cook comfortably at the same time. Check whether an L-extension (even 60–80 cm is enough) or a small kitchen island (min. 80x80 cm) gives you significantly more usability. Combining it with a small breakfast bar can often upgrade a galley kitchen to a fully functional one – frequently without major floor plan changes.',
        },
      },
      {
        value: 'open',
        label: { de: 'Noch offen', en: 'Not yet decided' },
        points: 2,
        recommendation: {
          de: 'Die Küchenform ist eine der wichtigsten Entscheidungen im Grundriss – sie bestimmt alle Folgeplanungen: Wasseranschlüsse, Abluftkanäle, Elektroanschlüsse, Lichtplanung. Wer die Form zu lange offenlässt, riskiert teure Nacharbeiten oder muss sich mit einer suboptimalen Lösung abfinden. Inselküche und L-Form bieten den besten Arbeitsfluss für zwei Personen und die größte Flexibilität. Triff diese Entscheidung jetzt und kommuniziere sie deinem Architekten oder Planer.',
          en: 'The kitchen layout is one of the most important decisions in the floor plan – it determines all subsequent planning: plumbing connections, extract ducting, electrical connections, lighting design. Leaving the layout open too long risks expensive changes later or settling for a suboptimal solution. Island and L-shape offer the best workflow for two people and the greatest flexibility. Make this decision now and communicate it to your architect or planner.',
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
    skipWhen: (answers) => answers[9] !== 'island',
    options: [
      {
        value: 'under100',
        label: { de: 'Unter 100 cm', en: 'Under 100 cm' },
        points: 0,
        recommendation: {
          de: 'Kritisch: Ein Abstand von unter 100 cm zwischen Küche und Insel ist einer der häufigsten und folgenschwersten Planungsfehler. Zwei Personen können nicht gleichzeitig in der Küche arbeiten, ohne sich ständig im Weg zu stehen. Sofort umplanen – Ziel sind mindestens 120 cm.',
          en: "Critical: A clearance of under 100 cm between the kitchen counter and island is one of the most common and consequential planning errors. Two people cannot work in the kitchen at the same time without constantly being in each other's way. Replan immediately – aim for at least 120 cm.",
        },
      },
      {
        value: '100-115',
        label: { de: '100–115 cm', en: '100–115 cm' },
        points: 6,
        recommendation: {
          de: "Ausreichend, aber nicht komfortabel. Bei 100–115 cm kann man nicht aneinander vorbeigehen, ohne sich zu berühren. Wenn möglich, auf 120 cm erweitern.",
          en: "Sufficient but not comfortable. At 100–115 cm, you can't pass each other without touching. Expand to 120 cm if possible.",
        },
      },
      { value: 'ab120', label: { de: 'Über 120 cm', en: 'Over 120 cm' }, points: 8 },
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
          de: 'Eine Speisekammer ist eine der günstigsten und wirkungsvollsten Investitionen in eine Küche. Schon ein tiefer Hochschrank (60 cm Tiefe, 40–60 cm Breite) schafft Platz für Vorräte, die sonst auf der Arbeitsfläche stehen oder schwer zugänglich in tiefen Unterschränken verschwinden. Eine begehbare Speisekammer ab 80x100 cm ist der Idealfall – aber auch eine Wandnische mit Schiebetür hinter der Küche erfüllt denselben Zweck. Plane das jetzt, solange noch Wände verändert werden können.',
          en: 'A pantry is one of the most cost-effective investments in a kitchen. Even a deep tall cabinet (60 cm depth, 40–60 cm width) creates space for provisions that would otherwise clutter the worktop or disappear inaccessibly in deep base units. A walk-in pantry from 80x100 cm is the ideal – but a wall niche with sliding door behind the kitchen achieves the same purpose. Plan this now while walls can still be changed.',
        },
      },
      {
        value: 'no',
        label: { de: 'Nein', en: 'No' },
        points: 0,
        recommendation: {
          de: 'Ohne Vorratslösung fehlt in der Küche sehr schnell Platz – für Lebensmittel, Getränkekästen, Putzmittel und Küchengeräte. Viele Küchen sehen im Showroom perfekt aus und sind nach wenigen Wochen Alltag bereits voll. Ein dedizierter Hochschrank für Vorräte (mind. 60 cm tief, 40–60 cm breit) ist das Minimum. Die ideale Lösung ist eine separate Speisekammer – selbst 1–2 m² in der Nähe der Küche machen einen enormen Unterschied. Plane das jetzt, solange Wände noch verändert werden können.',
          en: 'Without a storage solution, space runs out in the kitchen very quickly – for food, drink crates, cleaning supplies and kitchen appliances. Many kitchens look perfect in the showroom and are already full after a few weeks of daily use. A dedicated tall cabinet for provisions (min. 60 cm deep, 40–60 cm wide) is the minimum. The ideal solution is a separate pantry – even 1–2 m² near the kitchen makes an enormous difference. Plan this now while walls can still be changed.',
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
          de: 'Priorisiere den Hauswirtschaftsraum – er steht ganz oben auf der Liste der "Das hätte ich anders geplant"-Aussagen von Bauherrinnen. 4–6 m² reichen vollkommen: Waschmaschine, Trockner, Bügelbrett, Putzeimer, Reinigungsmittel – alles hinter einer geschlossenen Tür, unsichtbar und geräuschdämmend. Wichtig: Plane ihn möglichst im Erdgeschoss oder neben der Küche ein, nicht im Keller – ein Hauswirtschaftsraum im Keller wird deutlich seltener genutzt und die Treppe wird zur täglichen Belastung.',
          en: 'Prioritise the utility room – it is at the top of the "I would have planned that differently" list among homebuilders. 4–6 m² is perfectly sufficient: washing machine, dryer, ironing board, mop bucket, cleaning supplies – all behind a closed door, out of sight and sound-insulated. Important: plan it on the ground floor or next to the kitchen if possible, not in the basement – a basement utility room gets used far less and the stairs become a daily burden.',
        },
      },
      {
        value: 'no',
        label: { de: 'Nein', en: 'No' },
        points: 0,
        recommendation: {
          de: 'Der Hauswirtschaftsraum ist der am meisten bereute fehlende Raum bei Familien. Ohne ihn landet die Waschmaschine in der Küche oder im Bad, der Trockner steht irgendwo im Flur, das Bügelbrett hat keinen festen Platz und Putzmittel stehen sichtbar herum. 4 m² reichen vollkommen – und dieser Raum amortisiert sich täglich durch gewonnene Lebensqualität. Wenn der Grundriss keinen separaten Raum erlaubt: Eine große Einbaunische (mind. 1,20 m breit, 60 cm tief) mit Schiebetür ist besser als nichts.',
          en: 'The utility room is the most commonly regretted missing room for families. Without one, the washing machine ends up in the kitchen or bathroom, the dryer stands somewhere in the hallway, the ironing board has no fixed place and cleaning supplies are visibly on display. 4 m² is perfectly sufficient – and this room pays for itself daily in improved quality of life. If the floor plan does not allow a separate room: a large built-in niche (min. 1.20 m wide, 60 cm deep) with a sliding door is better than nothing.',
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
          de: 'Der Flur ist die erste und letzte Zone des Hauses, die man jeden Tag durchquert – und genau deshalb der erste Ort, an dem Chaos entsteht. Jacken, Schuhe, Taschen, Sporttaschen, Schirme – ohne Stauraumlösung türmt sich das alles an der Wand. Plane Einbauschränke (min. 40 cm tief für Jacken, besser 55–60 cm) oder eine Nische mit Schiebetüren ein. Die effizienteste Kombination für schmale Flure: Bank mit Stauraum darunter, Haken an der Wand und ein Schrank von Boden bis Decke darüber.',
          en: 'The hallway is the first and last zone of the home you pass through every day – and precisely therefore the first place chaos develops. Coats, shoes, bags, sports bags, umbrellas – without a storage solution, all of this piles up against the wall. Plan built-in wardrobes (min. 40 cm deep for coats, preferably 55–60 cm) or a niche with sliding doors. The most efficient combination for narrow hallways: a bench with storage underneath, hooks on the wall, and a floor-to-ceiling wardrobe above.',
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
          de: 'Maximiere Einbauschränke überall, wo es der Grundriss erlaubt – besonders in Schlafzimmern, Fluren und Nischen neben Treppen. Ein professionell geplanter Einbauschrank nutzt jeden Zentimeter von Boden bis Decke und schafft bis zu doppelt so viel Stauraum wie ein freistehender Schrank gleicher Breite. Schreiner sind die komfortabelste Lösung, aber auch Systeme wie IKEA PAX oder Elfa bieten hochwertige Maßlösungen für deutlich weniger Budget. Prüfe besonders Nischen unter Dachschrägen – oft ungenutzt und ideal für Einbaulösungen.',
          en: 'Maximise built-in wardrobes everywhere the floor plan allows – especially in bedrooms, hallways and niches beside staircases. A professionally planned built-in uses every centimetre from floor to ceiling and creates up to twice as much storage as a freestanding wardrobe of the same width. Carpenters are the most comfortable solution, but systems like IKEA PAX or Elfa also offer high-quality custom solutions for significantly less budget. Check especially niches under sloping roofs – often unused and ideal for built-in solutions.',
        },
      },
      {
        value: 'no',
        label: { de: 'Nein', en: 'No' },
        points: 0,
        recommendation: {
          de: 'Fehlende Einbauschränke sind einer der am schwersten nachzurüstenden Planungsmängel – nach dem Bau fehlt oft die passende Wandfläche oder die Deckenhöhe lässt keinen raumhohen Schrank mehr zu. Einbauschränke nutzen den Raum von Boden bis Decke, schaffen keine toten Ecken und integrieren sich optisch in die Architektur. Plane jetzt: Flur, Schlafzimmer, Nischen unter Treppen und Dachschrägen sind die besten Standorte. Selbst ein 40 cm tiefer Schrank macht den Unterschied zwischen funktionalem Stauraum und gar keinem.',
          en: 'Missing built-in wardrobes are one of the hardest planning deficiencies to retrofit – after construction there is often no suitable wall area, or the ceiling height no longer allows a floor-to-ceiling wardrobe. Built-ins use the space from floor to ceiling, create no dead corners and integrate visually into the architecture. Plan now: hallway, bedrooms, niches under stairs and sloping roofs are the best locations. Even a 40 cm deep wardrobe makes the difference between functional storage and none at all.',
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
          de: 'Lege jetzt mit einem Möblierungsplan im Maßstab 1:50 fest, wo Sofa und Esstisch stehen. Diese zwei Möbel definieren alles andere: wo Steckdosen gesetzt werden, wo Pendelleuchten hängen, wo Türen aufgehen dürfen und welche Wandflächen für Stauraum frei bleiben. Wer das in der Planung offenlässt, zahlt später beim Elektriker nach oder sitzt mit Fenstern genau dort, wo der Schrank stehen sollte. Ein Möblierungsplan lässt sich in einer Stunde erstellen und spart erhebliche Nachkosten.',
          en: 'Use a furniture plan at 1:50 scale to fix now where the sofa and dining table will go. These two pieces of furniture define everything else: where sockets are placed, where pendant lights hang, where doors may open and which wall areas remain free for storage. Leaving this open during planning means paying the electrician for changes later, or ending up with windows exactly where the wardrobe should stand. A furniture plan takes an hour to create and saves significant extra costs.',
        },
      },
      {
        value: 'no',
        label: { de: 'Nein', en: 'No' },
        points: 0,
        recommendation: {
          de: 'Ohne Möblierungsplan im Maßstab 1:50 baut man quasi ins Ungewisse. Fenster enden genau dort, wo der Schrank stehen soll. Steckdosen sitzen hinter dem Sofa. Türen schlagen in den Esszimmerstuhl. Das sind die Klassiker – und sie passieren fast ausschließlich dann, wenn kein Möblierungsplan gemacht wurde. Erstelle ihn jetzt: Nimm Millimeterpapier (1 cm = 50 cm im Raum) oder nutze Apps wie Roomsketcher, Planner 5D oder HomeByMe – alle kostenlos. Dann erst kommt die Elektroplanung.',
          en: 'Without a furniture plan at 1:50 scale, you are essentially building blind. Windows end exactly where the wardrobe should stand. Sockets end up behind the sofa. Doors swing into dining chairs. These are the classic mistakes – and they occur almost exclusively when no furniture plan has been made. Create one now: use graph paper (1 cm = 50 cm in real life) or apps like Roomsketcher, Planner 5D or HomeByMe – all free. Only then should the electrical planning follow.',
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
          de: 'Erstelle einen Möblierungsplan und überprüfe systematisch: Hat jedes Hauptzimmer mindestens eine 2 m breite zusammenhängende Wand ohne Fenster oder Tür? Fenster unter 80 cm ab Bodenhöhe blockieren Möbelaufstellung auf der gesamten Wandlänge. Eine Ecke, die von zwei Fensterwänden eingeschlossen wird, ist unbrauchbar für Schränke. Gut geplante Fenster sitzen hoch (ab 85–90 cm Brüstungshöhe) und lassen darunter Anrichten, Sofas und Sideboards zu.',
          en: 'Create a furniture plan and check systematically: does every main room have at least one 2 m wide uninterrupted wall without windows or doors? Windows below 80 cm from the floor block furniture placement along the entire wall length. A corner enclosed by two window walls is unusable for wardrobes. Well-planned windows sit high (from 85–90 cm sill height) and allow consoles, sofas and sideboards below them.',
        },
      },
      {
        value: 'no',
        label: { de: 'Nein', en: 'No' },
        points: 0,
        recommendation: {
          de: 'Zu viele oder falsch positionierte Fenster zählen zu den häufigsten Grundrissfehlern – weil sie auf dem Papier toll aussehen, im Möblierungsplan aber Probleme machen. Grundregel: Mindestens eine 2,50 m breite freie Wandfläche pro Hauptraum ist Pflicht. Fenster, die bis auf 50 cm an den Boden reichen, verhindern Möbelaufstellung auf der gesamten Wandseite. Wenn du noch in der Planungsphase bist: Gehe jeden Raum durch und kläre zuerst, welche Wand für das Hauptmöbelstück (Sofa, Bett, Schrank) gedacht ist – plane Fenster dann danach, nicht umgekehrt.',
          en: 'Too many or wrongly positioned windows are among the most common floor plan mistakes – because they look great on paper but create problems in the furniture layout. Ground rule: at least one 2.50 m wide free wall area per main room is essential. Windows that reach to within 50 cm of the floor block furniture placement along the entire wall side. If you are still in the planning phase: go through each room and first establish which wall is intended for the main piece of furniture (sofa, bed, wardrobe) – then plan windows accordingly, not the other way around.',
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
      de: 'Wie groß sind die Kinder- oder Arbeitszimmer?',
      en: "How large are the children's or office rooms?",
    },
    type: 'single',
    scorable: true,
    skippable: true,
    skipWhen: (answers, propertyType) =>
      propertyType === 'apartment' && (answers[26] === 'xs' || answers[26] === 'small'),
    options: [
      {
        value: 'under10',
        label: { de: 'Unter 10 m²', en: 'Under 10 m²' },
        points: 0,
        recommendation: {
          de: 'Unter 10 m² ist ein Kinder- oder Arbeitszimmer kaum als vollwertiger Raum nutzbar. Ein Einzelbett braucht schon 2 m², ein Kleiderschrank mindestens 2 m², ein Schreibtisch mit Stuhl 1,5 m² – damit sind 10 m² bereits vollständig belegt, ohne Abstand zu den Wänden oder Spielfläche. Prüfe ob benachbarte Wände geringfügig verschoben werden können – oft reichen 30–50 cm, um einen Raum von 9 m² auf 12 m² zu bringen und damit vollwertig nutzbar zu machen.',
          en: "Under 10 m², a children's or office room is barely usable as a full room. A single bed needs 2 m², a wardrobe at least 2 m², a desk with chair 1.5 m² – meaning 10 m² is already fully occupied with no clearance from walls or play space. Check whether adjacent walls can be shifted slightly – often 30–50 cm is enough to take a 9 m² room to 12 m², making it properly usable.",
        },
      },
      {
        value: '12-15',
        label: { de: '12–15 m²', en: '12–15 m²' },
        points: 3,
        recommendation: {
          de: '12–15 m² ist eine solide Ausgangsgröße für Kinder- und Arbeitszimmer. Bett, Schrank und Schreibtisch haben Platz, und es bleibt noch etwas Spielfläche. Wenn der Grundriss es erlaubt, lohnt sich eine Erweiterung auf 15–18 m² – das gibt die Möglichkeit, einen zweiten Schreibtisch oder ein zweites Kinderbett später noch hinzuzufügen, ohne dass es beengt wird. Achte außerdem auf die Türposition: Sie sollte keine wertvolle Wandfläche verschneiden.',
          en: "12–15 m² is a solid starting size for children's and office rooms. Bed, wardrobe and desk have room, and some play space remains. If the floor plan allows, an expansion to 15–18 m² is worthwhile – this gives the option to add a second desk or a second children's bed later without it becoming cramped. Also pay attention to the door position: it should not cut into valuable wall space.",
        },
      },
      { value: 'over20', label: { de: 'Über 20 m²', en: 'Over 20 m²' }, points: 5 },
      { value: 'skip', label: { de: 'Nicht zutreffend', en: 'Not applicable' }, points: 0 },
    ],
  },
  {
    id: 18,
    block: 7,
    blockTitle: { de: 'Kinderfreundlichkeit', en: 'Child-Friendliness' },
    blockEmoji: '👶',
    forType: 'house',
    question: {
      de: 'Gibt es kurze Wege zwischen Eltern- und Kinderzimmern?',
      en: "Are there short routes between parents' and children's rooms?",
    },
    type: 'single',
    scorable: true,
    skippable: true,
    options: [
      { value: 'yes', label: { de: 'Ja', en: 'Yes' }, points: 5 },
      {
        value: 'partial',
        label: { de: 'Teilweise', en: 'Partly' },
        points: 3,
        recommendation: {
          de: 'Kurze Wege sind vor allem in den ersten Jahren entscheidend – nachts zu einem Kleinkind über Treppen zu müssen, wird schnell zur Belastung. Plane Eltern- und Kinderzimmer auf derselben Ebene, aber nicht Wand an Wand: Ein kleiner Flur oder ein Bad dazwischen gibt später natürliche Distanz und akustische Privatsphäre für beide Seiten.',
          en: "Short distances matter most in the early years — having to climb stairs to a toddler at night quickly becomes exhausting. Plan parents' and children's rooms on the same floor, but not wall to wall: a small hallway or bathroom in between gives natural distance and acoustic privacy later.",
        },
      },
      {
        value: 'no',
        label: { de: 'Nein', en: 'No' },
        points: 0,
        recommendation: {
          de: 'Verschiedene Ebenen für Eltern- und Kinderzimmer bedeuten in den ersten Lebensjahren nächtliche Treppengänge. Gleichzeitig gilt: völlige Nähe ist langfristig nicht ideal. Das optimale Layout liegt auf derselben Ebene, mit einem natürlichen Puffer wie Flur, Bad oder Abstellraum dazwischen.',
          en: "Separate floors for parents and children mean nightly stair trips in the early years. At the same time, being too close is not ideal long-term. The optimal layout is on the same floor with a natural buffer like a hallway, bathroom, or storage room in between.",
        },
      },
      { value: 'skip', label: { de: 'Nicht zutreffend', en: 'Not applicable' }, points: 0 },
    ],
  },

  // ─── BLOCK 8 – AUßENBEREICH: HAUS ────────────────────────────────────────
  {
    id: 22,
    block: 8,
    blockTitle: { de: 'Außenbereich', en: 'Outdoor Area' },
    blockEmoji: '🌿',
    forType: 'house',
    question: {
      de: 'Ist der Garten oder die Terrasse direkt vom Wohnbereich zugänglich?',
      en: 'Is the garden or terrace directly accessible from the living area?',
    },
    type: 'single',
    scorable: true,
    options: [
      { value: 'yes', label: { de: 'Ja, direkt vom Wohn- oder Essbereich', en: 'Yes, directly from the living or dining area' }, points: 5 },
      {
        value: 'indirect',
        label: { de: 'Nur über Umwege oder andere Räume', en: 'Only via detour or other rooms' },
        points: 2,
        recommendation: {
          de: 'Ein direkter Zugang zur Terrasse oder zum Garten vom Wohn- oder Essbereich ist einer der Faktoren, der die Aufenthaltsqualität im Alltag am stärksten beeinflusst – besonders im Sommer. Wenn der Zugang derzeit über andere Räume führt, prüfe ob eine Terrassentür nachgerüstet werden kann. Eine Terrassentür im Essbereich ist meist die sinnvollste Wahl: Sie verbindet Innen- und Außenessen und verlängert den Wohnraum nach draußen. Achte auf eine barrierefreie Schwelle (unter 2 cm) – sie macht den Übergang fließend und verhindert Stolperfallen.',
          en: 'Direct access from the living or dining area to the terrace or garden is one of the factors that most strongly influences quality of life in daily use – especially in summer. If access currently runs through other rooms, check whether a terrace door can be added. A terrace door in the dining area is usually the most sensible choice: it connects indoor and outdoor dining and extends the living space outside. Pay attention to a barrier-free threshold (under 2 cm) – it makes the transition seamless and prevents trip hazards.',
        },
      },
      {
        value: 'no',
        label: { de: 'Kein Außenbereich geplant', en: 'No outdoor area planned' },
        points: 0,
        recommendation: {
          de: 'Kein Außenbereich beim Haus ist eine Einschränkung, die im Alltag stark spürbar ist – besonders in den Sommermonaten, wenn der Außenbereich gefühlt zum zweiten Wohnraum wird. Selbst eine kleine Terrasse von 10–15 m² verdoppelt gefühlt den nutzbaren Wohnraum im Sommer. Wenn der Grundriss noch verändert werden kann: Eine Terrassentür im Essbereich ist oft die wirkungsvollste Einzelmaßnahme. Falls der Bau bereits fortgeschritten ist: Prüfe ob eine nachträgliche Terrasse, ein Wintergarten oder ein überdachter Außenbereich mit Pergola möglich ist.',
          en: 'No outdoor area for a house is a restriction that is strongly felt in daily life – especially in summer months when the outdoor area effectively becomes a second living space. Even a small terrace of 10–15 m² doubles the feeling of usable living space in summer. If the floor plan can still be changed: a terrace door in the dining area is often the most impactful single measure. If construction is already advanced: check whether a retrofit terrace, conservatory or covered outdoor area with pergola is possible.',
        },
      },
    ],
  },
  {
    id: 23,
    block: 8,
    blockTitle: { de: 'Außenbereich', en: 'Outdoor Area' },
    blockEmoji: '🌿',
    forType: 'house',
    question: {
      de: 'Gibt es einen separaten Technik- oder Heizungsraum?',
      en: 'Is there a dedicated utility or heating room?',
    },
    type: 'single',
    scorable: true,
    options: [
      { value: 'yes', label: { de: 'Ja, eigener Raum geplant', en: 'Yes, dedicated room planned' }, points: 5 },
      {
        value: 'integrated',
        label: { de: 'Im Keller oder HWR integriert', en: 'Integrated in basement or utility room' },
        points: 3,
        recommendation: {
          de: 'Eine Integration in Keller oder Hauswirtschaftsraum ist für viele Häuser ausreichend. Ein separater Technikraum hat jedoch zwei klare Vorteile: Er isoliert den Betriebslärm von Heizung, Lüftung und Pumpen besser, und Wartungsarbeiten lassen sich einfacher und sicherer durchführen, wenn der Raum ausschließlich dafür vorgesehen ist. Falls du einen Hauswirtschaftsraum hast: Prüfe ob du eine separate Abtrennung (Schranktür oder Wandnische) für die Haustechnik integrieren kannst – das macht den Unterschied in der täglichen Nutzung.',
          en: 'Integration in the basement or utility room is sufficient for many houses. However, a separate technical room has two clear advantages: it better insulates the operating noise from heating, ventilation and pumps, and maintenance work is easier and safer to carry out when the room is dedicated exclusively to it. If you have a utility room: check whether you can integrate a separate partition (wardrobe door or wall niche) for the building services – this makes a difference in daily use.',
        },
      },
      {
        value: 'no',
        label: { de: 'Nein, nicht geplant', en: 'No, not planned' },
        points: 0,
        recommendation: {
          de: 'Heizung, Warmwasserbereiter, Lüftungsanlage und Elektroverteilung brauchen Platz, Zugänglichkeit und Sicherheitsabstände. Ohne dedizierten Technikraum landen diese Systeme unsortiert im Keller, in der Abstellkammer oder schlimmstenfalls im Wohnbereich – das erschwert Wartung, schränkt Möblierung ein und führt in der Heizperiode zu störendem Betriebslärm. Plane mindestens 4–6 m² für einen separaten Technikraum ein, idealerweise mit direktem Zugang vom Nebeneingang oder Flur, nicht vom Wohnbereich.',
          en: 'Heating, hot water, ventilation and electrical distribution systems need space, accessibility and safety clearances. Without a dedicated technical room, these systems end up unsorted in the basement, storage room or worst case the living area – making maintenance harder, limiting furniture placement and causing disruptive operating noise during the heating season. Plan at least 4–6 m² for a separate technical room, ideally with direct access from the secondary entrance or hallway, not from the living area.',
        },
      },
    ],
  },

  // ─── BLOCK 8 – AUßENBEREICH: WOHNUNG ─────────────────────────────────────
  {
    id: 25,
    block: 8,
    blockTitle: { de: 'Außen & Komfort', en: 'Outdoor & Comfort' },
    blockEmoji: '🌿',
    forType: 'apartment',
    question: {
      de: 'Sind die Schlafzimmer von der Straßenseite oder lauten Bereichen akustisch geschützt?',
      en: 'Are the bedrooms acoustically protected from the street or noisy areas?',
    },
    type: 'single',
    scorable: true,
    options: [
      { value: 'yes', label: { de: 'Ja, Schlafzimmer zeigen zur ruhigen Seite', en: 'Yes, bedrooms face the quiet side' }, points: 5 },
      {
        value: 'partial',
        label: { de: 'Teilweise', en: 'Partly' },
        points: 2,
        recommendation: {
          de: 'Schlafzimmer zur Straße sind eine der häufigsten Komfortquellen in Stadtwohnungen – und einer der schwierigsten Mängel, die nachträglich zu korrigieren sind. Prüfe ob Schlaf- und Kinderzimmer auf die ruhigere Hof- oder Gartenseite verlegt werden können. Falls das nicht möglich ist: Dreifachverglasung (Schallschutzklasse 4 oder höher) ist die wichtigste Einzelmaßnahme und amortisiert sich schnell in besserer Schlafqualität. Ergänzend: schwere Vorhänge und schallabsorbierende Wandmaterialien (Bücherregale, Akustikpaneele) reduzieren den Lärm zusätzlich.',
          en: 'Bedrooms facing the street are one of the most common comfort problems in city apartments – and one of the hardest deficiencies to correct retrospectively. Check whether bedrooms and children\'s rooms can be moved to the quieter courtyard or garden side. If that is not possible: triple glazing (sound insulation class 4 or higher) is the most important single measure and pays for itself quickly in improved sleep quality. Additionally: heavy curtains and sound-absorbing wall materials (bookshelves, acoustic panels) further reduce noise.',
        },
      },
      {
        value: 'no',
        label: { de: 'Nein / Unsicher', en: 'No / Unsure' },
        points: 0,
        recommendation: {
          de: 'Schlafzimmer zur Straße bedeuten dauerhaften Lärm – das ist nach dem Einzug kaum noch zu korrigieren. Die Planungsregel lautet: Schlafräume auf die ruhige Seite (Hof, Garten, stille Nebenstraße), Wohn- und Küchenbereiche können zur Straßenseite zeigen. Falls der Grundriss das nicht erlaubt: Plane von Anfang an Dreifachverglasung mit Schallschutzklasse 4 ein – der Aufpreis gegenüber Zweifachverglasung ist gering, der Effekt im Alltag erheblich. Ergänzend schützen Massivwände zwischen Schlafzimmer und Treppenhaus deutlich besser als Leichtwände.',
          en: 'Bedrooms facing the street mean permanent noise – and this is nearly impossible to correct after moving in. The planning rule is: sleeping areas on the quiet side (courtyard, garden, quiet side street), living and kitchen areas can face the street. If the floor plan does not allow this: plan triple glazing with sound insulation class 4 from the start – the additional cost over double glazing is low, the effect in daily life is significant. Additionally, solid walls between the bedroom and stairwell protect considerably better than lightweight partition walls.',
        },
      },
    ],
  },

  // ─── BLOCK 9 – BADEZIMMER (10 pts) ───────────────────────────────────────
  {
    id: 19,
    block: 9,
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
          de: 'Ein Bad ohne Tageslicht ist eine der Entscheidungen, die man zunächst rationalisiert ("Ich bin ja nur kurz drin") und später am meisten bereut. Tageslicht verändert die Wahrnehmung eines Raumes fundamental – künstliches Licht kann es nicht vollständig ersetzen. Prüfe folgende Alternativen: Dachfenster (auch im Erdgeschoss über Dachverglasungen machbar), Lichtschächte aus dem Obergeschoss, Oberlichter über der Tür, oder eine Verglasung zur angrenzenden Nische. Selbst ein kleines Fenster von 40x40 cm verändert das Raumgefühl komplett. Falls technisch nichts möglich ist: Investiere besonders in hochwertige Lichtplanung mit warmweißem, dimmbarem Licht.',
          en: 'A bathroom without natural light is one of those decisions that seems fine at first ("I\'m only in there briefly") and is later most regretted. Natural light fundamentally changes the perception of a space – artificial light cannot fully replace it. Check the following alternatives: skylights (possible even on ground floor via roof glazing), light wells from the floor above, clerestory windows above the door, or glazing to an adjacent niche. Even a small 40x40 cm window completely changes how the room feels. If nothing is technically possible: invest especially in high-quality lighting design with warm white, dimmable light.',
        },
      },
    ],
  },
  {
    id: 20,
    block: 9,
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
          de: 'Plane den Badstauraum jetzt konkret: Duschnischen (in die Wand versenkt, ca. 10–15 cm tief) schaffen eleganten Stauraum ohne Glasablagen, die ständig geputzt werden müssen. Ein Unterschrank am Waschtisch (min. 40 cm tief) ist Pflicht. Ein Hochschrank (min. 30 cm tief, 40–60 cm breit) nimmt Handtücher, Kosmetik und Reinigungsmittel auf. Wer diese Elemente jetzt in die Planung einträgt, spart später teure Nachrüstlösungen und hält die Waschtischfläche dauerhaft aufgeräumt.',
          en: 'Plan bathroom storage concretely now: shower niches (recessed into the wall, approx. 10–15 cm deep) create elegant storage without glass shelves that need constant cleaning. An under-sink cabinet (min. 40 cm deep) is essential. A tall cabinet (min. 30 cm deep, 40–60 cm wide) takes towels, cosmetics and cleaning supplies. Planning these elements now saves expensive retrofit solutions later and keeps the sink area permanently tidy.',
        },
      },
      {
        value: 'no',
        label: { de: 'Nein', en: 'No' },
        points: 0,
        recommendation: {
          de: 'Bäder brauchen deutlich mehr Stauraum als die meisten annehmen: Handtücher für alle Haushaltsmitglieder, Duschprodukte, Kosmetik, Medikamente, Putzmittel, Toilettenpapiervorrat – das summiert sich schnell. Ohne Stauraumlösung stapelt sich alles auf dem Waschtisch oder auf dem Boden. Das Minimum: Wandnischen in der Dusche (versenkt, kein Raumverlust), Unterschrank am Waschtisch, ein Hochschrank (30 cm Tiefe reicht) und wenn möglich eine Wandnische für Handtücher. Das ist der Mindeststandard für ein funktional nutzbares Bad.',
          en: 'Bathrooms need far more storage than most people expect: towels for all household members, shower products, cosmetics, medicines, cleaning supplies, toilet paper stock – it all adds up quickly. Without a storage solution, everything piles up on the sink surface or the floor. The minimum: wall niches in the shower (recessed, no loss of space), an under-sink cabinet, a tall cabinet (30 cm depth is enough) and if possible a wall niche for towels. This is the baseline standard for a functionally usable bathroom.',
        },
      },
    ],
  },

  // ─── BLOCK 10 – BONUSFRAGE (no score, lead capture) ──────────────────────
  {
    id: 21,
    block: 10,
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

export function getQuestions(propertyType: 'house' | 'apartment'): Question[] {
  return questions.filter(
    (q) => !q.forType || q.forType === 'both' || q.forType === propertyType
  )
}

export const MAX_SCORE = 100
