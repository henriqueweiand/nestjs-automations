import { Injectable } from "@nestjs/common";

@Injectable()
export default class CreatedProductAction {
  execute(data: any) {
    console.log('CreatedProductAction executed');

    return data;
  }
}