export class User {
  id!: string | null;
  email: string | null;
  timeUnit: string | null;
  token: string | null;
  
  constructor(id: string | null, email: string | null, timeUnit: string | null, token: string | null) {
    this.id = id;
    this.email = email;
    this.timeUnit = timeUnit;
    this.token = token;
  }
}
