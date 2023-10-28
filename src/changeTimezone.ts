// TODO: well, this is the thing I haven't expected, need to show date and time according timezone
// TODO: go through other time usages and fix
export function changeTimeZone(date: string | Date, timeZone: string) {
  if (typeof date === 'string') {
    return new Date(
      new Date(date).toLocaleString('en-US', {
        timeZone,
      }),
    );
  }

  return new Date(
    date.toLocaleString('en-US', {
      timeZone,
    }),
  );
}
