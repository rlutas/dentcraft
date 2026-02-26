/**
 * Hardcoded legal page content for DentCraft
 *
 * Since Sanity CMS doesn't have legal page content, we serve
 * static content in all 3 locales (ro, en, hu).
 *
 * Company: DentCraft
 * Address: Str. Barbu Stefanescu Delavrancea nr.3, Satu Mare, Romania
 * Email: dentcraftsm@gmail.com
 * Phone: 0741 199 977
 */

export type LegalPageId = 'privacy' | 'cookies' | 'terms'

export type LegalPageData = {
  id: LegalPageId
  title: string
  lastUpdated: string
  content: string // HTML content
}

type LegalContent = Record<string, Record<LegalPageId, LegalPageData>>

/**
 * Map URL slugs (all locales) to internal page IDs
 */
export const SLUG_TO_PAGE_ID: Record<string, LegalPageId> = {
  'politica-confidentialitate': 'privacy',
  'privacy-policy': 'privacy',
  'adatvedelmi-iranyelvek': 'privacy',
  'politica-cookies': 'cookies',
  'cookie-policy': 'cookies',
  'sutik-szabalyzata': 'cookies',
  'termeni-conditii': 'terms',
  'terms-conditions': 'terms',
  'felhasznalasi-feltetelek': 'terms',
}

/**
 * Map page IDs to the canonical (Romanian) path for SEO
 */
export const PAGE_ID_TO_PATH: Record<LegalPageId, string> = {
  privacy: '/politica-confidentialitate',
  cookies: '/politica-cookies',
  terms: '/termeni-conditii',
}

