import {Injectable} from '@angular/core';
import {parseString} from 'xml2js';
import {Builder} from 'xml2js';


@Injectable({
  providedIn: 'root'
})
export class ParseFormatService
{
  public xmlToJson(xml: String)
  {
    let res;
    parseString(xml, {explicitArray: false, explicitRoot: false }, (err, result) => {
      if(err) {
        res = err;
      } else {
        res = result;
      }
    });
    return res;
  }

  public jsonToXml(jsonRoot: Object)
  {
    return new Builder().buildObject(jsonRoot);
  }
}
