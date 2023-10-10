function formatRupiah(number) {
  let strNumber = String(number).replace(/^-/, "");
  let groups = [];
  while (strNumber.length > 3) {
    groups.unshift(strNumber.slice(-3));
    strNumber = strNumber.slice(0, -3);
  }
  groups.unshift(strNumber);
  let formattedNumber = groups.join(".");
  return `Rp ${formattedNumber}`;
}

export default formatRupiah;