export const legalContent: LegalContent = {
  // =============================================
  // ROMANIAN
  // =============================================
  ro: {
    privacy: {
      id: 'privacy',
      title: 'Politica de Confidentialitate',
      lastUpdated: '2026-02-26',
      content: `
<h2>1. Introducere</h2>
<p>DentCraft SRL, cu sediul in Str. Barbu Stefanescu Delavrancea nr.3, Satu Mare, Romania (denumita in continuare "Clinica", "noi"), se angajeaza sa protejeze confidentialitatea datelor dumneavoastra personale in conformitate cu Regulamentul General privind Protectia Datelor (GDPR - Regulamentul UE 2016/679) si legislatia nationala in vigoare.</p>
<p>Aceasta politica de confidentialitate descrie modul in care colectam, utilizam, stocam si protejam datele dumneavoastra personale atunci cand utilizati site-ul nostru web (www.dentcraft.ro) sau beneficiati de serviciile noastre stomatologice.</p>

<h2>2. Operator de date</h2>
<p><strong>DentCraft SRL</strong></p>
<ul>
<li>Adresa: Str. Barbu Stefanescu Delavrancea nr.3, Satu Mare, Romania</li>
<li>Email: dentcraftsm@gmail.com</li>
<li>Telefon: 0741 199 977</li>
</ul>

<h2>3. Datele personale colectate</h2>
<p>Colectam urmatoarele categorii de date personale:</p>
<h3>3.1 Date furnizate direct de dumneavoastra</h3>
<ul>
<li><strong>Date de identificare:</strong> nume, prenume, data nasterii</li>
<li><strong>Date de contact:</strong> adresa de email, numar de telefon, adresa postala</li>
<li><strong>Date medicale:</strong> istoric medical, diagnostic stomatologic, plan de tratament, radiografii dentare, fotografii intra-orale</li>
<li><strong>Date financiare:</strong> informatii necesare facturarii serviciilor</li>
</ul>
<h3>3.2 Date colectate automat</h3>
<ul>
<li><strong>Date tehnice:</strong> adresa IP, tipul browserului, sistemul de operare, rezolutia ecranului</li>
<li><strong>Date de utilizare:</strong> paginile vizitate, durata vizitei, sursa traficului</li>
<li><strong>Cookie-uri:</strong> conform Politicii noastre de Cookie-uri</li>
</ul>

<h2>4. Scopurile prelucrarii datelor</h2>
<p>Prelucram datele dumneavoastra personale in urmatoarele scopuri:</p>
<ul>
<li><strong>Furnizarea serviciilor medicale:</strong> programarea consultatiilor, efectuarea tratamentelor stomatologice, gestionarea dosarului medical</li>
<li><strong>Comunicarea:</strong> raspunsul la intrebarile dumneavoastra, trimiterea confirmarilor de programare, notificari privind tratamentul</li>
<li><strong>Obligatii legale:</strong> respectarea legislatiei privind documentatia medicala, obligatii fiscale si contabile</li>
<li><strong>Imbunatatirea serviciilor:</strong> analiza anonimizata a utilizarii site-ului, optimizarea experientei utilizatorului</li>
<li><strong>Marketing (cu consimtamant):</strong> trimiterea de oferte promotionale, newslettere</li>
</ul>

<h2>5. Temeiurile juridice ale prelucrarii</h2>
<ul>
<li><strong>Executarea contractului:</strong> pentru furnizarea serviciilor medicale solicitate</li>
<li><strong>Consimtamantul:</strong> pentru activitati de marketing si cookie-uri non-esentiale</li>
<li><strong>Obligatia legala:</strong> pentru respectarea legislatiei medicale si fiscale</li>
<li><strong>Interesul legitim:</strong> pentru imbunatatirea serviciilor si securitatea site-ului</li>
</ul>

<h2>6. Durata stocarii datelor</h2>
<ul>
<li><strong>Date medicale:</strong> conform legislatiei in vigoare privind documentatia medicala (minim 10 ani de la ultimul act medical)</li>
<li><strong>Date de facturare:</strong> 10 ani conform legislatiei fiscale</li>
<li><strong>Date de marketing:</strong> pana la retragerea consimtamantului</li>
<li><strong>Date de utilizare site:</strong> 26 luni de la colectare</li>
</ul>

<h2>7. Partajarea datelor</h2>
<p>Nu vindem datele dumneavoastra personale. Putem partaja datele cu:</p>
<ul>
<li><strong>Laboratoare dentare:</strong> informatii tehnice necesare confectionarii lucrarilor protetice</li>
<li><strong>Furnizori de servicii IT:</strong> hosting, mentenanta site, servicii email (cu acorduri de prelucrare a datelor)</li>
<li><strong>Autoritati publice:</strong> cand legea impune acest lucru</li>
<li><strong>Google Analytics:</strong> date anonimizate despre utilizarea site-ului</li>
<li><strong>Vercel Analytics:</strong> date anonimizate privind vizitele pe site (numar de vizitatori, pagini vizitate, tara de origine). Nu utilizeaza cookie-uri si nu colecteaza date personale identificabile.</li>
<li><strong>Vercel Speed Insights:</strong> masurarea performantei reale a site-ului (Core Web Vitals). Nu utilizeaza cookie-uri si nu colecteaza date personale.</li>
</ul>

<h2>8. Drepturile dumneavoastra</h2>
<p>In conformitate cu GDPR, aveti urmatoarele drepturi:</p>
<ul>
<li><strong>Dreptul de acces:</strong> puteti solicita o copie a datelor dumneavoastra personale</li>
<li><strong>Dreptul la rectificare:</strong> puteti solicita corectarea datelor inexacte</li>
<li><strong>Dreptul la stergere:</strong> puteti solicita stergerea datelor (cu exceptia celor pastrate din obligatie legala)</li>
<li><strong>Dreptul la restrictionare:</strong> puteti solicita limitarea prelucrarii datelor</li>
<li><strong>Dreptul la portabilitate:</strong> puteti solicita transferul datelor catre alt operator</li>
<li><strong>Dreptul de opozitie:</strong> puteti obiecta la prelucrarea datelor in anumite situatii</li>
<li><strong>Dreptul de a retrage consimtamantul:</strong> in orice moment, fara a afecta legalitatea prelucrarii anterioare</li>
</ul>
<p>Pentru exercitarea acestor drepturi, contactati-ne la: <strong>dentcraftsm@gmail.com</strong></p>

<h2>9. Securitatea datelor</h2>
<p>Implementam masuri tehnice si organizatorice adecvate pentru protejarea datelor dumneavoastra, inclusiv:</p>
<ul>
<li>Criptare SSL/TLS pentru transmiterea datelor</li>
<li>Acces restrictionat la datele personale</li>
<li>Backup-uri regulate si securizate</li>
<li>Instruirea personalului privind protectia datelor</li>
</ul>

<h2>10. Plangeri</h2>
<p>Daca considerati ca drepturile dumneavoastra au fost incalcate, aveti dreptul sa depuneti o plangere la Autoritatea Nationala de Supraveghere a Prelucrarii Datelor cu Caracter Personal (ANSPDCP):</p>
<ul>
<li>Website: <a href="https://www.dataprotection.ro" target="_blank" rel="noopener noreferrer">www.dataprotection.ro</a></li>
<li>Email: anspdcp@dataprotection.ro</li>
</ul>

<h2>11. Modificari ale politicii</h2>
<p>Ne rezervam dreptul de a actualiza aceasta politica. Orice modificare va fi publicata pe aceasta pagina cu data actualizarii mentionata.</p>

<h2>12. Contact</h2>
<p>Pentru orice intrebari legate de aceasta politica de confidentialitate, ne puteti contacta:</p>
<ul>
<li>Email: dentcraftsm@gmail.com</li>
<li>Telefon: 0741 199 977</li>
<li>Adresa: Str. Barbu Stefanescu Delavrancea nr.3, Satu Mare, Romania</li>
</ul>
      `,
    },

    cookies: {
      id: 'cookies',
      title: 'Politica de Cookie-uri',
      lastUpdated: '2026-02-26',
      content: `
<h2>1. Ce sunt cookie-urile?</h2>
<p>Cookie-urile sunt fisiere mici de text stocate pe dispozitivul dumneavoastra (computer, telefon, tableta) atunci cand vizitati site-ul nostru web. Acestea ne ajuta sa va oferim o experienta mai buna de navigare si sa intelegem cum este utilizat site-ul.</p>

<h2>2. Tipuri de cookie-uri utilizate</h2>

<h3>2.1 Cookie-uri esentiale (strict necesare)</h3>
<p>Aceste cookie-uri sunt necesare pentru functionarea de baza a site-ului si nu pot fi dezactivate. Ele includ:</p>
<ul>
<li><strong>Preferinta de limba:</strong> stocheaza limba selectata (romana, engleza sau maghiara)</li>
<li><strong>Consimtamantul cookie-uri:</strong> memoreaza preferintele dumneavoastra privind cookie-urile</li>
<li><strong>Securitate:</strong> protectie impotriva atacurilor CSRF si asigurarea securitatii sesiunii</li>
</ul>
<table>
<thead>
<tr><th>Nume cookie</th><th>Scop</th><th>Durata</th></tr>
</thead>
<tbody>
<tr><td>NEXT_LOCALE</td><td>Preferinta de limba</td><td>1 an</td></tr>
<tr><td>cookie_consent</td><td>Stocarea preferintelor cookie</td><td>1 an</td></tr>
</tbody>
</table>

<h3>2.2 Cookie-uri analitice</h3>
<p>Aceste cookie-uri ne ajuta sa intelegem cum este utilizat site-ul, colectand informatii anonime despre vizite si interactiuni. Utilizam Google Analytics prin Google Tag Manager (GTM).</p>
<table>
<thead>
<tr><th>Nume cookie</th><th>Scop</th><th>Durata</th></tr>
</thead>
<tbody>
<tr><td>_ga</td><td>Identificare unica vizitator (Google Analytics)</td><td>2 ani</td></tr>
<tr><td>_ga_*</td><td>Starea sesiunii (Google Analytics)</td><td>2 ani</td></tr>
<tr><td>_gid</td><td>Identificare unica vizitator (Google Analytics)</td><td>24 ore</td></tr>
</tbody>
</table>

<h3>2.3 Cookie-uri de marketing</h3>
<p>Aceste cookie-uri sunt utilizate pentru a va afisa reclame relevante si pentru a masura eficacitatea campaniilor publicitare.</p>
<table>
<thead>
<tr><th>Nume cookie</th><th>Scop</th><th>Durata</th></tr>
</thead>
<tbody>
<tr><td>_gcl_au</td><td>Conversii Google Ads</td><td>90 zile</td></tr>
<tr><td>_fbp</td><td>Tracking Facebook Pixel</td><td>90 zile</td></tr>
</tbody>
</table>

<h2>3. Gestionarea cookie-urilor</h2>
<h3>3.1 Prin bannerul de consimtamant</h3>
<p>La prima vizita pe site-ul nostru, veti vedea un banner care va permite sa:</p>
<ul>
<li>Acceptati toate cookie-urile</li>
<li>Acceptati doar cookie-urile esentiale</li>
<li>Personalizati preferintele pentru fiecare categorie de cookie-uri</li>
</ul>
<p>Puteti modifica preferintele oricand accesand setarile de cookie-uri din subsolul paginii.</p>

<h3>3.2 Prin setarile browserului</h3>
<p>Puteti gestiona sau sterge cookie-urile direct din browserul dumneavoastra:</p>
<ul>
<li><strong>Chrome:</strong> Setari &gt; Confidentialitate si securitate &gt; Cookie-uri</li>
<li><strong>Firefox:</strong> Setari &gt; Confidentialitate si securitate &gt; Cookie-uri</li>
<li><strong>Safari:</strong> Preferinte &gt; Confidentialitate &gt; Gestionare date site</li>
<li><strong>Edge:</strong> Setari &gt; Cookie-uri si permisiuni site</li>
</ul>
<p><strong>Atentie:</strong> Dezactivarea cookie-urilor esentiale poate afecta functionarea corecta a site-ului.</p>

<h2>4. Servicii terte</h2>
<p>Site-ul nostru utilizeaza urmatoarele servicii terte care pot plasa cookie-uri:</p>
<ul>
<li><strong>Google Tag Manager:</strong> gestionarea scripturilor de tracking</li>
<li><strong>Google Analytics 4:</strong> analiza traficului site-ului</li>
<li><strong>Google Maps:</strong> afisarea hartii cu locatia clinicii pe pagina de contact</li>
<li><strong>Vercel:</strong> hosting, Vercel Analytics (date anonimizate privind vizitele) si Vercel Speed Insights (masurarea performantei). Aceste servicii nu utilizeaza cookie-uri si nu colecteaza date personale identificabile.</li>
</ul>

<h2>5. Transferul datelor</h2>
<p>Unele servicii terte pot transfera date in afara Spatiului Economic European (SEE). In aceste cazuri, ne asiguram ca exista garantii adecvate conform GDPR (clauze contractuale standard, Cadru de protectie a datelor UE-SUA).</p>

<h2>6. Actualizari</h2>
<p>Aceasta politica poate fi actualizata periodic. Data ultimei actualizari este afisata in partea de sus a paginii.</p>

<h2>7. Contact</h2>
<p>Pentru intrebari despre cookie-uri, contactati-ne:</p>
<ul>
<li>Email: dentcraftsm@gmail.com</li>
<li>Telefon: 0741 199 977</li>
</ul>
      `,
    },

    terms: {
      id: 'terms',
      title: 'Termeni si Conditii',
      lastUpdated: '2026-02-26',
      content: `
<h2>1. Informatii generale</h2>
<p>Prezentii Termeni si Conditii reglementeaza utilizarea site-ului web www.dentcraft.ro si furnizarea serviciilor stomatologice de catre DentCraft SRL, cu sediul in Str. Barbu Stefanescu Delavrancea nr.3, Satu Mare, Romania.</p>
<p>Prin accesarea site-ului si/sau utilizarea serviciilor noastre, sunteti de acord cu acesti termeni. Va rugam sa ii cititi cu atentie.</p>

<h2>2. Servicii stomatologice</h2>
<h3>2.1 Natura serviciilor</h3>
<p>DentCraft ofera servicii stomatologice incluzand, dar fara a se limita la:</p>
<ul>
<li>Consultatii si diagnostic stomatologic</li>
<li>Stomatologie generala (obturatii, extractii, detartraj)</li>
<li>Estetica dentara (fatete, albire dentara)</li>
<li>Implantologie</li>
<li>Ortodontie</li>
<li>Protetica dentara</li>
<li>Endodontie (tratamente de canal)</li>
<li>Chirurgie oro-maxilo-faciala</li>
<li>Pedodontie (stomatologie pediatrica)</li>
<li>Urgente stomatologice</li>
</ul>
<h3>2.2 Informatii pe site</h3>
<p>Informatiile prezentate pe site au caracter informativ si nu constituie sfat medical. Diagnosticul si planul de tratament sunt stabilite exclusiv in urma consultatiei clinice.</p>
<p>Preturile afisate pe site sunt orientative si pot varia in functie de complexitatea cazului. Pretul final va fi comunicat dupa consultatie.</p>

<h2>3. Programari</h2>
<h3>3.1 Modalitati de programare</h3>
<p>Programarile pot fi realizate prin:</p>
<ul>
<li>Telefon: 0741 199 977</li>
<li>WhatsApp: 0741 199 977</li>
<li>Formularul de contact de pe site</li>
<li>Email: dentcraftsm@gmail.com</li>
</ul>
<h3>3.2 Anulare si reprogramare</h3>
<p>Va rugam sa ne anuntati cu cel putin 24 de ore inainte daca doriti sa anulati sau sa reprogramati o consultatie. Neprezentarile repetate fara anuntare prealabila pot duce la restrictionarea posibilitatii de programare online.</p>
<h3>3.3 Intarzieri</h3>
<p>Depunem toate eforturile sa respectam programul. In cazuri exceptionale, tratamentele anterioare pot duce la intarzieri minore. Va multumim pentru intelegere.</p>

<h2>4. Consimtamantul medical</h2>
<p>Inainte de orice tratament, veti fi informat despre:</p>
<ul>
<li>Natura si scopul tratamentului</li>
<li>Alternativele de tratament disponibile</li>
<li>Riscurile si beneficiile asociate</li>
<li>Costul estimat al tratamentului</li>
</ul>
<p>Consimtamantul informat va fi obtinut in scris pentru proceduri invazive sau complexe.</p>

<h2>5. Plati si facturare</h2>
<h3>5.1 Modalitati de plata</h3>
<p>Acceptam urmatoarele modalitati de plata:</p>
<ul>
<li>Numerar</li>
<li>Card bancar (Visa, Mastercard)</li>
<li>Transfer bancar</li>
</ul>
<h3>5.2 Facturare</h3>
<p>Factura fiscala va fi emisa pentru toate serviciile prestate, conform legislatiei in vigoare.</p>
<h3>5.3 Plata in rate</h3>
<p>Pentru tratamente complexe, putem oferi posibilitatea de plata in rate. Detaliile se stabilesc la receptie.</p>

<h2>6. Garantii</h2>
<p>Oferim garantii pentru lucrarile protetice si implanturi dentare, conform recomandarilor producatorilor si standardelor profesionale. Conditiile exacte de garantie sunt comunicate pentru fiecare tratament in parte.</p>
<p>Garantia este conditionata de:</p>
<ul>
<li>Respectarea recomandarilor de igiena orala</li>
<li>Prezentarea la controalele periodice programate</li>
<li>Utilizarea normala a lucrarilor dentare</li>
</ul>

<h2>7. Limitarea raspunderii</h2>
<h3>7.1 Servicii medicale</h3>
<p>DentCraft isi asuma responsabilitatea pentru calitatea serviciilor medicale prestate, in limita standardelor profesionale in vigoare. Rezultatele tratamentelor pot varia in functie de particularitaile biologice individuale.</p>
<h3>7.2 Site web</h3>
<p>Informatiile de pe site sunt furnizate "ca atare". Nu garantam ca site-ul va fi disponibil permanent sau fara erori. Nu suntem responsabili pentru eventualele pierderi rezultate din utilizarea sau imposibilitatea utilizarii site-ului.</p>

<h2>8. Proprietate intelectuala</h2>
<p>Continutul site-ului (texte, imagini, logo, design) este proprietatea DentCraft SRL si este protejat de legile privind drepturile de autor. Reproducerea, distribuirea sau modificarea continutului fara acordul prealabil scris este interzisa.</p>

<h2>9. Linkuri externe</h2>
<p>Site-ul poate contine linkuri catre site-uri terte. Nu suntem responsabili pentru continutul sau politicile de confidentialitate ale acestor site-uri.</p>

<h2>10. Forta majora</h2>
<p>Nu suntem responsabili pentru intarzieri sau neexecutarea obligatiilor cauzate de circumstante in afara controlului nostru rezonabil (dezastre naturale, pandemii, restrictii guvernamentale, etc.).</p>

<h2>11. Legislatie aplicabila</h2>
<p>Prezentii termeni sunt guvernati de legislatia Romaniei. Orice disputa va fi solutionata pe cale amiabila sau, in caz contrar, de instantele competente din Satu Mare, Romania.</p>

<h2>12. Modificari</h2>
<p>Ne rezervam dreptul de a modifica acesti termeni. Modificarile intra in vigoare la data publicarii pe site.</p>

<h2>13. Contact</h2>
<p>Pentru orice intrebari legate de acesti termeni si conditii:</p>
<ul>
<li>Email: dentcraftsm@gmail.com</li>
<li>Telefon: 0741 199 977</li>
<li>Adresa: Str. Barbu Stefanescu Delavrancea nr.3, Satu Mare, Romania</li>
</ul>
      `,
    },
  },

  // =============================================
  // ENGLISH
  // =============================================
  en: {
    privacy: {
      id: 'privacy',
      title: 'Privacy Policy',
      lastUpdated: '2026-02-26',
      content: `
<h2>1. Introduction</h2>
<p>DentCraft SRL, located at Str. Barbu Stefanescu Delavrancea nr.3, Satu Mare, Romania (hereinafter "the Clinic", "we"), is committed to protecting the privacy of your personal data in accordance with the General Data Protection Regulation (GDPR - EU Regulation 2016/679) and applicable national legislation.</p>
<p>This privacy policy describes how we collect, use, store, and protect your personal data when you use our website (www.dentcraft.ro) or use our dental services.</p>

<h2>2. Data Controller</h2>
<p><strong>DentCraft SRL</strong></p>
<ul>
<li>Address: Str. Barbu Stefanescu Delavrancea nr.3, Satu Mare, Romania</li>
<li>Email: dentcraftsm@gmail.com</li>
<li>Phone: 0741 199 977</li>
</ul>

<h2>3. Personal Data Collected</h2>
<p>We collect the following categories of personal data:</p>
<h3>3.1 Data provided directly by you</h3>
<ul>
<li><strong>Identification data:</strong> name, surname, date of birth</li>
<li><strong>Contact data:</strong> email address, phone number, postal address</li>
<li><strong>Medical data:</strong> medical history, dental diagnosis, treatment plan, dental X-rays, intra-oral photographs</li>
<li><strong>Financial data:</strong> information required for billing services</li>
</ul>
<h3>3.2 Data collected automatically</h3>
<ul>
<li><strong>Technical data:</strong> IP address, browser type, operating system, screen resolution</li>
<li><strong>Usage data:</strong> pages visited, visit duration, traffic source</li>
<li><strong>Cookies:</strong> as described in our Cookie Policy</li>
</ul>

<h2>4. Purposes of Data Processing</h2>
<p>We process your personal data for the following purposes:</p>
<ul>
<li><strong>Providing medical services:</strong> scheduling consultations, performing dental treatments, managing medical records</li>
<li><strong>Communication:</strong> responding to your inquiries, sending appointment confirmations, treatment notifications</li>
<li><strong>Legal obligations:</strong> compliance with medical documentation legislation, tax and accounting obligations</li>
<li><strong>Service improvement:</strong> anonymized analysis of website usage, optimizing user experience</li>
<li><strong>Marketing (with consent):</strong> sending promotional offers, newsletters</li>
</ul>

<h2>5. Legal Basis for Processing</h2>
<ul>
<li><strong>Contract performance:</strong> for providing the requested medical services</li>
<li><strong>Consent:</strong> for marketing activities and non-essential cookies</li>
<li><strong>Legal obligation:</strong> for compliance with medical and tax legislation</li>
<li><strong>Legitimate interest:</strong> for service improvement and website security</li>
</ul>

<h2>6. Data Retention Period</h2>
<ul>
<li><strong>Medical data:</strong> in accordance with applicable medical documentation legislation (minimum 10 years from the last medical act)</li>
<li><strong>Billing data:</strong> 10 years in accordance with tax legislation</li>
<li><strong>Marketing data:</strong> until consent is withdrawn</li>
<li><strong>Website usage data:</strong> 26 months from collection</li>
</ul>

<h2>7. Data Sharing</h2>
<p>We do not sell your personal data. We may share data with:</p>
<ul>
<li><strong>Dental laboratories:</strong> technical information required for manufacturing prosthetic work</li>
<li><strong>IT service providers:</strong> hosting, website maintenance, email services (with data processing agreements)</li>
<li><strong>Public authorities:</strong> when required by law</li>
<li><strong>Google Analytics:</strong> anonymized data about website usage</li>
<li><strong>Vercel Analytics:</strong> anonymized data about site visits (visitor count, pages visited, country of origin). Does not use cookies and does not collect personally identifiable data.</li>
<li><strong>Vercel Speed Insights:</strong> real-world site performance measurement (Core Web Vitals). Does not use cookies and does not collect personal data.</li>
</ul>

<h2>8. Your Rights</h2>
<p>Under GDPR, you have the following rights:</p>
<ul>
<li><strong>Right of access:</strong> you can request a copy of your personal data</li>
<li><strong>Right to rectification:</strong> you can request correction of inaccurate data</li>
<li><strong>Right to erasure:</strong> you can request deletion of data (except data retained by legal obligation)</li>
<li><strong>Right to restriction:</strong> you can request limitation of data processing</li>
<li><strong>Right to portability:</strong> you can request transfer of data to another controller</li>
<li><strong>Right to object:</strong> you can object to data processing in certain situations</li>
<li><strong>Right to withdraw consent:</strong> at any time, without affecting the legality of prior processing</li>
</ul>
<p>To exercise these rights, contact us at: <strong>dentcraftsm@gmail.com</strong></p>

<h2>9. Data Security</h2>
<p>We implement appropriate technical and organizational measures to protect your data, including:</p>
<ul>
<li>SSL/TLS encryption for data transmission</li>
<li>Restricted access to personal data</li>
<li>Regular and secured backups</li>
<li>Staff training on data protection</li>
</ul>

<h2>10. Complaints</h2>
<p>If you believe your rights have been violated, you have the right to file a complaint with the National Supervisory Authority for Personal Data Processing (ANSPDCP):</p>
<ul>
<li>Website: <a href="https://www.dataprotection.ro" target="_blank" rel="noopener noreferrer">www.dataprotection.ro</a></li>
<li>Email: anspdcp@dataprotection.ro</li>
</ul>

<h2>11. Policy Changes</h2>
<p>We reserve the right to update this policy. Any changes will be published on this page with the update date indicated.</p>

<h2>12. Contact</h2>
<p>For any questions regarding this privacy policy, you can contact us:</p>
<ul>
<li>Email: dentcraftsm@gmail.com</li>
<li>Phone: 0741 199 977</li>
<li>Address: Str. Barbu Stefanescu Delavrancea nr.3, Satu Mare, Romania</li>
</ul>
      `,
    },

    cookies: {
      id: 'cookies',
      title: 'Cookie Policy',
      lastUpdated: '2026-02-26',
      content: `
<h2>1. What Are Cookies?</h2>
<p>Cookies are small text files stored on your device (computer, phone, tablet) when you visit our website. They help us provide a better browsing experience and understand how the site is used.</p>

<h2>2. Types of Cookies Used</h2>

<h3>2.1 Essential Cookies (Strictly Necessary)</h3>
<p>These cookies are required for the basic functionality of the website and cannot be disabled. They include:</p>
<ul>
<li><strong>Language preference:</strong> stores the selected language (Romanian, English, or Hungarian)</li>
<li><strong>Cookie consent:</strong> remembers your cookie preferences</li>
<li><strong>Security:</strong> protection against CSRF attacks and session security</li>
</ul>
<table>
<thead>
<tr><th>Cookie Name</th><th>Purpose</th><th>Duration</th></tr>
</thead>
<tbody>
<tr><td>NEXT_LOCALE</td><td>Language preference</td><td>1 year</td></tr>
<tr><td>cookie_consent</td><td>Cookie preference storage</td><td>1 year</td></tr>
</tbody>
</table>

<h3>2.2 Analytics Cookies</h3>
<p>These cookies help us understand how the website is used by collecting anonymous information about visits and interactions. We use Google Analytics via Google Tag Manager (GTM).</p>
<table>
<thead>
<tr><th>Cookie Name</th><th>Purpose</th><th>Duration</th></tr>
</thead>
<tbody>
<tr><td>_ga</td><td>Unique visitor identification (Google Analytics)</td><td>2 years</td></tr>
<tr><td>_ga_*</td><td>Session state (Google Analytics)</td><td>2 years</td></tr>
<tr><td>_gid</td><td>Unique visitor identification (Google Analytics)</td><td>24 hours</td></tr>
</tbody>
</table>

<h3>2.3 Marketing Cookies</h3>
<p>These cookies are used to display relevant advertisements and measure the effectiveness of advertising campaigns.</p>
<table>
<thead>
<tr><th>Cookie Name</th><th>Purpose</th><th>Duration</th></tr>
</thead>
<tbody>
<tr><td>_gcl_au</td><td>Google Ads conversions</td><td>90 days</td></tr>
<tr><td>_fbp</td><td>Facebook Pixel tracking</td><td>90 days</td></tr>
</tbody>
</table>

<h2>3. Managing Cookies</h2>
<h3>3.1 Via the Consent Banner</h3>
<p>On your first visit to our website, you will see a banner that allows you to:</p>
<ul>
<li>Accept all cookies</li>
<li>Accept only essential cookies</li>
<li>Customize your preferences for each cookie category</li>
</ul>
<p>You can change your preferences at any time by accessing the cookie settings in the page footer.</p>

<h3>3.2 Via Browser Settings</h3>
<p>You can manage or delete cookies directly from your browser:</p>
<ul>
<li><strong>Chrome:</strong> Settings &gt; Privacy and Security &gt; Cookies</li>
<li><strong>Firefox:</strong> Settings &gt; Privacy &amp; Security &gt; Cookies</li>
<li><strong>Safari:</strong> Preferences &gt; Privacy &gt; Manage Website Data</li>
<li><strong>Edge:</strong> Settings &gt; Cookies and site permissions</li>
</ul>
<p><strong>Note:</strong> Disabling essential cookies may affect the proper functioning of the website.</p>

<h2>4. Third-Party Services</h2>
<p>Our website uses the following third-party services that may place cookies:</p>
<ul>
<li><strong>Google Tag Manager:</strong> management of tracking scripts</li>
<li><strong>Google Analytics 4:</strong> website traffic analysis</li>
<li><strong>Google Maps:</strong> displaying the clinic location map on the contact page</li>
<li><strong>Vercel:</strong> hosting, Vercel Analytics (anonymized visit data) and Vercel Speed Insights (performance measurement). These services do not use cookies and do not collect personally identifiable data.</li>
</ul>

<h2>5. Data Transfers</h2>
<p>Some third-party services may transfer data outside the European Economic Area (EEA). In such cases, we ensure adequate safeguards exist under GDPR (standard contractual clauses, EU-US Data Privacy Framework).</p>

<h2>6. Updates</h2>
<p>This policy may be updated periodically. The date of the last update is displayed at the top of the page.</p>

<h2>7. Contact</h2>
<p>For questions about cookies, contact us:</p>
<ul>
<li>Email: dentcraftsm@gmail.com</li>
<li>Phone: 0741 199 977</li>
</ul>
      `,
    },

    terms: {
      id: 'terms',
      title: 'Terms & Conditions',
      lastUpdated: '2026-02-26',
      content: `
<h2>1. General Information</h2>
<p>These Terms and Conditions govern the use of the website www.dentcraft.ro and the provision of dental services by DentCraft SRL, located at Str. Barbu Stefanescu Delavrancea nr.3, Satu Mare, Romania.</p>
<p>By accessing the website and/or using our services, you agree to these terms. Please read them carefully.</p>

<h2>2. Dental Services</h2>
<h3>2.1 Nature of Services</h3>
<p>DentCraft provides dental services including, but not limited to:</p>
<ul>
<li>Dental consultations and diagnosis</li>
<li>General dentistry (fillings, extractions, scaling)</li>
<li>Cosmetic dentistry (veneers, teeth whitening)</li>
<li>Dental implants</li>
<li>Orthodontics</li>
<li>Dental prosthetics</li>
<li>Endodontics (root canal treatments)</li>
<li>Oral and maxillofacial surgery</li>
<li>Pediatric dentistry</li>
<li>Dental emergencies</li>
</ul>
<h3>2.2 Website Information</h3>
<p>Information presented on the website is for informational purposes only and does not constitute medical advice. Diagnosis and treatment plans are established exclusively following clinical consultation.</p>
<p>Prices displayed on the website are indicative and may vary depending on the complexity of the case. The final price will be communicated after consultation.</p>

<h2>3. Appointments</h2>
<h3>3.1 Booking Methods</h3>
<p>Appointments can be made via:</p>
<ul>
<li>Phone: 0741 199 977</li>
<li>WhatsApp: 0741 199 977</li>
<li>The contact form on the website</li>
<li>Email: dentcraftsm@gmail.com</li>
</ul>
<h3>3.2 Cancellation and Rescheduling</h3>
<p>Please notify us at least 24 hours in advance if you wish to cancel or reschedule an appointment. Repeated no-shows without prior notice may result in restricted online booking capabilities.</p>
<h3>3.3 Delays</h3>
<p>We make every effort to keep to schedule. In exceptional cases, prior treatments may cause minor delays. Thank you for your understanding.</p>

<h2>4. Medical Consent</h2>
<p>Before any treatment, you will be informed about:</p>
<ul>
<li>The nature and purpose of the treatment</li>
<li>Available treatment alternatives</li>
<li>Associated risks and benefits</li>
<li>Estimated cost of the treatment</li>
</ul>
<p>Written informed consent will be obtained for invasive or complex procedures.</p>

<h2>5. Payment and Billing</h2>
<h3>5.1 Payment Methods</h3>
<p>We accept the following payment methods:</p>
<ul>
<li>Cash</li>
<li>Bank card (Visa, Mastercard)</li>
<li>Bank transfer</li>
</ul>
<h3>5.2 Billing</h3>
<p>A fiscal invoice will be issued for all services provided, in accordance with applicable legislation.</p>
<h3>5.3 Payment Plans</h3>
<p>For complex treatments, we may offer installment payment options. Details are arranged at reception.</p>

<h2>6. Warranties</h2>
<p>We provide warranties for prosthetic work and dental implants, in accordance with manufacturer recommendations and professional standards. Exact warranty conditions are communicated for each treatment individually.</p>
<p>The warranty is conditional on:</p>
<ul>
<li>Following oral hygiene recommendations</li>
<li>Attending scheduled periodic check-ups</li>
<li>Normal use of dental work</li>
</ul>

<h2>7. Limitation of Liability</h2>
<h3>7.1 Medical Services</h3>
<p>DentCraft assumes responsibility for the quality of medical services provided, within the limits of applicable professional standards. Treatment outcomes may vary depending on individual biological characteristics.</p>
<h3>7.2 Website</h3>
<p>Information on the website is provided "as is." We do not guarantee that the website will be available at all times or error-free. We are not responsible for any losses resulting from the use or inability to use the website.</p>

<h2>8. Intellectual Property</h2>
<p>Website content (text, images, logo, design) is the property of DentCraft SRL and is protected by copyright laws. Reproduction, distribution, or modification of the content without prior written consent is prohibited.</p>

<h2>9. External Links</h2>
<p>The website may contain links to third-party websites. We are not responsible for the content or privacy policies of these websites.</p>

<h2>10. Force Majeure</h2>
<p>We are not responsible for delays or failure to fulfill obligations caused by circumstances beyond our reasonable control (natural disasters, pandemics, government restrictions, etc.).</p>

<h2>11. Applicable Law</h2>
<p>These terms are governed by the laws of Romania. Any dispute shall be resolved amicably or, failing that, by the competent courts in Satu Mare, Romania.</p>

<h2>12. Amendments</h2>
<p>We reserve the right to modify these terms. Changes take effect upon publication on the website.</p>

<h2>13. Contact</h2>
<p>For any questions regarding these terms and conditions:</p>
<ul>
<li>Email: dentcraftsm@gmail.com</li>
<li>Phone: 0741 199 977</li>
<li>Address: Str. Barbu Stefanescu Delavrancea nr.3, Satu Mare, Romania</li>
</ul>
      `,
    },
  },

  // =============================================
  // HUNGARIAN
  // =============================================
  hu: {
    privacy: {
      id: 'privacy',
      title: 'Adatvedelmi Szabalyzat',
      lastUpdated: '2026-02-26',
      content: `
<h2>1. Bevezetes</h2>
<p>A DentCraft SRL (szekhely: Str. Barbu Stefanescu Delavrancea nr.3, Szatmarnemeti, Romania, a tovabbiakban "Klinika", "mi") elkotelezett az On szemelyes adatainak vedelme irant az Altalanos Adatvedelmi Rendelettel (GDPR - EU 2016/679 rendelet) es a hatalyos nemzeti jogszabalyokkal osszhangban.</p>
<p>Ez az adatvedelmi szabalyzat leirja, hogyan gyujtjuk, hasznaljuk, taroljuk es vedjuk az On szemelyes adatait, amikor a weboldalunkat (www.dentcraft.ro) hasznalja, vagy fogaszati szolgaltatasainkat veszi igenybe.</p>

<h2>2. Adatkezelo</h2>
<p><strong>DentCraft SRL</strong></p>
<ul>
<li>Cim: Str. Barbu Stefanescu Delavrancea nr.3, Szatmarnemeti, Romania</li>
<li>Email: dentcraftsm@gmail.com</li>
<li>Telefon: 0741 199 977</li>
</ul>

<h2>3. Gyujtott szemelyes adatok</h2>
<p>A kovetkezo kategoriaju szemelyes adatokat gyujtjuk:</p>
<h3>3.1 Az On altal kozvetlenul megadott adatok</h3>
<ul>
<li><strong>Azonosito adatok:</strong> nev, vezeteknev, szuletesi datum</li>
<li><strong>Kapcsolattartasi adatok:</strong> email-cim, telefonszam, postai cim</li>
<li><strong>Orvosi adatok:</strong> kórelőzmeny, fogaszati diagnozis, kezelesi terv, fogaszati rontgenfelvetelek, intraoralis fenykepek</li>
<li><strong>Penzugyi adatok:</strong> a szolgaltatasok szamlazasahoz szukseges informaciok</li>
</ul>
<h3>3.2 Automatikusan gyujtott adatok</h3>
<ul>
<li><strong>Technikai adatok:</strong> IP-cim, bongeszo tipusa, operacios rendszer, kepernyofelbontas</li>
<li><strong>Hasznalati adatok:</strong> meglátogatott oldalak, latogatas idotartama, forgalom forrasa</li>
<li><strong>Sutik:</strong> a Suti Szabalyzatunkban leirtaknak megfeleloen</li>
</ul>

<h2>4. Az adatkezeles celjai</h2>
<p>Szemelyes adatait a kovetkezo celokra kezeljuk:</p>
<ul>
<li><strong>Orvosi szolgaltatasok nyujtasa:</strong> konzultaciok idopontjanak egyeztetese, fogaszati kezelesek elvegzese, orvosi nyilvantartas kezele</li>
<li><strong>Kommunikacio:</strong> kerdeseire valo valaszadas, idopont-visszaigazolasok kuldese, kezelesi ertesitesek</li>
<li><strong>Jogi kotelezettségek:</strong> az orvosi dokumentaciora vonatkozo jogszabalyok betartasa, adó- es szamviteli kotelezettségek</li>
<li><strong>Szolgaltatas fejlesztese:</strong> anonimizalt weboldal-hasznalati elemzes, felhasznaloi elmeny optimalizalasa</li>
<li><strong>Marketing (hozzajarulassal):</strong> promócios ajanlatok, hirlevelek kuldese</li>
</ul>

<h2>5. Az adatkezeles jogalapja</h2>
<ul>
<li><strong>Szerzodes teljesitese:</strong> a kert orvosi szolgaltatasok nyujtasahoz</li>
<li><strong>Hozzajarulas:</strong> marketing tevekenysegekhez es nem alapveto sutikhez</li>
<li><strong>Jogi kotelezettseg:</strong> az orvosi es adojogi jogszabalyok betartasahoz</li>
<li><strong>Jogos erdek:</strong> a szolgaltatasok fejlesztesehez es a weboldal biztonsagahoz</li>
</ul>

<h2>6. Adatmegorzesi idoszak</h2>
<ul>
<li><strong>Orvosi adatok:</strong> a hatalyos orvosi dokumentacios jogszabalyoknak megfeleloen (az utolso orvosi cselekmenytol szamitott legalabb 10 ev)</li>
<li><strong>Szamlazasi adatok:</strong> 10 ev az adojogszabalyoknak megfeleloen</li>
<li><strong>Marketing adatok:</strong> a hozzajarulas visszavonasaig</li>
<li><strong>Weboldal-hasznalati adatok:</strong> a gyujtest kovetoen 26 honap</li>
</ul>

<h2>7. Adatok megosztasa</h2>
<p>Nem adunk el szemelyes adatokat. Az adatokat megoszthatjuk:</p>
<ul>
<li><strong>Fogaszati laboratoriumok:</strong> a protetikai munkak elkeszitesehez szukseges technikai informaciok</li>
<li><strong>IT-szolgaltatok:</strong> tarhelykezeles, weboldal-karbantartas, email-szolgaltatasok (adatkezelesi megallaodasokkal)</li>
<li><strong>Hatosagok:</strong> amikor a torveny ezt eloirja</li>
<li><strong>Google Analytics:</strong> anonimizalt adatok a weboldal hasznalatarol</li>
<li><strong>Vercel Analytics:</strong> anonimizalt adatok a weboldal latogatasairol (latogatoszam, megtekintett oldalak, szarmazasi orszag). Nem hasznal sutiket es nem gyujt szemelyazonositasra alkalmas adatokat.</li>
<li><strong>Vercel Speed Insights:</strong> a weboldal valos teljesitmenyenek merese (Core Web Vitals). Nem hasznal sutiket es nem gyujt szemelyes adatokat.</li>
</ul>

<h2>8. Az On jogai</h2>
<p>A GDPR ertelmeben az alabbi jogokkal rendelkezik:</p>
<ul>
<li><strong>Hozzaferesi jog:</strong> kerheti szemelyes adatainak masolatat</li>
<li><strong>Helyesbiteshez valo jog:</strong> kerheti a pontatlan adatok javitasat</li>
<li><strong>Torleshez valo jog:</strong> kerheti az adatok torleset (kiveve a jogi kotelezettseg alapjan megorzott adatokat)</li>
<li><strong>Korlatozashoz valo jog:</strong> kerheti az adatkezeles korlastozasat</li>
<li><strong>Adathordozhatosaghoz valo jog:</strong> kerheti az adatok mas adatkezelohoz torteno atvitelet</li>
<li><strong>Tiltakozasi jog:</strong> bizonyos esetekben tiltakozhat az adatkezeles ellen</li>
<li><strong>Hozzajarulas visszavonasahoz valo jog:</strong> barmikor, anelkul, hogy ez erintenea a korabbi adatkezeles jogszeruseget</li>
</ul>
<p>Ezen jogok gyakorlasahoz forduljon hozzank: <strong>dentcraftsm@gmail.com</strong></p>

<h2>9. Adatbiztonsag</h2>
<p>Megfelelo technikai es szervezesi intezkedeseket alkalmazunk az On adatainak vedelme erdekeben, beleertve:</p>
<ul>
<li>SSL/TLS titkositas az adattovabbitashoz</li>
<li>Korlatozott hozzaferes a szemelyes adatokhoz</li>
<li>Rendszeres es biztonsagos mentesek</li>
<li>A szemelyzet kepzese az adatvedelem teren</li>
</ul>

<h2>10. Panaszok</h2>
<p>Ha ugy veli, hogy jogait megsertettek, panaszt nyujthat be a Nemzeti Adatvedelmi Hatosagnal (ANSPDCP):</p>
<ul>
<li>Weboldal: <a href="https://www.dataprotection.ro" target="_blank" rel="noopener noreferrer">www.dataprotection.ro</a></li>
<li>Email: anspdcp@dataprotection.ro</li>
</ul>

<h2>11. A szabalyzat modositasai</h2>
<p>Fenntartjuk a jogot e szabalyzat frissitesere. Minden valtozas ezen az oldalon kerul kozlesre, a frissites datumanak feltunetesevel.</p>

<h2>12. Kapcsolat</h2>
<p>Az adatvedelmi szabalyzattal kapcsolatos barmilyen kerdesevel forduljon hozzank:</p>
<ul>
<li>Email: dentcraftsm@gmail.com</li>
<li>Telefon: 0741 199 977</li>
<li>Cim: Str. Barbu Stefanescu Delavrancea nr.3, Szatmarnemeti, Romania</li>
</ul>
      `,
    },

    cookies: {
      id: 'cookies',
      title: 'Suti Szabalyzat',
      lastUpdated: '2026-02-26',
      content: `
<h2>1. Mik azok a sutik?</h2>
<p>A sutik kis szoveges fajlok, amelyeket az On eszkozén (szamitogep, telefon, tablet) tarolunk, amikor meglátogatja weboldalunkat. Segitenek jobb böngeszesi elmenyt nyujtani es megerteni, hogyan hasznaljak a webhelyet.</p>

<h2>2. A hasznalt sutik tipusai</h2>

<h3>2.1 Alapveto sutik (feltétlenül szukseegesek)</h3>
<p>Ezek a sutik szuksegesek a weboldal alapveto mukodesehez, es nem kapcsolhatók ki. Ezek kozé tartozik:</p>
<ul>
<li><strong>Nyelvi beallitas:</strong> a kivalasztott nyelv tarolasa (roman, angol vagy magyar)</li>
<li><strong>Suti-hozzajarulas:</strong> az On suti-beallitasainak tarolasa</li>
<li><strong>Biztonsag:</strong> CSRF tamadasok elleni vedelem es munkamenet-biztonsag</li>
</ul>
<table>
<thead>
<tr><th>Suti neve</th><th>Cel</th><th>Idotartam</th></tr>
</thead>
<tbody>
<tr><td>NEXT_LOCALE</td><td>Nyelvi beallitas</td><td>1 ev</td></tr>
<tr><td>cookie_consent</td><td>Suti-beallitasok tarolasa</td><td>1 ev</td></tr>
</tbody>
</table>

<h3>2.2 Analitikai sutik</h3>
<p>Ezek a sutik segitenek megerteni, hogyan hasznaljak a webhelyet, anonim informaciokat gyujtve a latogatasokrol es az interakciokrol. A Google Analytics-et hasznaljuk a Google Tag Manageren (GTM) keresztul.</p>
<table>
<thead>
<tr><th>Suti neve</th><th>Cel</th><th>Idotartam</th></tr>
</thead>
<tbody>
<tr><td>_ga</td><td>Egyedi latogato azonositas (Google Analytics)</td><td>2 ev</td></tr>
<tr><td>_ga_*</td><td>Munkamenet allapota (Google Analytics)</td><td>2 ev</td></tr>
<tr><td>_gid</td><td>Egyedi latogato azonositas (Google Analytics)</td><td>24 ora</td></tr>
</tbody>
</table>

<h3>2.3 Marketing sutik</h3>
<p>Ezeket a sutiket relevans hirdetesek megjelenitesere es a reklamkampanyok hatekonysaganak meresere hasznaljak.</p>
<table>
<thead>
<tr><th>Suti neve</th><th>Cel</th><th>Idotartam</th></tr>
</thead>
<tbody>
<tr><td>_gcl_au</td><td>Google Ads konverziok</td><td>90 nap</td></tr>
<tr><td>_fbp</td><td>Facebook Pixel kovetes</td><td>90 nap</td></tr>
</tbody>
</table>

<h2>3. Sutik kezelese</h2>
<h3>3.1 A hozzajarulasi szalagon keresztul</h3>
<p>Weboldalunk elso meglátogatasakor megjelenik egy szalag, amely lehetove teszi:</p>
<ul>
<li>Osszes suti elfogadasa</li>
<li>Csak az alapveto sutik elfogadasa</li>
<li>Preferenciainak testreszabasa az egyes suti-kategoriak szamara</li>
</ul>
<p>Beallitasait barmikor modosithatja a labjecben talalhato suti-beallitasok megnyitasaval.</p>

<h3>3.2 A böngészo beallitasain keresztul</h3>
<p>A sutiket kozvetlenul a böngészojebol is kezelheti vagy torolheti:</p>
<ul>
<li><strong>Chrome:</strong> Beallitasok &gt; Adatvedelem es biztonsag &gt; Sutik</li>
<li><strong>Firefox:</strong> Beallitasok &gt; Adatvedelem es biztonsag &gt; Sutik</li>
<li><strong>Safari:</strong> Beallitasok &gt; Adatvedelem &gt; Webhelyadatok kezelese</li>
<li><strong>Edge:</strong> Beallitasok &gt; Sutik es webhelyengedélyek</li>
</ul>
<p><strong>Figyelem:</strong> Az alapveto sutik kikapcsolasa befolyasolhatja a weboldal megfelelo mukodeset.</p>

<h2>4. Harmadik feles szolgaltatasok</h2>
<p>Weboldalunk a kovetkezo harmadik feles szolgaltatasokat hasznalja, amelyek sutiket helyezhetnek el:</p>
<ul>
<li><strong>Google Tag Manager:</strong> kovetesi parancsfajlok kezelese</li>
<li><strong>Google Analytics 4:</strong> weboldal forgalmi elemzes</li>
<li><strong>Google Maps:</strong> a klinika helyszinenek megjelenítese a kapcsolat oldalon</li>
<li><strong>Vercel:</strong> tarhelykezeles, Vercel Analytics (anonimizalt latogatasi adatok) es Vercel Speed Insights (teljesitmenymeres). Ezek a szolgaltatasok nem hasznalnak sutiket es nem gyujtenek szemelyazonositasra alkalmas adatokat.</li>
</ul>

<h2>5. Adattovabbitas</h2>
<p>Egyes harmadik feles szolgaltatasok az Europai Gazdasagi Tersegen (EGT) kivulre tovabbithatnak adatokat. Ilyen esetekben biztositjuk, hogy a GDPR szerinti megfelelo garanciák (altalanos szerzodesi feltételek, EU-USA Adatvedelmi Keretrendszer) rendelkezesre alljanak.</p>

<h2>6. Frissitesek</h2>
<p>Ez a szabalyzat idoszakosan frissulhet. Az utolso frissites datuma az oldal tetején talalhato.</p>

<h2>7. Kapcsolat</h2>
<p>A sutikkel kapcsolatos kerdesekert forduljon hozzank:</p>
<ul>
<li>Email: dentcraftsm@gmail.com</li>
<li>Telefon: 0741 199 977</li>
</ul>
      `,
    },

    terms: {
      id: 'terms',
      title: 'Felhasznalasi Feltetelek',
      lastUpdated: '2026-02-26',
      content: `
<h2>1. Altalanos informaciok</h2>
<p>Jelen Felhasznalasi Feltételek a www.dentcraft.ro weboldal hasznalatat es a DentCraft SRL (szekhely: Str. Barbu Stefanescu Delavrancea nr.3, Szatmarnemeti, Romania) altal nyujtott fogaszati szolgaltatasok felteteleit szabalyozzak.</p>
<p>A weboldal elereesevel es/vagy szolgaltatasaink igenybevetelevel elfogadja ezeket a feltételeket. Keruk, olvassa el figyelmesen.</p>

<h2>2. Fogaszati szolgaltatasok</h2>
<h3>2.1 A szolgaltatasok jellege</h3>
<p>A DentCraft fogaszati szolgaltatasokat nyujt, beleertve, de nem kizarolagosan:</p>
<ul>
<li>Fogaszati konzultaciok es diagnozis</li>
<li>Altalanos fogaszat (tomes, huzas, fogkotisztitas)</li>
<li>Esztetikai fogaszat (héjak, fogfeherites)</li>
<li>Fogimplantatumok</li>
<li>Fogszabalyozas</li>
<li>Fogpotlastan</li>
<li>Endodoncia (gyokerkezeles)</li>
<li>Arc-allcsont sebeszet</li>
<li>Gyermekfogaszat</li>
<li>Fogaszati surgossegek</li>
</ul>
<h3>2.2 Weboldal informaciok</h3>
<p>A weboldalon kozolt informaciok tajekoztato jelleguek, es nem minosulnek orvosi tanacsnak. A diagnozist es a kezelesi tervet kizarolag klinikai konzultaciót kovetoen allapitjuk meg.</p>
<p>A weboldalon feltuntetett arak tajekoztatoak, es az eset osszettetsegétol fuggoen valtozhatnak. A végleges arat a konzultaciót kovetoen kozoljuk.</p>

<h2>3. Idopontfoglalas</h2>
<h3>3.1 Foglalasi módok</h3>
<p>Idopontot az alabbi modon foglalhat:</p>
<ul>
<li>Telefon: 0741 199 977</li>
<li>WhatsApp: 0741 199 977</li>
<li>A weboldalon talalhato kapcsolatfelveteli urlap</li>
<li>Email: dentcraftsm@gmail.com</li>
</ul>
<h3>3.2 Lemondas es atidopontositas</h3>
<p>Keruk, ertesitsen minket legalabb 24 oraval elore, ha le kivanja mondani vagy at kivanja idopontositani programjat. Az eloertes nelkuli ismetelt meg nem jelenes az online foglalasi lehetoseg korlatozasahoz vezethet.</p>
<h3>3.3 Kesések</h3>
<p>Minden erofeszitesunket megtesszuk, hogy tartjuk a beosztast. Kivetelesen a korabbi kezelesek kismerteku kesést okozhatnak. Koszonjuk a megertest.</p>

<h2>4. Orvosi hozzajarulas</h2>
<p>Bármilyen kezeles elott tajekoztatasat kap:</p>
<ul>
<li>A kezeles jellegerol es celjarol</li>
<li>Az elerheto kezelesi alternativakrol</li>
<li>A kapcsolodo kockazatokrol es elonyokrol</li>
<li>A kezeles becsult koltsegerol</li>
</ul>
<p>Invaziv vagy osszetett beavatkozasokhoz irasbeli tajekozott beleegyezest kerunk.</p>

<h2>5. Fizetes es szamlazas</h2>
<h3>5.1 Fizetesi módok</h3>
<p>Az alabbi fizetesi modokat fogadjuk el:</p>
<ul>
<li>Keszpenz</li>
<li>Bankkartya (Visa, Mastercard)</li>
<li>Bankátutalas</li>
</ul>
<h3>5.2 Szamlazas</h3>
<p>Minden nyujtott szolgaltatasról adoszamlat allitunk ki a hatalyos jogszabalyoknak megfeleloen.</p>
<h3>5.3 Reszletfizetes</h3>
<p>Osszetett kezeleseknel lehetoseget kinálhatunk reszletfizetesre. A reszleteket a recepcio egyezteti.</p>

<h2>6. Garanciak</h2>
<p>A protetikai munkakra es fogimplantatumokra garanciát vallalunk a gyarto ajanlasainak es a szakmai szabvanyoknak megfeleloen. A pontos garancialis feltételeket az egyes kezelesekre egyedileg kozoljuk.</p>
<p>A garancia feltetele:</p>
<ul>
<li>A szajhigieniai ajanlasok betartasa</li>
<li>A betervezett idoszakos ellenorzeseken valo megjelenes</li>
<li>A fogaszati munkak rendeltetesszeru hasznalata</li>
</ul>

<h2>7. Felelosseg korlatozasa</h2>
<h3>7.1 Orvosi szolgaltatasok</h3>
<p>A DentCraft vallalja a felelosseget a nyujtott orvosi szolgaltatasok minosegerert a hatalyos szakmai szabvanyok keretein belul. A kezelesi eredmenyek az egyeni biológiai sajátosságoktol fuggoen valtozhatnak.</p>
<h3>7.2 Weboldal</h3>
<p>A weboldalon megjeleno informaciok "adott allapotukban" allnak rendelkezesre. Nem garantaljuk, hogy a weboldal mindenkori vagy hibamentes lesz. Nem vallalunk felelosseget a weboldal hasznalataból vagy annak nem lehetseges hasznalatabol eredő karokért.</p>

<h2>8. Szellemi tulajdon</h2>
<p>A weboldal tartalma (szovegek, kepek, logo, design) a DentCraft SRL tulajdona, es a szerzoi jogi torvények vedelmezik. A tartalom engedely nelkuli sokszorosítása, terjesztese vagy modositasa tilos.</p>

<h2>9. Kulso linkek</h2>
<p>A weboldal harmadik felek webhelyeire mutato hivatkozasokat tartalmazhat. Nem vallalunk felelosseget ezen webhelyek tartalmaert vagy adatvedelmi szabalyzataiert.</p>

<h2>10. Vis major</h2>
<p>Nem vallalunk felelosseget az ésszeru ellenorzesunkon kivul allo korulmenyek altal okozott kesedelemert vagy kotelezettségek nem teljesiteseert (termeszeti katasztrofak, jarvanyok, kormanyzati korlatozasok stb.).</p>

<h2>11. Alkalmazando jog</h2>
<p>Jelen feltételekre Romania jogszabalyai az iranyadók. Barmely jogvitat békés uton, vagy ennek hianyaban a szatmarnemetii illetékes birosagok elott rendezunk.</p>

<h2>12. Modositasok</h2>
<p>Fenntartjuk a jogot ezen feltételek modositasara. A modositasok a weboldalon torteno kozetesukkel lepnek hatalyba.</p>

<h2>13. Kapcsolat</h2>
<p>A felhasznalasi feltételekkel kapcsolatos barmilyen kerdesevel forduljon hozzank:</p>
<ul>
<li>Email: dentcraftsm@gmail.com</li>
<li>Telefon: 0741 199 977</li>
<li>Cim: Str. Barbu Stefanescu Delavrancea nr.3, Szatmarnemeti, Romania</li>
</ul>
      `,
    },
  },
}

/**
 * Get legal page data by slug and locale
 */
export function getLegalPageContent(
  slug: string,
  locale: string
): LegalPageData | null {
  const pageId = SLUG_TO_PAGE_ID[slug]
  if (!pageId) return null

  const localeContent = legalContent[locale]
  if (!localeContent) return null

  return localeContent[pageId] || null
}
