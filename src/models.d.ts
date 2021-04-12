// ===== App Interfaces ===== //

export interface GlobalData {
    NewConfirmed: number;
    TotalConfirmed: number;
    NewDeaths: number;
    TotalDeaths: number;
    NewRecovered: number;
    TotalRecovered: number;
    Date: string;
};

export interface CountriesData {
    ID: string;
    Country: string;
    CountryCode: string;
    Slug: string;
    NewConfirmed: number;
    TotalConfirmed: number;
    NewDeaths: number;
    TotalDeaths: number;
    NewRecovered: number;
    TotalRecovered: number;
    Date: string;
    Premium?: object;
};

// ===== Store Interfaces ===== //

export interface RootState {
    statistics: StatisticsState;
};

export interface StatisticsState {
    countriesData: CountriesData[];
    globalData: GlobalData | null;
    loadingState: string[];
};