<template>
 <div class="container">
     <!-- order area -->
  <div>
    <h4>Order Area</h4>
    <div v-if="!orderListIsEmpty" class="area">
      <OrderCard v-for="order in orderList" :key="order.id"  :order="order"/>
    </div>
  </div>
  <button @click="addVipOrder">Add VIP Order</button>
  <button @click="addNormalOrder">Add Normal Order</button>

  <!-- robot area -->
  <div>
    <h4>Robot Area</h4>
    <div v-show="!robotListIsEmpty" class="area">
      <RobotCard v-for="robot in robotList" :robot="robot" :key="robot.id" />
    </div>
  </div>
  <button @click="addRobot">Add Robot</button>
 </div>
</template>

<script lang="ts" setup>
import RobotCard from '@/components/robotCard.vue'
import OrderCard from '@/components/orderCard.vue'
import { useStore } from "@/store";
import { storeToRefs } from "pinia";

// define store
const store = useStore();

// deconstructing store
const { robotList, orderList, robotListIsEmpty, orderListIsEmpty, notBusyRobot, pendingOrder } = storeToRefs(store);

const addNormalOrder = () => {
  store.addOrder(false);
};

const addVipOrder = () => {
  store.addOrder(true);
}

const addRobot = () => {
  store.addRobot();
}

// subscribe store
store.$subscribe((mutation, state) => {
  const order = pendingOrder.value;
  if (notBusyRobot.value && order != null) {
    const order = pendingOrder.value!;
    console.log(order);
    notBusyRobot.value?.processOrder(order);
  }
});

</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.container {
  padding: 20px;

}
.area {
  background-color: silver;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 5px;
}


</style>