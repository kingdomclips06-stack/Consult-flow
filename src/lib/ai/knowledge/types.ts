export interface SubType {
  name: string;
  description: string;
  techniques: string[];
  suitability: string[]; // Who this style/treatment is suitable for (hair types, face shapes, lifestyle)
}

export interface ProductRecommendation {
  name: string;
  brand: string;
  purpose: string;
  usageInstructions: string;
  hairTypes?: string[];
}

export interface ProductGroup {
  category: string;
  products: ProductRecommendation[];
}

export interface ClientQuestion {
  question: string;
  answer: string; // Master-barber level response
}

export interface ServiceMatchRule {
  criteria: string[]; // What answers trigger this recommendation
  recommendedService: string;
  estimatedDurationMinutes: number;
  estimatedPrice: number;
  upsellSuggestions: string[];
}

export interface DomainKnowledge {
  id: string;
  name: string;
  description: string;
  subTypes: SubType[];
  professionalTechniques: string[];
  productRecommendations: ProductGroup[];
  commonQuestions: ClientQuestion[];
  serviceMatching: ServiceMatchRule[];
}

// Interface for face shape recommendations
export interface FaceShapeRecommendation {
  shape: string;
  characteristics: string;
  bestStyles: string[];
  stylesToAvoid: string[];
  consultationTip: string;
}

// Interface for AI Sales Assistant Prompts & Scripts
export interface SalesScriptPattern {
  name: string;
  context: string;
  customerVibe: string;
  exampleScript: string;
  psychologicalTrigger: string;
}

export interface SalesAssistantKB {
  trustBuildingPatterns: SalesScriptPattern[];
  educationScripts: SalesScriptPattern[];
  upsellRecommendationLogic: {
    serviceTrigger: string;
    customerConcern: string;
    recommendedAddOn: string;
    script: string;
  }[];
  noShowPrevention: {
    stage: 'booking_confirmation' | 'pre_appointment' | 'commitment_reaffirmation';
    prompt: string;
    reasoning: string;
  }[];
  membershipRecurringPrompts: {
    trigger: string;
    offerDetails: string;
    script: string;
  }[];
  giftCardSuggestions: {
    trigger: string;
    script: string;
  }[];
  averageTicketValueOptimizationTips: string[];
}
