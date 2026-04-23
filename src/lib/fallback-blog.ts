// Fallback blog data - used when Sanity CMS has no blog content
// Follows the same pattern as fallback-team.ts

// ============================================
// PORTABLE TEXT HELPERS
// ============================================

type PortableTextChild = {
  _type: 'span'
  _key: string
  text: string
  marks: string[]
}

type MarkDef = {
  _key: string
  _type: string
  href?: string
}

type PortableTextBlock = {
  _type: 'block'
  _key: string
  style: string
  markDefs: MarkDef[]
  children: PortableTextChild[]
  listItem?: 'bullet' | 'number'
  level?: number
}

/** Simple block with a single unstyled span */
function block(key: string, style: string, text: string): PortableTextBlock {
  return {
    _type: 'block',
    _key: key,
    style,
    markDefs: [],
    children: [{ _type: 'span', _key: `${key}s`, text, marks: [] }],
  }
}

type TextPart = { text: string; bold?: boolean; link?: { key: string; href: string } }

/** Block with mixed bold/normal/link spans */
function richBlock(key: string, style: string, parts: TextPart[]): PortableTextBlock {
  const markDefs: MarkDef[] = []
  const children: PortableTextChild[] = parts.map((part, i) => {
    const marks: string[] = []
    if (part.bold) marks.push('strong')
    if (part.link) {
      marks.push(part.link.key)
      markDefs.push({ _key: part.link.key, _type: 'link', href: part.link.href })
    }
    return { _type: 'span', _key: `${key}s${i}`, text: part.text, marks }
  })
  return { _type: 'block', _key: key, style, markDefs, children }
}

/** Bullet or numbered list item */
function listItem(key: string, text: string, type: 'bullet' | 'number' = 'bullet'): PortableTextBlock {
  return {
    _type: 'block',
    _key: key,
    style: 'normal',
    markDefs: [],
    children: [{ _type: 'span', _key: `${key}s`, text, marks: [] }],
    listItem: type,
    level: 1,
  }
}

/** Bold list item (e.g., for pricing tables) */
function richListItem(key: string, parts: TextPart[], type: 'bullet' | 'number' = 'bullet'): PortableTextBlock {
  const markDefs: MarkDef[] = []
  const children: PortableTextChild[] = parts.map((part, i) => {
    const marks: string[] = []
    if (part.bold) marks.push('strong')
    if (part.link) {
      marks.push(part.link.key)
      markDefs.push({ _key: part.link.key, _type: 'link', href: part.link.href })
    }
    return { _type: 'span', _key: `${key}s${i}`, text: part.text, marks }
  })
  return { _type: 'block', _key: key, style: 'normal', markDefs, children, listItem: type, level: 1 }
}

// ============================================
// TYPES
// ============================================

type FallbackBlogCategory = {
  _id: string
  slug: string
  title: string
}

type FallbackBlogPost = {
  _id: string
  title: string
  slug: string
  excerpt: string | null
  content: PortableTextBlock[]
  coverImage: {
    alt: string | null
    asset: {
      _id: string
      url: string
    }
  } | null
  category: { _id: string; slug: string; title: string } | null
  author: {
    _id: string
    name: string
    photo: { asset: { _id: string; url: string } } | null
    slug: string
    bio?: string
    jobTitle?: string
  } | null
  publishedAt: string
  featured: boolean
  seo: {
    metaTitle: string | null
    metaDescription: string | null
    ogImage: null
    noIndex: boolean
  } | null
}

// ============================================
// CATEGORY DATA
// ============================================

export const fallbackBlogCategories: Record<string, FallbackBlogCategory[]> = {
  ro: [{ _id: 'cat-implantologie', slug: 'implantologie', title: 'Implantologie' }],
  en: [{ _id: 'cat-implantologie', slug: 'implantologie', title: 'Implantology' }],
  hu: [{ _id: 'cat-implantologie', slug: 'implantologie', title: 'Implantologia' }],
}

// ============================================
// CONTENT: ROMANIAN
// ============================================

