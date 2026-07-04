export * from './types';
export { fadesAndTapersKB } from './fades';
export { hairTypesKB } from './hairTypes';
export { beardsKB } from './beards';
export { colorKB } from './color';
export { demographicsKB } from './demographics';
export { healthKB } from './health';
export { schedulesAndProductsKB } from './schedules';
export { faceShapesKB } from './faces';
export { consultationKB } from './consultation';
export { salesPromptsKB } from './salesPrompts';

import { DomainKnowledge, FaceShapeRecommendation, SalesAssistantKB } from './types';
import { fadesAndTapersKB } from './fades';
import { hairTypesKB } from './hairTypes';
import { beardsKB } from './beards';
import { colorKB } from './color';
import { demographicsKB } from './demographics';
import { healthKB } from './health';
import { schedulesAndProductsKB } from './schedules';
import { faceShapesKB } from './faces';
import { consultationKB } from './consultation';
import { salesPromptsKB } from './salesPrompts';

export interface CompleteBarberKB {
  domains: {
    fadesAndTapers: DomainKnowledge;
    hairTypesAndTextures: DomainKnowledge;
    beardsAndFacialHair: DomainKnowledge;
    colorServices: DomainKnowledge;
    childrenAndSeniorCuts: DomainKnowledge;
    hairAndScalpHealth: DomainKnowledge;
    schedulesAndProducts: DomainKnowledge;
    professionalConsultation: DomainKnowledge;
  };
  faceShapes: FaceShapeRecommendation[];
  salesAssistant: SalesAssistantKB;
}

export const completeBarberKB: CompleteBarberKB = {
  domains: {
    fadesAndTapers: fadesAndTapersKB,
    hairTypesAndTextures: hairTypesKB,
    beardsAndFacialHair: beardsKB,
    colorServices: colorKB,
    childrenAndSeniorCuts: demographicsKB,
    hairAndScalpHealth: healthKB,
    schedulesAndProducts: schedulesAndProductsKB,
    professionalConsultation: consultationKB,
  },
  faceShapes: faceShapesKB,
  salesAssistant: salesPromptsKB,
};
