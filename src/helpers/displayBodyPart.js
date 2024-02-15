export const displayBodyPart = (part, type = 'word') => {
  const partDash = part.substring(part.indexOf('-') + 1, part.length);
  const replacementChar = type === 'word' ? ' ' : '_'
  const partSpace = partDash.replaceAll('-', replacementChar);

  return partSpace;
}
