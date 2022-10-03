export class Order {
    id: number;
    isVip: boolean;
    title: string;
    public status: STATUS;
    completedTime?: number | null;

    constructor(id: number, isVip = false) {
        this.id = id;
        this.isVip = isVip;
        this.title = `${isVip ? 'vip': ''} Order #${id}`;
        this.status = STATUS.PENDING;
        this.completedTime = 0;
        this.completedTime = null;
    }
}


export enum STATUS {
    PENDING = 'PENDING',
    PROCESS = 'PROCESS',
    COMPLETED = 'COMPLETED',
}