import { defineStore } from 'pinia'

type CSSResponseFunctionType = () => boolean;

export type CSSRespData = {
    calledOnce: boolean;
    functionList: Array<CSSResponseFunctionType>
}

export const useCSSResponsiveStore = defineStore(
    "CssResponsive",
    {
        state: (): CSSRespData => {
            return {
                calledOnce: false,
                functionList: [],
            };
        },

        actions: {
            callFunctions(): void {
                for (let i = 0; i < this.functionList.length; ++i) {
                    this.functionList[i]();
                }
            },
            async callFunctionsOnce() {
                if (!this.calledOnce)
                    this.callFunctions();
                this.calledOnce = true;
            },
            async callFunctionsAsync() {
                this.callFunctions();
            },
            addFunction(functionRef: CSSResponseFunctionType): void {
                this.functionList.push(functionRef);
                this.callFunctionsAsync();
            },
            /**
             * Call this function after having mounted your app. (app.mount('#app'))
             */
            async init() {
                window.onresize = this.callFunctionsAsync;
                window.onclick = this.callFunctionsAsync;
                window.onmousemove = this.callFunctionsAsync; // To modify
                // this.callFunctionsRetry();
            }
        }
    }
);
