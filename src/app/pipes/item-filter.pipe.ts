import { Pipe, PipeTransform } from '@angular/core';

import { ItemManager } from './../models/items';

@Pipe({
    name: 'itemfilter',
    pure: false
})
export class ItemFilterPipe implements PipeTransform {

    transform(items: ItemManager.Item[], filter: ItemManager.Item): ItemManager.Item[] {
        if (!items || !filter) {
            return items;
        }
        // filter items array, items which match and return true will be kept, false will be filtered out
        return items.filter((item: ItemManager.Item) => this.applyFilter(item, filter));
    }
  
    /**
     * Perform the filtering.
     * 
     * @param {ItemManager.Item} item The item to compare to the filter.
     * @param {ItemManager.Item} filter The filter to apply.
     * @return {boolean} True if item satisfies filters, false if not.
     */
    applyFilter(item: ItemManager.Item, filter: ItemManager.Item): boolean {
        for (let field in filter) {
            if (filter[field]) {
            if (typeof filter[field] === 'string') {
                if (item[field].toLowerCase().indexOf(filter[field].toLowerCase()) === -1) {
                return false;
                }
            } else if (typeof filter[field] === 'number') {
                if (item[field] !== filter[field]) {
                return false;
                }
            }
            }
        }
        return true;
    }
}