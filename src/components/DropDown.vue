<template>
  <div class="drop-down">
    <b-form-select v-model="currentSymbol" :options="options" size="sm" class="mt-3">
      <!-- This slot appears above the options from 'options' prop -->
      <template v-slot:first>
        <b-form-select-option :value="null" disabled>-- Please select an Symbol --</b-form-select-option>
      </template>
    </b-form-select>
    <ul class="drop-down__list list">
      <li class="list__content">{{ currentSymbol }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "DropDown",
  data() {
    return {
      currentSymbol: "BTCUSDT",
      options: [
        { value: "BTCUSDT", text: "BTCUSDT" },
        { value: "BNBBTC", text: "BNBBTC" },
        { value: "ETHBTC", text: "ETHBTC" },
      ],
    };
  },
  watch: {
    currentSymbol(symbol) {
      this.$bus.$emit("symbol", symbol); // посылаем выбранный символ в плагин EventBus
    },
  },
};
</script>

<style lang="scss">
.drop-down {
  max-width: 600px;
  display: flex;
  margin: 0 auto;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
  &__list {
    list-style: none;
  }
}
</style>
