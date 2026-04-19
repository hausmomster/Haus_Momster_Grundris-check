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
          de: 'Mindestanforderung: 60 cm Tiefe (damit Kleiderbügel quer hängen) und 80 cm Breite - das ist das absolute Minimum für eine funktionierende Garderobe. Besser sind 55-60 cm Tiefe und 100-120 cm Breite pro 2 Personen. Die ideale Kombination: Kleiderstange auf 160-180 cm Hoehe, Schuhfach unten (35-40 cm tief, ca. 1 Paar pro 30 cm Breite), 3-5 Haken fuer Taschen und Schirme. Wenn keine eingebaute Nische moeglich ist: Ein 40 cm tiefer Einbauschrank plus Wandhaken plus Schuhbank erfullt dieselbe Funktion. Ohne diese Loesung wandern Jacken und Schuhe sofort in den Wohnbereich.',
          en: 'Minimum requirement: 60 cm depth (for cross-hanging coats) and 80 cm width. Better is 55-60 cm depth and 100-120 cm width per 2 people. Ideal combination: clothes rail at 160-180 cm height, shoe compartment below (35-40 cm deep, approx. 1 pair per 30 cm width), 3-5 hooks for bags and umbrellas. If no built-in niche is possible: a 40 cm deep wardrobe plus wall hooks plus shoe bench achieves the same function. Without this solution, coats and shoes immediately migrate into the living area.',
        },
      },
      {
        value: 'no',
        label: { de: 'Nein', en: 'No' },
        points: 0,
        recommendation: {
          de: 'Mindestanforderung: 60 cm Tiefe, 80 cm Breite - das ist das Minimum fuer eine Garderobennische, die im Alltag mit mehreren Personen funktioniert. Fuer 4 Personen: mindestens 120 cm Breite. Ohne jede Garderobenloesung ist der Eingang kein Uebergangsbereich mehr, sondern ein Durchgangschaos. Loesung 1 (optimal): Nische direkt in die Wand einplanen - kein zusaetzlicher Schrank noetig, kein Raumverlust. Loesung 2 (nachruestbar): 40-55 cm tiefer Einbauschrank an der naechsten Wandflaeche, erganzt durch Sitzbank mit Schuhstauraum. Kosten nachtraeglich: ca. 800-2.500 Euro je nach Ausfuehrung.',
          en: 'Minimum requirement: 60 cm depth, 80 cm width – the minimum for a wardrobe niche that works daily for multiple people. For 4 people: at least 120 cm width. Without any wardrobe solution, the entrance is no longer a transition zone but a chaos zone. Solution 1 (optimal): plan a niche directly into the wall – no extra wardrobe needed, no loss of space. Solution 2 (retrofit): 40-55 cm deep built-in wardrobe on the nearest wall surface, complemented by a bench with shoe storage. Retrofit costs: approx. 800-2,500 EUR depending on execution.',
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
          de: 'Mindestanforderung: Eine Pufferzone von 1,20-1,50 m Tiefe zwischen Eingangstür und Wohnraum ist das Ziel. Wenn das baulich nicht möglich ist, reicht eine Sichtbarriere: halbhoher Raumteiler (ca. 100-130 cm hoch), Schrank als Raumtrenner oder Schiebetür. Nachrüstbare Lösungen ab ca. 300 Euro (Raumteiler) bis 2.000 Euro (Schiebetür mit Einbau). Die Trennung muss nicht vollständig sein, um zu wirken - schon ein optischer Puffer verhindert den direkten Blick ins Wohnzimmer und reduziert Zug, Lärm und Gerüche aus dem Eingangsbereich spürbar.',
          en: 'Minimum requirement: a buffer zone of 1.20-1.50 m depth between the entrance door and living area is the goal. If not structurally possible, a visual barrier suffices: half-height room divider (approx. 100-130 cm high), wardrobe as room separator, or sliding door. Retrofit solutions from approx. 300 EUR (room divider) to 2,000 EUR (sliding door with installation). The separation does not need to be complete to be effective - even a visual buffer prevents direct sightlines into the living room and noticeably reduces draughts, noise and smells from the entrance.',
        },
      },
      {
        value: 'no',
        label: { de: 'Nein', en: 'No' },
        points: 0,
        recommendation: {
          de: 'Mindestanforderung: Ein Flurbereich von mindestens 3 m² Nutzfläche ist das Ziel - das entspricht ca. 1,20 m Tiefe und 2,50 m Breite. Das reicht, um Schuhe auszuziehen, Jacken aufzuhängen und die Tür zu öffnen, ohne ins Wohnzimmer zu stolpern. Fehlt dieser Puffer: Eine 55 cm tiefe Garderobenkombination direkt hinter der Eingangstür schafft eine De-facto-Trennung ohne Baueingriff. Alternativ: Schiebetür (ca. 1.500-3.000 Euro nachrüstbar) oder halbhoher Raumteiler (ab 300 Euro). Ein offener Eingang direkt ins Wohnzimmer ist einer der meistbereuten Planungspunkte bei Bauherrinnen.',
          en: 'Minimum requirement: a hallway area of at least 3 m² usable floor space is the goal – approx. 1.20 m depth and 2.50 m width. That is enough to take off shoes, hang coats and open the door without stumbling into the living room. If this buffer is missing: a 55 cm deep wardrobe combination directly behind the entrance door creates a de facto separation without construction work. Alternative: sliding door (approx. 1,500-3,000 EUR retrofit) or half-height room divider (from 300 EUR). A direct open entrance into the living room is one of the most commonly regretted planning decisions.',
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
          de: 'Mindestanforderung: 90 cm lichte Breite - das ist der gesetzliche Mindestwert laut DIN 18040 (barrierefreies Bauen) und gleichzeitig der praxistaugliche Mindestwert für Alltag mit Familie. Bei unter 90 cm lassen sich Sofa, Kühlschrank oder Waschmaschine kaum noch einbringen; zwei Personen können nicht aneinander vorbeigehen. Handlungsempfehlung: Prüfe ob die engste Stelle durch Versetzen einer nicht-tragenden Wand behoben werden kann - im Rohbau ca. 500-2.000 Euro, nach Fertigstellung 3.000-10.000 Euro. Alternative: Schiebetür statt Drehtür kann den nutzbaren Durchgang um 5-10 cm vergrößern.',
          en: 'Minimum requirement: 90 cm clear width – this is the legal minimum per DIN 18040 (barrier-free building) and the practical minimum for family daily life. Below 90 cm, sofas, fridges or washing machines can barely be moved in; two people cannot pass each other. Action: check whether the narrowest point can be resolved by shifting a non-load-bearing wall – approx. 500-2,000 EUR in shell construction, 3,000-10,000 EUR after completion. Alternative: a sliding door instead of a hinged door can increase the usable passage by 5-10 cm.',
        },
      },
      {
        value: '90-110',
        label: { de: '90–110 cm', en: '90–110 cm' },
        points: 5,
        recommendation: {
          de: 'Mindestanforderung erfüllt, aber nicht komfortabel: 90 cm ist das gesetzliche Minimum - empfohlen werden 110-120 cm für entspanntes Aneinander-Vorbeigehen und ausreichend Platz für Möbel, Kinderwagen und Einkäufe. Bei 90-110 cm: Eine Person passiert problemlos, zwei Personen müssen ausweichen. Wenn möglich auf 110 cm erweitern: Eine nicht-tragende Wand um 10 cm zu versetzen kostet im Rohbau oft unter 1.000 Euro, nach Trockenbau 3.000-8.000 Euro. Dieser kleine Unterschied wird im Alltag über Jahre spürbar.',
          en: 'Minimum met, but not comfortable: 90 cm is the legal minimum – 110-120 cm is recommended for easy passing and sufficient space for furniture, pushchairs and shopping. At 90-110 cm: one person passes easily, two people must step aside. If possible, expand to 110 cm: shifting a non-load-bearing wall by 10 cm in shell construction often costs under 1,000 EUR, after drylining 3,000-8,000 EUR. This small difference is felt in daily life over many years.',
        },
      },
      { value: 'over110', label: { de: 'Über 110 cm', en: 'Over 110 cm' }, points: 8 },
      {
        value: 'unknown',
        label: { de: 'Weiß ich nicht', en: "I don't know" },
        points: 3,
        recommendation: {
          de: 'Mindestanforderung: 90 cm lichte Breite an allen Hauptdurchgängen. Miss sofort nach: Nimm ein Maßband und messe alle Engstellen, besonders zwischen Türrahmen, Treppen und dem Übergang von Flur zu Wohnbereich. Achtung: Die lichte Breite ist kleiner als die Wandöffnung - Türrahmen reduzieren die nutzbare Breite um ca. 5-10 cm. Ziel sind mindestens 90 cm (Minimum), besser 110-120 cm. Alles darunter wird mit zunehmendem Möbelbestand und wachsender Familie zur spürbaren täglichen Einschränkung.',
          en: "Minimum requirement: 90 cm clear width at all main passages. Measure immediately: take a tape measure and check all tight spots, especially between door frames, stairs and the transition from hallway to living area. Note: clear width is smaller than the wall opening – door frames reduce usable width by approx. 5-10 cm. Target at least 90 cm (minimum), preferably 110-120 cm. Anything less becomes a noticeable daily restriction as furniture accumulates and the family grows.",
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
          de: 'Mindestanforderung: 90 cm freier Durchgang zwischen Möbeln im Hauptweg, 60 cm an Nebenstellen (z.B. neben dem Bett). Erstelle einen Möblierungsplan im Maßstab 1:50 - kostenlos mit roomsketcher.com oder floorplanner.com. Zeichne alle Möbel maßstabsgerecht ein und miss dann alle verbleibenden Gänge nach. Besonders kritisch: Weg zwischen Esstisch und Wand (min. 90 cm für Stuhl ausziehen + Durchgang), Gang hinter dem Sofa (min. 60 cm), Abstand neben dem Bett (min. 60 cm, besser 80 cm). Engstellen lassen sich oft durch kleinere Möbelformate oder wandmontierte Lösungen beheben.',
          en: 'Minimum requirement: 90 cm clear passage between furniture on main routes, 60 cm at secondary points (e.g. beside the bed). Create a furniture plan at 1:50 scale – free tools: roomsketcher.com or floorplanner.com. Draw all furniture to scale and measure all remaining passages. Particularly critical: path between dining table and wall (min. 90 cm to pull out chair plus pass through), gap behind sofa (min. 60 cm), clearance beside bed (min. 60 cm, better 80 cm). Bottlenecks can often be resolved by smaller furniture formats or wall-mounted solutions.',
        },
      },
      {
        value: 'yes',
        label: { de: 'Ja', en: 'Yes' },
        points: 0,
        recommendation: {
          de: 'Mindestanforderung: 90 cm freier Durchgang - alles darunter verletzt nicht nur den Komfort, sondern auch die DIN 18040 (barrierefreies Bauen). Dokumentiere jetzt jede Engstelle und prüfe für jede: (1) Kann das Möbelstück kleiner oder wandmontiert werden? (2) Kann die Tür anders aufgehen oder durch eine Schiebetür ersetzt werden (spart 5-10 cm)? (3) Kann eine nicht-tragende Wand minimal verschoben werden? Kosten im Rohbau: 500-2.000 Euro. Nach Fertigstellung: 5.000-15.000 Euro. Je früher die Korrektur, desto günstiger - jetzt handeln.',
          en: 'Minimum requirement: 90 cm clear passage – anything less violates not only comfort but also DIN 18040 (barrier-free building). Document every bottleneck now and check for each: (1) Can the piece of furniture be smaller or wall-mounted? (2) Can the door open differently or be replaced by a sliding door (saves 5-10 cm)? (3) Can a non-load-bearing wall be shifted slightly? Costs in shell construction: 500-2,000 EUR. After completion: 5,000-15,000 EUR. The earlier the correction, the cheaper – act now.',
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
          de: 'Mindestanforderung: Eine Einzeilerküche braucht mindestens 2,40 m nutzbare Länge, damit Herd, Spüle und beidseitige Arbeitsfläche (je min. 40 cm) nebeneinander passen. Darunter funktioniert die Küche nur für eine Person. Verbesserung mit L-Erweiterung: Schon 60 cm zusätzliche Länge im rechten Winkel schaffen eine zweite Arbeitszone und ermöglichen das Kochen zu zweit. Eine freistehende Insel (min. 80x80 cm) verdoppelt die Arbeitsfläche und schafft Stauraum ohne Wandeingriff. Beides ist oft ohne Grundrissänderung umsetzbar.',
          en: 'Minimum requirement: a single-line kitchen needs at least 2.40 m usable length so that hob, sink and worktop space (min. 40 cm each side) fit side by side. Below that, the kitchen only works for one person. Improvement with L-extension: even 60 cm of additional length at right angles creates a second work zone and allows two people to cook simultaneously. A freestanding island (min. 80x80 cm) doubles the worktop area and adds storage without touching the walls. Both options are often achievable without floor plan changes.',
        },
      },
      {
        value: 'open',
        label: { de: 'Noch offen', en: 'Not yet decided' },
        points: 2,
        recommendation: {
          de: 'Mindestanforderung: Das Küchendreieck (Kühlen-Waschen-Kochen) sollte eine Gesamtlaufweite von 4-7 m nicht überschreiten - darüber wird die Küche ineffizient. Die Küchenform bestimmt alle Folgeplanungen: Wasseranschlüsse, Abluftkanal, Elektroanschlüsse, Lichtpunkte. Wer die Form zu lange offenlässt, riskiert teure Nacharbeiten (Wasseranschluss verlegen: 500-2.000 Euro, Abluftkanal ummauern: 1.000-5.000 Euro). Empfehlung: L-Form für Eckräume (max. Arbeitsfläche, guter Fluss), Inselküche für offene Bereiche (Kommunikation + Arbeitsfläche), U-Form für separate Küchen mit viel Stellraum.',
          en: 'Minimum requirement: the kitchen triangle (refrigerating-washing-cooking) should not exceed a total walking distance of 4-7 m – beyond that the kitchen becomes inefficient. The kitchen layout determines all subsequent planning: plumbing, extract ducting, electrical connections, lighting points. Leaving this open too long risks expensive changes (relocating water supply: 500-2,000 EUR, rerouting extract duct: 1,000-5,000 EUR). Recommendation: L-shape for corner rooms (max worktop, good flow), island kitchen for open-plan areas (communication + worktop), U-shape for separate kitchens with lots of wall space.',
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
          de: 'Mindestanforderung: 100 cm Mindestabstand zwischen Kücheninsel und Küchenzeile - darunter können Backofentür und Schubladen nicht gleichzeitig geöffnet werden. Empfohlen: 120 cm, damit zwei Personen aneinander vorbeigehen können. Bei unter 100 cm: Die Insel muss verkleinert oder verschoben werden - Kosten vor Einbau: 0 Euro, nach Einbau der Küche: 2.000-8.000 Euro für Neuplanung und Versetzung. Dieser Fehler kann nicht durch Möbel oder Gewöhnung kompensiert werden - er ist täglich präsent.',
          en: "Minimum requirement: 100 cm minimum clearance between kitchen island and counter line – below this, the oven door and drawers cannot be opened simultaneously. Recommended: 120 cm so two people can pass each other. Below 100 cm: the island must be reduced or repositioned – cost before installation: 0 EUR, after kitchen installation: 2,000-8,000 EUR for replanning and relocation. This error cannot be compensated by furniture or habit – it is present every single day.",
        },
      },
      {
        value: '100-115',
        label: { de: '100–115 cm', en: '100–115 cm' },
        points: 6,
        recommendation: {
          de: "Mindestanforderung knapp erfüllt: 100 cm ist das absolute Minimum - bei 100-115 cm können alle Schubladen geöffnet werden, aber zwei Personen können nicht aneinander vorbeigehen ohne sich zu berühren. Ziel: 120 cm. Das bedeutet entweder die Insel um einige Zentimeter zu verkleinern oder die Küchenzeile geringfügig zu kürzen. Im Rohbau kostenlos, nach Kücheneinbau ca. 1.500-4.000 Euro. Der Komfortgewinn von 120 cm gegenüber 100 cm ist erheblich und täglich spürbar.",
          en: "Minimum barely met: 100 cm is the absolute minimum – at 100-115 cm all drawers can be opened, but two people cannot pass each other without touching. Target: 120 cm. This means either reducing the island by a few centimetres or slightly shortening the counter line. Free in shell construction, approx. 1,500-4,000 EUR after kitchen installation. The comfort gain of 120 cm over 100 cm is significant and felt every day.",
        },
      },
      { value: 'ab120', label: { de: 'Über 120 cm', en: 'Over 120 cm' }, points: 8 },
      {
        value: 'unknown',
        label: { de: 'Weiß ich nicht / keine Insel', en: "Don't know / no island" },
        points: 3,
        recommendation: {
          de: 'Mindestanforderung: 100 cm Mindestabstand, 120 cm empfohlen. Miss den Abstand jetzt nach - auf dem Grundrissplan und im realen Raum. Achtung: Schubladen und Backofentüren öffnen sich in den Gangbereich hinein und reduzieren den nutzbaren Durchgang um weitere 40-60 cm. Das heißt: Bei 100 cm Grundabstand bleiben während des Kochens effektiv 40-60 cm übrig. Bei 120 cm: noch 60-80 cm - das ist der Unterschied zwischen funktional und komfortabel.',
          en: 'Minimum requirement: 100 cm minimum clearance, 120 cm recommended. Measure the distance now – on the floor plan and in the actual space. Note: drawers and oven doors open into the passage area, reducing the usable clearance by a further 40-60 cm. This means: at a base clearance of 100 cm, only 40-60 cm remains during cooking. At 120 cm: 60-80 cm remains – that is the difference between functional and comfortable.',
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
          de: 'Mindestanforderung: 0,5 m² dedizierte Stauraumfläche für Vorräte - das entspricht einem 60 cm tiefen, 80 cm breiten Hochschrank. Optimal: begehbare Speisekammer ab 80x100 cm (0,8 m²). Eine begehbare Speisekammer lässt sich auch als Nische umsetzen: 80 cm breit, 60 cm tief, mit Schiebetür - kaum teurer als ein Hochschrank, aber wesentlich zugänglicher. Ohne diese Lösung: Vorräte verdrängen Töpfe aus den Arbeitsbereichschränken - chronischer Platzmangel, der täglich stört. Nachrüstkosten für eine Speisekammer-Nische: ca. 1.500-5.000 Euro.',
          en: 'Minimum requirement: 0.5 m² of dedicated storage space for provisions – equivalent to a 60 cm deep, 80 cm wide tall cabinet. Optimal: a walk-in pantry from 80x100 cm (0.8 m²). A walk-in pantry can also be implemented as a niche: 80 cm wide, 60 cm deep, with a sliding door – barely more expensive than a tall cabinet but far more accessible. Without this solution: provisions displace pots and pans from the working area cabinets – chronic lack of space that causes daily frustration. Retrofit costs for a pantry niche: approx. 1,500-5,000 EUR.',
        },
      },
      {
        value: 'no',
        label: { de: 'Nein', en: 'No' },
        points: 0,
        recommendation: {
          de: 'Mindestanforderung: Mindestens ein Hochschrank 60 cm tief, 40 cm breit, ausschließlich für Vorräte - das ist das absolute Minimum. Besser: 1 m² Speisekammer-Nische oder separater Raum. Ohne jede Vorratslösung: Lebensmittel, Dosen, Getränkekästen und Küchengeräte verdrängen sich gegenseitig aus den Schränken. Nach spätestens 6 Monaten steht Vorrat auf der Arbeitsfläche. Eine Speisekammer kostet im Rohbau fast nichts (Wandverschiebung + Tür), nachträglich 3.000-15.000 Euro. Prüfe jetzt, ob 1-2 m² in der Nähe der Küche als Vorratsnische abgetrennt werden können.',
          en: 'Minimum requirement: at least one tall cabinet 60 cm deep, 40 cm wide, exclusively for provisions – that is the absolute minimum. Better: 1 m² pantry niche or separate room. Without any storage solution: food, tins, drink crates and kitchen appliances displace each other from the cabinets. After 6 months at most, provisions are stored on the worktop. A pantry costs almost nothing in shell construction (wall shift + door), but 3,000-15,000 EUR retrospectively. Check now whether 1-2 m² near the kitchen can be partitioned off as a pantry niche.',
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
          de: 'Mindestanforderung: 4 m² Nutzfläche - das ist das absolute Minimum für Waschmaschine (60x60 cm), Trockner (60x60 cm), Bügelfläche (50x120 cm) und Wandregale für Reinigungsmittel. 6 m² sind komfortabel, 8 m² ideal für Familien. Lage: Erdgeschoss, in der Nähe der Küche, nicht im Keller - jede Treppe zwischen HWR und Schlafzimmer (wo Wäsche anfällt) kostet täglich Zeit. Der HWR ist Nr. 1 auf der Bedauernsliste bei Bauherrinnen ohne diesen Raum. Priorisiere ihn jetzt vor anderen Räumen.',
          en: 'Minimum requirement: 4 m² utility room with water connection, 400V electrical outlet for dryer and wall shelving. Location: ground floor, close to kitchen – every staircase between utility room and bedroom (where laundry originates) costs daily time and energy. 4 m² fits: washing machine (60x60 cm), dryer (60x60 cm), ironing board folded on wall, wall shelves for detergents. 6 m² is comfortable, 8 m² ideal for families. The utility room is No. 1 on the regret list for builders who skipped it – plan it now before it gets squeezed out by other rooms.',
        },
      },
      {
        value: 'no',
        label: { de: 'Nein', en: 'No' },
        points: 0,
        recommendation: {
          de: 'Mindestanforderung: 4 m² separater Raum mit Wasseranschluss, 400V-Stromanschluss und Wandregalen. Ohne HWR landet die Waschmaschine in Küche oder Bad (Lärm, Platzverlust), der Trockner im Flur (Feuchtigkeit), das Bügelbrett hat keinen festen Platz. Das ist der am häufigsten bereute fehlende Raum in Familienhaushalten. Falls kein separater Raum möglich ist: Einbaunische (min. 1,20 m breit, 65 cm tief) mit Schiebetür – nimmt Waschmaschine und gestapelten Trockner auf. Nachrüstkosten für einen HWR nachträglich: 5.000-25.000 Euro je nach Aufwand.',
          en: 'Minimum requirement: 4 m² separate room with water connection (for washing machine), electrical connection (dryer) and sufficient shelf space. This is the most commonly regretted missing room in families. Without a utility room: washing machine in kitchen or bathroom (noise, lost space), dryer in hallway (moisture), ironing board with no fixed place (daily frustration). If no separate room is possible: a built-in niche (min. 1.20 m wide, 65 cm deep, with sliding door) is the minimum solution – it accommodates washing machine and dryer stacked. Retrofit costs for a utility room: 5,000-25,000 EUR depending on the scope of work.',
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
          de: 'Mindestanforderung: 40 cm Tiefe für Jacken (damit Kleiderbügel nicht aus dem Schrank ragen), besser 55-60 cm. Breite: min. 80 cm für 2 Personen, 120 cm für 4 Personen. Schuhstauraum: 30 cm Tiefe, ca. 1 Paar pro 30 cm Breite. Ohne Stauraumlösung im Flur: Schuhe, Jacken und Taschen landen täglich auf dem Boden und machen den Eingang zur Stolperfalle. Beste Lösung für schmale Flure: Bank mit Stauraum (Sitzhöhe 45 cm), Haken an der Wand (auf 150-170 cm), Schrank raumhoch darüber. Nachrüstkosten Einbauschrank: ab 800 Euro für einfache Lösungen.',
          en: 'Minimum requirement: 40 cm depth for coats (so clothes hangers do not protrude), preferably 55-60 cm. Width: min. 80 cm for 2 people, 120 cm for 4 people. Shoe storage: 30 cm depth, approx. 1 pair per 30 cm width. Without hallway storage: shoes, coats and bags land on the floor daily and turn the entrance into a trip hazard. Best solution for narrow hallways: bench with storage (seat height 45 cm), hooks on the wall (at 150-170 cm height), floor-to-ceiling wardrobe above. Retrofit cost for built-in wardrobe: from 800 EUR for simple solutions.',
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
          de: 'Mindestanforderung: Im Schlafzimmer min. 0,8-1 m Schrankbreite pro Person, 58-60 cm Tiefe (damit Kleidung hängend Platz findet). Für 2 Personen: min. 1,60 m Gesamtbreite, besser 2,00-2,50 m. Einbauschränke raumhoch (bis Decke) schaffen 15-20% mehr Volumen als freistehende Schränke gleicher Breite. Investition: Schreiner ab ca. 500-800 Euro/m², Systeme wie IKEA PAX 150-300 Euro/m². Prüfe besonders: Nischen neben Treppen (oft vernachlässigt), Bereiche unter Dachschrägen (ab 150 cm Höhe nutzbar mit Klapphängestangen), Wandflächen zwischen Fenstern.',
          en: 'Minimum requirement: in the bedroom, min. 0.8-1 m wardrobe width per person, 58-60 cm depth (so clothes can hang). For 2 people: min. 1.60 m total width, better 2.00-2.50 m. Floor-to-ceiling built-in wardrobes create 15-20% more volume than freestanding wardrobes of the same width. Investment: carpenter from approx. 500-800 EUR/m², systems like IKEA PAX 150-300 EUR/m². Check especially: niches beside stairs (often overlooked), areas under roof slopes (usable from 150 cm height with folding rails), wall surfaces between windows.',
        },
      },
      {
        value: 'no',
        label: { de: 'Nein', en: 'No' },
        points: 0,
        recommendation: {
          de: 'Mindestanforderung: 0,8 m Schrankbreite pro Person im Schlafzimmer (60 cm tief), 40-55 cm im Flur. Ohne Einbauschränke: Freistehende Möbel verlieren durch Standfüße, Oberteil und Seitenwände ca. 15-20% des nutzbaren Volumens. Bei einem 2 m breiten Schrank bedeutet das ca. 0,4 m² Stauraumverlust - pro Schrank, dauerhaft. Nachrüstkosten: Deutlich höher als in der Planung, da Wandflächen oft durch nachträgliche Installationen belegt sind. Jetzt handeln: Identifiziere alle Nischen, Wände zwischen Fenstern und Dachschrägenbereiche - das sind die idealen Einbauschrank-Positionen.',
          en: 'Minimum requirement: 0.8 m wardrobe width per person in the bedroom (60 cm deep), 40-55 cm in the hallway. Without built-ins: freestanding furniture loses approx. 15-20% of usable volume through legs, top panels and side walls. For a 2 m wide wardrobe, that means approx. 0.4 m² of lost storage space – per wardrobe, permanently. Retrofit costs: significantly higher than in planning, as wall surfaces are often occupied by subsequent installations. Act now: identify all niches, walls between windows and roof slope areas – these are the ideal built-in wardrobe positions.',
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
          de: 'Mindestanforderung: Sofa braucht min. 2,20-2,50 m Wandbreite plus je 30 cm seitlichen Abstand. Esstisch für 4 Personen: 80x140 cm Tisch, plus je 90 cm Freifläche für Stühle ringsum - das bedeutet mindestens 2,60x3,20 m Grundfläche nur für den Essbereich. Ohne festgelegte Möbelposition: Steckdosen landen hinter dem Sofa, Fenster enden genau dort, wo der Schrank stehen soll. Erstelle den Möblierungsplan jetzt: Millimeterpapier (1 cm = 50 cm) oder roomsketcher.com. In einer Stunde erstellt, spart erhebliche Nachkosten beim Elektriker.',
          en: 'Minimum requirement: sofa needs min. 2.20-2.50 m wall width plus 30 cm clearance on each side. Dining table for 4 people: 80x140 cm table, plus 90 cm clearance for chairs on all sides – meaning at least 2.60x3.20 m floor area just for the dining zone. Without fixed furniture positions: sockets end up behind the sofa, windows finish exactly where the wardrobe should stand. Create the furniture plan now: graph paper (1 cm = 50 cm) or roomsketcher.com. Created in an hour, saves significant extra costs from the electrician.',
        },
      },
      {
        value: 'no',
        label: { de: 'Nein', en: 'No' },
        points: 0,
        recommendation: {
          de: 'Mindestanforderung: Wohnzimmer min. 18-20 m² für Sofa + Esstisch + Durchgänge. Schlafzimmer mit Doppelbett: min. 12 m² (Bett 1,80x2,00 m + je 60 cm seitlich + 90 cm am Fußende). Kinderzimmer: min. 12 m². Ohne Möblierungsplan entstehen die Klassiker: Fenster wo Schrank stehen soll, Steckdosen hinter dem Sofa, Türen die in Esstischstühle schlagen. Erstelle ihn jetzt (kostenlos: roomsketcher.com, floorplanner.com) - 1 Stunde Aufwand, der Elektroplanungsfehler verhindert, die jeweils 500-3.000 Euro Nacharbeit kosten.',
          en: 'Minimum requirement: living room min. 18-20 m² for sofa + dining table + passages. Double bedroom: min. 12 m² (bed 1.80x2.00 m + 60 cm each side + 90 cm at foot end). Children's room: min. 12 m². Without a furniture plan, the classic mistakes occur: windows where the wardrobe should go, sockets behind the sofa, doors swinging into dining chairs. Create one now (free: roomsketcher.com, floorplanner.com) – 1 hour of effort that prevents electrical planning errors costing 500-3,000 EUR each in remediation.',
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
          de: 'Mindestanforderung: Mindestens eine 2,50 m breite, zusammenhängende Wandfläche ohne Fenster oder Tür pro Hauptraum. Fensterhöhe: Brüstung min. 85-90 cm ab Boden, damit Anrichten, Sideboards und Sofas darunter Platz finden. Raumtiefe min. 3,50 m für sinnvolle Möblierung. Prüfe jeden Raum: Zeichne den Grundriss und markiere alle freien Wandflächen (keine Türen, keine Fenster unter 85 cm). Gibt es in jedem Hauptraum mindestens eine 2,50 m breie Möbelwand? Wenn nicht: Fensterposition oder -größe anpassen, bevor Rohbau beginnt.',
          en: 'Minimum requirement: at least one 2.50 m wide, uninterrupted wall surface without windows or doors in every main room. Window sill height: min. 85-90 cm from the floor so that consoles, sideboards and sofas can fit below. Room depth min. 3.50 m for sensible furniture placement. Check every room: mark all free wall surfaces on the floor plan (no doors, no windows below 85 cm). Does every main room have at least one 2.50 m wide furniture wall? If not: adjust window position or size before shell construction begins.',
        },
      },
      {
        value: 'no',
        label: { de: 'Nein', en: 'No' },
        points: 0,
        recommendation: {
          de: 'Mindestanforderung: 2,50 m zusammenhängende freie Wandfläche pro Hauptraum. Nicht mehr als 50% der Wandfläche eines Raumes darf durch Fenster und Türen unterbrochen sein - darüber wird der Raum kaum noch möblierbar. Fensterhöhe: Brüstung min. 85 cm. Wenn diese Werte verletzt sind: Prüfe ob Fenster höher gesetzt (Brüstung von 50 cm auf 85 cm) oder schmaler werden können, ohne den Lichteinfall wesentlich zu reduzieren. Ein höheres Fenster bei gleicher Glasfläche ist für Möblierbarkeit oft vorteilhafter als ein breites, tiefes Fenster. Planung: erst Möbelwand festlegen, dann Fenster planen - nicht umgekehrt.',
          en: 'Minimum requirement: 2.50 m of uninterrupted free wall space per main room. No more than 50% of a room's wall surface may be interrupted by windows and doors – beyond that, the room is barely furnishable. Window sill height: min. 85 cm. If these values are exceeded: check whether windows can be raised (sill from 50 cm to 85 cm) or narrowed without significantly reducing light. A taller window at the same glass area is often better for furniture placement than a wide, low window. Planning rule: fix the furniture wall first, then plan windows – not the other way around.',
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
          de: 'Mindestanforderung: 12 m² für ein Kinder- oder Arbeitszimmer (gesetzliches Minimum in Deutschland: 8 m² - das ist ein Rechtswert, kein Qualitätsstandard). Unter 10 m²: Einzelbett (90x200 cm = 1,8 m²) + Kleiderschrank (1,20 m breit, 60 cm tief = 0,72 m²) + Schreibtisch (60x120 cm = 0,72 m²) + Durchgang (min. 90 cm) = Raum zu 100 % belegt, null Spielfläche. Lösung: prüfen ob eine nicht tragende Wand um 30-50 cm verschoben werden kann - im Rohbau oft unter 2.000 Euro, bringt aber einen 10-m²-Raum auf vollwertige 12 m².',
          en: "Minimum requirement: 12 m² for a children's room with single bed, wardrobe and desk (legal minimum in Germany: 8 m² – but that is a legal value, not a quality standard). Below 10 m²: bed (90x200 cm = 1.8 m²) + wardrobe (1.20 m wide, 60 cm deep = 0.72 m²) + desk (60x120 cm = 0.72 m²) + passage (min. 90 cm) = room 100% occupied, zero play space. Solution: check whether a non-load-bearing wall can be shifted by 30-50 cm – often under 2,000 EUR in shell construction, but turns a 10 m² room into a fully usable 12 m².",
        },
      },
      {
        value: '12-15',
        label: { de: '12–15 m²', en: '12–15 m²' },
        points: 3,
        recommendation: {
          de: 'Mindestanforderung erfüllt: 12 m² ist ausreichend für ein Kind. Für zwei Kinder oder ein Zimmer bis ins Teenageralter: 15-18 m² empfohlen - dann passen Etagenbett, zwei Schreibtische und ein gemeinsamer Schrank rein. Wichtig für die Möblierbarkeit: Türöffnung auf eine Wandseite planen, die ohnehin keine Stellfläche hat - jede Tür, die in eine Stellwand schlägt, kostet ca. 0,5 m² Wandfläche und macht den Raum schwieriger möblierbar. Steckdosen: mindestens 2 Doppelsteckdosen auf verschiedenen Wandseiten, je eine am Schreibtischplatz.',
          en: "Minimum met: 12 m² is sufficient for one child. For two children or a room through to teenage years: 15-18 m² recommended – then a bunk bed, two desks and a shared wardrobe fit in. Important for furniture placement: plan the door opening onto a wall side that has no placement area anyway – every door that swings into a usable wall costs approx. 0.5 m² of wall space and makes the room harder to furnish. Sockets: at least 2 double sockets on different walls, one at the desk position.",
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
          de: 'Mindestanforderung: Terrassentür min. 90 cm breit, Schwelle max. 2 cm hoch (Mindeststandard barrierefreies Bauen). Optimale Position: Essbereich, damit Innen- und Außenbereich verbunden werden und die Terrasse als verlängerter Wohnraum funktioniert. Eine Terrassentür im Wohnzimmer hat den Nachteil von Wärmeverlust und Zugluft. Im Essbereich ist die Nutzungsfrequenz höher und der Wärmeverlust geringer. Nachrüstkosten für eine Terrassentür in einer nicht-tragenden Außenwand: ca. 2.000-5.000 Euro inkl. Einbau. In tragenden Wänden: 5.000-15.000 Euro.',
          en: 'Minimum requirement: terrace door min. 90 cm wide, threshold max. 2 cm high (barrier-free building standard). Optimal position: dining area, so that indoor and outdoor areas are connected and the terrace functions as an extended living space. A terrace door in the living room has the disadvantage of heat loss and draught. In the dining area, usage frequency is higher and heat loss lower. Retrofit costs for a terrace door in a non-load-bearing exterior wall: approx. 2,000-5,000 EUR including installation. In load-bearing walls: 5,000-15,000 EUR.',
        },
      },
      {
        value: 'no',
        label: { de: 'Kein Außenbereich geplant', en: 'No outdoor area planned' },
        points: 0,
        recommendation: {
          de: 'Mindestanforderung: 10 m² Terrassenfläche, direkt zugänglich vom Wohn- oder Essbereich, stufenlos oder mit max. 2 cm Schwelle. Unter 10 m² ist kaum Platz für Tisch (90x160 cm) plus Umlaufweg (90 cm). Nachrüstoptionen: Betonterrasse ca. 80-150 Euro/m² (ohne Überdachung), Holzterrasse ca. 100-200 Euro/m², Wintergarten ab ca. 15.000 Euro, Pergola ca. 3.000-10.000 Euro. Kein Außenbereich ist selten ein Planungsziel, meist ein Planungsversäumnis. Prüfe jetzt ob Terrassentür und Terrassenfläche noch eingeplant werden können.',
          en: 'Minimum requirement: 10 m² terrace area, directly accessible from the living or dining area, stepless or with max. 2 cm threshold. Below 10 m² there is barely room for a table (90x160 cm) plus circulation path (90 cm). Retrofit options: concrete terrace approx. 80-150 EUR/m² (without cover), timber terrace approx. 100-200 EUR/m², conservatory from approx. 15,000 EUR, pergola approx. 3,000-10,000 EUR. No outdoor area is rarely a planning goal, usually a planning omission. Check now whether a terrace door and terrace area can still be incorporated.',
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
          de: 'Mindestanforderung: Heizanlage braucht min. 1,20 m Freiraum davor für Wartungszugang. Elektroverteiler: min. 50 cm Freifläche davor (VDE-Vorschrift). Lüftungsanlage + Pufferspeicher: ca. 2-3 m² Bodenfläche. Wenn HWR und Technik kombiniert werden: mindestens 6-8 m² Gesamtfläche einplanen. Eine separate Abtrennung (Schranktür, Trennwand) reduziert den Betriebslärm von Heizung und Pumpen spürbar - das ist besonders relevant bei Luft-Wärmepumpen, die bei bestimmten Wetterbedingungen dauerhaft laufen.',
          en: 'Minimum requirement: heating system needs min. 1.20 m of clear space in front for maintenance access. Electrical distribution board: min. 50 cm clear space in front (VDE regulation). Ventilation unit + buffer tank: approx. 2-3 m² floor area. If utility room and technical systems are combined: plan at least 6-8 m² total area. A separate partition (wardrobe door, dividing wall) noticeably reduces operating noise from heating and pumps – particularly relevant with air heat pumps, which run continuously in certain weather conditions.',
        },
      },
      {
        value: 'no',
        label: { de: 'Nein, nicht geplant', en: 'No, not planned' },
        points: 0,
        recommendation: {
          de: 'Mindestanforderung: 4 m² separater Technikraum mit direkter Zugänglichkeit, ausreichender Belüftung und min. 50 cm Freifläche vor dem Elektroverteiler (VDE-Pflicht). Heizungsanlage: min. 1,20 m Wartungsabstand. Lüftungsanlage: min. 0,5-1 m² je nach System. Ohne klaren Technikraum: Wartungstechniker, Schornsteinfeger und Ableser müssen zwischen Wohnraummöbeln arbeiten, was Kosten erhöht und Probleme verschleppt. Kosten einer nachträglichen Technikraumschaffung: 8.000-25.000 Euro je nach Eingriff in Tragwerk. Positionierung: Idealerweise direkter Zugang vom Flur oder Nebeneingang, nicht durch Wohnräume.',
          en: 'Minimum requirement: 4 m² separate technical room with direct accessibility, adequate ventilation and min. 50 cm clear space in front of the electrical distribution board (VDE obligation). Heating system: min. 1.20 m maintenance clearance. Ventilation unit: min. 0.5-1 m² depending on system. Without a clear technical room: maintenance technicians, chimney sweeps and meter readers must work among living room furniture, increasing costs and delaying problem resolution. Costs of creating a technical room retrospectively: 8,000-25,000 EUR depending on structural involvement. Positioning: ideally direct access from the hallway or secondary entrance, not through living areas.',
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
          de: 'Mindestanforderung: Schallschutzklasse 3 (Rw 35 dB) für Schlafzimmer zur Wohnstraße. An Hauptstraßen oder Bahnlinien: Klasse 4-5 (40-45 dB). Städtischer Nachtlärm 55-65 dB(A) minus Klasse-4-Fenster (ca. 40 dB Dämmung) = noch 15-25 dB(A) im Schlafzimmer - erträglich, aber kein Komfort. Prüfe ob Schlaf- und Kinderzimmer auf die ruhigere Hof- oder Gartenseite verlegt werden können. Falls nicht möglich: Dreifachverglasung nachrüsten - ca. 800-1.500 Euro pro Fenster inklusive Einbau. Ergänzend: schwere Vorhänge und schallabsorbierende Materialien (Bücherregale, Akustikpaneele).',
          en: 'Minimum requirement: sound insulation class 3 (Rw 35 dB) for bedrooms facing a residential street. On main roads or railway lines: class 4-5 (40-45 dB). Urban night noise 55-65 dB(A) minus class 4 windows (approx. 40 dB attenuation) = 15-25 dB(A) remaining in bedroom - tolerable but not comfort. Check whether bedrooms and children\'s rooms can be moved to the quieter courtyard or garden side. If not possible: retrofit triple glazing - approx. 800-1,500 EUR per window including installation. Additionally: heavy curtains and sound-absorbing materials (bookshelves, acoustic panels).',
        },
      },
      {
        value: 'no',
        label: { de: 'Nein / Unsicher', en: 'No / Unsure' },
        points: 0,
        recommendation: {
          de: 'Mindestanforderung: Schallschutzklasse 3 (Rw 35 dB) ist das Minimum für ein Schlafzimmer zur Wohnstraße. An Hauptstraßen oder Bahnlinien: Klasse 4-5 (40-45 dB). Zum Vergleich: Städtischer Nachtlärm 55-65 dB(A), mit Klasse-4-Fenstern effektiv 15-25 dB(A) Reduktion = erträgliche Nachtruhe. Kosten Nachrüstung: ca. 800-1.500 Euro pro Fenster inklusive Einbau. Massivwände Schlafzimmer zu Treppenhaus oder Küche: min. 17,5 cm Vollziegel - Leichtwände übertragen Schall nahezu ungedämpft. Planungsregel: Schlafräume auf ruhige Seite, Küche/Wohnen zur Straße.',
          en: 'Minimum requirement: sound insulation class 3 (Rw 35 dB) is the minimum for a bedroom facing a residential street. On main roads or railway lines: class 4-5 (40-45 dB). For comparison: urban night noise 55-65 dB(A), with class 4 windows effectively 15-25 dB(A) reduction = tolerable night rest. Retrofit costs: approx. 800-1,500 EUR per window including installation. Solid walls between bedroom and stairwell or kitchen: min. 17.5 cm solid brick – lightweight walls transmit sound almost undamped. Planning rule: sleeping areas on the quiet side, kitchen/living towards the street.',
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
          de: 'Mindestanforderung: min. 0,5 m² Fensterfläche für ein Bad mit Tageslicht (in Deutschland ist Tageslicht für Aufenthaltsräume Pflicht - Bäder sind ausgenommen, aber die Lebensqualität leidet erheblich). Alternativen ohne direktes Außenfenster: Lichtschacht (ab 30x30 cm wirksam, Nachrüstkosten ca. 2.000-5.000 Euro), Dachflächenfenster im Rohbau ca. 1.500-3.000 Euro, Glastür oder -wand zum Flur (setzt Sichtschutzlösung voraus). Selbst ein 40x40 cm Fenster verändert das Raumgefühl fundamental. Falls nichts möglich: Lichtplanung mit 3 Zonen (Spiegel, Allgemein, Akzent), warmweiß 2.700-3.000 K, dimmbar.',
          en: 'Minimum requirement: min. 0.5 m² window area for a bathroom with natural light (in Germany, natural light is mandatory for habitable rooms – bathrooms are exempt, but quality of life suffers significantly). Alternatives without a direct exterior window: light well (effective from 30x30 cm, retrofit costs approx. 2,000-5,000 EUR), roof window in shell construction approx. 1,500-3,000 EUR, glass door or partition to hallway (requires privacy solution). Even a 40x40 cm window fundamentally changes the feel of the space. If nothing is possible: invest in lighting with 3 zones (mirror, general, accent), warm white 2,700-3,000 K, dimmable.',
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
          de: 'Mindestanforderung: Unterschrank (min. 40 cm tief, 60 cm breit) + Hochschrank oder Spiegelschrank (min. 15 cm tief, 60 cm breit) + Duschnische (10-15 cm versenkt, in Wandkonstruktion). Für 2 Personen: ca. 80-100 l Stauraum Minimum. Duschnischen müssen jetzt in die Wandkonstruktion geplant werden - nachträglich ca. 500-1.500 Euro pro Nische. Hochschrank min. 30 cm tief: reicht für gefaltete Handtücher (25 cm), Medikamente und Putzmittel. Ohne diese Planung: Waschtischfläche wird innerhalb von Wochen zur Ablage für alles.',
          en: 'Minimum requirement: under-sink cabinet (min. 40 cm deep, 60 cm wide) + tall cabinet or mirror cabinet (min. 15 cm deep, 60 cm wide) + shower niche (10-15 cm deep, recessed in wall). For 2 people: approx. 80-100 l of storage volume minimum. Shower niches must be planned into the wall construction now – retrofitting costs 500-1,500 EUR per niche. Tall cabinet min. 30 cm deep: sufficient for folded towels (25 cm), medicines and cleaning supplies. Without this planning: the sink surface becomes a storage surface for everything within weeks.',
        },
      },
      {
        value: 'no',
        label: { de: 'Nein', en: 'No' },
        points: 0,
        recommendation: {
          de: 'Mindestanforderung: 1 Unterschrank (min. 40 cm tief) + 1 Hochschrank oder Spiegelschrank (min. 15 cm tief) + 1 Duschnische (10-15 cm versenkt). Das ist das Minimum für einen 2-Personen-Haushalt. Für Familie: zusätzlich Wandregal oder zweiter Hochschrank für Handtücher (Richtwert: 2 Handtücher pro Person + 2 Reserve = bei 4 Personen min. 10 Handtücher = ca. 0,5 m² Regalfläche). Ohne Planung: Bad füllt sich innerhalb von 3 Monaten mit Produkten auf dem Waschtisch, am Wannenrand und auf dem Boden. Das ist Praxis, keine Übertreibung. Alle Stauraumelemente jetzt in die Wandkonstruktion einplanen.',
          en: 'Minimum requirement: 1 under-sink cabinet (min. 40 cm deep) + 1 tall cabinet or mirror cabinet (min. 15 cm deep) + 1 shower niche (10-15 cm recessed). That is the minimum for a 2-person household. For a family: additionally a wall shelf or second tall cabinet for towels (guideline: 2 towels per person + 2 spare = for 4 people min. 10 towels = approx. 0.5 m² of shelf space). Without planning: the bathroom fills up within 3 months with products on the sink, bath edge and floor. That is real-world experience, not an exaggeration. Plan all storage elements into the wall construction now.',
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
