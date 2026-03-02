export class EmailVO {
  private email: string;

  constructor(email: string) {
    if (!email.includes('@')) throw new Error('Invalid email');
    this.email = email.toLowerCase();
  }

  get value(): string {
    return this.email;
  }
}