const URL ="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
let add=document.querySelectorAll(".mid select");
let con=document.querySelector(".convert");
let from=document.querySelector(".dropdown select");
let to=document.querySelector(".to select");
let m=document.querySelector(".conversion");
add.forEach( function(select){
  for(let  codes in countryList){
    let newoption = document.createElement("option");
    newoption.innerText = codes;
    newoption.value = codes;
    // console.log(newoption);
    if(select.name === "from" && codes === "USD"){
      newoption.selected="selected";
    }
    if(select.name === "to" && codes === "INR"){
      newoption.selected="selected";
    }
    select.append(newoption);
  } 
  select.addEventListener("change",(evt)=>{
    updatemap(evt.target);
  });
});

const updatemap=(element)=>{
  let codes = element.value;
  let countrycode= countryList[codes];
  let newsrc=`https://flagsapi.com/${countrycode}/shiny/64.png`;
  let img=element.parentElement.querySelector("img");
  img.src = newsrc;
};

con.addEventListener("click", async (evt)=>{
  evt.preventDefault();
  let amt=document.querySelector(".container input");
  // console.log(amt);
  let amtval=amt.value;
  // console.log(amtval);
  if(amtval === "" || amtval < 1){
    amtval=1;
    amt.value=1;
  }
  // console.log(from.value,to.value);
  const ur = `${URL}/${from.value.toLowerCase()}/${to.value.toLowerCase()}.json`;
  let response= await fetch(ur);
  // console.log(response);
  let data= await response.json();
  let rate=data[to.value.toLowerCase()];
  let final= amtval * rate;
  m.innerText=`${amtval} ${from.value} = ${final} ${to.value}`;
});
