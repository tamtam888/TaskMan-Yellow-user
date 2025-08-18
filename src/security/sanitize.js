import DOMPurify from 'dompurify';

// סניטציה קשוחה: מחזיר טקסט נקי בלבד (ללא תגיות/מאפיינים)
export function sanitizeText(input) {
  if (typeof input !== 'string') return '';
  const cleaned = DOMPurify.sanitize(input, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] }).trim();
  return cleaned;
}

// לוג אבטחה קצר: אם היה צורך לנקות – מדפיס אזהרה (ל-dev tools)
export function auditSanitize(field, original, cleaned) {
  if (original !== cleaned) {
    // אל תשמרי מידע רגיש – רק אינדיקציה שהתרחשה ניקוי
    // כדאי להשאיר בזמן פיתוח וב-CI, ולהסיר/להשתיק בפרודקשן אם רוצים
    // eslint-disable-next-line no-console
    console.warn(`[sanitize] Field "${field}" cleaned: potentially unsafe input removed`);
  }
}
