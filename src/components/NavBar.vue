<template>
  <div>
    <b-navbar type="dark" variant="dark">
      <b-navbar-nav v-for="btn in headerData.btn" :key="btn" @click="switchBtn(btn)">
        <b-nav-item>{{ btn }}</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  props: {
    headerData: {
      type: Object,
      default: {},
    },
  },
  methods: {
    switchBtn(btn) {
      this.$emit("switchBtn", btn); // отправляем родителю имя нажатой кнопки
    },
  },
};
</script>


<style scoped lang="scss">
</style>
