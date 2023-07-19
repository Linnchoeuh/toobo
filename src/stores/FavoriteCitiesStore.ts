import { defineStore } from 'pinia'

export type CityFavData = {
    name: string;
    region: string;
    country: string;
    lon: number;
    lat: number;
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
            },
            setFavTabDisplay(show: boolean): void {
                this.showFavTab = show;
            },
            findFavCityIndex(name: string, region: string, country: string): number {
                let favCityObj: CityFavData;

                console.log(this.favList.length, this.favList,
                    "Search: ", name, region, country);
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
                    lon: favCityObj.lon
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
            }
        }
    }
);
