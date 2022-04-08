// Business Logic for Address Book ---------
function AddressBook() {
  this.contacts = {};
  this.currentId = 0;
}

function Address(type, entry) {
  this.type = type;
  this.entry = entry;
}

// This function takes two parameters, and creates a new address.
function createAddressEntry(addressType, addressEntry) {
  let address = new Address(addressType, addressEntry);
  return address;
}

AddressBook.prototype.addContact = function (contact) {
  contact.id = this.assignId();
  this.contacts[contact.id] = contact;
};

AddressBook.prototype.assignId = function () {
  this.currentId += 1;
  return this.currentId;
};

AddressBook.prototype.findContact = function (id) {
  if (this.contacts[id] != undefined) {
    return this.contacts[id];
  }
  return false;
};

AddressBook.prototype.deleteContact = function (id) {
  if (this.contacts[id] === undefined) {
    return false;
  }
  delete this.contacts[id];
  return true;
};

// Business Logic for Contacts --------
function Contact(firstName, lastName, phoneNumber, address) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.address = address;
}

Contact.prototype.fullName = function () {
  return this.firstName + " " + this.lastName;
};

// User Interface logic --------------
let addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
  let contactsList = $("ul#contacts");
  let htmlForContactInfo = "";
  Object.keys(addressBookToDisplay.contacts).forEach(function (key) {
    const contact = addressBookToDisplay.findContact(key);
    htmlForContactInfo +=
      "<li id=" +
      contact.id +
      ">" +
      contact.firstName +
      " " +
      contact.lastName +
      "</li>";
  });
  contactsList.html(htmlForContactInfo);
}

function showContact(contactId) {
  const contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  // Address type & entry
  for (let i = 1; i < 3; i++) {
    $(".address-type").append("<li>" + contact.address[i].type + "</li>");
  }
  for (let i = 1; i < 3; i++) {
    $(".address-entry").append("<li>" + contact.address[i].entry + "</li>");
  }

  let buttons = $("#buttons");
  buttons.empty();
  buttons.append(
    "<button class='deleteButton' id=" + +contact.id + ">Delete</button>"
  );
}

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function () {
    showContact(this.id);
  });
}

function removeContactListeners() {
  $("#buttons").on("click", ".deleteButton", function () {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
}

// function extraAddress() {
//   $("#new-contact").on("click", ".btn-secondary", function () {
//     #new-address.value = '';
//   });
// }

$(document).ready(function () {
  attachContactListeners();
  removeContactListeners();
  // extraAddress();
  $("form#new-contact").submit(function (event) {
    event.preventDefault();
    const inputtedFirstName = $("input#new-first-name").val();
    const inputtedLastName = $("input#new-last-name").val();
    const inputtedPhoneNumber = $("input#new-phone-number").val();
    // Address type & entry
    const inputtedAddressType = $("#address-type").val();
    const inputtedAddressEntry = $("input#new-address").val();

    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    // Address type & entry
    $("#address-type").val("");
    $("input#new-address").val("");

    let counter = 0;
    const addresses = [];
    addresses[1] = createAddressEntry(
      inputtedAddressType,
      inputtedAddressEntry
    );

    addresses[2] = createAddressEntry("Email Address", "homer@jsimpson.edu");

    let newContact = new Contact(
      inputtedFirstName,
      inputtedLastName,
      inputtedPhoneNumber,
      // Address type & entry
      addresses
    );
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
  });
});
