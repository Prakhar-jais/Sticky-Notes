let allFilters = document.querySelectorAll(".filter");
let openModal = document.querySelector(".open-modal");
let closeModal = document.querySelector(".close-modal");
let ticketModalOpen = false;
let isTextTyped = false;
let search_start = false;

let search_btn = document.querySelector(".search-bar");
search_btn.addEventListener("click",searching);
function searching(e){
  if(!search_start )
  {
    search_btn.textContent="";

  }
  search_start = true;
  let text_type = search_btn.addEventListener("keypress",function(e){
    text_got = e.target.textContent;
    if(e.target.textContent == "Enter" && text_got== ticketId )
    {
     

    }
    else{
      
    }
  })

}




for (let i = 0; i < allFilters.length; i++) {
  allFilters[i].addEventListener("click", selectFilter);
}

openModal.addEventListener("click", openTicketModal);
closeModal.addEventListener("click", closeTicketModal);

function selectFilter(e) {
  if(e.target.classList.contains("active-filter")){
    // ticket append are on basis of some filter
    e.target.classList.remove("active-filter");
    // append all tickets
    ticketsContainer.innerHTML = "";
    loadTickets();
  }
  else{
    if(document.querySelector(".active-filter")){
      document.querySelector(".active-filter").classList.remove("active-filter");
    }
    e.target.classList.add("active-filter");
    ticketsContainer.innerHTML = "";
    let filterClicked = e.target.classList[1];
    loadSelectedTickets(filterClicked);
  }
}

function openTicketModal(e) {
  if (ticketModalOpen) {
    return;
  }
  let ticketModal = document.createElement("div");
  ticketModal.classList.add("ticket-modal");
  ticketModal.innerHTML = `<div class="ticket-text" contentEditable="true" spellcheck="false">Enter Your Text !</div>
    <div class="ticket-filters">
        <div class="ticket-filter red selected-filter"></div>
        <div class="ticket-filter blue"></div>
        <div class="ticket-filter green"></div>
        <div class="ticket-filter yellow"></div>
        <div class="ticket-filter black"></div>
    </div>`;
  document.querySelector("body").append(ticketModal);
  ticketModalOpen = true;
  isTextTyped = false;

  let ticketTextDiv = ticketModal.querySelector(".ticket-text");
  ticketTextDiv.addEventListener("keypress", handleKeyPress);

  let ticketFilters = ticketModal.querySelectorAll(".ticket-filter");
  for (let i = 0; i < ticketFilters.length; i++) {
    ticketFilters[i].addEventListener("click", function (e) {
      if (e.target.classList.contains("selected-filter")) {
        return;
      }
      document
        .querySelector(".selected-filter")
        .classList.remove("selected-filter");
      e.target.classList.add("selected-filter");
    });
  }
}

function closeTicketModal(e) {
  if (ticketModalOpen) {
    document.querySelector(".ticket-modal").remove();
    ticketModalOpen = false;
    isTextTyped = false;
  }
}

function handleKeyPress(e) {
  if (e.key == "Enter" && isTextTyped && e.target.textContent) {
    let filterSelected = document.querySelector(".selected-filter").classList[1];
    let ticketId = uuid();
    let ticketInfoObject = {
      ticketFilter: filterSelected,
      ticketValue: e.target.textContent,
      ticketId : ticketId
    };
    appendTicket(ticketInfoObject);
    closeModal.click();
    saveTicketToDB(ticketInfoObject);
  }

  if(!isTextTyped) {
    isTextTyped = true;
    e.target.textContent = "";
  }
}
