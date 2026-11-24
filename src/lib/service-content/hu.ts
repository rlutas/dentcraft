import type { ServiceContentLocaleFile } from './types'

// Hungarian copy for /servicii/[slug], translated from ro.ts. No prices here (prices live on /preturi),
// no in-house imaging claims, no success-rate statistics, no aligner brand names.

export const serviceContentHu: ServiceContentLocaleFile = {
  labels: {
    introLabel: 'Röviden',
    updatedLabel: 'Frissítve',
    updatedValue: '2026. november',
    contactTitle: 'Sürgős fogászati problémád van? Hívj minket, mielőtt elindulsz.',
    contactCall: 'Hívj minket:',
    contactHoursLabel: 'Nyitvatartás',
    contactHours: 'Hétfő–péntek, 10:00–18:00',
    contactAddressLabel: 'Cím',
    contactLanguages: 'Román, angol és magyar nyelven beszélünk.',
    linksLabel: 'Lásd még',
  },
  services: {
    // ------------------------------------------------------------------
    'urgente-dentare': {
      intro:
        'Fogászati sürgősségnek azt a panaszt nevezzük, amely nem várhat egy szokásos időpontig: erős fogfájás, duzzanat, egy letört vagy ütés miatt kiesett fog. Szatmárnémetiben (Satu Mare), a DENTCRAFT rendelőben hétfőtől péntekig, 10:00 és 18:00 között fogadunk sürgős eseteket. Előtte hívj minket a 0741 199 977-es számon, hogy minél hamarabb fogadni tudjunk.',
      sections: [
        {
          heading: 'Mi számít fogászati sürgősségnek',
          paragraphs: ['Hívj minket még aznap, ha az alábbi panaszok valamelyikét tapasztalod:'],
          bullets: [
            'erős fogfájás, amely éjszaka felébreszt, vagy nem múlik el fájdalomcsillapítóra;',
            'duzzanat az ínyen vagy az arcon, főleg, ha lázas is vagy;',
            'letört, megrepedt vagy ütés után teljesen kiesett fog;',
            'foghúzás után el nem álló vérzés;',
            'kiesett tömés, korona vagy pótlás, amely fáj, vagy sebzi a nyelvedet, illetve az arcod belső felét;',
            'fájdalom és duzzanat egy előtörő bölcsességfog körül.',
          ],
          after:
            'Az enyhe hidegérzékenység vagy egy kiesett, de nem fájó tömés várhat néhány napot, egy szokásos időpontig. Ha nem tudod, melyik csoportba tartozol, hívj fel, és mondd el, mit érzel.',
        },
        {
          heading: 'Mit tehetsz, amíg a rendelőbe érsz',
          paragraphs: [],
          bullets: [
            'Fájdalom: bevehetsz egy szokásos fájdalomcsillapítót, például paracetamolt vagy ibuprofent, a betegtájékoztató szerint. Ne tegyél aszpirint vagy más tablettát közvetlenül az ínyre, mert megégeti a szövetet.',
            'Duzzanat: tegyél hideg borogatást az arcodra, kívülről, 10–15 percig, szünetekkel. Ne melegítsd, és ne szúrd meg a duzzanatot.',
            'Teljesen kiesett fog: a koronájánál fogd meg, ne a gyökerénél. Ha szennyezett, öblítsd le röviden tejjel vagy fiziológiás sóoldattal, de ne dörzsöld. Tartsd tejben, és azonnal gyere. Minél hamarabb érsz ide, annál nagyobb az esély, hogy vissza lehessen ültetni.',
            'Letört fog: őrizd meg a letört darabot, öblítsd ki a szádat langyos vízzel, és azon az oldalon ne harapj rá.',
            'Vérzés foghúzás után: harapj rá erősen egy steril gézlapra 30 percig. Ne öblögess erősen, és ne dohányozz.',
            'Kiesett pótlás: őrizd meg, és hozd magaddal. Ne ragaszd vissza háztartási ragasztóval.',
          ],
          after: 'Ne kezdj el otthon maradt antibiotikumot szedni. Ha antibiotikumra van szükség, az orvos írja fel a vizsgálat után.',
        },
        {
          heading: 'Mikor menj egyenesen kórházba',
          paragraphs: [
            'Vannak helyzetek, amelyek túlmutatnak azon, amit egy fogorvosi rendelőben meg lehet oldani. Hívd a 112-t, vagy menj a legközelebbi sürgősségi osztályra (UPU), ha:',
          ],
          bullets: [
            'a duzzanat gyorsan nő, a szem vagy a nyak felé;',
            'nehezen veszel levegőt vagy nehezen nyelsz;',
            'magas lázad van, és általában is rosszul érzed magad;',
            'erős ütés érte a fejedet vagy az arcodat, főleg, ha szédülsz, vagy elvesztetted az eszméletedet;',
            'a vérzés erős, és nem áll el, amikor rányomsz.',
          ],
          after:
            'Ugyanide fordulj, ha a panasz este vagy hétvégén jelentkezik, és nem várhat az első munkanapig.',
        },
        {
          heading: 'Mi történik, amikor a DENTCRAFT-hoz érsz',
          paragraphs: [
            'Telefonon megkérdezzük, mi fáj, mióta, és van-e duzzanatod vagy lázad. Így tudjuk, mennyi időre lesz szükséged, és igyekszünk még aznap fogadni, a nyitvatartási időn belül.',
            'A rendelőben az orvos megkeresi a fájdalom okát, és elvégzi a sürgősségi kezelést: megnyitja és kiüríti a tályogot, nyugtató betétet tesz a fogba, eltávolítja a gyulladt ideget, ideiglenesen visszarögzíti a kiesett pótlást, vagy rögzíti az ütés után meglazult fogat. Ha képalkotó vizsgálatra van szükség, megmondjuk, hol tudod elvégeztetni.',
            'A sürgősségi kezelés megszünteti a fájdalmat, de általában nem ez a végleges megoldás. Mielőtt elmész, közösen megbeszéljük, mi következik, és mikor jössz vissza.',
          ],
        },
      ],
      faqs: [
        {
          question: 'Mit tegyek, ha este vagy hétvégén fáj a fogam?',
          answer:
            'A klinika nyitvatartása hétfő–péntek, 10:00–18:00. Addig vegyél be fájdalomcsillapítót a betegtájékoztató szerint, és ha duzzanatod van, tegyél rá hideg borogatást. Ha lázad lesz, nő a duzzanat vagy nehezen nyelsz, menj a sürgősségi osztályra (UPU), vagy hívd a 112-t. Az első munkanapon hívj minket a 0741 199 977-es számon.',
        },
        {
          question: 'Jöhetek időpont nélkül?',
          answer:
            'Kérünk, előtte telefonálj. Így tudjuk, hogy jössz, kérdezünk pár dolgot a fájdalomról, és megkeressük a legközelebbi szabad helyet aznapra.',
        },
        {
          question: 'Ütés után kiesett egy fogam. Meg lehet még menteni?',
          answer:
            'Néha igen, ha nagyon gyorsan ideérsz. A koronájánál fogd meg a fogat, tartsd tejben, és azonnal gyere. Gyerekeknél a kiesett tejfogat nem ültetjük vissza, de a gyereket meg kell mutatni az orvosnak, hogy ellenőrizzük az alatta fejlődő maradó fogat.',
        },
        {
          question: 'Duzzanat van az ínyemen, de nem fáj. Sürgős?',
          answer:
            'Érdemes minél hamarabb megnézetni. Az ínyduzzanat tályog jele lehet, amely néha csak kicsit vagy egyáltalán nem fáj. Ne szúrd meg, ne melegítsd, és hívj minket időpontért.',
        },
        {
          question: 'Mennyibe kerül a sürgősségi kezelés?',
          answer:
            'Attól függ, milyen kezelésre van szükség. Az orvos még a kezelés előtt elmondja, mit fog csinálni, és mennyibe kerül. A klinika árlistáját az Árak oldalon találod.',
        },
      ],
      links: [
        { label: 'Kapcsolat és térkép', page: '/contact' },
        { label: 'Árlista', page: '/preturi' },
      ],
    },

    // ------------------------------------------------------------------
    pedodontie: {
      intro:
        'A gyermekfogászat a gyerekek fogainak ellátása: a tejfogak és az első maradó fogak gondozása, az első kis foguk megjelenésétől a kamaszkorig. Szatmárnémetiben (Satu Mare), a DENTCRAFT rendelőben a gyerekeket Dr. Ghirasim Denisa-Ștefania vizsgálja, aki pszichopedagógiai képzést is elvégzett. Jó, ha az első ellenőrzésre egyéves korig sor kerül.',
      sections: [
        {
          heading: 'Az első látogatás a fogorvosnál',
          paragraphs: [
            'A gyermekfogászati irányelvek szerint az első ellenőrzés akkor esedékes, amikor megjelenik az első fog, de legkésőbb egyéves korban. A látogatás rövid. A gyerek megszokja a széket, a lámpát és az eszközöket, az orvos pedig megnézi a fogakat és az ínyt. Az egészen kicsiknél a vizsgálat történhet úgy is, hogy a gyerek a szülő ölében ül.',
            'Arról is beszélünk, mi számít otthon: cumisüveg, cumi, édességek, fogmosás és a korának megfelelő fogkrém. Ha kezelésre van szükség, az orvos elmagyarázza a lehetőségeket, és közösen megtervezzük.',
          ],
        },
        {
          heading: 'Hogyan készítsd fel a gyereket',
          paragraphs: [],
          bullets: [
            'Egyszerűen és nyugodtan beszélj a fogorvosról, úgy, mint arról a doktorról, aki megszámolja és megtisztítja a fogacskákat.',
            'Kerüld az olyan szavakat, mint „fájdalom”, „tű” vagy „ne félj”. Sokszor éppen ezek ijesztik meg a gyereket.',
            'Ne fenyegesd a fogorvossal, amikor nem akar fogat mosni.',
            'Válassz olyan időpontot, amikor a gyerek kipihent, és nem éhes.',
            'Elhozhatja a kedvenc játékát.',
          ],
        },
        {
          heading: 'Milyen kezeléseket végzünk gyerekeknél',
          paragraphs: [],
          bullets: [
            'rendszeres ellenőrzés és professzionális fogtisztítás;',
            'fluoridos lakk az ellenállóbb zománcért;',
            'a maradó őrlőfogak barázdazárása: a rágófelület barázdáit folyékony anyaggal fedjük be, hogy ne rakódjon le bennük ételmaradék;',
            'a tejfogak és a maradó fogak szuvasodásának kezelése;',
            'tejfogak gyökérkezelése, ha a szuvasodás mélyre jutott;',
            'azoknak a tejfogaknak az eltávolítása, amelyeket már nem lehet megmenteni, vagy amelyek akadályozzák a maradó fogak előtörését.',
          ],
          after:
            'Ha a fogak ferdén kezdenek nőni, vagy az állcsontok nem záródnak megfelelően, Dr. Cozma Ștefanához irányítunk, aki a klinikán a fogszabályozással foglalkozik.',
        },
        {
          heading: 'Miért fontosak a tejfogak',
          paragraphs: [
            'A tejfogak kiesnek, de addig fontos dolguk van. A gyerek ezekkel rág és beszél, és ezek tartják a helyet a maradó fogaknak. A kezeletlen szuvasodás elérheti az ideget, fájdalmat vagy tályogot okozhat, a fertőzés pedig károsíthatja az alatta fejlődő maradó fogat. Ha egy tejfog túl korán elvész, a szomszédos fogak bedőlhetnek a szabad helyre, és később torlódás alakulhat ki.',
          ],
        },
        {
          heading: 'Otthoni szájápolás életkor szerint',
          paragraphs: [],
          bullets: [
            'Az első fogtól 3 éves korig: fluoridos fogkrém, rizsszemnyi mennyiségben, naponta kétszer.',
            '3 és 6 éves kor között: fluoridos fogkrém, borsószemnyi mennyiségben. A gyerek megtanulja kiköpni a fogkrémet, sok öblítés nélkül.',
            'Nagyjából 7–8 éves korig a szülő mossa a gyerek fogát, vagy legalább ellenőrzi a fogmosást.',
            'Lefekvéskor ne kapjon cumisüvegben tejet, gyümölcslét vagy édesített teát.',
          ],
        },
      ],
      faqs: [
        {
          question: 'Hány évesen vigyem először fogorvoshoz a gyereket?',
          answer:
            'Amikor megjelenik az első foga, de legkésőbb egyéves korában. Az első látogatás inkább ismerkedés: a gyerek megszokja a rendelőt, te pedig a korának megfelelő ápolási tanácsokat kapsz.',
        },
        {
          question: 'A gyerekem fél a fogorvostól. Mit tesztek ilyenkor?',
          answer:
            'Az ő tempójában haladunk. Minden lépést érthetően elmagyarázunk neki, és megmutatjuk az eszközöket, mielőtt használnánk őket. Ha egy nap nem megy, nem erőltetjük, hanem új időpontot adunk. A most megszerzett bizalom minden későbbi látogatásnál számít.',
        },
        {
          question: 'Érdemes kezeltetni a tejfogakat, ha úgyis kiesnek?',
          answer:
            'Igen. Egyes tejfogak 11–12 éves korig a szájban maradnak. A kezeletlen szuvasodás fájdalmat és tályogot okozhat, károsíthatja az alatta lévő maradó fogat, és a fog idő előtti elvesztéséhez vezethet, ami később torlódást okoz.',
        },
        {
          question: 'Mi a barázdazárás, és mikor végzik?',
          answer:
            'A barázdazárás során a maradó őrlőfogak barázdáit folyékony, majd megkeményedő anyaggal fedjük be. Érzéstelenítés nélkül és általában a fog fúrása nélkül történik. A 6 éves őrlőfogakat általában röviddel előtörésük után zárjuk le, a 12 éves őrlőfogakat ugyanígy.',
        },
        {
          question: 'Ott lehetek a gyerek mellett a rendelőben?',
          answer:
            'Igen, főleg a kisebb gyerekeknél, akik nyugodtabbak, ha a szülő a közelben van. A nagyobb gyerekeknél az orvos néha azt javasolhatja, hogy próbálják meg egyedül. Közösen döntitek el, mi a legjobb a gyereketeknek.',
        },
        {
          question: 'Milyen gyakran kell a gyereknek ellenőrzésre jönnie?',
          answer:
            'Általában hathavonta. Ha sok szuvas foga van, vagy nagy a szuvasodás kockázata, az orvos gyakoribb ellenőrzést javasolhat.',
        },
      ],
      links: [{ label: 'Dr. Ghirasim Denisa-Ștefania', doctor: 'denisa-ghirasim' }],
    },

    // ------------------------------------------------------------------
    ortodontie: {
      intro:
        'A fogszabályozás a ferde, zsúfolt vagy hézagos fogakat és az állcsontok záródását korrigálja. Szatmárnémetiben (Satu Mare), a DENTCRAFT rendelőben fém és kerámia rögzített készülékekkel, valamint átlátszó sínekkel dolgozunk, gyerekeknél és felnőtteknél egyaránt. A kezelést Dr. Cozma Ștefana vezeti, aki fogszabályozás és dentofaciális ortopédia szakon rezidens fogorvos.',
      sections: [
        {
          heading: 'Mikor van szükség fogszabályozó készülékre',
          paragraphs: [],
          bullets: [
            'zsúfolt, egymásra csúszott vagy elfordult fogak;',
            'hézagok a fogak között;',
            'a felső fogak túlságosan takarják az alsókat, vagy fordítva, az alsó fogak előreállnak;',
            'a frontfogak nem érnek össze, amikor összeharapsz (nyitott harapás);',
            'nehezen rágsz, vagy a fogak egyenetlenül kopnak;',
            'gyerekeknél: az ujjszopás vagy a szájlégzés, amelyek megváltoztathatják az állcsontok növekedését.',
          ],
          after:
            'A készülék a fogak egészségét is segíti. Az egyenes fogak könnyebben tisztíthatók, a rágóerők pedig egyenletesebben oszlanak el.',
        },
        {
          heading: 'Hány évesen érdemes elkezdeni',
          paragraphs: [
            'Az első fogszabályozási ellenőrzés nagyjából 7 éves korban javasolt, amikor már előtörtek az első maradó őrlőfogak és a maradó metszőfogak. Ebben az életkorban az állcsontok növekedésének egyes problémái egyszerűbben korrigálhatók, a növekedést irányító készülékekkel.',
            'Felnőtteknél nincs korhatár, ha az íny és a csont egészséges. Ha ínygyulladásod van, először azt kezeljük, a készülék csak utána következik.',
          ],
        },
        {
          heading: 'Milyen készülékeket használunk',
          paragraphs: [],
          bullets: [
            'Fém rögzített készülék: a legellenállóbb, és a bonyolult esetekre a legalkalmasabb.',
            'Kerámia rögzített készülék: ugyanúgy működik, de a brackettek fogszínűek, ezért kevésbé látszanak.',
            'Átlátszó sínek: sorban cserélt sínek, amelyeket naponta körülbelül 22 órán át kell viselni. Étkezéshez és fogmosáshoz kivehetők. Nem minden esetre alkalmasak, ezért a konzultáción megbeszéljük, szóba jöhetnek-e nálad.',
            'Kivehető készülékek gyerekeknek: irányítják az állcsontok növekedését, és előkészítik a helyet a maradó fogaknak.',
          ],
        },
        {
          heading: 'Hogyan zajlik a kezelés',
          paragraphs: [
            'Az első konzultáción az orvos megvizsgálja a fogakat és a harapást, és fényképeket készít. A lenyomatot digitálisan vesszük a Medit i700 intraorális szkennerrel, a hagyományos lenyomatanyag nélkül. A szükséges képalkotó vizsgálatokat egy erre szakosodott központban végezteted el, az orvos pedig pontosan megmondja, mire van szükség.',
            'Ezek alapján kapod meg a kezelési tervet: milyen készülék illik hozzád, nagyjából mennyi ideig tart a kezelés, és mi a te feladatod. A legtöbb kezelés egy és két év között tart, a bonyolult esetek tovább is tarthatnak.',
            'Amíg a készüléket viseled, néhány hetente ellenőrzésre jössz, hogy az orvos beállítsa, és kövesse a haladást. A készülék eltávolítása után következik a retenció: egy, a fogak belső felére ragasztott vékony drót vagy egy éjszaka viselt sín, hogy a fogak ne mozduljanak vissza a korábbi helyzetükbe.',
          ],
        },
        {
          heading: 'Élet a készülékkel',
          paragraphs: [],
          bullets: [
            'A felhelyezés vagy egy beállítás utáni első napok kellemetlenek lehetnek, aztán ez az érzés elmúlik.',
            'Minden étkezés után moss fogat, és használj fogköztisztító kefét. A szájzuhany sokat segít.',
            'Rögzített készüléknél kerüld a nagyon kemény vagy ragacsos ételeket, mert leválaszthatják a bracketteket.',
            'Sínnél vedd ki a síneket evés közben, és moss fogat, mielőtt visszateszed őket.',
          ],
        },
      ],
      faqs: [
        {
          question: 'Fáj a fogszabályozó készülék?',
          answer:
            'A felhelyezés nem fáj. Az első napokban és minden beállítás után a fogak érzékenyek lehetnek rágáskor, a kellemetlenség általában néhány nap alatt elmúlik. A fogszabályozó viasz segít, ha egy brackett irritálja az arcod belső felét.',
        },
        {
          question: 'Meddig tart egy fogszabályozó kezelés?',
          answer:
            'Általában egy és két év között, attól függően, mennyire kell elmozdítani a fogakat, és mennyire tartod be az utasításokat. A te esetedre becsült időtartamot a konzultáció és a vizsgálatok után tudod meg.',
        },
        {
          question: 'Hordhatok fogszabályozót felnőttként?',
          answer:
            'Igen. A fogak bármilyen életkorban elmozdíthatók, ha az íny és a csont egészséges. Sok felnőtt a kerámia készüléket vagy a síneket választja, mert ezek kevésbé látszanak.',
        },
        {
          question: 'Mit válasszak: rögzített készüléket vagy sínt?',
          answer:
            'Az esettől függ. A rögzített készülék bonyolultabb mozgatásokra is képes, és nem függ attól, mennyit viseled. A sínek alig látszanak, és étkezéskor kivehetők, de csak akkor működnek, ha szinte egész nap viseled őket. A konzultáción megnézzük, melyik megoldás jó a te fogaidhoz.',
        },
        {
          question: 'Mi történik, miután leveszik a készüléket?',
          answer:
            'Következik a retenció. Egy, a fogak belső felére ragasztott vékony drót vagy egy éjszaka viselt sín tartja a fogakat az új helyzetükben. Retenció nélkül a fogak hajlamosak visszamozdulni az eredeti helyükre.',
        },
        {
          question: 'Milyen gyakran kell ellenőrzésre jönnöm?',
          answer:
            'Rögzített készüléknél általában 4–8 hetente. Sínnél ritkábbak lehetnek az ellenőrzések. Az orvos határozza meg a te kezelésedhez illő ütemet.',
        },
      ],
      links: [{ label: 'Dr. Cozma Ștefana', doctor: 'stefana-cozma' }],
    },

    // ------------------------------------------------------------------
    detartraj: {
      intro:
        'A fogkő-eltávolítás a fogkő és a lepedék professzionális eltávolítása a fogakról és az ínyszél alól, ahonnan a fogkefe nem tudja kitisztítani. Szatmárnémetiben (Satu Mare), a DENTCRAFT rendelőben a szájhigiénés kezelést Dr. Fernea Remus végzi, aki Guided Biofilm Therapy tanúsítvánnyal rendelkezik, AIRFLOW, PERIOFLOW és PIEZON készülékekkel. A legtöbb páciensnek hathavonta egy kezelés elegendő.',
      sections: [
        {
          heading: 'Miért nem elég a fogmosás',
          paragraphs: [
            'A lepedék puha réteg, amely minden nap kialakul a fogakon. A fogmosás és a fogselyem nagy részét eltávolítja, de mindig maradnak nehezen elérhető területek. Ott a lepedék néhány nap alatt megkeményedik, és fogkővé válik, a fogkövet pedig már nem lehet fogkefével eltávolítani.',
            'A fogkő irritálja az ínyt. Az első jel az ínygyulladás (gingivitisz): piros, duzzadt íny, amely fogmosáskor vérzik. Kezelés nélkül a gyulladás fogágygyulladásba (parodontitisz) mehet át: az íny visszahúzódik, a fogak körüli csont fogy, és a fogak meglazulhatnak.',
          ],
        },
        {
          heading: 'Hogyan dolgozunk: Guided Biofilm Therapy',
          paragraphs: [
            'A Guided Biofilm Therapy (GBT) az EMS és a Swiss Dental Academy által kidolgozott szájhigiénés protokoll. Dr. Fernea Remus 2026-ban szerezte meg a tanúsítványt. Röviden így néz ki egy kezelés:',
          ],
          bullets: [
            'Felmérés: az orvos ellenőrzi a fogakat és az ínyt, és a lepedéket színezőanyaggal teszi láthatóvá, hogy pontosan látszódjon, hol maradt.',
            'AIRFLOW: levegőből, vízből és finom porból álló sugár távolítja el a lepedéket és az elszíneződéseket a fogakról, a pótlásokról, az implantátumokról és a fogszabályozó készülékekről.',
            'PERIOFLOW: egy vékony fej tisztítja meg az íny alatti területeket, ahol enyhe tasakok alakultak ki.',
            'PIEZON: az ultrahang eltávolítja a megmaradt fogkövet, anélkül, hogy fölöslegesen érintené a már tiszta felületeket.',
            'Végső ellenőrzés és a szádhoz illő szájhigiénés tanácsok.',
          ],
        },
        {
          heading: 'Milyen gyakran érdemes fogkövet eltávolíttatni',
          paragraphs: [
            'A legtöbb embernél hathavonta egy kezelés egészségesen tartja az ínyt. Az orvos 3–4 havonta javasolhat egy kezelést, ha fogágybetegséged, implantátumod, fogszabályozó készüléked vagy cukorbetegséged van, ha dohányzol, vagy ha nálad gyorsan rakódik le a fogkő.',
          ],
        },
        {
          heading: 'Mikor van szükség parodontológusra',
          paragraphs: [
            'Ha a felméréskor mély tasakokat találunk az íny és a fog között, ínyvisszahúzódást vagy mozgó fogakat, a szokásos szájhigiénés kezelés már nem elég. A klinikán Dr. Tincu Giovana-Nicoleta parodontológus szakorvos dolgozik. Ő felméri az íny állapotát, elvégzi a fogágykezelést, majd a fenntartó szájhigiénés kezelések a közösen megállapított terv szerint zajlanak.',
          ],
        },
        {
          heading: 'A kezelés után',
          paragraphs: [],
          bullets: [
            'Az első 1–2 napban enyhe hidegérzékenység vagy kisebb ínyvérzés normális, ha az íny gyulladt volt.',
            'Moss fogat naponta kétszer, puha fogkefével, és tisztítsd meg a fogközöket fogselyemmel vagy fogköztisztító kefével.',
            'Ha az íny egy hét után is vérzik, szólj nekünk.',
          ],
        },
      ],
      faqs: [
        {
          question: 'Fáj a fogkő-eltávolítás?',
          answer:
            'Általában nem. Érezhetsz rezgést, hideg vizet vagy enyhe érzékenységet, főleg ott, ahol az íny gyulladt. Ha nagyon érzékenyek a fogaid, mondd el az orvosnak már az elején. A kezelés kíméletesebben is végezhető, és szükség esetén helyi érzéstelenítést is alkalmazunk.',
        },
        {
          question: 'Károsítja a fogkő-eltávolítás a zománcot?',
          answer:
            'Nem. Az ultrahang és a porsugár a lerakódásokat tisztítja le, nem a zománcot. A fogakon hagyott fogkő árt, mert fenntartja az íny gyulladását.',
        },
        {
          question: 'Mennyi ideig tart egy kezelés?',
          answer:
            'Általában fél óra és egy óra között, attól függően, mennyi fogkő rakódott le, és milyen állapotban van az íny.',
        },
        {
          question: 'Eltávolíttathatom a fogkövet, ha implantátumom vagy fogszabályozó készülékem van?',
          answer:
            'Igen, sőt kifejezetten ajánlott. Az AIRFLOW por és a GBT protokollban használt fejek alkalmasak implantátumokhoz, koronákhoz és fogszabályozó készülékekhez. A rendszeres szájhigiénés kezelés védi az implantátumok körüli ínyt.',
        },
        {
          question: 'Miért vérzik az ínyem a fogkő-eltávolítás után?',
          answer:
            'Mert már korábban is gyulladt volt. A fogkő eltávolítása után az íny általában néhány nap alatt meggyógyul, és a vérzés csökken. Ha egy hét után sem szűnik meg, gyere ellenőrzésre.',
        },
        {
          question: 'Milyen gyakran kell fogkövet eltávolíttatni?',
          answer:
            'A legtöbb embernél hathavonta egyszer. Ha fogágybetegséged, implantátumod vagy fogszabályozó készüléked van, vagy dohányzol, az orvos 3–4 havonta javasolhat egy kezelést.',
        },
      ],
      links: [
        { label: 'Dr. Fernea Remus', doctor: 'remus-fernea' },
        { label: 'Dr. Tincu Giovana-Nicoleta, parodontológus', doctor: 'giovana-tincu' },
      ],
    },

    // ------------------------------------------------------------------
    'implanturi-dentare': {
      intro:
        'A fogimplantátum egy kis titáncsavar, amelyet a csontba helyezünk, és amely egy elvesztett fog gyökerét pótolja. Erre kerül egy korona, egy híd vagy egy teljes fogív. Szatmárnémetiben (Satu Mare), a DENTCRAFT rendelőben az implantátumot Dr. Buterchi Codruț-Ciprian, dentoalveoláris sebészeti szakorvos ülteti be, az implantátumra kerülő fogpótlást pedig Dr. Petric Răzvan-Tudor készíti.',
      sections: [
        {
          heading: 'Ki kaphat implantátumot',
          paragraphs: [
            'Az implantátum a legtöbb olyan felnőttnek megfelel, aki egy vagy több fogát elvesztette, miután az állcsontok növekedése befejeződött. Számít, mennyi csont van az adott területen, és mennyire egészséges az íny.',
            'A konzultáción mondd el az orvosnak, ha cukorbeteg vagy, dohányzol, csontritkulás elleni vagy véralvadásgátló gyógyszert szedsz, illetve ha sugárkezelést kaptál a fej területén. Ezek nem feltétlenül zárják ki az implantátumot, de megváltoztatják a tervet és az utána következő ápolást. Ha fogágybetegséged van, azt előbb kezeljük.',
          ],
        },
        {
          heading: 'Egy fog, több fog vagy a teljes fogív',
          paragraphs: [],
          bullets: [
            'Egyetlen hiányzó fog: egy implantátum és egy korona. A szomszédos fogakat nem kell lecsiszolni, ahogy egy hagyományos hídnál.',
            'Több, egymás melletti hiányzó fog: két vagy több implantátumra rögzített híd.',
            'Egy fogív összes foga: 4–6 implantátumra rögzített fix pótlás (All-on-X), vagy implantátumokra rögzülő fogsor.',
          ],
        },
        {
          heading: 'All-on-X: fix fogak a teljes fogíven',
          paragraphs: [
            'Az All-on-X megoldás azoknak szól, akik egy fogíven az összes fogukat elvesztették, vagy akiknek a fogai már nem menthetők meg. A pótlás a fogív összes fogát tartalmazza, és 4–6 implantátumra rögzül. Az „X” az implantátumok számára utal, amely esetenként eltérő.',
            'A hátsó implantátumok ferdén is behelyezhetők, hogy a meglévő csontot használják, és elkerüljék az arcüreget vagy az alsó állcsontban futó ideget. Így sokszor nincs szükség csontpótlásra. A pótlás fix: este nem kell kivenni, és ugyanúgy tisztítod, mint a saját fogaidat, fogkefével és szájzuhannyal.',
            'Ha az implantátumok behelyezéskor jól stabilak, a műtét után rövid időn belül fix ideiglenes pótlás is felhelyezhető. A végleges pótlás azután készül el, hogy az implantátumok beépültek a csontba. Hogy ez a megoldás megfelel-e neked, a konzultáció és a vizsgálatok után derül ki.',
          ],
        },
        {
          heading: 'Ha nincs elég csont: csontpótlás és arcüregemelés (sinus lift)',
          paragraphs: [
            'Egy fog elvesztése után a csont azon a területen fokozatosan fogy. A felső állcsontban, az őrlőfogak területén az arcüreg lejjebb ereszkedhet a felszabadult helyre. Ha nincs elég csont az implantátumhoz, pótolni lehet.',
            'Az arcüregemelés (sinus lift) az arcüreg nyálkahártyájának óvatos megemelését és az alatta lévő tér csontpótló anyaggal való kitöltését jelenti. Ha csak néhány milliméter hiányzik, az emelés közvetlenül az implantátum helyén keresztül történik (belső sinus lift). Ha több csontra van szükség, egy kis oldalsó ablakon keresztül dolgozunk (külső sinus lift). Az implantátum néha ugyanabban a kezelésben kerül be, máskor néhány hónappal később, amikor az új csont már kialakult.',
            'Hogy szükséged van-e csontpótlásra vagy arcüregemelésre, a képalkotó vizsgálatokból derül ki, amelyeket az orvos javaslatára egy erre szakosodott központban végezteted el.',
          ],
        },
        {
          heading: 'Az implantátum hosszú távú ápolása',
          paragraphs: [
            'Az implantátum nem szuvasodik, de a körülötte lévő íny begyulladhat, ugyanúgy, mint egy saját fognál. Kezelés nélkül a gyulladás elérheti a csontot (periimplantitisz). Hogy ezt elkerüld, moss fogat naponta kétszer, használj fogköztisztító kefét vagy szájzuhanyt, és gyere ellenőrzésre és professzionális szájhigiénés kezelésre legalább évente egyszer, ideális esetben hathavonta. A dohányzás növeli a szövődmények kockázatát.',
          ],
        },
      ],
      faqs: [
        {
          question: 'Kaphatok implantátumot idősebb korban?',
          answer:
            'Igen. Az életkor önmagában nem akadály. Az általános egészségi állapot, a csont mennyisége és az számít, hogy meg tudod-e tartani a tisztaságot az implantátum körül. Az orvos a konzultáción mindezt felméri.',
        },
        {
          question: 'Mit jelent az All-on-X, és kinek ajánlott?',
          answer:
            'Ez egy fogív összes fogát tartalmazó fix pótlás, amely 4–6 implantátumra rögzül. Azoknak ajánlott, akik egy fogíven az összes fogukat elvesztették, vagy akiknek a fogai már nem menthetők meg, és nem szeretnének kivehető fogsort.',
        },
        {
          question: 'Mi az arcüregemelés (sinus lift), és fáj-e?',
          answer:
            'Az arcüregemelés olyan beavatkozás, amellyel a felső állcsontban, az arcüreg alatt csontot pótolunk, hogy elférjen az implantátum. Helyi érzéstelenítésben történik. A beavatkozás után az első napok duzzanata és kellemetlensége az orvos által javasolt gyógyszerekkel kordában tartható.',
        },
        {
          question: 'Fogak nélkül maradok, amíg az implantátum gyógyul?',
          answer:
            'Nem feltétlenül. Sok esetben a végleges pótlásig ideiglenes, kivehető vagy fix pótlást lehet viselni. Az orvos a konzultáción elmondja, nálad melyik lehetőség jöhet szóba.',
        },
        {
          question: 'Kaphatok implantátumot, ha dohányzom vagy cukorbeteg vagyok?',
          answer:
            'Sokszor igen, de nagyobb a szövődmények kockázata. A cukorbetegségnek jól beállítottnak kell lennie, a dohányzás abbahagyása, vagy legalább csökkentése a gyógyulás idejére pedig sokat segít. Mondd el az orvosnak már az elején, hogy ehhez igazíthassa a tervet.',
        },
        {
          question: 'Meddig tart ki egy implantátum?',
          answer:
            'Egy jól beépült implantátum nagyon sok évig kitarthat, ha ápolják. A legtöbbet a napi szájhigiénia, a rendszeres ellenőrzés és a dohányzás kerülése számít. Az implantátumon lévő korona idővel kophat, és lecserélhető anélkül, hogy az implantátumhoz hozzá kellene nyúlni.',
        },
      ],
      links: [
        { label: 'Dr. Buterchi Codruț-Ciprian', doctor: 'codrut-buterchi' },
        { label: 'Dr. Petric Răzvan-Tudor', doctor: 'razvan-petric' },
        { label: 'Árlista', page: '/preturi' },
      ],
    },

    // ------------------------------------------------------------------
    endodontie: {
      intro:
        'A gyökérkezelés (endodoncia) megment egy olyan fogat, amelynek az idege begyulladt vagy elfertőződött, általában mély szuvasodás, repedés vagy ütés miatt. Az orvos megtisztítja és fertőtleníti a gyökércsatornákat, majd lezárja őket. Szatmárnémetiben (Satu Mare), a DENTCRAFT klinikán a gyökérkezelésekkel Dr. Ghirasim Denisa-Ștefania foglalkozik.',
      sections: [
        {
          heading: 'Jelek, hogy gyökérkezelésre lehet szükséged',
          paragraphs: [],
          bullets: [
            'erős vagy lüktető fájdalom, amely magától jelentkezik, néha éjszaka;',
            'meleg- vagy hidegérzékenység, amely még sokáig megmarad, miután befejezted az ivást;',
            'fájdalom, amikor ráharapsz vagy rányomsz a fogra;',
            'duzzanat vagy egy kis „pattanás” az ínyen, a fog mellett;',
            'egy fog, amely ütés után elszíneződött, sötétebb lett.',
          ],
          after:
            'Néha az elhalt idegű fog egyáltalán nem fáj, és a probléma csak az ellenőrzésen derül ki. A diagnózist az orvos állítja fel, vizsgálat, érzékenységi tesztek és a szükséges képalkotó vizsgálatok alapján.',
        },
        {
          heading: 'Hogyan zajlik a kezelés',
          paragraphs: [
            'Minden helyi érzéstelenítésben történik. A fogat elszigeteljük, hogy ne kerüljön nyál a csatornákba. Az orvos megnyitja a fogat, eltávolítja a gyulladt vagy fertőzött ideget, finom eszközökkel megtisztítja és formázza a csatornákat, majd fertőtlenítő oldatokkal átöblíti őket. A végén a csatornákat kitölti és lezárja.',
            'Egy kezelés egy alkalommal vagy két-három alkalom alatt fejeződhet be. Ha fertőzés van, az orvos gyógyszeres betétet tehet a csatornákba, és a következő alkalommal fejezi be a kezelést.',
          ],
        },
        {
          heading: 'Mi következik a gyökérkezelés után',
          paragraphs: [
            'A gyökérkezelt fog törékenyebb, mert a szerkezete nagy részét elvesztette. Sokszor a tömésen kívül további védelemre van szüksége: csapos felépítésre vagy koronára. Az orvos elmondja, melyik megoldás megfelelő a fogadhoz.',
            'Az első napokban a fog érzékeny lehet rágáskor. A végleges helyreállításig ne harapj rá erősen.',
          ],
        },
        {
          heading: 'Gyökérkezelés megismétlése (revízió)',
          paragraphs: [
            'Előfordul, hogy egy évekkel ezelőtt gyökérkezelt fog újra fájni kezd, vagy elfertőződik. Az ok lehet egy kezeletlen csatorna, egy hiányos lezárás vagy egy új szuvasodás a tömés alatt. A revízió a régi gyökértömés eltávolítását, a csatornák újbóli megtisztítását és lezárását jelenti. Hogy a fog így még megmenthető-e, a felmérés után dől el.',
          ],
        },
      ],
      faqs: [
        {
          question: 'Fáj a gyökérkezelés?',
          answer:
            'A kezelés közben nem kellene fájdalmat érezned, mert a terület érzéstelenítve van. A kezelés után a fog néhány napig érzékeny lehet, a kellemetlenség pedig általában egy szokásos fájdalomcsillapítóval enyhül.',
        },
        {
          question: 'Hány alkalomra van szükség?',
          answer:
            'Egy és három között, a csatornák számától, alakjától és attól függően, van-e fertőzés. Az első alkalom után tudod, hány alkalom van még hátra.',
        },
        {
          question: 'Nem egyszerűbb kihúzatni a fogat?',
          answer:
            'Pillanatnyilag egyszerűbbnek tűnhet, de az elvesztett fogat később implantátummal vagy híddal kell pótolni, a szomszédos fogak pedig bedőlhetnek a szabad helyre. Ha a fog megmenthető, általában jobb megtartani.',
        },
        {
          question: 'Kell korona a gyökérkezelés után?',
          answer:
            'Nem mindig, de gyakran. A gyökérkezelt őrlő- és kisőrlőfogaknak sokszor koronára van szükségük, hogy rágáskor ne törjenek el. A frontfogaknál egy jó tömés is elegendő lehet.',
        },
        {
          question: 'Ehetek a kezelés után?',
          answer:
            'Igen, miután elmúlt az érzéstelenítés hatása, hogy ne harapd meg az ajkadat vagy az arcod belső felét. A végleges helyreállításig a másik oldalon rágj, és kerüld a nagyon kemény ételeket.',
        },
      ],
    },

    // ------------------------------------------------------------------
    'chirurgie-oro-maxilo-faciala': {
      intro:
        'A szájsebészet a szájban végzett, helyi érzéstelenítésben történő beavatkozásokat jelenti: egyszerű és bonyolult foghúzásokat, a beékelődött bölcsességfogak eltávolítását, kisebb beavatkozásokat az ínyen és a csonton, valamint az implantátumok előkészítését. Szatmárnémetiben (Satu Mare), a DENTCRAFT rendelőben ezeket a beavatkozásokat Dr. Buterchi Codruț-Ciprian, dentoalveoláris sebészeti szakorvos végzi.',
      sections: [
        {
          heading: 'Milyen beavatkozásokat végzünk',
          paragraphs: [],
          bullets: [
            'olyan fogak eltávolítása, amelyek már nem menthetők meg;',
            'bölcsességfogak eltávolítása, a csontban vagy az íny alatt maradtakat is beleértve;',
            'gyökércsúcs-rezekció: a fertőzött gyökércsúcs eltávolítása, amikor a gyökérkezelés már nem elég;',
            'beavatkozások egy fogsor vagy egy implantátum előkészítésére, például a csont egyenetlenségeinek elsimítása;',
            'fogimplantátumok beültetése és csontpótlás, beleértve az arcüregemelést (sinus lift) is.',
          ],
          after:
            'Az altatást vagy kórházi felvételt igénylő eseteket, például az állcsonttöréseket, kórházban kezelik, és mi oda irányítunk.',
        },
        {
          heading: 'Bölcsességfogak: mikor kell eltávolítani őket',
          paragraphs: [
            'Nem minden bölcsességfogat kell eltávolítani. Ha egyenesen tört elő, van helye, és tisztítható, maradhat. Akkor javasoljuk az eltávolítást, ha:',
          ],
          bullets: [
            'a fölötte lévő íny gyakran begyullad és fáj (pericoronitisz);',
            'a fog ferdén áll, és nyomja vagy károsítja az előtte lévő őrlőfogat;',
            'szuvas, és nem lehet kezelni vagy rendesen tisztítani;',
            'ciszta alakult ki körülötte.',
          ],
        },
        {
          heading: 'Hogyan készülj fel a beavatkozásra',
          paragraphs: [
            'A konzultáción mondd el az orvosnak, milyen gyógyszereket szedsz, főleg, ha véralvadásgátlót vagy csontritkulás elleni gyógyszert, és hogy van-e krónikus betegséged. A szükséges képalkotó vizsgálatokat az orvos javaslatára egy erre szakosodott központban végezteted el. A beavatkozás napján előtte egyél rendesen, és pihenten érkezz.',
          ],
        },
        {
          heading: 'Foghúzás után: mi normális és mi nem',
          paragraphs: [],
          bullets: [
            'Harapj rá a gézlapra 30 percig, hogy kialakuljon a vérrög.',
            'Az első órákban tegyél hideg borogatást az arcodra, 10–15 percig.',
            'Az első napon ne öblögess erősen, ne igyál szívószállal, és ne dohányozz, hogy a vérrög ne mozduljon el.',
            'Egyél puha, langyos ételt, a másik oldalon.',
            '2–3 napig enyhe duzzanat és kellemetlenség normális.',
          ],
          after:
            'Hívj minket, ha a vérzés nem áll el, ha a fájdalom a harmadik nap után erősödik, ha lázas vagy, vagy ha a duzzanat csökkenés helyett nő.',
        },
      ],
      faqs: [
        {
          question: 'Fáj a bölcsességfog eltávolítása?',
          answer:
            'A beavatkozás közben nem érzel fájdalmat, csak nyomást, mert a terület érzéstelenítve van. Utána néhány napig duzzanat és kellemetlenség jelentkezhet, amelyet az orvos által javasolt gyógyszerekkel tarthatsz kordában.',
        },
        {
          question: 'Mennyi ideig tart a gyógyulás egy foghúzás után?',
          answer:
            'Az íny általában egy-két hét alatt záródik. A csont néhány hónap alatt épül újra. Ha varratok kerültek be, azokat általában körülbelül 7–10 nap múlva, az ellenőrzésen távolítjuk el.',
        },
        {
          question: 'Mehetek másnap dolgozni?',
          answer:
            'Egy egyszerű foghúzás után általában igen. Egy beékelődött bölcsességfog eltávolítása után jó, ha kiveszel egy-két nap pihenőt, és kerülöd a fizikai megerőltetést.',
        },
        {
          question: 'Mi a száraz fogmeder (alveolitisz), és hogyan kerülhetem el?',
          answer:
            'Az alveolitisz akkor alakul ki, amikor a foghúzás helyén lévő vérrög leválik vagy elfertőződik. A fájdalom általában 2–4 nappal a beavatkozás után erősödik fel. Elkerülheted, ha az első napokban nem dohányzol, nem öblögetsz erősen, és nem iszol szívószállal. Ha mégis kialakul, gyere ellenőrzésre.',
        },
        {
          question: 'Abba kell hagynom a véralvadásgátlót foghúzás előtt?',
          answer:
            'Ne hagyd abba magadtól. Mondd el az orvosnak, mit szedsz, ő pedig, szükség esetén a kezelőorvosoddal közösen, eldönti, hogyan járjatok el.',
        },
      ],
    },

    // ------------------------------------------------------------------
    'stomatologie-generala': {
      intro:
        'Az általános fogászat a fogak alapellátását jelenti: ellenőrzéseket, a szuvasodás kezelését, töméseket, szájhigiénés kezeléseket és megelőzési tanácsokat. Szinte minden kezelés itt kezdődik. Szatmárnémetiben (Satu Mare), a DENTCRAFT rendelőben az orvos megvizsgál, elmagyarázza, mit talált, és ha a csapat valamelyik szakorvosára van szükség, hozzá irányít.',
      sections: [
        {
          heading: 'Mit foglal magában az általános fogászat',
          paragraphs: [],
          bullets: [
            'konzultáció és rendszeres ellenőrzés;',
            'a szuvasodás kezelése és fogszínű tömések;',
            'a régi, megrepedt vagy beszivárgott tömések cseréje;',
            'a fogérzékenység kezelése;',
            'professzionális szájhigiénés kezelés és tanácsok az otthoni szájápoláshoz;',
            'továbbirányítás a csapat kollégáihoz gyökérkezelésre, szájsebészetre, fogszabályozásra, parodontológiai kezelésre vagy fogpótlásra.',
          ],
        },
        {
          heading: 'Szuvasodás: miért jó korán észrevenni',
          paragraphs: [
            'Egy kis szuvasodás, amelyet az ellenőrzésen észreveszünk, egyszerűen, egy töméssel kezelhető. Ha kezeletlen marad, mélyebbre jut, egészen az idegig, és akkor gyökérkezelésre, sokszor pedig koronára is szükség van. A kis szuvasodások általában nem fájnak, ezért nem te veszed észre őket, hanem az orvos az ellenőrzésen.',
          ],
        },
        {
          heading: 'Milyen gyakran gyere ellenőrzésre',
          paragraphs: [
            'A legtöbb felnőttnek hathavonta egy ellenőrzés és egy szájhigiénés kezelés elegendő. Ha sok pótlásod van, érzékeny az ínyed, vagy gyakran szuvasodnak a fogaid, az orvos gyakoribb ellenőrzést javasolhat. Az ellenőrzés nem tart sokáig, és a korán észrevett probléma könnyebben kezelhető.',
          ],
        },
        {
          heading: 'Mit tehetsz otthon',
          paragraphs: [],
          bullets: [
            'Moss fogat naponta kétszer, két-két percig, fluoridos fogkrémmel.',
            'Tisztítsd meg naponta a fogközöket fogselyemmel vagy fogköztisztító kefével.',
            'Korlátozd az étkezések közötti édes nassolást és a savas italokat.',
            'Cseréld le a fogkefédet háromhavonta, vagy hamarabb, ha a sörték deformálódtak.',
          ],
        },
      ],
      faqs: [
        {
          question: 'Milyen töméseket használtok?',
          answer:
            'Fogszínű kompozit töméseket használunk. Ezek a foghoz tapadnak, és közvetlenül a szájban formázzuk őket, egyetlen alkalommal.',
        },
        {
          question: 'Le kell cserélni a régi amalgámtöméseket?',
          answer:
            'Nem feltétlenül. Ha épek, és a fog egészséges, maradhatnak. Akkor cseréljük őket, ha megrepedtek, ha a szélükön szuvasodás jelent meg, vagy ha természetesebb megjelenést szeretnél.',
        },
        {
          question: 'Miért érzékenyek a fogaim a hidegre?',
          answer:
            'A gyakori okok az ínyvisszahúzódás, a kopott zománc, egy szuvasodás vagy egy beszivárgott tömés. Az orvos az ellenőrzésen megkeresi az okot. Addig egy érzékeny fogakra való fogkrém segíthet.',
        },
        {
          question: 'Mennyi ideig tart egy tömés elkészítése?',
          answer:
            'Általában fél óra és egy óra között egy fogra, a szuvasodás méretétől függően.',
        },
      ],
    },

    // ------------------------------------------------------------------
    'consultatie-stomatologica': {
      intro:
        'A fogorvosi konzultáció az első látogatás a DENTCRAFT-nál: az orvos megvizsgálja a fogaidat, az ínyedet és a harapásodat, meghallgatja, mi zavar, és elmagyarázza, mit talált. Kezelési tervvel és becsült árral távozol, még mielőtt bármilyen kezelést elkezdenél. A klinika Szatmárnémetiben (Satu Mare) található, a konzultáció román, angol vagy magyar nyelven zajlik.',
      sections: [
        {
          heading: 'Mi történik a konzultáción',
          paragraphs: [],
          bullets: [
            'beszélgetünk arról, mi zavar, milyen kezeléseid voltak, és milyen az egészségi állapotod;',
            'az orvos megvizsgál minden fogat, az ínyt, a harapást és a száj lágyszöveteit;',
            'ha szükséges, fényképeket és digitális szkennelést készítünk a fogakról a Medit i700 intraorális szkennerrel;',
            'ha képalkotó vizsgálatokra van szükség, megmondjuk, mit és hol végeztess el;',
            'elmagyarázzuk a kezelési lehetőségeket, mindegyiknek az előnyeivel és korlátaival.',
          ],
        },
        {
          heading: 'Mit kapsz a konzultáció után',
          paragraphs: [
            'Kezelési tervet kapsz a lépésekkel, az alkalmak hozzávetőleges számával és a becsült árral. Ha több lehetőség van, mindet megmutatjuk, és te választasz. A beleegyezésed nélkül semmilyen kezelést nem kezdünk el.',
          ],
        },
        {
          heading: 'Mit hozz magaddal',
          paragraphs: [],
          bullets: [
            'a szedett gyógyszereid listáját;',
            'a friss képalkotó vizsgálataidat, ha vannak;',
            'orvosi leleteket vagy releváns laboreredményeket, például ha cukorbeteg vagy, vagy véralvadásgátlót szedsz;',
            'a kérdéseidet, előre leírva.',
          ],
        },
        {
          heading: 'Mikor érdemes konzultációra jönni',
          paragraphs: [
            'Gyere, ha fájdalmat, érzékenységet vagy duzzanatot tapasztalsz, ha vérzik az ínyed, ha kiesett egy tömésed, vagy ha tudni szeretnéd, milyen lehetőségeid vannak egy hiányzó fog, egy fogszabályozó készülék vagy egy ragyogóbb mosoly kapcsán. Ha régóta nem voltál fogorvosnál, egy konzultáció jó kezdet.',
          ],
        },
      ],
      faqs: [
        {
          question: 'Mennyi ideig tart a konzultáció?',
          answer:
            'Attól függ, mennyire összetett az eset, és hogy készítünk-e fényképeket és szkennelést is. Az időpont egyeztetésekor megmondjuk, mennyi időt szánj rá.',
        },
        {
          question: 'Mennyibe kerül a konzultáció?',
          answer:
            'Az ár a konzultáció típusától függ, például attól, hogy tartalmaz-e fényképeket és szkennelést is. A friss árlistát az Árak oldalon találod, az időpont egyeztetésekor pedig pontosan megmondjuk, mit tartalmaz.',
        },
        {
          question: 'Elkezdhetem a kezelést ugyanazon a napon?',
          answer:
            'Néha igen, ha sürgős esetről vagy egyszerű kezelésről van szó, és van időd. Általában a konzultáció után nyugodtan átgondolod a tervet, és a kezelésre visszajössz.',
        },
        {
          question: 'Beszéltek angolul vagy magyarul?',
          answer:
            'Igen. A konzultáció és a magyarázatok román, angol és magyar nyelven is zajlhatnak.',
        },
        {
          question: 'Hogyan kérhetek időpontot?',
          answer:
            'Hívd a 0741 199 977-es számot hétfőtől péntekig, 10:00 és 18:00 között, vagy használd a weboldalon található időpontfoglaló űrlapot.',
        },
      ],
      links: [
        { label: 'Árlista', page: '/preturi' },
        { label: 'Kapcsolat', page: '/contact' },
      ],
    },

    // ------------------------------------------------------------------
    protetica: {
      intro:
        'A fogpótlástan (protetika) a hiányzó fogakat pótolja, és a nagyon roncsolt fogakat építi újra, koronákkal, hidakkal, implantátumra rögzített pótlásokkal vagy fogsorokkal. A cél, hogy normálisan tudj rágni és beszélni, és a fogaid természetesen nézzenek ki. Szatmárnémetiben (Satu Mare), a DENTCRAFT rendelőben a fogpótlásokat Dr. Petric Răzvan-Tudor tervezi és készíti, a lenyomatot pedig digitálisan, a Medit i700 szkennerrel vesszük.',
      sections: [
        {
          heading: 'Milyen fogpótlások léteznek',
          paragraphs: [],
          bullets: [
            'Korona: egy „sapka”, amely teljesen befed egy meggyengült, megrepedt vagy gyökérkezelt fogat.',
            'Híd: egy vagy több hiányzó fogat pótol, és a szomszédos fogakra támaszkodik, amelyeket lecsiszolunk.',
            'Implantátumra rögzített pótlások: koronák, hidak vagy teljes fogívek, amelyek implantátumokra rögzülnek, anélkül, hogy a szomszédos fogakhoz hozzányúlnánk.',
            'Inlay és onlay: fogtechnikai laborban készült helyreállítások nagy hiányú fogakra, amikor a tömés már nem tart, de a korona túl sok lenne.',
            'Kivehető fogsorok: részleges vagy teljes fogsorok azokra az esetekre, amikor a fix pótlás nem lehetséges, vagy nem szeretnéd.',
          ],
        },
        {
          heading: 'Digitális lenyomat',
          paragraphs: [
            'A hagyományos lenyomatanyag helyett a lenyomatot a Medit i700 intraorális szkennerrel vesszük. A szkenner a képernyőn 3D modellt készít a fogakról, amelyet te is látsz. Kényelmesebb, főleg azoknak, akiknek erős az öklendezési reflexük. Ha valami nem sikerült jól, csak azt a területet szkenneljük újra. A fájl digitálisan jut el a fogtechnikai laborba.',
          ],
        },
        {
          heading: 'Hogyan készül egy fogpótlás',
          paragraphs: [
            'Először kezeljük a szuvasodást, az ínyt és az esetleges gyökérkezelést igénylő problémákat. Ezután előkészítjük a fogakat, lenyomatot veszünk, és ideiglenes pótlást kapsz, hogy ne maradj fogak nélkül. Miután a labor elkészítette a pótlást, felpróbáljuk, ellenőrizzük a színét, a formáját és a harapást, és csak ezután rögzítjük véglegesen. Egy koronához vagy hídhoz általában két-három látogatás szükséges.',
          ],
        },
        {
          heading: 'Hogyan ápold a fogpótlást',
          paragraphs: [
            'A pótlás nem szuvasodik, de az alatta lévő fog és a körülötte lévő íny megbetegedhet. Moss fogat naponta kétszer, a híd alatt tisztíts speciális fogselyemmel vagy szájzuhannyal, és gyere ellenőrzésre és szájhigiénés kezelésre hathavonta.',
          ],
        },
      ],
      faqs: [
        {
          question: 'Mit válasszak: hidat vagy implantátumot?',
          answer:
            'A híd gyorsabban elkészül, de a szomszédos fogak lecsiszolásával jár. Az implantátum nem érinti a szomszédos fogakat, de elegendő csontra és néhány hónapos gyógyulásra van szükség hozzá. Az orvos elmagyarázza, mi illik a te esetedhez.',
        },
        {
          question: 'Milyen anyagból készülnek a koronák?',
          answer:
            'A leggyakrabban cirkónium-oxidot és teljes kerámiát használunk. A cirkónium nagyon ellenálló, és a hátsó fogakra alkalmas, a teljes kerámia pedig nagyon természetesen hat a frontfogak területén. A választás a fogtól, a harapástól és attól függ, mennyire fontos a megjelenés.',
        },
        {
          question: 'Mennyi ideig hordom az ideiglenes pótlást?',
          answer:
            'Általában egy-két hétig egy koronánál vagy egy egyszerű hídnál. Implantátumos pótlásoknál vagy nagyobb rehabilitációknál az ideiglenes pótlás tovább is maradhat.',
        },
        {
          question: 'Meddig tart ki egy korona?',
          answer:
            'Egy jól elkészített és ápolt korona sok évig kitarthat. Számít a szájhigiénia, a rendszeres ellenőrzés, és az, hogy csikorgatod-e a fogaidat. Fogcsikorgatás (bruxizmus) esetén éjszakai védősín készíthető.',
        },
      ],
    },

    // ------------------------------------------------------------------
    'coroane-dentare': {
      intro:
        'A fogkorona olyan pótlás, amely teljesen befed egy meggyengült, letört vagy gyökérkezelt fogat, és visszaadja a formáját, a szilárdságát és a színét. Véglegesen rögzítjük, tehát nem vehető ki. Szatmárnémetiben (Satu Mare), a DENTCRAFT rendelőben a koronákat Dr. Petric Răzvan-Tudor készíti, a Medit i700 intraorális szkennerrel vett digitális lenyomat alapján.',
      sections: [
        {
          heading: 'Mikor van szükséged koronára',
          paragraphs: [],
          bullets: [
            'a fogban olyan nagy tömés van, hogy a megmaradt falak letörhetnek;',
            'a fog megrepedt, vagy letört belőle egy darab;',
            'a fog gyökérkezelt, és törékenyebb;',
            'meg szeretnéd változtatni egy fog formáját vagy színét, de egy héj nem elég;',
            'egy implantátumot kell befedni (implantátumra rögzített korona).',
          ],
        },
        {
          heading: 'Cirkónium vagy teljes kerámia',
          paragraphs: [
            'A cirkónium-oxid nagyon ellenálló anyag, amely az őrlő- és kisőrlőfogakra alkalmas, ahol nagyok a rágóerők. A teljes kerámia ugyanúgy átengedi a fényt, mint a zománc, ezért a frontfogakon nagyon természetesen hat. Az orvos a fog helyzete, a harapás és aszerint javasolja az anyagot, hogy neked mennyire fontos a megjelenés.',
          ],
        },
        {
          heading: 'A korona elkészítésének lépései',
          paragraphs: [],
          bullets: [
            'Előkészítés: ha szükséges, a fogat kezeljük, majd helyi érzéstelenítésben minden oldalán kissé lecsiszoljuk.',
            'Digitális lenyomat: a szkenner 3D modellt készít a fogról, lenyomatanyag nélkül.',
            'Ideiglenes korona: ezt viseled, amíg a végleges elkészül, hogy a fog védve legyen.',
            'Próba és ragasztás: ellenőrizzük a formát, a színt és a harapást, majd a koronát véglegesen rögzítjük.',
          ],
        },
        {
          heading: 'A korona ápolása',
          paragraphs: [
            'A korona nem szuvasodik, de az alatta lévő fog széle igen. Alaposan mosd a korona és az íny közötti határvonalat, használj fogselymet, és gyere ellenőrzésre hathavonta. Ha éjszaka csikorgatod a fogaidat, egy védősín segít, hogy a korona tovább kitartson.',
          ],
        },
      ],
      faqs: [
        {
          question: 'Fáj a fog lecsiszolása a koronához?',
          answer:
            'Nem, mert helyi érzéstelenítésben történik. Miután elmúlik az érzéstelenítés, a fog néhány napig kissé érzékeny lehet.',
        },
        {
          question: 'Hány látogatásra van szükség?',
          answer:
            'Általában kettőre-háromra: egy az előkészítésre és a lenyomatra, egy a próbára és a ragasztásra, a frontfogaknál pedig néha egy további színpróbára.',
        },
        {
          question: 'Látszik, hogy korona?',
          answer:
            'Egy jól elkészített korona formája és színe megegyezik a szomszédos fogakéval. A színt a rendelőben választjuk ki, a frontfogaknál pedig addig próbálunk, amíg elégedett nem vagy.',
        },
        {
          question: 'Kaphat koronát egy ideg nélküli fog?',
          answer:
            'Igen, és sokszor ajánlott is. A gyökérkezelt fogak, főleg az őrlőfogak, könnyebben megrepedhetnek, a korona pedig védi őket. Néha előtte csapra van szükség, hogy megtartsa a felépítést.',
        },
      ],
    },

    // ------------------------------------------------------------------
    'fatete-dentare': {
      intro:
        'A fogászati héjak vékony kerámia- vagy kompozitlapok, amelyeket a frontfogak külső felszínére ragasztunk. Korrigálják a fogak színét, formáját, méretét és a kisebb hézagokat, minimális csiszolással. Szatmárnémetiben (Satu Mare), a DENTCRAFT rendelőben a héjakat Dr. Petric Răzvan-Tudor tervezi és helyezi fel, aki esztétikai fogászati képzést végzett a Mauro Fradeani Education kurzusain.',
      sections: [
        {
          heading: 'Mikor jó megoldás a héj',
          paragraphs: [],
          bullets: [
            'elszíneződött fogak, amelyek fehérítéssel nem világosodnak eléggé;',
            'csorbult vagy kopott fogak;',
            'kicsi, szabálytalan formájú vagy kissé elfordult fogak;',
            'kisebb hézagok a frontfogak között.',
          ],
          after:
            'A héjak nem helyettesítik a fogszabályozó készüléket, ha a fogak nagyon zsúfoltak, és nem megoldás kezeletlen szuvasodás vagy gyulladt íny esetén sem. Ezeket előbb rendbe tesszük.',
        },
        {
          heading: 'Kerámia vagy kompozit',
          paragraphs: [
            'A kerámia héjak fogtechnikai laborban készülnek. Sokáig megőrzik a színüket és a fényüket, és nagyon természetesen hatnak. A kompozit héjakat közvetlenül a fogon formázzuk, általában egyetlen alkalommal. Könnyebben javíthatók, de idővel elszíneződhetnek és kophatnak. Hogy melyiket választod, az a fogaidtól függ, és attól, mennyi ideig szeretnéd, hogy a pótlás javítás nélkül kitartson.',
          ],
        },
        {
          heading: 'Hogyan zajlik a kezelés',
          paragraphs: [
            'Egy beszélgetéssel kezdünk arról, mit szeretnél, és fényképeket, valamint digitális szkennelést készítünk a fogakról. Ezek alapján elkészülhet a mosoly makettje, amelyet a szádban felpróbálhatsz, mielőtt bármelyik foghoz hozzányúlnánk. Így látod a leendő héjak formáját és hosszát.',
            'Ha tetszik az eredmény, a fogakat minimális csiszolással előkészítjük, lenyomatot veszünk, és ideiglenes héjakat kapsz. A következő látogatáskor a végleges héjakat felpróbáljuk és felragasztjuk. A kerámia héjakhoz általában néhány látogatásra van szükség, néhány hét alatt.',
          ],
        },
        {
          heading: 'Hogyan ápold a héjakat',
          paragraphs: [
            'Moss fogat a szokásos módon, használj fogselymet, és gyere ellenőrzésre és szájhigiénés kezelésre hathavonta. Kerüld a kemény tárgyak harapását, például tollat, jeget vagy gyümölcsmagot, és ne nyiss ki csomagolást a fogaiddal. Ha csikorgatod a fogaidat, éjszakára viselj védősínt.',
          ],
        },
      ],
      faqs: [
        {
          question: 'Le kell csiszolni a fogakat a héjakhoz?',
          answer:
            'Általában csak nagyon kicsit, a zománcból mindössze egy milliméter töredékét. Bizonyos esetekben szinte csiszolás nélkül is dolgozhatunk. Hogy mennyire van szükség, az a tervezéskor derül ki, még mielőtt bármilyen beavatkozás történne.',
        },
        {
          question: 'Meddig tartanak ki a héjak?',
          answer:
            'A jól ápolt kerámia héjak sok évig kitarthatnak. A kompozit héjak gyakrabban igényelnek polírozást és javítást. A tartósság a szájhigiéniától, a fogcsikorgatástól és a szokásoktól is függ, például a körömrágástól.',
        },
        {
          question: 'Láthatom előre az eredményt?',
          answer:
            'Igen. A fényképekből és a szkennelésből makett készül, amelyet a szádban felpróbálhatsz, hogy lásd a leendő héjak formáját. Semmit nem csiszolunk le, amíg nem értesz egyet a formával.',
        },
        {
          question: 'Fehéríthetők később a héjak?',
          answer:
            'Nem. A kerámia nem fehéríthető. Ha fehérebb fogakat szeretnél, a fehérítést a héjak előtt kell elvégezni, hogy azok árnyalata illeszkedjen a többi foghoz.',
        },
      ],
    },

    // ------------------------------------------------------------------
    'albire-dentara': {
      intro:
        'A professzionális fogfehérítés egy orvos által felvitt és ellenőrzött géllel világosítja a fogak árnyalatát. Hatásos a kávé, a tea, a bor vagy a dohányzás okozta elszíneződésekre és az életkorral járó sárgulásra. Szatmárnémetiben (Satu Mare), a DENTCRAFT rendelőben a fehérítésre egy konzultáció után kerül sor, amelyen ellenőrizzük, hogy a fogak és az íny felkészültek-e rá.',
      sections: [
        {
          heading: 'Kinek ajánlott a fogfehérítés',
          paragraphs: [
            'A fehérítés a saját, besárgult vagy felszínesen elszíneződött fogakon adja a legjobb eredményt. A tömések, koronák és héjak színét nem változtatja meg, ezért ha a frontfogaidon pótlások vannak, a fehérítés után szükség lehet a cseréjükre, hogy az árnyalat illeszkedjen.',
            'Terhesség és szoptatás idején a fehérítés nem ajánlott, ahogy kezeletlen szuvasodás vagy gyulladt íny esetén sem. Ezeket előbb kezeljük. A mély elszíneződések, például egyes gyógyszerek okozta foltok, nehezen fehéríthetők, ezekre a héjak lehetnek alkalmasabbak.',
          ],
        },
        {
          heading: 'Hogyan zajlik a rendelői fehérítés',
          paragraphs: [],
          bullets: [
            'Konzultáció: az orvos ellenőrzi a fogakat és az ínyt, és feljegyzi a kiinduló árnyalatot.',
            'Szájhigiénés kezelés: előtte eltávolítjuk a fogkövet és a felszíni elszíneződéseket, hogy a gél egyenletesen hasson.',
            'Az íny védelme: az ínyt védőréteggel fedjük be, hogy a gél ne érintkezzen vele.',
            'A gél felvitele: a fehérítő gél az orvos által meghatározott ideig marad a fogakon, majd eltávolítjuk.',
            'Az eredmény: összehasonlítjuk az új árnyalatot a kiindulóval.',
          ],
        },
        {
          heading: 'Érzékenység a fehérítés után',
          paragraphs: [
            'Sok páciens az első napokban hidegérzékenységet tapasztal. Ez átmeneti. Segít egy érzékeny fogakra való fogkrém, amelyet néhány nappal előtte és utána is használsz. Ha tudod, hogy érzékenyek a fogaid, mondd el az orvosnak már az elején.',
          ],
        },
        {
          heading: 'Hogyan őrizd meg az eredményt',
          paragraphs: [
            'Az első 48 órában kerüld a kávét, a fekete teát, a vörösbort, a színes szószokat és a dohányzást, mert közvetlenül a fehérítés után a fogak könnyebben elszíneződnek. Ezután a hathavonta végzett szájhigiénés kezelés és a helyes fogmosás tovább őrzi meg az árnyalatot. Hogy meddig tart a hatás, az nagyban függ a szokásaidtól.',
          ],
        },
      ],
      faqs: [
        {
          question: 'Károsítja a fehérítés a zománcot?',
          answer:
            'Nem, ha szakszerűen, orvosi felügyelet mellett végzik. A gél a fogban lévő festékanyagokra hat, nem a zománc szerkezetére. A fehérítés utáni érzékenység átmeneti.',
        },
        {
          question: 'Mennyire lesznek fehérek a fogaim?',
          answer:
            'Ez a kiinduló árnyalattól és az elszíneződés típusától függ. A sárgás fogak általában jobban fehéríthetők, mint a szürkések. Az orvos a konzultáción elmondja, mire számíthatsz reálisan.',
        },
        {
          question: 'Fehéríttethetek, ha koronáim vagy héjaim vannak?',
          answer:
            'Igen, de a pótlások megtartják a színüket, így eltérés látszhat a saját fogaidhoz képest. Előtte megbeszéljük, megéri-e a fehérítés, és utána le kellene-e cserélni a pótlásokat.',
        },
        {
          question: 'Meddig tart a hatás?',
          answer:
            'Nagyban függ a szokásaidtól: a kávé, a tea, a bor és a dohányzás újra elszínezi a fogakat. Rendszeres szájhigiénés kezeléssel és odafigyeléssel az étkezésre az eredmény tovább megmarad.',
        },
      ],
    },

    // ------------------------------------------------------------------
    'estetica-dentara': {
      intro:
        'Az esztétikai fogászat azzal foglalkozik, hogyan néz ki a mosoly: a fogak színével, formájával és arányaival, valamint az íny kontúrjával. Ide tartozik a fogfehérítés, a héjak, a kerámiakoronák és a kompozittal végzett formakorrekció. Szatmárnémetiben (Satu Mare), a DENTCRAFT rendelőben az esztétikai tervet Dr. Petric Răzvan-Tudor készíti, aki a Mauro Fradeani Education kurzusain képezte magát.',
      sections: [
        {
          heading: 'Milyen kezelések tartoznak az esztétikai fogászathoz',
          paragraphs: [],
          bullets: [
            'professzionális fogfehérítés besárgult vagy elszíneződött fogakra;',
            'kerámia vagy kompozit héjak a forma, a szín és a kisebb hézagok korrigálására;',
            'kerámiakoronák erősen roncsolt fogakra, vagy olyan régi pótlások helyett, amelyek már nem néznek ki jól;',
            'korrekciók kompozittal: egy csorba sarok, egy kis hézag, egy kopott fogél;',
            'a régi, sötét tömések cseréje a frontfogakon.',
          ],
          after:
            'Ha a fogak ferdék, sokszor a fogszabályozó készülék jobban és kevesebb csiszolással oldja meg a problémát, mint a héjak. Ha szükséges, Dr. Cozma Ștefanához irányítunk.',
        },
        {
          heading: 'Hogyan tervezünk meg egy mosolyt',
          paragraphs: [
            'Egy beszélgetéssel kezdünk arról, mi zavar, és mit szeretnél. Fényképeket és digitális szkennelést készítünk a Medit i700 szkennerrel. Ezek alapján az orvos elemzi a fogak arányait az ajkakhoz és az arcodhoz viszonyítva. Ha szükséges, makett készül, amelyet a szádban felpróbálhatsz, hogy lásd, hogyan nézne ki az eredmény, mielőtt bármelyik foghoz hozzányúlnánk.',
          ],
        },
        {
          heading: 'Az egészség az első',
          paragraphs: [
            'Egy esztétikai kezelés csak egészséges fogakon és ínyen tartós. Ezért a héjak vagy koronák előtt kezeljük a szuvasodást, elvégezzük a szájhigiénés kezelést, és ha szükséges, az íny kezelését is. Ha csikorgatod a fogaidat, egy védősínről is beszélünk, hogy az új pótlások ne csorbuljanak ki.',
          ],
        },
      ],
      faqs: [
        {
          question: 'Hol kezdjem, ha szebb mosolyt szeretnék?',
          answer:
            'Egy konzultációval. Az orvos megnézi, mi zavar, ellenőrzi a fogak és az íny egészségét, és javaslatot tesz a lehetséges megoldásokra, a legegyszerűbbektől, például a fehérítéstől a héjakig vagy koronákig.',
        },
        {
          question: 'Héj vagy fehérítés?',
          answer:
            'Ha csak a színnel van gond, általában a fehérítés az első lépés, mert nem kell hozzányúlni a fogakhoz. A héjak akkor jó megoldások, ha a formán, a méreten vagy a fogak közötti hézagokon is változtatni szeretnél.',
        },
        {
          question: 'Láthatom az eredményt a kezelés előtt?',
          answer:
            'Igen. A fényképekből és a digitális szkennelésből makett készülhet, amelyet a szádban felpróbálhatsz. Semmit nem csiszolunk le, amíg nem értesz egyet a javasolt formával.',
        },
        {
          question: 'Mennyi ideig tart egy esztétikai kezelés?',
          answer:
            'Egy fehérítés vagy egy kompozitos korrekció általában egy látogatás alatt elkészül. A héjak és a kerámiakoronák több látogatást igényelnek, néhány hét alatt, mert fogtechnikai laborban készülnek.',
        },
      ],
    },
  },
}
