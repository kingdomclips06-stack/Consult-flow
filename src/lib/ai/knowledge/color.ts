import { DomainKnowledge } from './types';

export const colorKB: DomainKnowledge = {
  id: 'color-services',
  name: 'Color Services',
  description: 'Professional hair coloring, lightening, and chemical treatments. Grounded in hair science, color theory, and structural protection to achieve stunning results from natural grey coverage to bold double-process platinum.',
  subTypes: [
    {
      name: 'Grey Coverage (Permanent / Demi-Permanent)',
      description: 'Dyeing stubborn white/grey hair to match the client’s natural base. Demi-permanent is used for soft blending, while permanent dye offers 100% opaque coverage.',
      techniques: [
        'Perform a mandatory skin patch test 24-48 hours before the service to check for PPD allergies.',
        'Use a 20-Volume developer with permanent color to open the tough, resistant cuticle of grey hair.',
        'Apply color first to the areas with the highest concentration of grey (typically temples and crown).',
        'Cross-check sections in diagonal sub-parts to ensure complete, saturated coverage.'
      ],
      suitability: ['Clients with aging hair', 'All hair textures']
    },
    {
      name: 'Bleach & Tone (Double Process / Platinum)',
      description: 'An intense two-step lightening service. First, hair is bleached to a pale yellow canvas; second, a customized toner is applied to achieve platinum, silver, or cool blond shades.',
      techniques: [
        'Assess scalp health before starting; NEVER bleach if there are open abrasions, psoriasis, or eczema.',
        'Apply a scalp-barrier protector before on-scalp bleach application.',
        'Apply lightener in paper-thin sections using a 20-Volume developer on the scalp to prevent chemical burns, and up to 30-Volume on the mid-shafts.',
        'Integrate a bond-builder (like Olaplex No. 1) directly into the bleach mixture to protect disulfide bonds.',
        'Tone the hair at the backwash using an acidic demi-permanent toner to neutralize yellow or brassy orange undertones.'
      ],
      suitability: ['Clients seeking high-impact fashion colors', 'Short crops, buzz cuts, and textured tops', 'Healthy, non-compromised hair']
    },
    {
      name: 'Highlights (Foil Highlights)',
      description: 'Weaving out fine strands of hair and enclosing them in foil with lightener to add multi-dimensional brightness and contrast throughout the hairstyle.',
      techniques: [
        'Choose between "slicing" (for bold, ribbon-like highlights) and "weaving" (for soft, natural, blended highlights).',
        'Fold foils securely to prevent "bleeding" (bleach seeping out and creating spots on surrounding hair).',
        'Feather the bleach upward near the foil fold to create a soft transition at the root, avoiding harsh lines of demarcation.'
      ],
      suitability: ['Adding depth and dimension to straight or wavy hair', 'Clients wanting a lighter look without the high maintenance of a full bleach']
    },
    {
      name: 'Balayage (Hand-Painted)',
      description: 'A French hand-painted highlighting technique. It creates a soft, sun-kissed, natural look with a gentle gradient that is darker at the roots and lighter toward the ends.',
      techniques: [
        'Paint lightener free-hand onto the surface of the hair sections in a V-shape or W-shape pattern.',
        'Leave the interior of the section dark to maintain natural depth and dimension.',
        'Apply a "shadow root" demi-permanent toner at the roots after rinsing to seamlessly blend the hand-painted sections into the natural base.'
      ],
      suitability: ['Medium to long hairstyles', 'Clients seeking ultra-low maintenance (grows out beautifully without roots showing)']
    },
    {
      name: 'Toner & Gloss',
      description: 'An essential finishing service. Acidic toners refine, neutralize, or enhance the shade of lightened hair, while clear gloss seals the cuticle and injects brilliant shine.',
      techniques: [
        'Apply toner to damp, towel-dried hair at the shampoo bowl for quick, even absorption.',
        'Utilize color theory: Use a violet-based toner to neutralize yellow (Level 9-10), and a blue-based toner to neutralize orange/brass (Level 7-8).',
        'Process for up to 20 minutes, monitoring visually to avoid over-depositing color.'
      ],
      suitability: ['Essential post-lightening treatment', 'Refreshing faded color between major highlighting appointments']
    }
  ],
  professionalTechniques: [
    'Bond Building: Mixing professional additives (like Olaplex or Wellaplex) into lighteners. These cross-link broken disulfide bonds in the hair shaft, preserving hair strength, elasticity, and curl pattern during intense chemical processing.',
    'Under-Coloring / Shadow Root: Applying a darker shade at the root area that matches the natural base color, then blending it into bleached or highlighted lengths. This prevents "harsh root lines" as the hair grows.',
    'Saturating and Sectioning: Utilizing clean four-quadrant sectioning (ear-to-ear and forehead-to-nape) and applying color generously to ensure no spots are missed, especially on thick or coily hair.',
    'Developer Chemistry: Selecting the correct developer volume (10 Vol for deposit, 20 Vol for grey coverage/1 level of lift, 30 Vol for 2-3 levels of lift, and avoiding 40 Vol on the scalp to prevent chemical burns).'
  ],
  productRecommendations: [
    {
      category: 'Lighteners & Color',
      products: [
        { name: 'BlondMe Bond Enforcing Premium Lightener 9+', brand: 'Schwarzkopf Professional', purpose: 'High-performance bleach powder that lifts up to 9 levels with integrated bond-enforcing technology to minimize breakage.', usageInstructions: 'Mix with BlondMe Premium Developer (2% or 6% on scalp; 9% off-scalp only).' },
        { name: 'Color Touch Acidic Demi-Permanent', brand: 'Wella Professionals', purpose: 'Acidic, ammonia-free color line that tones hair gently without lifting the natural base.', usageInstructions: 'Mix 1:2 with Color Touch Emulsion 1.9% and apply to damp hair for 10-15 minutes.' },
        { name: 'Olaplex Salon Intro Kit (No.1 & No.2)', brand: 'Olaplex', purpose: 'The gold-standard bond rebuilding system used during and immediately after chemical services.', usageInstructions: 'Add No.1 directly into bleach mixture. Apply No.2 as a post-rinse treatment before shampooing.' }
      ]
    },
    {
      category: 'Color Maintenance & Post-Care',
      products: [
        { name: 'Color Conserve Shampoo & Conditioner', brand: 'Aveda', purpose: 'Gentle, plant-based, sulfate-free hair wash that seals the cuticle to lock in color vibrancy.', usageInstructions: 'Instruct the client to use cool water and wash hair no more than 2-3 times a week.' },
        { name: 'Color Extend Blondage Purple Shampoo', brand: 'Redken', purpose: 'Highly pigmented violet shampoo that deposits cool tones to neutralize yellow brassiness at home.', usageInstructions: 'Wet hair, lather, let sit for 3-5 minutes depending on brassiness, then rinse. Use once a week.' }
      ]
    }
  ],
  commonQuestions: [
    {
      question: 'Will bleaching my hair ruin my natural curl pattern?',
      answer: 'Bleaching is a chemical process that breaks down the melanin and alters the protein structure of your hair. If done too aggressively or without protective measures, it can indeed relax your natural curl pattern and make it frizzy. To prevent this, we always use a lower developer volume, process the hair slowly, and mix in a professional bond-rebuilder (like Olaplex) to repair and protect your hair’s internal disulfide bonds throughout the service.'
    },
    {
      question: 'How do I stop my silver or platinum hair from turning yellow and brassy?',
      answer: 'Lightened hair naturally oxidizes over time, especially when exposed to hard water, sun, heat styling, and chlorine, which causes the cool toner to wash out and reveal the warm yellow undertones beneath. To combat this, you should wash your hair with cool water, wash less frequently (2-3 times a week max), use a sulfate-free color-safe shampoo, and use a professional-grade purple shampoo once a week to deposit violet pigments that neutralize the yellow.'
    },
    {
      question: 'Why is a skin patch test necessary before a coloring service?',
      answer: 'Permanent hair color contains a chemical compound called para-phenylenediamine (PPD), which is highly effective at depositing color but is also a known allergen. A small percentage of people can develop sudden, severe allergic reactions (redness, swelling, blistered skin). We apply a tiny dab of color behind your ear 24 to 48 hours prior to your service to guarantee your scalp remains completely safe.'
    }
  ],
  serviceMatching: [
    {
      criteria: ['wants platinum blond', 'wants silver white hair', 'healthy hair', 'prepared for maintenance'],
      recommendedService: 'Master Platinum Bleach, Bond Protection & Customized Toner',
      estimatedDurationMinutes: 150,
      estimatedPrice: 180,
      upsellSuggestions: ['Olaplex Deep Rebuilding Treatment', 'Take-home Purple Maintenance Duo']
    },
    {
      criteria: ['grey hair', 'wants natural look', 'conservative', 'quick service'],
      recommendedService: 'Premium Grey Blend / Opaque Permanent Coverage',
      estimatedDurationMinutes: 60,
      estimatedPrice: 75,
      upsellSuggestions: ['Haircut Refresh & Beard Detail', 'Post-Color Scalp Soothing Treatment']
    },
    {
      criteria: ['long hair', 'sun kissed look', 'low maintenance highlights'],
      recommendedService: 'Hand-Painted Balayage & Shadow Root Melt',
      estimatedDurationMinutes: 120,
      estimatedPrice: 150,
      upsellSuggestions: ['Cuticle-Sealing Shine Gloss', 'Moisture-Infused Deep Conditioning Mask']
    }
  ]
};
