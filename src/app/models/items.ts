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
}