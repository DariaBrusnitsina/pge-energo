
import { useState } from "react";
import 'primereact/resources/primereact.css';                       // core css
import { Button } from "primereact/button";
import { Table } from "./Table";
import { Cards } from "./Cards";

export function BasicDemo() {
    const options: string[] = ['table', 'cards'];
    const [value, setValue] = useState<string>(options[0]);

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

        {value === 'table' ? <Table/> : <Cards />}
      </>
    );
}