const contentRo: PortableTextBlock[] = [
  // Intro paragraphs
  block('ro01', 'normal', '"Doctor, cat ma costa un implant?" E intrebarea pe care o aud de cel putin 3 ori pe zi. Si raspunsul sincer e: depinde. Dar nu iti spun asta ca sa te evit \u2014 ci pentru ca pretul unui implant dentar variaza real in functie de mai multi factori pe care ti-i explic mai jos.'),

  richBlock('ro02', 'normal', [
    { text: 'Am scris acest ghid ca sa ai toate informatiile inainte sa te programezi undeva. Fara surprize, fara costuri ascunse. Asa cum lucram noi la ' },
    { text: 'DentCraft', link: { key: 'lnk1', href: '/' } },
    { text: '.' },
  ]),

  // Section: De ce variaza pretul
  block('ro03', 'h2', 'De ce variaza pretul unui implant dentar?'),

  block('ro04', 'normal', 'Daca ai cautat "implant dentar satu mare pret" pe Google, probabil ai gasit cifre intre 2.000 si 7.000 de lei. Diferenta e mare, stiu. Dar nu e intamplatoare.'),

  block('ro05', 'normal', 'Pretul depinde de trei lucruri:'),

  richBlock('ro06', 'normal', [
    { text: '1. Brandul implantului.', bold: true },
    { text: ' Exista implanturi coreene, israeliene, germane, elvetiene. Un implant Straumann (Elvetia) costa altfel decat un MegaGen sau Osstem. Nu inseamna ca cele mai ieftine sunt proaste \u2014 dar diferenta de material, studii clinice si garantie exista.' },
  ]),

  richBlock('ro07', 'normal', [
    { text: '2. Coroana de pe implant.', bold: true },
    { text: ' Multi pacienti nu realizeaza ca pretul implantului si pretul coroanei sunt lucruri separate. Un implant fara coroana e ca o fundatie fara casa. Coroana poate fi din zirconiu monolitic, ceramica stratificata sau metal-ceramica \u2014 fiecare la alt pret.' },
  ]),

  richBlock('ro08', 'normal', [
    { text: '3. Lucrarile suplimentare.', bold: true },
    { text: ' Uneori osul nu e suficient de gros si trebuie facut un aditie osoasa (augmentare). Alteori gingiva trebuie corectata. Aceste proceduri se adauga la costul total.' },
  ]),

  // Section: Preturi orientative
  block('ro09', 'h2', 'Preturi orientative implant dentar la DentCraft Satu Mare (2026)'),

  block('ro10', 'normal', 'Iata o situatie realista, ca sa stii la ce sa te astepti:'),

  richListItem('ro11', [{ text: 'Implant dentar (fara coroana):', bold: true }, { text: ' 2.500 \u2013 4.500 lei' }]),
  richListItem('ro12', [{ text: 'Coroana pe implant (zirconiu):', bold: true }, { text: ' 1.500 \u2013 2.500 lei' }]),
  richListItem('ro13', [{ text: 'Coroana pe implant (metal-ceramica):', bold: true }, { text: ' 1.000 \u2013 1.800 lei' }]),
  richListItem('ro14', [{ text: 'Aditie osoasa (daca e necesara):', bold: true }, { text: ' 800 \u2013 2.500 lei' }]),
  richListItem('ro15', [{ text: 'Sinus lift (daca e necesar):', bold: true }, { text: ' 1.500 \u2013 3.500 lei' }]),
  richListItem('ro16', [{ text: 'Total implant complet (medie):', bold: true }, { text: ' 4.000 \u2013 6.500 lei', bold: true }]),

  block('ro17', 'normal', 'Preturile de mai sus sunt orientative. Pretul tau final il stabilim dupa consultatie si radiografie 3D \u2014 care la noi e gratuita.'),

  // Section: Ce include pretul
  block('ro18', 'h2', 'Ce include pretul unui implant la DentCraft?'),

  block('ro19', 'normal', 'Am vazut cazuri in care pacienti au platit mai putin la alta clinica, dar apoi au descoperit ca fiecare vizita de control era taxata separat. Sau ca radiografia nu era inclusa. Sau ca anestazia avea un cost extra.'),

  block('ro20', 'normal', 'La noi, pretul implantului include:'),

  listItem('ro21', 'Consultatia initiala si planul de tratament'),
  listItem('ro22', 'Radiografia 3D (CBCT) \u2014 o facem in cabinet, cu scanner-ul nostru'),
  listItem('ro23', 'Implantul propriu-zis (titan, biocompatibil)'),
  listItem('ro24', 'Bontul protetic (piesa care leaga implantul de coroana)'),
  listItem('ro25', 'Controalele post-operatorii pe toata perioada de vindecare'),
  listItem('ro26', 'Garantie pe implant'),

  block('ro27', 'normal', 'Coroana se plateste separat, dar stii pretul dinainte. Fara surprize.'),

  // Section: Ieftin vs scump
  block('ro28', 'h2', 'Implant dentar ieftin vs. scump \u2014 merita diferenta?'),

  block('ro29', 'normal', 'Sincer? Uneori da, alteori nu.'),

  block('ro30', 'normal', 'Am lucrat cu mai multe sisteme de-a lungul celor 10 ani de experienta si pot spune ca diferenta principala e in predictibilitate. Implanturile premium au studii clinice pe 20-30 de ani care demonstreaza rata de succes. Cele mai accesibile au studii pe 5-10 ani \u2014 care tot arata rezultate bune, dar cu mai putina istorie.'),

  block('ro31', 'normal', 'Ce recomand eu: nu alege doar dupa pret. Intreaba-l pe medic ce sistem foloseste si de ce. Un implant pus corect, in osul potrivit, cu igiena corecta dupa \u2014 dureaza o viata, indiferent de brand.'),

  block('ro32', 'normal', 'Dar un implant pus gresit, chiar si cel mai scump, poate esua.'),

  // Section: Cat dureaza
  block('ro33', 'h2', 'Cat dureaza procedura de implant dentar?'),

  block('ro34', 'normal', 'Asta e a doua intrebare pe care o aud zilnic. Si raspunsul surprinde pe multi: procedura in sine \u2014 adica inserarea implantului in os \u2014 dureaza cam 30-45 de minute per implant.'),

  block('ro35', 'normal', 'Nu doare. Se face cu anestezie locala, aceeasi pe care o folosim la o plomba. Multi pacienti imi spun dupa ca s-au asteptat sa fie mult mai rau.'),

  block('ro36', 'normal', 'Ce dureaza mai mult e vindecarea. Osul are nevoie de 3-6 luni sa se integreze cu implantul (procesul se numeste osteointegrare). In aceasta perioada porti o lucrare provizorie \u2014 deci nu stai fara dinte.'),

  block('ro37', 'normal', 'Timeline-ul complet arata cam asa:'),

  richListItem('ro38', [{ text: 'Ziua 1:', bold: true }, { text: ' Consultatie + radiografie 3D + plan de tratament' }], 'number'),
  richListItem('ro39', [{ text: 'Ziua chirurgiei:', bold: true }, { text: ' Inserarea implantului (30-45 min)' }], 'number'),
  richListItem('ro40', [{ text: 'Luna 1-2:', bold: true }, { text: ' Controale periodice, vindecarea gingiei' }], 'number'),
  richListItem('ro41', [{ text: 'Luna 3-6:', bold: true }, { text: ' Osteointegrare (implantul se integreaza in os)' }], 'number'),
  richListItem('ro42', [{ text: 'Dupa vindecare:', bold: true }, { text: ' Amprenta digitala + montarea coroanei definitive' }], 'number'),

  block('ro43', 'normal', 'Total? Cam 4-6 luni de la inserare la zambetul final. Dar in tot acest timp ai dinte provizoriu si te duci la treaba normal.'),

  // Section: All-on-4
  block('ro44', 'h2', 'All-on-4 si All-on-6 \u2014 cand merita?'),

  block('ro45', 'normal', 'Daca ti-au spus ca ai nevoie de mai multe implanturi \u2014 sa zicem 6 sau mai multe pe o arcada \u2014 exista o alternativa mai eficienta si mai accesibila decat implanturile individuale.'),

  block('ro46', 'normal', 'Se numeste All-on-4 (sau All-on-6) si functioneaza asa: se plaseaza 4-6 implanturi strategic in maxilar, iar pe ele se fixeaza o proteza completa, fixa. Rezultatul? Dinti ficsi in 24 de ore, in unele cazuri chiar in aceeasi zi.'),

  block('ro47', 'normal', 'Avantajul major: pretul total e mai mic decat daca ai pune 8-10 implanturi individuale cu coroane separate. Si timpul de tratament e mult redus.'),

  block('ro48', 'normal', 'Pretul pentru All-on-4 porneste de la aproximativ 15.000 lei per arcada, dar variaza in functie de materialele alese si de complexitatea cazului.'),

  // Section: De ce DentCraft
  block('ro49', 'h2', 'De ce sa alegi DentCraft pentru implantul tau?'),

  block('ro50', 'normal', 'Nu o sa iti spun ca suntem "cei mai buni" \u2014 asta decide fiecare pacient in parte. Dar iti pot spune ce ne diferentiaza:'),

  richBlock('ro51', 'normal', [
    { text: 'Lucram cu ' },
    { text: 'echipa de 6 specialisti', link: { key: 'lnk2', href: '/echipa' } },
    { text: ', cu experienta combinata de peste 10 ani. Avem scanner intraoral si radiografie 3D in cabinet \u2014 nu te trimitem in alta parte. Comunicam in romana, engleza si maghiara.' },
  ]),

  block('ro52', 'normal', 'Si cel mai important: iti spunem pretul final inainte sa incepem. Multi pacienti din Satu Mare si din judetele vecine (Maramures, Bihor) aleg sa vina la noi tocmai pentru asta \u2014 transparenta.'),

  // Section: FAQ
  block('ro53', 'h2', 'Intrebari frecvente despre implanturile dentare'),

  richBlock('ro54', 'normal', [
    { text: 'Cat de mult doare un implant dentar?', bold: true },
  ]),
  block('ro55', 'normal', 'Mai putin decat te astepti. Procedura se face cu anestezie locala si dureaza sub o ora. Dupa, poti avea un disconfort usor 2-3 zile, controlabil cu ibuprofen. Majoritatea pacientilor spun ca a fost mai ok decat o extractie.'),

  richBlock('ro56', 'normal', [
    { text: 'Cat dureaza un implant dentar?', bold: true },
  ]),
  block('ro57', 'normal', 'Cu igiena corecta si controale anuale \u2014 o viata intreaga. Implanturile au rata de succes de peste 95% pe termen lung. Coroana de pe implant poate necesita inlocuire dupa 15-20 de ani, dar implantul in sine ramane.'),

  richBlock('ro58', 'normal', [
    { text: 'Se poate face implant imediat dupa extractie?', bold: true },
  ]),
  block('ro59', 'normal', 'In unele cazuri, da. Se numeste "implant imediat post-extractional" si scurteaza timpul total de tratament. Dar nu se aplica in toate situatiile \u2014 depinde de starea osului si de zona. Discutam asta la consultatie.'),

  richBlock('ro60', 'normal', [
    { text: 'Implantul dentar e decontat de asigurare?', bold: true },
  ]),
  block('ro61', 'normal', 'In Romania, implanturile dentare nu sunt decontate de Casa de Asigurari de Sanatate. Unele asigurari private pot acoperi partial costul \u2014 verifica cu asiguratorul tau. Noi oferim si posibilitatea de plata in rate.'),

  richBlock('ro62', 'normal', [
    { text: 'La ce varsta se pot pune implanturi?', bold: true },
  ]),
  block('ro63', 'normal', 'De la 18 ani in sus, cand osul si-a terminat cresterea. Nu exista limita superioara de varsta \u2014 am pus implanturi cu succes la pacienti de 75+ ani. Conteaza starea generala de sanatate, nu varsta in sine.'),

  // CTA
  richBlock('ro64', 'normal', [
    { text: 'Ai intrebari despre implantul dentar sau vrei o evaluare personalizata? Suna-ne la ' },
    { text: '0741 199 977', bold: true },
    { text: ' sau ' },
    { text: 'programeaza online', link: { key: 'lnk3', href: '/contact' } },
    { text: '. Consultatia si radiografia 3D sunt gratuite.' },
  ]),

  richBlock('ro65', 'normal', [
    { text: 'Ne vedem la ' },
    { text: 'DentCraft, pe Str. Barbu Stefanescu Delavrancea nr.3, Satu Mare', link: { key: 'lnk4', href: '/contact' } },
    { text: '.' },
  ]),
]

