export const quoteKeys = {
  all: ["quotes"],
  status: () => [...quoteKeys.all, "status"],
  random: () => [...quoteKeys.all, "random"],
  detail: () => [...quoteKeys.all, "details"],
  details: (id: string) => [...quoteKeys.detail(), id],
};
