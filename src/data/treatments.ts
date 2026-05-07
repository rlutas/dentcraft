// AUTO-GENERATED from Stomawin export by scripts/generate-treatments.mjs
// Do not edit by hand. Re-run the script to refresh.
// Source: Dr. Petric Razvan-Tudor catalog, exported 2026-05-05

export type Locale = 'ro' | 'en' | 'hu'

export type Treatment = {
  id: string
  labels: Record<Locale, string>
  price: number
  priceType: 'fixed' | 'from'
}

export type TreatmentCategory = {
  id: string
  labels: Record<Locale, string>
  treatments: Treatment[]
}

export const treatmentCategories: TreatmentCategory[] = [
  {
    "id": "chirurgie-oro-maxilo-faciala",
    "labels": {
      "ro": "Chirurgie Oro Maxilo Faciala",
      "en": "Chirurgie Oro Maxilo Faciala",
      "hu": "Chirurgie Oro Maxilo Faciala"
    },
    "treatments": [
      {
        "id": "augmentare-de-creasta-alveolara-cu-os-artificial",
        "labels": {
          "ro": "Augmentare de creastă alveolară cu os artificial",
          "en": "Alveolar ridge augmentation with artificial bone",
          "hu": "Augmentácíós csontpótlás"
        },
        "price": 3000,
        "priceType": "from"
      },
      {
        "id": "augmentare-de-creasta-alveolara-cu-autogrefa",
        "labels": {
          "ro": "Augmentare de creastă alveolară cu autogrefă",
          "en": "Alveolar ridge augmentation with autograft",
          "hu": "Augmentácíós csontpótlás (autogén)"
        },
        "price": 5000,
        "priceType": "from"
      },
      {
        "id": "chistectomie-formatiune-mica",
        "labels": {
          "ro": "Chistectomie - formaţiune mică",
          "en": "Cystectomy - small",
          "hu": "Cystaeltávolítás - kicsi"
        },
        "price": 200,
        "priceType": "fixed"
      },
      {
        "id": "chistectomie-formatiune-medie",
        "labels": {
          "ro": "Chistectomie - formaţiune medie",
          "en": "Cystectomy - medium",
          "hu": "Cystaeltávolítás - közepes"
        },
        "price": 400,
        "priceType": "fixed"
      },
      {
        "id": "chistectomie-formatiune-mare",
        "labels": {
          "ro": "Chistectomie - formaţiune mare",
          "en": "Cystectomy - large",
          "hu": "Cystaeltávolítás - nagy"
        },
        "price": 600,
        "priceType": "fixed"
      },
      {
        "id": "lifting-sinusal-intern",
        "labels": {
          "ro": "Lifting sinusal intern",
          "en": "Internal sinus lift procedure",
          "hu": "Belső sinus lifting"
        },
        "price": 5000,
        "priceType": "from"
      },
      {
        "id": "lifting-sinusal-extern",
        "labels": {
          "ro": "Lifting sinusal extern",
          "en": "External sinus lift procedure",
          "hu": "Külső sinus lifting"
        },
        "price": 5000,
        "priceType": "from"
      },
      {
        "id": "extractie-dinti-inclusi-submucos",
        "labels": {
          "ro": "Extracţie dinţi incluşi submucos",
          "en": "Submucosal tooth extraction",
          "hu": "Nyálkahártya alatti fogeltávolítás"
        },
        "price": 800,
        "priceType": "from"
      },
      {
        "id": "extractie-dinti-inclusi-intraos",
        "labels": {
          "ro": "Extracţie dinţi incluşi intraos",
          "en": "Intraosseous tooth extraction",
          "hu": "Intraossealis fogeltávolítás"
        },
        "price": 800,
        "priceType": "from"
      }
    ]
  },
  {
    "id": "ortodontie",
    "labels": {
      "ro": "Ortodontie",
      "en": "Ortodontie",
      "hu": "Ortodontie"
    },
    "treatments": [
      {
        "id": "aparat-fix-pe-o-arcada-cu-bracketi-metalici",
        "labels": {
          "ro": "Aparat fix pe o arcadă (cu bracketi metalici)",
          "en": "Fixed orthodontic appliances on one arch - metal brackets",
          "hu": "Fix készülék 1 fogívre"
        },
        "price": 3000,
        "priceType": "fixed"
      },
      {
        "id": "aparat-fix-pe-o-arcada-cu-bracketi-ceramici-fizionomici",
        "labels": {
          "ro": "Aparat fix pe o arcadă (cu bracketi ceramici/fizionomici)",
          "en": "Fixed orthodontic appliances on one arch - ceramic brackets",
          "hu": "Fix készülék 1 fogívre FIZIONOM"
        },
        "price": 4000,
        "priceType": "fixed"
      },
      {
        "id": "clear-correct-aparat-ortodontic-invizibil",
        "labels": {
          "ro": "Clear Correct Aparat Ortodontic Invizibil",
          "en": "Invisalign",
          "hu": "Láthatatlan fogszabályozó készülék INVISALIGN"
        },
        "price": 12500,
        "priceType": "fixed"
      },
      {
        "id": "activare-aparat-fix-bimaxilar",
        "labels": {
          "ro": "Activare aparat fix bimaxilar",
          "en": "Orthodontic activator exam",
          "hu": "Ortodonciás készülék aktívátor ellenőrzés"
        },
        "price": 300,
        "priceType": "fixed"
      },
      {
        "id": "activare-aparat-fix-arcada",
        "labels": {
          "ro": "Activare aparat fix/arcada",
          "en": "Fixed braces exam",
          "hu": "Fix készülék ellenőrzése"
        },
        "price": 200,
        "priceType": "fixed"
      },
      {
        "id": "activare-aparat-mobilizabil",
        "labels": {
          "ro": "Activare aparat mobilizabil",
          "en": "Mobile braces exam",
          "hu": "Mobil készülék ellenőrzése"
        },
        "price": 200,
        "priceType": "fixed"
      },
      {
        "id": "recolare-inlocuire-bracket",
        "labels": {
          "ro": "Recolare/inlocuire bracket",
          "en": "Pediatric dental consultation",
          "hu": "Gyerek konzultáció"
        },
        "price": 50,
        "priceType": "fixed"
      },
      {
        "id": "aparat-mobilizabil",
        "labels": {
          "ro": "Aparat mobilizabil",
          "en": "Mobile appliances",
          "hu": "Mobil készülék"
        },
        "price": 1700,
        "priceType": "fixed"
      },
      {
        "id": "aplicare-si-adaptare-elemente-speciale-de-tractiune",
        "labels": {
          "ro": "Aplicare şi adaptare elemente speciale de tractiune",
          "en": "Application and adaptation of special traction appliances",
          "hu": "Speciális húzó elemensek alkalmazása"
        },
        "price": 150,
        "priceType": "fixed"
      },
      {
        "id": "indepartare-aparat-fix-la-cererea-pacientului",
        "labels": {
          "ro": "Îndepărtare aparat fix la cererea pacientului",
          "en": "Removement fixed orthodontics appliances",
          "hu": "Fx készülék eltávolítás"
        },
        "price": 500,
        "priceType": "from"
      },
      {
        "id": "aparat-fix-autoligaturant-pe-o-arcada-cu-bracketi-transparenti",
        "labels": {
          "ro": "Aparat fix autoligaturant pe o arcadă (cu bracketi transparenti)",
          "en": "Radiance fixed orthodontic appliances - safir transparent brackets",
          "hu": "Fix készülék 1 fogívre RADIANCE"
        },
        "price": 5000,
        "priceType": "fixed"
      },
      {
        "id": "aparat-fix-autoligaturant-pe-o-arcada-cu-bracketi-metalici",
        "labels": {
          "ro": "Aparat fix autoligaturant pe o arcadă (cu bracketi metalici)",
          "en": "Invisalign",
          "hu": "Láthatatlan fogszabályozó készülék INVISALIGN"
        },
        "price": 4000,
        "priceType": "fixed"
      }
    ]
  },
  {
    "id": "consultatii-control",
    "labels": {
      "ro": "Consultații-Control",
      "en": "Consultation, routine - exam",
      "hu": "Ellenőrzés, szaktanácsadás"
    },
    "treatments": [
      {
        "id": "consultatie-chirurgie-implantologie",
        "labels": {
          "ro": "Consultaţie Chirurgie / Implantologie",
          "en": "Oral surgery consultation / implant dentistry",
          "hu": "Sebészeti / Implantológiai ellenőrzés, szaktanácsadás"
        },
        "price": 200,
        "priceType": "fixed"
      },
      {
        "id": "consultatie-documentare-caz",
        "labels": {
          "ro": "Consultaţie+Documentare caz",
          "en": "Pediatric dental consultation",
          "hu": "Gyerek konzultáció"
        },
        "price": 500,
        "priceType": "fixed"
      },
      {
        "id": "consultatie-primara-poze-scanare",
        "labels": {
          "ro": "Consultaţie primara+poze+scanare",
          "en": "Dental consultation and hygiene training",
          "hu": "Elsődleges vizsgálat, a diagnózis megállapítása és a kezelési terv felállítása"
        },
        "price": 250,
        "priceType": "fixed"
      },
      {
        "id": "urgente",
        "labels": {
          "ro": "Urgențe",
          "en": "Emergencies",
          "hu": "Sürgősségi ellátás"
        },
        "price": 200,
        "priceType": "fixed"
      },
      {
        "id": "consultatie-discutie",
        "labels": {
          "ro": "Consultatie/discutie",
          "en": "Treatment planning",
          "hu": "Kezelési terv elkészítése"
        },
        "price": 150,
        "priceType": "fixed"
      }
    ]
  },
  {
    "id": "igienizare-profilaxie",
    "labels": {
      "ro": "Igienizare-Profilaxie",
      "en": "Prophylaxis appointment and cleaning",
      "hu": "Szájhigiénia- Prevenció"
    },
    "treatments": [
      {
        "id": "detartraj-profesional-cu-air-flow",
        "labels": {
          "ro": "Detartraj profesional cu Air Flow",
          "en": "Air flow cleaning",
          "hu": "Teljes szájhigiénizálás (Air Flow)"
        },
        "price": 600,
        "priceType": "fixed"
      },
      {
        "id": "periaj-dentar-profesional",
        "labels": {
          "ro": "Periaj dentar profesional",
          "en": "Professional brushing",
          "hu": "Professzionális fogmosás"
        },
        "price": 200,
        "priceType": "fixed"
      },
      {
        "id": "gutiera-maxilara",
        "labels": {
          "ro": "Gutieră maxilară",
          "en": "Maxillary splint",
          "hu": "Maxillaris sín"
        },
        "price": 500,
        "priceType": "fixed"
      },
      {
        "id": "sigilare-santuri-si-fosete",
        "labels": {
          "ro": "Sigilare şanţuri şi fosete",
          "en": "Pit and fisures sealing",
          "hu": "Barázdazárás (foganként)"
        },
        "price": 200,
        "priceType": "from"
      },
      {
        "id": "fluorizare-topica",
        "labels": {
          "ro": "Fluorizare topică",
          "en": "Topical fluoride treatment",
          "hu": "Helyi fluorozás (fluor tartalmú zselékkel, fogívenként)"
        },
        "price": 200,
        "priceType": "fixed"
      },
      {
        "id": "detartraj-ultrasonic",
        "labels": {
          "ro": "Detartraj ultrasonic",
          "en": "Ultrasonic scaling",
          "hu": "Ultrahangos fogkő-eltávolítás (fogívenként)"
        },
        "price": 200,
        "priceType": "fixed"
      },
      {
        "id": "gutiera-mandibulara",
        "labels": {
          "ro": "Gutieră mandibulară",
          "en": "Mandibular splint",
          "hu": "Mandibullaris sín"
        },
        "price": 500,
        "priceType": "fixed"
      }
    ]
  },
  {
    "id": "estetica-dentara-albire-dentara",
    "labels": {
      "ro": "Estetică dentară - Albire dentară",
      "en": "Dental esthetics - teeth whitening",
      "hu": "Esztétika-Fogfehérítés"
    },
    "treatments": [
      {
        "id": "albire-dentara-opalescence-ultradent-in-cabinet",
        "labels": {
          "ro": "Albire dentară Opalescence ultradent în cabinet",
          "en": "Opalescence ultradent teeth whitening",
          "hu": "Belső fehérítés"
        },
        "price": 1000,
        "priceType": "fixed"
      },
      {
        "id": "albire-dentara-opalescence-ultradent-acasa",
        "labels": {
          "ro": "Albire dentară Opalescence ultradent acasă",
          "en": "Opalescence ultradent teeth whitening - at home",
          "hu": "Otthoni fogfehérítés"
        },
        "price": 1000,
        "priceType": "fixed"
      },
      {
        "id": "tratament-albire-dinti-devitali",
        "labels": {
          "ro": "Tratament albire dinţi devitali",
          "en": "Whitening therapy for devital teeth",
          "hu": "Fogfehérítés"
        },
        "price": 200,
        "priceType": "fixed"
      }
    ]
  },
  {
    "id": "endodontie",
    "labels": {
      "ro": "Endodonție",
      "en": "Endodontics",
      "hu": "Endodoncia"
    },
    "treatments": [
      {
        "id": "dezobturarea-canalelor-radiculare",
        "labels": {
          "ro": "Dezobturarea canalelor radiculare",
          "en": "Root canal filling replacement",
          "hu": "Gyökértömés csere"
        },
        "price": 150,
        "priceType": "from"
      },
      {
        "id": "tratament-endo-dinte-monoradicular",
        "labels": {
          "ro": "Tratament endo dinte monoradicular",
          "en": "Root canal filling - monoradicular tooth",
          "hu": "Gyökértömés egycsatornás fogak esetén"
        },
        "price": 800,
        "priceType": "from"
      },
      {
        "id": "tratament-endo-dinte-biradicular",
        "labels": {
          "ro": "Tratament endo dinte biradicular",
          "en": "Three canals filling - gangrene Rx. control",
          "hu": "Gépi gyökértágitás és vertikális gépi gyökértömés 3 kanális (Sybron Endo)"
        },
        "price": 800,
        "priceType": "from"
      },
      {
        "id": "tratament-endo-dinte-pluriradicular",
        "labels": {
          "ro": "Tratament endo dinte pluriradicular",
          "en": "Root canal filling - pluriradicular tooth",
          "hu": "Gyökértömés két-vagy többcsatornás fogak esetén"
        },
        "price": 1000,
        "priceType": "from"
      },
      {
        "id": "coafaj-direct",
        "labels": {
          "ro": "Coafaj direct",
          "en": "Direct pulp capping",
          "hu": "Direkt pulpasapkázás"
        },
        "price": 300,
        "priceType": "from"
      },
      {
        "id": "coafaj-indirect",
        "labels": {
          "ro": "Coafaj indirect",
          "en": "Indirect pulp capping",
          "hu": "Indirekt pulpasapkázás"
        },
        "price": 300,
        "priceType": "from"
      },
      {
        "id": "obturatie-de-canal-retrograda",
        "labels": {
          "ro": "Obturaţie de canal retrograda",
          "en": "Retrograde root canal therapy",
          "hu": "Retrograd csatorna tömés"
        },
        "price": 500,
        "priceType": "from"
      },
      {
        "id": "explorarea-canalului-in-radacini-calcificate",
        "labels": {
          "ro": "Explorarea canalului în rădăcini calcificate",
          "en": "Therapy of calcified root canal",
          "hu": "Elmeszesedett gyökerek felfedése"
        },
        "price": 100,
        "priceType": "from"
      },
      {
        "id": "pulpectomie",
        "labels": {
          "ro": "Pulpectomie",
          "en": "Cleaning and preparation of root canals",
          "hu": "Gyökércsatorna előkészítése, irrigálása"
        },
        "price": 200,
        "priceType": "fixed"
      },
      {
        "id": "build-up-pre-endo",
        "labels": {
          "ro": "Build-up pre-endo",
          "en": "Dental filling - foto",
          "hu": "Fotos alábélelés"
        },
        "price": 200,
        "priceType": "from"
      }
    ]
  },
  {
    "id": "parodontologie",
    "labels": {
      "ro": "Parodontologie",
      "en": "Parodontology",
      "hu": "Parodontológia"
    },
    "treatments": [
      {
        "id": "chiuretaj-in-camp-deschis",
        "labels": {
          "ro": "Chiuretaj în câmp deschis",
          "en": "Open flap curettage",
          "hu": "Nyitott téri küret"
        },
        "price": 1500,
        "priceType": "fixed"
      },
      {
        "id": "chiuretaj-parodontal",
        "labels": {
          "ro": "Chiuretaj parodontal",
          "en": "Periodontal curettage procedure",
          "hu": "Parodontális küret"
        },
        "price": 150,
        "priceType": "fixed"
      },
      {
        "id": "tratamentul-infectiei-acute-parodontale",
        "labels": {
          "ro": "Tratamentul infecţiei acute parodontale",
          "en": "Treatment of acute periodontal infection",
          "hu": "Akut parodontitis kezelése"
        },
        "price": 150,
        "priceType": "fixed"
      },
      {
        "id": "tratamentul-infectiei-parodontale",
        "labels": {
          "ro": "Tratamentul infecţiei parodontale",
          "en": "Treatment of periodontal infection",
          "hu": "Parodontitis kezelése"
        },
        "price": 150,
        "priceType": "fixed"
      },
      {
        "id": "planare-radiculara-cu-chiuretaj-subgingival",
        "labels": {
          "ro": "Planare radiculară cu chiuretaj subgingival",
          "en": "Subgingival curettage",
          "hu": "Szubgingivális küret, gyökér elsimítással"
        },
        "price": 200,
        "priceType": "fixed"
      },
      {
        "id": "gingivectomie",
        "labels": {
          "ro": "Gingivectomie",
          "en": "Gingivectomy",
          "hu": "Gingivectomia"
        },
        "price": 100,
        "priceType": "fixed"
      },
      {
        "id": "operatie-cu-lambou",
        "labels": {
          "ro": "Operaţie cu lambou",
          "en": "Flap surgery",
          "hu": "Lebeny műtét"
        },
        "price": 200,
        "priceType": "fixed"
      },
      {
        "id": "operatie-cu-lambou-pentru-lungirea-coroanei-dintelui",
        "labels": {
          "ro": "Operaţie cu lambou pentru lungirea coroanei dintelui",
          "en": "Flap surgery for tooth crown lengthening",
          "hu": "Lebeny műtét, fogkorona hosszabbításért"
        },
        "price": 1000,
        "priceType": "fixed"
      },
      {
        "id": "grefa-gingivala-per-dinte-sau-implant",
        "labels": {
          "ro": "Grefă gingivală, per dinte sau implant",
          "en": "Bone graft surgery - tooth or implant",
          "hu": "Gingivális fogpotlás, fog vagy implantátumként"
        },
        "price": 1000,
        "priceType": "from"
      },
      {
        "id": "tratament-antiseptic-parodontal",
        "labels": {
          "ro": "Tratament antiseptic parodontal",
          "en": "Tissue regeneration - tooth or implant",
          "hu": "Szöveti reparatio, foganként"
        },
        "price": 100,
        "priceType": "fixed"
      },
      {
        "id": "fisa-parodontala",
        "labels": {
          "ro": "Fisa Parodontala",
          "en": "Treatment planning",
          "hu": "Kezelési terv elkészítése"
        },
        "price": 300,
        "priceType": "fixed"
      }
    ]
  },
  {
    "id": "odontoterapie",
    "labels": {
      "ro": "Odontoterapie",
      "en": "Odontotherapy",
      "hu": "Odontoterapia"
    },
    "treatments": [
      {
        "id": "obturatie-bont-protetic",
        "labels": {
          "ro": "Obturatie bont protetic",
          "en": "Filling finishing",
          "hu": "Tömés finírozás"
        },
        "price": 100,
        "priceType": "from"
      },
      {
        "id": "obturatie-compozit-anterior",
        "labels": {
          "ro": "Obturaţie compozit anterior",
          "en": "Dental filling - foto",
          "hu": "Fotos alábélelés"
        },
        "price": 400,
        "priceType": "from"
      },
      {
        "id": "reconstituire-gc-pe-pivot",
        "labels": {
          "ro": "Reconstituire GC pe pivot",
          "en": "Dental reconstitution - Ketac",
          "hu": "Ketac koronafelépítés"
        },
        "price": 300,
        "priceType": "from"
      },
      {
        "id": "obturatie-compozit-mica",
        "labels": {
          "ro": "Obturaţie compozit mica",
          "en": "Composite filling",
          "hu": "Kompozit tömés"
        },
        "price": 350,
        "priceType": "from"
      },
      {
        "id": "obturatie-compozit-medie",
        "labels": {
          "ro": "Obturaţie compozit medie",
          "en": "Amalgam filling 1 surface",
          "hu": "Egy felszínre kiterjedő amalgám fogtömés"
        },
        "price": 400,
        "priceType": "from"
      },
      {
        "id": "obturatie-compozit-mare",
        "labels": {
          "ro": "Obturaţie compozit mare",
          "en": "Amalgam filling 3 surface",
          "hu": "Három felszínre kiterjedő amalgám fogtömés"
        },
        "price": 450,
        "priceType": "from"
      }
    ]
  },
  {
    "id": "chirurgie-dento-alveolara",
    "labels": {
      "ro": "Chirurgie dento-alveolară",
      "en": "Dentoalveolar surgery",
      "hu": "Dentoalveolaris sebészet"
    },
    "treatments": [
      {
        "id": "extractie-dinti-monoradiculari",
        "labels": {
          "ro": "Extracţie dinţi monoradiculari",
          "en": "Extraction monoradicular tooth",
          "hu": "Egy gyökerű fog eltávolítása"
        },
        "price": 250,
        "priceType": "from"
      },
      {
        "id": "extractie-dinti-pluriradiculari",
        "labels": {
          "ro": "Extracţie dinţi pluriradiculari",
          "en": "Extraction pluriradicular tooth",
          "hu": "Két gyökerű fog eltávolítása"
        },
        "price": 350,
        "priceType": "from"
      },
      {
        "id": "extractie-dinti-parodontotici-mobili",
        "labels": {
          "ro": "Extracţie dinţi parodontotici mobili",
          "en": "Extraction periodontal mobile tooth",
          "hu": "Parodontalis fog eltávolitása"
        },
        "price": 250,
        "priceType": "from"
      },
      {
        "id": "extractie-rest-radicular",
        "labels": {
          "ro": "Extracţie rest radicular",
          "en": "Remaining root extraction",
          "hu": "Gyökércsonk eltávolítása"
        },
        "price": 250,
        "priceType": "from"
      },
      {
        "id": "extractie-molari-erupti-mandibular",
        "labels": {
          "ro": "Extracție molari erupți mandibular",
          "en": "Extraction mandibular molar teeth",
          "hu": "Bölcsességfog eltávolítása (mandibuláris)"
        },
        "price": 400,
        "priceType": "from"
      },
      {
        "id": "extractie-molari-erupti-maxilar",
        "labels": {
          "ro": "Extracție molari erupti maxilar",
          "en": "Extraction maxillary molar teeth",
          "hu": "Bölcsességfog eltávolítása (maxiláris)"
        },
        "price": 400,
        "priceType": "from"
      },
      {
        "id": "gingivectomie-cu-gingivoplastie",
        "labels": {
          "ro": "Gingivectomie cu gingivoplastie",
          "en": "Gingivectomy and gingivoplasty",
          "hu": "Gingivectomia, ínylemetszés"
        },
        "price": 200,
        "priceType": "fixed"
      },
      {
        "id": "gingivoplastie-non-chirurgicala-preprotetic",
        "labels": {
          "ro": "Gingivoplastie Non-Chirurgicală / Preprotetic",
          "en": "Non surgical gingivoplasty treatment",
          "hu": "Protetikai művelet előtti gingivaplasztika, ínyplasztika"
        },
        "price": 100,
        "priceType": "fixed"
      },
      {
        "id": "incizie-tratamentul-abcesului-parodontal",
        "labels": {
          "ro": "Incizie / Tratamentul abcesului parodontal",
          "en": "Incision, peridontal abscess treatment",
          "hu": "Fogtályog bemetszés - kezelés"
        },
        "price": 250,
        "priceType": "fixed"
      },
      {
        "id": "sutura",
        "labels": {
          "ro": "Sutură",
          "en": "Suture",
          "hu": "Öltés"
        },
        "price": 100,
        "priceType": "fixed"
      },
      {
        "id": "extractie-cu-separarea-radacinilor",
        "labels": {
          "ro": "Extracție cu separarea rădăcinilor",
          "en": "Root separation extraction",
          "hu": "Fogeltávolítás gyökerek szeparálásával"
        },
        "price": 500,
        "priceType": "from"
      },
      {
        "id": "odontectomie-molar-inclus",
        "labels": {
          "ro": "Odontectomie molar inclus",
          "en": "Odontectomy procedure for included molar",
          "hu": "Odontectomia"
        },
        "price": 600,
        "priceType": "from"
      },
      {
        "id": "rezectie-apicala-fara-obturatie-de-canal",
        "labels": {
          "ro": "Rezecție apicala fără obturație de canal",
          "en": "Root - end resection",
          "hu": "Gyökércsúcsi rezekció"
        },
        "price": 250,
        "priceType": "from"
      },
      {
        "id": "extractie-molari",
        "labels": {
          "ro": "Extracție molari",
          "en": "Extraction molar teeth",
          "hu": "Bölcsességfog eltávolítása"
        },
        "price": 500,
        "priceType": "from"
      },
      {
        "id": "aplicare-intraalveolara-de-parasorb",
        "labels": {
          "ro": "Aplicare intraalveolară de Parasorb",
          "en": "Intraalveolar application - Gelaspon",
          "hu": "Gelaspon intraalveoláris alkalmazása"
        },
        "price": 150,
        "priceType": "from"
      },
      {
        "id": "chistectomie-formatiune-mica",
        "labels": {
          "ro": "Chistectomie - formaţiune mică",
          "en": "Cystectomy - small",
          "hu": "Cystaeltávolítás - kicsi"
        },
        "price": 200,
        "priceType": "fixed"
      },
      {
        "id": "chistectomie-formatiune-mare",
        "labels": {
          "ro": "Chistectomie - formaţiune mare",
          "en": "Cystectomy - large",
          "hu": "Cystaeltávolítás - nagy"
        },
        "price": 400,
        "priceType": "fixed"
      },
      {
        "id": "decapusonare",
        "labels": {
          "ro": "Decapuşonare",
          "en": "Decapsulation",
          "hu": "Decapusonalas"
        },
        "price": 100,
        "priceType": "fixed"
      },
      {
        "id": "extractie-chirurgicala-dinte-inclus-sau-partial-erupt",
        "labels": {
          "ro": "Extracţie chirurgicală (dinte inclus sau partial erupt)",
          "en": "Extraction included or partially erupted tooth",
          "hu": "Sebészeti fogeltávolítás"
        },
        "price": 500,
        "priceType": "from"
      },
      {
        "id": "membrana-prf",
        "labels": {
          "ro": "Membrana PRF",
          "en": "Gum removal",
          "hu": "Bölcsességfog körüli gogíny eltávolítása"
        },
        "price": 300,
        "priceType": "fixed"
      }
    ]
  },
  {
    "id": "pedodontie",
    "labels": {
      "ro": "Pedodonție",
      "en": "Pediatric dentistry",
      "hu": "Gyermekfogászat"
    },
    "treatments": [
      {
        "id": "sigilare-santuri-si-fosete",
        "labels": {
          "ro": "Sigilare şanţuri şi fosete",
          "en": "Sealing - one tooth",
          "hu": "Barázdazárás (foganként)"
        },
        "price": 200,
        "priceType": "from"
      },
      {
        "id": "extirpare-vitala-dinte-temporar",
        "labels": {
          "ro": "Extirpare vitală dinte temporar",
          "en": "Temporary tooth vital extirpation",
          "hu": "Vitális tejfog extirpálás"
        },
        "price": 150,
        "priceType": "fixed"
      },
      {
        "id": "extractie-dinti-de-lapte-fara-mobilitate",
        "labels": {
          "ro": "Extracţie dinţi de lapte fără mobilitate",
          "en": "Extraction temporary tooth",
          "hu": "Tejfog eltávolítása"
        },
        "price": 250,
        "priceType": "from"
      },
      {
        "id": "extractie-dinti-de-lapte-mobili",
        "labels": {
          "ro": "Extracţie dinţi de lapte mobili",
          "en": "Extraction of moving temporary tooth",
          "hu": "Mozgatható tejfog eltávolítása"
        },
        "price": 150,
        "priceType": "from"
      },
      {
        "id": "fluorizare-topica-1-tratament",
        "labels": {
          "ro": "Fluorizare topică 1 tratament",
          "en": "Topical fluoride treatment",
          "hu": "Fluorral kezelés"
        },
        "price": 200,
        "priceType": "fixed"
      },
      {
        "id": "obturatie-coronara-dinte-temporar-cu-compozit-fotopolimerizabil",
        "labels": {
          "ro": "Obturaţie coronară dinte temporar cu compozit fotopolimerizabil",
          "en": "Composit coronar filling - temporary tooth",
          "hu": "Tejfog kompozit tömés"
        },
        "price": 250,
        "priceType": "from"
      },
      {
        "id": "amprente-in-scop-ortodontic-arcada-superioara-si-inferioara",
        "labels": {
          "ro": "Amprente în scop ortodontic arcada superioară şi inferioară",
          "en": "Impressions for orthodontic purposes",
          "hu": "Ortodonciás lenyomat"
        },
        "price": 300,
        "priceType": "fixed"
      },
      {
        "id": "detartraj-copii",
        "labels": {
          "ro": "Detartraj copii",
          "en": "Scaling / tooth",
          "hu": "Fogkőeltávolítás"
        },
        "price": 250,
        "priceType": "from"
      },
      {
        "id": "sigilare-santuri-si-fosete-dinti-temporar",
        "labels": {
          "ro": "Sigilare santuri si fosete dinti temporar",
          "en": "Sigilare santuri si fosete dinti temporar",
          "hu": "Sigilare santuri si fosete dinti temporar"
        },
        "price": 200,
        "priceType": "from"
      },
      {
        "id": "drenaj",
        "labels": {
          "ro": "Drenaj",
          "en": "Vestibual abscess dreinage",
          "hu": "Vesztibuláris tájog drénezés"
        },
        "price": 150,
        "priceType": "fixed"
      },
      {
        "id": "periaj",
        "labels": {
          "ro": "Periaj",
          "en": "Tooth preparation",
          "hu": "Lecsiszolás"
        },
        "price": 100,
        "priceType": "from"
      },
      {
        "id": "obturatie-coronara-dinte-temporar-cu-glasionomer",
        "labels": {
          "ro": "Obturaţie coronară dinte temporar cu glasionomer",
          "en": "Glass ionomer coronar filling - temporary tooth",
          "hu": "Tejfog üvegionomér tömés"
        },
        "price": 200,
        "priceType": "from"
      },
      {
        "id": "consult-primar-pedodontic",
        "labels": {
          "ro": "Consult primar pedodontic",
          "en": "Topical fluoride treatment - home",
          "hu": "Othoni fluorr kezelés"
        },
        "price": 100,
        "priceType": "fixed"
      }
    ]
  },
  {
    "id": "protetica-dentara",
    "labels": {
      "ro": "Protetică dentară",
      "en": "Fixed prosthodontics",
      "hu": "Fogpótlás-rögzitett fogpótlás"
    },
    "treatments": [
      {
        "id": "ablatie-lucrare-dentara",
        "labels": {
          "ro": "Ablatie lucrare dentara",
          "en": "Ablation",
          "hu": "Abláció"
        },
        "price": 100,
        "priceType": "from"
      },
      {
        "id": "ablatie-punte",
        "labels": {
          "ro": "Ablatie punte",
          "en": "Bridge ablation",
          "hu": "Híd ablációja"
        },
        "price": 100,
        "priceType": "from"
      },
      {
        "id": "cimentare-definitiva-fatete-coroane-integral-ceramice-ceramica-presata",
        "labels": {
          "ro": "Cimentare definitivă faţete/coroane integral ceramice (ceramică presată)",
          "en": "Final cementation - ceramic crown",
          "hu": "Préskerámia koronák/héjak végleges beragasztása"
        },
        "price": 150,
        "priceType": "fixed"
      },
      {
        "id": "cimentare-lucrare-cu-mai-mult-de-3-elemente",
        "labels": {
          "ro": "Cimentare lucrare cu mai mult de 3 elemente",
          "en": "Cementation - more than 3 elements",
          "hu": "Levált koronák, hídak visszaragasztása"
        },
        "price": 200,
        "priceType": "fixed"
      },
      {
        "id": "cimentare-definitiva-1-3-elemente",
        "labels": {
          "ro": "Cimentare definitivă 1-3 elemente",
          "en": "Cementation 1 - 3 elements",
          "hu": "1-3 elemens végleges beragasztása"
        },
        "price": 100,
        "priceType": "fixed"
      },
      {
        "id": "cimentare-provizorie",
        "labels": {
          "ro": "Cimentare provizorie",
          "en": "Temporary cementation",
          "hu": "Ideiglenes ragasztás"
        },
        "price": 50,
        "priceType": "fixed"
      },
      {
        "id": "echilibrarea-ocluzala-prin-slefuire-selectiva",
        "labels": {
          "ro": "Echilibrarea ocluzală prin slefuire selectivă",
          "en": "Occlusal equilibrium by selective grinding",
          "hu": "Rágófelszíni kiegyensúlyozás, szelektív csiszolással"
        },
        "price": 50,
        "priceType": "from"
      },
      {
        "id": "incrustatii-ceramice-inlay-onlay-obturatii-turnate",
        "labels": {
          "ro": "Incrustaţii ceramice INLAY, ONLAY (obturaţii turnate)",
          "en": "Ceramic INLAY, ONLAY",
          "hu": "Préskerámia betét INLAY, ONLAY"
        },
        "price": 1500,
        "priceType": "from"
      },
      {
        "id": "indepartarea-ablatia-lucrarii-fixe",
        "labels": {
          "ro": "Îndepărtarea (ablația) lucrării fixe",
          "en": "Ablation of a fixed appliance",
          "hu": "Rögzitett munkák eltávolítása"
        },
        "price": 200,
        "priceType": "from"
      },
      {
        "id": "pivot-fibra-de-sticla",
        "labels": {
          "ro": "Pivot fibră de sticlă",
          "en": "Glass fiber dental post",
          "hu": "Üvegszálas csap (Micro Medica-Crystal Quartz Fiber Posts)"
        },
        "price": 300,
        "priceType": "from"
      },
      {
        "id": "pivot-fibra-de-sticla-reconst-omp",
        "labels": {
          "ro": "Pivot fibră de sticlă + reconst.omp.",
          "en": "Glass fiber dental pivot + composite reconstitution",
          "hu": "Üvegszálas gyökércsap"
        },
        "price": 300,
        "priceType": "from"
      },
      {
        "id": "indepartare-dcr",
        "labels": {
          "ro": "Îndepărtare DCR",
          "en": "Removal of corono - radicular device",
          "hu": "Öntött korono-radikuláris gyökércsap eltávolítása"
        },
        "price": 150,
        "priceType": "from"
      },
      {
        "id": "indepartare-stift",
        "labels": {
          "ro": "Îndepărtare știft",
          "en": "Dental post removal",
          "hu": "Gyökércsap eltávolítása"
        },
        "price": 150,
        "priceType": "from"
      },
      {
        "id": "coroana-metalo-ceramica-total-fizionomica",
        "labels": {
          "ro": "Coroană metalo-ceramică total fizionomică",
          "en": "Physiognomic metal - ceramic crown",
          "hu": "Fémkerámia korona"
        },
        "price": 1000,
        "priceType": "from"
      },
      {
        "id": "coroana-fateta-feldspatica",
        "labels": {
          "ro": "Coroană/Fateta Feldspatica",
          "en": "All - ceramic crown",
          "hu": "Préskerámia korona"
        },
        "price": 2000,
        "priceType": "from"
      },
      {
        "id": "fatete-din-ceramica-e-max",
        "labels": {
          "ro": "Faţete din ceramică E-Max",
          "en": "Ceramic facets",
          "hu": "Préskerámia héj"
        },
        "price": 1800,
        "priceType": "from"
      },
      {
        "id": "coroana-ceramica-pe-suport-zirconiu-stratificat",
        "labels": {
          "ro": "Coroană ceramică pe suport zirconiu-stratificat",
          "en": "Zirconia crown CAD CAM",
          "hu": "Cirkónium-kerámia korona"
        },
        "price": 1700,
        "priceType": "from"
      },
      {
        "id": "reparatie-proteza",
        "labels": {
          "ro": "Reparatie proteză",
          "en": "Prosthesis repair",
          "hu": "Protézis javítás"
        },
        "price": 100,
        "priceType": "fixed"
      },
      {
        "id": "rebazare",
        "labels": {
          "ro": "Rebazare",
          "en": "Rebase",
          "hu": "Protézis alábélelés"
        },
        "price": 100,
        "priceType": "fixed"
      },
      {
        "id": "proteza-totala",
        "labels": {
          "ro": "Proteză totală",
          "en": "Full dental prosthesis",
          "hu": "Teljes protézis"
        },
        "price": 2500,
        "priceType": "fixed"
      },
      {
        "id": "slefuire-dinte",
        "labels": {
          "ro": "Slefuire dinte",
          "en": "Cast metal temporary crown",
          "hu": "Korona Fém"
        },
        "price": 50,
        "priceType": "from"
      },
      {
        "id": "waxup-mockup",
        "labels": {
          "ro": "WaxUp/MockUp",
          "en": "WaxUp/MockUp",
          "hu": "WaxUp/MockUp"
        },
        "price": 150,
        "priceType": "fixed"
      },
      {
        "id": "scanare-intraorala",
        "labels": {
          "ro": "Scanare IntraOrala",
          "en": "Scanare IntraOrala",
          "hu": "Scanare IntraOrala"
        },
        "price": 300,
        "priceType": "fixed"
      },
      {
        "id": "coroana-dentara-provizorie-pmma",
        "labels": {
          "ro": "Coroană dentară provizorie PMMA",
          "en": "Acrylic temporary crown",
          "hu": "Ideiglenes akril korona"
        },
        "price": 300,
        "priceType": "from"
      },
      {
        "id": "coroane-provizorii-realizate-in-cabinet",
        "labels": {
          "ro": "Coroane provizorii realizate în cabinet",
          "en": "Temporary crown",
          "hu": "Ideiglenes korona"
        },
        "price": 200,
        "priceType": "from"
      },
      {
        "id": "coroana-e-max",
        "labels": {
          "ro": "Coroană E-Max",
          "en": "Full cast cobalt - chromium crown",
          "hu": "Króm-kobalt öntött korona"
        },
        "price": 1750,
        "priceType": "from"
      },
      {
        "id": "all-on-6-titan-cu-compozit-injectat",
        "labels": {
          "ro": "All on 6 titan cu compozit injectat",
          "en": "Dental prosthesis",
          "hu": "Megerősített protézis"
        },
        "price": 22000,
        "priceType": "fixed"
      },
      {
        "id": "all-on-4-titan-cu-compozit-injectat",
        "labels": {
          "ro": "All on 4 titan cu compozit injectat",
          "en": "Dental prosthesis on implants",
          "hu": "Implantátumra épülő protézis"
        },
        "price": 20000,
        "priceType": "fixed"
      },
      {
        "id": "all-on-6-cu-compozit-frezat",
        "labels": {
          "ro": "All on 6 cu compozit frezat",
          "en": "Flexible prosthesis",
          "hu": "Rugalmas kivehető fogpotlás (műfogsor)"
        },
        "price": 24000,
        "priceType": "fixed"
      },
      {
        "id": "all-on-6-cu-e-max-si-gingie-din-compozit",
        "labels": {
          "ro": "All on 6 cu E-Max si gingie din compozit",
          "en": "Dental prosthesis on implants",
          "hu": "Implantátumra épülő protézis"
        },
        "price": 25000,
        "priceType": "fixed"
      },
      {
        "id": "all-on-4-cu-e-max-si-gingie-din-compozit",
        "labels": {
          "ro": "All on 4 cu E-Max si gingie din compozit",
          "en": "Dental prosthesis on implants",
          "hu": "Implantátumra épülő protézis"
        },
        "price": 20000,
        "priceType": "fixed"
      },
      {
        "id": "all-on-6-cu-zirconiu-stratificat-si-gingie-din-compozit",
        "labels": {
          "ro": "All on 6 cu zirconiu stratificat si gingie din compozit",
          "en": "Dental prosthesis on implants",
          "hu": "Implantátumra épülő protézis"
        },
        "price": 20000,
        "priceType": "fixed"
      },
      {
        "id": "all-on-4-cu-zirconiu-stratificat-si-gingie-din-compozit",
        "labels": {
          "ro": "All on 4 cu zirconiu stratificat si gingie din compozit",
          "en": "Dental prosthesis on implants",
          "hu": "Implantátumra épülő protézis"
        },
        "price": 18000,
        "priceType": "fixed"
      },
      {
        "id": "all-on-4-6-zirconiu-stratificat",
        "labels": {
          "ro": "All on 4/6 Zirconiu stratificat",
          "en": "Dental prosthesis on implants",
          "hu": "Implantátumra épülő protézis"
        },
        "price": 20000,
        "priceType": "fixed"
      },
      {
        "id": "all-on-6-4-metalo-ceramica-si-gingie-stratificata",
        "labels": {
          "ro": "All on 6/4 Metalo ceramica si gingie stratificata",
          "en": "Dental prosthesis on implants",
          "hu": "Implantátumra épülő protézis"
        },
        "price": 13000,
        "priceType": "fixed"
      }
    ]
  },
  {
    "id": "implantologie",
    "labels": {
      "ro": "Implantologie",
      "en": "Implantology",
      "hu": "Implantologia"
    },
    "treatments": [
      {
        "id": "implant-dentar-ino",
        "labels": {
          "ro": "Implant dentar INO",
          "en": "Alpha bio dental implant",
          "hu": "Implantátum (műgyökér) beültetése"
        },
        "price": 2200,
        "priceType": "from"
      },
      {
        "id": "implant-dentar-megagen",
        "labels": {
          "ro": "Implant dentar Megagen",
          "en": "Bicon dental implant",
          "hu": "Implantátum Bicon"
        },
        "price": 3000,
        "priceType": "from"
      },
      {
        "id": "implant-straumann",
        "labels": {
          "ro": "Implant Straumann",
          "en": "Straumann implant",
          "hu": "Implantátum Strauman"
        },
        "price": 4000,
        "priceType": "from"
      },
      {
        "id": "implant-bredent",
        "labels": {
          "ro": "Implant BREDENT",
          "en": "Mis implant",
          "hu": "Implantátum MIS"
        },
        "price": 3000,
        "priceType": "from"
      },
      {
        "id": "coroana-ceramica-pe-suport-zirconiu-cad-cam-pentru-implant",
        "labels": {
          "ro": "Coroană ceramică pe suport zirconiu CAD CAM pentru implant",
          "en": "Ceramic crown on zirconia - CAD CAM for implant",
          "hu": "Implantátumokra készülő cirkónium-kerámia korona (CAD CAM)"
        },
        "price": 1600,
        "priceType": "from"
      },
      {
        "id": "coroana-metalo-ceramica-pe-implant",
        "labels": {
          "ro": "Coroană metalo-ceramică pe implant",
          "en": "Metal - ceramic crown on implant",
          "hu": "Implantátumra épülő fém-kerámia korona"
        },
        "price": 1200,
        "priceType": "from"
      },
      {
        "id": "coroana-total-ceramica-ceramica-presata-pe-implant",
        "labels": {
          "ro": "Coroană total-ceramică (ceramică presată) pe implant",
          "en": "All ceramic crown on implant",
          "hu": "Implantátumra készülő préskerámia"
        },
        "price": 1800,
        "priceType": "from"
      },
      {
        "id": "coroana-provizorie-pmma-pe-implant",
        "labels": {
          "ro": "Coroană provizorie PMMA pe implant",
          "en": "Ceramic crown restoration on platinum gold",
          "hu": "Platina aranyra égetett kerámia korona"
        },
        "price": 600,
        "priceType": "from"
      },
      {
        "id": "indepartarea-chirurgicala-a-implantului",
        "labels": {
          "ro": "Îndepărtarea chirurgicală a implantului",
          "en": "Surgical removal of implant",
          "hu": "Implantátum eltávolítás sebészeti úton"
        },
        "price": 400,
        "priceType": "from"
      },
      {
        "id": "sinus-lifting",
        "labels": {
          "ro": "Sinus lifting",
          "en": "Sinus lifting",
          "hu": "Sinuseleváció"
        },
        "price": 5000,
        "priceType": "from"
      },
      {
        "id": "sistem-all-on-x-bredent-lucrare-provizorie",
        "labels": {
          "ro": "Sistem All on X Bredent+lucrare provizorie",
          "en": "Bar fixing for prosthesis",
          "hu": "Merevitő rúd protézisnak"
        },
        "price": 25000,
        "priceType": "fixed"
      },
      {
        "id": "bont-protetic-hibrid",
        "labels": {
          "ro": "Bont protetic hibrid",
          "en": "Bicon - dental abutment implant",
          "hu": "Implantátum csonk Bicon"
        },
        "price": 650,
        "priceType": "from"
      },
      {
        "id": "descoperire-implant-surub-de-vindecare",
        "labels": {
          "ro": "Descoperire implant/surub de vindecare",
          "en": "Reimplantation",
          "hu": "Reimplantáció"
        },
        "price": 250,
        "priceType": "from"
      },
      {
        "id": "sistem-all-on-x-bredent-lucrare-provizorie-2",
        "labels": {
          "ro": "Sistem All on X Bredent +lucrare provizorie",
          "en": "Immediate loading implant",
          "hu": "Implantátum"
        },
        "price": 20000,
        "priceType": "from"
      }
    ]
  }
]

export function findTreatment(categoryId: string, treatmentId: string): Treatment | undefined {
  return treatmentCategories
    .find((c) => c.id === categoryId)
    ?.treatments.find((t) => t.id === treatmentId)
}
