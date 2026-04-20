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
          de: 'Das Minimum: 60 cm tief (damit Kleiderbügel quer hängen können) und mindestens 80 cm breit für zwei Personen. Plane das jetzt ein - eine Garderobennische in der Wand kostet fast nichts, ein Einbauschrank hinterher 800 bis 2.500 Euro. Ohne eine feste Lösung wandern Jacken und Schuhe sofort ins Wohnzimmer.',
          en: 'The minimum: 60 cm deep (so coats can hang crossways) and at least 80 cm wide for two people. Plan this in now - a built-in wardrobe niche costs almost nothing at this stage, but adding one later runs 800 to 2,500 EUR. Without a fixed solution, coats and shoes will end up in the living room within weeks.',
        },
      },
      {
        value: 'no',
        label: { de: 'Nein', en: 'No' },
        points: 0,
        recommendation: {
          de: 'Ohne eine Garderobenlösung landet alles auf dem Boden - das ist keine Frage von Ordnung, sondern von fehlender Infrastruktur. Das Minimum: 60 cm tief, 80 cm breit für 2 Personen, mit Kleiderstange, Haken und Schuhplatz. Für 4 Personen mindestens 120 cm Breite. Geht auch ohne Nische: ein 40 cm tiefer Schrank plus Wandhaken plus Schuhbank an der ersten freien Wand.',
          en: 'Without a wardrobe solution, everything lands on the floor - not a question of tidiness, but of missing storage. The minimum: 60 cm deep, 80 cm wide for 2 people, with a clothes rail, hooks and shoe space. For 4 people, at least 120 cm wide. Works without a built-in niche too: a 40 cm deep wardrobe plus wall hooks plus a shoe bench against the nearest free wall.',
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
          de: 'Selbst ein kleiner Puffer hilft schon viel - ein Schrank direkt hinter der Tür, ein halbhoher Raumteiler oder eine Schiebetür. Ziel sind mindestens 1,20 m zwischen Haustür und Wohnraum. Das verhindert, dass Kälte, Lärm und der direkte Blick ins Wohnzimmer sofort beim Öffnen der Tür da sind. Ein einfacher Raumteiler kostet ab 300 Euro, eine Schiebetür ca. 1.500 bis 2.000 Euro.',
          en: 'Even a small buffer makes a big difference - a wardrobe right behind the door, a half-height room divider, or a sliding door. Aim for at least 1.20 m between the front door and the living space. This stops cold air, noise and a direct view into the living room the moment you open the door. A simple divider costs from 300 EUR, a sliding door around 1,500 to 2,000 EUR.',
        },
      },
      {
        value: 'no',
        label: { de: 'Nein', en: 'No' },
        points: 0,
        recommendation: {
          de: 'Das ist einer der Punkte, den hinterher fast alle bereuen. Wenn du durch die Haustür direkt im Wohnzimmer stehst, fehlt jeder Übergangsbereich. Plane mindestens 3 m² Flurfläche ein - das reicht, um Schuhe auszuziehen, Jacken aufzuhängen und die Tür zu öffnen. Wenn das nicht geht: Ein 55 cm tiefer Schrank direkt hinter der Tür schafft eine natürliche Grenze ohne Baumaßnahme.',
          en: 'This is one of the things almost everyone regrets afterwards. Walking through the front door straight into the living room means there is no transition zone at all. Aim for at least 3 m² of hallway - enough to take off shoes, hang up a coat and open the door. If that is not possible: a 55 cm deep wardrobe right behind the front door creates a natural boundary without any construction work.',
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
          de: 'Unter 90 cm Breite bekommst du kaum mehr Sofa, Kühlschrank oder Waschmaschine durch - und zwei Personen können nicht aneinander vorbeigehen. Das ist zu eng für den Alltag. Prüfe ob eine nicht tragende Wand an der engsten Stelle verschoben werden kann - im Rohbau kostet das 500 bis 2.000 Euro, hinterher 3.000 bis 10.000 Euro. Eine Schiebetür statt Drehtür kann zusätzlich 5 bis 10 cm zurückgewinnen.',
          en: 'Below 90 cm you can barely move a sofa, fridge or washing machine through - and two people cannot pass each other. That is too tight for everyday life. Check whether a non-load-bearing wall at the narrowest point can be shifted - in shell construction this costs 500 to 2,000 EUR, afterwards 3,000 to 10,000 EUR. A sliding door instead of a hinged door can also reclaim 5 to 10 cm.',
        },
      },
      {
        value: '90-110',
        label: { de: '90–110 cm', en: '90–110 cm' },
        points: 5,
        recommendation: {
          de: 'Es reicht, aber es ist eng: bei 90 bis 110 cm passt eine Person problemlos durch, zwei müssen ausweichen. Wenn du noch in der Planungsphase bist: Versuch auf 110 cm zu kommen. Eine nicht tragende Wand um 10 cm zu verschieben kostet im Rohbau oft unter 1.000 Euro - nach Fertigstellung 3.000 bis 8.000 Euro. Der Unterschied ist klein auf dem Papier, aber täglich spürbar.',
          en: 'It works but it is tight: at 90 to 110 cm one person passes easily, two have to squeeze past each other. If you are still in the planning stage: aim for 110 cm. Shifting a non-load-bearing wall by 10 cm costs under 1,000 EUR in shell construction - after completion 3,000 to 8,000 EUR. A small change on paper, but noticeable every single day.',
        },
      },
      { value: 'over110', label: { de: 'Über 110 cm', en: 'Over 110 cm' }, points: 8 },
      {
        value: 'unknown',
        label: { de: 'Weiß ich nicht', en: "I don't know" },
        points: 3,
        recommendation: {
          de: 'Miss jetzt nach - nimm ein Maßband und prüfe alle Engstellen, besonders zwischen Türrahmen, an Treppen und am Übergang vom Flur zum Wohnbereich. Wichtig: Der Türrahmen schluckt noch einmal 5 bis 10 cm. Mindestens 90 cm müssen überall durchgehen, besser 110 cm. Alles darunter wird mit der Zeit zur echten Einschränkung.',
          en: "Measure now - take a tape measure and check all tight spots, especially between door frames, at stairs and between the hallway and living area. Important: door frames eat up another 5 to 10 cm. You need at least 90 cm clear at every main passage, ideally 110 cm. Anything less becomes a real restriction over time.",
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
          de: 'Unter 80 cm wird es problematisch sobald du mit einem Wäschekorb, einer Kiste oder mit Kind auf dem Arm durch musst. Außerdem braucht eine Drehtür Platz zum Aufgehen - das macht den Durchgang nochmal enger. Prüfe ob eine Schiebetür hier mehr Platz schafft.',
          en: 'Under 80 cm becomes a problem the moment you carry a laundry basket, a box or a child through. A hinged door also needs room to swing open, which makes the passage even tighter. Check whether a sliding door would give you more space here.',
        },
      },
      {
        value: '80-90',
        label: { de: '80–90 cm', en: '80–90 cm' },
        points: 0,
        recommendation: {
          de: 'Ausreichend für Nebenwege. Wenn du noch in der Planungsphase bist: prüfe ob 90 cm möglich sind - das merkt man besonders mit Wäschekörben oder wenn Kinder größer werden. Schiebetür statt Drehtür kann hier noch extra Platz schaffen.',
          en: 'Fine for secondary routes. If you are still in the planning phase: check whether 90 cm is possible - you will notice the difference when carrying laundry or as children grow. A sliding door instead of a hinged door can reclaim extra space here.',
        },
      },
      { value: 'over90', label: { de: 'Über 90 cm', en: 'Over 90 cm' }, points: 0 },
      { value: 'none', label: { de: 'Keine Nebendurchgänge', en: 'No secondary passages' }, points: 0 },
      {
        value: 'unknown',
        label: { de: 'Weiß ich nicht', en: "I don't know" },
        points: 0,
        recommendation: {
          de: 'Miss nach - auch Nebenwege zu Abstellraum und Hauswirtschaftsraum sollten mindestens 80 cm breit sein. Denk daran: Der Türrahmen und das Aufgehen der Tür fressen noch einmal 5 bis 10 cm vom nutzbaren Durchgang.',
          en: 'Measure all passages - even secondary routes to storage and utility rooms should be at least 80 cm wide. Remember: the door frame and the swing of the door eat up another 5 to 10 cm of the usable width.',
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
          de: 'Erstelle einen Möblierungsplan - kostenlos mit roomsketcher.com oder floorplanner.com. Zeichne alle Möbel maßstabsgerecht ein und miss dann alle verbleibenden Wege nach. Besonders kritisch: Weg zwischen Esstisch und Wand (mindestens 90 cm, damit du den Stuhl ausziehen und noch durchgehen kannst), Gang hinter dem Sofa (mindestens 60 cm), Abstand neben dem Bett (mindestens 60 cm, besser 80 cm). Engstellen lassen sich oft durch kleinere Möbel oder wandmontierte Lösungen beheben.',
          en: 'Create a furniture plan - free tools: roomsketcher.com or floorplanner.com. Draw all furniture to scale and measure the remaining gaps. Most critical: the path between the dining table and the wall (at least 90 cm so you can pull out a chair and still walk past), the gap behind the sofa (at least 60 cm), clearance beside the bed (at least 60 cm, better 80 cm). Bottlenecks can often be fixed by choosing smaller furniture or wall-mounted solutions.',
        },
      },
      {
        value: 'yes',
        label: { de: 'Ja', en: 'Yes' },
        points: 0,
        recommendation: {
          de: 'Notiere jede Engstelle und prüfe für jede: Kann das Möbelstück kleiner sein oder an die Wand montiert werden? Kann die Tür anders aufgehen oder durch eine Schiebetür ersetzt werden - das spart 5 bis 10 cm? Kann eine nicht tragende Wand minimal verschoben werden? Im Rohbau kostet das 500 bis 2.000 Euro, nach dem Einzug 5.000 bis 15.000 Euro. Je früher du handelst, desto günstiger.',
          en: 'Note every bottleneck and check for each one: Can the furniture be smaller or wall-mounted? Can the door open the other way or be replaced by a sliding door - saving 5 to 10 cm? Can a non-load-bearing wall be shifted slightly? In shell construction this costs 500 to 2,000 EUR, after completion 5,000 to 15,000 EUR. The earlier you act, the cheaper.',
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
          de: 'Eine Einzeilerküche braucht mindestens 2,40 m Länge, damit Herd, Spüle und genug Arbeitsfläche nebeneinander passen. Darunter ist die Küche nur für eine Person nutzbar. Einfache Verbesserung: Schon 60 cm Arbeitsfläche in einer Ecke als L-Winkel machen das Kochen zu zweit möglich. Auch ein freistehender Küchenwagen schafft zusätzliche Arbeitsfläche ohne Grundrissänderung.',
          en: 'A single-line kitchen needs at least 2.40 m of length so the hob, sink and enough worktop space all fit side by side. Below that, only one person can cook at a time. Simple fix: just 60 cm of extra worktop in an L-shape makes cooking together possible. A freestanding kitchen trolley also adds worktop space without changing the floor plan.',
        },
      },
      {
        value: 'open',
        label: { de: 'Noch offen', en: 'Not yet decided' },
        points: 2,
        recommendation: {
          de: 'Die Küchenform bestimmt wo Wasserleitungen, Abluft und Steckdosen hinkommen. Wer das zu lange offenlässt, zahlt hinterher: eine Wasserleitung verlegen kostet 500 bis 2.000 Euro, einen Abluftkanal ummauern 1.000 bis 5.000 Euro. Empfehlung: L-Form für Eckräume, Inselküche für offene Wohnbereiche, U-Form für separate Küchen mit viel Wandfläche.',
          en: 'The kitchen layout decides where the plumbing, ventilation and sockets go. Leaving this open too long gets expensive: moving a water supply costs 500 to 2,000 EUR, rerouting the extractor duct 1,000 to 5,000 EUR. Recommendation: L-shape for corner rooms, island kitchen for open-plan living areas, U-shape for separate kitchens with lots of wall space.',
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
          de: 'Unter 100 cm zwischen Insel und Küchenzeile kannst du weder Backofentür noch Schubladen öffnen, ohne dass die andere Person im Weg steht. Die Insel muss kleiner oder verschoben werden - vor dem Kücheneinbau kostenlos, danach 2.000 bis 8.000 Euro. Das ist einer der Fehler, den man nicht durch Gewöhnung löst.',
          en: "Below 100 cm between the island and the counter line, you cannot open the oven door or drawers without the other person being in the way. The island needs to be smaller or moved - free before kitchen installation, 2,000 to 8,000 EUR afterwards. This is one of those mistakes you cannot get used to.",
        },
      },
      {
        value: '100-115',
        label: { de: '100–115 cm', en: '100–115 cm' },
        points: 6,
        recommendation: {
          de: "Du kommst gerade so durch, aber zu zweit in der Küche wird es eng. Ziel sind 120 cm - damit können beide aneinander vorbeigehen ohne sich zu berühren. Wenn noch möglich: Insel um einige Zentimeter kürzen oder die Küchenzeile leicht anpassen. Vor dem Einbau kostenlos, danach 1.500 bis 4.000 Euro.",
          en: "You can just about manage, but two people in the kitchen will be in each other's way. Aim for 120 cm - then both people can pass without touching. If still possible: shorten the island or counter by a few centimetres. Free before installation, 1,500 to 4,000 EUR afterwards.",
        },
      },
      { value: 'ab120', label: { de: 'Über 120 cm', en: 'Over 120 cm' }, points: 8 },
      {
        value: 'unknown',
        label: { de: 'Weiß ich nicht / keine Insel', en: "Don't know / no island" },
        points: 3,
        recommendation: {
          de: 'Miss jetzt nach - auf dem Plan und im echten Raum. Wenn du die Backofentür öffnest, geht sie 40 bis 60 cm in den Gang hinein. Bei 100 cm Abstand bleiben also beim Kochen nur noch 40 bis 60 cm übrig. Bei 120 cm sind es 60 bis 80 cm - und das ist der Unterschied zwischen "gerade so" und "entspannt zu zweit kochen".',
          en: 'Measure now - on the plan and in the real space. When you open the oven door it swings 40 to 60 cm into the gap. At 100 cm clearance that leaves only 40 to 60 cm while cooking. At 120 cm you have 60 to 80 cm - the difference between barely managing and comfortably cooking together.',
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
          de: 'Plane das jetzt konkret: Das Minimum ist ein 60 cm tiefer, 80 cm breiter Hochschrank nur für Vorräte. Noch besser ist eine kleine begehbare Nische - 80 cm breit, 60 cm tief, mit Schiebetür. Die kostet kaum mehr als ein Schrank, ist aber viel zugänglicher. Ohne Vorratsraum verdrängen Lebensmittel die Töpfe aus den Schränken - und nach ein paar Monaten liegt alles auf der Arbeitsfläche.',
          en: 'Plan this now: the minimum is a 60 cm deep, 80 cm wide tall cabinet exclusively for food. Even better: a small walk-in niche - 80 cm wide, 60 cm deep, with a sliding door. Barely more expensive than a cabinet but much more accessible. Without any pantry, food starts competing with pots and pans for space - and within months things end up on the worktop.',
        },
      },
      {
        value: 'no',
        label: { de: 'Nein', en: 'No' },
        points: 0,
        recommendation: {
          de: 'Ohne Vorratsraum wandert das Essen auf die Arbeitsfläche. Das klingt harmlos, aber es passiert schnell und dann dauerhaft. Das Minimum: ein Hochschrank nur für Vorräte. Besser: 1 bis 2 m² Nische in der Nähe der Küche, die du jetzt noch einplanen kannst. Im Rohbau kostet das fast nichts - hinterher 3.000 bis 15.000 Euro.',
          en: 'Without pantry storage, food ends up on the worktop. It sounds minor but it happens fast and stays that way. The minimum: one tall cabinet just for food. Better: 1 to 2 m² niche near the kitchen, which you can still add now. In shell construction this costs almost nothing - afterwards 3,000 to 15,000 EUR.',
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
          de: 'Das Minimum sind 4 m²: Waschmaschine, Trockner, Bügelfläche und Putzmittel hinter einer Tür. Lage: am besten im Erdgeschoss, in der Nähe der Küche - nicht im Keller. Jede Treppe zwischen dem Hauswirtschaftsraum und dem Schlafzimmer kostet täglich Zeit. Das ist der Raum, den die meisten im Nachhinein am meisten vermissen - priorisiere ihn jetzt.',
          en: 'The minimum is 4 m²: washing machine, dryer, ironing space and cleaning supplies behind one door. Location: ground floor, close to the kitchen - not in the basement. Every flight of stairs between the laundry room and the bedroom costs time every single day. This is the room most people miss most afterwards - make it a priority now.',
        },
      },
      {
        value: 'no',
        label: { de: 'Nein', en: 'No' },
        points: 0,
        recommendation: {
          de: 'Das ist der Raum, den Familien am häufigsten nachrüsten wollen - und der am teuersten nachzurüsten ist (5.000 bis 25.000 Euro). Ohne HWR steht die Waschmaschine in der Küche oder im Bad, der Trockner irgendwo im Flur, das Bügelbrett hat keinen festen Platz. Wenn kein separater Raum möglich ist: eine Nische von mindestens 1,20 m Breite und 65 cm Tiefe mit Schiebetür fasst Waschmaschine und Trockner übereinander.',
          en: 'This is the room families most often want to add later - and the most expensive to retrofit (5,000 to 25,000 EUR). Without a utility room: washing machine in the kitchen or bathroom, dryer somewhere in the hallway, ironing board with no fixed place. If a separate room is not possible: a niche at least 1.20 m wide and 65 cm deep with a sliding door fits a washing machine and dryer stacked on top of each other.',
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
          de: 'Ohne Stauraum im Flur landet alles auf dem Boden. Das Minimum: 40 cm tief (damit Kleiderbügel nicht herausstehen), 80 cm breit für zwei Personen, 120 cm für vier Personen. Für schmale Flure funktioniert gut: eine Bank mit Schubladen, Haken an der Wand und ein Schrank darüber. Ein einfacher Einbauschrank kostet ab 800 Euro.',
          en: 'Without hallway storage, everything lands on the floor. The minimum: 40 cm deep (so hangers do not stick out), 80 cm wide for two people, 120 cm for four. For narrow hallways this works well: a bench with drawers, hooks on the wall and a wardrobe above. A simple built-in wardrobe starts at around 800 EUR.',
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
          de: 'Im Schlafzimmer braucht jede Person 1 m Schrankbreite und 60 cm Tiefe, damit Kleidung hängend Platz findet. Für zwei Personen also mindestens 2 m. Einbauschränke bis zur Decke haben 15 bis 20 % mehr Platz als freistehende Schränke. Schau auch: Nischen neben Treppen, Dachschrägen ab 150 cm Höhe und Wandflächen zwischen Fenstern - das sind die besten Stellen für Einbauten.',
          en: 'In the bedroom each person needs 1 m of wardrobe width and 60 cm depth for clothes to hang properly. For two people that means at least 2 m total. Floor-to-ceiling built-ins offer 15 to 20% more space than freestanding wardrobes. Also check: niches beside stairs, roof slope areas from 150 cm height, and wall sections between windows - those are the best spots for built-ins.',
        },
      },
      {
        value: 'no',
        label: { de: 'Nein', en: 'No' },
        points: 0,
        recommendation: {
          de: 'Freistehende Schränke verlieren durch Sockel, Oberteil und Seitenwände rund 15 bis 20 % ihres nutzbaren Platzes im Vergleich zu Einbauten. Schau jetzt welche Nischen, Wandbereiche zwischen Fenstern und Dachschrägenbereiche du einplanen kannst - das sind die besten Stellen und jetzt noch kostenlos zu ändern.',
          en: 'Freestanding wardrobes lose around 15 to 20% of their usable space compared to built-ins, due to legs, top panels and side walls. Look now at which niches, wall sections between windows and roof slope areas you can use for built-ins - these spots are ideal and still free to change at this stage.',
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
          de: 'Das Sofa braucht mindestens 2,20 m Wandbreite, ein Esstisch für 4 Personen eine Grundfläche von etwa 2,60 x 3,20 m (Tisch plus Platz zum Hinsetzen und Durchgehen). Wenn du das noch nicht auf dem Plan eingezeichnet hast: Tu es jetzt. Dann siehst du sofort, ob Steckdosen an der falschen Stelle geplant sind oder ein Fenster eine Wand wegnimmt, die du für Möbel brauchst.',
          en: 'A sofa needs at least 2.20 m of wall width, a dining table for 4 people needs a floor area of about 2.60 x 3.20 m (table plus room to sit down and walk past). If you have not drawn this onto the plan yet: do it now. You will immediately see if sockets are in the wrong place or a window is taking away wall space you need for furniture.',
        },
      },
      {
        value: 'no',
        label: { de: 'Nein', en: 'No' },
        points: 0,
        recommendation: {
          de: 'Erstelle jetzt einen einfachen Möblierungsplan - kostenlos mit roomsketcher.com oder auf Millimeterpapier. Das dauert eine Stunde und zeigt dir sofort wo Steckdosen hingehören, welche Wände du für Möbel brauchst und ob Türen richtig aufgehen. Ohne diesen Plan entstehen die klassischen Fehler: Steckdose hinter dem Sofa, Schrank kann nicht stehen weil Fenster im Weg ist, Tür schlägt gegen Stuhl.',
          en: 'Create a simple furniture plan now - free at roomsketcher.com or on graph paper. It takes an hour and immediately shows you where sockets should go, which walls you need for furniture and whether doors open in the right direction. Without this plan the classic mistakes happen: socket behind the sofa, wardrobe cannot fit because of a window, door swings into a dining chair.',
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
          de: 'Prüfe jeden Raum: Gibt es mindestens eine freie Wandfläche von 2,50 m Breite ohne Fenster oder Tür? Das ist die Voraussetzung, damit ein Schrank, Sofa oder Bett sinnvoll stehen kann. Außerdem: Fensterbrüstung sollte mindestens 85 cm hoch sein, damit du eine Anrichte oder ein Sideboard darunter stellen kannst.',
          en: 'Check every room: is there at least one uninterrupted wall of 2.50 m width without a window or door? That is what you need for a wardrobe, sofa or bed to stand properly. Also: the window sill should be at least 85 cm from the floor so you can place a sideboard or console below it.',
        },
      },
      {
        value: 'no',
        label: { de: 'Nein', en: 'No' },
        points: 0,
        recommendation: {
          de: 'Jede Wand mit Fenster verliert Stellfläche. Wenn in einem Raum mehr als die Hälfte aller Wände durch Fenster oder Türen unterbrochen sind, lässt sich der Raum kaum noch möblieren. Lösung: Fenster höher setzen (Brüstung auf mindestens 85 cm), schmaler machen oder verschieben. Erst festlegen wo die Möbel stehen, dann die Fenster planen - nicht umgekehrt.',
          en: 'Every wall with a window loses furniture space. If more than half of all walls in a room are broken up by windows or doors, the room becomes nearly impossible to furnish. Fix: raise the windows higher (sill to at least 85 cm), make them narrower, or move them. First decide where the furniture goes, then plan the windows - not the other way round.',
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
          de: 'Unter 10 m² passen Bett, Schrank und Schreibtisch hinein - und das war es. Kein Platz zum Spielen, kein Platz zum Wachsen. Das Minimum für ein wirklich nutzbares Zimmer sind 12 m². Prüfe ob eine nicht tragende Wand um 30 bis 50 cm verschoben werden kann - das kostet im Rohbau oft unter 2.000 Euro und macht aus einem 10-m²-Zimmer ein vollwertiges 12-m²-Zimmer.',
          en: "Below 10 m² you can fit a bed, wardrobe and desk - and that is it. No space to play, no room to grow. You need at least 12 m² for a room that actually works. Check whether a non-load-bearing wall can be shifted by 30 to 50 cm - often under 2,000 EUR in shell construction, and it turns a 10 m² room into a fully usable 12 m².",
        },
      },
      {
        value: '12-15',
        label: { de: '12–15 m²', en: '12–15 m²' },
        points: 3,
        recommendation: {
          de: '12 m² reicht für ein Kind. Für zwei Kinder oder ein Zimmer, das bis ins Teenageralter funktioniert, sind 15 bis 18 m² besser. Plane die Türöffnung mindestens 45 cm von der nächsten Wand entfernt - sonst schlägt die Tür gegen Möbel und du verlierst nutzbare Wandfläche.',
          en: "12 m² is fine for one child. For two children or a room that works into teenage years, 15 to 18 m² is better. Plan the door to open onto a wall that has no furniture anyway - every door that swings into a usable wall takes away almost half a square metre of space.",
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
          de: 'Gut, dass es eine Terrasse gibt - aber der Weg dorthin sollte direkt vom Essbereich gehen. Von dort nutzt du sie am häufigsten, und Innen und Außen fühlen sich wie ein Raum an. Eine Terrassentür nachrüsten kostet in einer nicht tragenden Außenwand 2.000 bis 5.000 Euro, in einer tragenden Wand 5.000 bis 15.000 Euro.',
          en: 'Good that there is outdoor space - but the access should come directly from the dining area. That is where you use it most and it makes inside and outside feel connected. Adding a terrace door costs 2,000 to 5,000 EUR in a non-load-bearing exterior wall, 5,000 to 15,000 EUR in a load-bearing wall.',
        },
      },
      {
        value: 'no',
        label: { de: 'Kein Außenbereich geplant', en: 'No outdoor area planned' },
        points: 0,
        recommendation: {
          de: 'Eine Terrasse ist kein Luxus - sie ist verlängerter Wohnraum, besonders im Sommer. Mindestens 10 m² sollten es sein, damit ein Tisch für vier Personen plus Bewegungsraum darum herum passt. Eine Betonterrasse kostet 80 bis 150 Euro pro m², Holz 100 bis 200 Euro pro m². Prüfe jetzt ob du noch eine Terrassentür einplanen kannst.',
          en: 'A terrace is not a luxury - it is extra living space, especially in summer. You need at least 10 m² for a table for four people plus room to move around it. A concrete terrace costs 80 to 150 EUR per m², timber 100 to 200 EUR per m². Check now whether you can still add a terrace door to the plan.',
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
          de: 'Wichtig: Vor der Heizungsanlage müssen mindestens 1,20 m frei bleiben, damit ein Techniker rankommt. Vor dem Sicherungskasten mindestens 50 cm. Wenn Hauswirtschaft und Technik im selben Raum sind: mindestens 6 bis 8 m² Gesamtfläche einplanen. Eine Trennwand oder Schranktür reduziert den Betriebslärm der Heizung deutlich - besonders wenn du eine Wärmepumpe planst.',
          en: 'Important: leave at least 1.20 m of clear space in front of the heating unit so a technician can access it. In front of the fuse box at least 50 cm. If utility and technical rooms share the same space: plan at least 6 to 8 m² total. A partition wall or door reduces the noise from the heating system significantly - especially important if you are planning a heat pump.',
        },
      },
      {
        value: 'no',
        label: { de: 'Nein, nicht geplant', en: 'No, not planned' },
        points: 0,
        recommendation: {
          de: 'Ohne klaren Technikraum muss der Heizungsbauer zwischen deinen Möbeln arbeiten - das ist teurer und verleitet dazu, Wartungen aufzuschieben. Plane 4 m² ein, direkt zugänglich vom Flur oder Nebeneingang, nicht durch Wohnräume. Nachträglich diesen Raum zu schaffen kostet 8.000 bis 25.000 Euro.',
          en: 'Without a dedicated technical room, the heating engineer has to work between your furniture - that costs more and makes it tempting to delay servicing. Plan 4 m², directly accessible from the hallway or side entrance, not through living areas. Adding this room retrospectively costs 8,000 to 25,000 EUR.',
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
          de: 'Prüfe ob du Schlaf- und Kinderzimmer noch auf die ruhigere Hof- oder Gartenseite verlegen kannst. Zur Straße gehören Küche oder Wohnzimmer, nicht Schlafzimmer. Falls das nicht mehr geht: Bessere Fenster für die betroffenen Schlafzimmer kosten ca. 1.000 Euro pro Fenster und machen einen echten Unterschied - du wirst nachts deutlich weniger von der Straße hören.',
          en: 'Check whether bedrooms and children\'s rooms can still be moved to the quieter courtyard or garden side. The street side is for the kitchen or living room, not the bedroom. If that is no longer possible: better-insulated windows for the affected bedrooms cost around 1,000 EUR per window and make a real difference - you will hear much less street noise at night.',
        },
      },
      {
        value: 'no',
        label: { de: 'Nein / Unsicher', en: 'No / Unsure' },
        points: 0,
        recommendation: {
          de: 'Schlafzimmer zur Straße bedeutet: du hörst jedes Auto, jede Bremse und morgens früh den Berufsverkehr. Das ist einer der häufigsten Komfortmängel, den man hinterher kaum noch korrigieren kann. Die Raumaufteilung sollte so sein: Schlaf- und Kinderzimmer auf die ruhige Seite (Hof, Garten, Seitenstraße), Küche und Wohnzimmer zur Straße. Falls das nicht mehr geht: Bessere Fenster kosten ca. 1.000 Euro pro Stück und helfen deutlich.',
          en: "Bedroom facing the street means: you hear every car, every brake and the morning rush hour every day. This is one of the most common comfort problems and almost impossible to fix later. The layout should be: bedrooms and children's rooms on the quiet side (courtyard, garden, side street), kitchen and living room towards the street. If that is no longer possible: better-insulated windows cost around 1,000 EUR per window and help a lot.",
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
          de: 'Ein Bad ohne Fenster fühlt sich dauerhaft kleiner und bedrückender an als eines mit Tageslicht - das gewöhnt man sich nicht. Wenn kein direktes Fenster geht: ein kleiner Lichtschacht von oben (ab 30 x 30 cm), eine Glastür oder Glaswand zum Flur (mit Milchglas), oder ein Dachflächenfenster. Selbst ein kleines Fenster von 40 x 40 cm verändert das Raumgefühl komplett. Wenn gar nichts möglich ist: Investiere besonders in gute Beleuchtung - warmes, dimmbares Licht am Spiegel macht einen großen Unterschied.',
          en: 'A bathroom without natural light permanently feels smaller and more oppressive than one with a window - you do not get used to it. If a direct window is not possible: a small light well from above (from 30 x 30 cm), a glass door or glass partition to the hallway (with frosted glass), or a roof window. Even a small 40 x 40 cm window completely changes how the room feels. If nothing at all is possible: invest in good lighting - warm, dimmable light near the mirror makes a big difference.',
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
          de: 'Plane das jetzt konkret: Unter dem Waschtisch ein Unterschrank (mindestens 40 cm tief), ein Hochschrank oder Spiegelschrank für Handtücher und Kosmetik, und in der Dusche eine Nische in der Wand (10 bis 15 cm tief). Die Duschnische muss jetzt in die Wand geplant werden - hinterher kostet sie 500 bis 1.500 Euro pro Stück. Ohne diese Elemente wird die Waschtischfläche innerhalb von Wochen zur Ablage für alles.',
          en: 'Plan this now: an under-sink cabinet (at least 40 cm deep), a tall cabinet or mirror cabinet for towels and toiletries, and a niche in the shower wall (10 to 15 cm deep). The shower niche has to be planned into the wall now - adding one later costs 500 to 1,500 EUR per niche. Without these elements, the sink surface becomes a storage area for everything within weeks.',
        },
      },
      {
        value: 'no',
        label: { de: 'Nein', en: 'No' },
        points: 0,
        recommendation: {
          de: 'Ohne Planung füllt sich ein Bad innerhalb von Monaten vollständig: Produkte auf dem Waschtisch, am Wannenrand, auf dem Boden. Das ist keine Frage der Ordnung - es ist eine Frage von fehlenden Stauraumelementen. Das Minimum: ein Unterschrank, ein Hochschrank oder Spiegelschrank, eine Duschnische in der Wand. Alle diese Elemente müssen jetzt in die Planung, nicht hinterher.',
          en: 'Without planning, a bathroom fills up within months: products on the sink, on the edge of the bath, on the floor. This is not about tidiness - it is about missing storage. The minimum: an under-sink cabinet, a tall cabinet or mirror cabinet, and a shower niche in the wall. All of these need to be in the plan now, not added later.',
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
