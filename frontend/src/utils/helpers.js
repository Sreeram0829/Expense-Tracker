export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export const formatCurrency = (amount) => {
  return `₹${amount.toFixed(2)}`;
};

export const categories = [
  'Food',
  'Transportation',
  'Housing',
  'Entertainment',
  'Utilities',
  'Healthcare',
  'Education',
  'Shopping',
  'Other'
];
