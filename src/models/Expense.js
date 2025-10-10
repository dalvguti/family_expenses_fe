/**
 * Expense Model
 * Represents an expense entry in the family billing system
 */
class Expense {
  constructor(data = {}) {
    this.id = data.id || null;
    this.description = data.description || '';
    this.amount = data.amount || 0;
    this.category = data.category || '';
    this.date = data.date || new Date().toISOString().split('T')[0];
    this.paidBy = data.paidBy || '';
    this.createdAt = data.createdAt || null;
    this.updatedAt = data.updatedAt || null;
  }

  // Validation method
  isValid() {
    return (
      this.description.trim() !== '' &&
      this.amount > 0 &&
      this.category.trim() !== '' &&
      this.paidBy.trim() !== ''
    );
  }

  // Convert to plain object for API
  toJSON() {
    return {
      id: this.id,
      description: this.description,
      amount: this.amount,
      category: this.category,
      date: this.date,
      paidBy: this.paidBy,
    };
  }
}

export default Expense;

