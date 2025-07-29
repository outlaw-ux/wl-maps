export const getLegalDescRegex = (
  lot?: string,
  block?: string,
  sec?: string
) => {
  if (!lot || !block || !sec) return null;
  return new RegExp(
    `\\b(LT|LOT)\\s*${lot}\\b.*\\bBLK\\s*${block}\\b.*\\bSEC\\s*${sec}\\b`,
    'i'
  );
};
