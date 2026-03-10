import { useState, useEffect } from "react";

const PLANTS = [
  {
    id: 1, qty: 1,
    lt: "Lamarko medlieva",
    latin: "Amelanchier lamarckii",
    wiki: "Amelanchier_lamarckii",
    tagline: "Graceful multi-season tree: white spring blossom → edible berries → fiery autumn colour. Shelter from salt spray.",
    color: "#5c7a4c",
    care: {
      sun: { icon: "☀️", title: "Sun & Soil", text: "Full sun (6+ hrs). Acidic–neutral soil (pH 4.5–7.0). Amend sand with 30% compost. 7–10 cm mulch ring year-round." },
      water: { icon: "💧", title: "Watering", text: "Year 1: 10–15 L 2×/week. Established: supplement only in 2+ week droughts (15–20 L weekly)." },
      feed: { icon: "🧪", title: "Fertilizing", text: "Slow-release NPK 20-20-20 once in early spring ~100 g/m², or 5–8 cm compost. Low-demand." },
      prune: { icon: "✂️", title: "Pruning", text: "Blooms on OLD wood — prune only after flowering (late May–Jun) or in late winter. Remove dead/crossing branches only." },
      winter: { icon: "❄️", title: "Winter", text: "Hardy to −20°C. No protection needed established. Stake young trees loosely for first 2 winters." },
      watch: { icon: "⚠️", title: "Watch For", text: "Fireblight — prune 30 cm below damage, disinfect tools. Powdery mildew in humid summers. No salt spray tolerance." }
    }
  },
  {
    id: 2, qty: 5,
    lt: "Vakarinė tuja 'Smaragd'",
    latin: "Thuja occidentalis 'Smaragd'",
    wiki: "Thuja_occidentalis",
    tagline: "Classic emerald-green columnar evergreen. Low-maintenance, dense foliage, good wind tolerance.",
    color: "#2e6b3e",
    care: {
      sun: { icon: "☀️", title: "Sun & Soil", text: "Full sun to partial shade (4+ hrs). Any well-drained soil, pH 6.0–8.0. Tolerates clay better than most conifers." },
      water: { icon: "💧", title: "Watering", text: "Year 1: 10–15 L 2×/week. Established: supplement in dry spells. Deep soak late October before freeze." },
      feed: { icon: "🧪", title: "Fertilizing", text: "Conifer fertilizer (10-10-10) once in spring: 50–100 g per metre of height. Or thin compost layer." },
      prune: { icon: "✂️", title: "Pruning", text: "Light trim Jun–Jul to maintain shape. NEVER cut into old brown wood — won't regrow. Naturally keeps tight columnar form." },
      winter: { icon: "❄️", title: "Winter", text: "Hardy to −35°C. Tie branches with soft twine in November to prevent wet snow from splaying. Avoid road salt spray." },
      watch: { icon: "⚠️", title: "Watch For", text: "Leaf miners (brown tips in spring). Spider mites in hot dry spells. Browning from winter desiccation — water well in autumn." }
    }
  },
  {
    id: 3, qty: 6,
    lt: "Pušis kalninė 'Mops'",
    latin: "Pinus mugo 'Mops'",
    wiki: "Pinus_mugo",
    tagline: "Dense globe-shaped dwarf pine. European native, perfect for cool coastal summers. Candle-pinch in June.",
    color: "#4a6b3a",
    care: {
      sun: { icon: "☀️", title: "Sun & Soil", text: "Full sun (6–8+ hrs). Any well-drained soil (pH 4.5–7.5). Sandy acidic coastal soil is excellent. Prefers lean soil." },
      water: { icon: "💧", title: "Watering", text: "Year 1: 10–15 L weekly, let top 5 cm dry. Established: rarely needed. Deep soak late October before freeze." },
      feed: { icon: "🧪", title: "Fertilizing", text: "Light feeder: 30–50 g conifer fertilizer in spring. If needles yellow: Epsom salts (30 g in 10 L water) once." },
      prune: { icon: "✂️", title: "Candle Pinching ⭐", text: "Late May–mid June: pinch new growth 'candles' to HALF length. Maintains dense globe. Never cut old needleless wood." },
      winter: { icon: "❄️", title: "Winter", text: "Hardy to −30°C+. No protection needed. Low compact form handles snow naturally. Pine bark mulch on root zone." },
      watch: { icon: "⚠️", title: "Watch For", text: "Pine sawfly larvae in May — green caterpillars, defoliate FAST! Squash manually or spray Btk. Also needle scale." }
    }
  },
  {
    id: 4, qty: 2,
    lt: "Šluotelinė hortenzija 'Vanille Fraise'",
    latin: "Hydrangea paniculata 'Vanille Fraise'",
    wiki: "Hydrangea_paniculata",
    tagline: "Huge white-to-pink panicles. Blooms on new wood — hard-prune in March for best flowers & wind-resistant stems.",
    color: "#c08da0",
    care: {
      sun: { icon: "☀️", title: "Sun & Soil", text: "6+ hrs sun for biggest flowers. pH 5.0–8.0 (colour unaffected). Amend sand heavily with compost (50:50) for moisture." },
      water: { icon: "💧", title: "Watering", text: "Year 1: 10–15 L 2–3×/week. Established: weekly deep soak in dry spells. Wilting = needs water immediately." },
      feed: { icon: "🧪", title: "Fertilizing", text: "Balanced 10-10-10 in early April (50–70 g/m²). Phosphorus boost (10-30-20) early June. STOP by late July." },
      prune: { icon: "✂️", title: "Hard Prune March ⭐", text: "Blooms on NEW wood. Early–mid March: cut all shoots to 2–3 buds (30–40 cm from ground). Leave dried heads through winter." },
      winter: { icon: "❄️", title: "Winter", text: "Hardy to −34°C. 5–10 cm bark mulch late Oct. Hard pruning = stocky wind-resistant stems. Fleece if late frost in April." },
      watch: { icon: "⚠️", title: "Watch For", text: "Powdery mildew in humid summers — ensure air circulation. Aphids on new growth. Slugs on young plants." }
    }
  },
  {
    id: 5, qty: 3,
    lt: "Kininis miskantas 'Gracillimus'",
    latin: "Miscanthus sinensis 'Gracillimus'",
    wiki: "Miscanthus_sinensis",
    tagline: "Elegant maiden grass with fine arching foliage. May NOT reliably flower in short coastal seasons — expect foliage interest.",
    color: "#a88840",
    care: {
      sun: { icon: "☀️", title: "Sun & Soil", text: "Full sun (6+ hrs) essential. Shade = lax growth, no flowers. Amend sandy soil with compost. Well-drained." },
      water: { icon: "💧", title: "Watering", text: "Every 2–4 days yr 1. Established: supplement only in 2+ week droughts. Avoid wet winter crowns — sandy drainage helps." },
      feed: { icon: "🧪", title: "Fertilizing", text: "Thin 2 cm compost in spring, or ¼-cup 10-10-10 in May. Avoid high nitrogen — causes weak, flopping stems." },
      prune: { icon: "✂️", title: "Cutting Back ⭐", text: "Leave standing ALL WINTER! Late Feb–early Mar: tie clump, cut all to 10–15 cm. Warm-season — won't grow until late Apr/May." },
      winter: { icon: "❄️", title: "Winter", text: "Hardy to −20°C. Leave foliage standing. Tie bundle loosely in autumn. 5–8 cm bark mulch around base, away from crown." },
      watch: { icon: "⚠️", title: "Watch For", text: "Generally pest-free. Leaf rust in humid conditions. Division every 3–5 years in SPRING ONLY when centre dies out." }
    }
  },
  {
    id: 6, qty: 10,
    lt: "Smailiažiedis lendrūnas 'Karl Foerster'",
    latin: "Calamagrostis × acutiflora 'Karl Foerster'",
    wiki: "Calamagrostis_×_acutiflora",
    wikiAlt: "Calamagrostis",
    tagline: "THE ideal coastal ornamental grass. Blooms reliably June, superb wind tolerance, sterile, zone 3 hardy.",
    color: "#7a8a50",
    care: {
      sun: { icon: "☀️", title: "Sun & Soil", text: "Full sun (6–8 hrs); tolerates part shade. Any soil. Amend sand with compost generously — prefers consistent moisture." },
      water: { icon: "💧", title: "Watering", text: "Keep moist for first 2–3 years. Established: supplement only in dry spells. Rolled-up leaves = water immediately." },
      feed: { icon: "🧪", title: "Fertilizing", text: "Skip it. 5 cm compost mulch annually is enough. Low fertility = shorter, sturdier stems — better in windy coastal areas." },
      prune: { icon: "✂️", title: "Cut Back Early ⭐", text: "Late Feb–early Mar: cut to 10–15 cm. Cool-season grass starts early! Don't cut too low — leave ⅓ of structure." },
      winter: { icon: "❄️", title: "Winter", text: "Zone 3 (−20°C+). Leave plumes for structure & birds. Compost mulch insulates roots. Zero protection needed." },
      watch: { icon: "⚠️", title: "Watch For", text: "Rust (orange pustules) in humid summers — space 60+ cm, water at base. Sterile — never self-seeds. Divide every 3–5 yr." }
    }
  },
  {
    id: 7, qty: 6,
    lt: "Rudeninis mėlitas",
    latin: "Sesleria autumnalis",
    wiki: "Sesleria_autumnalis",
    wikiAlt: "Sesleria",
    tagline: "Evergreen groundcover grass, salt-tolerant, pest-free. Needs one adjustment: lime the acidic soil to neutral pH.",
    color: "#90a850",
    care: {
      sun: { icon: "☀️", title: "Sun & Soil", text: "Full sun to part shade — versatile. INTOLERANT of acidic soil — needs neutral (pH 6.5–7.5). LIME coastal sand before planting." },
      water: { icon: "💧", title: "Watering", text: "Every 2–4 days initially, then weekly. Drought-tolerant once established. Rarely needs supplemental water." },
      feed: { icon: "🧪", title: "Fertilizing", text: "None needed. Thrives in lean soil. Occasional thin compost. Reapply garden lime annually for pH." },
      prune: { icon: "✂️", title: "Grooming (Evergreen!)", text: "Do NOT hard-cut! Late Feb–Mar: comb/rake out dead leaves, keep green growth. Trim to 7.5–10 cm only if very tattered." },
      winter: { icon: "❄️", title: "Winter", text: "Hardy to −18°C. Evergreen foliage = winter interest! Light 3–5 cm mulch. Salt-tolerant — great for coastal gardens." },
      watch: { icon: "⚠️", title: "Watch For", text: "Virtually pest & disease FREE. Deer/rabbit resistant. Easiest plant in the collection." }
    }
  },
  {
    id: 8, qty: 10,
    lt: "Gojinis šalavijas 'Caradonna'",
    latin: "Salvia nemorosa 'Caradonna'",
    wiki: "Salvia_nemorosa",
    tagline: "Dramatic dark purple spikes on near-black stems. Cut back hard after first bloom for a guaranteed second show.",
    color: "#5a3080",
    care: {
      sun: { icon: "☀️", title: "Sun & Soil", text: "Full sun (6+ hrs). Slightly alkaline–neutral preferred; light lime every 2–3 yrs. Sandy drainage is perfect." },
      water: { icon: "💧", title: "Watering", text: "Every 2–4 days first 6 weeks, then weekly (2–3 L deep). Established: drought-tolerant. Root rot from overwatering is main risk." },
      feed: { icon: "🧪", title: "Fertilizing", text: "Fish blood & bone or half-rate 10-10-10 once in spring. Excess N = floppy stems, less purple colour." },
      prune: { icon: "✂️", title: "2nd Bloom Cut ⭐", text: "After 1st bloom fades (late Jun–early Jul): cut ALL stems to 10–15 cm. Be brutal! Water + light feed. 2nd bloom in 4–6 weeks!" },
      winter: { icon: "❄️", title: "Winter", text: "Hardy to −22°C. 5–7 cm mulch after hard frost, away from crown. Leave final stems standing. Remove in March." },
      watch: { icon: "⚠️", title: "Watch For", text: "Exceptionally pest-resistant — deer/rabbit/slug resistant (aromatic foliage). Powdery mildew in still air." }
    }
  },
  {
    id: 9, qty: 5,
    lt: "Rausvažiedė ežiuolė 'PowWow Wild Berry'",
    latin: "Echinacea purpurea 'PowWow Wild Berry'",
    wiki: "Echinacea_purpurea",
    tagline: "Vivid pink-magenta coneflowers for pollinators. Drainage decides whether it lives or dies.",
    color: "#c04050",
    care: {
      sun: { icon: "☀️", title: "Sun & Soil", text: "Full sun (6+ hrs) for strong stems. pH 6.0–7.0. Sandy soil is ideal — loosen 30–40 cm deep + compost for taproot." },
      water: { icon: "💧", title: "Watering", text: "3–5 L every 3–4 days first 6 weeks, then taper. Very drought-tolerant. Crown rot from overwatering = #1 killer!" },
      feed: { icon: "🧪", title: "Fertilizing", text: "Prefers lean soil. 5 cm compost mulch in spring is enough. Excess N = weak stems + increased rot risk." },
      prune: { icon: "✂️", title: "Deadheading", text: "Reblooms without deadheading (cultivar advantage) but removing spent flowers helps. Stop Sep — leave seedheads for birds." },
      winter: { icon: "❄️", title: "Winter", text: "Hardy to zone 3. WET SOIL, not cold, is the threat. Loose mulch AFTER ground freezes (Nov–Dec), donut shape around crown." },
      watch: { icon: "⚠️", title: "Watch For", text: "Powdery mildew — space 45–60 cm. Aster yellows (deformed green flowers) — remove infected plants immediately. Slugs." }
    }
  },
  {
    id: 10, qty: 3,
    lt: "Šilokas 'Carmen'",
    latin: "Sedum 'Carmen'",
    wiki: "Hylotelephium_spectabile",
    wikiAlt: "Sedum_spectabile",
    tagline: "Succulent stonecrop with rose-pink flower plates. Lean soil, sharp drainage, and the Chelsea Chop.",
    color: "#b080a0",
    care: {
      sun: { icon: "☀️", title: "Sun & Soil", text: "Full sun 6+ hrs — shade = flopping. Neutral–slightly alkaline (lime every 2–3 yrs). Do NOT enrich soil. Add 25% grit. Gravel mulch." },
      water: { icon: "💧", title: "Watering", text: "Moist first 4–6 weeks only. After: ALMOST NEVER water. Most drought-tolerant plant here. Overwatering = death by crown rot." },
      feed: { icon: "🧪", title: "Fertilizing", text: "Skip it entirely. Fertile soil causes floppy growth. Even compost may be too much. Gravel mulch only." },
      prune: { icon: "✂️", title: "Chelsea Chop ⭐", text: "Late May–early Jun: cut ⅓ inner stems to ground OR all by ½ (prevents flopping). Feb–Mar: cut old stems to 2–5 cm above rosettes." },
      winter: { icon: "❄️", title: "Winter", text: "Hardy to −20°C. WET soil = danger, not cold. Leave old stems standing. Thin gravel mulch only. Monitor crowns during Feb thaw." },
      watch: { icon: "⚠️", title: "Watch For", text: "Crown/stem rot from moisture — the main killer. Prevention: drainage, no overwatering. Vine weevil larvae — nematodes late summer." }
    }
  }
];