// ============================================
// CONTENT: ENGLISH
// ============================================

const contentEn: PortableTextBlock[] = [
  block('en01', 'normal', '"Doctor, how much does an implant cost?" It\'s a question I hear at least 3 times a day. And the honest answer is: it depends. But I\'m not saying that to dodge the question \u2014 it\'s because the price of a dental implant genuinely varies based on several factors that I\'ll walk you through below.'),

  block('en02', 'normal', 'I wrote this guide so you\'d have all the information before booking an appointment anywhere. No surprises, no hidden costs. That\'s how we do things at DentCraft.'),

  // Section: Why does the price vary
  block('en03', 'h2', 'Why Does the Price of a Dental Implant Vary?'),

  block('en04', 'normal', 'If you\'ve searched "dental implant Satu Mare price" on Google, you\'ve probably seen figures ranging from 2,000 to 7,000 lei (roughly 400 to 1,400 EUR). That\'s a big gap, I know. But it\'s not random.'),

  block('en05', 'normal', 'The price comes down to three things:'),

  richBlock('en06', 'normal', [
    { text: '1. The implant brand.', bold: true },
    { text: ' There are Korean, Israeli, German, and Swiss implants. A Straumann implant (Switzerland) is priced differently than a MegaGen or Osstem. That doesn\'t mean the more affordable ones are bad \u2014 but differences in materials, clinical studies, and warranty do exist.' },
  ]),

  richBlock('en07', 'normal', [
    { text: '2. The crown on the implant.', bold: true },
    { text: ' Many patients don\'t realize that the implant price and the crown price are two separate things. An implant without a crown is like a foundation without a house. The crown can be monolithic zirconia, layered ceramic, or porcelain-fused-to-metal \u2014 each at a different price point.' },
  ]),

  richBlock('en08', 'normal', [
    { text: '3. Additional procedures.', bold: true },
    { text: ' Sometimes the bone isn\'t thick enough and a bone graft (augmentation) is needed. Other times the gum tissue needs to be corrected. These procedures add to the total cost.' },
  ]),

  // Section: Estimated prices
  block('en09', 'h2', 'Estimated Dental Implant Prices at DentCraft Satu Mare (2026)'),

  block('en10', 'normal', 'Here\'s a realistic breakdown so you know what to expect:'),

  richListItem('en11', [{ text: 'Dental implant (without crown):', bold: true }, { text: ' 2,500 \u2013 4,500 lei (approx. 500 \u2013 900 EUR)' }]),
  richListItem('en12', [{ text: 'Crown on implant (zirconia):', bold: true }, { text: ' 1,500 \u2013 2,500 lei (approx. 300 \u2013 500 EUR)' }]),
  richListItem('en13', [{ text: 'Crown on implant (porcelain-fused-to-metal):', bold: true }, { text: ' 1,000 \u2013 1,800 lei (approx. 200 \u2013 360 EUR)' }]),
  richListItem('en14', [{ text: 'Bone graft (if needed):', bold: true }, { text: ' 800 \u2013 2,500 lei (approx. 160 \u2013 500 EUR)' }]),
  richListItem('en15', [{ text: 'Sinus lift (if needed):', bold: true }, { text: ' 1,500 \u2013 3,500 lei (approx. 300 \u2013 700 EUR)' }]),
  richListItem('en16', [{ text: 'Total complete implant (average):', bold: true }, { text: ' 4,000 \u2013 6,500 lei (approx. 800 \u2013 1,300 EUR)', bold: true }]),

  block('en17', 'normal', 'The prices above are estimates. Your final price is determined after a consultation and 3D X-ray \u2014 which is free of charge at our clinic.'),

  // Section: What's included
  block('en18', 'h2', 'What\'s Included in the Price of an Implant at DentCraft?'),

  block('en19', 'normal', 'I\'ve seen cases where patients paid less at another clinic, only to find out that every follow-up visit was billed separately. Or that the X-ray wasn\'t included. Or that anesthesia came at an extra cost.'),

  block('en20', 'normal', 'With us, the implant price includes:'),

  listItem('en21', 'Initial consultation and treatment plan'),
  listItem('en22', '3D X-ray (CBCT) \u2014 done in-house with our own scanner'),
  listItem('en23', 'The implant itself (titanium, biocompatible)'),
  listItem('en24', 'The abutment (the piece that connects the implant to the crown)'),
  listItem('en25', 'Post-operative check-ups throughout the entire healing period'),
  listItem('en26', 'Implant warranty'),

  block('en27', 'normal', 'The crown is paid separately, but you know the price upfront. No surprises.'),

  // Section: Cheap vs expensive
  block('en28', 'h2', 'Cheap vs. Expensive Dental Implant \u2014 Is the Difference Worth It?'),

  block('en29', 'normal', 'Honestly? Sometimes yes, sometimes no.'),

  block('en30', 'normal', 'I\'ve worked with multiple systems over my 10 years of experience and I can tell you the main difference comes down to predictability. Premium implants have clinical studies spanning 20-30 years that demonstrate their success rate. More affordable ones have studies covering 5-10 years \u2014 which still show good results, but with less long-term history.'),

  block('en31', 'normal', 'My recommendation: don\'t choose based on price alone. Ask your dentist which system they use and why. An implant placed correctly, in the right bone, with proper hygiene afterward \u2014 it lasts a lifetime, regardless of brand.'),

  block('en32', 'normal', 'But an implant placed incorrectly, even the most expensive one, can fail.'),

  // Section: How long does the procedure take
  block('en33', 'h2', 'How Long Does the Dental Implant Procedure Take?'),

  block('en34', 'normal', 'This is the second question I hear every day. And the answer surprises many people: the procedure itself \u2014 meaning the insertion of the implant into the bone \u2014 takes about 30-45 minutes per implant.'),

  block('en35', 'normal', 'It doesn\'t hurt. It\'s done under local anesthesia, the same kind we use for a filling. Many patients tell me afterward that they expected it to be much worse.'),

  block('en36', 'normal', 'What takes longer is the healing. The bone needs 3-6 months to fuse with the implant (a process called osseointegration). During this period, you wear a temporary restoration \u2014 so you\'re never walking around without a tooth.'),

  block('en37', 'normal', 'The complete timeline looks something like this:'),

  richListItem('en38', [{ text: 'Day 1:', bold: true }, { text: ' Consultation + 3D X-ray + treatment plan' }], 'number'),
  richListItem('en39', [{ text: 'Surgery day:', bold: true }, { text: ' Implant placement (30-45 min)' }], 'number'),
  richListItem('en40', [{ text: 'Month 1-2:', bold: true }, { text: ' Periodic check-ups, gum healing' }], 'number'),
  richListItem('en41', [{ text: 'Month 3-6:', bold: true }, { text: ' Osseointegration (the implant integrates with the bone)' }], 'number'),
  richListItem('en42', [{ text: 'After healing:', bold: true }, { text: ' Digital impression + placement of the final crown' }], 'number'),

  block('en43', 'normal', 'Total? About 4-6 months from placement to your final smile. But throughout this entire time, you have a temporary tooth and go about your life normally.'),

  // Section: All-on-4
  block('en44', 'h2', 'All-on-4 and All-on-6 \u2014 When Are They Worth It?'),

  block('en45', 'normal', 'If you\'ve been told you need multiple implants \u2014 let\'s say 6 or more on one arch \u2014 there\'s a more efficient and more affordable alternative than individual implants.'),

  block('en46', 'normal', 'It\'s called All-on-4 (or All-on-6) and it works like this: 4-6 implants are strategically placed in the jaw, and a complete, fixed prosthesis is attached to them. The result? Fixed teeth in 24 hours, in some cases even the same day.'),

  block('en47', 'normal', 'The major advantage: the total cost is lower than if you were to place 8-10 individual implants with separate crowns. And the treatment time is significantly shorter.'),

  block('en48', 'normal', 'The price for All-on-4 starts at approximately 15,000 lei (approx. 3,000 EUR) per arch, but varies depending on the materials chosen and the complexity of the case.'),

  // Section: Why choose DentCraft
  block('en49', 'h2', 'Why Choose DentCraft for Your Implant?'),

  block('en50', 'normal', 'I\'m not going to tell you we\'re "the best" \u2014 that\'s for each patient to decide. But I can tell you what sets us apart:'),

  block('en51', 'normal', 'We work as a team of 6 specialists, with a combined experience of over 10 years. We have an intraoral scanner and 3D X-ray right in the office \u2014 we don\'t send you somewhere else. We communicate in Romanian, English, and Hungarian.'),

  block('en52', 'normal', 'And most importantly: we tell you the final price before we start. Many patients from Satu Mare and the neighboring counties (Maramures, Bihor) choose to come to us precisely for this \u2014 transparency.'),

  // Section: FAQ
  block('en53', 'h2', 'Frequently Asked Questions About Dental Implants'),

  richBlock('en54', 'normal', [
    { text: 'How much does a dental implant hurt?', bold: true },
  ]),
  block('en55', 'normal', 'Less than you\'d expect. The procedure is done under local anesthesia and takes under an hour. Afterward, you may have mild discomfort for 2-3 days, manageable with ibuprofen. Most patients say it was easier than an extraction.'),

  richBlock('en56', 'normal', [
    { text: 'How long does a dental implant last?', bold: true },
  ]),
  block('en57', 'normal', 'With proper hygiene and annual check-ups \u2014 a lifetime. Implants have a success rate of over 95% long-term. The crown on the implant may need replacing after 15-20 years, but the implant itself stays.'),

  richBlock('en58', 'normal', [
    { text: 'Can an implant be placed immediately after extraction?', bold: true },
  ]),
  block('en59', 'normal', 'In some cases, yes. It\'s called an "immediate post-extraction implant" and it shortens the overall treatment time. But it doesn\'t apply in every situation \u2014 it depends on the condition of the bone and the location. We discuss this during the consultation.'),

  richBlock('en60', 'normal', [
    { text: 'Is a dental implant covered by insurance?', bold: true },
  ]),
  block('en61', 'normal', 'In Romania, dental implants are not covered by the national health insurance system. Some private insurance plans may partially cover the cost \u2014 check with your provider. We also offer installment payment options.'),

  richBlock('en62', 'normal', [
    { text: 'At what age can you get implants?', bold: true },
  ]),
  block('en63', 'normal', 'From age 18 and up, once the bone has finished growing. There\'s no upper age limit \u2014 I\'ve successfully placed implants in patients aged 75 and older. What matters is your overall health, not your age.'),

  // CTA
  block('en64', 'normal', 'Have questions about dental implants or want a personalized evaluation? Call us at 0741 199 977 or book online. The consultation and 3D X-ray are free.'),

  block('en65', 'normal', 'See you at DentCraft, Str. Barbu Stefanescu Delavrancea nr.3, Satu Mare.'),
]

