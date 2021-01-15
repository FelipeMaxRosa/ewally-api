function barCodeValidate(barCode) {
  const bar = barCode.split('');

  // 44 digitos
  const campo1 = []; // 0 - 10 chars
  const campo2 = []; // 10, 11 chars
  const campo3 = []; // 
  const campo4 = [];
  const campo5 = [];

  bar.forEach((num, index) => {
    if (index < 10) campo1.push(num);
    if (index >= 10 && index < 21) campo2.push(num);
    if (index >= 21 && index < 31) campo3.push(num);
    if (index == 22) campo4.push(num);
    if (index > 22) campo5.push(num);
  })


  return { campo1, campo2, campo3, campo4, campo5 };
}


module.exports = {
  async findOne(req, res) {
    try {
      const bar = req.params.barCode;
      if (!bar) throw Error("Client not found!");

      const data = {
        barCode: barCodeValidate(bar),
        length: bar.length,
        amount: "20.00",
        expirationDate: "2018-07-16"
      }
      res.status(200).send(data);
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  }
};
