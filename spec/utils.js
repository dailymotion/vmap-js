import path from 'path';
import fs from 'fs';
import { DOMParser } from 'xmldom';

export const readXMLFile = (file) => {
  const url = path.resolve(path.dirname(module.filename), file).replace(/\\/g, '/');
  const data = fs.readFileSync(url, 'utf8');
  const xml = new DOMParser().parseFromString(data);

  return xml;
};
