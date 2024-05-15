const myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer APP_USR-6126914897620141-051514-367fbd063f9fe5a958dbebcb9f88b442-264160520");

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

fetch("https://api.mercadolibre.com/products/MLB19791178", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));