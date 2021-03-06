
function populateUFs()
{
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( (res) => { return res.json() } )
    .then( states => {
        for( const state of states )
        {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    } )

}

populateUFs()



function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json() )
    .then( cities => {
        
        for( const city of cities )
        {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

            citySelect.disabled = false

    } )

}
document.querySelector("select[name=uf]").addEventListener("change", getCities)

// ÍTENS DE COLETA

const itmsToCollect = document.querySelectorAll(".items-grid li");

for (const item of itmsToCollect){
    item.addEventListener("click", handleSelectedItem)
}
const collectedItems = document.querySelector("input[name=items]")
let selectedItems = []

function handleSelectedItem(event){
    const itemLi = event.target
    // adicionar ou remover uma clase com javascript
    itemLi.classList.toggle("selected") // toggle is for add or remove
    
    const itemId = itemLi.dataset.id
    
    console.log('Item ID', itemId)
    

    // verificar se existem items selecionados, se sim: pegar itens selecionados

    const alreadySelected = selectedItems.findIndex( item => item == itemId) // arrow function // retorna um bool, verdadeiro o falso, dependendo da comparacao

        // console.log(alreadySelected != -1)
    // const alreadySelected = selectedItems.findIndex( function(item) {
    //     return item == itemId // retorna um bool, verdadeiro o falso, dependendo da comparacao
    // })

    // se ja estiver selecionado, tirar da selecao

    if(alreadySelected >= 0)
    {
        // tirar da selecao
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })
        selectedItems = filteredItems
    }else{
    // se nao estiver selecionado, adicionar à selecao
        selectedItems.push(itemId)
    }
    console.log('Selected Items', selectedItems)
    // atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems
}