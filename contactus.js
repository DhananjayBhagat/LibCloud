const accordionItems = document.querySelectorAll('.accordion-item');
accordionItems.forEach(item => {
    item.addEventListener('click', () => {
        accordionItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        item.classList.toggle('active');
    });
});

const input = document.querySelectorAll('.form-control');
input.forEach(item => {
    item.addEventListener('click', () => {
        input.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        item.classList.toggle('active');
    });
});

(function () {
    'use strict'
    var forms = document.querySelectorAll('.needs-validation')
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
})()



// function submitContactForm(event) {
//     const firstName = document.getElementById('firstname').value;
//     const lastName = document.getElementById('lastname').value;
//     const title = document.getElementById('title').value;
//     const phoneNo = document.getElementById('phoneno').value;
//     const email = document.getElementById('email').value;
//     const office_number = document.getElementById('office_number').value;
//      const address = document.getElementById('address').value;
//      const city = document.getElementById('city').value;
//       const pincode = document.getElementById('pincode').value;
//       const state = document.getElementById('state').value;
//       const country = document.getElementById('country').value;
//       const products = document.getElementById('products').value;
//       const message = document.getElementById('message').value;

//     if (!firstName || !lastName || !title || !phoneNo || !message || !email || !office_number || !address || !city || !pincode || !state || !country || !products ) {
//         alert("Enter all details");
//         event.preventDefault();
//         const allInputs = document.querySelectorAll('.form-control');
//         allInputs.forEach(input => {
//             if (!input.value) {
//                 input.classList.add('is-invalid');
//             } else {
//                 input.classList.remove('is-invalid');
//             }
//         });
//         return;
//     }
//     function isValidPhoneNumber(phoneNo) {
//         const phoneRegex = /^\d{10}$/;
//         return phoneRegex.test(phoneNo);
//     }

//     if (!isValidPhoneNumber(phoneNo)) {
//         alert('Please enter a valid phone number.');
//         return;
//     }
//     function isValidOfficeNumber(office_number) {
//         const officephoneRegex = /^\d{10}$/;
//         return officephoneRegex.test(office_number);
//     }

//     if (!isValidOfficeNumber(office_number)) {
//         alert('Please enter a valid Office number.');
//         return;
//     }
//     const name=firstName+" "+lastName;

//     const formData = {
//         name: name,
//         email:email,
//         mobile:phoneNo,
//         office_number:office_number,
//         address:address,
//         city:city,
//         pincode:pincode,
//         state:state,
//         country:country,
//         products:products,
//         // title: title,

//         // message: message
//     };
//     console.log(JSON.stringify(formData));

//     fetch('http://api.libcloud.in/lc/api/v1/account/webenquiries', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(formData),
//     })
//         .then(response => response.json())
//         .then(data => {
//             if (data.success) {
//                 alert('Your message has been sent successfully!');
//             } else {
//                 alert('An error occurred while sending your message. Please try again later.');
//             }
//         })
//         .catch(error => {
//             console.error('Error submitting contact form:',error);
//             alert('An error occurred while sending your message. Please try again later.');
//         });
// }



// Define the submitContactForm function
function submitContactForm() {
    event.preventDefault();

    // Retrieve form data
    const fullname = document.getElementById('fullname').value;
    const subject = document.getElementById('subject').value;
    const phoneNo = document.getElementById('phoneno').value;
    const email = document.getElementById('email').value;
    const office_number = document.getElementById('office_number').value;
    const products = document.getElementById('products').value;
    const message = document.getElementById('message').value;

    // Validate form data
    if (!fullname || !subject || !phoneNo || !isValidEmail(email) || !office_number || !products || !message) {
        alert("Please fill in all required fields with valid information.");
        highlightInvalidInputs();
        return;
    }

    // Validate phone number
    if (!isValidPhoneNumber(phoneNo)) {
        alert('Please enter a valid Phone Number.');
        highlightInvalidInput('phoneno');
        return;
    }

    // Validate office number
    if (!isValidOfficeNumber(office_number)) {
        alert('Please enter a valid Office Number.');
        highlightInvalidInput('office_number');
        return;
    }

    // Prepare form data
    const formData = {
        name: fullname,
        email: email,
        mobile: phoneNo,
        office_number: office_number,
        products: products,
        subject: subject,
        message: message
    };

    // Send form data to the API
    fetch('http://api.libcloud.in/lc/api/v1/account/webenquiries', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
        if (data.code == 200) {
            alert(data.message);
            document.querySelector('form').reset();
        } else {
            alert('An error occurred while sending your message. Please try again later.');
        }
    })
    .catch(error => {
        console.error('Error submitting contact form:', error);
        alert('An error occurred while sending your message. Please try again later.');
    });
}

// Function to validate phone number
function isValidPhoneNumber(phoneNo) {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNo);
}

// Function to validate office number
function isValidOfficeNumber(office_number) {
    const officephoneRegex = /^\d{10}$/;
    return officephoneRegex.test(office_number);
}

// Function to validate email address
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Function to highlight invalid inputs
function highlightInvalidInputs() {
    const allInputs = document.querySelectorAll('.form-control');
    allInputs.forEach(input => {
        if (!input.value) {
            input.classList.add('is-invalid');
        } else {
            input.classList.remove('is-invalid');
        }
    });
}

// Function to highlight specific invalid input
function highlightInvalidInput(inputId) {
    const input = document.getElementById(inputId);
    input.classList.add('is-invalid');
}

// Attach the submitContactForm function to the form submission event
const form = document.querySelector('form');
form.addEventListener('submit', submitContactForm);

// Event listeners to validate phone number, office number, and email on input change
document.getElementById('phoneno').addEventListener('input', function() {
    validatePhoneNumberInput('phoneno');
});

document.getElementById('office_number').addEventListener('input', function() {
    validateOfficeNumberInput('office_number');
});

document.getElementById('email').addEventListener('input', function() {
    validateEmailInput('email');
});

// Function to validate phone number input dynamically
function validatePhoneNumberInput(inputId) {
    const phoneInput = document.getElementById(inputId);
    const phoneValue = phoneInput.value.trim();
    const feedback = phoneInput.nextElementSibling;

    if (!isValidPhoneNumber(phoneValue)) {
        feedback.innerText = 'Please enter a 10 digit Phone Number.';
        feedback.style.display = 'block';
        phoneInput.classList.add('is-invalid');
    } else {
        feedback.style.display = 'none';
        phoneInput.classList.remove('is-invalid');
    }
}

// Function to validate office number input dynamically
function validateOfficeNumberInput(inputId) {
    const officeInput = document.getElementById(inputId);
    const officeValue = officeInput.value.trim();
    const feedback = officeInput.nextElementSibling;

    if (!isValidOfficeNumber(officeValue)) {
        feedback.innerText = 'Please enter a 10 digit Office Number.';
        feedback.style.display = 'block';
        officeInput.classList.add('is-invalid');
    } else {
        feedback.style.display = 'none';
        officeInput.classList.remove('is-invalid');
    }
}

// Function to validate email input dynamically
function validateEmailInput(inputId) {
    const emailInput = document.getElementById(inputId);
    const emailValue = emailInput.value.trim();
    const feedback = emailInput.nextElementSibling;

    if (!isValidEmail(emailValue)) {
        feedback.innerText = 'Please enter a valid Email Address.';
        feedback.style.display = 'block';
        emailInput.classList.add('is-invalid');
    } else {
        feedback.style.display = 'none';
        emailInput.classList.remove('is-invalid');
    }
}
