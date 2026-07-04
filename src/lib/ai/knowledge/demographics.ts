import { DomainKnowledge } from './types';

export const demographicsKB: DomainKnowledge = {
  id: 'children-and-senior-cuts',
  name: "Children's & Senior Cuts",
  description: 'Specialized techniques for children and senior clients. Focuses on physical safety, sensory comfort, scalp health, skin thinning, and efficient, master-level execution.',
  subTypes: [
    {
      name: "Children's Cut (Gentle & Fast)",
      description: 'A haircut service tailored for young children (typically ages 1-10). Prioritizes speed, distraction techniques, safety, and a comforting environment to build a lifelong positive relationship with grooming.',
      techniques: [
        'Use quiet, low-vibration clippers (like the Oster Fast Feed) to prevent sensory overload from loud buzzing.',
        'Adopt the "constant touch" technique: Keep one hand gently on the child’s head to anticipate and cushion sudden movements.',
        'Perform the haircut dry and quickly; skip the hair wash unless the child is exceptionally calm and comfortable.',
        'Use shears with rounded tips (ball-point shears) for perimeter work near the eyes and ears.',
        'Introduce clippers as a "tickle machine" on their hand first to desensitize them to the sensation.'
      ],
      suitability: ['Children ages 1 to 10', 'Sensory-sensitive clients of all ages']
    },
    {
      name: 'Senior Cut (Classic Taper / Soft Crew)',
      description: 'A classic, clean style for senior men that respects thinning hair patterns and delicate, sensitive scalp tissue. Focuses on easy maintenance and a dignified, polished look.',
      techniques: [
        'Inquire politely about blood thinners or scalp sensitivities before using trimmers or straight razors.',
        'Use soft-pressure clipper movements and ensure guards have polished, rounded tips that do not scrape the scalp.',
        'Employ graduation cutting on top to build maximum volume and density over thinning areas.',
        'Avoid heavy texturizing shears on thin hair, as this can make the hair look sparser; use precise point-cutting instead.',
        'Trim ear, eyebrow, and nose hair as a standard, complimentary part of the senior service.'
      ],
      suitability: ['Seniors with thinning hair, receding hairlines, or sensitive skin']
    }
  ],
  professionalTechniques: [
    'Sensory Adaptation: Controlling the environment (reducing clipper noise, utilizing a tablet with cartoons, offering candy or stickers) to distract child clients and minimize movement.',
    'Skin Tensioning for Seniors: Senior skin loses elasticity, making it highly susceptible to nicks. The barber must use their thumb to pull the skin flat and taut ahead of the clipper or trimmer blade.',
    'Volume-Building Graduation: Cutting hair at a 45-degree angle to create stacked weight, giving fine and thinning hair the illusion of depth, density, and thickness.',
    'Quiet Equipment Selection: Selecting pivot-motor clippers or specialized magnetic-motor clippers which run much quieter than standard high-vibration clippers.'
  ],
  productRecommendations: [
    {
      category: "Children's Comfort & Styling",
      products: [
        { name: 'Fast Feed Cordless Clipper', brand: 'Oster', purpose: 'Whisper-quiet pivot-motor clipper that performs bulk removal without a loud, scary buzz.', usageInstructions: 'Use for all children cuts, explaining the sound beforehand.' },
        { name: 'Knot Today Detangler', brand: 'Kinky-Curly', purpose: 'Organic leave-in detangler that removes knots instantly without tugging or pulling a child’s hair.', usageInstructions: 'Spray onto damp hair, comb gently with a wide-tooth comb before cutting.' }
      ]
    },
    {
      category: 'Senior Scalp & Volumizing Care',
      products: [
        { name: 'Thickening Styling Cream', brand: 'Nioxin', purpose: 'A lightweight cream that expands the diameter of individual hair strands to make thinning hair look fuller.', usageInstructions: 'Apply a pea-sized amount to damp hair, blow-dry on low heat using a soft brush.' },
        { name: 'Eczema Therapy Soothing Cream', brand: 'Aveeno', purpose: 'Oatmeal-infused lotion to soothe irritated, dry, or eczematous patches on senior scalps post-trim.', usageInstructions: 'Gently massage a small dab into dry or sensitive areas of the scalp after the haircut.' }
      ]
    }
  ],
  commonQuestions: [
    {
      question: 'What age should my child start getting haircuts at a barber shop?',
      answer: 'Most children are ready for their first professional haircut between 1 and 2 years old, once their hair begins growing over their eyes or ears. We recommend bringing your child along to one of your own haircut appointments beforehand so they can get used to the sounds, sights, and friendly atmosphere of the shop without any pressure.'
    },
    {
      question: 'My child has a hard time sitting still. How do you handle that?',
      answer: 'We are fully prepared for wiggly clients! Our master barbers utilize quiet clippers and specialized "constant touch" techniques to anticipate sudden movements. We also have mounted tablets for cartoons, interactive toys, and we work quickly and efficiently. We focus on completing the front and sides of the haircut first so that even if they lose patience, the most visible parts of the cut look great.'
    },
    {
      question: 'Why does my hair look so much thinner now that I am older, and what is the best cut?',
      answer: 'As we age, hair follicles naturally shrink, producing finer, lighter, and sparser hair. Heavy gels and styling products can clump these fine hairs together, exposing the scalp. The best solution is a classic, short tapered cut or a soft crew cut. We use a technique called "graduation" to stack the hair fibers on top of each other, creating the appearance of maximum volume and fullness, which we pair with lightweight, thickening creams.'
    }
  ],
  serviceMatching: [
    {
      criteria: ['young child', 'first haircut', 'scared', 'quick cut'],
      recommendedService: "Gentle First-Haircut Experience & Certificate",
      estimatedDurationMinutes: 25,
      estimatedPrice: 30,
      upsellSuggestions: ['Soothing Detangling Mist', 'Lollipop & Keepsake Lock Bag']
    },
    {
      criteria: ['senior man', 'thinning hair', 'sensitive scalp', 'needs ear nose brow trim'],
      recommendedService: 'Classic Senior Taper & Grooming Detail',
      estimatedDurationMinutes: 30,
      estimatedPrice: 35,
      upsellSuggestions: ['Scalp-Hydrating Massage Wash', 'Take-home Nioxin Thickening Cream']
    }
  ]
};
