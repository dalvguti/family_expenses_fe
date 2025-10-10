/**
 * Category Model
 * Represents an expense category
 */
class Category {
  constructor(data = {}) {
    this.id = data.id || null;
    this.name = data.name || '';
    this.description = data.description || '';
    this.color = data.color || '#3498db';
    this.icon = data.icon || '';
    this.isActive = data.isActive !== undefined ? data.isActive : true;
    this.createdAt = data.createdAt || null;
    this.updatedAt = data.updatedAt || null;
  }

  // Validation method
  isValid() {
    return this.name.trim() !== '';
  }

  // Convert to plain object for API
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      color: this.color,
      icon: this.icon,
      isActive: this.isActive,
    };
  }
}

export default Category;

