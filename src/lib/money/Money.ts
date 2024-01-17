export const money = (number: number) => ({
  egp: (): string =>
    Intl.NumberFormat("en-EG", {
      style: "currency",
      currency: "EGP",
    }).format(number / 100),
});
