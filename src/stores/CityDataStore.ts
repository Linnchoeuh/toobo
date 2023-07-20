import { createPinia, defineStore } from 'pinia'
import axios from "axios"
import type { CityFavData } from "@/stores/FavoriteCitiesStore"
import { useFavCitiesStore } from "@/stores/FavoriteCitiesStore"

export type APILocationData = {
    lat: number;
    lon: number;
    name: string;
    region: string;
    country: string;
    tz_id: string;
    localtime_epoch: number;
    localtime: string;
    url: string;
}

export type APICurrentWeatherData = {
    location: APILocationData;
    current: Object;
}

export type CityDataResponse = {
    data: APILocationData;
    fixedName: string;
}

export type TempWeatherObj = {
    temp: number;
    icon: string;
}

export type CityDataObject = {
    apiKey: string;
    baseUrl: string;
    cityName: string;
    cityTmpName: string;
    currentWeather: APICurrentWeatherData;
    forecast: Object;
    forecastHourly: Array<Object>;
    cityFav: CityFavData;
}

export const useCityDataStore = defineStore(
    "CityData",
    {
        state: (): CityDataObject => {
            return {
                apiKey: "7abe50900eba444fa02192358230307",
                baseUrl: "http://api.weatherapi.com/v1/",
                cityName: "No city selected",
                cityTmpName: "",
                currentWeather: {},
                forecast: {},
                forecastHourly: [],
                cityFav: {},
            };
        },

        actions: {
            async updateAllWeatherData(cityName: string = "auto:ip") {
                try {
                    await this.apiGetCurrentWeather(cityName);
                    await this.apiGetForecast(
                        this.latLonToString(
                            this.currentWeather.location.lat,
                            this.currentWeather.location.lon
                    ));
                    console.log(this.cityTmpName);
                    if (this.cityTmpName !== "") {
                        console.log(this.cityTmpName);
                        this.cityName = this.cityTmpName;
                    } else {
                        this.cityName = this.forecast.location.name;
                    }
                    this.cityFav.name = this.cityName;
                    this.cityFav.region = this.forecast.location.region;
                    this.cityFav.country = this.forecast.location.country;
                    this.cityFav.lat = this.forecast.location.lat;
                    this.cityFav.lon = this.forecast.location.lon;
                    this.cityFav.temp = this.currentWeather.current.temp_c;
                    this.cityFav.icon = this.currentWeather.current.condition.icon.replaceAll("128", "64");
                    useFavCitiesStore().updateCurrentCityFaved(this.cityFav);
                    console.log("fav: ", this.cityFav);
                    console.log("current: ", this.currentWeather);
                    console.log("forecast: ", this.forecast);

                } catch (error) {
                    console.error(error);
                }

            },
            async apiGetSearchCities(cityName: string): Promise<Array<CityDataResponse>>
            {
                let foundCities: Array<CityDataResponse> = [];
                const favCities = useFavCitiesStore();

                if (cityName === "")
                    return (foundCities);
                try {
                    const response = await axios.get(
                        this.baseUrl + "search.json", {
                            params: {
                                key: this.apiKey,
                                q: cityName,
                            }
                        }
                    );
                    for (let i = 0; i < response.data.length; ++i) {
                        foundCities.push({data: response.data[i],
                            fixedName: response.data[i].name.replaceAll("-", " ")});
                    }
                    for (let i = 0; i < favCities.favList.length; ++i) {
                        foundCities.push({data: favCities.favList[i],
                            fixedName: "[FAV] " + favCities.favList[i].name.replaceAll("-", " ")});
                    }
                } catch {

                }
                return (foundCities);
            },
            async apiGetCurrentWeather(apiQParameter: string)
            {
                let cityTmpName: string = this.cityTmpName;
                console.log(this.cityTmpName);
                try {
                    const response = await axios.get(
                        this.baseUrl + "current.json", {
                            params: {
                                key: this.apiKey,
                                q: apiQParameter,
                            }
                        }
                    );
                    this.currentWeather = response.data;
                    this.currentWeather.current.condition.icon = this.currentWeather.current.condition.icon.replaceAll("64", "128");
                } catch (error) {
                    console.error(error);
                }
                this.cityTmpName = cityTmpName;
            },
            async apiGetForecast(apiQParameter: string)
            {
                try {
                    const response = await axios.get(
                        this.baseUrl + "forecast.json", {
                            params: {
                                key: this.apiKey,
                                q: apiQParameter,
                                days: 14,
                            }
                        }
                    );
                    this.forecast = response.data;
                    this.getNext24Hours(this.forecast)
                } catch (error) {
                    console.error(error);
                }
            },
            async apiGetTempAndWeatherImg(apiQParameter: string): Promise<TempWeatherObj> {
                let weather: TempWeatherObj = {temp: 0, icon: ""};

                try {
                    const response = await axios.get(
                        this.baseUrl + "current.json", {
                            params: {
                                key: this.apiKey,
                                q: apiQParameter,
                            }
                        }
                    );
                    weather.temp = response.data.current.temp_c;
                    weather.icon = this.currentWeather.current.condition.icon;
                    return (weather)
                } catch (error) {
                    console.error(error);
                }
                return (weather);
            },
            clearStore(): void
            {
                this.cityName = "";
                this.cityTmpName = "";
                this.currentWeather = {};
                this.forecast = {};
                this.forecastHourly = [];
                useFavCitiesStore().updateCurrentCityFaved(this.cityFav);
            },
            getNext24Hours(forecastData: object)
            {
                let hourCount: number = 0;
                let forecastDay: object;
                let hour: object;
                this.forecastHourly = [];

                for (let i = 0; i < forecastData.forecast.forecastday.length; ++i) {
                    forecastDay = forecastData.forecast.forecastday[i];
                    for (let k = 0; k < forecastDay.hour.length; ++k) {
                        hour = forecastDay.hour[k];
                        if (Date.now() / 1000 < hour.time_epoch) {
                            this.forecastHourly.push(hour);
                            ++hourCount;
                        }
                        if (hourCount >= 24)
                            break;
                    }
                    if (hourCount >= 24)
                        break;
                }
            },
            latLonToString(latitude: number, longitude: number): string {
                return (latitude.toString() + "," + longitude.toString());
            },
            setCityTmpName(newString: string = "") {
                this.cityTmpName = newString;
            },
            setCityName(newString: string = "") {
                this.cityName = newString;
            }
        }
    }
);
