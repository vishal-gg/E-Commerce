export const calculateDiscount = (price: number, discount: number | undefined) => {
    if (discount === undefined) return null;
    const discountAmount = (price * discount) / 100;
    return {newAmount: Math.round(price - discountAmount), discountAmount: Math.round(discountAmount)};
  };