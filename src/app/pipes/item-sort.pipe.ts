import { Pipe, PipeTransform } from "@angular/core";

import { ItemManager } from './../models/items';

@Pipe({
  name: "itemsort"
})
export class ItemSortPipe implements PipeTransform {
  transform(array: ItemManager.Item[], field: string, order: boolean): ItemManager.Item[] {
    if (!field) {
        return array;
    }
    if (order) {
        array.sort((a: any, b: any) => {
        if (a[field] < b[field]) {
            return -1;
        } else if (a[field] > b[field]) {
            return 1;
        } else {
            return 0;
        }
        });
    } else if (!order) {
        array.sort((a: any, b: any) => {
            if (a[field] > b[field]) {
            return -1;
            } else if (a[field] < b[field]) {
            return 1;
            } else {
            return 0;
            }
        });
    } 

    return array;
  }
}