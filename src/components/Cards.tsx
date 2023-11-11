import { useRef, useState } from 'react';
import { Card } from 'primereact/card';
import { Paginator } from 'primereact/paginator';
import { Avatar } from 'primereact/avatar';
import { Tag } from 'primereact/tag'
import { Badge } from 'primereact/badge'
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../store/store';
import { markAsRead } from '../store/eventReducer';


const statusBodyTemplate = (rowData) => {
  return <div><span className='span'>Важность: </span><Tag value={rowData.importance} severity={rowData.importance === 'Низкая' ? 'success' : rowData.importance === 'Высокая' ? "warning" : 'danger'} /></div>
}

const cardTitle = (c) => {
  return c.readed === false ?<Badge style={{position: 'absolute'}} value="Новое"></Badge>: <div></div>
}


export const Cards = () => {
  const data = useSelector((state: RootState)=> state.event.entities);
  const dispatch = useAppDispatch()

  const [first, setFirst] = useState(0);
  const itemsPerPage = 8;

  const onPageChange = (event) => {
    setFirst(event.first);
  };

  const cardRefs = useRef([]);

  const handleKeyDown = (event, index, item) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      dispatch(markAsRead(item.id ));

    }
    if (event.key === 'ArrowRight') {
      const nextIndex = index + 1 < itemsPerPage ? index + 1 : 0;
      if (cardRefs.current[nextIndex]) {
        cardRefs.current[nextIndex].focus();
      }
    }
    if (event.key === 'ArrowLeft') {
      const prevIndex = index - 1 >= 0 ? index - 1 : itemsPerPage - 1;
      if (cardRefs.current[prevIndex]) {
        cardRefs.current[prevIndex].focus();
      }
    }
  };

  const handleCardClick = (index) => {
    if (cardRefs.current[index]) {
      cardRefs.current[index].focus();
    }
  };

  const renderItems = () => {
    return data.slice(first, first + itemsPerPage).map((item, index) => (
        <Card
          style={{ position: 'relative', margin: '10px 0' }}
          title={cardTitle(item)}
          className={item.readed ? 'cardel' : 'unread cardel'}
          tabIndex="0"
          ref={(el) => (cardRefs.current[index] = el)}
          onKeyDown={(e) => handleKeyDown(e, index, item)}
          onClick={() => handleCardClick(index)}

        >
         <div className="card flex justify-content-between">
             <div>
               <p><span className='span'>Дата: </span>{item.date} </p>
               {statusBodyTemplate(item)}
               <p><span className='span'>Оборудование: </span>{item.equip} </p>
               <p><span className='span'>Сообщение: </span>{item.message} </p>
             </div>

             <div style={{ textAlign: 'center' }}>
               <Avatar icon="pi pi-user" size="xlarge" shape="circle" />
               <p>{item.resp} </p>
            </div>
           </div>
         </Card>
    ));
  };

  return (
    <div>
      <div className="cards" style={{ marginTop: '40px' }}>
        {renderItems()}
      </div>

      <Paginator first={first} rows={itemsPerPage} totalRecords={data.length} onPageChange={onPageChange} />
    </div>
  );
};
