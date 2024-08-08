export function sameConvo(date1: Date | null, date2: Date): boolean {
  if (!date1) return false;
  /* If the chat is within the 3 mins of the last on, it is the same conversation */
  const diffInMilliseconds = Math.abs(date1.getTime() - date2.getTime()); // Get time difference
  const diffInMinutes = diffInMilliseconds / (1000 * 60); // Convert to mins
  return diffInMinutes < 3;
}
