export type ClassValue = ClassValue[] | Record<string, boolean | null | undefined> | string | number | null | boolean | undefined;

function toVal(mix: ClassValue): string {
  let str = '';
  if (typeof mix === 'string' || typeof mix === 'number') {
    str += mix;
  } else if (typeof mix === 'object') {
    if (Array.isArray(mix)) {
      const len = mix.length;
      for (let k = 0; k < len; k++) {
        if (mix[k]) {
          const y = toVal(mix[k]);
          if (y) {
            str && (str += ' ');
            str += y;
          }
        }
      }
    } else if (mix) {
      for (const k in mix) {
        if (mix[k]) {
          str && (str += ' ');
          str += k;
        }
      }
    }
  }
  return str;
}

export function cn(...inputs: ClassValue[]): string {
  let i = 0;
  let tmp: ClassValue;
  let str = '';
  const len = inputs.length;
  for (; i < len; i++) {
    if ((tmp = inputs[i])) {
      const x = toVal(tmp);
      if (x) {
        str && (str += ' ');
        str += x;
      }
    }
  }
  return str;
}

export function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch {
    return dateStr;
  }
}
