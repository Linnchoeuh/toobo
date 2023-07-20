import { defineStore } from 'pinia'
import { useCityDataStore } from "@/stores/CityDataStore"
import type { TempWeatherObj } from "@/stores/CityDataStore"

export type CityFavData = {
    name: string;
    region: string;
    country: string;
    lon: number;
    lat: number;
    temp: number;
    icon: string;
}

export type FavCitiesObject = {
    showFavTab: boolean;
    currentCityFaved: boolean;
    favList: Array<CityFavData>;
}

export const useFavCitiesStore = defineStore(
    "FavCities",
    {
        state: (): FavCitiesObject => {
            return {
                showFavTab: false,
                currentCityFaved: false,
                favList: [],
            };
        },

        actions: {
            toggleFavTab(): void {
                this.showFavTab = !this.showFavTab;
                if (this.showFavTab) {
                    this.refreshFavList();
                }
            },
            setFavTabDisplay(show: boolean): void {
                this.showFavTab = show;
            },
            findFavCityIndex(name: string, region: string, country: string): number {
                let favCityObj: CityFavData;

                // console.log(this.favList.length, this.favList,
                //     "Search: ", name, region, country);
                for (let i: number = 0; i < this.favList.length; ++i) {
                    favCityObj = this.favList[i];
                    if (name === favCityObj.name &&
                    region === favCityObj.region &&
                    country === favCityObj.country) {
                        return (i);
                    }
                }
                return (-1);
            },
            addFavorite(favCityObj: CityFavData): void {
                console.log(favCityObj);
                let favCityObjCpy: CityFavData = {
                    name: favCityObj.name,
                    region: favCityObj.region,
                    country: favCityObj.country,
                    lat: favCityObj.lat,
                    lon: favCityObj.lon,
                    temp: favCityObj.temp,
                    icon: favCityObj.icon,
                }
                if (!this.isCityInFav(favCityObj)) {
                    this.currentCityFaved = true;
                    this.favList.push(favCityObjCpy);
                }
            },
            removeFavorite(name: string, region: string, country: string): void {
                let index: number = this.findFavCityIndex(name, region, country);

                if (index >= 0) {
                    this.favList.splice(index, 1);
                    this.currentCityFaved = false;
                }
            },
            isCityInFav(favCityObj: CityFavData): boolean {
                return (this.findFavCityIndex(favCityObj.name, favCityObj.region, favCityObj.country) !== -1);
            },
            updateCurrentCityFaved(favCityObj: CityFavData): void {
                this.currentCityFaved = this.isCityInFav(favCityObj);
            },
            async refreshFavList() {
                let favCityObj: CityFavData;
                let weather: TempWeatherObj = {temp: 0, icon: ""};

                for (let i: number = 0; i < this.favList.length; ++i) {
                    favCityObj = this.favList[i];
                    weather = await useCityDataStore().apiGetTempAndWeatherImg(
                        useCityDataStore().latLonToString(favCityObj.lat, favCityObj.lon)
                    );
                    favCityObj.temp = weather.temp;
                    favCityObj.icon = weather.icon.replaceAll("128", "64");;
                }
            }
        }
    }
);
