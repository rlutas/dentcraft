import type { ServiceContentLocaleFile } from './types'

// Romanian copy for /servicii/[slug]. No prices here (prices live on /preturi),
// no in-house imaging claims, no success-rate statistics, no aligner brand names.

export const serviceContentRo: ServiceContentLocaleFile = {
  labels: {
    introLabel: 'Pe scurt',
    updatedLabel: 'Actualizat',
    updatedValue: 'noiembrie 2026',
    contactTitle: 'Ai o urgență dentară? Sună înainte să vii.',
    contactCall: 'Sună la',
    contactHoursLabel: 'Program',
    contactHours: 'Luni–vineri, 10:00–18:00',
    contactAddressLabel: 'Adresă',
    contactLanguages: 'Vorbim română, engleză și maghiară.',
    linksLabel: 'Vezi și',
  },
  services: {
    // ------------------------------------------------------------------
    'urgente-dentare': {
      intro:
        'O urgență dentară este o problemă care nu poate aștepta o programare obișnuită: durere puternică, umflătură, un dinte rupt sau scos în urma unei lovituri. La DENTCRAFT în Satu Mare primim urgențe de luni până vineri, între 10:00 și 18:00. Sună înainte la 0741 199 977, ca să te putem primi cât mai repede.',
      sections: [
        {
          heading: 'Ce se consideră urgență dentară',
          paragraphs: ['Sună-ne în aceeași zi dacă ai una dintre problemele de mai jos:'],
          bullets: [
            'durere de dinte puternică, care te trezește noaptea sau nu cedează la analgezice;',
            'umflătură la gingie sau la față, mai ales dacă ai și febră;',
            'un dinte rupt, fisurat sau scos complet după o lovitură;',
            'sângerare care nu se oprește după o extracție;',
            'o plombă, o coroană sau o lucrare căzută care doare sau îți rănește limba ori obrazul;',
            'durere și umflătură în jurul unei măsele de minte care erupe.',
          ],
          after:
            'O sensibilitate ușoară la rece sau o plombă căzută care nu doare pot aștepta câteva zile, până la o programare obișnuită. Dacă nu știi în ce categorie te încadrezi, sună-ne și descrie ce simți.',
        },
        {
          heading: 'Ce faci până ajungi la cabinet',
          paragraphs: [],
          bullets: [
            'Durere: poți lua un analgezic obișnuit, de exemplu paracetamol sau ibuprofen, respectând prospectul. Nu pune aspirină sau alte pastile direct pe gingie, pentru că ard țesutul.',
            'Umflătură: pune o compresă rece pe obraz, pe dinafară, câte 10–15 minute, cu pauze. Nu pune căldură și nu înțepa umflătura.',
            'Dinte scos complet: ține-l de coroană, nu de rădăcină. Dacă e murdar, clătește-l scurt cu lapte sau ser fiziologic, fără să-l freci. Păstrează-l în lapte și vino imediat. Cu cât ajungi mai repede, cu atât sunt mai mari șansele să poată fi pus la loc.',
            'Dinte rupt: păstrează fragmentul, clătește gura cu apă călduță și evită să muști pe partea aceea.',
            'Sângerare după extracție: mușcă ferm un tampon de tifon steril timp de 30 de minute. Nu clăti energic și nu fuma.',
            'Lucrare căzută: păstreaz-o și adu-o cu tine. Nu o lipi cu adezivi de uz casnic.',
          ],
          after: 'Nu începe un antibiotic rămas prin casă. Dacă e nevoie de antibiotic, ți-l prescrie medicul după consultație.',
        },
        {
          heading: 'Când mergi direct la spital',
          paragraphs: [
            'Unele situații depășesc ce se poate rezolva într-un cabinet stomatologic. Sună la 112 sau mergi la cea mai apropiată Unitate de Primiri Urgențe (UPU) dacă:',
          ],
          bullets: [
            'umflătura crește repede, spre ochi sau spre gât;',
            'respiri sau înghiți greu;',
            'ai febră mare și te simți rău în general;',
            'ai primit o lovitură puternică la cap sau la față, mai ales cu amețeală sau pierderea cunoștinței;',
            'sângerarea este abundentă și nu se oprește când apeși pe ea.',
          ],
          after:
            'Tot acolo mergi dacă problema apare seara sau în weekend și nu poate aștepta până în prima zi lucrătoare.',
        },
        {
          heading: 'Ce se întâmplă când ajungi la DENTCRAFT',
          paragraphs: [
            'La telefon te întrebăm ce te doare, de când și dacă ai umflătură sau febră. Așa știm cât timp îți trebuie și încercăm să te primim în aceeași zi, în limita programului.',
            'La cabinet, medicul caută cauza durerii și face tratamentul de urgență: drenează un abces, pune un pansament calmant, scoate nervul inflamat, fixează provizoriu o lucrare căzută sau imobilizează un dinte mișcat după o lovitură. Dacă e nevoie de investigații imagistice, îți spunem unde să le faci.',
            'Tratamentul de urgență oprește durerea, dar de obicei nu e cel definitiv. Înainte să pleci, stabilim împreună ce urmează și când revii.',
          ],
        },
      ],
      faqs: [
        {
          question: 'Ce fac dacă mă doare dintele seara sau în weekend?',
          answer:
            'Programul clinicii este luni–vineri, 10:00–18:00. Până atunci, ia un analgezic conform prospectului și pune o compresă rece dacă ai umflătură. Dacă apar febră, o umflătură care crește sau greutate la înghițit, mergi la UPU sau sună la 112. În prima zi lucrătoare, sună-ne la 0741 199 977.',
        },
        {
          question: 'Pot veni fără programare?',
          answer:
            'Te rugăm să suni înainte. Așa știm că vii, te întrebăm câteva lucruri despre durere și îți găsim cel mai apropiat loc liber din ziua respectivă.',
        },
        {
          question: 'Mi-a ieșit un dinte după o lovitură. Se mai poate salva?',
          answer:
            'Uneori da, dacă ajungi foarte repede. Ține dintele de coroană, păstrează-l în lapte și vino imediat. La copii, dinții de lapte scoși nu se pun la loc, dar copilul trebuie văzut de medic, ca să verificăm dintele permanent de dedesubt.',
        },
        {
          question: 'Am o umflătură la gingie, dar nu mă doare. E urgent?',
          answer:
            'Merită văzută cât mai curând. O umflătură la gingie poate fi semnul unui abces, care uneori doare puțin sau deloc. Nu o înțepa, nu pune căldură și sună-ne pentru o programare.',
        },
        {
          question: 'Cât costă tratamentul de urgență?',
          answer:
            'Depinde de ce tratament e nevoie. Medicul îți spune ce urmează să facă și cât costă înainte să înceapă. Lista de prețuri a clinicii o găsești pe pagina Prețuri.',
        },
      ],
      links: [
        { label: 'Contact și hartă', page: '/contact' },
        { label: 'Lista de prețuri', page: '/preturi' },
      ],
    },

    // ------------------------------------------------------------------
    pedodontie: {
      intro:
        'Pedodonția este stomatologia pentru copii: îngrijirea dinților de lapte și a primilor dinți permanenți, de la primul dințișor până în adolescență. La DENTCRAFT în Satu Mare, copiii sunt consultați de Dr. Ghirasim Denisa-Ștefania, care a absolvit și un program de formare psihopedagogică. E bine ca primul control să aibă loc până la vârsta de un an.',
      sections: [
        {
          heading: 'Prima vizită la dentist',
          paragraphs: [
            'Ghidurile de stomatologie pediatrică recomandă primul control când apare primul dinte sau cel târziu la un an. Vizita e scurtă. Copilul se obișnuiește cu scaunul, cu lumina și cu instrumentele, iar medicul se uită la dinți și la gingii. La cei foarte mici, examinarea se poate face cu copilul în brațele părintelui.',
            'Vorbim și despre ce contează acasă: biberon, suzetă, dulciuri, periaj și pasta potrivită vârstei. Dacă e nevoie de tratament, medicul îți explică opțiunile și le planificăm împreună.',
          ],
        },
        {
          heading: 'Cum îl pregătești pe copil',
          paragraphs: [],
          bullets: [
            'Vorbește despre dentist simplu și calm, ca despre doctorul care numără și curăță dințișorii.',
            'Evită cuvinte ca „durere”, „ac” sau „nu-ți fie frică”. De multe ori, chiar ele sperie copilul.',
            'Nu-l amenința cu dentistul când nu vrea să se spele pe dinți.',
            'Alege o oră la care copilul e odihnit și nu e flămând.',
            'Poate veni cu jucăria preferată.',
          ],
        },
        {
          heading: 'Ce tratamente facem la copii',
          paragraphs: [],
          bullets: [
            'controale periodice și periaj profesional;',
            'lac cu fluor, pentru smalț mai rezistent;',
            'sigilarea molarilor permanenți: șanțurile de pe suprafața de mestecat se acoperă cu un material fluid, ca să nu se oprească acolo resturile de mâncare;',
            'tratarea cariilor la dinții de lapte și la cei permanenți;',
            'tratamentul nervului la dinții de lapte, când caria a ajuns adânc;',
            'extracția dinților de lapte care nu mai pot fi salvați sau care încurcă erupția celor permanenți.',
          ],
          after:
            'Dacă dinții încep să crească strâmb sau maxilarele nu se închid corect, te îndrumăm spre Dr. Cozma Ștefana, medicul care se ocupă de ortodonție în clinică.',
        },
        {
          heading: 'De ce contează dinții de lapte',
          paragraphs: [
            'Dinții de lapte cad, dar până atunci au treabă. Copilul mestecă și vorbește cu ei, iar ei păstrează locul pentru dinții permanenți. O carie netratată poate ajunge la nerv și poate da durere sau abces, iar infecția poate afecta dintele permanent care se formează dedesubt. Dacă un dinte de lapte se pierde prea devreme, vecinii se pot înclina în spațiul liber și pot apărea înghesuieli mai târziu.',
          ],
        },
        {
          heading: 'Igiena dentară acasă, pe vârste',
          paragraphs: [],
          bullets: [
            'De la primul dinte până la 3 ani: pastă de dinți cu fluor, cât un bob de orez, de două ori pe zi.',
            'Între 3 și 6 ani: pastă cu fluor, cât un bob de mazăre. Copilul învață să scuipe pasta, fără să clătească mult.',
            'Până pe la 7–8 ani, părintele periază sau măcar verifică periajul.',
            'Fără biberon cu lapte, suc sau ceai îndulcit la culcare.',
          ],
        },
      ],
      faqs: [
        {
          question: 'La ce vârstă îl duc pe copil prima dată la dentist?',
          answer:
            'Când îi apare primul dinte sau cel târziu la un an. Prima vizită e mai mult o cunoaștere: copilul se obișnuiește cu cabinetul, iar tu primești sfaturi de îngrijire pentru vârsta lui.',
        },
        {
          question: 'Copilului meu îi e frică de dentist. Ce faceți?',
          answer:
            'Mergem în ritmul lui. Îi explicăm fiecare pas pe înțelesul lui și îi arătăm instrumentele înainte să le folosim. Dacă într-o zi nu se poate, nu forțăm, ci reprogramăm. Încrederea câștigată acum contează pentru toate vizitele de mai târziu.',
        },
        {
          question: 'Merită tratați dinții de lapte, dacă oricum cad?',
          answer:
            'Da. Unii dinți de lapte rămân în gură până la 11–12 ani. O carie netratată poate da durere și abces, poate afecta dintele permanent de dedesubt și poate duce la pierderea prea devreme a dintelui, cu înghesuieli mai târziu.',
        },
        {
          question: 'Ce este sigilarea și când se face?',
          answer:
            'Sigilarea înseamnă acoperirea șanțurilor de pe molarii permanenți cu un material fluid, care se întărește. Se face fără anestezie și, de obicei, fără frezarea dintelui. Molarii de 6 ani se sigilează de obicei la scurt timp după ce erup, iar cei de 12 ani tot atunci.',
        },
        {
          question: 'Pot sta lângă copil în cabinet?',
          answer:
            'Da, mai ales la copiii mici, care se simt mai liniștiți cu părintele aproape. Uneori, la copiii mai mari, medicul poate propune să încerce singuri. Hotărâți împreună ce e mai bine pentru copilul tău.',
        },
        {
          question: 'Cât de des trebuie să vină copilul la control?',
          answer:
            'De obicei, la 6 luni. Dacă are multe carii sau risc mare de carii, medicul poate recomanda controale mai dese.',
        },
      ],
      links: [{ label: 'Dr. Ghirasim Denisa-Ștefania', doctor: 'denisa-ghirasim' }],
    },

    // ------------------------------------------------------------------
    ortodontie: {
      intro:
        'Ortodonția corectează dinții strâmbi, înghesuiți sau distanțați și felul în care se închid maxilarele. La DENTCRAFT în Satu Mare lucrăm cu aparate fixe metalice și ceramice și cu alignere transparente, pentru copii și pentru adulți. Tratamentul îl conduce Dr. Cozma Ștefana, medic stomatolog în rezidențiat de Ortodonție și Ortopedie Dento-Facială.',
      sections: [
        {
          heading: 'Când e nevoie de aparat dentar',
          paragraphs: [],
          bullets: [
            'dinți înghesuiți, suprapuși sau rotiți;',
            'spații între dinți;',
            'dinții de sus acoperă prea mult dinții de jos sau, invers, dinții de jos ies în față;',
            'dinții din față nu se ating când strângi din dinți (ocluzie deschisă);',
            'mesteci greu sau dinții se tocesc inegal;',
            'la copii: suptul degetului sau respirația pe gură, care pot schimba felul în care cresc maxilarele.',
          ],
          after:
            'Aparatul ajută și sănătatea dinților. Dinții aliniați se curăță mai ușor, iar forțele de mestecat se distribuie mai uniform.',
        },
        {
          heading: 'La ce vârstă se începe',
          paragraphs: [
            'Primul control ortodontic se recomandă pe la 7 ani, când au erupt primii molari și incisivii permanenți. La această vârstă, unele probleme de creștere a maxilarelor se pot corecta mai simplu, cu aparate care ghidează creșterea.',
            'Pentru adulți nu există o limită de vârstă, dacă gingiile și osul sunt sănătoase. Dacă ai inflamații ale gingiilor, le tratăm întâi, iar aparatul vine după.',
          ],
        },
        {
          heading: 'Ce tipuri de aparate folosim',
          paragraphs: [],
          bullets: [
            'Aparat fix metalic: cel mai rezistent și cel mai potrivit pentru cazurile complexe.',
            'Aparat fix ceramic: funcționează la fel, dar bracketurile au culoarea dintelui și se văd mai puțin.',
            'Alignere transparente: gutiere care se schimbă pe rând și se poartă aproximativ 22 de ore pe zi. Se scot la masă și la periaj. Nu se potrivesc pentru orice caz, așa că discutăm la consultație dacă sunt o opțiune pentru tine.',
            'Aparate mobile pentru copii: ghidează creșterea maxilarelor și pregătesc locul pentru dinții permanenți.',
          ],
        },
        {
          heading: 'Cum decurge tratamentul',
          paragraphs: [
            'La prima consultație, medicul examinează dinții și mușcătura și face fotografii. Amprenta se ia digital, cu scannerul intraoral Medit i700, fără pasta clasică. Investigațiile imagistice necesare le faci la un centru de specialitate, iar medicul îți spune exact ce îți trebuie.',
            'Pe baza lor primești planul de tratament: ce aparat se potrivește, cât durează aproximativ și ce trebuie să faci tu. Cele mai multe tratamente durează între unu și doi ani, iar cazurile complexe pot dura mai mult.',
            'Cât porți aparatul, vii la control la câteva săptămâni, ca medicul să-l ajusteze și să urmărească progresul. După ce se scoate aparatul, urmează contenția: un fir lipit pe spatele dinților sau o gutieră purtată noaptea, ca dinții să nu se întoarcă la poziția de dinainte.',
          ],
        },
        {
          heading: 'Cum trăiești cu aparatul',
          paragraphs: [],
          bullets: [
            'Primele zile după montare sau după o ajustare pot fi incomode, apoi senzația trece.',
            'Spală-te pe dinți după fiecare masă și folosește periuțe interdentare. Un irigator ajută mult.',
            'Cu aparat fix, evită mâncarea foarte tare sau lipicioasă, care poate dezlipi bracketurile.',
            'Cu alignere, scoate gutierele când mănânci și spală-te pe dinți înainte să le pui la loc.',
          ],
        },
      ],
      faqs: [
        {
          question: 'Doare aparatul dentar?',
          answer:
            'Montarea nu doare. În primele zile și după fiecare ajustare, dinții pot fi sensibili la mestecat, iar disconfortul trece de obicei în câteva zile. Ceara ortodontică ajută dacă un bracket irită obrazul.',
        },
        {
          question: 'Cât durează un tratament ortodontic?',
          answer:
            'De obicei, între unu și doi ani, în funcție de cât de mult trebuie mutați dinții și de cât de bine respecți indicațiile. Durata estimată pentru cazul tău o afli după consultație și după investigații.',
        },
        {
          question: 'Pot purta aparat dentar ca adult?',
          answer:
            'Da. Dinții se pot muta la orice vârstă, dacă gingiile și osul sunt sănătoase. Mulți adulți aleg aparatul ceramic sau alignerele, pentru că se văd mai puțin.',
        },
        {
          question: 'Ce aleg: aparat fix sau alignere?',
          answer:
            'Depinde de caz. Aparatul fix poate face mișcări mai complexe și nu depinde de cât îl porți. Alignerele se văd foarte puțin și se scot la masă, dar funcționează doar dacă le porți aproape toată ziua. La consultație vedem care variantă merge pentru dinții tăi.',
        },
        {
          question: 'Ce se întâmplă după ce scot aparatul?',
          answer:
            'Urmează contenția. Un fir subțire lipit pe spatele dinților sau o gutieră purtată noaptea ține dinții în poziția nouă. Fără contenție, dinții tind să se întoarcă la locul inițial.',
        },
        {
          question: 'Cât de des vin la control?',
          answer:
            'Cu aparat fix, de obicei la 4–8 săptămâni. Cu alignere, controalele pot fi mai rare. Medicul stabilește ritmul pentru tratamentul tău.',
        },
      ],
      links: [{ label: 'Dr. Cozma Ștefana', doctor: 'stefana-cozma' }],
    },

    // ------------------------------------------------------------------
    detartraj: {
      intro:
        'Detartrajul este curățarea profesională a tartrului și a plăcii bacteriene de pe dinți și de sub marginea gingiei, de unde periuța nu le poate scoate. Igienizarea la DENTCRAFT în Satu Mare o face Dr. Fernea Remus, certificat în Guided Biofilm Therapy, cu aparatură AIRFLOW, PERIOFLOW și PIEZON. Pentru cei mai mulți pacienți, o ședință la 6 luni este suficientă.',
      sections: [
        {
          heading: 'De ce nu ajunge periajul',
          paragraphs: [
            'Placa bacteriană este un strat moale care se formează pe dinți în fiecare zi. Periajul și ața o îndepărtează pe cea mai mare parte, dar rămân mereu zone greu accesibile. Acolo, în câteva zile, placa se întărește și devine tartru, iar tartrul nu se mai poate scoate cu periuța.',
            'Tartrul irită gingia. Primul semn este gingivita: gingii roșii, umflate, care sângerează la periaj. Netratată, inflamația poate trece în parodontită: gingia se retrage, osul din jurul dinților scade, iar dinții se pot mișca.',
          ],
        },
        {
          heading: 'Cum lucrăm: Guided Biofilm Therapy',
          paragraphs: [
            'Guided Biofilm Therapy (GBT) este un protocol de igienizare dezvoltat de EMS și Swiss Dental Academy. Dr. Fernea Remus s-a certificat în 2026. Pe scurt, ședința arată așa:',
          ],
          bullets: [
            'Evaluare: medicul verifică dinții și gingiile și colorează placa cu un revelator, ca să se vadă exact unde a rămas.',
            'AIRFLOW: un jet de aer, apă și pulbere fină îndepărtează placa și petele de pe dinți, de pe lucrări, de pe implanturi și de pe aparatele ortodontice.',
            'PERIOFLOW: un vârf subțire curăță zonele de sub gingie, acolo unde s-au format pungi ușoare.',
            'PIEZON: ultrasunetele scot tartrul care a mai rămas, fără să atingă inutil suprafețele deja curate.',
            'Control final și sfaturi de igienă potrivite pentru gura ta.',
          ],
        },
        {
          heading: 'Cât de des să faci detartraj',
          paragraphs: [
            'Pentru cei mai mulți oameni, o ședință la 6 luni ține gingiile sănătoase. Medicul poate recomanda una la 3–4 luni dacă ai boală parodontală, implanturi, aparat dentar sau diabet, dacă fumezi sau dacă tartrul se depune repede la tine.',
          ],
        },
        {
          heading: 'Când e nevoie de parodontolog',
          paragraphs: [
            'Dacă la evaluare găsim pungi adânci între gingie și dinte, retracții sau dinți care se mișcă, igienizarea obișnuită nu mai ajunge. În clinică lucrează Dr. Tincu Giovana-Nicoleta, medic specialist parodontolog. Ea evaluează gingiile și face tratamentul parodontal, iar apoi igienizările de întreținere se fac după planul stabilit împreună.',
          ],
        },
        {
          heading: 'După ședință',
          paragraphs: [],
          bullets: [
            'O ușoară sensibilitate la rece sau o sângerare mică a gingiilor în primele 1–2 zile sunt normale când gingiile erau inflamate.',
            'Spală-te pe dinți de două ori pe zi, cu o periuță moale, și curăță spațiile dintre dinți cu ață sau cu periuțe interdentare.',
            'Dacă gingiile sângerează și după o săptămână, spune-ne.',
          ],
        },
      ],
      faqs: [
        {
          question: 'Doare detartrajul?',
          answer:
            'De obicei nu. Poți simți vibrații, apă rece sau o ușoară sensibilitate, mai ales unde gingia e inflamată. Dacă ai dinți foarte sensibili, spune-i medicului de la început. Ședința se poate face mai blând, iar la nevoie se folosește un anestezic local.',
        },
        {
          question: 'Se strică smalțul de la detartraj?',
          answer:
            'Nu. Ultrasunetele și jetul de pulbere curăță depunerile, nu smalțul. Tartrul lăsat pe dinți face rău, pentru că întreține inflamația gingiilor.',
        },
        {
          question: 'Cât durează o ședință?',
          answer:
            'De obicei, între jumătate de oră și o oră, în funcție de cât tartru s-a depus și de starea gingiilor.',
        },
        {
          question: 'Pot face detartraj dacă am implanturi sau aparat dentar?',
          answer:
            'Da, și e chiar recomandat. Pulberea AIRFLOW și vârfurile folosite în protocolul GBT sunt potrivite pentru implanturi, coroane și aparate ortodontice. Igienizarea regulată protejează gingia din jurul implanturilor.',
        },
        {
          question: 'De ce îmi sângerează gingiile după detartraj?',
          answer:
            'Pentru că erau deja inflamate. După ce tartrul e îndepărtat, gingia se vindecă de obicei în câteva zile, iar sângerarea scade. Dacă nu se oprește după o săptămână, vino la control.',
        },
        {
          question: 'Cât de des trebuie făcut detartrajul?',
          answer:
            'La cei mai mulți oameni, o dată la 6 luni. Dacă ai boală parodontală, implanturi, aparat dentar sau fumezi, medicul îți poate recomanda o ședință la 3–4 luni.',
        },
      ],
      links: [
        { label: 'Dr. Fernea Remus', doctor: 'remus-fernea' },
        { label: 'Dr. Tincu Giovana-Nicoleta, parodontolog', doctor: 'giovana-tincu' },
      ],
    },

    // ------------------------------------------------------------------
    'implanturi-dentare': {
      intro:
        'Un implant dentar este un șurub mic din titan, inserat în os, care ține locul rădăcinii unui dinte pierdut. Peste el se montează o coroană, o punte sau o arcadă întreagă. La DENTCRAFT în Satu Mare, implantul îl inserează Dr. Buterchi Codruț-Ciprian, medic specialist în chirurgie dento-alveolară, iar lucrarea de pe implant o face Dr. Petric Răzvan-Tudor.',
      sections: [
        {
          heading: 'Cine poate primi un implant',
          paragraphs: [
            'Implantul se potrivește majorității adulților care au pierdut unul sau mai mulți dinți, după ce maxilarele și-au terminat creșterea. Contează cât os există în zona respectivă și cât de sănătoase sunt gingiile.',
            'La consultație, spune-i medicului dacă ai diabet, dacă fumezi, dacă iei medicamente pentru osteoporoză sau anticoagulante și dacă ai făcut radioterapie în zona capului. Nu exclud neapărat implantul, dar schimbă planul și îngrijirea de după. Dacă ai boală parodontală, o tratăm înainte.',
          ],
        },
        {
          heading: 'Un dinte, mai mulți dinți sau toată arcada',
          paragraphs: [],
          bullets: [
            'Un singur dinte lipsă: un implant și o coroană. Dinții vecini nu trebuie șlefuiți, cum se întâmplă la o punte clasică.',
            'Mai mulți dinți lipsă unul lângă altul: o punte susținută de două sau mai multe implanturi.',
            'Toți dinții de pe o arcadă: o lucrare fixă pe 4–6 implanturi (All-on-X) sau o proteză care se prinde pe implanturi.',
          ],
        },
        {
          heading: 'All-on-X: dinți ficși pe toată arcada',
          paragraphs: [
            'All-on-X este o soluție pentru cine a pierdut toți dinții de pe o arcadă sau are dinți care nu mai pot fi salvați. Lucrarea are toți dinții arcadei și se fixează pe 4–6 implanturi. „X” vine de la numărul de implanturi, care diferă de la caz la caz.',
            'Implanturile din spate se pot insera înclinat, ca să folosească osul care există și să ocolească sinusul sau nervul din mandibulă. Așa, de multe ori nu mai e nevoie de adiție de os. Lucrarea este fixă: nu se scoate seara, iar tu o cureți ca pe dinții naturali, cu periuță și irigator.',
            'Dacă implanturile au stabilitate bună la inserare, se poate monta o lucrare provizorie fixă la scurt timp după operație. Lucrarea definitivă se face după ce implanturile s-au integrat în os. Dacă soluția se potrivește pentru tine, afli după consultație și după investigații.',
          ],
        },
        {
          heading: 'Când osul nu ajunge: adiția de os și sinus lift',
          paragraphs: [
            'După ce se pierde un dinte, osul din zona aceea scade treptat. În maxilarul de sus, în zona molarilor, sinusul poate coborî în locul rămas liber. Dacă nu e destul os pentru implant, se poate adăuga.',
            'Sinus liftul înseamnă ridicarea ușoară a membranei sinusului și umplerea spațiului de sub ea cu material de adiție osoasă. Când lipsesc doar câțiva milimetri, ridicarea se face chiar prin locul implantului (sinus lift intern). Când e nevoie de mai mult os, se lucrează printr-o mică fereastră laterală (sinus lift extern). Uneori implantul se pune în aceeași ședință, alteori după câteva luni, când osul nou s-a format.',
            'Dacă ai nevoie de adiție de os sau de sinus lift se vede din investigațiile imagistice, pe care le faci la un centru de specialitate, la recomandarea medicului.',
          ],
        },
        {
          heading: 'Îngrijirea implantului pe termen lung',
          paragraphs: [
            'Un implant nu face carii, dar gingia din jurul lui se poate inflama, la fel ca la un dinte natural. Netratată, inflamația poate ajunge la os (periimplantită). Ca să o eviți, periază-te de două ori pe zi, folosește periuțe interdentare sau irigator și vino la control și igienizare profesională cel puțin o dată pe an, ideal la 6 luni. Fumatul crește riscul de complicații.',
          ],
        },
      ],
      faqs: [
        {
          question: 'Pot primi implant dacă sunt în vârstă?',
          answer:
            'Da. Vârsta în sine nu e o problemă. Contează starea generală de sănătate, cantitatea de os și dacă poți păstra igiena din jurul implantului. Medicul le evaluează pe toate la consultație.',
        },
        {
          question: 'Ce înseamnă All-on-X și cui i se potrivește?',
          answer:
            'Este o lucrare fixă cu toți dinții unei arcade, prinsă pe 4–6 implanturi. Se potrivește celor care au pierdut toți dinții de pe o arcadă sau ale căror dinți nu mai pot fi salvați și care nu vor o proteză mobilă.',
        },
        {
          question: 'Ce este sinus liftul și doare?',
          answer:
            'Sinus liftul este o intervenție prin care se adaugă os în maxilarul de sus, sub sinus, ca să încapă implantul. Se face sub anestezie locală. După intervenție, umflătura și disconfortul din primele zile se țin sub control cu medicația recomandată de medic.',
        },
        {
          question: 'Rămân fără dinți cât timp se vindecă implantul?',
          answer:
            'Nu neapărat. În multe cazuri se poate purta o lucrare provizorie, mobilă sau fixă, până la cea definitivă. Medicul îți spune la consultație ce variantă e posibilă în cazul tău.',
        },
        {
          question: 'Pot pune implant dacă fumez sau am diabet?',
          answer:
            'De multe ori da, dar riscul de complicații e mai mare. Diabetul trebuie să fie bine controlat, iar renunțarea la fumat, sau măcar reducerea lui în perioada de vindecare, ajută mult. Spune-i medicului de la început, ca să adapteze planul.',
        },
        {
          question: 'Cât rezistă un implant?',
          answer:
            'Un implant bine integrat poate rezista foarte mulți ani, dacă e îngrijit. Ce contează cel mai mult este igiena zilnică, controalele regulate și evitarea fumatului. Coroana de pe implant se poate uza în timp și se poate înlocui fără să fie atins implantul.',
        },
      ],
      links: [
        { label: 'Dr. Buterchi Codruț-Ciprian', doctor: 'codrut-buterchi' },
        { label: 'Dr. Petric Răzvan-Tudor', doctor: 'razvan-petric' },
        { label: 'Lista de prețuri', page: '/preturi' },
      ],
    },

    // ------------------------------------------------------------------
    endodontie: {
      intro:
        'Tratamentul de canal (endodonția) salvează un dinte al cărui nerv s-a inflamat sau s-a infectat, de obicei din cauza unei carii adânci, a unei fisuri sau a unei lovituri. Medicul curăță și dezinfectează canalele din rădăcină, apoi le sigilează. În clinica DENTCRAFT din Satu Mare, de tratamentele de canal se ocupă Dr. Ghirasim Denisa-Ștefania.',
      sections: [
        {
          heading: 'Semne că ai nevoie de tratament de canal',
          paragraphs: [],
          bullets: [
            'durere puternică sau pulsatilă, care apare singură, uneori noaptea;',
            'sensibilitate la cald sau la rece care rămâne mult după ce ai terminat de băut;',
            'durere când muști sau când apeși pe dinte;',
            'o umflătură sau un „coș” pe gingie, lângă dinte;',
            'un dinte care s-a închis la culoare după o lovitură.',
          ],
          after:
            'Uneori, dintele cu nervul mort nu doare deloc, iar problema se vede abia la control. Diagnosticul îl pune medicul, după examinare, teste de sensibilitate și investigațiile imagistice de care e nevoie.',
        },
        {
          heading: 'Cum decurge tratamentul',
          paragraphs: [
            'Totul se face sub anestezie locală. Dintele se izolează, ca să nu intre salivă în canale. Medicul deschide dintele, scoate nervul inflamat sau infectat, curăță și modelează canalele cu instrumente fine și le spală cu soluții dezinfectante. La final, canalele se umplu și se sigilează.',
            'Un tratament se poate termina într-o ședință sau în două-trei. Dacă există infecție, medicul poate pune un pansament cu medicament în canale și termină la vizita următoare.',
          ],
        },
        {
          heading: 'Ce urmează după tratamentul de canal',
          paragraphs: [
            'Un dinte tratat de canal e mai fragil, pentru că a pierdut mult din structură. De multe ori, pe lângă obturație, are nevoie de o protecție suplimentară: o reconstituire cu un pivot sau o coroană. Medicul îți spune ce variantă e potrivită pentru dintele tău.',
            'În primele zile, dintele poate fi sensibil la mestecat. Evită să muști tare pe el până la restaurarea definitivă.',
          ],
        },
        {
          heading: 'Retratamentul de canal',
          paragraphs: [
            'Uneori, un dinte tratat de canal cu ani în urmă începe din nou să doară sau se infectează. Cauza poate fi un canal netratat, o sigilare incompletă sau o carie nouă sub plombă. Retratamentul înseamnă scoaterea vechii umpluturi, curățarea din nou a canalelor și sigilarea lor. Dacă dintele mai poate fi salvat astfel, se decide după evaluare.',
          ],
        },
      ],
      faqs: [
        {
          question: 'Doare tratamentul de canal?',
          answer:
            'În timpul tratamentului nu ar trebui să simți durere, pentru că zona e anesteziată. După tratament, dintele poate fi sensibil câteva zile, iar disconfortul se calmează de obicei cu un analgezic obișnuit.',
        },
        {
          question: 'Câte ședințe sunt necesare?',
          answer:
            'Între una și trei, în funcție de numărul de canale, de forma lor și de existența unei infecții. După prima ședință știi câte mai urmează.',
        },
        {
          question: 'Nu e mai simplu să scot dintele?',
          answer:
            'Pe moment poate părea mai simplu, dar un dinte pierdut trebuie înlocuit mai târziu cu un implant sau cu o punte, iar dinții vecini se pot înclina în spațiul liber. Dacă dintele poate fi salvat, păstrarea lui e de obicei varianta mai bună.',
        },
        {
          question: 'Trebuie pusă coroană după tratamentul de canal?',
          answer:
            'Nu întotdeauna, dar des. Molarii și premolarii tratați de canal au nevoie de multe ori de o coroană, ca să nu se fractureze la mestecat. La dinții din față, o obturație bună poate fi suficientă.',
        },
        {
          question: 'Pot mânca după tratament?',
          answer:
            'Da, după ce trece efectul anesteziei, ca să nu-ți muști buza sau obrazul. Până la restaurarea definitivă, mestecă pe partea cealaltă și evită alimentele foarte tari.',
        },
      ],
    },

    // ------------------------------------------------------------------
    'chirurgie-oro-maxilo-faciala': {
      intro:
        'Chirurgia dentară cuprinde intervențiile din gură care se fac sub anestezie locală: extracții simple și complicate, scoaterea măselelor de minte incluse, mici intervenții pe gingie și os și pregătirea pentru implanturi. La DENTCRAFT în Satu Mare, aceste intervenții le face Dr. Buterchi Codruț-Ciprian, medic specialist în chirurgie dento-alveolară.',
      sections: [
        {
          heading: 'Ce intervenții facem',
          paragraphs: [],
          bullets: [
            'extracții de dinți care nu mai pot fi salvați;',
            'extracția măselelor de minte, inclusiv a celor rămase în os sau sub gingie;',
            'rezecția apicală: îndepărtarea vârfului rădăcinii infectat, când tratamentul de canal nu mai ajunge;',
            'intervenții pentru pregătirea unei proteze sau a unui implant, de exemplu regularizarea osului;',
            'inserarea implanturilor dentare și adiția de os, inclusiv sinus lift.',
          ],
          after:
            'Situațiile care cer anestezie generală sau internare, cum sunt fracturile de maxilar, se tratează în spital, iar noi te îndrumăm acolo.',
        },
        {
          heading: 'Măselele de minte: când se scot',
          paragraphs: [
            'Nu orice măsea de minte trebuie scoasă. Dacă a erupt drept, are loc și poate fi curățată, poate rămâne. Recomandăm extracția atunci când:',
          ],
          bullets: [
            'gingia de deasupra se inflamează des și doare (pericoronarită);',
            'măseaua e înclinată și împinge sau strică molarul din fața ei;',
            'are carie și nu poate fi tratată sau curățată bine;',
            'în jurul ei s-a format un chist.',
          ],
        },
        {
          heading: 'Cum te pregătești pentru intervenție',
          paragraphs: [
            'La consultație, spune-i medicului ce medicamente iei, mai ales anticoagulante sau medicamente pentru osteoporoză, și dacă ai boli cronice. Investigațiile imagistice necesare le faci la un centru de specialitate, la recomandarea medicului. În ziua intervenției, mănâncă normal înainte și vino odihnit.',
          ],
        },
        {
          heading: 'După extracție: ce e normal și ce nu',
          paragraphs: [],
          bullets: [
            'Mușcă tamponul de tifon 30 de minute, ca să se formeze cheagul.',
            'Pune comprese reci pe obraz în primele ore, câte 10–15 minute.',
            'În prima zi nu clăti energic, nu bea cu paiul și nu fuma, ca să nu se desprindă cheagul.',
            'Mănâncă moale și călduț, pe partea cealaltă.',
            'O ușoară umflătură și disconfort 2–3 zile sunt normale.',
          ],
          after:
            'Sună-ne dacă sângerarea nu se oprește, dacă durerea crește după a treia zi, dacă ai febră sau dacă umflătura se mărește în loc să scadă.',
        },
      ],
      faqs: [
        {
          question: 'Doare extracția unei măsele de minte?',
          answer:
            'În timpul intervenției nu simți durere, ci doar presiune, pentru că zona e anesteziată. După intervenție pot apărea umflătură și disconfort câteva zile, pe care le ții sub control cu medicația recomandată de medic.',
        },
        {
          question: 'Cât durează vindecarea după o extracție?',
          answer:
            'Gingia se închide de obicei în una-două săptămâni. Osul se reface în câteva luni. Dacă s-au pus fire, se scot de obicei după aproximativ 7–10 zile, la control.',
        },
        {
          question: 'Pot merge la muncă a doua zi?',
          answer:
            'După o extracție simplă, de obicei da. După scoaterea unei măsele de minte incluse, e bine să-ți iei o zi sau două de odihnă și să eviți efortul fizic.',
        },
        {
          question: 'Ce este alveolita și cum o evit?',
          answer:
            'Alveolita apare când cheagul din locul extracției se desprinde sau se infectează. Durerea crește de obicei la 2–4 zile după intervenție. O eviți dacă nu fumezi, nu clătești energic și nu bei cu paiul în primele zile. Dacă apare, vino la control.',
        },
        {
          question: 'Trebuie să opresc anticoagulantele înainte de extracție?',
          answer:
            'Nu le opri singur. Spune-i medicului ce iei, iar el stabilește, la nevoie împreună cu medicul tău curant, cum procedați.',
        },
      ],
    },

    // ------------------------------------------------------------------
    'stomatologie-generala': {
      intro:
        'Stomatologia generală înseamnă îngrijirea de bază a dinților: controale, tratarea cariilor, plombe, igienizări și sfaturi de prevenție. Aici începe aproape orice tratament. La DENTCRAFT în Satu Mare, medicul te examinează, îți explică ce a găsit și, dacă e nevoie de un specialist din echipă, te îndrumă spre el.',
      sections: [
        {
          heading: 'Ce include stomatologia generală',
          paragraphs: [],
          bullets: [
            'consultații și controale periodice;',
            'tratamentul cariilor și obturații (plombe) în culoarea dintelui;',
            'înlocuirea plombelor vechi, fisurate sau infiltrate;',
            'tratarea sensibilității dentare;',
            'igienizare profesională și sfaturi de igienă acasă;',
            'îndrumare spre colegii din echipă pentru tratamente de canal, chirurgie, ortodonție, parodontologie sau lucrări protetice.',
          ],
        },
        {
          heading: 'Cariile: de ce e bine să le prinzi devreme',
          paragraphs: [
            'O carie mică, prinsă la control, se tratează simplu, cu o plombă. Lăsată netratată, ajunge mai adânc, la nerv, și atunci e nevoie de tratament de canal și, de multe ori, de o coroană. Cariile mici de obicei nu dor, așa că le găsește medicul la control, nu tu.',
          ],
        },
        {
          heading: 'Cât de des să vii la control',
          paragraphs: [
            'Pentru cei mai mulți adulți, un control și o igienizare la 6 luni sunt suficiente. Dacă ai multe lucrări, gingii sensibile sau carii frecvente, medicul poate recomanda controale mai dese. Controlul durează puțin, iar o problemă prinsă devreme se tratează mai ușor.',
          ],
        },
        {
          heading: 'Ce poți face acasă',
          paragraphs: [],
          bullets: [
            'Spală-te pe dinți de două ori pe zi, câte două minute, cu pastă cu fluor.',
            'Curăță zilnic spațiile dintre dinți, cu ață sau periuțe interdentare.',
            'Limitează gustările dulci și băuturile acide între mese.',
            'Schimbă periuța la 3 luni sau mai devreme, dacă perii s-au deformat.',
          ],
        },
      ],
      faqs: [
        {
          question: 'Ce fel de plombe folosiți?',
          answer:
            'Folosim obturații din compozit, în culoarea dintelui. Se lipesc de dinte și se modelează direct în gură, într-o singură ședință.',
        },
        {
          question: 'Plombele vechi de amalgam trebuie schimbate?',
          answer:
            'Nu neapărat. Dacă sunt intacte și dintele e sănătos, pot rămâne. Le înlocuim când sunt fisurate, când a apărut carie pe margine sau când îți dorești un aspect mai natural.',
        },
        {
          question: 'De ce am dinți sensibili la rece?',
          answer:
            'Cauzele des întâlnite sunt retracția gingiei, smalțul tocit, o carie sau o plombă infiltrată. Medicul caută cauza la control. Până atunci, o pastă pentru dinți sensibili poate ajuta.',
        },
        {
          question: 'Cât durează o plombă?',
          answer:
            'De obicei, între jumătate de oră și o oră pentru un dinte, în funcție de mărimea cariei.',
        },
      ],
    },

    // ------------------------------------------------------------------
    'consultatie-stomatologica': {
      intro:
        'Consultația stomatologică este prima vizită la DENTCRAFT: medicul îți examinează dinții, gingiile și mușcătura, ascultă ce te deranjează și îți explică ce a găsit. Pleci cu un plan de tratament și cu prețul estimat, înainte să începi orice tratament. Clinica este în Satu Mare, iar consultațiile se fac în română, engleză sau maghiară.',
      sections: [
        {
          heading: 'Ce se întâmplă la consultație',
          paragraphs: [],
          bullets: [
            'discutăm despre ce te deranjează, despre tratamentele avute și despre starea ta de sănătate;',
            'medicul examinează fiecare dinte, gingiile, mușcătura și țesuturile moi din gură;',
            'dacă e nevoie, facem fotografii și o scanare digitală a dinților cu scannerul intraoral Medit i700;',
            'dacă sunt necesare investigații imagistice, îți spunem ce și unde să faci;',
            'îți explicăm variantele de tratament, cu avantajele și limitele fiecăreia.',
          ],
        },
        {
          heading: 'Ce primești după consultație',
          paragraphs: [
            'Primești un plan de tratament cu etapele, numărul aproximativ de ședințe și prețul estimat. Dacă există mai multe variante, le vezi pe toate și alegi tu. Nu începem niciun tratament fără acordul tău.',
          ],
        },
        {
          heading: 'Ce să aduci',
          paragraphs: [],
          bullets: [
            'lista medicamentelor pe care le iei;',
            'investigațiile imagistice recente, dacă ai;',
            'scrisori medicale sau rezultate de analize relevante, de exemplu dacă ai diabet sau iei anticoagulante;',
            'întrebările pe care vrei să le pui, notate dinainte.',
          ],
        },
        {
          heading: 'Când e cazul să vii la o consultație',
          paragraphs: [
            'Vino dacă ai o durere, o sensibilitate sau o umflătură, dacă gingiile sângerează, dacă ți-a căzut o plombă sau dacă vrei să știi ce opțiuni ai pentru un dinte lipsă, un aparat dentar sau un zâmbet mai luminos. Dacă n-ai mai fost la dentist de mult, o consultație e un început bun.',
          ],
        },
      ],
      faqs: [
        {
          question: 'Cât durează consultația?',
          answer:
            'Depinde de cât de complex e cazul și dacă facem și fotografii și scanare. La programare îți spunem cât timp să-ți rezervi.',
        },
        {
          question: 'Cât costă consultația?',
          answer:
            'Prețul depinde de tipul consultației, de exemplu dacă include și fotografii și scanare. Lista actualizată o găsești pe pagina Prețuri, iar la programare îți spunem exact ce include.',
        },
        {
          question: 'Pot începe tratamentul în aceeași zi?',
          answer:
            'Uneori da, dacă e o urgență sau un tratament simplu și ai timp. De obicei, după consultație îți faci planul în liniște și revii pentru tratament.',
        },
        {
          question: 'Vorbiți engleză sau maghiară?',
          answer:
            'Da. Consultațiile și explicațiile se pot face în română, engleză și maghiară.',
        },
        {
          question: 'Cum fac o programare?',
          answer:
            'Sună la 0741 199 977, de luni până vineri, între 10:00 și 18:00, sau folosește formularul de programare de pe site.',
        },
      ],
      links: [
        { label: 'Lista de prețuri', page: '/preturi' },
        { label: 'Contact', page: '/contact' },
      ],
    },

    // ------------------------------------------------------------------
    protetica: {
      intro:
        'Protetica dentară înlocuiește dinții lipsă și reface dinții foarte distruși, cu coroane, punți, lucrări pe implanturi sau proteze. Scopul e să poți mesteca și vorbi normal și să arate firesc. La DENTCRAFT în Satu Mare, lucrările protetice le planifică și le face Dr. Petric Răzvan-Tudor, iar amprentele se iau digital, cu scannerul Medit i700.',
      sections: [
        {
          heading: 'Ce tipuri de lucrări există',
          paragraphs: [],
          bullets: [
            'Coroana: un „capac” care acoperă complet un dinte slăbit, fisurat sau tratat de canal.',
            'Puntea: înlocuiește unul sau mai mulți dinți lipsă și se sprijină pe dinții vecini, care se șlefuiesc.',
            'Lucrările pe implanturi: coroane, punți sau arcade întregi prinse pe implanturi, fără să atingă dinții vecini.',
            'Inlay și onlay: restaurări făcute în laborator pentru dinți cu pierderi mari, când o plombă nu mai ține, dar o coroană ar fi prea mult.',
            'Protezele mobile: parțiale sau totale, pentru cazurile în care lucrările fixe nu sunt posibile sau nu se doresc.',
          ],
        },
        {
          heading: 'Amprenta digitală',
          paragraphs: [
            'În loc de pasta clasică, amprenta se ia cu scannerul intraoral Medit i700. Scannerul face un model 3D al dinților pe ecran, pe care îl vezi și tu. E mai confortabil, mai ales pentru cei care au reflex de vomă. Dacă ceva nu e bine prins, se rescanează doar zona aceea. Fișierul ajunge digital la laborator.',
          ],
        },
        {
          heading: 'Cum decurge o lucrare protetică',
          paragraphs: [
            'Mai întâi se tratează cariile, gingiile și eventualele probleme de canal. Apoi dinții se pregătesc, se ia amprenta și primești o lucrare provizorie, ca să nu stai fără dinți. După ce laboratorul face lucrarea, o probăm, verificăm culoarea, forma și mușcătura și abia apoi o fixăm definitiv. Pentru o coroană sau o punte sunt de obicei necesare două-trei vizite.',
          ],
        },
        {
          heading: 'Cum îngrijești lucrarea',
          paragraphs: [
            'Lucrarea nu face carii, dar dintele de sub ea și gingia din jur pot avea probleme. Spală-te pe dinți de două ori pe zi, curăță sub punte cu ață specială sau cu irigator și vino la control și igienizare la 6 luni.',
          ],
        },
      ],
      faqs: [
        {
          question: 'Ce aleg: punte sau implant?',
          answer:
            'Puntea e mai rapidă, dar presupune șlefuirea dinților vecini. Implantul nu atinge dinții vecini, dar are nevoie de os suficient și de câteva luni de vindecare. Medicul îți explică ce se potrivește în cazul tău.',
        },
        {
          question: 'Din ce material se fac coroanele?',
          answer:
            'Cele mai folosite sunt zirconia și ceramica integrală. Zirconia e foarte rezistentă și potrivită pentru dinții din spate, iar ceramica integrală arată foarte natural în zona din față. Alegerea depinde de dinte, de mușcătură și de cât de mult contează aspectul.',
        },
        {
          question: 'Cât timp stau cu lucrarea provizorie?',
          answer:
            'De obicei, una-două săptămâni pentru o coroană sau o punte simplă. La lucrările pe implanturi sau la reabilitările mari, provizoriul poate rămâne mai mult.',
        },
        {
          question: 'Cât rezistă o coroană?',
          answer:
            'O coroană bine făcută și îngrijită poate rezista mulți ani. Contează igiena, controalele regulate și dacă scrâșnești din dinți. Pentru bruxism se poate face o gutieră de protecție pentru noapte.',
        },
      ],
    },

    // ------------------------------------------------------------------
    'coroane-dentare': {
      intro:
        'O coroană dentară este o lucrare care acoperă complet un dinte slăbit, rupt sau tratat de canal și îi redă forma, rezistența și culoarea. Se fixează definitiv, deci nu se scoate. La DENTCRAFT în Satu Mare, coroanele le face Dr. Petric Răzvan-Tudor, cu amprentă digitală luată cu scannerul intraoral Medit i700.',
      sections: [
        {
          heading: 'Când ai nevoie de o coroană',
          paragraphs: [],
          bullets: [
            'dintele are o plombă atât de mare încât pereții rămași se pot rupe;',
            'dintele e fisurat sau s-a rupt o bucată din el;',
            'dintele a fost tratat de canal și e mai fragil;',
            'vrei să schimbi forma sau culoarea unui dinte, iar o fațetă nu ajunge;',
            'trebuie acoperit un implant (coroană pe implant).',
          ],
        },
        {
          heading: 'Zirconia sau ceramică integrală',
          paragraphs: [
            'Zirconia este un material foarte rezistent, potrivit pentru molari și premolari, unde forțele de mestecat sunt mari. Ceramica integrală lasă lumina să treacă la fel ca smalțul, așa că arată foarte natural pe dinții din față. Medicul îți recomandă materialul după poziția dintelui, după mușcătură și după cât de mult contează aspectul pentru tine.',
          ],
        },
        {
          heading: 'Etapele unei coroane',
          paragraphs: [],
          bullets: [
            'Pregătirea: dintele se tratează dacă e nevoie, apoi se șlefuiește puțin pe toate fețele, sub anestezie locală.',
            'Amprenta digitală: scannerul face un model 3D al dintelui, fără pastă de amprentă.',
            'Coroana provizorie: o porți până e gata cea definitivă, ca dintele să fie protejat.',
            'Proba și cimentarea: verificăm forma, culoarea și mușcătura, apoi coroana se fixează definitiv.',
          ],
        },
        {
          heading: 'Îngrijirea coroanei',
          paragraphs: [
            'Coroana nu face carii, dar marginea dintelui de sub ea poate face. Periază bine linia dintre coroană și gingie, folosește ață dentară și vino la control la 6 luni. Dacă scrâșnești din dinți noaptea, o gutieră de protecție ajută coroana să reziste mai mult.',
          ],
        },
      ],
      faqs: [
        {
          question: 'Doare șlefuirea dintelui pentru coroană?',
          answer:
            'Nu, pentru că se face sub anestezie locală. După ce trece anestezia, dintele poate fi puțin sensibil câteva zile.',
        },
        {
          question: 'Câte vizite sunt necesare?',
          answer:
            'De obicei două-trei: una pentru pregătire și amprentă, una pentru probă și cimentare, iar uneori o probă în plus pentru culoare, la dinții din față.',
        },
        {
          question: 'Se vede că e coroană?',
          answer:
            'O coroană bine făcută are forma și culoarea dinților vecini. Culoarea se alege la cabinet, iar la dinții din față se pot face probe până ești mulțumit.',
        },
        {
          question: 'Pot face coroană pe un dinte fără nerv?',
          answer:
            'Da, și de multe ori e recomandat. Dinții tratați de canal, mai ales molarii, se pot fisura mai ușor, iar coroana îi protejează. Uneori e nevoie înainte de un pivot, ca să susțină reconstituirea.',
        },
      ],
    },

    // ------------------------------------------------------------------
    'fatete-dentare': {
      intro:
        'Fațetele dentare sunt foițe subțiri de ceramică sau de compozit, lipite pe fața dinților din față. Corectează culoarea, forma, mărimea și spațiile mici dintre dinți, cu o șlefuire minimă. La DENTCRAFT în Satu Mare, fațetele le planifică și le aplică Dr. Petric Răzvan-Tudor, care s-a format în estetică dentară la cursurile Mauro Fradeani Education.',
      sections: [
        {
          heading: 'Când sunt potrivite fațetele',
          paragraphs: [],
          bullets: [
            'dinți pătați, care nu se albesc suficient;',
            'dinți ciobiți sau tociți;',
            'dinți mici, cu forme neregulate sau puțin rotiți;',
            'spații mici între dinții din față.',
          ],
          after:
            'Fațetele nu înlocuiesc aparatul dentar când dinții sunt foarte înghesuiți și nici nu sunt o soluție pentru dinți cu carii netratate sau gingii inflamate. Acestea se rezolvă înainte.',
        },
        {
          heading: 'Ceramică sau compozit',
          paragraphs: [
            'Fațetele ceramice se fac în laborator. Își păstrează culoarea și luciul mult timp și arată foarte natural. Fațetele din compozit se modelează direct pe dinte, de obicei într-o singură ședință. Sunt mai ușor de reparat, dar se pot păta și uza în timp. Pe care o alegi depinde de dinții tăi și de cât de mult vrei să dureze lucrarea fără retușuri.',
          ],
        },
        {
          heading: 'Cum decurge tratamentul',
          paragraphs: [
            'Începem cu o discuție despre ce îți dorești și cu fotografii și scanarea digitală a dinților. Pe baza lor se poate face o machetă a zâmbetului, pe care o probezi în gură înainte să se atingă vreun dinte. Așa vezi forma și lungimea viitoarelor fațete.',
            'Dacă rezultatul îți place, dinții se pregătesc cu o șlefuire minimă, se ia amprenta și primești fațete provizorii. La vizita următoare, fațetele definitive se probează și se lipesc. Pentru fațetele ceramice sunt de obicei necesare câteva vizite în decurs de câteva săptămâni.',
          ],
        },
        {
          heading: 'Cum îngrijești fațetele',
          paragraphs: [
            'Spală-te pe dinți normal, folosește ață dentară și vino la control și igienizare la 6 luni. Evită să muști obiecte tari, cum ar fi pixuri, gheață sau sâmburi, și să deschizi ambalaje cu dinții. Dacă scrâșnești din dinți, poartă noaptea o gutieră de protecție.',
          ],
        },
      ],
      faqs: [
        {
          question: 'Se șlefuiesc dinții pentru fațete?',
          answer:
            'De obicei, foarte puțin, doar o fracțiune de milimetru din smalț. În unele cazuri se poate lucra aproape fără șlefuire. Cât e nevoie se vede din planificare, înainte de orice intervenție.',
        },
        {
          question: 'Cât rezistă fațetele?',
          answer:
            'Fațetele ceramice bine îngrijite pot rezista mulți ani. Cele din compozit au nevoie mai des de lustruire și de reparații. Durata depinde și de igienă, de bruxism și de obiceiuri, cum ar fi rosul unghiilor.',
        },
        {
          question: 'Pot vedea rezultatul înainte?',
          answer:
            'Da. Din fotografii și scanare se face o machetă, pe care o probezi în gură ca să vezi forma viitoarelor fațete. Nimic nu se șlefuiește până nu ești de acord cu forma.',
        },
        {
          question: 'Fațetele se pot albi mai târziu?',
          answer:
            'Nu. Ceramica nu se albește. Dacă vrei dinți mai albi, albirea se face înainte de fațete, ca nuanța lor să se potrivească cu ceilalți dinți.',
        },
      ],
    },

    // ------------------------------------------------------------------
    'albire-dentara': {
      intro:
        'Albirea dentară profesională deschide nuanța dinților cu un gel aplicat și controlat de medic. Funcționează pe petele lăsate de cafea, ceai, vin sau fumat și pe îngălbenirea care vine cu vârsta. La DENTCRAFT în Satu Mare, albirea o faci după o consultație care verifică dacă dinții și gingiile sunt pregătite.',
      sections: [
        {
          heading: 'Pentru cine e potrivită albirea',
          paragraphs: [
            'Albirea dă cele mai bune rezultate pe dinții naturali, îngălbeniți sau pătați la suprafață. Nu schimbă culoarea plombelor, coroanelor sau fațetelor, așa că, dacă ai lucrări pe dinții din față, poate fi nevoie să le înlocuiești după albire, ca să se potrivească nuanța.',
            'Albirea nu se recomandă în timpul sarcinii sau al alăptării și nici pe dinți cu carii netratate sau cu gingii inflamate. Acestea se tratează înainte. Petele adânci, de exemplu cele de la unele medicamente, se albesc greu, iar pentru ele pot fi mai potrivite fațetele.',
          ],
        },
        {
          heading: 'Cum decurge albirea în cabinet',
          paragraphs: [],
          bullets: [
            'Consultație: medicul verifică dinții și gingiile și notează nuanța de pornire.',
            'Igienizare: tartrul și petele de suprafață se îndepărtează înainte, ca gelul să lucreze uniform.',
            'Protecția gingiilor: gingiile se acoperă cu o barieră, ca gelul să nu le atingă.',
            'Aplicarea gelului: gelul de albire stă pe dinți un timp stabilit de medic, apoi se îndepărtează.',
            'Rezultatul: comparăm nuanța nouă cu cea de la început.',
          ],
        },
        {
          heading: 'Sensibilitatea după albire',
          paragraphs: [
            'Mulți pacienți simt o sensibilitate la rece în primele zile. E temporară. O pastă pentru dinți sensibili, folosită cu câteva zile înainte și după, ajută. Dacă știi că ai dinți sensibili, spune-i medicului de la început.',
          ],
        },
        {
          heading: 'Cum păstrezi rezultatul',
          paragraphs: [
            'În primele 48 de ore, evită cafeaua, ceaiul negru, vinul roșu, sosurile colorate și fumatul, pentru că dinții se pătează mai ușor imediat după albire. După aceea, igienizarea la 6 luni și un periaj corect păstrează nuanța mai mult timp. Cât durează efectul depinde mult de obiceiuri.',
          ],
        },
      ],
      faqs: [
        {
          question: 'Albirea strică smalțul?',
          answer:
            'Nu, dacă e făcută corect, sub control medical. Gelul acționează asupra pigmenților din dinte, nu asupra structurii smalțului. Sensibilitatea de după albire e temporară.',
        },
        {
          question: 'Cât de albi devin dinții?',
          answer:
            'Depinde de nuanța de pornire și de tipul petelor. Dinții îngălbeniți se albesc de obicei mai bine decât cei cenușii. Medicul îți spune la consultație la ce te poți aștepta realist.',
        },
        {
          question: 'Pot face albire dacă am coroane sau fațete?',
          answer:
            'Poți, dar lucrările își păstrează culoarea, deci se pot vedea diferențe față de dinții naturali. Discutăm înainte dacă merită albirea și dacă lucrările ar trebui înlocuite apoi.',
        },
        {
          question: 'Cât timp ține efectul?',
          answer:
            'Depinde mult de obiceiuri: cafeaua, ceaiul, vinul și fumatul pătează din nou dinții. Cu igienizări regulate și atenție la alimentație, rezultatul se păstrează mai mult.',
        },
      ],
    },

    // ------------------------------------------------------------------
    'estetica-dentara': {
      intro:
        'Estetica dentară se ocupă de felul în care arată zâmbetul: culoarea, forma și proporțiile dinților și conturul gingiei. Include albirea, fațetele, coroanele ceramice și corecțiile de formă cu compozit. La DENTCRAFT în Satu Mare, planul estetic îl face Dr. Petric Răzvan-Tudor, care s-a format la cursurile Mauro Fradeani Education.',
      sections: [
        {
          heading: 'Ce tratamente intră în estetica dentară',
          paragraphs: [],
          bullets: [
            'albirea profesională, pentru dinți îngălbeniți sau pătați;',
            'fațetele ceramice sau din compozit, pentru formă, culoare și spații mici;',
            'coroanele ceramice, pentru dinți foarte distruși sau cu lucrări vechi care nu mai arată bine;',
            'corecțiile cu compozit: un colț ciobit, un spațiu mic, o margine tocită;',
            'înlocuirea plombelor vechi și închise la culoare de pe dinții din față.',
          ],
          after:
            'Când dinții sunt strâmbi, de multe ori aparatul dentar rezolvă problema mai bine și cu mai puțină șlefuire decât fațetele. Te îndrumăm spre Dr. Cozma Ștefana dacă e cazul.',
        },
        {
          heading: 'Cum planificăm un zâmbet',
          paragraphs: [
            'Începem cu o discuție despre ce te deranjează și ce îți dorești. Facem fotografii și o scanare digitală cu Medit i700. Pe baza lor, medicul analizează proporțiile dinților față de buze și față de fața ta. Când e nevoie, se face o machetă pe care o probezi în gură, ca să vezi cum ar arăta rezultatul înainte să se atingă vreun dinte.',
          ],
        },
        {
          heading: 'Sănătatea vine înainte',
          paragraphs: [
            'Un tratament estetic durează doar pe dinți și gingii sănătoase. De aceea, înainte de fațete sau coroane, tratăm cariile, facem igienizarea și, dacă e nevoie, tratamentul gingiilor. Dacă scrâșnești din dinți, discutăm și despre o gutieră de protecție, ca lucrările noi să nu se ciobească.',
          ],
        },
      ],
      faqs: [
        {
          question: 'De unde încep dacă vreau un zâmbet mai frumos?',
          answer:
            'Cu o consultație. Medicul vede ce te deranjează, verifică sănătatea dinților și a gingiilor și îți propune variantele posibile, de la cele mai simple, cum ar fi albirea, la fațete sau coroane.',
        },
        {
          question: 'Fațete sau albire?',
          answer:
            'Dacă problema e doar culoarea, albirea e de obicei primul pas, pentru că nu atinge dinții. Fațetele se potrivesc când vrei să schimbi și forma, mărimea sau spațiile dintre dinți.',
        },
        {
          question: 'Pot vedea rezultatul înainte de tratament?',
          answer:
            'Da. Din fotografii și din scanarea digitală se poate face o machetă, pe care o probezi în gură. Nimic nu se șlefuiește până nu ești de acord cu forma propusă.',
        },
        {
          question: 'Cât durează un tratament estetic?',
          answer:
            'O albire sau o corecție cu compozit se face de obicei într-o vizită. Fațetele și coroanele ceramice cer câteva vizite, în decurs de câteva săptămâni, pentru că se fac în laborator.',
        },
      ],
    },
  },
}
