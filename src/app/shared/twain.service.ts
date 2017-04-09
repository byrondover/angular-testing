import { Injectable } from '@angular/core';

export class Twain {
  quote: string;
}

@Injectable()
export class TwainService {
  quote: Twain;

  getQuote() {
    return Promise.resolve("React? Never heard of it...")
  }
}