const CALENDAR = [
  { plant: "Amelanchier",
    feb: { action: "✂️ Sanitary prune", when: "Late Feb, before buds swell" },
    mar: { action: "🧪 Fertilize 100g/m²", when: "Early Mar, as soil thaws" },
    apr: { action: "💧 Water if dry", when: "If no rain for 10+ days" },
    may: "", jun: { action: "✂️ Prune after bloom", when: "Once petals drop (late May–Jun)" },
    jul: { action: "⚠️ Watch fireblight", when: "After humid/warm spells" },
    aug: "", sep: "", oct: { action: "🛡️ Mulch root zone", when: "Mid-Oct, before first frost" }, nov: "" },
  { plant: "Thuja ×5",
    feb: "", mar: { action: "🧪 Spring feed", when: "Early Mar, when snow melts" },
    apr: "", may: { action: "✂️ Light trim", when: "Mid–late May, new growth visible" },
    jun: "", jul: "", aug: "", sep: "",
    oct: { action: "💧 Deep soak", when: "Late Oct, before ground freezes" },
    nov: { action: "🛡️ Tie branches vs snow", when: "Before first wet snow forecast" } },
  { plant: "Pinus mugo ×6",
    feb: { action: "✂️ Dead branches", when: "Late Feb, before sap rises" },
    mar: { action: "🧪 Feed 30–50g", when: "Early–mid Mar" },
    apr: "", may: { action: "⚠️ Sawfly larvae!", when: "Check weekly from early May — green caterpillars on needles" },
    jun: { action: "✂️ CANDLE PINCH ½", when: "When candles fully extend but before needles open (late May–mid Jun)" },
    jul: "", aug: "", sep: "",
    oct: { action: "💧 Deep soak", when: "Late Oct, before ground freezes" }, nov: "" },
  { plant: "Hydrangea ×2",
    feb: "", mar: { action: "✂️ HARD PRUNE 2–3 buds", when: "Early–mid Mar, before buds break — cut to 30–40cm" },
    apr: { action: "🧪 Fertilize 50–70g/m²", when: "Early Apr, after pruning wounds heal" },
    may: { action: "💧 Regular watering", when: "2–3×/week if no rain" },
    jun: { action: "🧪 Phosphorus boost", when: "Early Jun, as buds form" },
    jul: { action: "⚠️ Stop feeding; mildew", when: "By late Jul — no fertilizer after this" },
    aug: "", sep: "", oct: { action: "🛡️ 5–10cm bark mulch", when: "Late Oct, leave dried flowerheads on" }, nov: "" },
  { plant: "Miscanthus ×3",
    feb: { action: "✂️ CUT to 10–15cm", when: "Late Feb–early Mar, before new shoots emerge" },
    mar: "", apr: "", may: { action: "🧪 Thin compost", when: "Mid May, once new growth is 15+ cm" },
    jun: "", jul: "", aug: "", sep: "",
    oct: { action: "🛡️ Tie foliage bundle", when: "Before autumn storms" },
    nov: { action: "🛡️ Bark mulch", when: "Before first hard frost" } },
  { plant: "Calamagr. ×10",
    feb: { action: "✂️ CUT to 10–15cm", when: "Late Feb–early Mar — cool-season, starts early!" },
    mar: { action: "🔧 5cm compost mulch", when: "After cutting back" },
    apr: "", may: "",
    jun: { action: "🌸 Blooms! Watch rust", when: "From early Jun — check for orange pustules" },
    jul: "", aug: "", sep: { action: "🔧 Divide if needed", when: "Early–mid Sep, if centre is dying out" },
    oct: "", nov: "" },
  { plant: "Sesleria ×6",
    feb: { action: "✂️ Comb/groom", when: "Late Feb–Mar, rake out dead leaves — do NOT hard-cut" },
    mar: { action: "🔧 Reapply lime", when: "Early Mar, to maintain neutral pH" },
    apr: "", may: "", jun: "", jul: "", aug: "", sep: "",
    oct: { action: "🛡️ Light 3–5cm mulch", when: "Late Oct" }, nov: "" },
  { plant: "Salvia ×10",
    feb: "", mar: { action: "✂️ Old stems; 🧪 feed", when: "Early–mid Mar, once frost risk drops" },
    apr: "", may: "", jun: "",
    jul: { action: "✂️ CUT HARD 10–15cm", when: "When first bloom fades (late Jun–early Jul) — be brutal" },
    aug: { action: "🌸 2nd bloom appears", when: "4–6 weeks after hard cut" },
    sep: { action: "🌸 Enjoy; stop cutting", when: "Let final flowers stand for winter" },
    oct: { action: "🛡️ 5–7cm mulch", when: "After first hard frost, away from crown" }, nov: "" },
  { plant: "Echinacea ×5",
    feb: "", mar: { action: "✂️ Dead stalks; 🧪 compost", when: "Early spring, as ground thaws" },
    apr: "", may: { action: "🔧 Best planting month", when: "Mid May, after last frost" },
    jun: { action: "✂️ Deadhead", when: "As flowers fade, throughout month" },
    jul: { action: "✂️ Deadhead; peak bloom", when: "Ongoing through peak bloom" },
    aug: { action: "✂️ Deadhead", when: "Continue until early Sep" },
    sep: { action: "🔧 Leave seedheads!", when: "Stop deadheading — leave for birds" },
    oct: "", nov: { action: "🛡️ Mulch AFTER freeze", when: "After ground freezes — donut shape around crown" } },
  { plant: "Sedum ×3",
    feb: { action: "✂️ Cut to 2–5cm", when: "Late Feb, cut above new rosettes" },
    mar: { action: "🔧 Lime if needed", when: "Early spring, if pH test shows acidic" },
    apr: "", may: { action: "✂️ CHELSEA CHOP", when: "Late May–early Jun, cut ⅓ stems to ground or all by half" },
    jun: "", jul: "",
    aug: { action: "🌸 Bloom begins", when: "Mid–late Aug" },
    sep: "", oct: { action: "⚠️ Check drainage", when: "Before wet season — ensure no standing water" },
    nov: { action: "⚠️ Crown not in slush", when: "During freeze/thaw cycles — check crowns stay dry" } },
];

