import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class AirtableService {
  private readonly BASE_URL = 'https://api.airtable.com/v0/';
  private readonly API_KEY2 =
    'YOUR_API_KEY';
  private readonly BASE_ID = 'YOUR_BASE_ID';

  constructor() {}

  async getData(tableName: string, view?: string, offset?: string) {
    try {
      const viewParam = view ? `&view=${view}` : '';
      const offsetParam = offset ? `&offset=${offset}` : '';
      const url = `${this.BASE_URL}${this.BASE_ID}/${tableName}?${viewParam}${offsetParam}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${this.API_KEY2}`,
        },
      });

      return response.data.records;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async sendData(tableName: string, data: any) {
    try {
      const url = `${this.BASE_URL}${this.BASE_ID}/${tableName}`;
      const response = await axios.post(
        url,
        {
          fields: data,
        },
        {
          headers: {
            Authorization: `Bearer ${this.API_KEY2}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
