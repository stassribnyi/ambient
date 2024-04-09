// TODO: revisit, something is off, change name?
export const safeJoin = (items: Array<string>, separator = ', ') => items.filter(Boolean).join(separator);
