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
    const firstName = document.getElementById('firstname').value;
    const lastName = document.getElementById('lastname').value;
    const title = document.getElementById('title').value;
    const phoneNo = document.getElementById('phoneno').value;
    const email = document.getElementById('email').value;
    const office_number = document.getElementById('office_number').value;
    // const address = document.getElementById('address').value;
    // const city = document.getElementById('city').value;
    // const pincode = document.getElementById('pincode').value;
    // const state = document.getElementById('state').value;
    // const country = document.getElementById('country').value;
    const products = document.getElementById('products').value;
    const message = document.getElementById('message').value;

    // Validate form data
    if (!firstName || !lastName || !title || !phoneNo || !message || !email || !office_number || !products) {
        alert("Enter all details");
        event.preventDefault();
        const allInputs = document.querySelectorAll('.form-control');
        allInputs.forEach(input => {
            if (!input.value) {
                input.classList.add('is-invalid');
            } else {
                input.classList.remove('is-invalid');
            }
        });

    }

    // Validate phone number
    function isValidPhoneNumber(phoneNo) {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phoneNo);
    }

    if (!isValidPhoneNumber(phoneNo)) {
        alert('Please enter a valid phone number.');
        return;
    }

    // Validate office number
    function isValidOfficeNumber(office_number) {
        const officephoneRegex = /^\d{10}$/;
        return officephoneRegex.test(office_number);
    }

    if (!isValidOfficeNumber(office_number)) {
        alert('Please enter a valid Office number.');
        return;
    }

    // Prepare form data
    const name = firstName + " " + lastName;
    const formData = {
        name: name,
        email: email,
        mobile: phoneNo,
        office_number: office_number,
        // address: address,
        products: products,
        subject: title,
        // city: city,
        // pincode: pincode,
        // state: state,
        // country: country,
        message: message

    };

    console.log(JSON.stringify(formData));

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
            console.log(JSON.stringify(data));

            if (data.code == 200) {
                // alert('Your message has been sent successfully!');
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

// Attach the submitContactForm function to the form submission event
const form = document.querySelector('form');
form.addEventListener('submit', submitContactForm);
