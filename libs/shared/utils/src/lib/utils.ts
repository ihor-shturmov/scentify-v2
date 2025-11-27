/**
 * Formats a date for use in HTML date inputs (YYYY-MM-DD format)
 * @param date - Date string, Date object, or undefined
 * @returns Formatted date string (YYYY-MM-DD) or empty string if invalid
 */
export function formatDateForInput(date: string | Date | undefined): string {
  if (!date) return '';

  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;

    // Check if date is valid
    if (isNaN(dateObj.getTime())) return '';

    // Format as YYYY-MM-DD
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
}

/**
 * Formats a date for display (e.g., "Nov 26, 2024")
 * @param date - Date string, Date object, or undefined
 * @param locale - Locale string (default: 'en-US')
 * @returns Formatted date string or empty string if invalid
 */
export function formatDateForDisplay(
  date: string | Date | undefined,
  locale = 'en-US'
): string {
  if (!date) return '';

  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;

    if (isNaN(dateObj.getTime())) return '';

    return dateObj.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch (error) {
    console.error('Error formatting date for display:', error);
    return '';
  }
}

/**
 * Formats a date and time for display (e.g., "Nov 26, 2024, 10:08 AM")
 * @param date - Date string, Date object, or undefined
 * @param locale - Locale string (default: 'en-US')
 * @returns Formatted date-time string or empty string if invalid
 */
export function formatDateTimeForDisplay(
  date: string | Date | undefined,
  locale = 'en-US'
): string {
  if (!date) return '';

  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;

    if (isNaN(dateObj.getTime())) return '';

    return dateObj.toLocaleString(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (error) {
    console.error('Error formatting date-time for display:', error);
    return '';
  }
}

/**
 * Checks if a date is valid
 * @param date - Date string, Date object, or undefined
 * @returns True if date is valid, false otherwise
 */
export function isValidDate(date: string | Date | undefined): boolean {
  if (!date) return false;

  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return !isNaN(dateObj.getTime());
  } catch {
    return false;
  }
}
