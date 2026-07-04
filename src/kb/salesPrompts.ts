import { SalesAssistantKB } from './types';

export const salesPromptsKB: SalesAssistantKB = {
  trustBuildingPatterns: [
    {
      name: 'Active Listening & Mirroring',
      context: 'When a customer describes a vague styling frustration, such as "my hair just always looks messy and flat."',
      customerVibe: 'Frustrated, unsure, seeking professional help.',
      exampleScript: "I hear you. When hair sits flat like that, it's usually because the interior weight is pulling it down, which smothers your natural volume. Let's look at doing a textured point-cut on top to remove that heavy bulk. This gives the hair fibers breathing room to stand up and create a natural, effortless texture. How does that sound?",
      psychologicalTrigger: 'Validation and Authority. Mirroring their pain point and immediately providing a clear, structural explanation builds massive trust and positions you as the expert doctor of hair.'
    },
    {
      name: 'Collaborative Goal-Setting',
      context: 'For clients who are hesitant to try a shorter style or a new fade level.',
      customerVibe: 'Apprehensive, cautious, change-resistant.',
      exampleScript: "Let's take a collaborative approach. Instead of jumping straight into a high skin fade, what if we start with a soft low shadow fade today? This keeps plenty of density near your temples so you don't feel too exposed, but still gives you that clean, crisp hairline. We can always go tighter on your next visit once you see how much you love it. Let's take it step-by-step.",
      psychologicalTrigger: 'Risk Mitigation. By offering a low-risk, incremental step, you remove booking friction and make the customer feel safe and in complete control of their image.'
    }
  ],
  educationScripts: [
    {
      name: 'Natural Hair Science explanation',
      context: 'Explaining hair porosity to a client who complains about their curls being dry and frizzy.',
      customerVibe: 'Confused by products, seeking real solutions.',
      exampleScript: "The reason your curls are feeling dry isn't your fault—it's actually hair science. Curly hair has a highly raised cuticle, meaning moisture escapes very easily. This is called high porosity. Regular gel just sits on the surface and dries it out more. What your curls are craving is a water-based leave-in conditioner applied while wet to hydrate the core, sealed with a rich shea-butter cream to lock that moisture in. It makes a night-and-day difference in curl bounce and shine.",
      psychologicalTrigger: 'Education-First Selling. By teaching the underlying science of their hair, you make product recommendations feel like health prescriptions rather than forced sales pitches.'
    },
    {
      name: 'Technique demystification',
      context: 'Explaining why you are using a straight razor instead of clippers for their beard line-up.',
      customerVibe: 'Curious, appreciative of premium details.',
      exampleScript: "I'm going to finish your beard line with a traditional straight razor. Standard trimmers cut hair flat, but they can leave microscopic split ends on facial hair, which leads to itchiness and ingrown hairs as it grows back. A razor slice cuts the hair follicle at a perfect angle. It takes a bit more time and master-level precision, but it guarantees your skin stays smooth and your lines stay laser-sharp for twice as long.",
      psychologicalTrigger: 'Value Justification. Explaining the difficulty and premium nature of your technique increases the client’s perceived value of the service, justifying premium ticket prices.'
    }
  ],
  upsellRecommendationLogic: [
    {
      serviceTrigger: 'Classic Haircut',
      customerConcern: 'Dry scalp, flaky residue, or general stress.',
      recommendedAddOn: 'Scalp Exfoliating & Tea Tree Hydro-Steam Treatment',
      script: "Since we're doing a fresh fade today, I highly recommend adding our Scalp Exfoliating & Tea Tree Hydro-Steam Treatment. We use a warm botanical steam to open your follicles, apply a charcoal exfoliating scrub to clear out dry skin and product build-up, and finish with a cold-refresh tea tree rinse. It feels incredible, stops any scalp itching, and gives us a perfectly clean canvas. We can easily add it to your service today—it only takes an extra 10 minutes."
    },
    {
      serviceTrigger: 'Classic Haircut',
      customerConcern: 'Patchy, dry, or unkempt facial hair.',
      recommendedAddOn: 'Master Beard Sculpting & Straight Razor Detailing',
      script: "To completely pull this fresh look together, I'd recommend upgrading to our Master Beard Sculpting. Your beard is growing in great, but the cheek lines are sitting slightly low, which pulls your jawline downward. I can sculpt the bulk into a clean, squared silhouette to elongate your face, and detail the lines with a hot towel straight razor shave. It frames your face perfectly and pairs beautifully with the new fade we're doing."
    }
  ],
  noShowPrevention: [
    {
      stage: 'booking_confirmation',
      prompt: "Excellent choice! I've provisionally locked in your appointment for [Time] on [Date]. Because our master barbers work strictly on a dedicated, one-on-one basis to ensure undivided attention, we limit our daily slots. To finalize your booking and secure your seat, please click the link below to confirm. We can't wait to get you looking sharp!",
      reasoning: 'Creates gentle urgency, highlights the premium one-on-one nature of the service, and secures an explicit commitment from the client.'
    },
    {
      stage: 'commitment_reaffirmation',
      prompt: "Hi [Name]! Your master barber, [BarberName], has prepared your personalized service station and selected the organic styling products for your hair type tomorrow at [Time]. We value your time immensely and guarantee we will start exactly on the dot. To confirm you are still set to join us and keep your reservation active, reply 'YES' to this message. See you tomorrow!",
      reasoning: "Utilizes the reciprocity principle by highlighting the preparation work the barber has already done, and reaffirms the mutual value of time, drastically reducing last-minute no-shows."
    }
  ],
  membershipRecurringPrompts: [
    {
      trigger: 'After a client expresses high satisfaction with a fresh skin fade or sharp taper.',
      offerDetails: 'ConsultFlow VIP Membership (Unlimited skin fades & trims for $89/month).',
      script: "I'm so glad you love how crisp this skin fade turned out! Since skin fades look their absolute best during the first 14 days, keeping it fresh requires regular maintenance. Have you looked at our VIP Membership? It's just $89 a month and covers unlimited fades and line-ups. If you come in every two weeks to keep this looking sharp, the membership pays for itself by your second visit, plus you get priority booking. Would you like me to get that set up for you today?"
    },
    {
      trigger: 'Post-service wrap up for a client who noted they have a very busy, unpredictable schedule.',
      offerDetails: 'Pre-booked 4-Week Auto-Scheduler.',
      script: "We got your hair styled perfectly today! Since our chairs fill up about 3 weeks in advance, the easiest way to make sure your hair never loses this shape is to put you on our 4-week auto-scheduler. I can lock in this exact same day and time for you every month. You don't have to worry about finding an open slot, you receive an automated reminder, and you can reschedule with one click if your calendar shifts. Shall we secure your slot for next month?"
    }
  ],
  giftCardSuggestions: [
    {
      trigger: 'During holiday seasons, father’s day, or when a client mentions a friend’s upcoming wedding or birthday.',
      script: "Speaking of your brother's birthday coming up, have you thought about gifting him a ConsultFlow Experience? We offer digital gift cards for our Signature Royal Treatment—which includes a master haircut, hot towel shave, and scalp steam. It's more than just a haircut, it's a premium 60-minute relaxation session. I can text a beautifully designed digital gift voucher directly to his phone with a custom note from you. Would you like to add that to your tab today?"
    }
  ],
  averageTicketValueOptimizationTips: [
    'Always recommend a retail styling product that was physically used and demonstrated during the service. Say: "I used our Matte Clay today to build that texture on top. I have a fresh jar right here—shall I add it to your ticket today so you can replicate this look easily at home?"',
    'Introduce add-on services as a sensory experience, not a labor fee. Use terms like "Hot Towel Steam Refresh" or "Ice-Cold Menthol Rinse" rather than "hair wash" or "scalp clean."',
    'Position upsells as a natural completion of the primary service. E.g., "A crisp fade looks best when the eyebrows are trimmed and neat. I can tidy those up in 2 minutes for you to complete the framing."'
  ]
};