// ============================================
// CONTENT: HUNGARIAN
// ============================================

const contentHu: PortableTextBlock[] = [
  block('hu01', 'normal', '\u201eDoktor \u00far, mennyibe ker\u00fcl egy implant\u00e1tum?\u201d Ez az a k\u00e9rd\u00e9s, amit naponta legal\u00e1bb h\u00e1romszor hallok. \u00c9s az \u0151szinte v\u00e1lasz: att\u00f3l f\u00fcgg. De nem az\u00e9rt mondom ezt, hogy kit\u00e9rjek a v\u00e1lasz el\u0151l \u2014 hanem az\u00e9rt, mert egy fogimplant\u00e1tum \u00e1ra val\u00f3ban t\u00f6bb t\u00e9nyez\u0151t\u0151l f\u00fcgg, amelyeket al\u00e1bb r\u00e9szletesen elmagyar\u00e1zok.'),

  block('hu02', 'normal', 'Az\u00e9rt \u00edrtam ezt az \u00fatmutat\u00f3t, hogy minden inform\u00e1ci\u00f3 a rendelkez\u00e9sedre \u00e1lljon, miel\u0151tt b\u00e1rhov\u00e1 bejelentkezel. Meglep\u00e9t\u00e9sek n\u00e9lk\u00fcl, rejtett k\u00f6lts\u00e9gek n\u00e9lk\u00fcl. \u00cdgy dolgozunk mi a DentCraft-n\u00e1l.'),

  // Section: Miert valtozo
  block('hu03', 'h2', 'Mi\u00e9rt v\u00e1ltoz\u00f3 egy fogimplant\u00e1tum \u00e1ra?'),

  block('hu04', 'normal', 'Ha r\u00e1kerest\u00e9l a Google-ben, hogy \u201efogimplant\u00e1tum Szatm\u00e1rn\u00e9meti \u00e1r\u201d, val\u00f3sz\u00edn\u0171leg 2.000 \u00e9s 7.000 lej k\u00f6z\u00f6tti \u00f6sszegeket tal\u00e1lt\u00e1l. A k\u00fcl\u00f6nbs\u00e9g nagy, tudom. De nem v\u00e9letlenszer\u0171.'),

  block('hu05', 'normal', 'Az \u00e1r h\u00e1rom dologt\u00f3l f\u00fcgg:'),

  richBlock('hu06', 'normal', [
    { text: '1. Az implant\u00e1tum m\u00e1rk\u00e1ja.', bold: true },
    { text: ' L\u00e9teznek koreai, izraeli, n\u00e9met, sv\u00e1jci implant\u00e1tumok. Egy Straumann (Sv\u00e1jc) implant\u00e1tum \u00e1ra m\u00e1s, mint egy MegaGen vagy Osstem. Ez nem jelenti azt, hogy a megfizethető\u0062\u0062ek rosszak lenn\u00e9nek \u2014 de az anyagminős\u00e9gben, a klinikai vizsg\u00e1latokban \u00e9s a garanci\u00e1ban van k\u00fcl\u00f6nbs\u00e9g.' },
  ]),

  richBlock('hu07', 'normal', [
    { text: '2. Az implant\u00e1tumra ker\u00fcl\u0151 korona.', bold: true },
    { text: ' Sok p\u00e1ciens nem tudja, hogy az implant\u00e1tum \u00e1ra \u00e9s a korona \u00e1ra k\u00e9t k\u00fcl\u00f6n dolog. Egy implant\u00e1tum korona n\u00e9lk\u00fcl olyan, mint egy alap h\u00e1z n\u00e9lk\u00fcl. A korona lehet monolitikus cirk\u00f3niumból, r\u00e9tegezett ker\u00e1mi\u00e1b\u00f3l vagy f\u00e9mker\u00e1mi\u00e1ból \u2014 mindegyiknek m\u00e1s az \u00e1ra.' },
  ]),

  richBlock('hu08', 'normal', [
    { text: '3. A kieg\u00e9sz\u00edt\u0151 beavatkoz\u00e1sok.', bold: true },
    { text: ' N\u00e9ha a csont nem el\u00e9g vastag, \u00e9s csontpótl\u00e1st (augment\u00e1ci\u00f3t) kell v\u00e9gezni. M\u00e1skor az \u00ednyt kell korrig\u00e1lni. Ezek a beavatkoz\u00e1sok hozz\u00e1ad\u00f3dnak az \u00f6sszk\u00f6lts\u00e9ghez.' },
  ]),

  // Section: Tajékoztato arak
  block('hu09', 'h2', 'T\u00e1j\u00e9koztat\u00f3 \u00e1rak fogimplant\u00e1tumra a DentCraft Szatm\u00e1rn\u00e9metiben (2026)'),

  block('hu10', 'normal', '\u00cdme egy re\u00e1lis \u00e1ttekint\u00e9s, hogy tudd, mire sz\u00e1m\u00edthatsz:'),

  richListItem('hu11', [{ text: 'Fogimplant\u00e1tum (korona n\u00e9lk\u00fcl):', bold: true }, { text: ' 2.500 \u2013 4.500 lej' }]),
  richListItem('hu12', [{ text: 'Korona implant\u00e1tumra (cirk\u00f3nium):', bold: true }, { text: ' 1.500 \u2013 2.500 lej' }]),
  richListItem('hu13', [{ text: 'Korona implant\u00e1tumra (f\u00e9mker\u00e1mia):', bold: true }, { text: ' 1.000 \u2013 1.800 lej' }]),
  richListItem('hu14', [{ text: 'Csontpótl\u00e1s (ha sz\u00fcks\u00e9ges):', bold: true }, { text: ' 800 \u2013 2.500 lej' }]),
  richListItem('hu15', [{ text: 'Arc\u00fcreg\u00e9mel\u00e9s (ha sz\u00fcks\u00e9ges):', bold: true }, { text: ' 1.500 \u2013 3.500 lej' }]),
  richListItem('hu16', [{ text: 'Teljes implant\u00e1tum \u00f6sszesen (\u00e1tlag):', bold: true }, { text: ' 4.000 \u2013 6.500 lej', bold: true }]),

  block('hu17', 'normal', 'A fenti \u00e1rak t\u00e1j\u00e9koztat\u00f3 jelleg\u0171ek. A v\u00e9gleges \u00e1rat a konzult\u00e1ci\u00f3 \u00e9s a 3D r\u00f6ntgen ut\u00e1n \u00e1llap\u00edtjuk meg \u2014 amely n\u00e1lunk ingyenes.'),

  // Section: Mit tartalmaz
  block('hu18', 'h2', 'Mit tartalmaz egy implant\u00e1tum \u00e1ra a DentCraft-n\u00e1l?'),

  block('hu19', 'normal', 'L\u00e1ttam olyan eseteket, amikor a p\u00e1ciensek kevesebbet fizettek egy m\u00e1sik rendel\u0151ben, de azt\u00e1n kider\u00fclt, hogy minden kontrollvizsg\u00e1latot k\u00fcl\u00f6n sz\u00e1ml\u00e1ztak. Vagy hogy a r\u00f6ntgen nem volt benne az \u00e1rban. Vagy hogy az \u00e9rz\u00e9stelen\u00edt\u00e9snek k\u00fcl\u00f6n k\u00f6lts\u00e9ge volt.'),

  block('hu20', 'normal', 'N\u00e1lunk az implant\u00e1tum \u00e1ra tartalmazza:'),

  listItem('hu21', 'A kezdeti konzult\u00e1ci\u00f3t \u00e9s a kezel\u00e9si tervet'),
  listItem('hu22', 'A 3D r\u00f6ntgent (CBCT) \u2014 saj\u00e1t szkenner\u00fcnkkel k\u00e9sz\u00edtj\u00fck a rendel\u0151ben'),
  listItem('hu23', 'Mag\u00e1t az implant\u00e1tumot (tit\u00e1n, biokompatibilis)'),
  listItem('hu24', 'A fel\u00e9p\u00edtm\u00e9nyt (az az elem, amely \u00f6sszek\u00f6ti az implant\u00e1tumot a koron\u00e1val)'),
  listItem('hu25', 'A m\u0171t\u00e9t ut\u00e1ni kontrollvizsg\u00e1latokat a teljes gy\u00f3gyul\u00e1si időszakra'),
  listItem('hu26', 'Az implant\u00e1tumra vonatkoz\u00f3 garanci\u00e1t'),

  block('hu27', 'normal', 'A koron\u00e1t k\u00fcl\u00f6n kell fizetni, de az \u00e1rat el\u0151re tudod. Meglep\u00e9t\u00e9sek n\u00e9lk\u00fcl.'),

  // Section: Olcso vs draga
  block('hu28', 'h2', 'Olcs\u00f3 vs. dr\u00e1ga fogimplant\u00e1tum \u2014 meg\u00e9ri a k\u00fcl\u00f6nbs\u00e9g?'),

  block('hu29', 'normal', '\u0150szint\u00e9n? N\u00e9ha igen, n\u00e9ha nem.'),

  block('hu30', 'normal', 'A t\u00f6bb mint 10 \u00e9ves tapasztalatom sor\u00e1n t\u00f6bb rendszerrel is dolgoztam, \u00e9s azt mondhatom, hogy a f\u0151 k\u00fcl\u00f6nbs\u00e9g a kisz\u00e1m\u00edthat\u00f3s\u00e1gban rejlik. A pr\u00e9mium implant\u00e1tumok m\u00f6g\u00f6tt 20-30 \u00e9ves klinikai vizsg\u00e1latok \u00e1llnak, amelyek bizony\u00edtj\u00e1k a sikeress\u00e9gi ar\u00e1nyt. A megfizethető\u0062\u0062 implant\u00e1tumok 5-10 \u00e9ves vizsg\u00e1latokkal rendelkeznek \u2014 amelyek szint\u00e9n j\u00f3 eredm\u00e9nyeket mutatnak, de kevesebb m\u00falttal rendelkeznek.'),

  block('hu31', 'normal', 'Az \u00e9n tan\u00e1csom: ne csak az \u00e1r alapj\u00e1n v\u00e1lassz. K\u00e9rdezd meg az orvosodat, milyen rendszert haszn\u00e1l \u00e9s mi\u00e9rt. Egy helyesen be\u00fcltetett implant\u00e1tum, megfelel\u0151 csontba, helyes ut\u00f3gondoz\u00e1ssal \u2014 egy \u00e9leten \u00e1t tart, m\u00e1rk\u00e1t\u00f3l f\u00fcggetlen\u00fcl.'),

  block('hu32', 'normal', 'De egy rosszul be\u00fcltetett implant\u00e1tum, m\u00e9g ha a legdr\u00e1g\u00e1bb is, kudarcot vallhat.'),

  // Section: Mennyi ideig tart
  block('hu33', 'h2', 'Mennyi ideig tart a fogimplant\u00e1ci\u00f3?'),

  block('hu34', 'normal', 'Ez a m\u00e1sodik k\u00e9rd\u00e9s, amit naponta hallok. \u00c9s a v\u00e1lasz sokakat meglep: maga a beavatkoz\u00e1s \u2014 vagyis az implant\u00e1tum csontba val\u00f3 be\u00fcltet\u00e9se \u2014 k\u00f6r\u00fclbel\u00fcl 30-45 percet vesz ig\u00e9nybe implant\u00e1tumonk\u00e9nt.'),

  block('hu35', 'normal', 'Nem f\u00e1j. Helyi \u00e9rz\u00e9stelen\u00edt\u00e9ssel v\u00e9gezz\u00fck, ugyanazzal, amit egy t\u00f6m\u00e9s eset\u00e9n is haszn\u00e1lunk. Sok p\u00e1ciens mondja ut\u00e1na, hogy sokkal rosszabbra sz\u00e1m\u00edtott.'),

  block('hu36', 'normal', 'Ami t\u00f6bb időt vesz ig\u00e9nybe, az a gy\u00f3gyul\u00e1s. A csontnak 3-6 h\u00f3napra van sz\u00fcks\u00e9ge, hogy \u00f6sszen\u0151j\u00f6n az implant\u00e1tummal (ezt a folyamatot osszeointegr\u00e1ci\u00f3-nak h\u00edvjuk). Ez idő alatt ideiglenes p\u00f3tl\u00e1st viselsz \u2014 teh\u00e1t nem maradsz fog n\u00e9lk\u00fcl.'),

  block('hu37', 'normal', 'A teljes időbeoszt\u00e1s \u00edgy n\u00e9z ki:'),

  richListItem('hu38', [{ text: '1. nap:', bold: true }, { text: ' Konzult\u00e1ci\u00f3 + 3D r\u00f6ntgen + kezel\u00e9si terv' }], 'number'),
  richListItem('hu39', [{ text: 'A m\u0171t\u00e9t napja:', bold: true }, { text: ' Az implant\u00e1tum be\u00fcltet\u00e9se (30-45 perc)' }], 'number'),
  richListItem('hu40', [{ text: '1-2. h\u00f3nap:', bold: true }, { text: ' Rendszeres kontrollvizsg\u00e1latok, az \u00edny gy\u00f3gyul\u00e1sa' }], 'number'),
  richListItem('hu41', [{ text: '3-6. h\u00f3nap:', bold: true }, { text: ' Osszeointegr\u00e1ci\u00f3 (az implant\u00e1tum be\u00e9p\u00fcl a csontba)' }], 'number'),
  richListItem('hu42', [{ text: 'Gy\u00f3gyul\u00e1s ut\u00e1n:', bold: true }, { text: ' Digit\u00e1lis lenyomatv\u00e9tel + a v\u00e9gleges korona felhelyez\u00e9se' }], 'number'),

  block('hu43', 'normal', '\u00d6sszesen? K\u00f6r\u00fclbel\u00fcl 4-6 h\u00f3nap a be\u00fcltet\u00e9st\u0151l a v\u00e9gs\u0151 mosolyig. De ez idő alatt v\u00e9gig ideiglenes fogad van, \u00e9s norm\u00e1lisan v\u00e9gezheted a dolgaidat.'),

  // Section: All-on-4
  block('hu44', 'h2', 'All-on-4 \u00e9s All-on-6 \u2014 mikor \u00e9ri meg?'),

  block('hu45', 'normal', 'Ha azt mondt\u00e1k, hogy t\u00f6bb implant\u00e1tumra van sz\u00fcks\u00e9ged \u2014 mondjuk 6-ra vagy t\u00f6bbre egy fog\u00edven \u2014 l\u00e9tezik egy hat\u00e9konyabb \u00e9s megfizethető\u0062\u0062 alternat\u00edva az egyedi implant\u00e1tumokhoz k\u00e9pest.'),

  block('hu46', 'normal', '\u00dagy h\u00edvj\u00e1k, All-on-4 (vagy All-on-6), \u00e9s a k\u00f6vetkez\u0151k\u00e9ppen m\u0171k\u00f6dik: 4-6 implant\u00e1tumot strat\u00e9giailag helyeznek el az \u00e1llcsontban, amelyekre egy teljes, fix fogsor ker\u00fcl. Az eredm\u00e9ny? Fix fogak 24 \u00f3r\u00e1n bel\u00fcl, egyes esetekben ak\u00e1r ugyanazon a napon.'),

  block('hu47', 'normal', 'A f\u0151 el\u0151ny: a teljes k\u00f6lts\u00e9g alacsonyabb, mintha 8-10 egyedi implant\u00e1tumot helyeztetn\u00e9l be k\u00fcl\u00f6n koron\u00e1kkal. A kezel\u00e9si idő is jelent\u0151sen r\u00f6videbb.'),

  block('hu48', 'normal', 'Az All-on-4 \u00e1ra k\u00f6r\u00fclbel\u00fcl 15.000 lejt\u0151l indul fog\u00edvenk\u00e9nt, de a v\u00e1lasztott anyagokt\u00f3l \u00e9s az eset \u00f6sszetetts\u00e9g\u00e9t\u0151l f\u00fcgg\u0151en v\u00e1ltozik.'),

  // Section: Miert DentCraft
  block('hu49', 'h2', 'Mi\u00e9rt v\u00e1laszd a DentCraft-ot az implant\u00e1tumodhoz?'),

  block('hu50', 'normal', 'Nem fogom azt mondani, hogy \u201emi vagyunk a legjobbak\u201d \u2014 ezt minden p\u00e1ciens maga d\u00f6nti el. De el tudom mondani, mi k\u00fcl\u00f6nb\u00f6ztet meg minket:'),

  block('hu51', 'normal', '6 szak\u00e9orvosb\u00f3l \u00e1ll\u00f3 csapattal dolgozunk, \u00f6sszesen t\u00f6bb mint 10 \u00e9v tapasztalattal. Rendelőnkben intraor\u00e1lis szkennerrel \u00e9s 3D r\u00f6ntgennel rendelkez\u00fcnk \u2014 nem k\u00fcld\u00fcnk m\u00e1shov\u00e1. Kommunik\u00e1lunk rom\u00e1nul, angolul \u00e9s magyarul.'),

  block('hu52', 'normal', '\u00c9s ami a legfontosabb: a v\u00e9gleges \u00e1rat a kezel\u00e9s megkezd\u00e9se el\u0151tt k\u00f6z\u00f6lj\u00fck. Sok p\u00e1ciens Szatm\u00e1rn\u00e9metiből \u00e9s a szomsz\u00e9dos megy\u00e9kből (M\u00e1ramaros, Bihar) \u00e9ppen ez\u00e9rt v\u00e1laszt minket \u2014 az \u00e1tl\u00e1that\u00f3s\u00e1g\u00e9rt.'),

  // Section: FAQ
  block('hu53', 'h2', 'Gyakran ism\u00e9telt k\u00e9rd\u00e9sek a fogimplant\u00e1tumokr\u00f3l'),

  richBlock('hu54', 'normal', [
    { text: 'Mennyire f\u00e1jdalmas egy fogimplant\u00e1tum?', bold: true },
  ]),
  block('hu55', 'normal', 'Kev\u00e9sb\u00e9, mint gondoln\u00e1d. A beavatkoz\u00e1s helyi \u00e9rz\u00e9stelen\u00edt\u00e9ssel t\u00f6rt\u00e9nik, \u00e9s kevesebb mint egy \u00f3r\u00e1t vesz ig\u00e9nybe. Ut\u00e1na 2-3 napig enyhe kellemetlen\u00e9sget \u00e9rezhetsz, amely ibuprofennel csillap\u00edthat\u00f3. A legt\u00f6bb p\u00e1ciens azt mondja, hogy jobban viselte, mint egy fogh\u00faz\u00e1st.'),

  richBlock('hu56', 'normal', [
    { text: 'Meddig tart egy fogimplant\u00e1tum?', bold: true },
  ]),
  block('hu57', 'normal', 'Megfelel\u0151 sz\u00e1jhigi\u00e9ni\u00e1val \u00e9s \u00e9ves kontrollvizsg\u00e1latokkal \u2014 egy eg\u00e9sz \u00e9leten \u00e1t. Az implant\u00e1tumok hossz\u00fa t\u00e1v\u00fa sikeress\u00e9gi ar\u00e1nya meghaladja a 95%-ot. Az implant\u00e1tumon l\u00e9v\u0151 koron\u00e1t 15-20 \u00e9v ut\u00e1n esetleg cser\u00e9lni kell, de maga az implant\u00e1tum megmarad.'),

  richBlock('hu58', 'normal', [
    { text: 'Lehet implant\u00e1tumot be\u00fcltetni k\u00f6zvetlen\u00fcl fogh\u00faz\u00e1s ut\u00e1n?', bold: true },
  ]),
  block('hu59', 'normal', 'Bizonyos esetekben igen. Ezt \u201eazonnali posztextrakci\u00f3s implant\u00e1ci\u00f3\u201d-nak nevezik, \u00e9s ler\u00f6vid\u00edti a teljes kezel\u00e9si időt. De nem alkalmazhat\u00f3 minden helyzetben \u2014 a csont \u00e1llapot\u00e1t\u00f3l \u00e9s az \u00e9rintett ter\u00fclett\u0151l f\u00fcgg. Ezt a konzult\u00e1ci\u00f3n megbesz\u00e9lj\u00fck.'),

  richBlock('hu60', 'normal', [
    { text: 'A fogimplant\u00e1tumot fedezi a biztos\u00edt\u00e1s?', bold: true },
  ]),
  block('hu61', 'normal', 'Rom\u00e1ni\u00e1ban a fogimplant\u00e1tumokat az \u00e1llami eg\u00e9szs\u00e9gbiztos\u00edt\u00e1s nem fedezi. Egyes mag\u00e1nbiztos\u00edt\u00e1sok r\u00e9szben fedezhetik a k\u00f6lts\u00e9get \u2014 ellen\u0151rizd a biztos\u00edt\u00f3ddal. N\u00e1lunk r\u00e9szletfizet\u00e9si lehetős\u00e9g is van.'),

  richBlock('hu62', 'normal', [
    { text: 'H\u00e1ny \u00e9ves kort\u00f3l lehet implant\u00e1tumot be\u00fcltetni?', bold: true },
  ]),
  block('hu63', 'normal', '18 \u00e9ves kort\u00f3l, amikor a csont befejezte a n\u00f6veked\u00e9st. Fels\u0151 korhat\u00e1r nincs \u2014 sikeresen \u00fcltetett\u00fcnk be implant\u00e1tumot 75 \u00e9v feletti p\u00e1cienseknek is. Az \u00e1ltal\u00e1nos eg\u00e9szs\u00e9gi \u00e1llapot sz\u00e1m\u00edt, nem az \u00e9letkor \u00f6nmag\u00e1ban.'),

  // CTA
  block('hu64', 'normal', 'K\u00e9rd\u00e9sed van a fogimplant\u00e1tumr\u00f3l, vagy szem\u00e9lyre szabott \u00e9rt\u00e9kel\u00e9st szeretn\u00e9l? H\u00edvj minket a 0741 199 977 sz\u00e1mon, vagy foglalj online időpontot. A konzult\u00e1ci\u00f3 \u00e9s a 3D r\u00f6ntgen ingyenes.'),

  block('hu65', 'normal', 'V\u00e1runk a DentCraft-ban, Str. Barbu Stefanescu Delavrancea nr.3, Satu Mare.'),
]

