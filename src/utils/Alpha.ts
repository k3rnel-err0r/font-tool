/**
 * Extracts the alpha value from an RGBA array.
 * @param rgbaArray - The RGBA array to extract the alpha value from.
 * @returns The alpha value as a number.
 */
export const extractAlphaFromRGBA = (rgbaArray: number[]): number => {
  return rgbaArray?.[3] ?? 1;
};
