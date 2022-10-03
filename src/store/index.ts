import { Order, STATUS } from "@/type/order";
import Robot from "@/type/robot";
import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";

export const useStore = defineStore('main', () => {

    /// STATE
    const robotList = reactive<Robot[]>([]);
    const orderList = reactive<Order[]>([]);
    const totalOrder = ref(0);

    /// GETTER
    const robotListIsEmpty = computed(() => robotList.length === 0);
    const orderListIsEmpty = computed(() => orderList.length === 0);
    const totalVip = computed(() => orderList.filter((originOrder: Order) => originOrder.isVip).length);
    const notBusyRobot = computed(() => robotList.find((originRobot: Robot) => originRobot.handleOrder === null));
    const pendingOrder = computed(() => orderList.find((order: Order) => order.status == STATUS.PENDING));


    /// ACTION
    const addRobot = () => {
        const id = robotList.length + 1;
        const robot = new Robot(id);
        robotList.push(robot);
    };

    const removeRobot = (robot: Robot) => {
        // reset robot handling order
        if (robot.handleOrder) {
            robot.resetOrder();
        }

        // remove robot
        const index = robotList.findIndex((originRobot) => originRobot.id == robot.id);
        if (index > -1) {
            robotList.splice(index, 1);
        }
    }


    const addOrder = (isVip: boolean) => {
        totalOrder.value++;
        const order = new Order(totalOrder.value, isVip)
        if (isVip) {
           orderList.splice(totalVip.value, 0, order);
            return;
        }
        orderList.push(order);
    }

    return { 
        robotList, 
        orderList, 
        robotListIsEmpty,
        orderListIsEmpty,
        notBusyRobot,
        pendingOrder,
        addRobot, 
        removeRobot, 
        addOrder,
    };
});