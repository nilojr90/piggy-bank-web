import React, { HTMLProps } from 'react';

import { Table } from './styles';

interface Transaction {
  id: string;
  title: string;
  value: number;
  formattedValue: string;
  formattedDate: string;
  type: 'income' | 'outcome';
  category: { title: string };
  created_at: Date;
}

interface TransactionListProps{
  list: Transaction[]
}


const TransactionList: React.FC<TransactionListProps> = ({list}: TransactionListProps) => {
  return <>
    <Table>
      <thead>
        <tr>
          <th>Título</th>
          <th>Preço</th>
          <th>Categoria</th>
          <th>Data</th>
        </tr>
      </thead>

      <tbody>{
        list.map((item) => (
          <tr key={item.id}>
            <td className="title">{item.title}</td>
            <td className={item.type}>{item.formattedValue}</td>
            <td> {item.category.title} </td>
            <td> {item.formattedDate} </td>
          </tr>)
        )
      }</tbody>
    </Table>
  </>
}

export default TransactionList;


