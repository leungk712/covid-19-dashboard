import { RootState } from "@/models";
import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";

// ===== Module Imports ===== //
import StatisticsModule from "@/store/modules/statistics";

Vue.use(Vuex);

export const store: StoreOptions<RootState> = {
  modules: {
    statistics: StatisticsModule
  }
};

export default new Vuex.Store(store);