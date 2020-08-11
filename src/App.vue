<template>
  <div id="app">
    <NavBar :headerData="headerData" @switchBtn="changeComponent" />
    <keep-alive>
      <component :is="currentComponent"></component>
    </keep-alive>
  </div>
</template>


<script>
import NavBar from "@/components/NavBar";

export default {
  data: () => {
    return {
      headerData: {
        btn: ["List", "DropDown"],
      },
      currentBtn: "List",
    };
  },
  computed: {
    // при изменении значения currentBtn заменяет компонент
    currentComponent() {
      return this.currentBtn;
    },
  },
  methods: {
    // при нажатии кнопки запускается функция и меняет значение currentBtn
    changeComponent(btn) {
      this.currentBtn = btn;
    },
  },
  components: {
    NavBar,
    // динамически подключаем компоненты
    List: () => import("@/components/List"),
    DropDown: () => import("@/components/DropDown"),
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
body {
  overflow: hidden;
}
</style>
