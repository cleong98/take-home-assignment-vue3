<template>
  <div class="robot">
        <p class="robot-title">{{robot.title}}</p>
        <p>HANDLE: {{ robot.handleOrder?.title }}</p>
        <div class="cancel-icon">
          <p @click="removeRobot">x</p>
        </div>
      </div>
</template>

<script lang="ts" setup>
  import { defineProps, reactive } from 'vue';
  import Robot from '@/type/robot';
  import { useStore } from '@/store';

  // props
  export interface Props {
    robot: Robot
  } 
  const props = defineProps<Props>();
  const robot = reactive(props.robot);

  // define store
  const store = useStore();

  const removeRobot = () => {
    // make sure confirm before remove robot
    const result = confirm(`Did you want delete ${robot.title}?`);
    if (result) {
      store.removeRobot(robot);
    }
  };
  
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
  position: relative;
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

.cancel-button {
  position: absolute;
  top: 0;
  right: 0;
  width: 20px;
  height: 20px;
  /* background-color: red; */
  /* border-radius: 50%;
  width: 20px;
  height: 20px; */
}
.cancel-icon {
  position: absolute;
  top: 4px;
  right: 4px;
  /* color: white; */
  padding: 0px;
  background-color: transparent;
  border: 1px solid white;
  width: 15px;
  height: 15px;
  border-radius: 50%;
}

.cancel-icon > p {
  position: absolute;
  top: -20%;
  left: 50%;
  transform: translate(-50%, 0);
  font-weight: lighter;
  font-size: 14px;
  text-align: center;
  color: white;
}

</style>