
import 'primereact/resources/primereact.css';                       // core css

import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Table } from "./Table";
import { Cards } from "./Cards";
import { useAppDispatch } from '../store/store';
import { addEvent } from '../store/eventReducer';

export function Layout() {
    const options: string[] = ['table', 'cards'];
    const [value, setValue] = useState<string>(options[0]);
    const dispatch = useAppDispatch()

    const [elements] = useState([
      {"id": 5, "importance": "Критическая", "equip": "Трансформатор","message": "Недостаточное количество масла","resp": "Ольшанская Е.Г."},
      {"id": 6, "importance": "Низкая", "equip": "АПУ","message": "Обрыв силового кабеля","resp": "Ветрова И.С."},
      {"id": 7, "importance": "Высокая", "equip": "САВП","message": "Отсутствует подтвердление пуска на работу","resp": "Смирнов В.А."},
      {"id": 8, "importance": "Низкая", "equip": "Компрессор", "message": "Шум при работе", "resp": "Петров А.И."},
      {"id": 9, "importance": "Критическая", "equip": "Насос", "message": "Протечка", "resp": "Сидоров К.П."},
      {"id": 10, "importance": "Высокая", "equip": "Вентиляция", "message": "Запотевание стекол", "resp": "Иванова Л.М."}
    ]);

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
      const intervalId = setInterval(() => {
        if (currentIndex < elements.length) {
          const currentDate = new Date().toLocaleString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          });
          const elementWithDate = { ...elements[currentIndex], date: currentDate, readed: false };
          dispatch(addEvent(elementWithDate));
          setCurrentIndex(prevIndex => prevIndex + 1);
        } else {
          clearInterval(intervalId);
        }
      }, 5000);

      return () => clearInterval(intervalId);
    }, [dispatch, elements, currentIndex]);

    return (
      <>
        <span className="p-buttonset">
          <Button
            label="Таблица"
            onClick={(e ) => setValue('table')}
            className={value === 'table' ? "p-button-raised" : "p-button-raised p-button-text"} />

          <Button
            label="Карточки"
            onClick={(e ) => setValue('cards')}
            className={value === 'cards' ? "p-button-raised" : "p-button-raised p-button-text"} />
        </span>

        {value === 'table' ? <Table /> : <Cards />}
      </>
    );
}