import React, { useState, useEffect} from 'react';

import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';
import total from '../../assets/total.svg';

import api from '../../services/api';

import Header from '../../components/Header';

import formatValue from '../../utils/formatValue';
import formatDate from '../../utils/formatDate';

import { Container, CardContainer, Card, TableContainer } from './styles';

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

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<Balance>({} as Balance);

  useEffect(() => {
    async function loadTransactions(): Promise<void> {
      const response = await api.get("transactions");

      response.data.transactions.map((item:Transaction)=>{

        item.formattedValue =
        (item.type === "outcome" ?"- ":"")
        + formatValue(item.value);

        item.formattedDate =  formatDate(new Date(item.created_at));
      });

      setTransactions(response.data.transactions);
      setBalance(response.data.balance as Balance);
    }

    loadTransactions();
  }, []);


  return (
    <>
      <Header />
      <Container>
        <CardContainer>
          <Card>
            <header>
              <p>Entradas</p>
              <img src={income} alt="Income" />
            </header>
            <h1 data-testid="balance-income">{`${formatValue(balance.income)}`}</h1>
          </Card>
          <Card>
            <header>
              <p>Saídas</p>
              <img src={outcome} alt="Outcome" />
            </header>
            <h1 data-testid="balance-outcome">{`${formatValue(balance.outcome)}`}</h1>
          </Card>
          <Card total>
            <header>
              <p>Total</p>
              <img src={total} alt="Total" />
            </header>
            <h1 data-testid="balance-total">{`${formatValue(balance.total)}`}</h1>
          </Card>
        </CardContainer>

        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Preço</th>
                <th>Categoria</th>
                <th>Data</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((
                {id,
                type,
                title,
                category,
                formattedDate,
                formattedValue})=>(

                <tr key={id}>
                  <td className="title">{title}</td>
                  <td className={type}>{formattedValue}</td>
                  <td>{category.title}</td>
                  <td>{formattedDate}</td>
                </tr>

              ))}
            </tbody>
          </table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Dashboard;
