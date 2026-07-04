import { DomainKnowledge } from './types';

export const fadesAndTapersKB: DomainKnowledge = {
  id: 'fades-and-tapers',
  name: 'Fades & Tapers',
  description: 'Precision clipper blending, transitions, and hairline tapering. Covers everything from conservative shadow tapers to bold skin and burst fades, executed with master-level clipper techniques.',
  subTypes: [
    {
      name: 'Low Fade',
      description: 'A conservative, sophisticated blend that starts extremely low, typically within half an inch to an inch above the hairline and ears, preserving maximum density and bulk on the sides.',
      techniques: [
        'Establish the initial baseline no higher than 0.5 inches above the ear.',
        'Use lever play (open/half/closed) with the guardless clipper to blend the transition from skin to a #1 guard.',
        'Utilize a soft C-stroke pulling outward to avoid creating hard lines near the parietal ridge.',
        'Blend the transition into bulk using clipper-over-comb with a medium cutting comb.'
      ],
      suitability: ['Oval face shapes', 'Conservative/professional environments', 'Thicker hair types where side density is desired']
    },
    {
      name: 'Mid Fade',
      description: 'The industry standard and most versatile fade. The blend begins at the temples or midway between the ear and the parietal ridge, offering a perfect balance of contrast and shadow.',
      techniques: [
        'Set the primary weight line or guideline starting at the temple peak, wrapping straight back around the head.',
        'Use the #1.5 and #1 guards to transition between the lower skin area and the bulk of the crown.',
        'Detail the transition zone using the corner of the clipper blade to eliminate dark spots (point-cutting with clippers).',
        'Soften the temporal hairline with detail trimmers for a crisp edge.'
      ],
      suitability: ['Round face shapes (adds length/verticality)', 'Square face shapes', 'All hair textures (1A to 4C)']
    },
    {
      name: 'High Fade',
      description: 'A high-contrast, high-impact fade where the blend starts high up on the head, near the parietal ridge or temporal crest, leaving maximum skin exposed on the sides.',
      techniques: [
        'Set the bald guideline high, in line with the recession line of the forehead, curving slightly down toward the upper occipital.',
        'Rapidly transition from skin to #1, #2, and #3 guards using aggressive clipper lever adjustment.',
        'Keep clipper flat against the vertical bone structure to avoid rounding the head shape.',
        'Dry the top hair and blend the upper transition zone with thinning shears (28-tooth) to soften the high weight line.'
      ],
      suitability: ['Round, oblong, and square face shapes', 'Athletes and low-maintenance lifestyles', 'Coarse or extremely curly hair']
    },
    {
      name: 'Skin Fade (Bald Fade)',
      description: 'An ultra-clean style where the hair is faded entirely down to the bare skin. Requires shaving the lowest section of the scalp with a foil shaver or straight razor.',
      techniques: [
        'Establish the zero line with a professional trimmer, then clear out the lower section completely.',
        'Use a dual-foil shaver from bottom upward, stopping 1/4 inch below the trimmer line to prevent a harsh line.',
        'Flick the foil shaver outward at the transition line to pre-blend.',
        'Use a master lever-lock clipper, starting closed, then opening it gradually (lever play) to bridge the gap between foil and guard clippers.'
      ],
      suitability: ['Clients seeking maximum sharpness', 'Hot climates', 'Darker hair colors where contrast is highly pronounced']
    },
    {
      name: 'Burst Fade',
      description: 'A unique fade that curves or "bursts" around the ear, leaving the hair in the back (occipital/nape) long. Frequently paired with mohawks, faux hawks, or modern mullet styles.',
      techniques: [
        'Draw a semi-circular guide around the ear, maintaining a radius of 1.5 to 2 inches.',
        'Keep the nape area and crown area completely out of the fade zone by sectioning with duckbill clips.',
        'Fade within the semi-circle from skin/trimmer up to the desired top length.',
        'Soften the outer boundaries of the "burst" so it transitions seamlessly into the back bulk.'
      ],
      suitability: ['Faux hawks and mohawks', 'Textured and coily hair types (3A-4C)', 'Expressive and trendy clients']
    },
    {
      name: 'Drop Fade',
      description: 'A beautiful variation where the fade line follows the natural curvature of the skull, "dropping" significantly behind the ear to preserve dark hair depth on the occipital bone.',
      techniques: [
        'Begin the guideline high or mid at the temples, then arc it downward behind the ear, dropping 1 to 1.5 inches lower at the nape.',
        'Execute a detailed fade along this curved plane, requiring constant angle adjustment of the clipper.',
        'Ensure the transition at the back of the head maintains a smooth shadow gradient to complement the skull contour.'
      ],
      suitability: ['Clients with flat occipital bones (adds shape)', 'Diamond and heart-shaped faces', 'Textured curly hair']
    },
    {
      name: 'Temple Fade (Temp Fade / Brooklyn Fade)',
      description: 'A highly localized, classic fade that targets only the temples/sideburns and the lower neckline, leaving the rest of the hairline intact.',
      techniques: [
        'Isolate the temple area and the nape area as two distinct small canvases.',
        'Fade out the sideburn and temple up to a #1 or #2 guard over a short 1-inch span.',
        'Clean up the ear arch and vertical bars with a trimmer, keeping them razor-sharp.',
        'Fade the nape hairline upward about 1.5 inches, leaving a crisp neck line above it.'
      ],
      suitability: ['Buzz cuts, high-top afros, and twists', 'Clients who want a clean look but wish to retain their hairline', 'All face shapes']
    },
    {
      name: 'Shadow Fade',
      description: 'A soft, subtle fade that never goes down to the skin. The shortest length is typically a #0.5 (1/16") or #1 (1/8") guard, leaving a light stubble "shadow" at the baseline.',
      techniques: [
        'Do not use trimmers or foil shavers on the sides.',
        'Start with a #0.5 guard closed or #1 guard closed at the bottom hairline.',
        'Blend upward with systematic guard progression (#1, #1.5, #2).',
        'Ideal for sensitive scalps prone to razor bumps or ingrown hairs.'
      ],
      suitability: ['Sensitive skin / prone to pseudofolliculitis barbae', 'Conservative professionals', 'Fair or light-colored hair']
    },
    {
      name: 'Low Taper',
      description: 'Fades only the bottom-most edges of the sideburns and the lowest millimeter of the neckline, keeping the hairline sharp, dark, and natural.',
      techniques: [
        'Use a detail trimmer to taper the bottom 1/4 inch of the sideburns.',
        'Taper the lower hairline at the neck, staying below the ear lobe line.',
        'Edge the neck and behind the ears with extreme precision using a straight razor finish.'
      ],
      suitability: ['Longer styles, flow, and crop cuts', 'Clients wanting a clean-up between major haircuts', 'Classic gentleman cuts']
    },
    {
      name: 'Mid Taper',
      description: 'A balanced taper that blends about 1 inch up the temple and neck, offering a visible gradient while preserving the dark silhouette of the hairstyle.',
      techniques: [
        'Set taper line at the top of the ear lobe for the neck, and mid-temple for the sides.',
        'Perform taper blending using guardless lever play, transitioning into #1 and #2 guards.',
        'Clean the ear arch outline, leaving it crisp and defined.'
      ],
      suitability: ['Mid-length styles', 'Curled or waved hair', 'Most face shapes']
    },
    {
      name: 'High Taper',
      description: 'Fades further up the temple (above the eye line) and up the neck (2+ inches), creating high contrast while maintaining bulk on the sides of the head.',
      techniques: [
        'Fade sideburns and temples all the way up past the eyebrow line, merging into the top length.',
        'Taper the neck upward, blending into the occipital area.',
        'Ensure the vertical line behind the ear is perfectly crisp to frame the high taper.'
      ],
      suitability: ['Volume-heavy tops, blowouts, and pompadours', 'Coarse hair/Afros', 'Active lifestyles']
    }
  ],
  professionalTechniques: [
    'Lever Play: Manipulating the clipper lever (closed, half-open, fully open) to adjust cutting length dynamically without changing guards. Essential for removing stubborn blend lines.',
    'C-Stroke: A sweeping, outward flicking motion of the wrist when using clippers. This prevents the blades from digging into the scalp and creating harsh weight lines.',
    'Corner Cutting: Utilizing only the outer 3-4 teeth of the clipper blade to target specific dark spots and inconsistencies in the fade shadow.',
    'Clipper-Over-Comb: A master technique where a comb holds the hair out at a specific angle and the clipper cuts across it, enabling flawless blending between short faded sides and long tops.'
  ],
  productRecommendations: [
    {
      category: 'Clippers & Trimmers',
      products: [
        { name: 'Cordless Senior', brand: 'Wahl', purpose: 'Primary bulk removal and precision fading clipper with high-torque motor.', usageInstructions: 'Use for bulk fading and main gradient transitions.' },
        { name: 'Gold FX Trimmer', brand: 'BaBylissPRO', purpose: 'High-visibility detail outline trimmer for razor-sharp lines and setting bald guidelines.', usageInstructions: 'Use for outlining, detailing, and initial guidelines.' },
        { name: 'Pro Foil Shaver', brand: 'Andis', purpose: 'Dual-foil hypoallergenic shaver to clean down to smooth skin for bald/skin fades.', usageInstructions: 'Use at the very bottom of skin fades, flicking out near the transition.' }
      ]
    },
    {
      category: 'Scalp & Styling Post-Fade',
      products: [
        { name: 'Tea Tree Hair and Scalp Treatment', brand: 'Paul Mitchell', purpose: 'Soothes the scalp after intensive clipper work, preventing redness and itchiness.', usageInstructions: 'Apply a dime-sized amount to the faded area immediately post-service.' },
        { name: 'Bump Patrol Extra Strength', brand: 'Bump Patrol', purpose: 'Prevents razor bumps and ingrown hairs on sensitive skin post-skin fade.', usageInstructions: 'Apply gently to neck and sideburn areas after razor line-ups.' }
      ]
    }
  ],
  commonQuestions: [
    {
      question: 'What is the difference between a fade and a taper?',
      answer: 'A fade blends the hair continuously all the way around the sides and back of the head, exposing skin or short hair consistently. A taper is much more localized; it only fades the hair at two specific points—the sideburns/temples and the very bottom nape of the neck—leaving the rest of the hairline around the ears dark and intact.'
    },
    {
      question: 'How often do I need to get a skin fade cut to keep it looking fresh?',
      answer: 'Because a skin fade goes completely down to the scalp, it shows growth quickly. To maintain that crisp, high-contrast look, you should visit your barber every 1.5 to 2 weeks. If you prefer a slightly grown-in look, you can stretch it to 3 weeks.'
    },
    {
      question: 'Will a skin fade cause razor bumps on my neck?',
      answer: 'If you have curly or coarse hair and sensitive skin, close shaving can sometimes lead to razor bumps. To prevent this, we can perform a "Shadow Fade" instead of going completely to skin, or we can use a hypoallergenic foil shaver and apply specialized tea tree or salicylic post-shave treatments to protect your follicles.'
    }
  ],
  serviceMatching: [
    {
      criteria: ['wants high contrast', 'likes ultra clean look', 'prefers low maintenance sides', 'regular maintenance schedule'],
      recommendedService: 'Master Skin Fade & Styled Top',
      estimatedDurationMinutes: 45,
      estimatedPrice: 55,
      upsellSuggestions: ['Hot Towel Shave Refresh', 'Exfoliating Scalp Treatment']
    },
    {
      criteria: ['professional job', 'conservative look', 'thicker hair sideburns', 'soft blend'],
      recommendedService: 'Classic Mid/Low Fade and Shear Cut',
      estimatedDurationMinutes: 40,
      estimatedPrice: 45,
      upsellSuggestions: ['Beard Trim & Detail Line-up', 'Premium Hair Wash & Styling Pomade']
    },
    {
      criteria: ['wants mohawk or mullet', 'modern trendy style', 'textured top'],
      recommendedService: 'Burst Fade / Faux Hawk Special',
      estimatedDurationMinutes: 50,
      estimatedPrice: 60,
      upsellSuggestions: ['Texture Powder Volume Enhancer', 'Hair Design Line']
    }
  ]
};