// ============================================
// POST DATA
// ============================================

const categoryRo = { _id: 'cat-implantologie', slug: 'implantologie', title: 'Implantologie' }
const categoryEn = { _id: 'cat-implantologie', slug: 'implantologie', title: 'Implantology' }
const categoryHu = { _id: 'cat-implantologie', slug: 'implantologie', title: 'Implantologia' }

const author = {
  _id: 'author-petric',
  name: 'Dr. Razvan Petric',
  photo: {
    asset: {
      _id: 'author-photo-petric',
      url: 'https://drpetric.ro/wp-content/uploads/2024/11/stomatolog-satu-mare.png',
    },
  },
  slug: 'razvan-petric',
  bio: 'Medic stomatolog principal al clinicii DentCraft, cu peste 10 ani de experienta. Specializat in implantologie si estetica dentara.',
  jobTitle: 'Medic Stomatolog Principal',
}

export const fallbackBlogPosts: Record<string, FallbackBlogPost[]> = {
  ro: [
    {
      _id: 'blog-implant-dentar-satu-mare',
      title: 'Cat costa un implant dentar in Satu Mare? Ghid complet preturi 2026',
      slug: 'cat-costa-implant-dentar-satu-mare',
      excerpt: '"Doctor, cat ma costa un implant?" E intrebarea pe care o aud de cel putin 3 ori pe zi. Am scris acest ghid ca sa ai toate informatiile inainte sa te programezi undeva. Fara surprize, fara costuri ascunse.',
      content: contentRo,
      coverImage: {
        alt: 'Medic dentist prezentand un model de implant dentar intr-un cabinet stomatologic modern - DentCraft Satu Mare',
        asset: { _id: 'local-cover-implant', url: '/images/blog/implant-dentar-satu-mare-cover.webp' },
      },
      category: categoryRo,
      author,
      publishedAt: '2026-02-24T10:00:00.000Z',
      featured: true,
      seo: {
        metaTitle: 'Implant Dentar Satu Mare Pret 2026 | DentCraft',
        metaDescription: 'Cat costa un implant dentar in Satu Mare? Preturi de la 2.500 lei, factori care influenteaza costul si ce include. Consultatie gratuita DentCraft.',
        ogImage: null,
        noIndex: false,
      },
    },
  ],
  en: [
    {
      _id: 'blog-implant-dentar-satu-mare',
      title: 'How Much Does a Dental Implant Cost in Satu Mare? Complete 2026 Price Guide',
      slug: 'cat-costa-implant-dentar-satu-mare',
      excerpt: '"Doctor, how much does an implant cost?" It\'s a question I hear at least 3 times a day. I wrote this guide so you\'d have all the information before booking an appointment anywhere. No surprises, no hidden costs.',
      content: contentEn,
      coverImage: {
        alt: 'Dentist presenting a dental implant model in a modern dental office - DentCraft Satu Mare',
        asset: { _id: 'local-cover-implant', url: '/images/blog/implant-dentar-satu-mare-cover.webp' },
      },
      category: categoryEn,
      author,
      publishedAt: '2026-02-24T10:00:00.000Z',
      featured: true,
      seo: {
        metaTitle: 'Dental Implant Satu Mare Price 2026 | DentCraft',
        metaDescription: 'How much does a dental implant cost in Satu Mare? Prices from 2,500 lei, factors that influence cost and what\'s included. Free consultation at DentCraft.',
        ogImage: null,
        noIndex: false,
      },
    },
  ],
  hu: [
    {
      _id: 'blog-implant-dentar-satu-mare',
      title: 'Mennyibe ker\u00fcl egy fogimplant\u00e1tum Szatm\u00e1rn\u00e9metiben? Teljes \u00e1rkalauz 2026',
      slug: 'cat-costa-implant-dentar-satu-mare',
      excerpt: '\u201eDoktor \u00far, mennyibe ker\u00fcl egy implant\u00e1tum?\u201d Ez az a k\u00e9rd\u00e9s, amit naponta legal\u00e1bb h\u00e1romszor hallok. Az\u00e9rt \u00edrtam ezt az \u00fatmutat\u00f3t, hogy minden inform\u00e1ci\u00f3 a rendelkez\u00e9sedre \u00e1lljon. Meglep\u00e9t\u00e9sek n\u00e9lk\u00fcl, rejtett k\u00f6lts\u00e9gek n\u00e9lk\u00fcl.',
      content: contentHu,
      coverImage: {
        alt: 'Fogorvos bemutat egy fogimplantatum modelljét egy modern rendelőben - DentCraft Szatmárnémeti',
        asset: { _id: 'local-cover-implant', url: '/images/blog/implant-dentar-satu-mare-cover.webp' },
      },
      category: categoryHu,
      author,
      publishedAt: '2026-02-24T10:00:00.000Z',
      featured: true,
      seo: {
        metaTitle: 'Fogimplant\u00e1tum Szatm\u00e1rn\u00e9meti \u00c1r 2026 | DentCraft',
        metaDescription: 'Mennyibe ker\u00fcl egy fogimplant\u00e1tum Szatm\u00e1rn\u00e9metiben? \u00c1rak 2.500 lejt\u0151l, k\u00f6lts\u00e9get befoly\u00e1sol\u00f3 t\u00e9nyez\u0151k \u00e9s mit tartalmaz. Ingyenes konzult\u00e1ci\u00f3 a DentCraft-n\u00e1l.',
        ogImage: null,
        noIndex: false,
      },
    },
  ],
}

