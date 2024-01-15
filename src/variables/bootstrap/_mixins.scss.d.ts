export type Styles = {
  fade_in: string;
  fade_out: string;
  "fade-in": string;
  "fade-out": string;
  fadeIn: string;
  fadeOut: string;
  flip_in_x: string;
  "flip-in-x": string;
  flipInX: string;
  shake: string;
  wobble: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
