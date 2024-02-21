// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);
const auth = firebase.auth(app);

// Collection reference
const donorsCollection = db.collection('donors');

// Retrieve data
function getDonors() {
    donorsCollection.get()
        .then(snapshot => {
            let donors = [];
            snapshot.docs.forEach(doc => {
                donors.push({ ...doc.data(), id: doc.id });
            });
            console.log('Donors:', donors);
        })
        .catch(error => {
            console.error('Error getting donors:', error);
        });
}

// Add donor
function addDonor(name, sex, age, bloodType, phone, address) {
    donorsCollection.add({ name, sex, age, bloodType, phone, address })
        .then(() => {
            console.log('Donor added successfully');
            getDonors(); // Refresh donor list
        })
        .catch(error => {
            console.error('Error adding donor:', error);
        });
}

// Delete donor
function deleteDonor(donorId) {
    donorsCollection.doc(donorId).delete()
        .then(() => {
            console.log('Donor deleted successfully');
            getDonors(); // Refresh donor list
        })
        .catch(error => {
            console.error('Error deleting donor:', error);
        });
}

// Event listeners
const addForm = document.querySelector('.add');
addForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = addForm.name.value.trim();
    const sex = addForm.sex.value.trim();
    const age = addForm.age.value.trim();
    const bloodType = addForm.bloodType.value.trim();
    const phone = addForm.phone.value.trim();
    const address = addForm.address.value.trim();

    if (name !== '' && sex !== '' && age !== '' && bloodType !== '' && phone !== '' && address !== '') {
        addDonor(name, sex, age, bloodType, phone, address);
        addForm.reset();
    } else {
        console.error('Please fill out all fields');
    }
});

const deleteForm = document.querySelector('.delete');
deleteForm.addEventListener('submit', e => {
    e.preventDefault();
    const donorId = deleteForm.id.value.trim();
    if (donorId !== '') {
        deleteDonor(donorId);
        deleteForm.reset();
    } else {
        console.error('Please enter a donor ID');
    }
});

// Initial load of donors
getDonors();
