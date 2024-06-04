export async function setUpSearch() {
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
    wilaya_selection.addEventListener("change", async (event) => {
        const selectedWilayaId = event.target.selectedOptions[0].value;

        baladia_selection.innerHTML = '<option value="all">ALL</option>';
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

        return `
        <ul class="unit" id="unit">
        <li>${donor.name}</li>
        <li class="active">${donor.bloodType}</li>
        <li>${wilayaName}</li>
        <li>${baladiaName}</li>
        <li>${donor.phoneNumber}</li>
        </ul>`
        ;
    }

    const allDonors = await getAllDonors();
    let selectedDonors = allDonors;
    const searchResults = document.getElementById("search-results");

    async function updateList() {
        searchResults.innerHTML = "";
        let i = 1;
        for (const donor of selectedDonors) {
            searchResults.innerHTML += await formatDonor(donor);
        }
    }

    function filterDonors(donor) {
        const selectedWilayaId = wilaya_selection.value;
        const selectedBaladiaId = baladia_selection.value;
        const selectedBloodType = bloodType_selection.value;

        const inSelectedWilaya =
            selectedWilayaId == "all" ||
            selectedWilayaId == donor.address.wilayaId;

        const inSelectedBaladia =
            selectedBaladiaId == "all" ||
            selectedBaladiaId == donor.address.baladiaId;

        const hasSelectedBloodType =
            selectedBloodType == "all" || selectedBloodType == donor.bloodType;

        return inSelectedWilaya && inSelectedBaladia && hasSelectedBloodType;
    }

    function applyFilters() {
        selectedDonors = allDonors.filter(filterDonors);
        updateList();
    }
    updateList();
    document.getElementById("apply").onclick = applyFilters;
}
