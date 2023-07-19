import { defineStore } from 'pinia'
import axios from "axios"

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

export type CityDataResponse = {
    data: APILocationData;
    fixedName: string;
}

export const useCityDataStore = defineStore(
    "CityData",
    {
        state: () => {
            return {
                apiKey: "7abe50900eba444fa02192358230307",
                baseUrl: "http://api.weatherapi.com/v1/",
                cityName: "No city selected",
                ip: "0.0.0.0",
                city: {},
                currentWeather: {},
                forecast: {},
                forecastHourly: [],
            };
        },

        actions: {
            async refreshWeatherWithIp()
            {
                try {
                    const response = await axios.get("https://api.ipify.org?format=json");
                    this.ip = response.data.ip;
                    await this.apiGetCurrentWeather(this.ip);
                    this.cityName = this.currentWeather.location.name;
                    this.apiGetForecast(this.ip);
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
                let formatedLatLonString: string;
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
                        return;
                    }
                    this.city = foundCities[0].data;
                }
                this.cityName = this.city.name;
                formatedLatLonString = this.city.lat.toString() + "," + this.city.lon.toString();
                this.apiGetCurrentWeather(formatedLatLonString);
                this.apiGetForecast(formatedLatLonString);
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
            setCityData(cityData: object)
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