// ============================================
// GETTER FUNCTIONS
// ============================================

export function getFallbackBlogPosts(
  locale: string,
  options?: { limit?: number; offset?: number; categorySlug?: string }
): FallbackBlogPost[] {
  const { limit = 10, offset = 0, categorySlug } = options || {}
  let posts = fallbackBlogPosts[locale] ?? fallbackBlogPosts['ro'] ?? []

  if (categorySlug) {
    posts = posts.filter((p) => p.category?.slug === categorySlug)
  }

  return posts.slice(offset, offset + limit)
}

export function getFallbackBlogPostBySlug(
  slug: string,
  locale: string
): FallbackBlogPost | null {
  const posts = fallbackBlogPosts[locale] ?? fallbackBlogPosts['ro'] ?? []
  return posts.find((p) => p.slug === slug) ?? null
}

export function getFallbackBlogCategories(locale: string): FallbackBlogCategory[] {
  return fallbackBlogCategories[locale] ?? fallbackBlogCategories['ro'] ?? []
}

export function getFallbackBlogPostSlugs(): Array<{ slug: string }> {
  // Return unique slugs across all locales
  const slugSet = new Set<string>()
  for (const posts of Object.values(fallbackBlogPosts)) {
    for (const post of posts) {
      slugSet.add(post.slug)
    }
  }
  return Array.from(slugSet).map((slug) => ({ slug }))
}

export function getFallbackBlogPostsCount(categorySlug?: string): number {
  // All locales have same posts, use ro as reference
  const posts = fallbackBlogPosts['ro'] ?? []
  if (categorySlug) {
    return posts.filter((p) => p.category?.slug === categorySlug).length
  }
  return posts.length
}
