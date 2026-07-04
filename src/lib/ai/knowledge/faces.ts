import { FaceShapeRecommendation } from './types';

export const faceShapesKB: FaceShapeRecommendation[] = [
  {
    shape: 'Oval',
    characteristics: 'The oval face is widely considered the ideal proportions. The face length is greater than the width of the cheekbones, and the forehead is wider than the jawline. The angle of the jaw is rounded without sharp corners.',
    bestStyles: [
      'Classic Pompadour (adds slight volume on top)',
      'Mid Fade with a Side Part',
      'Textured Crop with short sides',
      'Longer "flow" or slicked-back styles',
      'Almost any style is suitable due to balanced proportions'
    ],
    stylesToAvoid: [
      'Styles with heavy forward fringe that cover the forehead (this can round the face and make it look too short)',
      'Styles that drop too much hair flat along the sides of the face'
    ],
    consultationTip: 'Since oval faces have natural symmetry, you have maximum freedom. Focus the consultation on the client’s hair density, texture, and daily styling commitment rather than trying to correct facial proportions.'
  },
  {
    shape: 'Round',
    characteristics: 'Face length and width are approximately equal, with soft, curved jawlines and full cheeks. There are no prominent angles or sharp corners along the jaw or hairline.',
    bestStyles: [
      'High Skin Fade with a Pompadour or Quiff (creates height and elongates the face)',
      'Modern Textured Crop with extremely short sides',
      'Spiky textured tops or Faux Hawks',
      'Sculpted Full Beard with a sharp, square-boxed chin (adds structure and angles to a soft jawline)'
    ],
    stylesToAvoid: [
      'Buzz cuts with no fade (makes the head look like a perfect sphere)',
      'Long hair that ends at the cheeks or jawline',
      'Blunt, flat fringes that cut off vertical height'
    ],
    consultationTip: 'The goal here is illusion of height and structure. Recommend styles that keep the sides extremely tight (high fades) and build volume or texture on top to elongate the facial silhouette.'
  },
  {
    shape: 'Square',
    characteristics: 'A highly masculine, strong face shape. Forehead, cheekbones, and jaw are nearly identical in width. The jawbone is sharp, angular, and highly pronounced.',
    bestStyles: [
      'Buzz Cut or Close Crop (complements the strong bone structure)',
      'Classic Ivy League with a soft side taper',
      'Slicked Back Undercut',
      'Short, clean Taper with textured length on top',
      'Designer Stubble (softens the hard edges of the jaw slightly)'
    ],
    stylesToAvoid: [
      'Hard, boxy, flat-top haircuts that make the head look like a cube',
      'Heavy center parts',
      'Overly manicured, severe geometric facial lines'
    ],
    consultationTip: 'Square faces look great with both ultra-short styles (buzz cuts) and high-contrast fades. If the client wants a softer look, suggest a classic taper with soft, scissor-cut layers on top to break up the harsh geometry.'
  },
  {
    shape: 'Heart',
    characteristics: 'Forehead is wide, cheekbones are slightly narrower, and the jawline tapers down to a narrow, pointed chin. It resembles an inverted triangle.',
    bestStyles: [
      'Mid-length styles (like a messy curtain cut or textured fringe)',
      'Side-swept Quiff or Pompadour (adds volume to balance the forehead)',
      'Soft Low Fade with natural bulk on the upper sides',
      'Full, thick beard (highly recommended to add volume and width to a narrow jawline/chin)'
    ],
    stylesToAvoid: [
      'High and tight fades (these make the top of the head look even wider and the chin look excessively narrow)',
      'Severe, flat buzz cuts'
    ],
    consultationTip: 'The key is balancing the top and bottom. Avoid super-tight side fades which expose how wide the forehead is. Suggest keeping 1/2 to 1 inch of length on the sides and growing a full, styled beard to fill out the lower jaw.'
  },
  {
    shape: 'Diamond',
    characteristics: 'A rare and angular face shape. The cheekbones are the widest part of the face, with a narrow forehead and a narrow, highly pointed jawline.',
    bestStyles: [
      'Longer, layered styles with texture (such as a messy shag, side-swept fringe, or medium flow)',
      'Soft Low Taper with side bulk to soften the cheekbone prominence',
      'Fringe cuts that cover the temples and forehead',
      'Full beard styled with a rounded bottom (softens the pointed chin)'
    ],
    stylesToAvoid: [
      'Extremely high fades that expose the wide cheekbone structure',
      'Slicked-back styles that draw attention to the narrow forehead and temples'
    ],
    consultationTip: 'With diamond shapes, we want to soften the prominent cheekbones and add volume to the forehead and jaw. Advise the client to keep their hair slightly longer and softer, avoiding harsh, high clipper work.'
  },
  {
    shape: 'Oblong',
    characteristics: 'The face is significantly longer than it is wide. The forehead, cheekbones, and jawline are of relatively equal width, and the chin may be slightly rounded.',
    bestStyles: [
      'Classic Side Part with medium length on the sides (adds lateral balance)',
      'Textured Fringe styled flat across the forehead (cuts off vertical length)',
      'Soft Low Taper keeping side density',
      'Shorter Beard or Designer Stubble (avoid long, pointed beards that make the face look even longer)'
    ],
    stylesToAvoid: [
      'High Pompadours or high spiky quiffs (adds massive vertical height to an already long face)',
      'High Skin Fades (makes the face look extremely narrow and elongated)'
    ],
    consultationTip: 'Our goal is to avoid adding height. Recommend styles that lay relatively flat on top (side parts, fringes) and maintain a bit of bulk on the sides. Tell the client to avoid long, pointed beards, which pull the face downward.'
  }
];
