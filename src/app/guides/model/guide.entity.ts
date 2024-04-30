export class Guide {
  id: number;
  name: string;
  destination: string;
  language: string[];
  specialization: string[];
  availability: string;
  rate: number;
  price: string;
  experience: string;
  picture: string;

  constructor() {
    this.id = 0;
    this.name = "";
    this.destination = "";
    this.language = [];
    this.specialization = [];
    this.availability = "";
    this.rate = 0.0;
    this.price = "";
    this.experience = "";
    this.picture = "";
  }
}

