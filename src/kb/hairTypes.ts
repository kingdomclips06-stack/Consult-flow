import { DomainKnowledge } from './types';

export const hairTypesKB: DomainKnowledge = {
  id: 'hair-types-and-textures',
  name: 'Hair Types & Textures',
  description: 'Comprehensive guide to hair textures from 1A pin-straight to 4C ultra-coily. Includes specialized knowledge for Afro shaping, curly hair porosity, straight hair volumizing, and 360 wave development.',
  subTypes: [
    {
      name: 'Straight Hair (Type 1A, 1B, 1C)',
      description: 'Hair with no natural curl or wave. 1A is ultra-fine and slick; 1B has more body; 1C is coarse, thick, and highly resistant to styling.',
      techniques: [
        'Over-direct hair during cutting to create long layers and prevent blunt, blocky edges.',
        'Use point-cutting at a 45-degree angle rather than blunt cuts to add movement and texture.',
        'Utilize slide-cutting on dry hair to remove interior weight without losing length.',
        'Create volume on fine 1A/1B hair using graduation cuts (tapering the weight upward).'
      ],
      suitability: ['Oval, round, and square face shapes', 'Polished, classic styles (pompadours, side parts, slick backs)']
    },
    {
      name: 'Wavy Hair (Type 2A, 2B, 2C)',
      description: 'Hair with an S-shaped pattern. 2A has loose, fine waves; 2B has more defined waves with some frizz; 2C is thick and coarse, with prominent, tight waves bordering on curls.',
      techniques: [
        'Cut hair while slightly damp, keeping in mind that wavy hair will shrink slightly once dry.',
        'Apply sea salt spray or light curl creams on damp hair and diffuse on medium heat to enhance natural wave patterns.',
        'Avoid heavy oil-based pomades which weigh down waves and make them appear greasy.',
        'Use twist-cutting on select sections to encourage the wave clumps to bond together nicely.'
      ],
      suitability: ['All face shapes', 'Messy crops, curtain cuts, surf-flow styles']
    },
    {
      name: 'Curly Hair (Type 3A, 3B, 3C)',
      description: 'Well-defined, springy curls that range from loose loops (3A) to spiral ringlets (3B) and tight corkscrews (3C). High volume and prone to extreme frizz.',
      techniques: [
        'Employ dry-cutting (cutting curls in their natural dry state) to see exactly how each curl cluster falls.',
        'NEVER use a razor on curly hair; it shreds the cuticle, causing severe frizz and split ends.',
        'Use the "slide-and-clump" technique where individual curls are trimmed where they naturally spiral.',
        'Identify hair porosity: Low porosity needs lightweight milks and heat for product absorption; high porosity requires rich butters and creams to seal moisture.'
      ],
      suitability: ['Longer, voluminous tops', 'Modern curly undercuts, curly shags', 'Oval and heart face shapes']
    },
    {
      name: 'Coily/Kinky Hair (Type 4A, 4B, 4C)',
      description: 'Extremely dense, fragile hair with tight cylindrical coils. 4A has defined S-coils; 4B has a sharp Z-pattern with angled bends; 4C is the most tightly coiled, fragile texture with minimal natural pattern definition and up to 75% shrinkage.',
      techniques: [
        'Always pick out or blow-dry coily hair on cool/medium heat before performing precision silhouette cuts (afros, high-tops).',
        'Employ the L.O.C. (Liquid, Oil, Cream) method: Hydrate with a water-based liquid, seal with natural oil, and lock in shape with cream.',
        'Use a sponge brush or twist comb on 4B/4C hair to create defined coil twists or sponge curls.',
        'Detangle hair ONLY when wet and fully saturated with conditioner, working strictly from ends to roots.'
      ],
      suitability: ['Afros, flat-tops, locs, twists, temple-faded short crops', 'Square, oblong, and oval faces']
    },
    {
      name: 'Afro Styling & Shaping',
      description: 'The art of sculpting coily hair (Type 4) into perfectly balanced rounded, squared, or tapered silhouettes. Requires an expert eye for geometry and symmetry.',
      techniques: [
        'Stand back frequently during the cut to check the silhouette outline against a neutral background.',
        'Use professional Afro shears (7.5 to 8.5 inches) for smooth, sweeping free-hand sculpting.',
        'Use the "shear-over-comb" technique, maintaining a steady comb angle to prevent divots.',
        'Advise the client to sleep with a satin bonnet or use a satin pillowcase to preserve the sculpted shape.'
      ],
      suitability: ['Type 4A, 4B, 4C hair textures', 'Oblong and round face shapes (can be sculpted to balance proportions)']
    },
    {
      name: '360 Waves',
      description: 'A classic short style for textured hair (typically Type 3 or 4) where constant brushing and compression train the hair to lay flat in concentric ripples resembling water waves.',
      techniques: [
        'Establish a consistent 8-angle brushing routine starting from the crown and radiating outward.',
        'Advise the use of three brushes: Hard brush (for moving hair from the root), Medium brush (to transition), and Soft brush (to lay down flyaways).',
        'Implement the "Wash and Style" routine: Lather hair with sulfate-free shampoo, brush in wave pattern while soapy, put on a durag, and rinse thoroughly with the durag ON to lock the waves.',
        'Apply natural beeswax or shea butter-based wave pomades sparingly to hold the compression.'
      ],
      suitability: ['Type 3C, 4A, 4B, 4C hair', 'Shorter hair lengths (typically cut with a #1.5 or #2 guard)']
    }
  ],
  professionalTechniques: [
    'Dry-Cutting (DevaCut-style): Cutting curls in their natural, dry state without stretching. This accounts for curl-specific elasticity and prevents cutting too short due to shrinkage.',
    'L.O.C. Method: A product layering technique for coily hair. First apply water/leave-in conditioner (Liquid), then a natural oil (Oil) to lock in moisture, and finally a moisturizing cream (Cream) to style.',
    'Free-hand Sculpting: Cutting hair without a comb or guard, using only shears and visual judgment. Essential for creating perfect spherical or flat-top Afro shapes.',
    'Wash and Style (Waves): Brushing hair into its wave pattern while fully saturated with shampoo lather, putting a durag on, rinsing with the durag on, and letting it dry completely before removing. This is the ultimate method to flatten and define waves.'
  ],
  productRecommendations: [
    {
      category: 'Curly & Coily Styling',
      products: [
        { name: 'Coconut & Hibiscus Enhancing Smoothie', brand: 'Shea Moisture', purpose: 'Thick styling cream that defines curls, reduces frizz, and adds heavy moisture.', usageInstructions: 'Apply to damp Type 3/4 hair in sections. Smooth from roots to ends.', hairTypes: ['3A', '3B', '3C', '4A', '4B'] },
        { name: 'As I Am Leave-In Conditioner', brand: 'As I Am', purpose: 'Water-based hydrating leave-in conditioner that serves as the perfect "L" in the LOC method.', usageInstructions: 'Apply generously to freshly washed, wet hair before styling products.', hairTypes: ['3C', '4A', '4B', '4C'] },
        { name: 'Double-Butter Cream', brand: 'As I Am', purpose: 'Ultra-rich moisturizing sealant cream containing shea and cocoa butters.', usageInstructions: 'Use as the "C" in the LOC method to lock in hydration on coily hair.', hairTypes: ['4A', '4B', '4C'] }
      ]
    },
    {
      category: 'Straight & Wavy Styling',
      products: [
        { name: 'Sea Salt Spray', brand: 'Reuzel', purpose: 'Adds gritty texture, natural volume, and light matte hold to straight and wavy hair.', usageInstructions: 'Spray onto damp hair, blow-dry while scrunching with fingers or using a diffuser.', hairTypes: ['1A', '1B', '2A', '2B'] },
        { name: 'Matte Clay', brand: 'Layrite', purpose: 'Provides strong, flexible hold with a matte finish. Great for texturizing straight hair.', usageInstructions: 'Rub a dime-sized amount between palms until warm, then work through dry hair from back to front.', hairTypes: ['1B', '1C', '2A', '2B', '2C'] }
      ]
    },
    {
      category: 'Wave Products',
      products: [
        { name: 'Premium Wave Pomade', brand: 'Wave Builder', purpose: 'Beeswax and protein-infused pomade to aid in hair compression and shine for 360 waves.', usageInstructions: 'Apply a nickel-sized amount to hands, rub together, and apply in the brushing direction after a session.', hairTypes: ['3C', '4A', '4B', '4C'] },
        { name: 'Silky Velvet Durag', brand: 'Royalty', purpose: 'Ultra-smooth interior lining compression cap to lay hair down and prevent frizz during sleep.', usageInstructions: 'Tie firmly but comfortably over hair immediately after brushing or washing.' }
      ]
    }
  ],
  commonQuestions: [
    {
      question: 'What is hair shrinkage, and how does it affect my haircut?',
      answer: 'Shrinkage is the difference between the actual length of your hair when stretched straight versus its length when coiled up naturally. For Type 4 coily hair, shrinkage can be up to 75%. This is why a master barber will either cut your hair completely dry in its natural state, or blow-dry/stretch it first to ensure we do not accidentally cut it too short.'
    },
    {
      question: 'Why does my wavy hair always look flat and greasy when I use pomade?',
      answer: 'Wavy hair (Type 2) has a looser cuticle than curly or coily hair and naturally retains more of its own scalp oils. Standard heavy pomades contain petroleum or heavy oils that overwhelm waves, flattening them out. You should switch to lightweight products like sea salt sprays for texture, or water-soluble clays and fiber pastes that provide hold and volume without the grease.'
    },
    {
      question: 'What brush should I use if I am starting to train 360 waves?',
      answer: 'You actually need a trio of brushes. Start your brushing session with a "hard" brush to pull the hair from the scalp and break any tangles. Follow up with a "medium" brush to smooth the hair fibers and transition the pattern. Finish with a "soft" brush (boar bristle) to lay down fine flyaways and distribute natural oils for maximum shine.'
    }
  ],
  serviceMatching: [
    {
      criteria: ['coily hair', 'needs shaping', 'afro look', 'wants structured silhouette'],
      recommendedService: 'Master Sculpted Afro & Crisp Outline',
      estimatedDurationMinutes: 60,
      estimatedPrice: 65,
      upsellSuggestions: ['Deep Conditioning Steam Treatment', 'Charcoal Peel-Off Face Mask']
    },
    {
      criteria: ['curly hair', 'prone to frizz', 'dry curls', 'wants curl definition'],
      recommendedService: 'Dry-Cut Curl Sculpting & Hydration Treatment',
      estimatedDurationMinutes: 55,
      estimatedPrice: 70,
      upsellSuggestions: ['Hydro-Infused Curl Steaming', 'Premium Take-Home Curl Smoothie']
    },
    {
      criteria: ['straight hair', 'flat hair', 'wants volume', 'textured crop style'],
      recommendedService: 'Precision Textured Crop & Volume Styling',
      estimatedDurationMinutes: 35,
      estimatedPrice: 40,
      upsellSuggestions: ['Scalp Detoxing Wash', 'Sea Salt Styling Texture Spray']
    }
  ]
};
