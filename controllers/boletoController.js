function isNumber(text) {
  return !isNaN(parseFloat(text)) && isFinite(text);
}

function bankLineValidation(line) {  
  let dataVencimento = new Date(1997, 9, 7);

  const campo1 = line.substr(0, 9);
  const dvCampo1 = line.substr(9, 1);
  const campo2 = line.substr(10, 10);
  const dvCampo2 = line.substr(20, 1);
  const campo3 = line.substr(21, 10);
  const dvCampo3 = line.substr(31, 1);


  const barCodePart1 = line.substr(0, 4);  // numero do banco
  const barCodePart2 = line.substr(32, 1); // digito verificador geral
  const barCodePart3 = line.substr(33, 4); // dias de vencimento
  const barCodePart4 = line.substr(37, 10); // valor do boleto
  const barCodePart5 = line.substr(4, 5); // 
  const barCodePart6 = line.substr(10, 10); // 
  const barCodePart7 = line.substr(21, 10); // 
  const barCode = barCodePart1 + barCodePart2 + barCodePart3 + barCodePart4 + barCodePart5 + barCodePart6 + barCodePart7;
  

  const arrCampo1 = campo1.split('');
  const arrCampo2 = campo2.split('');
  const arrCampo3 = campo3.split('');

  let amountCampo1 = [];
  let amountCampo2 = [];
  let amountCampo3 = [];

  arrCampo1.forEach((number, index) => {
    if (index % 2 == 0) {
      const newNumber = Number(number) * 2;
      if (newNumber > 9) {
        const strNumber = newNumber.toString();
        const arrNumber = strNumber.split('');

        amountCampo1.push(parseInt(arrNumber[0]));
        amountCampo1.push(parseInt(arrNumber[1]));
      } else {
        amountCampo1.push(newNumber);
      }

    } else {
      const newNumber = Number(number) * 1;
      amountCampo1.push(newNumber);
    }
  });
  
  arrCampo2.forEach((number, index) => {
    if (index % 2 != 0) {
      const newNumber = Number(number) * 2;
      if (newNumber > 9) {
        const strNumber = newNumber.toString();
        const arrNumber = strNumber.split('');

        amountCampo2.push(parseInt(arrNumber[0]));
        amountCampo2.push(parseInt(arrNumber[1]));
      } else {
        amountCampo2.push(newNumber);
      }

    } else {
      const newNumber = Number(number) * 1;
      amountCampo2.push(newNumber);
    }
  });
  
  arrCampo3.forEach((number, index) => {
    if (index % 2 != 0) {
      const newNumber = Number(number) * 2;
      if (newNumber > 9) {
        const strNumber = newNumber.toString();
        const arrNumber = strNumber.split('');

        amountCampo3.push(parseInt(arrNumber[0]));
        amountCampo3.push(parseInt(arrNumber[1]));
      } else {
        amountCampo3.push(newNumber);
      }

    } else {
      const newNumber2 = Number(number) * 1;
      amountCampo3.push(newNumber2);
    }
  });

  let sumCampo1 = 0; 
  let sumCampo2 = 0; 
  let sumCampo3 = 0; 

  amountCampo1.forEach((value) => sumCampo1 += value);
  amountCampo2.forEach((value) => sumCampo2 += value);
  amountCampo3.forEach((value) => sumCampo3 += value);

  let nextDecimalCampo1 = 0;
  let nextDecimalCampo2 = 0;
  let nextDecimalCampo3 = 0;

  const arrSumCampo1 = sumCampo1.toString().split('');
  nextDecimalCampo1 = (Number(arrSumCampo1[0])+1) * 10;
  
  const arrSumCampo2 = sumCampo2.toString().split('');
  nextDecimalCampo2 = (Number(arrSumCampo2[0])+1) * 10;
  
  const arrSumCampo3 = sumCampo3.toString().split('');
  nextDecimalCampo3 = (Number(arrSumCampo3[0])+1) * 10;

  const digitoCampo1 = (nextDecimalCampo1 - sumCampo1).toString();
  const digitoCampo2 = (nextDecimalCampo2 - sumCampo2).toString();
  const digitoCampo3 = (nextDecimalCampo3 - sumCampo3).toString();

  const isValidateCampo1 = digitoCampo1 == dvCampo1;
  const isValidateCampo2 = digitoCampo2 == dvCampo2;
  const isValidateCampo3 = digitoCampo3 == dvCampo3;

  // Calculando data de vencimento em cima do fator
  const fatorVencimento = Number(barCodePart3);
  dataVencimento.setDate(dataVencimento.getDate() + fatorVencimento);
  const year = dataVencimento.getFullYear().toString();
  let month = (dataVencimento.getMonth() + 1).toString();
  month = month.length == 1 ? '0' + month : month;
  let day = dataVencimento.getDate().toString();
  day = day.length == 1 ? '0' + day : day;
  const expirationDate = `${year}-${month}-${day}`;

  // Calculando valor do boleto
  let valorBoleto = Number(barCodePart4).toString();
  let amount = '';
  let count = valorBoleto.length;
  let substring1 = valorBoleto.substr(0, count-2);
  let substring2 = valorBoleto.substr(count - 2, 2);
  amount = substring1 + '.' + substring2;  

  return {
    campo1,
    dvCampo1,
    sumCampo1,
    nextDecimalCampo1,
    digitoCampo1,
    isValidateCampo1,

    campo2,
    dvCampo2,
    sumCampo2,
    nextDecimalCampo2,
    digitoCampo2,
    isValidateCampo2,

    campo3,
    dvCampo3,
    sumCampo3,
    nextDecimalCampo3,
    digitoCampo3,
    isValidateCampo3,

    barCode,
    barCodeCount: barCode.length,
    expirationDate,
    amount
  }
}


module.exports = {
  async findOne(req, res) {
    try {
      const bar = req.params.barCode;
      
      const containsJustNumbers = isNumber(bar);
      if (!containsJustNumbers) throw Error("A linha digitável deve conter apenas números, por favor verifique!");

      if (bar.length == 47) {
        const result = bankLineValidation(bar);
        if (!result.isValidateCampo1) throw Error("Digito verificador 1 não confere, por favor verifique!");
        if (!result.isValidateCampo2) throw Error("Digito verificador 2 não confere, por favor verifique!");
        if (!result.isValidateCampo3) throw Error("Digito verificador 3 não confere, por favor verifique!");
        
        const { barCode, amount, expirationDate } = result;
  
        const data = {
          // data: bankLineValidation(bar),
          barCode,
          amount,
          expirationDate
        }
        res.status(200).send(data);
      } 
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  }
};
