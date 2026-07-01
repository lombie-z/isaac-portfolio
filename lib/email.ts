/** Loose email match — good enough to decide whether to prompt for one. */
export const EMAIL_REGEX = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i;

export function containsEmail(text: string): boolean {
  return EMAIL_REGEX.test(text);
}
