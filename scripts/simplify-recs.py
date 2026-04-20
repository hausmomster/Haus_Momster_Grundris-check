import re

with open('lib/questions.ts', 'r', encoding='utf-8') as f:
    content = f.read()

replacements = [
    # Q4 planned DE
    (
        'Mindestanforderung: 60 cm Tiefe (damit Kleiderbügel quer hängen) und 80 cm Breite - das ist das absolute Minimum für eine funktionierende Garderobe. Besser sind 55-60 cm Tiefe und 100-120 cm Breite pro 2 Personen. Die ideale Kombination: Kleiderstange auf 160-180 cm Hoehe, Schuhfach unten (35-40 cm tief, ca. 1 Paar pro 30 cm Breite), 3-5 Haken fuer Taschen und Schirme. Wenn keine eingebaute Nische moeglich ist: Ein 40 cm tiefer Einbauschrank plus Wandhaken plus Schuhbank erfullt dieselbe Funktion. Ohne diese Loesung wandern Jacken und Schuhe sofort in den Wohnbereich.',
        'Das Minimum: 60 cm tief (damit Kleiderbügel quer hängen können) und mindestens 80 cm breit für zwei Personen. Plane das jetzt ein - eine Garderobennische in der Wand kostet fast nichts, ein Einbauschrank hinterher 800 bis 2.500 Euro. Ohne eine feste Lösung wandern Jacken und Schuhe sofort ins Wohnzimmer.',
    ),
    # Q4 planned EN
    (
        'Minimum requirement: 60 cm depth (for cross-hanging coats) and 80 cm width. Better is 55-60 cm depth and 100-120 cm width per 2 people. Ideal combination: clothes rail at 160-180 cm height, shoe compartment below (35-40 cm deep, approx. 1 pair per 30 cm width), 3-5 hooks for bags and umbrellas. If no built-in niche is possible: a 40 cm deep wardrobe plus wall hooks plus shoe bench achieves the same function. Without this solution, coats and shoes immediately migrate into the living area.',
        'The minimum: 60 cm deep (so coats can hang crossways) and at least 80 cm wide for two people. Plan this in now - a built-in wardrobe niche costs almost nothing at this stage, but adding one later runs 800 to 2,500 EUR. Without a fixed solution, coats and shoes will end up in the living room within weeks.',
    ),
    # Q4 no DE
    (
        'Mindestanforderung: 60 cm Tiefe, 80 cm Breite – das ist das Minimum fuer eine Garderobennische, die im Alltag mit mehreren Personen funktioniert. Fuer 4 Personen: mindestens 120 cm Breite. Ohne jede Garderobenloesung ist der Eingang kein Uebergangsbereich mehr, sondern ein Durchgangschaos. Loesung 1 (optimal): Nische direkt in die Wand einplanen - kein zusaetzlicher Schrank noetig, kein Raumverlust. Loesung 2 (nachruestbar): 40-55 cm tiefer Einbauschrank an der naechsten Wandflaeche, erganzt durch Sitzbank mit Schuhstauraum. Kosten nachtraeglich: ca. 800-2.500 Euro je nach Ausfuehrung.',
        'Ohne eine Garderobenlösung landet alles auf dem Boden - das ist keine Frage von Ordnung, sondern von fehlender Infrastruktur. Das Minimum: 60 cm tief, 80 cm breit (für 2 Personen), mit Kleiderstange, Haken und Schuhplatz. Für 4 Personen mindestens 120 cm Breite. Geht auch ohne Nische: ein 40 cm tiefer Schrank plus Wandhaken plus Schuhbank an der ersten freien Wand.',
    ),
    # Q4 no EN
    (
        'Minimum requirement: 60 cm depth, 80 cm width – the minimum for a wardrobe niche that works daily for multiple people. For 4 people: at least 120 cm width. Without any wardrobe solution, the entrance is no longer a transition zone but a chaos zone. Solution 1 (optimal): plan a niche directly into the wall – no extra wardrobe needed, no loss of space. Solution 2 (retrofit): 40-55 cm deep built-in wardrobe on the nearest wall surface, complemented by a bench with shoe storage. Retrofit costs: approx. 800-2,500 EUR depending on execution.',
        'Without a wardrobe solution, everything lands on the floor - not a question of tidiness, but of missing storage. The minimum: 60 cm deep, 80 cm wide for 2 people, with a clothes rail, hooks and shoe space. For 4 people, at least 120 cm wide. Works without a built-in niche too: a 40 cm deep wardrobe plus wall hooks plus a shoe bench against the nearest free wall.',
    ),
    # Q5 partial DE
    (
        'Mindestanforderung: Eine Pufferzone von 1,20-1,50 m Tiefe zwischen Eingangstür und Wohnraum ist das Ziel. Wenn das baulich nicht möglich ist, reicht eine Sichtbarriere: halbhoher Raumteiler (ca. 100-130 cm hoch), Schrank als Raumtrenner oder Schiebetür. Nachrüstbare Lösungen ab ca. 300 Euro (Raumteiler) bis 2.000 Euro (Schiebetür mit Einbau). Die Trennung muss nicht vollständig sein, um zu wirken - schon ein optischer Puffer verhindert den direkten Blick ins Wohnzimmer und reduziert Zug, Lärm und Gerüche aus dem Eingangsbereich spürbar.',
        'Selbst ein kleiner Puffer hilft schon viel - ein Schrank direkt hinter der Tür, ein halbhoher Raumteiler oder eine Schiebetür. Ziel sind mindestens 1,20 m zwischen Haustür und Wohnraum. Das verhindert, dass Kälte, Lärm und der direkte Blick ins Wohnzimmer sofort beim Öffnen der Tür da sind. Ein einfacher Raumteiler kostet ab 300 Euro, eine Schiebetür ca. 1.500 bis 2.000 Euro.',
    ),
    # Q5 partial EN
    (
        'Minimum requirement: a buffer zone of 1.20-1.50 m depth between the entrance door and living area is the goal. If not structurally possible, a visual barrier suffices: half-height room divider (approx. 100-130 cm high), wardrobe as room separator, or sliding door. Retrofit solutions from approx. 300 EUR (room divider) to 2,000 EUR (sliding door with installation). The separation does not need to be complete to be effective - even a visual buffer prevents direct sightlines into the living room and noticeably reduces draughts, noise and smells from the entrance.',
        'Even a small buffer makes a big difference - a wardrobe right behind the door, a half-height room divider, or a sliding door. Aim for at least 1.20 m between the front door and the living space. This stops cold air, noise and a direct view into the living room the moment you open the door. A simple divider costs from 300 EUR, a sliding door around 1,500 to 2,000 EUR.',
    ),
    # Q5 no DE
    (
        'Mindestanforderung: Ein Flurbereich von mindestens 3 m² Nutzfläche ist das Ziel - das entspricht ca. 1,20 m Tiefe und 2,50 m Breite. Das reicht, um Schuhe auszuziehen, Jacken aufzuhängen und die Tür zu öffnen, ohne ins Wohnzimmer zu stolpern. Fehlt dieser Puffer: Eine 55 cm tiefe Garderobenkombination direkt hinter der Eingangstür schafft eine De-facto-Trennung ohne Baueingriff. Alternativ: Schiebetür (ca. 1.500-3.000 Euro nachrüstbar) oder halbhoher Raumteiler (ab 300 Euro). Ein offener Eingang direkt ins Wohnzimmer ist einer der meistbereuten Planungspunkte bei Bauherrinnen.',
        'Das ist einer der Punkte, den hinterher fast alle bereuen. Wenn du durch die Haustür direkt im Wohnzimmer stehst, fehlt jeder Übergangsbereich. Plane mindestens 3 m² Flurfläche ein - das reicht, um Schuhe auszuziehen, Jacken aufzuhängen und die Tür zu öffnen. Wenn das nicht geht: Ein 55 cm tiefer Schrank direkt hinter der Tür schafft eine natürliche Grenze ohne Baumaßnahme.',
    ),
    # Q5 no EN
    (
        'Minimum requirement: a hallway area of at least 3 m² usable floor space is the goal – approx. 1.20 m depth and 2.50 m width. That is enough to take off shoes, hang coats and open the door without stumbling into the living room. If this buffer is missing: a 55 cm deep wardrobe combination directly behind the entrance door creates a de facto separation without construction work. Alternative: sliding door (approx. 1,500-3,000 EUR retrofit) or half-height room divider (from 300 EUR). A direct open entrance into the living room is one of the most commonly regretted planning decisions.',
        'This is one of the things almost everyone regrets afterwards. Walking through the front door straight into the living room means there is no transition zone at all. Aim for at least 3 m² of hallway - enough to take off shoes, hang up a coat and open the door. If that is not possible: a 55 cm deep wardrobe right behind the front door creates a natural boundary without any construction work.',
    ),
    # Q6 under90 DE
    (
        'Mindestanforderung: 90 cm lichte Breite - das ist der gesetzliche Mindestwert laut DIN 18040 (barrierefreies Bauen) und gleichzeitig der praxistaugliche Mindestwert für Alltag mit Familie. Bei unter 90 cm lassen sich Sofa, Kühlschrank oder Waschmaschine kaum noch einbringen; zwei Personen können nicht aneinander vorbeigehen. Handlungsempfehlung: Prüfe ob die engste Stelle durch Versetzen einer nicht-tragenden Wand behoben werden kann - im Rohbau ca. 500-2.000 Euro, nach Fertigstellung 3.000-10.000 Euro. Alternative: Schiebetür statt Drehtür kann den nutzbaren Durchgang um 5-10 cm vergrößern.',
        'Unter 90 cm Breite bekommst du kaum mehr Sofa, Kühlschrank oder Waschmaschine durch - und zwei Personen können nicht aneinander vorbeigehen. Das ist zu eng für den Alltag. Prüfe ob eine nicht tragende Wand an der engsten Stelle verschoben werden kann - im Rohbau kostet das 500 bis 2.000 Euro, hinterher 3.000 bis 10.000 Euro. Eine Schiebetür statt Drehtür kann zusätzlich 5 bis 10 cm zurückgewinnen.',
    ),
    # Q6 under90 EN
    (
        'Minimum requirement: 90 cm clear width – this is the legal minimum per DIN 18040 (barrier-free building) and the practical minimum for family daily life. Below 90 cm, sofas, fridges or washing machines can barely be moved in; two people cannot pass each other. Action: check whether the narrowest point can be resolved by shifting a non-load-bearing wall – approx. 500-2,000 EUR in shell construction, 3,000-10,000 EUR after completion. Alternative: a sliding door instead of a hinged door can increase the usable passage by 5-10 cm.',
        'Below 90 cm you can barely move a sofa, fridge or washing machine through - and two people cannot pass each other. That is too tight for everyday life. Check whether a non-load-bearing wall at the narrowest point can be shifted - in shell construction this costs 500 to 2,000 EUR, afterwards 3,000 to 10,000 EUR. A sliding door instead of a hinged door can also reclaim 5 to 10 cm.',
    ),
    # Q6 90-110 DE
    (
        'Mindestanforderung erfüllt, aber nicht komfortabel: 90 cm ist das gesetzliche Minimum - empfohlen werden 110-120 cm für entspanntes Aneinander-Vorbeigehen und ausreichend Platz für Möbel, Kinderwagen und Einkäufe. Bei 90-110 cm: Eine Person passiert problemlos, zwei Personen müssen ausweichen. Wenn möglich auf 110 cm erweitern: Eine nicht-tragende Wand um 10 cm zu versetzen kostet im Rohbau oft unter 1.000 Euro, nach Trockenbau 3.000-8.000 Euro. Dieser kleine Unterschied wird im Alltag über Jahre spürbar.',
        'Es reicht, aber es ist eng: bei 90 bis 110 cm passt eine Person problemlos durch, zwei müssen ausweichen. Wenn du noch in der Planungsphase bist: Versuch auf 110 cm zu kommen. Eine nicht tragende Wand um 10 cm zu verschieben kostet im Rohbau oft unter 1.000 Euro - nach Fertigstellung 3.000 bis 8.000 Euro. Der Unterschied ist klein auf dem Papier, aber täglich spürbar.',
    ),
    # Q6 90-110 EN
    (
        'Minimum met, but not comfortable: 90 cm is the legal minimum – 110-120 cm is recommended for easy passing and sufficient space for furniture, pushchairs and shopping. At 90-110 cm: one person passes easily, two people must step aside. If possible, expand to 110 cm: shifting a non-load-bearing wall by 10 cm in shell construction often costs under 1,000 EUR, after drylining 3,000-8,000 EUR. This small difference is felt in daily life over many years.',
        'It works but it is tight: at 90 to 110 cm one person passes easily, two have to squeeze past each other. If you are still in the planning stage: aim for 110 cm. Shifting a non-load-bearing wall by 10 cm costs under 1,000 EUR in shell construction - after completion 3,000 to 8,000 EUR. A small change on paper, but noticeable every single day.',
    ),
    # Q6 unknown DE
    (
        "Mindestanforderung: 90 cm lichte Breite an allen Hauptdurchgängen. Miss sofort nach: Nimm ein Maßband und messe alle Engstellen, besonders zwischen Türrahmen, Treppen und dem Übergang von Flur zu Wohnbereich. Achtung: Die lichte Breite ist kleiner als die Wandöffnung - Türrahmen reduzieren die nutzbare Breite um ca. 5-10 cm. Ziel sind mindestens 90 cm (Minimum), besser 110-120 cm. Alles darunter wird mit zunehmendem Möbelbestand und wachsender Familie zur spürbaren täglichen Einschränkung.",
        'Miss jetzt nach - nimm ein Maßband und prüfe alle Engstellen, besonders zwischen Türrahmen, an Treppen und am Übergang vom Flur zum Wohnbereich. Wichtig: Der Türrahmen schluckt noch einmal 5 bis 10 cm. Mindestens 90 cm müssen überall durchgehen, besser 110 cm. Alles darunter wird mit der Zeit zur echten Einschränkung.',
    ),
    # Q6 unknown EN
    (
        "Minimum requirement: 90 cm clear width at all main passages. Measure immediately: take a tape measure and check all tight spots, especially between door frames, stairs and the transition from hallway to living area. Note: clear width is smaller than the wall opening – door frames reduce usable width by approx. 5-10 cm. Target at least 90 cm (minimum), preferably 110-120 cm. Anything less becomes a noticeable daily restriction as furniture accumulates and the family grows.",
        'Measure now - take a tape measure and check all tight spots, especially between door frames, at stairs and between the hallway and living area. Important: door frames eat up another 5 to 10 cm. You need at least 90 cm clear at every main passage, ideally 110 cm. Anything less becomes a real restriction over time.',
    ),
    # Q7 under80 DE
    (
        'Nebendurchgänge unter 80 cm werden im Alltag zur Engstelle – besonders beim Tragen von Wäschekörben, Kisten oder mit Kindern. 80 cm ist der absolute Mindestwert für Nebenwege; Türen brauchen außerdem Aufschlagfläche, die den nutzbaren Durchgang weiter reduziert. Prüfe ob die Wand minimal verschoben werden kann oder ob die Tür durch eine Schiebetür ersetzt werden kann, die keinen Aufschlagbereich benötigt.',
        'Unter 80 cm wird es problematisch sobald du mit einem Wäschekorb, einer Kiste oder mit Kind auf dem Arm durch musst. Außerdem braucht eine Drehtür Platz zum Aufgehen - das macht den Durchgang nochmal enger. Prüfe ob eine Schiebetür hier mehr Platz schafft.',
    ),
    # Q7 under80 EN
    (
        'Secondary passages under 80 cm become bottlenecks in everyday use – especially when carrying laundry baskets, boxes or with children. 80 cm is the absolute minimum for secondary routes; doors also need swing clearance which further reduces the usable passage. Check whether the wall can be shifted slightly or whether the door can be replaced with a sliding door that needs no swing clearance.',
        'Under 80 cm becomes a problem the moment you carry a laundry basket, a box or a child through. A hinged door also needs room to swing open, which makes the passage even tighter. Check whether a sliding door would give you more space here.',
    ),
    # Q7 80-90 DE
    (
        'Ausreichend für Nebenwege – aber wenn du noch in der Planungsphase bist, prüfe ob du auf 90 cm erweitern kannst. Das macht einen spürbaren Unterschied, besonders mit Wäschekörben, Reinigungsgeräten oder wenn die Kinder größer werden. Schiebetüren statt Drehtüren können hier zusätzlich Nutzfläche zurückgewinnen.',
        'Ausreichend für Nebenwege. Wenn du noch in der Planungsphase bist: prüfe ob 90 cm möglich sind - das merkt man besonders mit Wäschekörben oder wenn Kinder größer werden. Schiebetür statt Drehtür kann hier noch extra Platz schaffen.',
    ),
    # Q7 80-90 EN
    (
        'Sufficient for secondary routes – but if you are still in the planning phase, check whether you can expand to 90 cm. This makes a noticeable difference, especially with laundry baskets, cleaning equipment, or as children grow. Sliding doors instead of hinged doors can also reclaim usable space here.',
        'Fine for secondary routes. If you are still in the planning phase: check whether 90 cm is possible - you will notice the difference when carrying laundry or as children grow. A sliding door instead of a hinged door can reclaim extra space here.',
    ),
    # Q7 unknown DE
    (
        'Miss alle Durchgänge im Grundriss nach – auch Nebenwege zu Abstellräumen, Hauswirtschaftsraum und Technikraum sollten mindestens 80 cm breit sein. Denk daran: Die nominale Wandöffnung ist nicht der nutzbare Durchgang – Türrahmen und Aufschlagbereich der Tür reduzieren die lichte Breite nochmals um 5–10 cm.',
        'Miss nach - auch Nebenwege zu Abstellraum und Hauswirtschaftsraum sollten mindestens 80 cm breit sein. Denk daran: Der Türrahmen und das Aufgehen der Tür fressen noch einmal 5 bis 10 cm vom nutzbaren Durchgang.',
    ),
    # Q7 unknown EN
    (
        'Measure all passages in the floor plan – even secondary routes to storage, utility and technical rooms should be at least 80 cm wide. Remember: the nominal wall opening is not the usable passage – door frames and the door swing area further reduce the clear width by 5–10 cm.',
        'Measure all passages - even secondary routes to storage and utility rooms should be at least 80 cm wide. Remember: the door frame and the swing of the door eat up another 5 to 10 cm of the usable width.',
    ),
    # Q8 unsure DE
    (
        'Mindestanforderung: 90 cm freier Durchgang zwischen Möbeln im Hauptweg, 60 cm an Nebenstellen (z.B. neben dem Bett). Erstelle einen Möblierungsplan im Maßstab 1:50 - kostenlos mit roomsketcher.com oder floorplanner.com. Zeichne alle Möbel maßstabsgerecht ein und miss dann alle verbleibenden Gänge nach. Besonders kritisch: Weg zwischen Esstisch und Wand (min. 90 cm für Stuhl ausziehen + Durchgang), Gang hinter dem Sofa (min. 60 cm), Abstand neben dem Bett (min. 60 cm, besser 80 cm). Engstellen lassen sich oft durch kleinere Möbelformate oder wandmontierte Lösungen beheben.',
        'Erstelle einen Möblierungsplan - kostenlos mit roomsketcher.com oder floorplanner.com. Zeichne alle Möbel maßstabsgerecht ein und miss dann alle verbleibenden Wege nach. Besonders kritisch: Weg zwischen Esstisch und Wand (mindestens 90 cm, damit du den Stuhl ausziehen und noch durchgehen kannst), Gang hinter dem Sofa (mindestens 60 cm), Abstand neben dem Bett (mindestens 60 cm, besser 80 cm). Engstellen lassen sich oft durch kleinere Möbel oder wandmontierte Lösungen beheben.',
    ),
    # Q8 unsure EN
    (
        'Minimum requirement: 90 cm clear passage between furniture on main routes, 60 cm at secondary points (e.g. beside the bed). Create a furniture plan at 1:50 scale – free tools: roomsketcher.com or floorplanner.com. Draw all furniture to scale and measure all remaining passages. Particularly critical: path between dining table and wall (min. 90 cm to pull out chair plus pass through), gap behind sofa (min. 60 cm), clearance beside bed (min. 60 cm, better 80 cm). Bottlenecks can often be resolved by smaller furniture formats or wall-mounted solutions.',
        'Create a furniture plan - free tools: roomsketcher.com or floorplanner.com. Draw all furniture to scale and measure the remaining gaps. Most critical: the path between the dining table and the wall (at least 90 cm so you can pull out a chair and still walk past), the gap behind the sofa (at least 60 cm), clearance beside the bed (at least 60 cm, better 80 cm). Bottlenecks can often be fixed by choosing smaller furniture or wall-mounted solutions.',
    ),
    # Q8 yes DE
    (
        'Mindestanforderung: 90 cm freier Durchgang - alles darunter verletzt nicht nur den Komfort, sondern auch die DIN 18040 (barrierefreies Bauen). Dokumentiere jetzt jede Engstelle und prüfe für jede: (1) Kann das Möbelstück kleiner oder wandmontiert werden? (2) Kann die Tür anders aufgehen oder durch eine Schiebetür ersetzt werden (spart 5-10 cm)? (3) Kann eine nicht-tragende Wand minimal verschoben werden? Kosten im Rohbau: 500-2.000 Euro. Nach Fertigstellung: 5.000-15.000 Euro. Je früher die Korrektur, desto günstiger - jetzt handeln.',
        'Notiere jede Engstelle und prüfe für jede: Kann das Möbelstück kleiner sein oder an die Wand montiert werden? Kann die Tür anders aufgehen oder durch eine Schiebetür ersetzt werden - das spart 5 bis 10 cm? Kann eine nicht tragende Wand minimal verschoben werden? Im Rohbau kostet das 500 bis 2.000 Euro, nach dem Einzug 5.000 bis 15.000 Euro. Je früher du handelst, desto günstiger.',
    ),
    # Q8 yes EN
    (
        'Minimum requirement: 90 cm clear passage – anything less violates not only comfort but also DIN 18040 (barrier-free building). Document every bottleneck now and check for each: (1) Can the piece of furniture be smaller or wall-mounted? (2) Can the door open differently or be replaced by a sliding door (saves 5-10 cm)? (3) Can a non-load-bearing wall be shifted slightly? Costs in shell construction: 500-2,000 EUR. After completion: 5,000-15,000 EUR. The earlier the correction, the cheaper – act now.',
        'Note every bottleneck and check for each one: Can the furniture be smaller or wall-mounted? Can the door open the other way or be replaced by a sliding door - saving 5 to 10 cm? Can a non-load-bearing wall be shifted slightly? In shell construction this costs 500 to 2,000 EUR, after completion 5,000 to 15,000 EUR. The earlier you act, the cheaper.',
    ),
    # Q9 galley DE
    (
        'Mindestanforderung: Eine Einzeilerküche braucht mindestens 2,40 m nutzbare Länge, damit Herd, Spüle und beidseitige Arbeitsfläche (je min. 40 cm) nebeneinander passen. Darunter funktioniert die Küche nur für eine Person. Verbesserung mit L-Erweiterung: Schon 60 cm zusätzliche Länge im rechten Winkel schaffen eine zweite Arbeitszone und ermöglichen das Kochen zu zweit. Eine freistehende Insel (min. 80x80 cm) verdoppelt die Arbeitsfläche und schafft Stauraum ohne Wandeingriff. Beides ist oft ohne Grundrissänderung umsetzbar.',
        'Eine Einzeilerküche braucht mindestens 2,40 m Länge, damit Herd, Spüle und genug Arbeitsfläche nebeneinander passen. Darunter ist die Küche nur für eine Person nutzbar. Einfache Verbesserung: Schon 60 cm Arbeitsfläche in einer Ecke als L-Winkel machen das Kochen zu zweit möglich. Auch ein freistehender Küchenwagen schafft zusätzliche Arbeitsfläche ohne Grundrissänderung.',
    ),
    # Q9 galley EN
    (
        'Minimum requirement: a single-line kitchen needs at least 2.40 m usable length so that hob, sink and worktop space (min. 40 cm each side) fit side by side. Below that, the kitchen only works for one person. Improvement with L-extension: even 60 cm of additional length at right angles creates a second work zone and allows two people to cook simultaneously. A freestanding island (min. 80x80 cm) doubles the worktop area and adds storage without touching the walls. Both options are often achievable without floor plan changes.',
        'A single-line kitchen needs at least 2.40 m of length so the hob, sink and enough worktop space all fit side by side. Below that, only one person can cook at a time. Simple fix: just 60 cm of extra worktop in an L-shape makes cooking together possible. A freestanding kitchen trolley also adds worktop space without changing the floor plan.',
    ),
    # Q9 open DE
    (
        'Mindestanforderung: Das Küchendreieck (Kühlen-Waschen-Kochen) sollte eine Gesamtlaufweite von 4-7 m nicht überschreiten - darüber wird die Küche ineffizient. Die Küchenform bestimmt alle Folgeplanungen: Wasseranschlüsse, Abluftkanal, Elektroanschlüsse, Lichtpunkte. Wer die Form zu lange offenlässt, riskiert teure Nacharbeiten (Wasseranschluss verlegen: 500-2.000 Euro, Abluftkanal ummauern: 1.000-5.000 Euro). Empfehlung: L-Form für Eckräume (max. Arbeitsfläche, guter Fluss), Inselküche für offene Bereiche (Kommunikation + Arbeitsfläche), U-Form für separate Küchen mit viel Stellraum.',
        'Die Küchenform bestimmt wo Wasserleitungen, Abluft und Steckdosen hinkommen. Wer das zu lange offenlässt, zahlt hinterher: eine Wasserleitung verlegen kostet 500 bis 2.000 Euro, einen Abluftkanal ummauern 1.000 bis 5.000 Euro. Empfehlung: L-Form für Eckräume, Inselküche für offene Wohnbereiche, U-Form für separate Küchen mit viel Wandfläche.',
    ),
    # Q9 open EN
    (
        'Minimum requirement: the kitchen triangle (refrigerating-washing-cooking) should not exceed a total walking distance of 4-7 m – beyond that the kitchen becomes inefficient. The kitchen layout determines all subsequent planning: plumbing, extract ducting, electrical connections, lighting points. Leaving this open too long risks expensive changes (relocating water supply: 500-2,000 EUR, rerouting extract duct: 1,000-5,000 EUR). Recommendation: L-shape for corner rooms (max worktop, good flow), island kitchen for open-plan areas (communication + worktop), U-shape for separate kitchens with lots of wall space.',
        'The kitchen layout decides where the plumbing, ventilation and sockets go. Leaving this open too long gets expensive: moving a water supply costs 500 to 2,000 EUR, rerouting the extractor duct 1,000 to 5,000 EUR. Recommendation: L-shape for corner rooms, island kitchen for open-plan living areas, U-shape for separate kitchens with lots of wall space.',
    ),
    # Q10 under100 DE
    (
        'Mindestanforderung: 100 cm Mindestabstand zwischen Kücheninsel und Küchenzeile - darunter können Backofentür und Schubladen nicht gleichzeitig geöffnet werden. Empfohlen: 120 cm, damit zwei Personen aneinander vorbeigehen können. Bei unter 100 cm: Die Insel muss verkleinert oder verschoben werden - Kosten vor Einbau: 0 Euro, nach Einbau der Küche: 2.000-8.000 Euro für Neuplanung und Versetzung. Dieser Fehler kann nicht durch Möbel oder Gewöhnung kompensiert werden - er ist täglich präsent.',
        'Unter 100 cm zwischen Insel und Küchenzeile kannst du weder Backofentür noch Schubladen öffnen, ohne dass die andere Person im Weg steht. Die Insel muss kleiner oder verschoben werden - vor dem Kücheneinbau kostenlos, danach 2.000 bis 8.000 Euro. Das ist einer der Fehler, den man nicht durch Gewöhnung löst.',
    ),
    # Q10 under100 EN
    (
        "Minimum requirement: 100 cm minimum clearance between kitchen island and counter line – below this, the oven door and drawers cannot be opened simultaneously. Recommended: 120 cm so two people can pass each other. Below 100 cm: the island must be reduced or repositioned – cost before installation: 0 EUR, after kitchen installation: 2,000-8,000 EUR for replanning and relocation. This error cannot be compensated by furniture or habit – it is present every single day.",
        'Below 100 cm between the island and the counter line, you cannot open the oven door or drawers without the other person being in the way. The island needs to be smaller or moved - free before kitchen installation, 2,000 to 8,000 EUR afterwards. This is one of those mistakes you cannot get used to.',
    ),
    # Q10 100-115 DE
    (
        "Mindestanforderung knapp erfüllt: 100 cm ist das absolute Minimum - bei 100-115 cm können alle Schubladen geöffnet werden, aber zwei Personen können nicht aneinander vorbeigehen ohne sich zu berühren. Ziel: 120 cm. Das bedeutet entweder die Insel um einige Zentimeter zu verkleinern oder die Küchenzeile geringfügig zu kürzen. Im Rohbau kostenlos, nach Kücheneinbau ca. 1.500-4.000 Euro. Der Komfortgewinn von 120 cm gegenüber 100 cm ist erheblich und täglich spürbar.",
        'Du kommst gerade so durch, aber zu zweit in der Küche wird es eng. Ziel sind 120 cm - damit können beide aneinander vorbeigehen ohne sich zu berühren. Wenn noch möglich: Insel um einige Zentimeter kürzen oder die Küchenzeile leicht anpassen. Vor dem Einbau kostenlos, danach 1.500 bis 4.000 Euro.',
    ),
    # Q10 100-115 EN
    (
        "Minimum barely met: 100 cm is the absolute minimum – at 100-115 cm all drawers can be opened, but two people cannot pass each other without touching. Target: 120 cm. This means either reducing the island by a few centimetres or slightly shortening the counter line. Free in shell construction, approx. 1,500-4,000 EUR after kitchen installation. The comfort gain of 120 cm over 100 cm is significant and felt every day.",
        'You can just about manage, but two people in the kitchen will be in each other\'s way. Aim for 120 cm - then both people can pass without touching. If still possible: shorten the island or counter by a few centimetres. Free before installation, 1,500 to 4,000 EUR afterwards.',
    ),
    # Q10 unknown DE
    (
        'Mindestanforderung: 100 cm Mindestabstand, 120 cm empfohlen. Miss den Abstand jetzt nach - auf dem Grundrissplan und im realen Raum. Achtung: Schubladen und Backofentüren öffnen sich in den Gangbereich hinein und reduzieren den nutzbaren Durchgang um weitere 40-60 cm. Das heißt: Bei 100 cm Grundabstand bleiben während des Kochens effektiv 40-60 cm übrig. Bei 120 cm: noch 60-80 cm - das ist der Unterschied zwischen funktional und komfortabel.',
        'Miss jetzt nach - auf dem Plan und im echten Raum. Wenn du die Backofentür öffnest, geht sie 40 bis 60 cm in den Gang hinein. Bei 100 cm Abstand bleiben also beim Kochen nur noch 40 bis 60 cm übrig. Bei 120 cm sind es 60 bis 80 cm - und das ist der Unterschied zwischen "gerade so" und "entspannt zu zweit kochen".',
    ),
    # Q10 unknown EN
    (
        'Minimum requirement: 100 cm minimum clearance, 120 cm recommended. Measure the distance now – on the floor plan and in the actual space. Note: drawers and oven doors open into the passage area, reducing the usable clearance by a further 40-60 cm. This means: at a base clearance of 100 cm, only 40-60 cm remains during cooking. At 120 cm: 60-80 cm remains – that is the difference between functional and comfortable.',
        'Measure now - on the plan and in the real space. When you open the oven door it swings 40 to 60 cm into the gap. At 100 cm clearance that leaves only 40 to 60 cm while cooking. At 120 cm you have 60 to 80 cm - the difference between barely managing and comfortably cooking together.',
    ),
    # Q11 unsure DE
    (
        'Mindestanforderung: 0,5 m² dedizierte Stauraumfläche für Vorräte - das entspricht einem 60 cm tiefen, 80 cm breiten Hochschrank. Optimal: begehbare Speisekammer ab 80x100 cm (0,8 m²). Eine begehbare Speisekammer lässt sich auch als Nische umsetzen: 80 cm breit, 60 cm tief, mit Schiebetür - kaum teurer als ein Hochschrank, aber wesentlich zugänglicher. Ohne diese Lösung: Vorräte verdrängen Töpfe aus den Arbeitsbereichschränken - chronischer Platzmangel, der täglich stört. Nachrüstkosten für eine Speisekammer-Nische: ca. 1.500-5.000 Euro.',
        'Plane das jetzt konkret: Das Minimum ist ein 60 cm tiefer, 80 cm breiter Hochschrank nur für Vorräte. Noch besser ist eine kleine begehbare Nische - 80 cm breit, 60 cm tief, mit Schiebetür. Die kostet kaum mehr als ein Schrank, ist aber viel zugänglicher. Ohne Vorratsraum verdrängen Lebensmittel die Töpfe aus den Schränken - und nach ein paar Monaten liegt alles auf der Arbeitsfläche.',
    ),
    # Q11 unsure EN
    (
        'Minimum requirement: 0.5 m² of dedicated storage space for provisions – equivalent to a 60 cm deep, 80 cm wide tall cabinet. Optimal: a walk-in pantry from 80x100 cm (0.8 m²). A walk-in pantry can also be implemented as a niche: 80 cm wide, 60 cm deep, with a sliding door – barely more expensive than a tall cabinet but far more accessible. Without this solution: provisions displace pots and pans from the working area cabinets – chronic lack of space that causes daily frustration. Retrofit costs for a pantry niche: approx. 1,500-5,000 EUR.',
        'Plan this now: the minimum is a 60 cm deep, 80 cm wide tall cabinet exclusively for food. Even better: a small walk-in niche - 80 cm wide, 60 cm deep, with a sliding door. Barely more expensive than a cabinet but much more accessible. Without any pantry, food starts competing with pots and pans for space - and within months things end up on the worktop.',
    ),
    # Q11 no DE
    (
        'Mindestanforderung: Mindestens ein Hochschrank 60 cm tief, 40 cm breit, ausschließlich für Vorräte - das ist das absolute Minimum. Besser: 1 m² Speisekammer-Nische oder separater Raum. Ohne jede Vorratslösung: Lebensmittel, Dosen, Getränkekästen und Küchengeräte verdrängen sich gegenseitig aus den Schränken. Nach spätestens 6 Monaten steht Vorrat auf der Arbeitsfläche. Eine Speisekammer kostet im Rohbau fast nichts (Wandverschiebung + Tür), nachträglich 3.000-15.000 Euro. Prüfe jetzt, ob 1-2 m² in der Nähe der Küche als Vorratsnische abgetrennt werden können.',
        'Ohne Vorratsraum wandert das Essen auf die Arbeitsfläche. Das klingt harmlos, aber es passiert schnell und dann dauerhaft. Das Minimum: ein Hochschrank nur für Vorräte. Besser: 1 bis 2 m² Nische in der Nähe der Küche, die du jetzt noch einplanen kannst. Im Rohbau kostet das fast nichts - hinterher 3.000 bis 15.000 Euro.',
    ),
    # Q11 no EN
    (
        'Minimum requirement: at least one tall cabinet 60 cm deep, 40 cm wide, exclusively for provisions – that is the absolute minimum. Better: 1 m² pantry niche or separate room. Without any storage solution: food, tins, drink crates and kitchen appliances displace each other from the cabinets. After 6 months at most, provisions are stored on the worktop. A pantry costs almost nothing in shell construction (wall shift + door), but 3,000-15,000 EUR retrospectively. Check now whether 1-2 m² near the kitchen can be partitioned off as a pantry niche.',
        'Without pantry storage, food ends up on the worktop. It sounds minor but it happens fast and stays that way. The minimum: one tall cabinet just for food. Better: 1 to 2 m² niche near the kitchen, which you can still add now. In shell construction this costs almost nothing - afterwards 3,000 to 15,000 EUR.',
    ),
    # Q12 planned DE
    (
        'Mindestanforderung: 4 m² Nutzfläche - das ist das absolute Minimum für Waschmaschine (60x60 cm), Trockner (60x60 cm), Bügelfläche (50x120 cm) und Wandregale für Reinigungsmittel. 6 m² sind komfortabel, 8 m² ideal für Familien. Lage: Erdgeschoss, in der Nähe der Küche, nicht im Keller - jede Treppe zwischen HWR und Schlafzimmer (wo Wäsche anfällt) kostet täglich Zeit. Der HWR ist Nr. 1 auf der Bedauernsliste bei Bauherrinnen ohne diesen Raum. Priorisiere ihn jetzt vor anderen Räumen.',
        'Das Minimum sind 4 m²: Waschmaschine, Trockner, Bügelfläche und Putzmittel hinter einer Tür. Lage: am besten im Erdgeschoss, in der Nähe der Küche - nicht im Keller. Jede Treppe zwischen dem Hauswirtschaftsraum und dem Schlafzimmer kostet täglich Zeit. Das ist der Raum, den die meisten im Nachhinein am meisten vermissen - priorisiere ihn jetzt.',
    ),
    # Q12 planned EN
    (
        'Minimum requirement: 4 m² utility room with water connection, 400V electrical outlet for dryer and wall shelving. Location: ground floor, close to kitchen – every staircase between utility room and bedroom (where laundry originates) costs daily time and energy. 4 m² fits: washing machine (60x60 cm), dryer (60x60 cm), ironing board folded on wall, wall shelves for detergents. 6 m² is comfortable, 8 m² ideal for families. The utility room is No. 1 on the regret list for builders who skipped it – plan it now before it gets squeezed out by other rooms.',
        'The minimum is 4 m²: washing machine, dryer, ironing space and cleaning supplies behind one door. Location: ground floor, close to the kitchen - not in the basement. Every flight of stairs between the laundry room and the bedroom costs time every single day. This is the room most people miss most afterwards - make it a priority now.',
    ),
    # Q12 no DE
    (
        'Mindestanforderung: 4 m² separater Raum mit Wasseranschluss, 400V-Stromanschluss und Wandregalen. Ohne HWR landet die Waschmaschine in Küche oder Bad (Lärm, Platzverlust), der Trockner im Flur (Feuchtigkeit), das Bügelbrett hat keinen festen Platz. Das ist der am häufigsten bereute fehlende Raum in Familienhaushalten. Falls kein separater Raum möglich ist: Einbaunische (min. 1,20 m breit, 65 cm tief) mit Schiebetür – nimmt Waschmaschine und gestapelten Trockner auf. Nachrüstkosten für einen HWR nachträglich: 5.000-25.000 Euro je nach Aufwand.',
        'Das ist der Raum, den Familien am häufigsten nachrüsten wollen - und der am teuersten nachzurüsten ist (5.000 bis 25.000 Euro). Ohne HWR steht die Waschmaschine in der Küche oder im Bad, der Trockner irgendwo im Flur, das Bügelbrett hat keinen festen Platz. Wenn kein separater Raum möglich ist: eine Nische von mindestens 1,20 m Breite und 65 cm Tiefe mit Schiebetür fasst Waschmaschine und Trockner übereinander.',
    ),
    # Q12 no EN
    (
        'Minimum requirement: 4 m² separate room with water connection (for washing machine), electrical connection (dryer) and sufficient shelf space. This is the most commonly regretted missing room in families. Without a utility room: washing machine in kitchen or bathroom (noise, lost space), dryer in hallway (moisture), ironing board with no fixed place (daily frustration). If no separate room is possible: a built-in niche (min. 1.20 m wide, 65 cm deep, with sliding door) is the minimum solution – it accommodates washing machine and dryer stacked. Retrofit costs for a utility room: 5,000-25,000 EUR depending on the scope of work.',
        'This is the room families most often want to add later - and the most expensive to retrofit (5,000 to 25,000 EUR). Without a utility room: washing machine in the kitchen or bathroom, dryer somewhere in the hallway, ironing board with no fixed place. If a separate room is not possible: a niche at least 1.20 m wide and 65 cm deep with a sliding door fits a washing machine and dryer stacked on top of each other.',
    ),
    # Q13 no DE
    (
        'Mindestanforderung: 40 cm Tiefe für Jacken (damit Kleiderbügel nicht aus dem Schrank ragen), besser 55-60 cm. Breite: min. 80 cm für 2 Personen, 120 cm für 4 Personen. Schuhstauraum: 30 cm Tiefe, ca. 1 Paar pro 30 cm Breite. Ohne Stauraumlösung im Flur: Schuhe, Jacken und Taschen landen täglich auf dem Boden und machen den Eingang zur Stolperfalle. Beste Lösung für schmale Flure: Bank mit Stauraum (Sitzhöhe 45 cm), Haken an der Wand (auf 150-170 cm), Schrank raumhoch darüber. Nachrüstkosten Einbauschrank: ab 800 Euro für einfache Lösungen.',
        'Ohne Stauraum im Flur landet alles auf dem Boden. Das Minimum: 40 cm tief (damit Kleiderbügel nicht herausstehen), 80 cm breit für zwei Personen, 120 cm für vier Personen. Für schmale Flure funktioniert gut: eine Bank mit Schubladen, Haken an der Wand und ein Schrank darüber. Ein einfacher Einbauschrank kostet ab 800 Euro.',
    ),
    # Q13 no EN
    (
        'Minimum requirement: 40 cm depth for coats (so clothes hangers do not protrude), preferably 55-60 cm. Width: min. 80 cm for 2 people, 120 cm for 4 people. Shoe storage: 30 cm depth, approx. 1 pair per 30 cm width. Without hallway storage: shoes, coats and bags land on the floor daily and turn the entrance into a trip hazard. Best solution for narrow hallways: bench with storage (seat height 45 cm), hooks on the wall (at 150-170 cm height), floor-to-ceiling wardrobe above. Retrofit cost for built-in wardrobe: from 800 EUR for simple solutions.',
        'Without hallway storage, everything lands on the floor. The minimum: 40 cm deep (so hangers do not stick out), 80 cm wide for two people, 120 cm for four. For narrow hallways this works well: a bench with drawers, hooks on the wall and a wardrobe above. A simple built-in wardrobe starts at around 800 EUR.',
    ),
    # Q14 partial DE
    (
        'Mindestanforderung: Im Schlafzimmer min. 0,8-1 m Schrankbreite pro Person, 58-60 cm Tiefe (damit Kleidung hängend Platz findet). Für 2 Personen: min. 1,60 m Gesamtbreite, besser 2,00-2,50 m. Einbauschränke raumhoch (bis Decke) schaffen 15-20% mehr Volumen als freistehende Schränke gleicher Breite. Investition: Schreiner ab ca. 500-800 Euro/m², Systeme wie IKEA PAX 150-300 Euro/m². Prüfe besonders: Nischen neben Treppen (oft vernachlässigt), Bereiche unter Dachschrägen (ab 150 cm Höhe nutzbar mit Klapphängestangen), Wandflächen zwischen Fenstern.',
        'Im Schlafzimmer braucht jede Person 1 m Schrankbreite und 60 cm Tiefe, damit Kleidung hängend Platz findet. Für zwei Personen also mindestens 2 m. Einbauschränke bis zur Decke haben 15 bis 20 % mehr Platz als freistehende Schränke. Schau auch: Nischen neben Treppen, Dachschrägen ab 150 cm Höhe und Wandflächen zwischen Fenstern - das sind die besten Stellen für Einbauten.',
    ),
    # Q14 partial EN
    (
        'Minimum requirement: in the bedroom, min. 0.8-1 m wardrobe width per person, 58-60 cm depth (so clothes can hang). For 2 people: min. 1.60 m total width, better 2.00-2.50 m. Floor-to-ceiling built-in wardrobes create 15-20% more volume than freestanding wardrobes of the same width. Investment: carpenter from approx. 500-800 EUR/m², systems like IKEA PAX 150-300 EUR/m². Check especially: niches beside stairs (often overlooked), areas under roof slopes (usable from 150 cm height with folding rails), wall surfaces between windows.',
        'In the bedroom each person needs 1 m of wardrobe width and 60 cm depth for clothes to hang properly. For two people that means at least 2 m total. Floor-to-ceiling built-ins offer 15 to 20% more space than freestanding wardrobes. Also check: niches beside stairs, roof slope areas from 150 cm height, and wall sections between windows - those are the best spots for built-ins.',
    ),
    # Q14 no DE
    (
        'Mindestanforderung: 0,8 m Schrankbreite pro Person im Schlafzimmer (60 cm tief), 40-55 cm im Flur. Ohne Einbauschränke: Freistehende Möbel verlieren durch Standfüße, Oberteil und Seitenwände ca. 15-20% des nutzbaren Volumens. Bei einem 2 m breiten Schrank bedeutet das ca. 0,4 m² Stauraumverlust - pro Schrank, dauerhaft. Nachrüstkosten: Deutlich höher als in der Planung, da Wandflächen oft durch nachträgliche Installationen belegt sind. Jetzt handeln: Identifiziere alle Nischen, Wände zwischen Fenstern und Dachschrägenbereiche - das sind die idealen Einbauschrank-Positionen.',
        'Freistehende Schränke verlieren durch Sockel, Oberteil und Seitenwände rund 15 bis 20 % ihres nutzbaren Platzes im Vergleich zu Einbauten. Schau jetzt welche Nischen, Wandbereiche zwischen Fenstern und Dachschrägenbereiche du einplanen kannst - das sind die besten Stellen und jetzt noch kostenlos zu ändern.',
    ),
    # Q14 no EN
    (
        'Minimum requirement: 0.8 m wardrobe width per person in the bedroom (60 cm deep), 40-55 cm in the hallway. Without built-ins: freestanding furniture loses approx. 15-20% of usable volume through legs, top panels and side walls. For a 2 m wide wardrobe, that means approx. 0.4 m² of lost storage space – per wardrobe, permanently. Retrofit costs: significantly higher than in planning, as wall surfaces are often occupied by subsequent installations. Act now: identify all niches, walls between windows and roof slope areas – these are the ideal built-in wardrobe positions.',
        'Freestanding wardrobes lose around 15 to 20% of their usable space compared to built-ins, due to legs, top panels and side walls. Look now at which niches, wall sections between windows and roof slope areas you can use for built-ins - these spots are ideal and still free to change at this stage.',
    ),
    # Q15 partial DE
    (
        'Mindestanforderung: Sofa braucht min. 2,20-2,50 m Wandbreite plus je 30 cm seitlichen Abstand. Esstisch für 4 Personen: 80x140 cm Tisch, plus je 90 cm Freifläche für Stühle ringsum - das bedeutet mindestens 2,60x3,20 m Grundfläche nur für den Essbereich. Ohne festgelegte Möbelposition: Steckdosen landen hinter dem Sofa, Fenster enden genau dort, wo der Schrank stehen soll. Erstelle den Möblierungsplan jetzt: Millimeterpapier (1 cm = 50 cm) oder roomsketcher.com. In einer Stunde erstellt, spart erhebliche Nachkosten beim Elektriker.',
        'Das Sofa braucht mindestens 2,20 m Wandbreite, ein Esstisch für 4 Personen eine Grundfläche von etwa 2,60 x 3,20 m (Tisch plus Platz zum Hinsetzen und Durchgehen). Wenn du das noch nicht auf dem Plan eingezeichnet hast: Tu es jetzt. Dann siehst du sofort, ob Steckdosen an der falschen Stelle geplant sind oder ein Fenster eine Wand wegnimmt, die du für Möbel brauchst.',
    ),
    # Q15 partial EN
    (
        'Minimum requirement: sofa needs min. 2.20-2.50 m wall width plus 30 cm clearance on each side. Dining table for 4 people: 80x140 cm table, plus 90 cm clearance for chairs on all sides – meaning at least 2.60x3.20 m floor area just for the dining zone. Without fixed furniture positions: sockets end up behind the sofa, windows finish exactly where the wardrobe should stand. Create the furniture plan now: graph paper (1 cm = 50 cm) or roomsketcher.com. Created in an hour, saves significant extra costs from the electrician.',
        'A sofa needs at least 2.20 m of wall width, a dining table for 4 people needs a floor area of about 2.60 x 3.20 m (table plus room to sit down and walk past). If you have not drawn this onto the plan yet: do it now. You will immediately see if sockets are in the wrong place or a window is taking away wall space you need for furniture.',
    ),
    # Q15 no DE
    (
        'Mindestanforderung: Wohnzimmer min. 18-20 m² für Sofa + Esstisch + Durchgänge. Schlafzimmer mit Doppelbett: min. 12 m² (Bett 1,80x2,00 m + je 60 cm seitlich + 90 cm am Fußende). Children\'s room: min. 12 m². Ohne Möblierungsplan entstehen die Klassiker: Fenster wo Schrank stehen soll, Steckdosen hinter dem Sofa, Türen die in Esstischstühle schlagen. Erstelle ihn jetzt (kostenlos: roomsketcher.com, floorplanner.com) - 1 Stunde Aufwand, der Elektroplanungsfehler verhindert, die jeweils 500-3.000 Euro Nacharbeit kosten.',
        'Erstelle jetzt einen einfachen Möblierungsplan - kostenlos mit roomsketcher.com oder auf Millimeterpapier. Das dauert eine Stunde und zeigt dir sofort wo Steckdosen hingehören, welche Wände du für Möbel brauchst und ob Türen richtig aufgehen. Ohne diesen Plan entstehen die klassischen Fehler: Steckdose hinter dem Sofa, Schrank kann nicht stehen weil Fenster im Weg ist, Tür schlägt gegen Stuhl.',
    ),
    # Q15 no EN
    (
        "Minimum requirement: living room min. 18-20 m² for sofa + dining table + passages. Double bedroom: min. 12 m² (bed 1.80x2.00 m + 60 cm each side + 90 cm at foot end). Children\'s room: min. 12 m². Without a furniture plan, the classic mistakes occur: windows where the wardrobe should go, sockets behind the sofa, doors swinging into dining chairs. Create one now (free: roomsketcher.com, floorplanner.com) - 1 hour of effort that prevents electrical planning errors costing 500-3,000 EUR each in remediation.",
        'Create a simple furniture plan now - free at roomsketcher.com or on graph paper. It takes an hour and immediately shows you where sockets should go, which walls you need for furniture and whether doors open in the right direction. Without this plan the classic mistakes happen: socket behind the sofa, wardrobe cannot fit because of a window, door swings into a dining chair.',
    ),
    # Q16 unsure DE
    (
        'Mindestanforderung: Mindestens eine 2,50 m breite, zusammenhängende Wandfläche ohne Fenster oder Tür pro Hauptraum. Fensterhöhe: Brüstung min. 85-90 cm ab Boden, damit Anrichten, Sideboards und Sofas darunter Platz finden. Raumtiefe min. 3,50 m für sinnvolle Möblierung. Prüfe jeden Raum: Zeichne den Grundriss und markiere alle freien Wandflächen (keine Türen, keine Fenster unter 85 cm). Gibt es in jedem Hauptraum mindestens eine 2,50 m breie Möbelwand? Wenn nicht: Fensterposition oder -größe anpassen, bevor Rohbau beginnt.',
        'Prüfe jeden Raum: Gibt es mindestens eine freie Wandfläche von 2,50 m Breite ohne Fenster oder Tür? Das ist die Voraussetzung, damit ein Schrank, Sofa oder Bett sinnvoll stehen kann. Außerdem: Fensterbrüstung sollte mindestens 85 cm hoch sein, damit du eine Anrichte oder ein Sideboard darunter stellen kannst.',
    ),
    # Q16 unsure EN
    (
        'Minimum requirement: at least one 2.50 m wide, uninterrupted wall surface without windows or doors in every main room. Window sill height: min. 85-90 cm from the floor so that consoles, sideboards and sofas can fit below. Room depth min. 3.50 m for sensible furniture placement. Check every room: mark all free wall surfaces on the floor plan (no doors, no windows below 85 cm). Does every main room have at least one 2.50 m wide furniture wall? If not: adjust window position or size before shell construction begins.',
        'Check every room: is there at least one uninterrupted wall of 2.50 m width without a window or door? That is what you need for a wardrobe, sofa or bed to stand properly. Also: the window sill should be at least 85 cm from the floor so you can place a sideboard or console below it.',
    ),
    # Q16 no DE
    (
        "Mindestanforderung: 2.50 m of uninterrupted free wall space per main room. No more than 50% of a room's wall surface may be interrupted by windows and doors - beyond that, the room is barely furnishable. Window sill height: min. 85 cm. If these values are exceeded: check whether windows can be raised (sill from 50 cm to 85 cm) or narrowed without significantly reducing light. A taller window at the same glass area is often better for furniture placement than a wide, low window. Planning rule: fix the furniture wall first, then plan windows – not the other way around.",
        'Every wall with a window loses furniture space. If more than half of all walls in a room are broken up by windows or doors, the room becomes nearly impossible to furnish. Fix: raise the windows higher (sill to at least 85 cm), make them narrower, or move them. First decide where the furniture goes, then plan the windows - not the other way round.',
    ),
    # Q16 no EN - note this one has a German string as key due to earlier bug
    (
        "Mindestanforderung: 2,50 m zusammenhängende freie Wandfläche pro Hauptraum. Nicht mehr als 50% der Wandfläche eines Raumes darf durch Fenster und Türen unterbrochen sein - darüber wird der Raum kaum noch möblierbar. Fensterhöhe: Brüstung min. 85 cm. Wenn diese Werte verletzt sind: Prüfe ob Fenster höher gesetzt (Brüstung von 50 cm auf 85 cm) oder schmaler werden können, ohne den Lichteinfall wesentlich zu reduzieren. Ein höheres Fenster bei gleicher Glasfläche ist für Möblierbarkeit oft vorteilhafter als ein breites, tiefes Fenster. Planung: erst Möbelwand festlegen, dann Fenster planen - nicht umgekehrt.",
        'Jede Wand mit Fenster verliert Stellfläche. Wenn in einem Raum mehr als die Hälfte aller Wände durch Fenster oder Türen unterbrochen sind, lässt sich der Raum kaum noch möblieren. Lösung: Fenster höher setzen (Brüstung auf mindestens 85 cm), schmaler machen oder verschieben. Erst festlegen wo die Möbel stehen, dann die Fenster planen - nicht umgekehrt.',
    ),
    # Q17 under10 DE
    (
        'Mindestanforderung: 12 m² für ein Kinder- oder Arbeitszimmer (gesetzliches Minimum in Deutschland: 8 m² - das ist ein Rechtswert, kein Qualitätsstandard). Unter 10 m²: Einzelbett (90x200 cm = 1,8 m²) + Kleiderschrank (1,20 m breit, 60 cm tief = 0,72 m²) + Schreibtisch (60x120 cm = 0,72 m²) + Durchgang (min. 90 cm) = Raum zu 100 % belegt, null Spielfläche. Lösung: prüfen ob eine nicht tragende Wand um 30-50 cm verschoben werden kann - im Rohbau oft unter 2.000 Euro, bringt aber einen 10-m²-Raum auf vollwertige 12 m².',
        'Unter 10 m² passen Bett, Schrank und Schreibtisch hinein - und das war es. Kein Platz zum Spielen, kein Platz zum Wachsen. Das Minimum für ein wirklich nutzbares Zimmer sind 12 m². Prüfe ob eine nicht tragende Wand um 30 bis 50 cm verschoben werden kann - das kostet im Rohbau oft unter 2.000 Euro und macht aus einem 10-m²-Zimmer ein vollwertiges 12-m²-Zimmer.',
    ),
    # Q17 under10 EN
    (
        "Minimum requirement: 12 m² for a children's room with single bed, wardrobe and desk (legal minimum in Germany: 8 m² – but that is a legal value, not a quality standard). Below 10 m²: bed (90x200 cm = 1.8 m²) + wardrobe (1.20 m wide, 60 cm deep = 0.72 m²) + desk (60x120 cm = 0.72 m²) + passage (min. 90 cm) = room 100% occupied, zero play space. Solution: check whether a non-load-bearing wall can be shifted by 30-50 cm – often under 2,000 EUR in shell construction, but turns a 10 m² room into a fully usable 12 m².",
        "Below 10 m² you can fit a bed, wardrobe and desk - and that is it. No space to play, no room to grow. You need at least 12 m² for a room that actually works. Check whether a non-load-bearing wall can be shifted by 30 to 50 cm - often under 2,000 EUR in shell construction, and it turns a 10 m² room into a fully usable 12 m².",
    ),
    # Q17 12-15 DE
    (
        'Mindestanforderung erfüllt: 12 m² ist ausreichend für ein Kind. Für zwei Kinder oder ein Zimmer bis ins Teenageralter: 15-18 m² empfohlen - dann passen Etagenbett, zwei Schreibtische und ein gemeinsamer Schrank rein. Wichtig für die Möblierbarkeit: Türöffnung auf eine Wandseite planen, die ohnehin keine Stellfläche hat - jede Tür, die in eine Stellwand schlägt, kostet ca. 0,5 m² Wandfläche und macht den Raum schwieriger möblierbar. Steckdosen: mindestens 2 Doppelsteckdosen auf verschiedenen Wandseiten, je eine am Schreibtischplatz.',
        '12 m² reicht für ein Kind. Für zwei Kinder oder ein Zimmer, das bis ins Teenageralter funktioniert, sind 15 bis 18 m² besser. Plane die Türöffnung mindestens 45 cm von der nächsten Wand entfernt - sonst schlägt die Tür gegen Möbel und du verlierst nutzbare Wandfläche.',
    ),
    # Q17 12-15 EN
    (
        "Minimum met: 12 m² is sufficient for one child. For two children or a room through to teenage years: 15-18 m² recommended – then a bunk bed, two desks and a shared wardrobe fit in. Important for furniture placement: plan the door opening onto a wall side that has no placement area anyway – every door that swings into a usable wall costs approx. 0.5 m² of wall space and makes the room harder to furnish. Sockets: at least 2 double sockets on different walls, one at the desk position.",
        "12 m² is fine for one child. For two children or a room that works into teenage years, 15 to 18 m² is better. Plan the door to open onto a wall that has no furniture anyway - every door that swings into a usable wall takes away almost half a square metre of space.",
    ),
    # Q22 indirect DE
    (
        'Mindestanforderung: Terrassentür min. 90 cm breit, Schwelle max. 2 cm hoch (Mindeststandard barrierefreies Bauen). Optimale Position: Essbereich, damit Innen- und Außenbereich verbunden werden und die Terrasse als verlängerter Wohnraum funktioniert. Eine Terrassentür im Wohnzimmer hat den Nachteil von Wärmeverlust und Zugluft. Im Essbereich ist die Nutzungsfrequenz höher und der Wärmeverlust geringer. Nachrüstkosten für eine Terrassentür in einer nicht-tragenden Außenwand: ca. 2.000-5.000 Euro inkl. Einbau. In tragenden Wänden: 5.000-15.000 Euro.',
        'Gut, dass es eine Terrasse gibt - aber der Weg dorthin sollte direkt vom Essbereich gehen. Von dort nutzt du sie am häufigsten, und Innen und Außen fühlen sich wie ein Raum an. Eine Terrassentür nachrüsten kostet in einer nicht tragenden Außenwand 2.000 bis 5.000 Euro, in einer tragenden Wand 5.000 bis 15.000 Euro.',
    ),
    # Q22 indirect EN
    (
        'Minimum requirement: terrace door min. 90 cm wide, threshold max. 2 cm high (barrier-free building standard). Optimal position: dining area, so that indoor and outdoor areas are connected and the terrace functions as an extended living space. A terrace door in the living room has the disadvantage of heat loss and draught. In the dining area, usage frequency is higher and heat loss lower. Retrofit costs for a terrace door in a non-load-bearing exterior wall: approx. 2,000-5,000 EUR including installation. In load-bearing walls: 5,000-15,000 EUR.',
        'Good that there is outdoor space - but the access should come directly from the dining area. That is where you use it most and it makes inside and outside feel connected. Adding a terrace door costs 2,000 to 5,000 EUR in a non-load-bearing exterior wall, 5,000 to 15,000 EUR in a load-bearing wall.',
    ),
    # Q22 no DE
    (
        'Mindestanforderung: 10 m² Terrassenfläche, direkt zugänglich vom Wohn- oder Essbereich, stufenlos oder mit max. 2 cm Schwelle. Unter 10 m² ist kaum Platz für Tisch (90x160 cm) plus Umlaufweg (90 cm). Nachrüstoptionen: Betonterrasse ca. 80-150 Euro/m² (ohne Überdachung), Holzterrasse ca. 100-200 Euro/m², Wintergarten ab ca. 15.000 Euro, Pergola ca. 3.000-10.000 Euro. Kein Außenbereich ist selten ein Planungsziel, meist ein Planungsversäumnis. Prüfe jetzt ob Terrassentür und Terrassenfläche noch eingeplant werden können.',
        'Eine Terrasse ist kein Luxus - sie ist verlängerter Wohnraum, besonders im Sommer. Mindestens 10 m² sollten es sein, damit ein Tisch für vier Personen plus Bewegungsraum darum herum passt. Eine Betonterrasse kostet 80 bis 150 Euro pro m², Holz 100 bis 200 Euro pro m². Prüfe jetzt ob du noch eine Terrassentür einplanen kannst.',
    ),
    # Q22 no EN
    (
        'Minimum requirement: 10 m² terrace area, directly accessible from the living or dining area, stepless or with max. 2 cm threshold. Below 10 m² there is barely room for a table (90x160 cm) plus circulation path (90 cm). Retrofit options: concrete terrace approx. 80-150 EUR/m² (without cover), timber terrace approx. 100-200 EUR/m², conservatory from approx. 15,000 EUR, pergola approx. 3,000-10,000 EUR. No outdoor area is rarely a planning goal, usually a planning omission. Check now whether a terrace door and terrace area can still be incorporated.',
        'A terrace is not a luxury - it is extra living space, especially in summer. You need at least 10 m² for a table for four people plus room to move around it. A concrete terrace costs 80 to 150 EUR per m², timber 100 to 200 EUR per m². Check now whether you can still add a terrace door to the plan.',
    ),
    # Q23 integrated DE
    (
        'Mindestanforderung: Heizanlage braucht min. 1,20 m Freiraum davor für Wartungszugang. Elektroverteiler: min. 50 cm Freifläche davor (VDE-Vorschrift). Lüftungsanlage + Pufferspeicher: ca. 2-3 m² Bodenfläche. Wenn HWR und Technik kombiniert werden: mindestens 6-8 m² Gesamtfläche einplanen. Eine separate Abtrennung (Schranktür, Trennwand) reduziert den Betriebslärm von Heizung und Pumpen spürbar - das ist besonders relevant bei Luft-Wärmepumpen, die bei bestimmten Wetterbedingungen dauerhaft laufen.',
        'Wichtig: Vor der Heizungsanlage müssen mindestens 1,20 m frei bleiben, damit ein Techniker rankommt. Vor dem Sicherungskasten mindestens 50 cm. Wenn Hauswirtschaft und Technik im selben Raum sind: mindestens 6 bis 8 m² Gesamtfläche einplanen. Eine Trennwand oder Schranktür reduziert den Betriebslärm der Heizung deutlich - besonders wenn du eine Wärmepumpe planst.',
    ),
    # Q23 integrated EN
    (
        'Minimum requirement: heating system needs min. 1.20 m of clear space in front for maintenance access. Electrical distribution board: min. 50 cm clear space in front (VDE regulation). Ventilation unit + buffer tank: approx. 2-3 m² floor area. If utility room and technical systems are combined: plan at least 6-8 m² total area. A separate partition (wardrobe door, dividing wall) noticeably reduces operating noise from heating and pumps – particularly relevant with air heat pumps, which run continuously in certain weather conditions.',
        'Important: leave at least 1.20 m of clear space in front of the heating unit so a technician can access it. In front of the fuse box at least 50 cm. If utility and technical rooms share the same space: plan at least 6 to 8 m² total. A partition wall or door reduces the noise from the heating system significantly - especially important if you are planning a heat pump.',
    ),
    # Q23 no DE
    (
        'Mindestanforderung: 4 m² separater Technikraum mit direkter Zugänglichkeit, ausreichender Belüftung und min. 50 cm Freifläche vor dem Elektroverteiler (VDE-Pflicht). Heizungsanlage: min. 1,20 m Wartungsabstand. Lüftungsanlage: min. 0,5-1 m² je nach System. Ohne klaren Technikraum: Wartungstechniker, Schornsteinfeger und Ableser müssen zwischen Wohnraummöbeln arbeiten, was Kosten erhöht und Probleme verschleppt. Kosten einer nachträglichen Technikraumschaffung: 8.000-25.000 Euro je nach Eingriff in Tragwerk. Positionierung: Idealerweise direkter Zugang vom Flur oder Nebeneingang, nicht durch Wohnräume.',
        'Ohne klaren Technikraum muss der Heizungsbauer zwischen deinen Möbeln arbeiten - das ist teurer und verleitet dazu, Wartungen aufzuschieben. Plane 4 m² ein, direkt zugänglich vom Flur oder Nebeneingang, nicht durch Wohnräume. Nachträglich diesen Raum zu schaffen kostet 8.000 bis 25.000 Euro.',
    ),
    # Q23 no EN
    (
        'Minimum requirement: 4 m² separate technical room with direct accessibility, adequate ventilation and min. 50 cm clear space in front of the electrical distribution board (VDE obligation). Heating system: min. 1.20 m maintenance clearance. Ventilation unit: min. 0.5-1 m² depending on system. Without a clear technical room: maintenance technicians, chimney sweeps and meter readers must work among living room furniture, increasing costs and delaying problem resolution. Costs of creating a technical room retrospectively: 8,000-25,000 EUR depending on structural involvement. Positioning: ideally direct access from the hallway or secondary entrance, not through living areas.',
        'Without a dedicated technical room, the heating engineer has to work between your furniture - that costs more and makes it tempting to delay servicing. Plan 4 m², directly accessible from the hallway or side entrance, not through living areas. Adding this room retrospectively costs 8,000 to 25,000 EUR.',
    ),
    # Q25 partial DE
    (
        'Mindestanforderung: Schallschutzklasse 3 (Rw 35 dB) für Schlafzimmer zur Wohnstraße. An Hauptstraßen oder Bahnlinien: Klasse 4-5 (40-45 dB). Städtischer Nachtlärm 55-65 dB(A) minus Klasse-4-Fenster (ca. 40 dB Dämmung) = noch 15-25 dB(A) im Schlafzimmer - erträglich, aber kein Komfort. Prüfe ob Schlaf- und Kinderzimmer auf die ruhigere Hof- oder Gartenseite verlegt werden können. Falls nicht möglich: Dreifachverglasung nachrüsten - ca. 800-1.500 Euro pro Fenster inklusive Einbau. Ergänzend: schwere Vorhänge und schallabsorbierende Materialien (Bücherregale, Akustikpaneele).',
        'Prüfe ob du Schlaf- und Kinderzimmer noch auf die ruhigere Hof- oder Gartenseite verlegen kannst. Zur Straße gehören Küche oder Wohnzimmer, nicht Schlafzimmer. Falls das nicht mehr geht: Bessere Fenster für die betroffenen Schlafzimmer kosten ca. 1.000 Euro pro Fenster und machen einen echten Unterschied - du wirst nachts deutlich weniger von der Straße hören.',
    ),
    # Q25 partial EN
    (
        "Minimum requirement: sound insulation class 3 (Rw 35 dB) for bedrooms facing a residential street. On main roads or railway lines: class 4-5 (40-45 dB). Urban night noise 55-65 dB(A) minus class 4 windows (approx. 40 dB attenuation) = 15-25 dB(A) remaining in bedroom - tolerable but not comfort. Check whether bedrooms and children\'s rooms can be moved to the quieter courtyard or garden side. If not possible: retrofit triple glazing - approx. 800-1,500 EUR per window including installation. Additionally: heavy curtains and sound-absorbing materials (bookshelves, acoustic panels).",
        "Check whether bedrooms and children's rooms can still be moved to the quieter courtyard or garden side. The street side is for the kitchen or living room, not the bedroom. If that is no longer possible: better-insulated windows for the affected bedrooms cost around 1,000 EUR per window and make a real difference - you will hear much less street noise at night.",
    ),
    # Q25 no DE
    (
        'Mindestanforderung: Schallschutzklasse 3 (Rw 35 dB) ist das Minimum für ein Schlafzimmer zur Wohnstraße. An Hauptstraßen oder Bahnlinien: Klasse 4-5 (40-45 dB). Zum Vergleich: Städtischer Nachtlärm 55-65 dB(A), mit Klasse-4-Fenstern effektiv 15-25 dB(A) Reduktion = erträgliche Nachtruhe. Kosten Nachrüstung: ca. 800-1.500 Euro pro Fenster inklusive Einbau. Massivwände Schlafzimmer zu Treppenhaus oder Küche: min. 17,5 cm Vollziegel - Leichtwände übertragen Schall nahezu ungedämpft. Planungsregel: Schlafräume auf ruhige Seite, Küche/Wohnen zur Straße.',
        'Schlafzimmer zur Straße bedeutet: du hörst jedes Auto, jede Bremse und morgens früh den Berufsverkehr. Das ist einer der häufigsten Komfortmängel, den man hinterher kaum noch korrigieren kann. Die Raumaufteilung sollte so sein: Schlaf- und Kinderzimmer auf die ruhige Seite (Hof, Garten, Seitenstraße), Küche und Wohnzimmer zur Straße. Falls das nicht mehr geht: Bessere Fenster kosten ca. 1.000 Euro pro Stück und helfen deutlich.',
    ),
    # Q25 no EN
    (
        'Minimum requirement: sound insulation class 3 (Rw 35 dB) is the minimum for a bedroom facing a residential street. On main roads or railway lines: class 4-5 (40-45 dB). For comparison: urban night noise 55-65 dB(A), with class 4 windows effectively 15-25 dB(A) reduction = tolerable night rest. Retrofit costs: approx. 800-1,500 EUR per window including installation. Solid walls between bedroom and stairwell or kitchen: min. 17.5 cm solid brick – lightweight walls transmit sound almost undamped. Planning rule: sleeping areas on the quiet side, kitchen/living towards the street.',
        'Bedrooms facing the street is one of the most common comfort problems in city apartments - and one of the hardest to fix afterwards. The layout should be: bedrooms and children\'s rooms on the quiet side, kitchen and living room towards the street. If that is no longer possible: triple glazing costs 800 to 1,500 EUR per window and makes a real difference.',
    ),
    # Q19 no DE
    (
        'Mindestanforderung: min. 0,5 m² Fensterfläche für ein Bad mit Tageslicht (in Deutschland ist Tageslicht für Aufenthaltsräume Pflicht - Bäder sind ausgenommen, aber die Lebensqualität leidet erheblich). Alternativen ohne direktes Außenfenster: Lichtschacht (ab 30x30 cm wirksam, Nachrüstkosten ca. 2.000-5.000 Euro), Dachflächenfenster im Rohbau ca. 1.500-3.000 Euro, Glastür oder -wand zum Flur (setzt Sichtschutzlösung voraus). Selbst ein 40x40 cm Fenster verändert das Raumgefühl fundamental. Falls nichts möglich: Lichtplanung mit 3 Zonen (Spiegel, Allgemein, Akzent), warmweiß 2.700-3.000 K, dimmbar.',
        'Ein Bad ohne Fenster fühlt sich dauerhaft kleiner und bedrückender an als eines mit Tageslicht - das gewöhnt man sich nicht. Wenn kein direktes Fenster geht: ein kleiner Lichtschacht von oben (ab 30 x 30 cm), eine Glastür oder Glaswand zum Flur (mit Milchglas), oder ein Dachflächenfenster. Selbst ein kleines Fenster von 40 x 40 cm verändert das Raumgefühl komplett. Wenn gar nichts möglich ist: Investiere besonders in gute Beleuchtung - warmes, dimmbares Licht am Spiegel macht einen großen Unterschied.',
    ),
    # Q19 no EN
    (
        'Minimum requirement: min. 0.5 m² window area for a bathroom with natural light (in Germany, natural light is mandatory for habitable rooms – bathrooms are exempt, but quality of life suffers significantly). Alternatives without a direct exterior window: light well (effective from 30x30 cm, retrofit costs approx. 2,000-5,000 EUR), roof window in shell construction approx. 1,500-3,000 EUR, glass door or partition to hallway (requires privacy solution). Even a 40x40 cm window fundamentally changes the feel of the space. If nothing is possible: invest in lighting with 3 zones (mirror, general, accent), warm white 2,700-3,000 K, dimmable.',
        'A bathroom without natural light permanently feels smaller and more oppressive than one with a window - you do not get used to it. If a direct window is not possible: a small light well from above (from 30 x 30 cm), a glass door or glass partition to the hallway (with frosted glass), or a roof window. Even a small 40 x 40 cm window completely changes how the room feels. If nothing at all is possible: invest in good lighting - warm, dimmable light near the mirror makes a big difference.',
    ),
    # Q20 unsure DE
    (
        'Mindestanforderung: Unterschrank (min. 40 cm tief, 60 cm breit) + Hochschrank oder Spiegelschrank (min. 15 cm tief, 60 cm breit) + Duschnische (10-15 cm versenkt, in Wandkonstruktion). Für 2 Personen: ca. 80-100 l Stauraum Minimum. Duschnischen müssen jetzt in die Wandkonstruktion geplant werden - nachträglich ca. 500-1.500 Euro pro Nische. Hochschrank min. 30 cm tief: reicht für gefaltete Handtücher (25 cm), Medikamente und Putzmittel. Ohne diese Planung: Waschtischfläche wird innerhalb von Wochen zur Ablage für alles.',
        'Plane das jetzt konkret: Unter dem Waschtisch ein Unterschrank (mindestens 40 cm tief), ein Hochschrank oder Spiegelschrank für Handtücher und Kosmetik, und in der Dusche eine Nische in der Wand (10 bis 15 cm tief). Die Duschnische muss jetzt in die Wand geplant werden - hinterher kostet sie 500 bis 1.500 Euro pro Stück. Ohne diese Elemente wird die Waschtischfläche innerhalb von Wochen zur Ablage für alles.',
    ),
    # Q20 unsure EN
    (
        'Minimum requirement: under-sink cabinet (min. 40 cm deep, 60 cm wide) + tall cabinet or mirror cabinet (min. 15 cm deep, 60 cm wide) + shower niche (10-15 cm deep, recessed in wall). For 2 people: approx. 80-100 l of storage volume minimum. Shower niches must be planned into the wall construction now – retrofitting costs 500-1,500 EUR per niche. Tall cabinet min. 30 cm deep: sufficient for folded towels (25 cm), medicines and cleaning supplies. Without this planning: the sink surface becomes a storage surface for everything within weeks.',
        'Plan this now: an under-sink cabinet (at least 40 cm deep), a tall cabinet or mirror cabinet for towels and toiletries, and a niche in the shower wall (10 to 15 cm deep). The shower niche has to be planned into the wall now - adding one later costs 500 to 1,500 EUR per niche. Without these elements, the sink surface becomes a storage area for everything within weeks.',
    ),
    # Q20 no DE
    (
        'Mindestanforderung: 1 Unterschrank (min. 40 cm tief) + 1 Hochschrank oder Spiegelschrank (min. 15 cm tief) + 1 Duschnische (10-15 cm versenkt). Das ist das Minimum für einen 2-Personen-Haushalt. Für Familie: zusätzlich Wandregal oder zweiter Hochschrank für Handtücher (Richtwert: 2 Handtücher pro Person + 2 Reserve = bei 4 Personen min. 10 Handtücher = ca. 0,5 m² Regalfläche). Ohne Planung: Bad füllt sich innerhalb von 3 Monaten mit Produkten auf dem Waschtisch, am Wannenrand und auf dem Boden. Das ist Praxis, keine Übertreibung. Alle Stauraumelemente jetzt in die Wandkonstruktion einplanen.',
        'Ohne Planung füllt sich ein Bad innerhalb von Monaten vollständig: Produkte auf dem Waschtisch, am Wannenrand, auf dem Boden. Das ist keine Frage der Ordnung - es ist eine Frage von fehlenden Stauraumelementen. Das Minimum: ein Unterschrank, ein Hochschrank oder Spiegelschrank, eine Duschnische in der Wand. Alle diese Elemente müssen jetzt in die Planung, nicht hinterher.',
    ),
    # Q20 no EN
    (
        'Minimum requirement: 1 under-sink cabinet (min. 40 cm deep) + 1 tall cabinet or mirror cabinet (min. 15 cm deep) + 1 shower niche (10-15 cm recessed). That is the minimum for a 2-person household. For a family: additionally a wall shelf or second tall cabinet for towels (guideline: 2 towels per person + 2 spare = for 4 people min. 10 towels = approx. 0.5 m² of shelf space). Without planning: the bathroom fills up within 3 months with products on the sink, bath edge and floor. That is real-world experience, not an exaggeration. Plan all storage elements into the wall construction now.',
        'Without planning, a bathroom fills up within months: products on the sink, on the edge of the bath, on the floor. This is not about tidiness - it is about missing storage. The minimum: an under-sink cabinet, a tall cabinet or mirror cabinet, and a shower niche in the wall. All of these need to be in the plan now, not added later.',
    ),
]

count = 0
not_found = []
for old, new in replacements:
    if old in content:
        content = content.replace(old, new, 1)
        count += 1
    else:
        not_found.append(old[:80])

with open('lib/questions.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print(f'Replaced {count}/{len(replacements)} strings')
if not_found:
    print(f'\nNOT FOUND ({len(not_found)}):')
    for s in not_found:
        print(f'  - {s}')
