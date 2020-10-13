const inputbudget = document.getElementById('number');
const addform = document.getElementById('addform');
const budgetAmount = document.getElementById('budgetAmount');
const balanceAmount = document.getElementById('balanceAmount');
const expName = document.getElementById('expName');
const expNumber = document.getElementById('expNumber');
const expForm = document.getElementById('expForm');
const expValue = document.getElementById("expValue");
const editForm = document.getElementById("editForm");
const saveEdit = document.getElementById("saveEdit");
const editExpValue = document.getElementById("editExpValue");
const editExpNumber = document.getElementById("editExpNumber");


function ajoutBudget (amount){
  if(amount < 0 || amount  == 0){
    setTimeout(() => {
      alert('vous avez entre un nombre negatif ou null');
    }, 0);
  }
  else{
    budgetAmount.innerText = amount;
    balanceAmount.innerText = amount;
    inputbudget.value = '';
  }
};
addform.addEventListener("submit",function(e){
  e.preventDefault(),
  ajoutBudget(inputbudget.value);
});


 let id = 0;
 let tableau = [];
function ajoutform2 (name, number){
  if (!name.length || (number == 0 && number < 0)){
    setTimeout(() => {
      alert('vous avez entre un nombre negatif ou null');
    }, 0);
  }
  else{
    const notreObjet= {
      id: id,
      name: name,
      number: parseInt(number),
    };
    tableau.push(notreObjet);
    generateurDesDepense(tableau);
    id++;
    expName.value ='';
    expNumber.value ='';
  } 
};

expForm.addEventListener("submit",(e) => {
  e.preventDefault();
  ajoutform2(expName.value, expNumber.value);
});


function generateurDesDepense(tableau){
  expValue.innerHTML = null;
  for( i=0; i < tableau.length; i++ ){
  expValue.innerHTML +=`
  <div class="row my-3" id="expValue" id="${tableau[i].id}">
  <div id="expTitleName" class="col exp">
    <p>${tableau[i].name}</p>
  </div>
  <div id="expValueAmount" class="col exp">
    <p> <span>$ </span> ${tableau[i].number}</p>
  </div>
  <div id="edite_delete" class="col">
    <p>
      <button id="${tableau[i].id}" onclick="editExptableau(${tableau[i].id})" data-toggle="modal" data-target="#cart"> <img src="image/edit.svg" width="15" alt=""  /></button> 
      <button id="${tableau[i].id}" onclick="delExpensetableau(${tableau[i].id})" ><img src="image/trash.svg" width="15" alt="" /></button>
    </p>
  </div>
</div>
  `;
}
totalExpenses();
}

function totalExpenses(){
  let totalExp = 0;
  for(i=0; i<tableau.length; i++){
    totalExp = tableau[i].number + totalExp;
  }
  expensesAmount.innerText = totalExp;
  ActualiseBalance();
}
 
function ActualiseBalance(){
  balanceAmount.innerText = 
  parseInt(budgetAmount.innerText) - parseInt(expensesAmount.innerText);
}

function editExptableau(id) {
  tableau.findIndex((item) => {
    if (item.id === id) {
      editExpName.value = item.name;
      editExpNumber.value = item.number;
      saveEdit.children[2].id = item.id;
    }
  });
}

function getExpValue(editExpName, editExpNumber, id) {
  edited = tableau.findIndex((obj) => obj.id == id);
  tableau[edited].name = editExpName;
  tableau[edited].number = parseInt(editExpNumber);
  displayExp(tableau);
}

saveEdit.addEventListener('submit', (e) => {
  e.preventDefault();
  getExpValue(editExpName.value, parseInt(editExpNumber).value, saveEdit.children[2].id);
});


function delExpensetableau(id) {
  let index = tableau.findIndex((item) => item.id === id);
  tableau.splice(index, 1);
  generateurDesDepense(tableau);
}




