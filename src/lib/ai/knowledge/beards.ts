import { DomainKnowledge } from './types';

export const beardsKB: DomainKnowledge = {
  id: 'beards-and-facial-hair',
  name: 'Beards & Facial Hair',
  description: 'Master guide to facial hair architecture, detailing, and care. Covers beard sculpting, precision razor lining, and advanced grooming routines featuring beard oils, balms, and washes.',
  subTypes: [
    {
      name: 'Corporate Beard',
      description: 'A clean, closely trimmed, full facial hair style that is highly groomed and professional. Usually kept between 1/4 inch to 1/2 inch in length, with immaculate neck and cheek lines.',
      techniques: [
        'Trim the bulk uniformly with a clipper using a #2 or #3 guard, cutting against the grain.',
        'Slightly taper the sideburns where they meet the temple hair using a #1 and #1.5 guard.',
        'Use the clipper-over-comb technique to smooth down flyaways along the jawline.',
        'Line the cheeks with a clear shaving gel to allow full visibility of the natural skin line.'
      ],
      suitability: ['Oval, round, and heart-shaped faces', 'Corporate/professional environments']
    },
    {
      name: 'Full Beard (Sculpted / Boxed)',
      description: 'A dense, long beard sculpted into a distinct geometric shape (usually square or tapered) to modify or enhance the client’s jawline and facial structure.',
      techniques: [
        'Establish a solid, flat base at the bottom of the beard using a free-hand clipper technique with the client looking straight ahead.',
        'Sculpt the vertical side profiles to create a strong, masculine jaw angle, blending into the sideburns.',
        'Use thinning shears internally to remove excessive density under the chin while retaining the outer silhouette.',
        'Apply a blow-dryer on medium heat with a round boar-bristle brush to straighten and elongate the beard hairs before final detailing.'
      ],
      suitability: ['Round and weak jawlines (adds length and structure)', 'Oblong faces (by keeping the sides fuller)']
    },
    {
      name: 'Designer Stubble',
      description: 'A rugged but highly intentional look. The hair is kept extremely short—typically between 1mm and 4mm—but the boundaries (neck and cheeks) are kept clean and sharp.',
      techniques: [
        'Use a stubble trimmer or a clipper with a open-blade to #0.5 guard to trim facial hair.',
        'Shave the neck entirely up to 1 finger above the Adam’s apple to establish a crisp stubble border.',
        'Faintly soften the cheek boundary with a trimmer so it fades naturally into the upper cheek rather than a blunt line.'
      ],
      suitability: ['Highly versatile, suits almost all face shapes', 'Clients who dislike the itch of longer beards']
    },
    {
      name: 'Goatee (Classic or Extended)',
      description: 'Facial hair isolated to the chin and mustache, sometimes connected. An "Extended Goatee" (or Hollywoodian) runs slightly along the jawline but leaves the cheeks bare.',
      techniques: [
        'Symmetrically map the vertical boundary lines from the outer corners of the mouth down to the jaw.',
        'Shave the cheeks and sideburns completely smooth using a straight razor.',
        'Ensure the connector hairs between the mustache and chin beard are of uniform density.'
      ],
      suitability: ['Round face shapes (creates vertical focus)', 'Clients with patchy sideburn growth']
    },
    {
      name: 'Beard Stache',
      description: 'A highly fashionable style where the mustache is kept long, thick, and full (e.g., Chevron or Handlebar), while the surrounding beard is kept to a short stubble length.',
      techniques: [
        'Trim the entire beard area down to a 2mm to 3mm stubble.',
        'Section the mustache away and let it grow long, trimming only the lip-line with shears.',
        'Use mustache wax to style the ends slightly outward, keeping the middle bulk thick.'
      ],
      suitability: ['Strong jawlines', 'Expressive, modern clients with dense mustache growth']
    }
  ],
  professionalTechniques: [
    'Neckline Mapping (The 2-Finger Rule): Placing two fingers above the Adam’s apple (thyroid cartilage) and marking that as the lowest point. Cut a smooth, curved line from this point upward behind the jawbone to the back of the ear lobes. Shaving along the jawline itself is avoided as it creates the illusion of a double chin.',
    'Razor Lining: Using a traditional straight razor with a disposable blade. Pull the skin taut in the opposite direction of the stroke, holding the razor at a 30 to 45-degree angle to shave clean cheek and neck lines without irritation.',
    'Free-hand Beard Sculpting: Using a clipper without guards over a comb to shear off flyaways and shape the external silhouette of a full beard into a perfect geometric boxed or tapered form.',
    'Beard Blowout: Straightening curly beard hair using a blow-dryer on low heat and a small round boar-bristle brush to reveal true length and density before trimming.'
  ],
  productRecommendations: [
    {
      category: 'Beard Grooming & Conditioning',
      products: [
        { name: 'Classic Beard Oil', brand: 'Beardbrand', purpose: 'Lightweight oil that hydrates the skin beneath the beard, preventing flaking and itchiness.', usageInstructions: 'Rub 3-5 drops between palms and massage deeply into the skin under a damp beard.' },
        { name: 'Shea Butter Beard Balm', brand: 'Honest Amish', purpose: 'Thick conditioning paste containing beeswax and shea butter to condition coarse hairs and tame wild flyaways.', usageInstructions: 'Scrape a pea-sized amount, warm between fingers until melted, and smooth over the beard surface.' },
        { name: 'Sulfate-Free Beard Wash', brand: 'Grave Before Shave', purpose: 'A gentle facial wash that cleanses thick beard hair without stripping the delicate facial sebum.', usageInstructions: 'Use in the shower 2-3 times a week. Massage thoroughly into the lather and rinse.' }
      ]
    },
    {
      category: 'Razor & Shaving Supplies',
      products: [
        { name: 'Clear Shaving Gel', brand: 'Elegance', purpose: 'A non-foaming, completely transparent gel that facilitates smooth razor glide while allowing full visibility of lines.', usageInstructions: 'Apply a thin layer to cheeks and neck before straight razor line-ups.' },
        { name: 'Aftershave Cooling Lotion', brand: 'Clubman Pinaud', purpose: 'Soothes freshly razor-shaved skin, closing pores and leaving a classic masculine scent.', usageInstructions: 'Splash or pat onto shaved areas of the neck and cheeks immediately after shaving.' }
      ]
    }
  ],
  commonQuestions: [
    {
      question: 'Where should my beard neckline be? Should I cut it along my jawline?',
      answer: 'Absolutely not! Shaving along the jawline is one of the most common grooming mistakes. It makes the beard look too small for your face and creates the illusion of a double chin. Your neckline should sit about two fingers above your Adam’s apple. From there, it should curve smoothly up behind the jawbone toward your earlobes, framing your throat naturally.'
    },
    {
      question: 'What is the difference between beard oil and beard balm? Do I need both?',
      answer: 'Beard oil is primarily for your skin. It hydrates the hair follicles and the dry skin beneath your beard, stopping "beardruff" (dandruff) and itchiness. Beard balm is thicker, containing beeswax and butters, and is designed for the hair itself. It provides hold to style flyaways and locks in moisture. If you have a short beard, oil is enough. If you have a medium to long beard, using both (oil first on the skin, then balm on the surface) is ideal.'
    },
    {
      question: 'How do I stop my beard from feeling itchy and dry?',
      answer: 'Beard itch is usually caused by dry skin underneath and coarse hair curling back. To fix this, stop washing your face with harsh bar soaps or regular scalp shampoos—they strip away your natural facial oils. Use a specialized, sulfate-free beard wash 2-3 times a week, and apply high-quality beard oil daily to the skin while it is slightly damp after washing.'
    }
  ],
  serviceMatching: [
    {
      criteria: ['full beard', 'wants sharp lines', 'needs shaping', 'grooming styling advice'],
      recommendedService: 'Master Beard Sculpting & Straight Razor Line-up',
      estimatedDurationMinutes: 30,
      estimatedPrice: 35,
      upsellSuggestions: ['Hot Towel Aromatherapy Treatment', 'Beard Conditioning Steam Treatment']
    },
    {
      criteria: ['stubble look', 'rough skin', 'wants clean lines'],
      recommendedService: 'Premium Beard Trim & Cheek Line-up',
      estimatedDurationMinutes: 20,
      estimatedPrice: 25,
      upsellSuggestions: ['Post-Shave Exfoliating Face Scrub', 'Hydrating Skin Moisturizer']
    }
  ]
};