const MONTHLY_SUPPLIES = {
  feb: [],
  mar: [
    { icon: "🧪", name: "Universal granular fertilizer (NPK 10-10-10 or similar)", purpose: "Amelanchier, Thuja, Pinus mugo, Salvia spring feed", amount: "~1\u20131.5 kg total" },
    { icon: "ite", name: "Garden lime (dolomitiniai miltai)", purpose: "Sesleria pH correction, Sedum & Salvia", amount: "2\u20133 kg bag" },
    { icon: "\uD83E\uDEB5", name: "Compost or garden soil", purpose: "Calamagrostis mulch + Echinacea top-dress", amount: "2\u20133 bags (50 L)" },
  ],
  apr: [
    { icon: "🧪", name: "Universal granular fertilizer", purpose: "Hydrangea post-prune feed", amount: "50\u201370 g/m\u00B2" },
  ],
  may: [
    { icon: "\uD83E\uDEB5", name: "Compost or universal fertilizer", purpose: "Miscanthus light feed", amount: "2 cm layer or \u00BC cup each" },
  ],
  jun: [
    { icon: "🧪", name: "Universal granular fertilizer", purpose: "Hydrangea bloom boost (extra handful)", amount: "Per label rate" },
  ],
  jul: [],
  aug: [],
  sep: [],
  oct: [
    { icon: "\uD83D\uDEE1\uFE0F", name: "Bark mulch (pu\u0161\u0173 \u017Eiev\u0117)", purpose: "Amelanchier, Hydrangea, Sesleria, Salvia root zone", amount: "5\u201310 cm layer, ~4\u20135 bags (50 L)" },
  ],
  nov: [
    { icon: "\uD83E\uDDF5", name: "Soft twine / rope", purpose: "Thuja branch tying vs wet snow", amount: "~15\u201320 m" },
    { icon: "\uD83D\uDEE1\uFE0F", name: "Bark mulch", purpose: "Miscanthus, Echinacea winter insulation", amount: "5\u20138 cm layer, ~2\u20133 bags" },
  ],
};

