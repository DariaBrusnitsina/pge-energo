import { createSlice } from "@reduxjs/toolkit";
// import { Dispatch } from "redux";
// import { RootState } from "./store";

const products = [
  {"id": 1, "date": "21.10.2023, 19:30:36 ", "importance": "Высокая", "equip": "Вегас","message": "Сервер Vegas недоступен","resp": "Смирнов В.А.", "readed": false},
  {"id": 2, "date": "25.10.2023, 12:34:04 ", "importance": "Низкая", "equip": "Коммутатор","message": "Потеряно сетевое соединение","resp": "Капустин С.С.", "readed": true},
  {"id": 3, "date": "11.11.2023, 16:27:36 ", "importance": "Низкая", "equip": "Люк","message": "Открыта крышка","resp": "Ветрова И.С.", "readed": false},
  {"id": 4, "date": "11.11.2023, 19:17:46 ", "importance": "Высокая", "equip": "ИБП","message": "Низкий заряд батареи","resp": "Лавочкин А.В.", "readed": true},
]

interface IEvents {
  id: number,
  date: string; importance: string; equip: string; message: string; resp: string; readed: boolean
}

interface eventsState {
  entities: IEvents[];
}

const initialState: eventsState = {
  entities: products,
};

const postsSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    markAsRead: (state, action) => {
      const  itemId  = action.payload;
      console.log(itemId);
      state.entities = state.entities.map(item =>
        item.id === itemId ? { ...item, readed: true } : item
      );
    },
    addEvent: (state, action) => {
      state.entities.push(action.payload);
    },
}});

export const {
  markAsRead,
  addEvent
} = postsSlice.actions;
export default postsSlice.reducer;
