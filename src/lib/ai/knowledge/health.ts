import { DomainKnowledge } from './types';

export const healthKB: DomainKnowledge = {
  id: 'hair-and-scalp-health',
  name: 'Hair Loss & Scalp Health',
  description: 'Specialized clinical knowledge on hair loss patterns (Norwood scale), hair restoration, scalp micropigmentation, and the treatment of common scalp disorders like dandruff, psoriasis, and eczema.',
  subTypes: [
    {
      name: 'Androgenetic Alopecia (Male Pattern Baldness / MPB)',
      description: 'The most common form of hair loss, characterized by a receding hairline at the temples and thinning at the crown (Norwood Scale 1 to 7). Driven by dihydrotestosterone (DHT) sensitivity.',
      techniques: [
        'Diagnose the client’s Norwood Scale level to set realistic hair goals.',
        'Keep the sides and back extremely short (using high skin fades or high tapers) to reduce the contrast between the dark sides and the thinning top, immediately making the top appear thicker.',
        'Cut the top hair into a forward-directed textured crop or Caesar cut to cover temple recession naturally.',
        'Never use thinning or texturizing shears on areas with low density; instead, use light point-cutting at the tips for texture.',
        'Avoid heavy, sticky hair pomades that clump hair strands together and expose the scalp; use lightweight volume powders or matte dusts instead.'
      ],
      suitability: ['Clients experiencing active hair thinning or receding hairlines']
    },
    {
      name: 'Scalp Micropigmentation (SMP)',
      description: 'An advanced cosmetic procedure where specialized medical-grade pigments are tattooed into the epidermal layer of the scalp to replicate the appearance of individual shaved hair follicles.',
      techniques: [
        'Examine scalp health and density to design a natural-looking hairline that matches the client’s facial anatomy.',
        'Use a specialized 3-point micro-needle and organic carbon-based pigments that do not discolor or migrate over time.',
        'Perform multi-session layering (typically 2-3 sessions) to build up three-dimensional follicle density and depth.',
        'Instruct the client to maintain a shaved head (using a foil shaver or #0 guard) to keep the natural hair blended with the SMP pigments.'
      ],
      suitability: ['Norwood Scale 5-7 baldness', 'Clients with diffuse thinning seeking the illusion of density', 'Alopecia Areata sufferers', 'Scar camouflage from hair transplants']
    },
    {
      name: 'Seborrheic Dermatitis (Dandruff)',
      description: 'An inflammatory scalp condition characterized by greasy, oily, yellow-white skin flakes. Primarily driven by an overgrowth of Malassezia yeast feeding on excess scalp sebum.',
      techniques: [
        'Differentiate between simple "dry scalp" (small, dry white flakes caused by lack of moisture) and "dandruff" (oily, yellow flakes with red skin).',
        'Avoid using heavy pomades, gels, or waxes on dandruff-prone scalps, as these trap sebum and feed Malassezia yeast.',
        'Use an exfoliating rubber scalp brush at the shampoo bowl to gently lift and wash away stubborn grease flakes without scratching the scalp.'
      ],
      suitability: ['Clients with excessively oily, itchy, or flaking scalps']
    },
    {
      name: 'Scalp Psoriasis & Eczema',
      description: 'Psoriasis presents as thick, raised, silver-scaled plaques due to accelerated skin-cell turnover. Eczema presents as dry, red, highly itchy, hyper-sensitive skin patches.',
      techniques: [
        'NEVER scratch, scrape, or aggressively comb active psoriasis plaques; doing so triggers the "Koebner phenomenon" where injury causes more plaques to form.',
        'Wash hair using lukewarm or cool water; hot water strips the scalp of essential lipids and severely aggravates eczema and psoriasis.',
        'Blow-dry hair strictly on a cool setting; hot air triggers intense itching and further dries out the compromised skin barrier.',
        'Apply high-quality post-shave witch hazel or tea tree cooling toners to calm inflammation immediately after neck trims.'
      ],
      suitability: ['Clients with diagnosed autoimmune skin conditions or hyper-sensitive scalps']
    }
  ],
  professionalTechniques: [
    'Norwood Scale Mapping: A visual scale from 1 (no hair loss) to 7 (severe baldness with only a band of hair left on the sides). Used during consultation to design the perfect hairstyle or plan SMP treatments.',
    'Optical Density Contrast: Cutting the sides of a thinning client’s hair significantly shorter than the top. This trick removes the side-to-top volume contrast, instantly drawing visual focus upward and making the top hair look denser.',
    'Scalp Steaming & Exfoliation: Utilizing a warm mist steamer combined with salicylic acid or tea tree oil exfoliators to open pores, soften scaling plaques, and clarify the scalp before washing.',
    'Avoidance of Razoring: Restricting the use of straight razors on active eczema or psoriasis areas of the neck and sideburns to prevent further barrier damage, skin infections, and flare-ups.'
  ],
  productRecommendations: [
    {
      category: 'Hair Thinning & Density Products',
      products: [
        { name: 'System 2 Cleanser & Scalp Therapy', brand: 'Nioxin', purpose: 'A three-step shampoo, conditioner, and leave-in scalp treatment optimized to remove follicle-clogging sebum and DHT, promoting thicker-looking hair.', usageInstructions: 'Massage cleanser into wet hair for 1 minute, rinse. Apply scalp therapy conditioner for 3 minutes, rinse. Apply treatment directly to scalp.' },
        { name: 'Texture Dust / Styling Powder', brand: 'Slick Gorilla', purpose: 'A silica-based lightweight styling powder that adds intense volume, dry texture, and matte hold without clumping hair strands together.', usageInstructions: 'Puff lightly onto dry roots and style with fingers. Ideal for disguising thinning crowns.' }
      ]
    },
    {
      category: 'Medicinal Scalp Care',
      products: [
        { name: 'Nizoral A-D Ketoconazole 1%', brand: 'Nizoral', purpose: 'A powerful anti-fungal shampoo that targets and kills Malassezia yeast to cure severe dandruff and itching.', usageInstructions: 'Wet hair, apply, lather, and let sit for exactly 5 minutes before rinsing. Use twice a week.' },
        { name: 'Coal Tar T/Gel Therapeutic Shampoo', brand: 'Neutrogena', purpose: 'Contains coal tar extract to slow down the rapid skin-cell production of scalp psoriasis and reduce scaling.', usageInstructions: 'Massage into the scalp, leave for 2-3 minutes, then rinse. Use up to 3 times a week.' },
        { name: 'Scalp Relief Tea Tree Soothing Oil', brand: 'Chi Professional', purpose: 'A lightweight botanical oil containing tea tree, aloe, and peppermint to instantly soothe red, dry, and irritated scalps.', usageInstructions: 'Apply 2-3 drops to irritated spots post-service. Do not rinse.' }
      ]
    }
  ],
  commonQuestions: [
    {
      question: 'Is my hair loss permanent, and what haircuts can help hide my thinning crown?',
      answer: 'Most hair loss in men is due to Male Pattern Baldness (androgenic alopecia), which is genetically determined but can be slowed down with treatments like Minoxidil or Nioxin. To disguise a thinning crown or receding temples, the best trick is to cut the sides and back extremely short with a high skin fade or high taper. By taking the hair down to skin on the sides, we eliminate the visual contrast, which immediately makes the hair on top look thicker. We pair this with a forward-flowing "Textured Crop" or messy style to cover thinning areas naturally.'
    },
    {
      question: 'What is Scalp Micropigmentation (SMP), and is it a surgical procedure?',
      answer: 'Scalp Micropigmentation (SMP) is a 100% non-surgical, cosmetic procedure. It is essentially medical-grade tattooing where we use specialized micro-needles and carbon-based pigments to deposit thousands of tiny, follicle-like impressions into your scalp. This replicates the look of a full, dense head of shaved hair. It requires 2 to 3 sessions to build depth and density and is an outstanding, permanent solution for clients with advanced hair loss.'
    },
    {
      question: 'Why do I have so many white flakes, and is it dry scalp or dandruff?',
      answer: 'This is a very common point of confusion. Dry scalp is simply dehydrated skin; it produces small, dry, dusty white flakes and is easily treated with a hydrating conditioner. Dandruff (seborrheic dermatitis) is actually caused by an overgrowth of Malassezia yeast that feeds on excess oil. It produces larger, oily, yellow-white flakes and is often accompanied by redness and itching. Dandruff must be treated with anti-fungal shampoos containing ingredients like Ketoconazole, Zinc Pyrithione, or Coal Tar.'
    }
  ],
  serviceMatching: [
    {
      criteria: ['thinning hair', 'receding hairline', 'wants volume', 'looks bald'],
      recommendedService: 'Nioxin Scalp Detoxing & Optical Density Haircut',
      estimatedDurationMinutes: 50,
      estimatedPrice: 60,
      upsellSuggestions: ['Take-home Nioxin System Kit', 'Texturizing Matte Styling Dust']
    },
    {
      criteria: ['oily flakes', 'yellow scalp flakes', 'itchy scalp'],
      recommendedService: 'Medicinal Scalp Exfoliation, Steam & Soothing Wash',
      estimatedDurationMinutes: 40,
      estimatedPrice: 50,
      upsellSuggestions: ['Post-Wash Tea Tree Healing Massage', 'Take-home Anti-fungal Nizoral']
    },
    {
      criteria: ['bald head', 'Norwood scale 5 to 7', 'wants hair look', 'low maintenance hair look'],
      recommendedService: 'Scalp Micropigmentation (SMP) Consultation & Mapping',
      estimatedDurationMinutes: 30,
      estimatedPrice: 40,
      upsellSuggestions: ['Premium Shaved Head Polish', 'Foil Shave & Scalp Exfoliation']
    }
  ]
};
