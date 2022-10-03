import { Order, STATUS } from './order';
export default class Robot {
    id: number;
    title: string;
    handleTime: number;
    handleOrder?: Order | null;
    robotInterval?: number;
    constructor(id: number, handleTime = 10) {
        this.title = `Robot ${id}`;
        this.id = id;
        this.handleTime = handleTime;
        this.handleOrder = null;
    }

    resetOrder() {
        const order = this.handleOrder!;
        clearInterval(this.robotInterval);
        order.status = STATUS.PENDING; 
    }

    async processOrder(order: Order) {
        this.handleOrder = order;
        let countDown: number = this.handleTime;
        order.status = STATUS.PROCESS;
        order.completedTime = countDown;
        this.robotInterval = setInterval(() => {
            countDown--;
            order.completedTime = countDown;
            console.log(countDown);
            if (countDown == 0) {
                clearInterval(this.robotInterval);
                this.handleOrder = null;
                order.status = STATUS.COMPLETED;
            }
        }, 1000);
    }

    
}