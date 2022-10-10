import { chance } from './Chance';
import { environment } from 'src/environments/environment';

// See https://chancejs.com/ for random generation

export interface MockGenerator<T> {
    single(key?: string): T;
    singleFromIndex(index: number): T;
    multiple(count?: number, offset?: number): Array<T>;
    singleId(index?: number): string;
    multipleIds(count?: number, offset?: number): Array<string>;
    clear(): void;
}

export const allMockGenerators: { [key: string]: MockGenerator<any> } = {};

export const clearAllMockGenerators = () => {
    for (const key in allMockGenerators) {
        if (allMockGenerators.hasOwnProperty(key)) {
            allMockGenerators[key].clear();
        }
    }
};

declare const window: any;
window.clearMocks = () => { clearAllMockGenerators(); };

export function makeMockGenerator<T>(
        typeid: string,
        keyIndex: string,
        generateSingle: () => T,
    ): MockGenerator<T> {

    const generatorClass = class {

        static savedMockData: { [key: string]: T } = null;

        static savedMockDataIds: Array<any> = null;

        private constructor(){} // Non instanceable

        static get lskey(): string { return '_mock_' + typeid; }
        static get lskeyIds(): string { return '_mock.id_' + typeid; }

        static get generateMockOnIdCacheMiss(): boolean {
            return environment?.generateMockOnIdCacheMiss;
        }



        static clear() {
            try {
                localStorage.removeItem(this.lskey);
                localStorage.removeItem(this.lskeyIds);
                this.savedMockData = null;
                this.savedMockDataIds = null;
            } catch (error) { }
        }

        static singleFromIndex(index: number): T {
            if (!this.savedMockData) {
                this.loadFromLocalStorage();
            }
            index = index ? index : 0;
            if (!this.savedMockDataIds[index]) {
                if (index > 0) {
                    this.singleFromIndex(index - 1);
                }
                this.savedMockDataIds[index] = this.addItemToLocalStorage(null);
                this.saveToLocalStorage();
            }
            const key = this.savedMockDataIds[index];
            return JSON.parse(JSON.stringify(this.savedMockData[key]));
        }

        static single(key?: string): T {
            if (!key) {
                return this.singleFromIndex(0);
            }
            if (!this.savedMockData) {
                this.loadFromLocalStorage();
            }
            if (!this.savedMockData[key]) {
                if (!environment.generateMockOnIdCacheMiss) {
                    throw new Error(`404 Not Found (mock: ${typeid}/${key})`);
                }
                this.addItemToLocalStorage(key);
                this.savedMockDataIds.push(key);
                this.saveToLocalStorage();
            }
            return JSON.parse(JSON.stringify(this.savedMockData[key]));
        }

        static multiple(count?: number, offset?: number): Array<T> {
            count = count ? count : chance.integer({ min: 0, max: 10 });
            let nums = Array(count).fill(null);
            if (offset) {
                nums = nums.map(x => x + offset);
            }
            return nums.map((_, i) => this.singleFromIndex(i));
        }

        static singleId(index?: number) {
            return this.singleFromIndex(index)[keyIndex];
        }

        static multipleIds(count?: number, offset?: number) {
            return this.multiple(count, offset).map(x => x[keyIndex]);
        }

        private static loadFromLocalStorage() {
            const json = localStorage.getItem(this.lskey);
            const jsonids = localStorage.getItem(this.lskeyIds);
            if (json && jsonids) {
                try {
                    this.savedMockData = JSON.parse(json);
                    this.savedMockDataIds = JSON.parse(jsonids);
                } catch (error) {
                    this.savedMockData = {};
                    this.savedMockDataIds  = [];
                }
            } else {
                this.savedMockData = {};
                this.savedMockDataIds = [];
            }
        }
        private static saveToLocalStorage() {
            try {
                localStorage.setItem(this.lskey, JSON.stringify(this.savedMockData));
                localStorage.setItem(this.lskeyIds, JSON.stringify(this.savedMockDataIds));
            } catch (error) { }
        }

        private static addItemToLocalStorage(key?: string): string {
            const item = generateSingle();
            if (key) {
                item[keyIndex] = key;
            } else {
                key = item[keyIndex];
            }
            this.savedMockData[key] = item;
            return key;
        }
    };

    allMockGenerators[typeid] = generatorClass;
    return generatorClass;
}


