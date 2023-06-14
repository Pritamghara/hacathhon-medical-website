
let searchel=document.getElementById("search")
let formel=document.querySelector("form")
let datael=document.getElementById("data")
let medel=document.getElementById("medname")


async function getmeddata(med){
fetch('./Medicines_output_european_public_assessment_reports.xlsx')
  .then(function(response) {
    return response.arrayBuffer();
  })
  .then(function(buffer) {
    var data = new Uint8Array(buffer);
    var workbook = XLSX.read(data, { type: 'array' });
    var sheetName = workbook.SheetNames[0];
    var worksheet = workbook.Sheets[sheetName];
    var jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    let k=9;
    while(true){
    let n=jsonData[k][2];
    let res=n.indexOf(med)
    
    // datael.querySelector(".category").textcontent=`CATEGORY :${jsonData[k][1]}`
    let category=document.getElementById("category")
    category.innerHTML=`CATEGORY :${jsonData[k][0].toUpperCase()}`

    if(res>=0){
     
      medname.innerHTML=`${jsonData[k][1].toUpperCase()}`
      let category=document.getElementById("category")
      category.innerHTML=`CATEGORY :${jsonData[k][0].toUpperCase()}`
      let substance=document.getElementById("substance")
      substance.innerHTML=`SUBSTANCE :${jsonData[k][4].toUpperCase()}`
      let auth=document.getElementById("auth")
      auth.innerHTML=`AUTHORIZATION STATUS :${jsonData[k][7].toUpperCase()}`
      let gen=document.getElementById("gen")
      gen.innerHTML=`GENRIC STATUS:${jsonData[k][10].toUpperCase()}`
      let bio=document.getElementById("bio")
      bio.innerHTML=`BIOSIMILAR STATUS :${jsonData[k][11].toUpperCase()}`
      let use=document.getElementById("use")
      use.innerHTML=`USES :${jsonData[k][19].toUpperCase()}`
      let inn=document.getElementById("inn")
      inn.innerHTML=`SIMILAR MEDICINE :${jsonData[k][3].toUpperCase()}`
      
      let company=document.getElementById("company")
      company.innerHTML=`COMPANY NAME :${jsonData[k][18].toUpperCase()}`

      
      break
      
    }
    k++;
    
    
    
  }
    
  })
  .catch(function(error) {
    console.log('Error fetching Excel file:', error);
  });

}


formel.addEventListener(("submit"),(event)=>{
  event.preventDefault()
  const medvalue=searchel.value;
  console.log(medvalue)
  let value=capitalize(medvalue)

  getmeddata(value);

})


function capitalize(value) {
  return (value[0].toUpperCase()+value.substring(1));
}






