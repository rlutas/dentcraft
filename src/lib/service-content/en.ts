import type { ServiceContentLocaleFile } from './types'

// English copy for /servicii/[slug]. Translated from ro.ts. No prices here (prices live on /preturi),
// no in-house imaging claims, no success-rate statistics, no aligner brand names.

export const serviceContentEn: ServiceContentLocaleFile = {
  labels: {
    introLabel: 'In short',
    updatedLabel: 'Updated',
    updatedValue: 'November 2026',
    contactTitle: 'Dental emergency? Call before you come in.',
    contactCall: 'Call',
    contactHoursLabel: 'Hours',
    contactHours: 'Monday–Friday, 10:00–18:00',
    contactAddressLabel: 'Address',
    contactLanguages: 'We speak Romanian, English and Hungarian.',
    linksLabel: 'See also',
  },
  services: {
    // ------------------------------------------------------------------
    'urgente-dentare': {
      intro:
        'A dental emergency is a problem that can’t wait for a regular appointment: severe pain, swelling, or a tooth that has broken or been knocked out. At DENTCRAFT in Satu Mare we see emergencies Monday to Friday, between 10:00 and 18:00. Please call 0741 199 977 first, so we can see you as quickly as possible.',
      sections: [
        {
          heading: 'What counts as a dental emergency',
          paragraphs: ['Call us the same day if you have any of the problems below:'],
          bullets: [
            'severe toothache that wakes you at night or doesn’t ease with painkillers;',
            'swelling of the gum or face, especially if you also have a fever;',
            'a tooth that is broken, cracked or knocked out completely after a blow;',
            'bleeding that won’t stop after an extraction;',
            'a filling, crown or other restoration that has come out and hurts or cuts your tongue or cheek;',
            'pain and swelling around a wisdom tooth that is coming through.',
          ],
          after:
            'Mild sensitivity to cold, or a lost filling that doesn’t hurt, can wait a few days until a regular appointment. If you’re not sure which group you fall into, call us and describe what you feel.',
        },
        {
          heading: 'What to do until you reach the clinic',
          paragraphs: [],
          bullets: [
            'Pain: you can take an ordinary painkiller, such as paracetamol or ibuprofen, following the leaflet. Don’t put aspirin or other tablets directly on the gum, as they burn the tissue.',
            'Swelling: hold a cold compress on the outside of your cheek for 10–15 minutes at a time, with breaks. Don’t apply heat and don’t prick the swelling.',
            'Tooth knocked out completely: hold it by the crown, not the root. If it’s dirty, rinse it briefly with milk or saline, without scrubbing. Keep it in milk and come in straight away. The sooner you get here, the better the chances it can be put back.',
            'Broken tooth: keep the fragment, rinse your mouth with lukewarm water and avoid biting on that side.',
            'Bleeding after an extraction: bite firmly on a sterile gauze pad for 30 minutes. Don’t rinse vigorously and don’t smoke.',
            'Restoration that has come out: keep it and bring it with you. Don’t stick it back with household glue.',
          ],
          after:
            'Don’t start a course of antibiotics left over at home. If you need an antibiotic, the dentist will prescribe it after examining you.',
        },
        {
          heading: 'When to go straight to hospital',
          paragraphs: [
            'Some situations go beyond what can be dealt with in a dental surgery. Call 112 or go to the nearest emergency department (UPU) if:',
          ],
          bullets: [
            'the swelling is growing quickly, towards your eye or neck;',
            'you have difficulty breathing or swallowing;',
            'you have a high fever and feel generally unwell;',
            'you have taken a hard blow to the head or face, especially with dizziness or loss of consciousness;',
            'the bleeding is heavy and doesn’t stop when you press on it.',
          ],
          after:
            'Go there too if the problem starts in the evening or at the weekend and can’t wait until the next working day.',
        },
        {
          heading: 'What happens when you arrive at DENTCRAFT',
          paragraphs: [
            'On the phone we ask what hurts, since when, and whether you have swelling or a fever. That way we know how much time you need, and we try to see you the same day, within our opening hours.',
            'At the clinic, the dentist looks for the cause of the pain and carries out the emergency treatment: draining an abscess, placing a soothing dressing, removing an inflamed nerve, temporarily refixing a restoration that has come out, or splinting a tooth loosened by a blow. If imaging is needed, we tell you where to have it done.',
            'Emergency treatment stops the pain, but it usually isn’t the final treatment. Before you leave, we agree together on what comes next and when you come back.',
          ],
        },
      ],
      faqs: [
        {
          question: 'What do I do if I have toothache in the evening or at the weekend?',
          answer:
            'The clinic is open Monday–Friday, 10:00–18:00. Until then, take a painkiller as directed on the leaflet and use a cold compress if you have swelling. If you develop a fever, swelling that keeps growing or difficulty swallowing, go to the nearest emergency department (UPU) or call 112. On the next working day, call us on 0741 199 977.',
        },
        {
          question: 'Can I come in without an appointment?',
          answer:
            'Please call first. That way we know you’re coming, we can ask a few questions about the pain, and we can find you the earliest available slot that day.',
        },
        {
          question: 'A tooth came out after a blow. Can it still be saved?',
          answer:
            'Sometimes, if you get here very quickly. Hold the tooth by the crown, keep it in milk and come in straight away. In children, baby teeth that have been knocked out are not put back, but the child should still be seen by a dentist so we can check the permanent tooth underneath.',
        },
        {
          question: 'I have a swelling on my gum, but it doesn’t hurt. Is it urgent?',
          answer:
            'It should be seen as soon as possible. A swelling on the gum can be a sign of an abscess, which sometimes hurts only a little or not at all. Don’t prick it, don’t apply heat, and call us for an appointment.',
        },
        {
          question: 'How much does emergency treatment cost?',
          answer:
            'It depends on the treatment you need. The dentist tells you what they are going to do and how much it costs before starting. You can find the clinic’s price list on the Prices page.',
        },
      ],
      links: [
        { label: 'Contact & map', page: '/contact' },
        { label: 'Price list', page: '/preturi' },
      ],
    },

    // ------------------------------------------------------------------
    pedodontie: {
      intro:
        'Paediatric dentistry is dentistry for children: caring for baby teeth and the first permanent teeth, from the very first tooth through to the teenage years. At DENTCRAFT in Satu Mare, children are seen by Dr. Ghirasim Denisa-Ștefania, who has also completed a training programme in educational psychology. It’s best to have the first check-up by the age of one.',
      sections: [
        {
          heading: 'The first visit to the dentist',
          paragraphs: [
            'Paediatric dentistry guidelines recommend the first check-up when the first tooth appears, or by the age of one at the latest. The visit is short. Your child gets used to the chair, the light and the instruments, and the dentist looks at the teeth and gums. With very young children, the examination can be done with the child sitting on the parent’s lap.',
            'We also talk about what matters at home: bottles, dummies, sweets, brushing and the right toothpaste for their age. If treatment is needed, the dentist explains the options and we plan them together.',
          ],
        },
        {
          heading: 'How to prepare your child',
          paragraphs: [],
          bullets: [
            'Talk about the dentist simply and calmly, as the doctor who counts and cleans their teeth.',
            'Avoid words like “pain”, “needle” or “don’t be scared”. Often, those very words are what frighten a child.',
            'Don’t threaten them with the dentist when they don’t want to brush their teeth.',
            'Choose a time when your child is rested and not hungry.',
            'They can bring their favourite toy.',
          ],
        },
        {
          heading: 'Treatments we provide for children',
          paragraphs: [],
          bullets: [
            'regular check-ups and professional cleaning;',
            'fluoride varnish, for stronger enamel;',
            'fissure sealing of permanent molars: the grooves on the chewing surface are covered with a flowable material so food debris doesn’t collect there;',
            'treating decay in baby teeth and permanent teeth;',
            'nerve treatment in baby teeth, when decay has gone deep;',
            'extracting baby teeth that can no longer be saved or that are getting in the way of permanent teeth coming through.',
          ],
          after:
            'If the teeth start growing in crooked or the jaws don’t close properly, we refer you to Dr. Cozma Ștefana, the dentist who handles orthodontics at the clinic.',
        },
        {
          heading: 'Why baby teeth matter',
          paragraphs: [
            'Baby teeth fall out, but until then they have a job to do. Children chew and speak with them, and they hold the space for the permanent teeth. Untreated decay can reach the nerve and cause pain or an abscess, and the infection can affect the permanent tooth forming underneath. If a baby tooth is lost too early, the neighbouring teeth can tip into the gap and crowding can appear later.',
          ],
        },
        {
          heading: 'Home dental care by age',
          paragraphs: [],
          bullets: [
            'From the first tooth to age 3: fluoride toothpaste, a smear the size of a grain of rice, twice a day.',
            'From 3 to 6 years: fluoride toothpaste, a pea-sized amount. Your child learns to spit out the toothpaste without rinsing too much.',
            'Until about age 7–8, a parent brushes, or at least checks the brushing.',
            'No bottle of milk, juice or sweetened tea at bedtime.',
          ],
        },
      ],
      faqs: [
        {
          question: 'At what age should I first take my child to the dentist?',
          answer:
            'When the first tooth appears, or by the age of one at the latest. The first visit is mostly a chance to get to know each other: your child gets used to the surgery, and you get care advice for their age.',
        },
        {
          question: 'My child is afraid of the dentist. What do you do?',
          answer:
            'We go at their pace. We explain each step in a way they understand and show them the instruments before we use them. If it isn’t working on a given day, we don’t force it, we rebook. The trust built now matters for every visit later on.',
        },
        {
          question: 'Is it worth treating baby teeth if they fall out anyway?',
          answer:
            'Yes. Some baby teeth stay in the mouth until age 11–12. Untreated decay can cause pain and an abscess, can affect the permanent tooth underneath and can lead to losing the tooth too early, with crowding later on.',
        },
        {
          question: 'What is fissure sealing and when is it done?',
          answer:
            'Fissure sealing means covering the grooves on the permanent molars with a flowable material that then hardens. It’s done without anaesthetic and usually without drilling the tooth. The 6-year molars are usually sealed shortly after they come through, and the 12-year molars the same way.',
        },
        {
          question: 'Can I stay with my child in the surgery?',
          answer:
            'Yes, especially with young children, who feel calmer with a parent close by. Sometimes, with older children, the dentist may suggest they try on their own. You decide together what’s best for your child.',
        },
        {
          question: 'How often should my child come for a check-up?',
          answer:
            'Usually every 6 months. If they have a lot of decay or a high risk of decay, the dentist may recommend more frequent check-ups.',
        },
      ],
      links: [{ label: 'Dr. Ghirasim Denisa-Ștefania', doctor: 'denisa-ghirasim' }],
    },

    // ------------------------------------------------------------------
    ortodontie: {
      intro:
        'Orthodontics corrects crooked, crowded or widely spaced teeth and the way the jaws close together. At DENTCRAFT in Satu Mare we work with fixed metal and ceramic braces and with clear aligners, for children and adults. Treatment is led by Dr. Cozma Ștefana, a dentist in specialist training in Orthodontics and Dentofacial Orthopaedics.',
      sections: [
        {
          heading: 'When braces are needed',
          paragraphs: [],
          bullets: [
            'crowded, overlapping or rotated teeth;',
            'gaps between the teeth;',
            'the upper teeth cover the lower teeth too much or, the other way round, the lower teeth stick out in front;',
            'the front teeth don’t meet when you bite together (open bite);',
            'you find chewing difficult or your teeth are wearing unevenly;',
            'in children: thumb sucking or mouth breathing, which can change the way the jaws grow.',
          ],
          after:
            'Braces also help the health of your teeth. Straight teeth are easier to clean, and chewing forces are spread more evenly.',
        },
        {
          heading: 'What age to start',
          paragraphs: [
            'A first orthodontic check-up is recommended around age 7, when the first permanent molars and incisors have come through. At this age, some jaw growth problems can be corrected more easily, with appliances that guide growth.',
            'For adults there is no age limit, as long as the gums and bone are healthy. If you have gum inflammation, we treat that first, and the braces come afterwards.',
          ],
        },
        {
          heading: 'Types of braces we use',
          paragraphs: [],
          bullets: [
            'Fixed metal braces: the most robust option and the best suited to complex cases.',
            'Fixed ceramic braces: they work the same way, but the brackets are tooth-coloured and less visible.',
            'Clear aligners: trays that are changed in sequence and worn for about 22 hours a day. You take them out to eat and to brush. They don’t suit every case, so we discuss at the consultation whether they’re an option for you.',
            'Removable appliances for children: they guide jaw growth and make room for the permanent teeth.',
          ],
        },
        {
          heading: 'How treatment works',
          paragraphs: [
            'At the first consultation, the dentist examines your teeth and bite and takes photos. The impression is taken digitally, with the Medit i700 intraoral scanner, without the traditional putty. Any imaging you need is done at a specialist centre, and the dentist tells you exactly what you need.',
            'Based on these, you receive your treatment plan: which appliance suits you, roughly how long it will take and what you need to do. Most treatments take between one and two years, and complex cases can take longer.',
            'While you wear braces, you come for a check-up every few weeks so the dentist can adjust them and follow your progress. Once the braces come off, the retention phase follows: a wire bonded to the back of the teeth or a retainer worn at night, so the teeth don’t move back to where they were.',
          ],
        },
        {
          heading: 'Living with braces',
          paragraphs: [],
          bullets: [
            'The first few days after fitting or after an adjustment can be uncomfortable, then the feeling passes.',
            'Brush your teeth after every meal and use interdental brushes. A water flosser helps a lot.',
            'With fixed braces, avoid very hard or sticky food, which can loosen the brackets.',
            'With aligners, take the trays out when you eat and brush your teeth before putting them back in.',
          ],
        },
      ],
      faqs: [
        {
          question: 'Do braces hurt?',
          answer:
            'Fitting them doesn’t hurt. In the first few days and after each adjustment, your teeth may be tender when chewing, and the discomfort usually passes within a few days. Orthodontic wax helps if a bracket irritates your cheek.',
        },
        {
          question: 'How long does orthodontic treatment take?',
          answer:
            'Usually between one and two years, depending on how far the teeth need to move and how closely you follow the instructions. You’ll find out the estimated length for your case after the consultation and the scans.',
        },
        {
          question: 'Can I wear braces as an adult?',
          answer:
            'Yes. Teeth can be moved at any age, as long as the gums and bone are healthy. Many adults choose ceramic braces or aligners because they are less visible.',
        },
        {
          question: 'Which should I choose: fixed braces or aligners?',
          answer:
            'It depends on the case. Fixed braces can make more complex movements and don’t depend on how long you wear them. Aligners are barely visible and come out at mealtimes, but they only work if you wear them almost all day. At the consultation we see which option works for your teeth.',
        },
        {
          question: 'What happens after my braces come off?',
          answer:
            'The retention phase follows. A thin wire bonded to the back of the teeth or a retainer worn at night holds the teeth in their new position. Without retention, teeth tend to move back to where they started.',
        },
        {
          question: 'How often do I come for check-ups?',
          answer:
            'With fixed braces, usually every 4–8 weeks. With aligners, check-ups can be less frequent. The dentist sets the schedule for your treatment.',
        },
      ],
      links: [{ label: 'Dr. Cozma Ștefana', doctor: 'stefana-cozma' }],
    },

    // ------------------------------------------------------------------
    detartraj: {
      intro:
        'Scaling is the professional removal of tartar and plaque from the teeth and from just below the gum line, where a toothbrush can’t reach. At DENTCRAFT in Satu Mare, hygiene treatment is carried out by Dr. Fernea Remus, certified in Guided Biofilm Therapy, using AIRFLOW, PERIOFLOW and PIEZON equipment. For most patients, one session every 6 months is enough.',
      sections: [
        {
          heading: 'Why brushing isn’t enough',
          paragraphs: [
            'Plaque is a soft layer that forms on the teeth every day. Brushing and flossing remove most of it, but there are always areas that are hard to reach. There, within a few days, plaque hardens and turns into tartar, and tartar can no longer be removed with a toothbrush.',
            'Tartar irritates the gums. The first sign is gingivitis: red, swollen gums that bleed when you brush. Left untreated, the inflammation can progress to periodontitis: the gums recede, the bone around the teeth is lost and the teeth can become loose.',
          ],
        },
        {
          heading: 'How we work: Guided Biofilm Therapy',
          paragraphs: [
            'Guided Biofilm Therapy (GBT) is a dental hygiene protocol developed by EMS and the Swiss Dental Academy. Dr. Fernea Remus was certified in 2026. In short, a session looks like this:',
          ],
          bullets: [
            'Assessment: the dentist checks your teeth and gums and stains the plaque with a disclosing agent, so it’s clear exactly where it remains.',
            'AIRFLOW: a jet of air, water and fine powder removes plaque and stains from the teeth, restorations, implants and orthodontic appliances.',
            'PERIOFLOW: a slim tip cleans the areas below the gum, where shallow pockets have formed.',
            'PIEZON: ultrasound removes any remaining tartar, without unnecessarily touching surfaces that are already clean.',
            'Final check and hygiene advice suited to your mouth.',
          ],
        },
        {
          heading: 'How often to have scaling',
          paragraphs: [
            'For most people, one session every 6 months keeps the gums healthy. The dentist may recommend one every 3–4 months if you have gum disease, implants, braces or diabetes, if you smoke, or if tartar builds up quickly in your case.',
          ],
        },
        {
          heading: 'When you need a periodontist',
          paragraphs: [
            'If the assessment finds deep pockets between the gum and the tooth, gum recession or loose teeth, routine hygiene treatment is no longer enough. Dr. Tincu Giovana-Nicoleta, a specialist periodontist, works at the clinic. She assesses the gums and carries out periodontal treatment, and maintenance hygiene sessions then follow the plan agreed together.',
          ],
        },
        {
          heading: 'After the session',
          paragraphs: [],
          bullets: [
            'Mild sensitivity to cold or slight bleeding of the gums in the first 1–2 days is normal when the gums were inflamed.',
            'Brush your teeth twice a day with a soft toothbrush, and clean between your teeth with floss or interdental brushes.',
            'If your gums are still bleeding after a week, let us know.',
          ],
        },
      ],
      faqs: [
        {
          question: 'Does scaling hurt?',
          answer:
            'Usually not. You may feel vibration, cold water or mild sensitivity, especially where the gum is inflamed. If your teeth are very sensitive, tell the dentist at the start. The session can be done more gently, and a local anaesthetic can be used if needed.',
        },
        {
          question: 'Does scaling damage the enamel?',
          answer:
            'No. Ultrasound and the powder jet clean off deposits, not enamel. It’s tartar left on the teeth that does harm, because it keeps the gums inflamed.',
        },
        {
          question: 'How long does a session take?',
          answer:
            'Usually between half an hour and an hour, depending on how much tartar has built up and the condition of your gums.',
        },
        {
          question: 'Can I have scaling if I have implants or braces?',
          answer:
            'Yes, and it’s actually recommended. The AIRFLOW powder and the tips used in the GBT protocol are suitable for implants, crowns and orthodontic appliances. Regular hygiene treatment protects the gum around implants.',
        },
        {
          question: 'Why do my gums bleed after scaling?',
          answer:
            'Because they were already inflamed. Once the tartar has been removed, the gum usually heals within a few days and the bleeding reduces. If it hasn’t stopped after a week, come in for a check-up.',
        },
        {
          question: 'How often should scaling be done?',
          answer:
            'For most people, once every 6 months. If you have gum disease, implants or braces, or if you smoke, the dentist may recommend a session every 3–4 months.',
        },
      ],
      links: [
        { label: 'Dr. Fernea Remus', doctor: 'remus-fernea' },
        { label: 'Dr. Tincu Giovana-Nicoleta, periodontist', doctor: 'giovana-tincu' },
      ],
    },

    // ------------------------------------------------------------------
    'implanturi-dentare': {
      intro:
        'A dental implant is a small titanium screw placed in the bone, which takes the place of the root of a lost tooth. A crown, a bridge or a full arch is then fitted on top. At DENTCRAFT in Satu Mare, implants are placed by Dr. Buterchi Codruț-Ciprian, a specialist in dento-alveolar surgery, and the restoration on the implant is made by Dr. Petric Răzvan-Tudor.',
      sections: [
        {
          heading: 'Who can have an implant',
          paragraphs: [
            'Implants suit most adults who have lost one or more teeth, once the jaws have finished growing. What matters is how much bone there is in that area and how healthy the gums are.',
            'At the consultation, tell the dentist if you have diabetes, if you smoke, if you take medication for osteoporosis or anticoagulants, and if you have had radiotherapy to the head area. These don’t necessarily rule out an implant, but they change the plan and the aftercare. If you have gum disease, we treat it first.',
          ],
        },
        {
          heading: 'One tooth, several teeth or a whole arch',
          paragraphs: [],
          bullets: [
            'A single missing tooth: one implant and a crown. The neighbouring teeth don’t need to be filed down, as they do for a conventional bridge.',
            'Several missing teeth next to each other: a bridge supported by two or more implants.',
            'All the teeth in one arch: a fixed restoration on 4–6 implants (All-on-X) or a denture that clips onto implants.',
          ],
        },
        {
          heading: 'All-on-X: fixed teeth for the whole arch',
          paragraphs: [
            'All-on-X is an option for people who have lost all the teeth in one arch or have teeth that can no longer be saved. The restoration includes all the teeth in the arch and is fixed on 4–6 implants. The “X” refers to the number of implants, which varies from case to case.',
            'The back implants can be placed at an angle, to use the bone that is there and to avoid the sinus or the nerve in the lower jaw. This often means bone grafting isn’t needed. The restoration is fixed: you don’t take it out at night, and you clean it like natural teeth, with a toothbrush and a water flosser.',
            'If the implants are stable when placed, a fixed temporary restoration can be fitted shortly after surgery. The final restoration is made once the implants have integrated with the bone. Whether this option suits you is decided after the consultation and the scans.',
          ],
        },
        {
          heading: 'When there isn’t enough bone: bone grafting and sinus lift',
          paragraphs: [
            'After a tooth is lost, the bone in that area gradually shrinks. In the upper jaw, in the molar area, the sinus can drop down into the space left behind. If there isn’t enough bone for an implant, bone can be added.',
            'A sinus lift means gently raising the sinus membrane and filling the space beneath it with bone graft material. When only a few millimetres are missing, the lift is done through the implant site itself (internal sinus lift). When more bone is needed, the work is done through a small window at the side (external sinus lift). Sometimes the implant is placed in the same session, sometimes a few months later, once the new bone has formed.',
            'Whether you need bone grafting or a sinus lift is shown by imaging scans, which you have done at a specialist centre, on the dentist’s recommendation.',
          ],
        },
        {
          heading: 'Long-term implant care',
          paragraphs: [
            'An implant can’t decay, but the gum around it can become inflamed, just as with a natural tooth. Left untreated, the inflammation can reach the bone (peri-implantitis). To avoid this, brush twice a day, use interdental brushes or a water flosser, and come for a check-up and professional cleaning at least once a year, ideally every 6 months. Smoking increases the risk of complications.',
          ],
        },
      ],
      faqs: [
        {
          question: 'Can I have an implant if I’m older?',
          answer:
            'Yes. Age itself isn’t a problem. What matters is your general health, the amount of bone, and whether you can keep the area around the implant clean. The dentist assesses all of this at the consultation.',
        },
        {
          question: 'What does All-on-X mean and who is it for?',
          answer:
            'It is a fixed restoration with all the teeth of one arch, attached to 4–6 implants. It suits people who have lost all the teeth in one arch, or whose teeth can no longer be saved, and who don’t want a removable denture.',
        },
        {
          question: 'What is a sinus lift and does it hurt?',
          answer:
            'A sinus lift is a procedure that adds bone to the upper jaw, below the sinus, so there is room for the implant. It is done under local anaesthetic. Afterwards, the swelling and discomfort of the first few days are kept under control with the medication the dentist recommends.',
        },
        {
          question: 'Will I be without teeth while the implant heals?',
          answer:
            'Not necessarily. In many cases you can wear a temporary restoration, removable or fixed, until the final one. The dentist tells you at the consultation which option is possible in your case.',
        },
        {
          question: 'Can I have an implant if I smoke or have diabetes?',
          answer:
            'Often yes, but the risk of complications is higher. Diabetes needs to be well controlled, and stopping smoking, or at least cutting down during the healing period, helps a lot. Tell the dentist from the start so they can adapt the plan.',
        },
        {
          question: 'How long does an implant last?',
          answer:
            'A well-integrated implant can last for very many years if it is looked after. What matters most is daily hygiene, regular check-ups and not smoking. The crown on the implant can wear over time and can be replaced without touching the implant.',
        },
      ],
      links: [
        { label: 'Dr. Buterchi Codruț-Ciprian', doctor: 'codrut-buterchi' },
        { label: 'Dr. Petric Răzvan-Tudor', doctor: 'razvan-petric' },
        { label: 'Price list', page: '/preturi' },
      ],
    },

    // ------------------------------------------------------------------
    endodontie: {
      intro:
        'Root canal treatment (endodontics) saves a tooth whose nerve has become inflamed or infected, usually because of deep decay, a crack or a blow. The dentist cleans and disinfects the canals inside the root, then seals them. At the DENTCRAFT clinic in Satu Mare, root canal treatment is carried out by Dr. Ghirasim Denisa-Ștefania.',
      sections: [
        {
          heading: 'Signs you need root canal treatment',
          paragraphs: [],
          bullets: [
            'severe or throbbing pain that comes on by itself, sometimes at night;',
            'sensitivity to heat or cold that lingers long after you’ve finished drinking;',
            'pain when you bite or press on the tooth;',
            'a swelling or a “spot” on the gum, next to the tooth;',
            'a tooth that has darkened after a blow.',
          ],
          after:
            'Sometimes a tooth with a dead nerve doesn’t hurt at all, and the problem only shows up at a check-up. The diagnosis is made by the dentist, after an examination, sensitivity tests and any imaging that is needed.',
        },
        {
          heading: 'How treatment works',
          paragraphs: [
            'Everything is done under local anaesthetic. The tooth is isolated so that saliva doesn’t get into the canals. The dentist opens the tooth, removes the inflamed or infected nerve, cleans and shapes the canals with fine instruments and rinses them with disinfecting solutions. Finally, the canals are filled and sealed.',
            'Treatment can be completed in one session or in two or three. If there is an infection, the dentist may place a medicated dressing in the canals and finish at the next visit.',
          ],
        },
        {
          heading: 'What comes after root canal treatment',
          paragraphs: [
            'A root-filled tooth is more fragile, because it has lost a lot of its structure. Often, as well as a filling, it needs extra protection: a build-up with a post, or a crown. The dentist tells you which option is right for your tooth.',
            'In the first few days, the tooth may be tender when chewing. Avoid biting hard on it until the final restoration is in place.',
          ],
        },
        {
          heading: 'Root canal retreatment',
          paragraphs: [
            'Sometimes a tooth that had root canal treatment years ago starts to hurt again or becomes infected. The cause may be an untreated canal, incomplete sealing or new decay under a filling. Retreatment means removing the old filling material, cleaning the canals again and sealing them. Whether the tooth can still be saved this way is decided after an assessment.',
          ],
        },
      ],
      faqs: [
        {
          question: 'Does root canal treatment hurt?',
          answer:
            'You shouldn’t feel pain during treatment, because the area is numbed. Afterwards, the tooth may be tender for a few days, and the discomfort usually settles with an ordinary painkiller.',
        },
        {
          question: 'How many sessions are needed?',
          answer:
            'Between one and three, depending on the number of canals, their shape and whether there is an infection. After the first session you’ll know how many more are needed.',
        },
        {
          question: 'Wouldn’t it be simpler to have the tooth out?',
          answer:
            'It may seem simpler at the time, but a lost tooth needs to be replaced later with an implant or a bridge, and the neighbouring teeth can tip into the gap. If the tooth can be saved, keeping it is usually the better option.',
        },
        {
          question: 'Do I need a crown after root canal treatment?',
          answer:
            'Not always, but often. Molars and premolars that have had root canal treatment frequently need a crown so they don’t fracture when chewing. For front teeth, a good filling may be enough.',
        },
        {
          question: 'Can I eat after treatment?',
          answer:
            'Yes, once the anaesthetic has worn off, so you don’t bite your lip or cheek. Until the final restoration, chew on the other side and avoid very hard foods.',
        },
      ],
    },

    // ------------------------------------------------------------------
    'chirurgie-oro-maxilo-faciala': {
      intro:
        'Dental surgery covers procedures in the mouth done under local anaesthetic: simple and complex extractions, removal of impacted wisdom teeth, minor procedures on the gum and bone, and preparation for implants. At DENTCRAFT in Satu Mare, these procedures are carried out by Dr. Buterchi Codruț-Ciprian, a specialist in dento-alveolar surgery.',
      sections: [
        {
          heading: 'Procedures we carry out',
          paragraphs: [],
          bullets: [
            'extraction of teeth that can no longer be saved;',
            'wisdom tooth extraction, including teeth still in the bone or under the gum;',
            'apicoectomy: removing the infected tip of the root when root canal treatment is no longer enough;',
            'procedures to prepare for a denture or an implant, for example smoothing the bone;',
            'placing dental implants and bone grafting, including sinus lift.',
          ],
          after:
            'Situations that need general anaesthetic or a hospital stay, such as jaw fractures, are treated in hospital, and we refer you there.',
        },
        {
          heading: 'Wisdom teeth: when they come out',
          paragraphs: [
            'Not every wisdom tooth needs to be removed. If it has come through straight, has enough room and can be cleaned, it can stay. We recommend extraction when:',
          ],
          bullets: [
            'the gum over it often becomes inflamed and painful (pericoronitis);',
            'the tooth is tilted and pushes against or damages the molar in front of it;',
            'it is decayed and can’t be treated or cleaned properly;',
            'a cyst has formed around it.',
          ],
        },
        {
          heading: 'How to prepare for the procedure',
          paragraphs: [
            'At the consultation, tell the dentist what medication you take, especially anticoagulants or medication for osteoporosis, and whether you have any chronic conditions. Any imaging you need is done at a specialist centre, on the dentist’s recommendation. On the day of the procedure, eat normally beforehand and come well rested.',
          ],
        },
        {
          heading: 'After an extraction: what is normal and what isn’t',
          paragraphs: [],
          bullets: [
            'Bite on the gauze pad for 30 minutes so a blood clot can form.',
            'Apply cold compresses to your cheek in the first few hours, for 10–15 minutes at a time.',
            'On the first day, don’t rinse vigorously, don’t drink through a straw and don’t smoke, so the clot isn’t dislodged.',
            'Eat soft, lukewarm food on the other side.',
            'Mild swelling and discomfort for 2–3 days are normal.',
          ],
          after:
            'Call us if the bleeding won’t stop, if the pain gets worse after the third day, if you have a fever or if the swelling gets bigger instead of going down.',
        },
      ],
      faqs: [
        {
          question: 'Does wisdom tooth extraction hurt?',
          answer:
            'During the procedure you don’t feel pain, only pressure, because the area is numbed. Afterwards there may be swelling and discomfort for a few days, which you keep under control with the medication the dentist recommends.',
        },
        {
          question: 'How long does healing take after an extraction?',
          answer:
            'The gum usually closes within one to two weeks. The bone rebuilds over a few months. If stitches were placed, they are usually removed after about 7–10 days, at a check-up.',
        },
        {
          question: 'Can I go to work the next day?',
          answer:
            'After a simple extraction, usually yes. After removal of an impacted wisdom tooth, it’s best to take a day or two to rest and avoid physical exertion.',
        },
        {
          question: 'What is dry socket and how do I avoid it?',
          answer:
            'Dry socket happens when the blood clot in the extraction site comes away or becomes infected. The pain usually increases 2–4 days after the procedure. You can avoid it by not smoking, not rinsing vigorously and not drinking through a straw in the first few days. If it happens, come in for a check-up.',
        },
        {
          question: 'Do I need to stop anticoagulants before an extraction?',
          answer:
            'Don’t stop them on your own. Tell the dentist what you take, and they will decide, together with your own doctor if needed, how to proceed.',
        },
      ],
    },

    // ------------------------------------------------------------------
    'stomatologie-generala': {
      intro:
        'General dentistry is the basic care of your teeth: check-ups, treating decay, fillings, hygiene treatment and prevention advice. Almost every treatment starts here. At DENTCRAFT in Satu Mare, the dentist examines you, explains what they have found and, if you need a specialist from the team, refers you to them.',
      sections: [
        {
          heading: 'What general dentistry includes',
          paragraphs: [],
          bullets: [
            'consultations and regular check-ups;',
            'treating decay and tooth-coloured fillings;',
            'replacing old fillings that are cracked or leaking;',
            'treating tooth sensitivity;',
            'professional hygiene treatment and advice on cleaning at home;',
            'referral to colleagues in the team for root canal treatment, surgery, orthodontics, periodontics or prosthetic work.',
          ],
        },
        {
          heading: 'Decay: why it’s best to catch it early',
          paragraphs: [
            'A small cavity caught at a check-up is treated simply, with a filling. Left untreated, it goes deeper, to the nerve, and then you need root canal treatment and often a crown. Small cavities usually don’t hurt, so it’s the dentist who finds them at a check-up, not you.',
          ],
        },
        {
          heading: 'How often to come for a check-up',
          paragraphs: [
            'For most adults, a check-up and hygiene session every 6 months is enough. If you have a lot of dental work, sensitive gums or frequent decay, the dentist may recommend more frequent check-ups. A check-up doesn’t take long, and a problem caught early is easier to treat.',
          ],
        },
        {
          heading: 'What you can do at home',
          paragraphs: [],
          bullets: [
            'Brush your teeth twice a day, for two minutes each time, with fluoride toothpaste.',
            'Clean between your teeth every day, with floss or interdental brushes.',
            'Limit sweet snacks and acidic drinks between meals.',
            'Change your toothbrush every 3 months, or sooner if the bristles have splayed.',
          ],
        },
      ],
      faqs: [
        {
          question: 'What kind of fillings do you use?',
          answer:
            'We use tooth-coloured composite fillings. They bond to the tooth and are shaped directly in the mouth, in a single session.',
        },
        {
          question: 'Do old amalgam fillings need replacing?',
          answer:
            'Not necessarily. If they are intact and the tooth is healthy, they can stay. We replace them when they are cracked, when decay has appeared at the edge, or when you would like a more natural look.',
        },
        {
          question: 'Why are my teeth sensitive to cold?',
          answer:
            'Common causes are gum recession, worn enamel, decay or a leaking filling. The dentist looks for the cause at a check-up. Until then, a toothpaste for sensitive teeth can help.',
        },
        {
          question: 'How long does a filling take?',
          answer:
            'Usually between half an hour and an hour per tooth, depending on the size of the cavity.',
        },
      ],
    },

    // ------------------------------------------------------------------
    'consultatie-stomatologica': {
      intro:
        'A dental consultation is your first visit to DENTCRAFT: the dentist examines your teeth, gums and bite, listens to what is bothering you and explains what they have found. You leave with a treatment plan and an estimated price, before any treatment begins. The clinic is in Satu Mare, and consultations are available in Romanian, English or Hungarian.',
      sections: [
        {
          heading: 'What happens at the consultation',
          paragraphs: [],
          bullets: [
            'we talk about what is bothering you, any previous treatment and your general health;',
            'the dentist examines each tooth, your gums, your bite and the soft tissues in your mouth;',
            'if needed, we take photos and a digital scan of your teeth with the Medit i700 intraoral scanner;',
            'if imaging is needed, we tell you what to have done and where;',
            'we explain the treatment options, with the advantages and limitations of each.',
          ],
        },
        {
          heading: 'What you receive after the consultation',
          paragraphs: [
            'You receive a treatment plan with the stages, the approximate number of sessions and the estimated price. If there are several options, you see them all and you choose. We don’t start any treatment without your agreement.',
          ],
        },
        {
          heading: 'What to bring',
          paragraphs: [],
          bullets: [
            'a list of the medication you take;',
            'any recent imaging, if you have it;',
            'relevant medical letters or test results, for example if you have diabetes or take anticoagulants;',
            'the questions you want to ask, written down beforehand.',
          ],
        },
        {
          heading: 'When to come for a consultation',
          paragraphs: [
            'Come in if you have pain, sensitivity or swelling, if your gums bleed, if a filling has come out, or if you want to know your options for a missing tooth, braces or a brighter smile. If you haven’t been to the dentist for a long time, a consultation is a good place to start.',
          ],
        },
      ],
      faqs: [
        {
          question: 'How long does the consultation take?',
          answer:
            'It depends on how complex your case is and whether we also take photos and a scan. When you book, we tell you how much time to set aside.',
        },
        {
          question: 'How much does the consultation cost?',
          answer:
            'The price depends on the type of consultation, for example whether it also includes photos and a scan. You can find the up-to-date list on the Prices page, and when you book we tell you exactly what is included.',
        },
        {
          question: 'Can I start treatment on the same day?',
          answer:
            'Sometimes, yes, if it’s an emergency or a simple treatment and you have time. Usually, after the consultation you think over the plan at your own pace and come back for treatment.',
        },
        {
          question: 'Do you speak English or Hungarian?',
          answer:
            'Yes. Consultations and explanations can be given in Romanian, English and Hungarian.',
        },
        {
          question: 'How do I book an appointment?',
          answer:
            'Call 0741 199 977, Monday to Friday, between 10:00 and 18:00, or use the booking form on the website.',
        },
      ],
      links: [
        { label: 'Price list', page: '/preturi' },
        { label: 'Contact', page: '/contact' },
      ],
    },

    // ------------------------------------------------------------------
    protetica: {
      intro:
        'Prosthetic dentistry replaces missing teeth and restores badly damaged teeth, with crowns, bridges, implant-supported restorations or dentures. The aim is for you to chew and speak normally and for it to look natural. At DENTCRAFT in Satu Mare, prosthetic work is planned and made by Dr. Petric Răzvan-Tudor, and impressions are taken digitally with the Medit i700 scanner.',
      sections: [
        {
          heading: 'Types of restoration',
          paragraphs: [],
          bullets: [
            'Crown: a “cap” that completely covers a weakened, cracked or root-filled tooth.',
            'Bridge: replaces one or more missing teeth and rests on the neighbouring teeth, which are filed down.',
            'Implant-supported restorations: crowns, bridges or full arches attached to implants, without involving the neighbouring teeth.',
            'Inlays and onlays: restorations made in the laboratory for teeth with major loss of structure, when a filling won’t hold but a crown would be too much.',
            'Removable dentures: partial or full, for cases where fixed restorations aren’t possible or aren’t wanted.',
          ],
        },
        {
          heading: 'Digital impressions',
          paragraphs: [
            'Instead of the traditional putty, the impression is taken with the Medit i700 intraoral scanner. The scanner creates a 3D model of your teeth on screen, which you can see too. It’s more comfortable, especially for people with a strong gag reflex. If something isn’t captured well, only that area is rescanned. The file is sent digitally to the laboratory.',
          ],
        },
        {
          heading: 'How prosthetic treatment works',
          paragraphs: [
            'First, any decay, gum problems and root canal issues are treated. Then the teeth are prepared, the impression is taken and you receive a temporary restoration, so you aren’t left without teeth. Once the laboratory has made the restoration, we try it in, check the colour, shape and bite, and only then fix it permanently. A crown or bridge usually takes two or three visits.',
          ],
        },
        {
          heading: 'Looking after your restoration',
          paragraphs: [
            'The restoration itself can’t decay, but the tooth underneath and the gum around it can still have problems. Brush twice a day, clean under bridges with special floss or a water flosser, and come for a check-up and hygiene session every 6 months.',
          ],
        },
      ],
      faqs: [
        {
          question: 'Which should I choose: a bridge or an implant?',
          answer:
            'A bridge is quicker, but it means filing down the neighbouring teeth. An implant doesn’t involve the neighbouring teeth, but it needs enough bone and a few months of healing. The dentist explains what suits your case.',
        },
        {
          question: 'What are crowns made of?',
          answer:
            'The most commonly used materials are zirconia and all-ceramic. Zirconia is very strong and suitable for back teeth, while all-ceramic looks very natural at the front. The choice depends on the tooth, your bite and how much appearance matters.',
        },
        {
          question: 'How long will I have the temporary restoration?',
          answer:
            'Usually one to two weeks for a simple crown or bridge. With implant restorations or larger rehabilitations, the temporary may stay in longer.',
        },
        {
          question: 'How long does a crown last?',
          answer:
            'A well-made crown that is looked after can last many years. Hygiene, regular check-ups and whether you grind your teeth all play a part. For teeth grinding (bruxism), a protective night guard can be made.',
        },
      ],
    },

    // ------------------------------------------------------------------
    'coroane-dentare': {
      intro:
        'A dental crown is a restoration that completely covers a weakened, broken or root-filled tooth and restores its shape, strength and colour. It is fixed permanently, so it doesn’t come out. At DENTCRAFT in Satu Mare, crowns are made by Dr. Petric Răzvan-Tudor, with a digital impression taken using the Medit i700 intraoral scanner.',
      sections: [
        {
          heading: 'When you need a crown',
          paragraphs: [],
          bullets: [
            'the tooth has a filling so large that the remaining walls could break;',
            'the tooth is cracked or a piece of it has broken off;',
            'the tooth has had root canal treatment and is more fragile;',
            'you want to change the shape or colour of a tooth and a veneer isn’t enough;',
            'an implant needs to be covered (implant crown).',
          ],
        },
        {
          heading: 'Zirconia or all-ceramic',
          paragraphs: [
            'Zirconia is a very strong material, suitable for molars and premolars, where chewing forces are high. All-ceramic lets light through in the same way as enamel, so it looks very natural on front teeth. The dentist recommends the material based on the position of the tooth, your bite and how much appearance matters to you.',
          ],
        },
        {
          heading: 'The stages of a crown',
          paragraphs: [],
          bullets: [
            'Preparation: the tooth is treated if needed, then filed down slightly on all sides, under local anaesthetic.',
            'Digital impression: the scanner creates a 3D model of the tooth, with no impression putty.',
            'Temporary crown: you wear it until the final one is ready, so the tooth is protected.',
            'Try-in and cementation: we check the shape, colour and bite, then the crown is fixed permanently.',
          ],
        },
        {
          heading: 'Looking after your crown',
          paragraphs: [
            'The crown itself can’t decay, but the edge of the tooth underneath can. Brush carefully along the line between the crown and the gum, use dental floss and come for a check-up every 6 months. If you grind your teeth at night, a protective night guard helps the crown last longer.',
          ],
        },
      ],
      faqs: [
        {
          question: 'Does preparing the tooth for a crown hurt?',
          answer:
            'No, because it is done under local anaesthetic. Once the anaesthetic wears off, the tooth may be slightly sensitive for a few days.',
        },
        {
          question: 'How many visits are needed?',
          answer:
            'Usually two or three: one for preparation and the impression, one for the try-in and cementation, and sometimes an extra try-in for colour on front teeth.',
        },
        {
          question: 'Will people be able to tell it’s a crown?',
          answer:
            'A well-made crown has the shape and colour of the neighbouring teeth. The shade is chosen at the clinic, and for front teeth we can do try-ins until you are happy.',
        },
        {
          question: 'Can I have a crown on a tooth without a nerve?',
          answer:
            'Yes, and it’s often recommended. Root-filled teeth, especially molars, crack more easily, and a crown protects them. Sometimes a post is needed first to support the build-up.',
        },
      ],
    },

    // ------------------------------------------------------------------
    'fatete-dentare': {
      intro:
        'Dental veneers are thin shells of ceramic or composite bonded to the front surface of the front teeth. They correct colour, shape, size and small gaps between teeth, with minimal preparation. At DENTCRAFT in Satu Mare, veneers are planned and fitted by Dr. Petric Răzvan-Tudor, who trained in aesthetic dentistry on Mauro Fradeani Education courses.',
      sections: [
        {
          heading: 'When veneers are suitable',
          paragraphs: [],
          bullets: [
            'stained teeth that don’t whiten enough;',
            'chipped or worn teeth;',
            'small teeth, irregularly shaped teeth or slightly rotated teeth;',
            'small gaps between the front teeth.',
          ],
          after:
            'Veneers don’t replace braces when the teeth are very crowded, and they aren’t a solution for teeth with untreated decay or inflamed gums. Those are dealt with first.',
        },
        {
          heading: 'Ceramic or composite',
          paragraphs: [
            'Ceramic veneers are made in the laboratory. They keep their colour and shine for a long time and look very natural. Composite veneers are shaped directly on the tooth, usually in a single session. They are easier to repair, but they can stain and wear over time. Which you choose depends on your teeth and on how long you want the result to last without touch-ups.',
          ],
        },
        {
          heading: 'How treatment works',
          paragraphs: [
            'We start with a conversation about what you would like, along with photos and a digital scan of your teeth. Based on these, a mock-up of your smile can be made, which you try in your mouth before any tooth is touched. That way you see the shape and length of the future veneers.',
            'If you like the result, the teeth are prepared with minimal filing, the impression is taken and you receive temporary veneers. At the next visit, the final veneers are tried in and bonded. Ceramic veneers usually take a few visits over a few weeks.',
          ],
        },
        {
          heading: 'Looking after your veneers',
          paragraphs: [
            'Brush your teeth as normal, use dental floss and come for a check-up and hygiene session every 6 months. Avoid biting hard objects, such as pens, ice or fruit stones, and don’t open packaging with your teeth. If you grind your teeth, wear a protective night guard.',
          ],
        },
      ],
      faqs: [
        {
          question: 'Are the teeth filed down for veneers?',
          answer:
            'Usually only very slightly, just a fraction of a millimetre of enamel. In some cases the work can be done with almost no preparation. How much is needed becomes clear during planning, before any treatment.',
        },
        {
          question: 'How long do veneers last?',
          answer:
            'Well-cared-for ceramic veneers can last many years. Composite veneers need polishing and repairs more often. How long they last also depends on hygiene, teeth grinding and habits such as nail biting.',
        },
        {
          question: 'Can I see the result beforehand?',
          answer:
            'Yes. A mock-up is made from the photos and scan, and you try it in your mouth to see the shape of the future veneers. Nothing is filed down until you are happy with the shape.',
        },
        {
          question: 'Can veneers be whitened later?',
          answer:
            'No. Ceramic doesn’t whiten. If you want whiter teeth, whitening is done before the veneers, so that their shade matches your other teeth.',
        },
      ],
    },

    // ------------------------------------------------------------------
    'albire-dentara': {
      intro:
        'Professional teeth whitening lightens the shade of your teeth with a gel applied and supervised by the dentist. It works on stains left by coffee, tea, wine or smoking and on the yellowing that comes with age. At DENTCRAFT in Satu Mare, whitening follows a consultation that checks whether your teeth and gums are ready.',
      sections: [
        {
          heading: 'Who whitening is suitable for',
          paragraphs: [
            'Whitening gives the best results on natural teeth that are yellowed or have surface stains. It doesn’t change the colour of fillings, crowns or veneers, so if you have restorations on your front teeth, you may need to replace them after whitening so the shades match.',
            'Whitening is not recommended during pregnancy or breastfeeding, or on teeth with untreated decay or inflamed gums. Those are treated first. Deep stains, for example those caused by certain medicines, are hard to whiten, and veneers may be more suitable for them.',
          ],
        },
        {
          heading: 'How in-surgery whitening works',
          paragraphs: [],
          bullets: [
            'Consultation: the dentist checks your teeth and gums and notes your starting shade.',
            'Hygiene treatment: tartar and surface stains are removed beforehand, so the gel works evenly.',
            'Gum protection: the gums are covered with a barrier so the gel doesn’t touch them.',
            'Applying the gel: the whitening gel stays on the teeth for a time set by the dentist, then is removed.',
            'The result: we compare the new shade with the one at the start.',
          ],
        },
        {
          heading: 'Sensitivity after whitening',
          paragraphs: [
            'Many patients feel sensitivity to cold in the first few days. It is temporary. A toothpaste for sensitive teeth, used for a few days before and after, helps. If you know you have sensitive teeth, tell the dentist at the start.',
          ],
        },
        {
          heading: 'How to keep the result',
          paragraphs: [
            'For the first 48 hours, avoid coffee, black tea, red wine, coloured sauces and smoking, because teeth stain more easily straight after whitening. After that, a hygiene session every 6 months and good brushing keep the shade for longer. How long the effect lasts depends a lot on your habits.',
          ],
        },
      ],
      faqs: [
        {
          question: 'Does whitening damage the enamel?',
          answer:
            'No, if it is done properly, under dental supervision. The gel acts on the pigments in the tooth, not on the structure of the enamel. Sensitivity after whitening is temporary.',
        },
        {
          question: 'How white will my teeth get?',
          answer:
            'It depends on your starting shade and the type of staining. Yellowed teeth usually whiten better than greyish ones. The dentist tells you at the consultation what you can realistically expect.',
        },
        {
          question: 'Can I have whitening if I have crowns or veneers?',
          answer:
            'You can, but restorations keep their colour, so differences from your natural teeth may show. We discuss beforehand whether whitening is worthwhile and whether the restorations should be replaced afterwards.',
        },
        {
          question: 'How long does the effect last?',
          answer:
            'It depends a lot on your habits: coffee, tea, wine and smoking stain the teeth again. With regular hygiene sessions and attention to what you eat and drink, the result lasts longer.',
        },
      ],
    },

    // ------------------------------------------------------------------
    'estetica-dentara': {
      intro:
        'Aesthetic dentistry deals with how your smile looks: the colour, shape and proportions of the teeth and the outline of the gums. It includes whitening, veneers, ceramic crowns and shape corrections with composite. At DENTCRAFT in Satu Mare, aesthetic plans are made by Dr. Petric Răzvan-Tudor, who trained on Mauro Fradeani Education courses.',
      sections: [
        {
          heading: 'Treatments included in aesthetic dentistry',
          paragraphs: [],
          bullets: [
            'professional whitening, for yellowed or stained teeth;',
            'ceramic or composite veneers, for shape, colour and small gaps;',
            'ceramic crowns, for badly damaged teeth or old restorations that no longer look good;',
            'composite corrections: a chipped corner, a small gap, a worn edge;',
            'replacing old, dark fillings on the front teeth.',
          ],
          after:
            'When teeth are crooked, braces often solve the problem better, and with less filing down of the teeth than veneers. We refer you to Dr. Cozma Ștefana if that’s the case.',
        },
        {
          heading: 'How we plan a smile',
          paragraphs: [
            'We start with a conversation about what bothers you and what you would like. We take photos and a digital scan with the Medit i700. Based on these, the dentist analyses the proportions of your teeth in relation to your lips and your face. When needed, a mock-up is made for you to try in your mouth, so you can see how the result would look before any tooth is touched.',
          ],
        },
        {
          heading: 'Health comes first',
          paragraphs: [
            'Aesthetic treatment only lasts on healthy teeth and gums. That’s why, before veneers or crowns, we treat any decay, carry out hygiene treatment and, if needed, treat the gums. If you grind your teeth, we also discuss a protective night guard, so the new restorations don’t chip.',
          ],
        },
      ],
      faqs: [
        {
          question: 'Where do I start if I want a nicer smile?',
          answer:
            'With a consultation. The dentist sees what bothers you, checks the health of your teeth and gums and suggests the possible options, from the simplest, such as whitening, to veneers or crowns.',
        },
        {
          question: 'Veneers or whitening?',
          answer:
            'If the problem is only the colour, whitening is usually the first step, because it doesn’t involve altering the teeth. Veneers are suitable when you also want to change the shape, size or gaps between the teeth.',
        },
        {
          question: 'Can I see the result before treatment?',
          answer:
            'Yes. A mock-up can be made from the photos and digital scan, and you try it in your mouth. Nothing is filed down until you are happy with the proposed shape.',
        },
        {
          question: 'How long does aesthetic treatment take?',
          answer:
            'Whitening or a composite correction is usually done in one visit. Veneers and ceramic crowns take a few visits over a few weeks, because they are made in the laboratory.',
        },
      ],
    },
  },
}
