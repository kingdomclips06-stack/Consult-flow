import { DomainKnowledge } from './types';

export const schedulesAndProductsKB: DomainKnowledge = {
  id: 'maintenance-schedules-and-products',
  name: 'Schedules & Products',
  description: 'Master barber guide to styling products and professional maintenance schedules. Establishes standard prescription plans based on haircut type, hair density, and lifestyle to ensure clients look great year-round.',
  subTypes: [
    {
      name: 'High-Maintenance Schedule (2-Week Cycle)',
      description: 'The golden rule for maintaining crisp, sharp, high-contrast styles. Best for cuts that rely heavily on sharp edges and bald skin gradients.',
      techniques: [
        'Recommend this cycle for any style featuring a Skin Fade, Bald Taper, Razor Line-up, or 360 Waves.',
        'Educate the client during their first service on how rapidly skin-level hair grows back (approximately 0.5 inches per month).',
        'Book the follow-up appointment before the client leaves the shop to guarantee their slot.',
        'Offer a "clean-up" or "touch-up" service (taper and neck trim only) at a lower price point between major haircuts.'
      ],
      suitability: ['Skin Fades, High Tapers, Buzz Cuts with Line-ups, 360 Waves', 'Clients with active, high-visibility professional or social roles']
    },
    {
      name: 'Standard-Maintenance Schedule (4-Week Cycle)',
      description: 'The highly balanced sweet spot for most classic and modern hairstyles. Allows the hair to grow naturally while maintaining overall structure and style.',
      techniques: [
        'Prescribe this cycle for Mid/Low Shadow Fades, Textured Crops, short Pompadours, and corporate scissor cuts.',
        'Advise the client to use lightweight pomades and round-brushing as the cut grows out to adapt and handle the increased bulk.',
        'Refine the hairline during the appointment in a way that allows a clean, natural grow-out.'
      ],
      suitability: ['Classic side-parts, standard faded crops, short executive cuts']
    },
    {
      name: 'Low-Maintenance Schedule (6+ Week Cycle)',
      description: 'Designed for longer, flowing, scissor-cut styles where the hair is meant to grow with soft, natural layers.',
      techniques: [
        'Use point-cutting and texturizing shears extensively during the cut to create soft, feathered ends that grow out seamlessly without bulk-clumping.',
        'Prescribe daily hydrating hair creams and light sea salt sprays rather than heavy hold products.',
        'Instruct the client to wash their hair with sulfate-free shampoos to maintain natural hair elasticity over long periods.'
      ],
      suitability: ['Curtain cuts, surf flow, longer layered shear cuts, shag styles']
    }
  ],
  professionalTechniques: [
    'Pre-Booking Scripts: Standardized client conversation loops used by barbers to secure the next appointment before the client exits the shop, reducing booking friction and maximizing seat occupancy.',
    'Product Cocktailing: Mixing two or more styling products together (e.g., combining a lightweight leave-in cream with a strong-hold matte clay) to create a custom product customized to the client’s unique hair texture and hold needs.',
    'Slight Growth Compensation: Adjusting the cutting length slightly shorter than requested when a client indicates they can only visit every 5-6 weeks, allowing the cut to "grow into" the perfect length by week three.'
  ],
  productRecommendations: [
    {
      category: 'Water-Soluble Pomades (High Shine & Hold)',
      products: [
        { name: 'Original Hold Pomade', brand: 'Layrite', purpose: 'A clean, water-soluble pomade that provides medium-strong hold with high shine. Perfect for classic side-parts, pompadours, and slick-backs.', usageInstructions: 'Rub between palms and apply to damp hair for high shine, or dry hair for more matte hold.', hairTypes: ['1A', '1B', '1C', '2A', '2B'] },
        { name: 'Fiber Grease', brand: 'Cool Grease', purpose: 'A highly flexible Japanese pomade that offers a wet look with medium hold. Excellent for texturizing wavy hair without stiffness.', usageInstructions: 'Apply to damp hair and style with a comb. Re-stylable with a damp comb.' }
      ]
    },
    {
      category: 'Clays, Pastes & Waxes (Matte & Textured)',
      products: [
        { name: 'Matte Clay', brand: 'Reuzel', purpose: 'A sweat-resistant, flexible matte clay that adds gritty texture and high volume to messy, modern styles.', usageInstructions: 'Warm a small dab between palms until transparent, work from roots to tips on completely dry hair.', hairTypes: ['1B', '1C', '2A', '2B', '2C', '3A'] },
        { name: 'Premium Clay Pomade', brand: 'Baxter of California', purpose: 'A thick, beeswax-infused clay pomade providing maximum hold with a natural matte finish.', usageInstructions: 'Best applied in small increments to dry hair to build custom hold and definition.' }
      ]
    },
    {
      category: 'Creams & Leave-In Moisturisers',
      products: [
        { name: 'Forming Cream', brand: 'American Crew', purpose: 'An easy-to-use cream that provides medium hold, natural shine, and body to fine hair, making styling effortless.', usageInstructions: 'Work a small amount evenly through damp or dry hair and blow-dry to style.', hairTypes: ['1A', '1B', '2A'] },
        { name: 'Beard and Hair Leave-In Moisturizer', brand: 'Johnny Slicks', purpose: 'An organic, oil-infused conditioning cream that softens coarse, curly, and coily hair while adding natural luster.', usageInstructions: 'Apply daily to clean, damp hair and distribute evenly with a wide-tooth comb.' }
      ]
    }
  ],
  commonQuestions: [
    {
      question: 'How often should I realistically get a haircut to keep it looking perfect?',
      answer: 'Your ideal haircut frequency depends entirely on your specific hairstyle. If you have a skin fade, bald taper, or sharp line-up, you need a high-maintenance schedule of every 2 weeks to keep those lines clean. If you wear a classic executive cut, textured crop, or standard fade, a 4-week cycle is the absolute sweet spot. For longer, flowy scissor-only cuts, you can comfortably wait 6 to 8 weeks, as they grow out into soft, natural layers.'
    },
    {
      question: 'What is the difference between pomade, clay, and wax? Which one do I need?',
      answer: 'It boils down to shine and texture. Pomades are smooth, water-soluble, and offer high shine with a neat, combed look—ideal for slick-backs and classic parts. Clays are dry, contain natural clay minerals, and provide a matte, no-shine finish with lots of gritty texture and volume—perfect for messy, textured crop styles. Waxes are thicker and offer a medium shine with high pliability, allowing you to restyle your hair throughout the day.'
    },
    {
      question: 'Should I apply styling products to wet, damp, or dry hair?',
      answer: 'As a general rule, damp hair is best for products that require high shine and a slick look (like pomades and styling creams), as water helps distribute the product evenly and seals in moisture. Dry hair is the golden rule for matte-finish products (like clays, pastes, and volume powders), as moisture will clump these products together, making your hair look greasy instead of textured and voluminous.'
    }
  ],
  serviceMatching: [
    {
      criteria: ['low maintenance style', 'long hair', 'wants styling education'],
      recommendedService: 'Master Scissor-Cut & Product Styling Tutorial',
      estimatedDurationMinutes: 50,
      estimatedPrice: 55,
      upsellSuggestions: ['Sulfate-free Hydrating Shampoo & Conditioner Trio', 'Post-Wash Nourishing Hair Cream']
    },
    {
      criteria: ['wants skin fade', 'frequent cuts', 'busy schedule', 'sharp look'],
      recommendedService: 'Bi-Weekly Express Skin Fade Maintenance',
      estimatedDurationMinutes: 30,
      estimatedPrice: 40,
      upsellSuggestions: ['Pre-booked Monthly Package Plan', 'Premium Hair Styling Clay']
    }
  ]
};
