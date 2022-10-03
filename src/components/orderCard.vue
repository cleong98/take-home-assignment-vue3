<template>
    <div class="robot">
          <p class="robot-title">{{order.title}}</p>
          <p> Status: {{ status }}</p>
          <p>{{  leaveTime }}</p>
        </div>
  </template>
  
  <script lang="ts" setup>
    import { defineProps, reactive, computed } from 'vue';
    import { Order, STATUS } from '@/type/order'; 
  
    export interface Props {
      order: Order
    }
    // props
    const props = defineProps<Props>();
    const order = reactive(props.order); 

    // computed
    const status = computed(() => order.status);

    // order leave times when order is in process
    const leaveTime = computed(() => {
        if (order.status === STATUS.PROCESS) {
            return `${order.completedTime} s`;
        }
        return '';
    })

  </script>
  
  <style scoped>
  * {
    margin: 0;
    padding: 0;
  }
  .robot {
    background-color: lightblue;
    border-radius: 5px;
    padding: 20px 10px;
    margin: 1px 5px;
  }
  
  .robot :hover {
    cursor: pointer;
  }
  
  .robot-title {
    font-size: 14px;
    padding: 10px;
    text-align: center;
    
  }
  
  </style>