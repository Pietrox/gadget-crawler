import { AsusConfigDocument } from '@app/schemas';

export class ConfigDto {
  url: string;
  xml: string[];
  utils?: any;

  static async documentToDtofactory(document: AsusConfigDocument): Promise<ConfigDto> {
    const object = new ConfigDto();
    object.url = document.url;
    object.xml = document.xml;
    object.utils = document.utils;
    return object;
  }
}
