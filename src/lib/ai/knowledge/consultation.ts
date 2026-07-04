import { DomainKnowledge } from './types';

export const consultationKB: DomainKnowledge = {
  id: 'professional-consultation',
  name: 'Professional Consultation',
  description: 'The cornerstone of a premium barbering experience. Focuses on master-level client intake, realistic expectations management, scalp analysis, lifestyle assessment, and systematic client education.',
  subTypes: [
    {
      name: 'New Client Deep Consultation',
      description: 'A thorough, 5-minute diagnostic consultation conducted prior to any shears or clippers touching the hair. Builds trust, uncovers hidden client frustrations, and maps out a long-term grooming plan.',
      techniques: [
        'Sit or stand eye-to-eye with the client. Avoid talking to them solely through the mirror reflection; physical eye contact establishes immediate professional trust.',
        'Ask open-ended discovery questions: "What did you dislike about your last three haircuts?" and "How much time do you want to spend styling your hair each morning?"',
        'Examine the natural fall of the hair, crown whorls (cowlicks), hairline recession, and overall skull shape.',
        'Use the mirror to point directly to specific zones of the head (sides, occipital, crown) to visually confirm length agreements.'
      ],
      suitability: ['First-time clients', 'Clients seeking a major style transformation']
    },
    {
      name: 'Returning Client Growth Analysis',
      description: 'A quick 2-minute diagnostic review for regular clients to evaluate how the previous haircut grew out and make subtle, seasonal, or stylistic adjustments.',
      techniques: [
        'Ask target questions: "How did the haircut behave during week 3 and 4?" and "Did you find it easy to style with the clay I recommended?"',
        'Inspect the nape and temple areas to see how the previous fade or taper transitioned as it grew.',
        'Confirm if the client wants to maintain the exact same silhouette or begin transitioning into a new seasonal length.'
      ],
      suitability: ['Repeat/loyal clients']
    }
  ],
  professionalTechniques: [
    'The 3-Point Scalp Analysis: Running hands gently through the client’s hair to check the crown whorl rotation direction, feel the skull curvature (flat spots/occipital prominence), and inspect the scalp for hidden skin tags, moles, or psoriasis plaques.',
    'Expectation Realism (The Celebrity Photo Rule): Educating a client who brings a celebrity inspiration photo about why that style will look unique on them. Explain how differences in skull shape, frontal hairline density, and hair caliber (fine vs. coarse) will alter the final outcome, promising a customized version tailored to their bone structure.',
    'Interactive Styling Demonstration: Before the client leaves the chair, apply the recommended styling product while they hold a hand-mirror. Explain step-by-step how to emulsify the product, work it from back-to-front (never dump product on the fringe first), and use a blow-dryer or comb to lock in the shape.',
    'Cowlick Compensation: Identifying a strong crown cowlick and leaving that specific area 1/4 inch longer than the rest of the top, allowing the weight of the hair to lay the cowlick flat rather than standing straight up.'
  ],
  productRecommendations: [
    {
      category: 'Consultation & Diagnostics Tools',
      products: [
        { name: 'Double-Sided Hand Mirror', brand: 'Barbicide', purpose: 'High-clarity, ergonomic hand mirror to show clients the back and sides of their haircut and gain absolute alignment.', usageInstructions: 'Hold behind the client’s head at a 45-degree angle reflecting into the main station mirror.' },
        { name: 'Scalp Analysis Dermatoscope', brand: 'AnMo Electronics', purpose: 'A hand-held magnifying camera to visually show clients active scalp dry patches or follicle health on a screen (premium shops).', usageInstructions: 'Gently slide over the scalp surface to capture high-definition skin details.' }
      ]
    }
  ],
  commonQuestions: [
    {
      question: 'How do I explain to my barber what I want if I do not know the technical names?',
      answer: 'Do not worry about technical jargon! The best way to communicate is by bringing 2-3 photos of styles you like, and pointing out exactly what parts you find appealing. More importantly, tell your barber what you *do not* like (e.g., "I hate when my ears look too exposed" or "I do not want my hair to look boxy"). A licensed master barber will translate your preferences into the perfect custom cut.'
    },
    {
      question: 'Why does my hair never look as good when I style it at home compared to when my barber does it?',
      answer: 'This is almost always due to styling technique and product choice. Many people dump pomade directly onto the front of their hair first, which clumps it, and they skip using a blow-dryer. During our consultation, we will demonstrate the "Back-to-Front" method—emulsifying a dime-sized amount of product completely in your palms until warm, working it into the roots at the back of your head first, and then using a blow-dryer on medium heat to guide the hair into place.'
    },
    {
      question: 'I want a style like [Celebrity], but my barber says it is not a good idea. Why?',
      answer: 'Inspiration photos are great reference points, but your face shape, skull structure, hairline, and hair texture are completely unique. If your hair is fine and straight, a style worn by a celebrity with thick, wavy hair will behave entirely differently. Your barber is managing your expectations to protect you from a high-maintenance disaster, and will instead recommend a customized version that complements your natural growth patterns and features.'
    }
  ],
  serviceMatching: [
    {
      criteria: ['first time client', 'wants new look', 'unsure what suits them', 'needs advice'],
      recommendedService: 'New Client Master Consultation & Bespoke Haircut',
      estimatedDurationMinutes: 50,
      estimatedPrice: 65,
      upsellSuggestions: ['Premium Hydrating Scalp Wash', 'Personalized Home Styling Prescription Duo']
    }
  ]
};
