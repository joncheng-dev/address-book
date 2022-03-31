// Business Logic for Address Book ---------
function AddressBook() {
  this.contacts = {};
  this.currentId = 0;
}

function Address(type, entry) {
  this.type = type;
  this.entry = entry;
}

// Practice making an address with different type.
const emailEntry = new Address("email", "my@email.com");
const homeEntry = new Address("home", "111 West Tree Lane");

// This function takes two parameters, and creates a new address.
function addAddress(addressType, addressEntry) {
  const newAddress = [];
  newAddress.push(addressType);
  newAddress.push(addressEntry);
  return newAddress;
}

const allAddresses = [];
allAddresses.push(addAddress("email", "my@email.com"));
allAddresses.push(addAddress("home", "111 West Tree Lane"));
console.log(allAddresses);

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
function Contact(firstName, lastName, phoneNumber, emailAddress, homeAddress) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.emailAddress = emailAddress;
  this.homeAddress = homeAddress;
  // multiple types of addresses
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
  $(".email-address").html(contact.emailAddress);
  $(".home-address").html(contact.homeAddress);
  // multiple types of addresses

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
  $("form#new-contact").submit(function (event) {
    event.preventDefault();
    const inputtedFirstName = $("input#new-first-name").val();
    const inputtedLastName = $("input#new-last-name").val();
    const inputtedPhoneNumber = $("input#new-phone-number").val();
    const inputtedEmailAddress = $("input#new-email-address").val();
    const inputtedHomeAddress = $("input#new-home-address").val();
    // multiple types of addresses

    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#new-email-address").val("");
    $("input#new-home-address").val("");
    // multiple types of addresses

    let newContact = new Contact(
      inputtedFirstName,
      inputtedLastName,
      inputtedPhoneNumber,
      inputtedEmailAddress,
      inputtedHomeAddress
      // multiple types of addresses
    );
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
  });
});
