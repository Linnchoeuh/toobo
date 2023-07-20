import { defineStore } from 'pinia'
import { useCityDataStore } from "@/stores/CityDataStore"
import type { TempWeatherObj } from "@/stores/CityDataStore"
import Cookies from 'js-cookie';

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
            loadFavoriteCities(): void {
                const myCookieValue = Cookies.get('FavCities');
                this.favList = JSON.parse(myCookieValue);
                // console.log("Cookie? ", this.favList); // Output: 'cookieValue'
            },
            saveFavoriteCities(): void {
                Cookies.set("FavCities", JSON.stringify(this.favList), {expires: 36500, Samesite: "Lax"});
            },
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
                    this.saveFavoriteCities();
                }
            },
            removeFavorite(name: string, region: string, country: string): void {
                let index: number = this.findFavCityIndex(name, region, country);

                if (index >= 0) {
                    this.favList.splice(index, 1);
                    this.currentCityFaved = false;
                    this.saveFavoriteCities();
                }
            },
            isCityInFav(favCityObj: CityFavData): boolean {
                return (this.findFavCityIndex(favCityObj.name, favCityObj.region, favCityObj.country) !== -1);
            },
            updateCurrentCityFaved(favCityObj: CityFavData): void {
                this.currentCityFaved = this.isCityInFav(favCityObj);
            },
            async refreshFavList() {
                let weather: TempWeatherObj = {temp: 0, icon: ""};

                for (let i: number = 0; i < this.favList.length; ++i) {
                    weather = await useCityDataStore().apiGetTempAndWeatherImg(
                        useCityDataStore().latLonToString(this.favList[i].lat, this.favList[i].lon)
                    );
                    this.favList[i].temp = weather.temp;
                    this.favList[i].icon = weather.icon.replaceAll("128", "64");
                }
            }
        }
    }
);
