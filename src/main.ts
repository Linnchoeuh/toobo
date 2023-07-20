import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { useFavCitiesStore } from "@/stores/FavoriteCitiesStore"
import { useCityDataStore } from "@/stores/CityDataStore"

const pinia = createPinia();
const app = createApp(App);
app.use(pinia);

useFavCitiesStore().loadFavoriteCities();
useCityDataStore().updateAllWeatherData();

app.mount('#app')
