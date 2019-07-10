import { createStore } from 'redux';


function reducer() {

  return  [
    {
      id: 1,
      type: 'RG',
      status: 'Aproved'
    },
    {
      id: 2,
      type: 'CPF',
      status: 'Waiting Aprovation'
    }
  ];

}


const store = createStore(reducer);


export  default store;