 const calculateDiscount = (price, discount) => {
    if (discount === undefined) return null;
    const discountAmount = (price * discount) / 100;
    return {newAmount: Math.round(price - discountAmount), discountAmount: Math.round(discountAmount)};
  };

  module.exports = calculateDiscount;