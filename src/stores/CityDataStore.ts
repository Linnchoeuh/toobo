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

export type CityDataObject = {
    apiKey: string;
    baseUrl: string;
    cityName: string;
    city: APILocationData;
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
                city: {},
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
                            this.currentWeather.location.lon));
                    if (this.isCityDataSet()) {
                        this.cityName = this.city.name;
                    } else {
                        this.cityName = this.forecast.location.name;
                    }
                    this.cityFav.name = this.cityName;
                    this.cityFav.region = this.forecast.location.region;
                    this.cityFav.country = this.forecast.location.country;
                    this.cityFav.lat = this.forecast.location.lat;
                    this.cityFav.lon = this.forecast.location.lon;
                    useFavCitiesStore().updateCurrentCityFaved(this.cityFav);
                    // console.log("fav: ", this.cityFav);
                    // console.log("current: ", this.currentWeather);
                    // console.log("forecast: ", this.forecast);

                } catch (error) {
                    console.error(error);
                }

            },
            async apiGetSearchCities(cityName: string)
            {
                let foundCities: Array<CityDataResponse> = [];
                if (cityName === "")
                    return (foundCities);
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
                return (foundCities);
            },
            async apiGetCurrentWeather(apiQParameter: string)
            {
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
                    console.log("Weather", this.currentWeather);
                } catch (error) {
                    console.error(error);
                }
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
            async changeCity(newCityName: string)
            {
                let foundCities: Array<CityDataResponse> = [];

                if (newCityName === "")
                    return;
                if (!this.isCityDataSet()) {
                    foundCities = await this.apiGetSearchCities(newCityName);
                    if (foundCities.length === 0) {
                        this.cityName = "No city found";
                        this.city = {};
                        this.currentWeather = {};
                        this.forecast = {};
                        this.forecastHourly = [];
                        useFavCitiesStore().updateCurrentCityFaved(this.cityFav);
                        return;
                    }
                    this.city = foundCities[0].data;
                }
                this.updateAllWeatherData(this.latLonToString(this.city.lat, this.city.lon));
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
            setCityData(cityData: APILocationData)
            {
                this.city = cityData;
            },
            resetCityData()
            {
                this.setCityData({});
            },
            isCityDataSet()
            {
                for(var prop in this.city)
                    return true;
                return false;
            },
        }
    }
);
