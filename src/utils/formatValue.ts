const formatValue = (value: number): string =>{
  if(isNaN(value)){
    return "-"
  }

  return Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
  .format(value);
}

export default formatValue;
