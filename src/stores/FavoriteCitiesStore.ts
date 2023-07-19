import { defineStore } from 'pinia'

export const useFavCitiesStore = defineStore(
    "FavCities",
    {
        state: () => {
            return {
                showFavTab: false,
                favList: [],
            };
        },

        actions: {
            toggleFavTab() {
                this.showFavTab = !this.showFavTab;
            },
            setFavTabDisplay(show: boolean) {
                this.showFavTab = show;
            }
        }
    }
);
