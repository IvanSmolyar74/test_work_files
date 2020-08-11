<template>
  <div class="container">
    <span class="list__title">{{ this.symbol }}</span>
    <div class="list">
      <div class="list__bids">
        <span class="list__title">Bids</span>

        <b-table-simple hover small caption-top responsive sticky-header="80vh">
          <b-thead head-variant="dark">
            <b-tr>
              <b-th colspan="1">Amount</b-th>
              <b-th colspan="1">Price</b-th>
              <b-th colspan="1" class="list__th-hide">Total</b-th>
            </b-tr>
          </b-thead>
          <b-tbody v-for="(item, idx) in glass.bids" :key="idx">
            <b-tr>
              <b-th>{{ item[0] }}</b-th>
              <b-th>{{ item[1] }}</b-th>
              <b-td class="list__td-hide">{{ item[0] * item[1] }}</b-td>
            </b-tr>
          </b-tbody>
        </b-table-simple>
      </div>
      <div class="list__asks">
        <span class="list__title">Asks</span>
        <b-table-simple hover small caption-top responsive sticky-header="80vh">
          <b-thead head-variant="dark">
            <b-tr>
              <b-th colspan="1">Amount</b-th>
              <b-th colspan="1">Price</b-th>
              <b-th colspan="1" class="list__th-hide">Total</b-th>
            </b-tr>
          </b-thead>
          <b-tbody v-for="(item, idx) in glass.asks" :key="idx">
            <b-tr>
              <b-th>{{ item[0] }}</b-th>
              <b-th>{{ item[1] }}</b-th>
              <b-td class="list__td-hide">{{ item[0] * item[1] }}</b-td>
            </b-tr>
          </b-tbody>
        </b-table-simple>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "List",
  data: () => ({
    glass: {
      bids: null,
      asks: null,
    },
    symbol: "BTCUSDT",
    ws: null,
  }),
  // при создании компонента асинхронно запускаем функции для отрисовки стакана
  async created() {
    await this.snapshot();
    this.wsSubscribe();
    // получаем выбранный символ из плагина и меняем его в компоненте
    this.$bus.$on("symbol", (symbol) => {
      this.symbol = symbol;
      // закрывает старое соединение
      this.ws.close();
      // запускает новое с подпиской на новый символ
      this.wsSubscribe();
    });
  },
  methods: {
    async snapshot() {
      let glass = await this.$sdk.get(this.symbol); // забирает состояние стакана по определенному символу
      glass.bids = glass.bids.reverse(); // переварачиваем, массив, чтобы первыми отображались новые данные
      glass.asks = glass.asks.reverse(); // переварачиваем, массив, чтобы первыми отображались новые данные
      this.glass = glass; // отрисовываем снепшот
    },
    wsSubscribe() {
      this.ws = this.$sdk.subscribe(this.symbol);
      // подписываемся на обновления
      this.ws.onmessage = async (event) => {
        // запускаем callBack при получении сообщений
        let data = JSON.parse(event.data); // парсим данные в Json
        let [asksAdd, bidsAdd] = [
          // создаём массивы новых данных
          data.a.filter((item) => item[1] != 0), // отфильтровываем 0-ые сделки
          data.b.filter((item) => item[1] != 0), // отфильтровываем 0-ые сделки
        ];
        asksAdd.reverse(); // переварачиваем, массив, чтобы первыми отображались новые данные
        bidsAdd.reverse(); // переварачиваем, массив, чтобы первыми отображались новые данные
        this.glass.asks.splice(
          this.glass.asks.length - asksAdd.length,
          asksAdd.length
        ); // удаляем из буффера asks столько данных сколько пришло
        this.glass.bids.splice(
          this.glass.bids.length - bidsAdd.length,
          bidsAdd.length
        ); // удаляем из буффера bids столько данных сколько пришло
        this.glass.asks = [...asksAdd, ...this.glass.asks]; // дописываем полученные данные в буфер asks
        this.glass.bids = [...bidsAdd, ...this.glass.bids]; // дописываем полученные данные в буфер bids
      };
    },
  },
};
</script>

<style lang="scss">
.list {
  display: flex;
  align-items: center;
  justify-content: space-between;
  &__title {
    font-size: 24px;
  }
  &__bids {
    flex-basis: 45%;
    height: 100vh;
    padding-right: 17px;
  }
  &__asks {
    flex-basis: 45%;
    overflow: auto;
    height: 100vh;
  }
}
@media screen and (max-width: 840px) {
  .list__th-hide {
    display: none;
  }
  .list__td-hide {
    display: none;
  }
}
</style>