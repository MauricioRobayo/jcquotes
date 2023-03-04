export const quoteKeys = {
  all: ["quotes"] as const,
  get status() {
    return [...this.all, "status"] as const;
  },
  get random() {
    return [...this.all, "random"] as const;
  },
  get detail() {
    return [...this.all, "details"] as const;
  },
  details(id: string) {
    return [...this.detail, id] as const;
  },
};
