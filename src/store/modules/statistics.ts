import { CountriesData, GlobalData, RootState, StatisticsState } from "@/models";
import { ActionTree, MutationTree } from "vuex";
import axios, { AxiosResponse, AxiosError } from "axios";

export const statisticsState = {
    globalData: [],
    countriesData: [],
    loadingState: []
};

export const statisticsActions: ActionTree<StatisticsState, RootState> = {
    getCovidStatistics: ({ commit }) => {
        commit("addToLoadingState", "retrieving covid statistics...");
        return axios
            .get(`https://api.covid19api.com/summary`)
            .then((resp: AxiosResponse) => {
                commit("setGlobalStatistics", resp.data.Global);
                commit("setCountriesStatistics", resp.data.Countries);
                commit("removeFromLoadingState", "retrieving covid statistics...");
            })
            .catch((err) => {
                commit("removeFromLoadingState", "retrieving covid statistics...");
                throw new Error(err);
            });
    }
};

export const statisticsMutations: MutationTree<StatisticsState> = {
    addToLoadingState: (state: StatisticsState, message: string) => {
        state.loadingState.push(message);
    },
    removeFromLoadingState: (state: StatisticsState, message: string) => {
        state.loadingState = state.loadingState.filter(loadingMessages => loadingMessages !== message);
    },
    setGlobalStatistics: (state: StatisticsState, globalStats: GlobalData) => {
        state.globalData = globalStats;
    },
    setCountriesStatistics: (state: StatisticsState, countriesStats: CountriesData[]) => {
        state.countriesData = countriesStats;
    }
};

export default {
    name: "statistics",
    namespaced: true,
    state: statisticsState,
    actions: statisticsActions,
    mutations: statisticsMutations
};


