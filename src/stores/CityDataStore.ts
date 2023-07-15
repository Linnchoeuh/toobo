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
            };
        },

        actions: {
            async refreshWeatherWithIp()
            {
                try {
                    let foundCities: Array<CityDataResponse> = [];
                    const response = await axios.get("https://api.ipify.org?format=json");
                    this.ip = response.data.ip;
                    await this.apiGetCurrentWeather(this.ip);
                    this.cityName = this.currentWeather.location.name;
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
                    console.log("Current weather:", this.currentWeather);
                } catch (error) {
                    console.error(error);
                }
            },
            async changeCity(newCityName: string)
            {
                let foundCities: Array<CityDataResponse> = [];

                if (!this.isCityDataSet()) {
                    foundCities = await this.apiGetSearchCities(newCityName);
                    if (foundCities.length === 0) {
                        this.cityName = "No city found";
                        return;
                    }
                    this.city = foundCities[0].data;
                }
                console.log(this.city);
                this.cityName = this.city.name;
                this.apiGetCurrentWeather(this.city.lat.toString() +
                    "," + this.city.lon.toString())
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
