// Business Logic for Address Book ---------
function AddressBook() {
  this.contacts = {};
  this.currentId = 0;
}

function Address(type, entry) {
  this.type = type;
  this.entry = entry;
}

function createAddressObject(addressType, addressEntry) {
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
  // Clear previous list items, if any from clicking Contact on list.
  $(".address-type").empty();
  $(".address-entry").empty();
  // Displays saved address types & entries
  for (let i = 0; i < contact.address.length; i++) {
    $(".address-type").append("<li>" + contact.address[i].type + "</li>");
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

$(document).ready(function () {
  attachContactListeners();
  removeContactListeners();
  let tempAddresses = [];
  // Takes user input and adds address objects into an array.
  $("#new-contact").on("click", ".btn-secondary", function () {
    let inputtedAddressType = $("#new-address-type").val();
    let inputtedAddressEntry = $("#new-address-entry").val();
    let newAddressObject = createAddressObject(
      inputtedAddressType,
      inputtedAddressEntry
    );
    $("#new-address-entry").val("");
    tempAddresses.push(newAddressObject);
  });

  $("form#new-contact").submit(function (event) {
    event.preventDefault();
    const inputtedFirstName = $("input#new-first-name").val();
    const inputtedLastName = $("input#new-last-name").val();
    const inputtedPhoneNumber = $("input#new-phone-number").val();

    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");

    let newContact = new Contact(
      inputtedFirstName,
      inputtedLastName,
      inputtedPhoneNumber,
      tempAddresses
    );
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
    // Clear addresses array for next contact to be added.
    tempAddresses = [];
  });
});
