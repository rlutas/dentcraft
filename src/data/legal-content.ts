/**
 * Hardcoded legal page content for DENTCRAFT
 *
 * Since Sanity CMS doesn't have legal page content, we serve
 * static content in all 3 locales (ro, en, hu).
 *
 * Company: DENTCRAFT
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
      title: 'Politica de Confidențialitate',
      lastUpdated: '2026-02-26',
      content: `
<h2>1. Introducere</h2>
<p>DENTCRAFT SRL, cu sediul în Str. Barbu Ștefănescu Delavrancea nr.3, Satu Mare, România (denumită în continuare "Clinica", "noi"), se angajează să protejeze confidențialitatea datelor dumneavoastră personale în conformitate cu Regulamentul General privind Protecția Datelor (GDPR - Regulamentul UE 2016/679) și legislația națională în vigoare.</p>
<p>Această politică de confidențialitate descrie modul în care colectăm, utilizăm, stocăm și protejăm datele dumneavoastră personale atunci când utilizați site-ul nostru web (www.dentcraft.ro) sau beneficiați de serviciile noastre stomatologice.</p>

<h2>2. Operator de date</h2>
<p><strong>DENTCRAFT SRL</strong></p>
<ul>
<li>Adresa: Str. Barbu Ștefănescu Delavrancea nr.3, Satu Mare, Romania</li>
<li>Email: dentcraftsm@gmail.com</li>
<li>Telefon: 0741 199 977</li>
</ul>

<h2>3. Datele personale colectate</h2>
<p>Colectăm următoarele categorii de date personale:</p>
<h3>3.1 Date furnizate direct de dumneavoastra</h3>
<ul>
<li><strong>Date de identificare:</strong> nume, prenume, data nasterii</li>
<li><strong>Date de contact:</strong> adresa de email, număr de telefon, adresa postala</li>
<li><strong>Date medicale:</strong> istoric medical, diagnostic stomatologic, plan de tratament, radiografii dentare, fotografii intra-orale</li>
<li><strong>Date financiare:</strong> informații necesare facturării serviciilor</li>
</ul>
<h3>3.2 Date colectate automat</h3>
<ul>
<li><strong>Date tehnice:</strong> adresa IP, tipul browserului, sistemul de operare, rezoluția ecranului</li>
<li><strong>Date de utilizare:</strong> paginile vizitate, durata vizitei, sursa traficului</li>
<li><strong>Cookie-uri:</strong> conform Politicii noastre de Cookie-uri</li>
</ul>

<h2>4. Scopurile prelucrării datelor</h2>
<p>Prelucrăm datele dumneavoastră personale în următoarele scopuri:</p>
<ul>
<li><strong>Furnizarea serviciilor medicale:</strong> programarea consultațiilor, efectuarea tratamentelor stomatologice, gestionarea dosarului medical</li>
<li><strong>Comunicarea:</strong> răspunsul la întrebările dumneavoastră, trimiterea confirmărilor de programare, notificări privind tratamentul</li>
<li><strong>Obligații legale:</strong> respectarea legislației privind documentația medicală, obligații fiscale și contabile</li>
<li><strong>Îmbunătățirea serviciilor:</strong> analiza anonimizată a utilizării site-ului, optimizarea experienței utilizatorului</li>
<li><strong>Marketing (cu consimtamant):</strong> trimiterea de oferte promoționale, newslettere</li>
</ul>

<h2>5. Temeiurile juridice ale prelucrarii</h2>
<ul>
<li><strong>Executarea contractului:</strong> pentru furnizarea serviciilor medicale solicitate</li>
<li><strong>Consimtamantul:</strong> pentru activități de marketing și cookie-uri non-esentiale</li>
<li><strong>Obligația legala:</strong> pentru respectarea legislației medicale și fiscale</li>
<li><strong>Interesul legitim:</strong> pentru îmbunătățirea serviciilor și securitatea site-ului</li>
</ul>

<h2>6. Durata stocării datelor</h2>
<ul>
<li><strong>Date medicale:</strong> conform legislației în vigoare privind documentația medicală (minim 10 ani de la ultimul act medical)</li>
<li><strong>Date de facturare:</strong> 10 ani conform legislației fiscale</li>
<li><strong>Date de marketing:</strong> până la retragerea consimtamantului</li>
<li><strong>Date de utilizare site:</strong> 26 luni de la colectare</li>
</ul>

<h2>7. Partajarea datelor</h2>
<p>Nu vindem datele dumneavoastră personale. Putem partaja datele cu:</p>
<ul>
<li><strong>Laboratoare dentare:</strong> informații tehnice necesare confecționării lucrărilor protetice</li>
<li><strong>Furnizori de servicii IT:</strong> hosting, mentenanță site, servicii email (cu acorduri de prelucrare a datelor)</li>
<li><strong>Autorități publice:</strong> când legea impune acest lucru</li>
<li><strong>Google Analytics:</strong> date anonimizate despre utilizarea site-ului</li>
<li><strong>Vercel Analytics:</strong> date anonimizate privind vizitele pe site (număr de vizitatori, pagini vizitate, țara de origine). Nu utilizează cookie-uri și nu colectează date personale identificabile.</li>
<li><strong>Vercel Speed Insights:</strong> măsurarea performanței reale a site-ului (Core Web Vitals). Nu utilizează cookie-uri și nu colectează date personale.</li>
</ul>

<h2>8. Drepturile dumneavoastra</h2>
<p>În conformitate cu GDPR, aveți următoarele drepturi:</p>
<ul>
<li><strong>Dreptul de acces:</strong> puteți solicita o copie a datelor dumneavoastră personale</li>
<li><strong>Dreptul la rectificare:</strong> puteți solicita corectarea datelor inexacte</li>
<li><strong>Dreptul la stergere:</strong> puteți solicita ștergerea datelor (cu excepția celor păstrate din obligație legala)</li>
<li><strong>Dreptul la restrictionare:</strong> puteți solicita limitarea prelucrării datelor</li>
<li><strong>Dreptul la portabilitate:</strong> puteți solicita transferul datelor către alt operator</li>
<li><strong>Dreptul de opozitie:</strong> puteți obiecta la prelucrarea datelor în anumite situatii</li>
<li><strong>Dreptul de a retrage consimtamantul:</strong> în orice moment, fără a afecta legalitatea prelucrării anterioare</li>
</ul>
<p>Pentru exercitarea acestor drepturi, contactați-ne la: <strong>dentcraftsm@gmail.com</strong></p>

<h2>9. Securitatea datelor</h2>
<p>Implementăm măsuri tehnice și organizatorice adecvate pentru protejarea datelor dumneavoastră, inclusiv:</p>
<ul>
<li>Criptare SSL/TLS pentru transmiterea datelor</li>
<li>Acces restricționat la datele personale</li>
<li>Backup-uri regulate și securizate</li>
<li>Instruirea personalului privind protecția datelor</li>
</ul>

<h2>10. Plangeri</h2>
<p>Dacă considerați că drepturile dumneavoastră au fost încălcate, aveți dreptul să depuneți o plângere la Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP):</p>
<ul>
<li>Website: <a href="https://www.dataprotection.ro" target="_blank" rel="noopener noreferrer">www.dataprotection.ro</a></li>
<li>Email: anspdcp@dataprotection.ro</li>
</ul>

<h2>11. Modificări ale politicii</h2>
<p>Ne rezervăm dreptul de a actualiza această politică. Orice modificare va fi publicată pe această pagină cu data actualizării menționată.</p>

<h2>12. Contact</h2>
<p>Pentru orice întrebări legate de această politică de confidențialitate, ne puteți contacta:</p>
<ul>
<li>Email: dentcraftsm@gmail.com</li>
<li>Telefon: 0741 199 977</li>
<li>Adresa: Str. Barbu Ștefănescu Delavrancea nr.3, Satu Mare, Romania</li>
</ul>
      `,
    },

    cookies: {
      id: 'cookies',
      title: 'Politica de Cookie-uri',
      lastUpdated: '2026-02-26',
      content: `
<h2>1. Ce sunt cookie-urile?</h2>
<p>Cookie-urile sunt fișiere mici de text stocate pe dispozitivul dumneavoastră (computer, telefon, tabletă) atunci când vizitați site-ul nostru web. Acestea ne ajută să va oferim o experiență mai bună de navigare și să înțelegem cum este utilizat site-ul.</p>

<h2>2. Tipuri de cookie-uri utilizate</h2>

<h3>2.1 Cookie-uri esențiale (strict necesare)</h3>
<p>Aceste cookie-uri sunt necesare pentru funcționarea de bază a site-ului și nu pot fi dezactivate. Ele includ:</p>
<ul>
<li><strong>Preferință de limba:</strong> stochează limba selectată (română, engleză sau maghiara)</li>
<li><strong>Consimțământul cookie-uri:</strong> memorează preferințele dumneavoastră privind cookie-urile</li>
<li><strong>Securitate:</strong> protecție împotriva atacurilor CSRF și asigurarea securității sesiunii</li>
</ul>
<table>
<thead>
<tr><th>Nume cookie</th><th>Scop</th><th>Durata</th></tr>
</thead>
<tbody>
<tr><td>NEXT_LOCALE</td><td>Preferinta de limba</td><td>1 an</td></tr>
<tr><td>cookie_consent</td><td>Stocarea preferințelor cookie</td><td>1 an</td></tr>
</tbody>
</table>

<h3>2.2 Cookie-uri analitice</h3>
<p>Aceste cookie-uri ne ajută să înțelegem cum este utilizat site-ul, colectând informații anonime despre vizite și interacțiuni. Utilizăm Google Analytics prin Google Tag Manager (GTM).</p>
<table>
<thead>
<tr><th>Nume cookie</th><th>Scop</th><th>Durata</th></tr>
</thead>
<tbody>
<tr><td>_ga</td><td>Identificare unică vizitator (Google Analytics)</td><td>2 ani</td></tr>
<tr><td>_ga_*</td><td>Starea sesiunii (Google Analytics)</td><td>2 ani</td></tr>
<tr><td>_gid</td><td>Identificare unică vizitator (Google Analytics)</td><td>24 ore</td></tr>
</tbody>
</table>

<h3>2.3 Cookie-uri de marketing</h3>
<p>Aceste cookie-uri sunt utilizate pentru a va afișa reclame relevante și pentru a măsura eficacitatea campaniilor publicitare.</p>
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
<p>La prima vizită pe site-ul nostru, veți vedea un banner care va permite sa:</p>
<ul>
<li>Acceptați toate cookie-urile</li>
<li>Acceptați doar cookie-urile esentiale</li>
<li>Personalizați preferințele pentru fiecare categorie de cookie-uri</li>
</ul>
<p>Puteți modifica preferințele oricând accesând setările de cookie-uri din subsolul paginii.</p>

<h3>3.2 Prin setările browserului</h3>
<p>Puteți gestiona sau șterge cookie-urile direct din browserul dumneavoastra:</p>
<ul>
<li><strong>Chrome:</strong> Setări &gt; Confidențialitate și securitate &gt; Cookie-uri</li>
<li><strong>Firefox:</strong> Setări &gt; Confidențialitate și securitate &gt; Cookie-uri</li>
<li><strong>Safari:</strong> Preferințe &gt; Confidențialitate &gt; Gestionare date site</li>
<li><strong>Edge:</strong> Setări &gt; Cookie-uri și permisiuni site</li>
</ul>
<p><strong>Atentie:</strong> Dezactivarea cookie-urilor esențiale poate afecta funcționarea corecta a site-ului.</p>

<h2>4. Servicii terte</h2>
<p>Site-ul nostru utilizează următoarele servicii terțe care pot plasa cookie-uri:</p>
<ul>
<li><strong>Google Tag Manager:</strong> gestionarea scripturilor de tracking</li>
<li><strong>Google Analytics 4:</strong> analiza traficului site-ului</li>
<li><strong>Google Maps:</strong> afișarea hârtii cu locația clinicii pe pagina de contact</li>
<li><strong>Vercel:</strong> hosting, Vercel Analytics (date anonimizate privind vizitele) și Vercel Speed Insights (măsurarea performanței). Aceste servicii nu utilizează cookie-uri și nu colectează date personale identificabile.</li>
</ul>

<h2>5. Transferul datelor</h2>
<p>Unele servicii terțe pot transfera date în afară Spațiului Economic European (SEE). În aceste cazuri, ne asigurăm că există garanții adecvate conform GDPR (clauze contractuale standard, Cadru de protecție a datelor UE-SUA).</p>

<h2>6. Actualizari</h2>
<p>Această politică poate fi actualizată periodic. Data ultimei actualizări este afișată în partea de sus a paginii.</p>

<h2>7. Contact</h2>
<p>Pentru întrebări despre cookie-uri, contactati-ne:</p>
<ul>
<li>Email: dentcraftsm@gmail.com</li>
<li>Telefon: 0741 199 977</li>
</ul>
      `,
    },

    terms: {
      id: 'terms',
      title: 'Termeni și Condiții',
      lastUpdated: '2026-02-26',
      content: `
<h2>1. Informații generale</h2>
<p>Prezentii Termeni și Condiții reglementează utilizarea site-ului web www.dentcraft.ro și furnizarea serviciilor stomatologice de către DENTCRAFT SRL, cu sediul în Str. Barbu Ștefănescu Delavrancea nr.3, Satu Mare, Romania.</p>
<p>Prin accesarea site-ului si/sau utilizarea serviciilor noastre, sunteți de acord cu acești termeni. Va rugăm să îi citiți cu atentie.</p>

<h2>2. Servicii stomatologice</h2>
<h3>2.1 Natura serviciilor</h3>
<p>DENTCRAFT oferă servicii stomatologice incluzând, dar fără a se limita la:</p>
<ul>
<li>Consultații și diagnostic stomatologic</li>
<li>Stomatologie generală (obturații, extracții, detartraj)</li>
<li>Estetica dentară (fațete, albire dentara)</li>
<li>Implantologie</li>
<li>Ortodontie</li>
<li>Protetica dentara</li>
<li>Endodonție (tratamente de canal)</li>
<li>Chirurgie oro-maxilo-faciala</li>
<li>Pedodonție (stomatologie pediatrica)</li>
<li>Urgențe stomatologice</li>
</ul>
<h3>2.2 Informații pe site</h3>
<p>Informațiile prezentate pe site au caracter informativ și nu constituie sfat medical. Diagnosticul și planul de tratament sunt stabilite exclusiv în urma consultației clinice.</p>
<p>Prețurile afișate pe site sunt orientative și pot varia în funcție de complexitatea cazului. Prețul final va fi comunicat după consultatie.</p>

<h2>3. Programari</h2>
<h3>3.1 Modalități de programare</h3>
<p>Programările pot fi realizate prin:</p>
<ul>
<li>Telefon: 0741 199 977</li>
<li>WhatsApp: 0741 199 977</li>
<li>Formularul de contact de pe site</li>
<li>Email: dentcraftsm@gmail.com</li>
</ul>
<h3>3.2 Anulare și reprogramare</h3>
<p>Va rugăm să ne anunțați cu cel puțin 24 de ore înainte dacă doriți să anulați sau să reprogramați o consultație. Neprezentările repetate fără anunțare prealabilă pot duce la restricționarea posibilitatii de programare online.</p>
<h3>3.3 Intarzieri</h3>
<p>Depunem toate eforturile să respectăm programul. În cazuri excepționale, tratamentele anterioare pot duce la întârzieri minore. Va mulțumim pentru intelegere.</p>

<h2>4. Consimțământul medical</h2>
<p>Înainte de orice tratament, veți fi informat despre:</p>
<ul>
<li>Natura și scopul tratamentului</li>
<li>Alternativele de tratament disponibile</li>
<li>Riscurile și beneficiile asociate</li>
<li>Costul estimat al tratamentului</li>
</ul>
<p>Consimțământul informat va fi obținut în scris pentru proceduri invazive sau complexe.</p>

<h2>5. Plăți și facturare</h2>
<h3>5.1 Modalități de plata</h3>
<p>Acceptăm următoarele modalități de plata:</p>
<ul>
<li>Numerar</li>
<li>Card bancar (Visa, Mastercard)</li>
<li>Transfer bancar</li>
</ul>
<h3>5.2 Facturare</h3>
<p>Factura fiscală va fi emisă pentru toate serviciile prestate, conform legislației în vigoare.</p>
<h3>5.3 Plata în rate</h3>
<p>Pentru tratamente complexe, putem oferi posibilitatea de plată în rate. Detaliile se stabilesc la receptie.</p>

<h2>6. Garantii</h2>
<p>Oferim garanții pentru lucrările protetice și implanturi dentare, conform recomandărilor producătorilor și standardelor profesionale. Condițiile exacte de garanție sunt comunicate pentru fiecare tratament în parte.</p>
<p>Garanția este condiționată de:</p>
<ul>
<li>Respectarea recomandărilor de igienă orala</li>
<li>Prezentarea la controalele periodice programate</li>
<li>Utilizarea normală a lucrărilor dentare</li>
</ul>

<h2>7. Limitarea raspunderii</h2>
<h3>7.1 Servicii medicale</h3>
<p>DENTCRAFT își asuma responsabilitatea pentru calitatea serviciilor medicale prestate, în limita standardelor profesionale în vigoare. Rezultatele tratamentelor pot varia în funcție de particularitățile biologice individuale.</p>
<h3>7.2 Site web</h3>
<p>Informațiile de pe site sunt furnizate "ca atare". Nu garantăm că site-ul va fi disponibil permanent sau fără erori. Nu suntem responsabili pentru eventualele pierderi rezultate din utilizarea sau imposibilitatea utilizării site-ului.</p>

<h2>8. Proprietate intelectuală, marca înregistrată și drepturi de autor</h2>
<h3>8.1 Drepturi de autor</h3>
<p>Întregul conținut al site-ului <strong>dentcraft.ro</strong> — incluzând, dar fără a se limita la: texte, articole, descrieri de servicii, fotografii, imagini, ilustrații, grafice, video-uri, logo-uri, iconițe, design-ul interfeței, codul sursă (HTML, CSS, JavaScript, TypeScript), structura site-ului, paleta de culori, tipografia, animațiile, layout-ul paginilor și orice alt element vizibil sau invizibil — sunt proprietatea exclusivă a <strong>DENTCRAFT SRL</strong> si/sau a colaboratorilor săi autorizați și sunt protejate de Legea nr. 8/1996 privind dreptul de autor și drepturile conexe, precum și de tratatele internaționale aplicabile în materie de proprietate intelectuala.</p>

<h3>8.2 Marca inregistrata</h3>
<p><strong>„DENTCRAFT"</strong>, logo-ul DENTCRAFT, sloganele și elementele de identitate vizuală asociate sunt mărci ce aparțin DENTCRAFT SRL. Orice utilizare neautorizată a denumirii „DENTCRAFT" sau a elementelor de brand — inclusiv în domenii web, conturi de social media, materiale publicitare, ambalaje, semnături de email sau orice alt context comercial — constituie încălcare a drepturilor de proprietate intelectuală și va fi sancționată conform legii.</p>

<h3>8.3 Interdicții exprese</h3>
<p>Fără acordul prealabil scris și explicit al DENTCRAFT SRL, este STRICT INTERZISA orice formă de:</p>
<ul>
<li>Copiere, reproducere, duplicare parțială sau integrală a conținutului site-ului (inclusiv prin „web scraping", capturi automate, descărcări în masă, sau orice alte mijloace tehnice);</li>
<li>Clonare a design-ului, layout-ului, structurii vizuale, codului sursă sau a oricărei componente a site-ului;</li>
<li>Folosire a textelor, articolelor de blog, descrierilor de servicii, recenziilor sau a oricărui alt conținut editorial pentru alte site-uri, publicații, rețele sociale sau materiale comerciale;</li>
<li>Reutilizare a fotografiilor pacienților, ale clinicii, ale echipei medicale, sau a oricăror imagini publicate pe site;</li>
<li>Înregistrare de domenii web, nume comerciale, mărci sau conturi de social media care imita sau folosesc denumirea „DENTCRAFT" ori variante confuzionale (DentCraft, Dent Craft, Dentcraft Satu Mare etc.);</li>
<li>Modificare, adaptare, traducere, decompilare sau realizare de lucrări derivate pe baza conținutului site-ului;</li>
<li>Redistribuire, vânzare, închiriere sau punere la dispoziția publicului a conținutului, în scop comercial sau necomercial.</li>
</ul>

<h3>8.4 Monitorizare și măsuri legale</h3>
<p>DENTCRAFT SRL monitorizează în mod activ utilizarea conținutului și a mărcii sale. Orice încălcare constatată va atrage:</p>
<ul>
<li>Notificare formală de încetare a utilizării ilegale („cease and desist");</li>
<li>Cerere de despăgubiri civile pentru prejudiciul moral și material cauzat;</li>
<li>Sesizarea organelor competente (Oficiul de Stat pentru Invenții și Mărci, Poliția Română, ORDA — Oficiul Roman pentru Drepturile de Autor) și inițierea procedurilor penale acolo unde se impune;</li>
<li>Solicitare către platformele de hosting, registrarii de domenii, rețelele sociale și motoarele de căutare pentru retragerea conținutului contrafăcut, conform procedurilor DMCA și reglementărilor UE aplicabile.</li>
</ul>

<h3>8.5 Citarea autorizata</h3>
<p>Citarea unor fragmente scurte din conținut, în scop informativ, jurnalistic sau educational, este permisă cu condiția indicării clare a sursei (denumirea „DENTCRAFT" și link către <a href="https://www.dentcraft.ro">dentcraft.ro</a>) și fără modificarea sensului original. Pentru orice altă utilizare, contactați-ne în prealabil la dentcraftsm@gmail.com.</p>

<h2>9. Linkuri externe</h2>
<p>Site-ul poate conține linkuri către site-uri terțe. Nu suntem responsabili pentru conținutul sau politicile de confidențialitate ale acestor site-uri.</p>

<h2>10. Forța majora</h2>
<p>Nu suntem responsabili pentru întârzieri sau neexecutarea obligațiilor cauzate de circumstanțe în afară controlului nostru rezonabil (dezastre naturale, pandemii, restricții guvernamentale, etc.).</p>

<h2>11. Legislație aplicabila</h2>
<p>Prezentii termeni sunt guvernati de legislația României. Orice disputa va fi soluționată pe cale amiabilă sau, în caz contrar, de instanțele competente din Satu Mare, Romania.</p>

<h2>12. Modificari</h2>
<p>Ne rezervăm dreptul de a modifica acești termeni. Modificările intră în vigoare la data publicării pe site.</p>

<h2>13. Contact</h2>
<p>Pentru orice întrebări legate de acești termeni și conditii:</p>
<ul>
<li>Email: dentcraftsm@gmail.com</li>
<li>Telefon: 0741 199 977</li>
<li>Adresa: Str. Barbu Ștefănescu Delavrancea nr.3, Satu Mare, Romania</li>
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
<p>DENTCRAFT SRL, located at Str. Barbu Stefanescu Delavrancea nr.3, Satu Mare, Romania (hereinafter "the Clinic", "we"), is committed to protecting the privacy of your personal data in accordance with the General Data Protection Regulation (GDPR - EU Regulation 2016/679) and applicable national legislation.</p>
<p>This privacy policy describes how we collect, use, store, and protect your personal data when you use our website (www.dentcraft.ro) or use our dental services.</p>

<h2>2. Data Controller</h2>
<p><strong>DENTCRAFT SRL</strong></p>
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
<p>These Terms and Conditions govern the use of the website www.dentcraft.ro and the provision of dental services by DENTCRAFT SRL, located at Str. Barbu Stefanescu Delavrancea nr.3, Satu Mare, Romania.</p>
<p>By accessing the website and/or using our services, you agree to these terms. Please read them carefully.</p>

<h2>2. Dental Services</h2>
<h3>2.1 Nature of Services</h3>
<p>DENTCRAFT provides dental services including, but not limited to:</p>
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
<p>DENTCRAFT assumes responsibility for the quality of medical services provided, within the limits of applicable professional standards. Treatment outcomes may vary depending on individual biological characteristics.</p>
<h3>7.2 Website</h3>
<p>Information on the website is provided "as is." We do not guarantee that the website will be available at all times or error-free. We are not responsible for any losses resulting from the use or inability to use the website.</p>

<h2>8. Intellectual Property, Registered Trademark and Copyright</h2>
<h3>8.1 Copyright</h3>
<p>The entire content of <strong>dentcraft.ro</strong> — including, without limitation: texts, articles, service descriptions, photographs, images, illustrations, graphics, videos, logos, icons, interface design, source code (HTML, CSS, JavaScript, TypeScript), site structure, color palette, typography, animations, page layout, and any other visible or invisible element — is the exclusive property of <strong>DENTCRAFT SRL</strong> and/or its authorized collaborators, and is protected by Romanian Law No. 8/1996 on copyright and related rights, as well as applicable international treaties on intellectual property.</p>

<h3>8.2 Registered trademark</h3>
<p><strong>„DENTCRAFT"</strong>, the DENTCRAFT logo, taglines and associated visual identity elements are trademarks owned by DENTCRAFT SRL. Any unauthorized use of the „DENTCRAFT" name or brand elements — including in web domains, social media accounts, advertising materials, packaging, email signatures or any other commercial context — constitutes infringement of intellectual property rights and will be prosecuted under applicable law.</p>

<h3>8.3 Express prohibitions</h3>
<p>Without DENTCRAFT SRL's prior written and explicit consent, the following are STRICTLY PROHIBITED:</p>
<ul>
<li>Copying, reproducing, duplicating part or all of the website content (including via web scraping, automated capture, bulk downloads, or any other technical means);</li>
<li>Cloning the design, layout, visual structure, source code, or any other component of the website;</li>
<li>Using texts, blog articles, service descriptions, reviews, or any other editorial content for other websites, publications, social networks or commercial materials;</li>
<li>Reusing photographs of patients, the clinic, the medical team, or any other images published on the site;</li>
<li>Registering web domains, business names, trademarks, or social media accounts that imitate or use the „DENTCRAFT" name or confusingly similar variants (DentCraft, Dent Craft, Dentcraft Satu Mare, etc.);</li>
<li>Modifying, adapting, translating, decompiling, or creating derivative works based on website content;</li>
<li>Redistributing, selling, renting, or making the content available to the public, for commercial or non-commercial purposes.</li>
</ul>

<h3>8.4 Monitoring and legal action</h3>
<p>DENTCRAFT SRL actively monitors the use of its content and brand. Any infringement detected will result in:</p>
<ul>
<li>Formal cease-and-desist notice;</li>
<li>Civil damages claim for moral and material harm caused;</li>
<li>Referral to competent authorities (Romanian State Office for Inventions and Trademarks, Romanian Police, ORDA — Romanian Copyright Office) and initiation of criminal proceedings where applicable;</li>
<li>Requests to hosting providers, domain registrars, social networks and search engines for takedown of infringing content under DMCA and applicable EU regulations.</li>
</ul>

<h3>8.5 Authorized citation</h3>
<p>Short excerpts may be cited for informational, journalistic, or educational purposes, provided the source is clearly indicated (the name „DENTCRAFT" and a link to <a href="https://www.dentcraft.ro">dentcraft.ro</a>) and the original meaning is preserved. For any other use, please contact us in advance at dentcraftsm@gmail.com.</p>

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
<p>A DENTCRAFT SRL (szekhely: Str. Barbu Stefanescu Delavrancea nr.3, Szatmarnemeti, Romania, a tovabbiakban "Klinika", "mi") elkotelezett az On szemelyes adatainak vedelme irant az Altalanos Adatvedelmi Rendelettel (GDPR - EU 2016/679 rendelet) es a hatalyos nemzeti jogszabalyokkal osszhangban.</p>
<p>Ez az adatvedelmi szabalyzat leirja, hogyan gyujtjuk, hasznaljuk, taroljuk es vedjuk az On szemelyes adatait, amikor a weboldalunkat (www.dentcraft.ro) hasznalja, vagy fogaszati szolgaltatasainkat veszi igenybe.</p>

<h2>2. Adatkezelo</h2>
<p><strong>DENTCRAFT SRL</strong></p>
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
<p>Jelen Felhasznalasi Feltételek a www.dentcraft.ro weboldal hasznalatat es a DENTCRAFT SRL (szekhely: Str. Barbu Stefanescu Delavrancea nr.3, Szatmarnemeti, Romania) altal nyujtott fogaszati szolgaltatasok felteteleit szabalyozzak.</p>
<p>A weboldal elereesevel es/vagy szolgaltatasaink igenybevetelevel elfogadja ezeket a feltételeket. Keruk, olvassa el figyelmesen.</p>

<h2>2. Fogaszati szolgaltatasok</h2>
<h3>2.1 A szolgaltatasok jellege</h3>
<p>A DENTCRAFT fogaszati szolgaltatasokat nyujt, beleertve, de nem kizarolagosan:</p>
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
<p>A DENTCRAFT vallalja a felelosseget a nyujtott orvosi szolgaltatasok minosegerert a hatalyos szakmai szabvanyok keretein belul. A kezelesi eredmenyek az egyeni biológiai sajátosságoktol fuggoen valtozhatnak.</p>
<h3>7.2 Weboldal</h3>
<p>A weboldalon megjeleno informaciok "adott allapotukban" allnak rendelkezesre. Nem garantaljuk, hogy a weboldal mindenkori vagy hibamentes lesz. Nem vallalunk felelosseget a weboldal hasznalataból vagy annak nem lehetseges hasznalatabol eredő karokért.</p>

<h2>8. Szellemi tulajdon, bejegyzett védjegy és szerzői jog</h2>
<h3>8.1 Szerzői jog</h3>
<p>A <strong>dentcraft.ro</strong> weboldal teljes tartalma — beleértve, de nem kizárólag: szövegek, cikkek, szolgáltatásleírások, fényképek, képek, illusztrációk, grafikák, videók, logók, ikonok, felülettervezés, forráskód (HTML, CSS, JavaScript, TypeScript), oldalstruktúra, színpaletta, tipográfia, animációk, oldalelrendezés és bármely más látható vagy láthatatlan elem — a <strong>DENTCRAFT SRL</strong> és/vagy felhatalmazott közreműködőinek kizárólagos tulajdona, és védi a szerzői jogról szóló 8/1996-os román törvény, valamint a szellemi tulajdonra vonatkozó alkalmazható nemzetközi szerződések.</p>

<h3>8.2 Bejegyzett védjegy</h3>
<p>A <strong>„DENTCRAFT"</strong>, a DENTCRAFT logó, a szlogenek és a kapcsolódó vizuális arculati elemek a DENTCRAFT SRL tulajdonában lévő védjegyek. A „DENTCRAFT" név vagy bármely márkaelem engedély nélküli használata — beleértve a webdomain-eket, közösségi média fiókokat, reklámanyagokat, csomagolásokat, e-mail aláírásokat vagy bármely más kereskedelmi kontextust — szellemi tulajdoni jogsértésnek minősül és a törvény szerint büntetendő.</p>

<h3>8.3 Kifejezett tilalmak</h3>
<p>A DENTCRAFT SRL előzetes írásbeli és kifejezett hozzájárulása nélkül SZIGORÚAN TILOS:</p>
<ul>
<li>A weboldal tartalmának részleges vagy teljes másolása, sokszorosítása, duplikálása (beleértve a „web scraping"-et, automatizált rögzítést, tömeges letöltést vagy bármely más technikai eszközt);</li>
<li>A weboldal designjának, elrendezésének, vizuális szerkezetének, forráskódjának vagy bármely más komponensének klónozása;</li>
<li>A szövegek, blogcikkek, szolgáltatásleírások, vélemények vagy bármely más szerkesztői tartalom felhasználása más weboldalakon, kiadványokban, közösségi hálózatokon vagy kereskedelmi anyagokban;</li>
<li>Pácienseink, a klinika, az orvosi csapat fényképeinek vagy bármely más, a webhelyen közzétett képnek az újrafelhasználása;</li>
<li>Olyan webdomainek, cégnevek, védjegyek vagy közösségi média fiókok regisztrációja, amelyek a „DENTCRAFT" nevet utánozzák vagy összetéveszthetően hasonló változatokat használnak (DentCraft, Dent Craft, Dentcraft Szatmárnémeti stb.);</li>
<li>A weboldal tartalmának módosítása, adaptálása, fordítása, dekompilálása vagy származékos művek létrehozása;</li>
<li>A tartalom újraterjesztése, eladása, bérbeadása vagy a nyilvánosság számára történő elérhetővé tétele, kereskedelmi vagy nem kereskedelmi célból.</li>
</ul>

<h3>8.4 Monitorozás és jogi intézkedések</h3>
<p>A DENTCRAFT SRL aktívan figyeli tartalmának és márkájának használatát. Minden észlelt jogsértés a következőkkel jár:</p>
<ul>
<li>Hivatalos felszólítás a jogellenes használat megszüntetésére („cease and desist");</li>
<li>Polgári kártérítési kereset az erkölcsi és anyagi kárért;</li>
<li>Az illetékes hatóságok (Román Találmányi és Védjegyhivatal, Román Rendőrség, ORDA — Román Szerzői Jogi Hivatal) értesítése és büntetőeljárás kezdeményezése, ahol indokolt;</li>
<li>Megkeresés a tárhelyszolgáltatók, domainregisztrátorok, közösségi hálózatok és keresőmotorok felé a hamisított tartalom eltávolítása érdekében, a DMCA és az alkalmazható EU-s szabályozás szerint.</li>
</ul>

<h3>8.5 Engedélyezett hivatkozás</h3>
<p>Rövid részletek idézhetők tájékoztatási, újságírói vagy oktatási célból, feltéve, hogy a forrás egyértelműen feltüntetésre kerül (a „DENTCRAFT" név és link a <a href="https://www.dentcraft.ro">dentcraft.ro</a>-ra), és az eredeti jelentés megőrződik. Bármely más felhasználás esetén kérjük, előzetesen lépjen kapcsolatba velünk a dentcraftsm@gmail.com címen.</p>

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
