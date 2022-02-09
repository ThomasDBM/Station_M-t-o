import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    Stations : []
  },
  mutations: {
    SetStations(state,Station){
      state.Stations = Station
    },
  },
  actions: {},
  modules: {},
});
