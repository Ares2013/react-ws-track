// browsers have String.prototoype.trim().
export default function trim(s) {
  return s.replace(/^\s+|\s+$/g, '');
}
