export namespace ItemManager {
    export class Item {
        id: number;
        title: string;
        description: string;
        price: number;
        email: string;
        image: string;
        _liked?: boolean;    
    }
    export class Filter {
        search: string;
        orderBy: string;
        order: string;

        constructor(search, orderBy, order) {
            this.search = search;
            this.orderBy = orderBy;
            this.order = order;
        }
    }
}