export class DateModel {
  id: number;
  name: string;
  date: Date;

  constructor(id: number, name: string, date: Date) {
    this.id = id;
    this.name = name;
    this.date = date;
  }

  getDateString(): string {
    return this.date.toISOString().slice(0, 10);
  }
}



  