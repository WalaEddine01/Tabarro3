export async function setUpSRegister() {
    console.log("setting up register");
    const bloodType_selection = document.getElementById("bloodType");

    const formatCode = (code) => {
        return code < 10 ? "0" + code : code.toString();
    };
    const wilaya_selection = document.getElementById("wilaya");
    const wilayas = await getAllWilayas();
    for (const wilaya of wilayas) {
        const option = document.createElement("option");
        option.value = wilaya.id;
        option.textContent = formatCode(wilaya.code) + " " + wilaya.name;
        wilaya_selection.appendChild(option);
    }
    const baladia_selection = document.getElementById("baladia");
    console.log(baladia_selection);
    wilaya_selection.addEventListener("change", async (event) => {
        const selectedWilayaId = event.target.selectedOptions[0].value;

        baladia_selection.innerHTML = '';
        let bladias = await getBaladias(selectedWilayaId);
        bladias.sort((a, b) => a.name.localeCompare(b.name));

        for (const baladia of bladias) {
            const option = document.createElement("option");
            option.value = baladia.id;
            option.textContent = baladia.name;
            baladia_selection.appendChild(option);
        }
    });

    async function formatDonor(donor) {
        const wilaya = wilayas.find(
            (wilaya) => wilaya.id == donor.address.wilayaId
        );
        const allBladias = await getBaladias(donor.address.wilayaId);
        const baladia = allBladias.find(
            (baladia) => baladia.id == donor.address.baladiaId
        );

        const wilayaName = wilaya ? wilaya.name : "Unknown Wilaya";
        const baladiaName = baladia ? baladia.name : "Unknown Baladia";

        return `<tr>
            <th>${donor.name}</th>
            <th>${donor.bloodType}</th>
            <th>${wilayaName}</th>
            <th>${baladiaName}</th>
            <th>${donor.phoneNumber}</th>
        </tr>`;
    }




    const register = document.getElementById("register")

    register.onclick = async ()=>{
        console.log("hello");
        const selectedBaladiaName = baladia_selection.value;
        const selectedWilayaName = wilaya_selection.value; 

        const bloodGroup = document.getElementById("bloodType").value;
        const name = document.getElementById("name").value;
        const phoneNumber = document.getElementById("phone-number").value;

        // Find the selected Baladia ID
        const selectedWilaya = wilayas.find(wilaya => wilaya.name === selectedWilayaName);
        const selectedWilayaID = selectedWilaya ? selectedWilaya.id : null;

        let bladias = await getBaladias(selectedWilayaID);
        const selectedBaladia = bladias.find(baladia => baladia.name === selectedBaladiaName);
        const selectedBaladiaID = selectedBaladia ? selectedBaladia.id : null;


        console.log(selectedBaladiaName);
        console.log(selectedWilayaName);

        const data = {
            BaladyaID: selectedBaladiaName,
            WilayaID: selectedWilayaName,
            blood_group: bloodGroup,
            name: name,
            phone_number: phoneNumber
        };
    
    fetch("http://localhost:5000/api/v1/donors", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
    }
    


}
