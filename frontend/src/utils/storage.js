const STORAGE_KEY = 'fraudguard_transactions';

/**
 * Get all stored transactions from LocalStorage
 * @returns {Array} Array of transaction objects
 */
export const getTransactions = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return [];
  }
};

/**
 * Save a new transaction prediction result
 * @param {Object} transaction - Transaction details with prediction results
 */
export const saveTransaction = (transaction) => {
  try {
    const current = getTransactions();
    const newTx = {
      id: `TXN-${Date.now().toString().slice(-6)}`,
      timestamp: new Date().toISOString(),
      ...transaction,
    };
    const updated = [newTx, ...current];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newTx;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return null;
  }
};

/**
 * Clear transaction history from LocalStorage
 */
export const clearTransactions = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
};