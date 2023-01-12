import { atom, selector } from 'recoil';

import  WeatherApi from './apis/weather_api';


export const cityState = atom({
    key: 'cityState',
    default: 'Antwerp',
});

export const weatherForecastQuery = selector({
    key: 'weatherForecastQuery',
    get: async({get}) => {
        const result = await WeatherApi.getWeather(get(cityState));
        return result.data.list;
    }
});


export const textState = atom({
    key: 'textState',
    default: 'This is a Text',
});

export const textSizeState = selector({
    key: 'textSizeState',
    get: ({get}) => {
        const text = get(textState);
        return text.length;
    },
});

export const todoListState = atom({
    key: 'todoListState',
    default: [{ id: 1, text: "Study React JS", isCompleted: true },
    { id: 2, text: "Practice Recoil State Management", isCompleted: false }]
});

export const todoListFilterState = atom({
    key: 'todoListFilterState',
    default: 'Show All',
});

export const todoListFilteredState = selector({
    key: 'todoListFilteredState',
    get: ({ get }) => {
        const filter = get(todoListFilterState);
        const list = get(todoListState);

        switch (filter) {
            case 'Show Completed':
                return list.filter((item) => item.isCompleted === true);
            case 'Show Uncompleted':
                return list.filter((item) => item.isCompleted === false);

            default:
                return list;
        }
    }
});

export const todoListStatsState = selector({
    key: 'todoListStatsState',
    get: ({ get }) => {
        const todoList = get(todoListState);
        const totalNum = todoList.length;
        const totalCompletedNum = todoList.filter((item) => item.isCompleted === true).length;
        const totalUncompletedNum = totalNum - totalCompletedNum;
        const percentCompleted = Math.round(totalNum === 0 ? 0 : totalCompletedNum / totalNum * 100);

        return {
            totalNum,
            totalCompletedNum,
            totalUncompletedNum,
            percentCompleted,
        }
    },
});