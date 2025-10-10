/**
 * User Model
 * Represents a family member in the system
 */
class User {
  constructor(data = {}) {
    this.id = data.id || null;
    this.name = data.name || '';
    this.email = data.email || '';
    this.role = data.role || 'member'; // member or admin
    this.createdAt = data.createdAt || null;
  }

  isValid() {
    return (
      this.name.trim() !== '' &&
      this.email.trim() !== '' &&
      this.email.includes('@')
    );
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      role: this.role,
    };
  }
}

export default User;