const MONTHS = ["feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov"];
const MONTH_LABELS = ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"];

function PlantImage({ wiki, wikiAlt, color, latin, linkable }) {
  const [src, setSrc] = useState(null);
  const [fullSrc, setFullSrc] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function fetchImage(title) {
      try {
        const r = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${title}`);
        if (!r.ok) return null;
        const d = await r.json();
        const thumb = d.thumbnail?.source || d.originalimage?.source || null;
        const full = d.originalimage?.source || thumb;
        return { thumb, full };
      } catch { return null; }
    }
    (async () => {
      let result = await fetchImage(wiki);
      if (!result?.thumb && wikiAlt) result = await fetchImage(wikiAlt);
      if (!cancelled) { setSrc(result?.thumb || null); setFullSrc(result?.full || null); setLoading(false); }
    })();
    return () => { cancelled = true; };
  }, [wiki, wikiAlt]);

  if (loading) return (
    <div style={{ width: "100%", height: "100%", background: `linear-gradient(135deg, ${color}dd, ${color})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ color: "white", fontSize: "0.8rem", opacity: 0.7 }}>Loading…</div>
    </div>
  );
  if (!src) return (
    <div style={{ width: "100%", height: "100%", background: `linear-gradient(135deg, ${color}dd, ${color})`, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", padding: "1rem" }}>
      <div style={{ color: "white", fontSize: "0.75rem", textAlign: "center", opacity: 0.9 }}>{latin}</div>
    </div>
  );
  const img = <img src={src} alt={latin} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />;
  if (linkable && fullSrc) return <a href={fullSrc} target="_blank" rel="noopener noreferrer" style={{ display: "block", width: "100%", height: "100%" }}>{img}</a>;
  return img;
}

function CareItem({ icon, title, text }) {
  const isHighlight = title.includes("⭐");
  const cleanTitle = title.replace(" ⭐", "");
  return (
    <div style={{
      background: isHighlight ? "#fffde7" : "white", padding: "0.75rem 1rem",
      borderLeft: isHighlight ? "3px solid #f9a825" : "none"
    }}>
      <div style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.06em", color: "#3a6b35", fontWeight: 700, marginBottom: "0.3rem" }}>
        {icon} {cleanTitle} {isHighlight && <span style={{ color: "#f9a825" }}>★ KEY</span>}
      </div>
      <div style={{ fontSize: "0.82rem", lineHeight: 1.45, color: "#333" }}>{text}</div>
    </div>
  );
}

function PlantCard({ plant }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ background: "white", borderRadius: 10, boxShadow: "0 2px 10px rgba(0,0,0,0.07)", marginBottom: "1.2rem", overflow: "hidden", border: "1px solid #ddd5c8" }}>
      <div style={{ display: "flex", minHeight: 170, cursor: "pointer" }} onClick={() => setOpen(!open)}>
        <div style={{ width: 220, minWidth: 220, position: "relative", overflow: "hidden" }}>
          <div style={{
            position: "absolute", top: 8, left: 8, background: "rgba(0,0,0,0.6)", color: "white",
            width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 700, fontSize: "0.8rem", zIndex: 2
          }}>{plant.id}</div>
          <PlantImage wiki={plant.wiki} wikiAlt={plant.wikiAlt} color={plant.color} latin={plant.latin} />
        </div>
        <div style={{ flex: 1, padding: "1.2rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <h2 style={{ fontFamily: "'Georgia', serif", fontSize: "1.25rem", fontWeight: 700, color: "#3a6b35", margin: 0 }}>{plant.lt}</h2>
            <span style={{ background: "#3a6b35", color: "white", fontSize: "0.7rem", fontWeight: 700, padding: "2px 8px", borderRadius: 10 }}>×{plant.qty}</span>
          </div>
          <div style={{ fontStyle: "italic", color: "#777", fontSize: "0.88rem", margin: "2px 0 6px" }}>{plant.latin}</div>
          <div style={{ fontSize: "0.84rem", color: "#666", borderTop: "1px solid #eee", paddingTop: 6, marginTop: 2 }}>{plant.tagline}</div>
          <div style={{ fontSize: "0.75rem", color: "#3a6b35", marginTop: 6, fontWeight: 600 }}>{open ? "▲ Hide care details" : "▼ Show care details"}</div>
        </div>
      </div>
      {open && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 1, background: "#e8e0d5", borderTop: "1px solid #e8e0d5" }}>
          {Object.values(plant.care).map((c, i) => <CareItem key={i} {...c} />)}
        </div>
      )}
    </div>
  );
}

