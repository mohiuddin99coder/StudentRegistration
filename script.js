const firstName = document.querySelector('.firstName');
const lastName = document.querySelector('.lastName')
const DOB = document.querySelector('.dob')
const phoneNumber = document.getElementById('phone-number')
const male = document.getElementById('male')
const female = document.getElementById('female')
const school = document.getElementById('school')
const department = document.getElementById('department')
const email = document.getElementById('email')
const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const address = document.getElementById('address')
const success = document.querySelector('.success')
const studentForm = document.querySelector('.student-form')



const btnSubmit = document.getElementById('btn-submit')
btnSubmit.addEventListener('click', () => {
    Validation()
    blur()
    if (firstName.value != "" && lastName.value != "" && DOB.value != "" && phoneNumber.value != "" && phoneNumber.value.length == 10 && (male.checked || female.checked || others.checked) && school.value != "" && department.value != "" && email.value.match(mailFormat) && address.value != "") {
        console.log('✔️SuccessFull')
        studentForm.classList.add('d-none')
        success.classList.remove('d-none')
    }
})



const btnReset = document.getElementById('btn-reset')
btnReset.addEventListener('click', reset)

let errMsg, element, countError;
let elements = [firstName, lastName, DOB, phoneNumber, school, department, email, address];

function reset() {
    firstName.value = ""
    lastName.value = ""
    DOB.value = ""
    phoneNumber.value = ""
    male.checked = false
    female.checked = false
    school.value = ""
    department.value = ""
    email.value = ""
    address.value = ""
    removeMsg(male)
    btnSubmit.classList.remove('disabled')
    for (element of elements) {
        removeMsg(element)
    }
}

function errorMsg(element, errMsg) {
    countError++
    element.nextElementSibling.innerHTML = errMsg;
    element.classList.add('errorBox')
}
function removeMsg(element) {
    element.nextElementSibling.innerHTML = "";
    element.classList.remove('errorBox')
}

function Validation() {
    countError = 0;
    elements.forEach((element) => {
        if (!male.checked && !female.checked) {
            errMsg = "❌select your gender"
            errorMsg(male, errMsg)
        } else {
            removeMsg(male)
        }
        if (isNaN(phoneNumber.value)) {
            errMsg = "❌not a valid number"
            errorMsg(phoneNumber, errMsg)
        } else if (phoneNumber.value.length < 10 || phoneNumber.value.length > 10) {
            errMsg = "❌number length should 10"
            errorMsg(phoneNumber, errMsg)
        }
        if (!email.value.match(mailFormat)) {
            errMsg = '❌enter valid email-id'
            errorMsg(email, errMsg)
        }
        errMsg = '❌ this field is required'
        element.value == "" ? errorMsg(element, errMsg) : removeMsg(element)

        if (countError != 0) {
            btnSubmit.classList.add('disabled')
        } else {
            btnSubmit.classList.remove('disabled')
        }
    })
}
function blur() {
    elements.forEach((element) => {
        element.addEventListener('blur', Validation)
    })
}
