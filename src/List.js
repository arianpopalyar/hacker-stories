import React from 'react';
import { ReactComponent as Check } from './img/check.svg';
import downArrow from './img/download.png';

import upload from './img/upload.png';
import { sortBy } from 'lodash';

const Download = () => <img src={downArrow} class="pngStyle" />
// eslint-disable-next-line jsx-a11y/alt-text
const UpArrow = () => <img src={upload} class="pngStyle" />

const SORTS = {
    NONE: list => list,
    TITLE: list => sortBy(list, 'title'),
    AUTHOR: list => sortBy(list, 'author'),
    COMMENT: list => sortBy(list, 'num_comments').reverse(),
    POINTS: list => sortBy(list, 'points').reverse(),
};

const List = ({ list, onRemoveItem }) => {
    const [sort, setSort] = React.useState({
        sortKey: 'NONE',
        isReverse: false
    });
    const handleSort = sortKey => {
        const isReverse = sort.sortKey === sortKey && !sort.isReverse;
        setSort({ sortKey, isReverse });
    };

    const sortFunction = SORTS[sort.sortKey];
    const sortedList = sort.isReverse ? sortFunction(list).reverse():sortFunction(list);

    return(
    <div>
        <div style={{display: 'flex'}} class="titleRow">
            <span style={{width: '40%'}}>
                <button type="button" onClick={() => handleSort('TITLE')}>
                Title {sort.isReverse?<Download/>:<UpArrow/>}      
                </button>
            </span>
            <span style={{width: '30%'}}>
                <button type="button" onClick={() => handleSort('AUTHOR')}>
                    Author {sort.isReverse?<Download />:<UpArrow/>}
                </button>
            </span>
            <span style={{width: '10%'}}>
                <button type="button" onClick={() => handleSort('COMMENTS')}>
                    Comments {sort.isReverse?<Download />:<UpArrow />}
                </button>
            </span>
            <span style={{width: '10%'}}>
                <button  type="button" onClick={() => handleSort('POINTS')}>
                    Points {sort.isReverse?<Download />:<UpArrow />}
                </button>
            </span>
            <span style={{ width: '10%' }}>Actions</span>
        </div>  

        {sortedList.map(item => (
        <Item
          key={item.objectID}
          item={item}
          onRemoveItem={onRemoveItem}
        />
      ))}
    </div>);
};

const Item = ({ item, onRemoveItem }) => (
<div className="item">
  <span style={{ width: '40%' }}>
    <a href={item.url}>{item.title}</a>
  </span>
  <span style={{ width: '30%' }}>{item.author}</span>
  <span style={{ width: '10%' }}>{item.num_comments}</span>
  <span style={{ width: '10%' }}>{item.points}</span>
  <span style={{ width: '10%' }}>
    <button
      type="button"
      onClick={() => onRemoveItem(item)}
      className="button button_small"
    >
      <Check height="18px" width="18px" />
    </button>
  </span>
</div>
);

export default List;