export default function PlantGuide() {
  const [allOpen, setAllOpen] = useState(false);
  const currentMonthIndex = new Date().getMonth(); // 0=Jan
  const defaultMonth = currentMonthIndex >= 1 && currentMonthIndex <= 10 ? MONTHS[currentMonthIndex - 1] : MONTHS[0];
  const [selectedMonth, setSelectedMonth] = useState(defaultMonth);

  return (
    <div style={{ background: "#f6f3ed", minHeight: "100vh", fontFamily: "'Segoe UI', 'Helvetica Neue', sans-serif" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "1.2rem" }}>
        <div style={{ textAlign: "right", marginBottom: "0.8rem" }}>
          <button onClick={() => setAllOpen(!allOpen)} style={{
            background: "#3a6b35", color: "white", border: "none", padding: "6px 14px",
            borderRadius: 6, fontSize: "0.8rem", cursor: "pointer", fontWeight: 600
          }}>{allOpen ? "Collapse All" : "Expand All"}</button>
        </div>

        {/* Plant Cards */}
        {PLANTS.map(p => (
          <PlantCardControlled key={p.id} plant={p} forceOpen={allOpen} />
        ))}

        {/* Calendar Table */}
        <div style={{ marginTop: "2.5rem" }}>
          <h2 style={{ fontFamily: "'Georgia', serif", fontSize: "1.5rem", color: "#3a6b35", marginBottom: 4 }}>📅 Monthly Action Calendar</h2>
          <p style={{ color: "#777", fontSize: "0.82rem", marginBottom: "0.8rem" }}>
            Quick reference: what to do each month. <strong>BOLD CAPS</strong> = most critical action. Scroll → on mobile.
          </p>
          <div style={{ overflowX: "auto", borderRadius: 8, boxShadow: "0 2px 10px rgba(0,0,0,0.07)", border: "1px solid #ddd5c8" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.7rem", background: "white", minWidth: 1200 }}>
              <thead>
                <tr>
                  <th style={{ background: "#3a6b35", color: "white", padding: "7px 6px", textAlign: "left", fontWeight: 700, fontSize: "0.68rem", position: "sticky", left: 0, zIndex: 2, minWidth: 220 }}>
                    Plant
                  </th>
                  {MONTH_LABELS.map(m => (
                    <th key={m} style={{ background: "#3a6b35", color: "white", padding: "7px 3px", textAlign: "center", fontWeight: 700, fontSize: "0.68rem", textTransform: "uppercase" }}>{m}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CALENDAR.map((row, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                    <td style={{ padding: "5px 6px", fontWeight: 600, color: "#3a6b35", background: "#fafaf6", position: "sticky", left: 0, zIndex: 1, whiteSpace: "nowrap", fontSize: "0.72rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <div style={{ width: 40, height: 40, minWidth: 40, borderRadius: 4, overflow: "hidden" }}>
                          <PlantImage wiki={PLANTS[i].wiki} wikiAlt={PLANTS[i].wikiAlt} color={PLANTS[i].color} latin={PLANTS[i].latin} linkable />
                        </div>
                        {PLANTS[i].lt}
                      </div>
                    </td>
                    {MONTHS.map(m => {
                      const cell = row[m];
                      const action = cell?.action || "";
                      return (
                        <td key={m} style={{ padding: "4px 3px", textAlign: "center", verticalAlign: "top", lineHeight: 1.3, color: action.includes("HARD") || action.includes("CANDLE") || action.includes("CUT") || action.includes("CHELSEA") || action.includes("KEEP") || action.includes("DEADHEAD") ? "#b71c1c" : "#444" }}>
                          {action || <span style={{ color: "#ccc" }}>—</span>}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.8rem", marginTop: "0.6rem", fontSize: "0.75rem", color: "#777" }}>
            <span>💧 Water</span><span>✂️ Prune/cut</span><span>🧪 Fertilize</span><span>🛡️ Protect</span><span>⚠️ Monitor</span><span>🌸 Bloom</span><span>🔧 Other</span>
          </div>
        </div>

        {/* Monthly Action Summary */}
        <div style={{ marginTop: "2.5rem" }}>
          <h2 style={{ fontFamily: "'Georgia', serif", fontSize: "1.5rem", color: "#3a6b35", marginBottom: 4 }}>🗓️ This Month's Actions</h2>
          <p style={{ color: "#777", fontSize: "0.82rem", marginBottom: "0.8rem" }}>
            Select a month to see all tasks at a glance.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: "1rem" }}>
            {MONTHS.map((m, mi) => (
              <button key={m} onClick={() => setSelectedMonth(m)} style={{
                background: selectedMonth === m ? "#3a6b35" : "white",
                color: selectedMonth === m ? "white" : "#3a6b35",
                border: "1px solid #3a6b35", padding: "6px 12px", borderRadius: 6,
                fontSize: "0.82rem", fontWeight: 600, cursor: "pointer"
              }}>{MONTH_LABELS[mi]}</button>
            ))}
          </div>
          {(() => {
            const tasks = CALENDAR.map((row, i) => ({ plant: PLANTS[i], entry: row[selectedMonth] })).filter(t => t.entry?.action);
            if (tasks.length === 0) return (
              <div style={{ background: "white", borderRadius: 10, padding: "2rem", textAlign: "center", color: "#999", border: "1px solid #ddd5c8" }}>
                No scheduled actions this month. Enjoy the garden!
              </div>
            );
            return (
              <div style={{ display: "grid", gap: "0.6rem" }}>
                {tasks.map(({ plant, entry }) => (
                  <div key={plant.id} style={{
                    background: "white", borderRadius: 10, padding: "0.8rem 1rem",
                    border: "1px solid #ddd5c8", display: "flex", alignItems: "center", gap: 12
                  }}>
                    <div style={{ width: 48, height: 48, minWidth: 48, borderRadius: 6, overflow: "hidden" }}>
                      <PlantImage wiki={plant.wiki} wikiAlt={plant.wikiAlt} color={plant.color} latin={plant.latin} linkable />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, color: "#3a6b35", fontSize: "0.9rem" }}>{plant.lt}</div>
                      <div style={{ fontSize: "0.78rem", color: "#777", fontStyle: "italic" }}>{plant.latin}</div>
                    </div>
                    <div style={{ textAlign: "right", maxWidth: 350 }}>
                      <div style={{ fontSize: "0.88rem", color: "#333" }}>{entry.action}</div>
                      <div style={{ fontSize: "0.75rem", color: "#888", marginTop: 2, fontStyle: "italic" }}>{entry.when}</div>
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}

          {/* Supplies Needed */}
          {(() => {
            const supplies = MONTHLY_SUPPLIES[selectedMonth] || [];
            if (supplies.length === 0) return null;
            return (
              <div style={{ marginTop: "1.2rem" }}>
                <h3 style={{ fontFamily: "'Georgia', serif", fontSize: "1.1rem", color: "#8b6914", marginBottom: "0.5rem" }}>
                  🛒 Supplies Needed
                </h3>
                <div style={{ display: "grid", gap: "0.4rem" }}>
                  {supplies.map((s, i) => (
                    <div key={i} style={{
                      background: "#fffde7", borderRadius: 8, padding: "0.7rem 1rem",
                      border: "1px solid #f0e6b8", display: "flex", alignItems: "center", gap: 12
                    }}>
                      <div style={{ fontSize: "1.3rem", minWidth: 28, textAlign: "center" }}>{s.icon}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700, fontSize: "0.88rem", color: "#5a4a00" }}>{s.name}</div>
                        <div style={{ fontSize: "0.78rem", color: "#888" }}>{s.purpose}</div>
                      </div>
                      <div style={{ fontSize: "0.78rem", color: "#8b6914", fontWeight: 600, textAlign: "right", whiteSpace: "nowrap" }}>{s.amount}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>

      </div>
    </div>
  );
}

function PlantCardControlled({ plant, forceOpen }) {
  const [manualOpen, setManualOpen] = useState(false);
  const isOpen = forceOpen || manualOpen;

  return (
    <div style={{ background: "white", borderRadius: 10, boxShadow: "0 2px 10px rgba(0,0,0,0.07)", marginBottom: "1.2rem", overflow: "hidden", border: "1px solid #ddd5c8" }}>
      <div style={{ display: "flex", minHeight: 170, cursor: "pointer" }} onClick={() => setManualOpen(!manualOpen)}>
        <div style={{ width: 220, minWidth: 220, position: "relative", overflow: "hidden" }}>
          <div style={{
            position: "absolute", top: 8, left: 8, background: "rgba(0,0,0,0.6)", color: "white",
            width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 700, fontSize: "0.8rem", zIndex: 2
          }}>{plant.id}</div>
          <PlantImage wiki={plant.wiki} wikiAlt={plant.wikiAlt} color={plant.color} latin={plant.latin} />
        </div>
        <div style={{ flex: 1, padding: "1.2rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <h2 style={{ fontFamily: "'Georgia', serif", fontSize: "1.25rem", fontWeight: 700, color: "#3a6b35", margin: 0 }}>{plant.lt}</h2>
            <span style={{ background: "#3a6b35", color: "white", fontSize: "0.7rem", fontWeight: 700, padding: "2px 8px", borderRadius: 10 }}>×{plant.qty}</span>
          </div>
          <div style={{ fontStyle: "italic", color: "#777", fontSize: "0.88rem", margin: "2px 0 6px" }}>{plant.latin}</div>
          <div style={{ fontSize: "0.84rem", color: "#666", borderTop: "1px solid #eee", paddingTop: 6, marginTop: 2 }}>{plant.tagline}</div>
          <div style={{ fontSize: "0.75rem", color: "#3a6b35", marginTop: 6, fontWeight: 600 }}>{isOpen ? "▲ Hide care details" : "▼ Show care details"}</div>
        </div>
      </div>
      {isOpen && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 1, background: "#e8e0d5", borderTop: "1px solid #e8e0d5" }}>
          {Object.values(plant.care).map((c, i) => <CareItem key={i} {...c} />)}
        </div>
      )}
    </div>
  );
}
