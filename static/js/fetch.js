
class Donor {
    constructor(name, bloodType, phoneNumber , wilayaId, baladiaId ) {
        this.name = name;
        this.bloodType = bloodType;
        this.address = { wilayaId: wilayaId, baladiaId: baladiaId };
        this.phoneNumber = phoneNumber;
    }
}

async function getAllDonors() {
    const response = await fetch("http://localhost:5000/api/v1/donors");
    const json = await response.json();
    return json.map(json=>{
        return new Donor(json.name, json.blood_group, json.phone_number , json.WilayaID, json.BaladyaID );
    })
    return [
        {
            name: "wail",
            bloodType: "O+",
            address: { wilayaId: "7", baladiaId: "238" },
            phoneNumber: "1",
        },
        {
            name: "nidhal",
            bloodType: "O+",
            address: { wilayaId: "5", baladiaId: "161" },
            phoneNumber: "2",
        },
        {
            name: "wala",
            bloodType: "A+",
            address: { wilayaId: "5", baladiaId: "151" },
            phoneNumber: "3",
        },
        {
            name: "aziz",
            bloodType: "A-",
            address: { wilayaId: "7", baladiaId: "238" },
            phoneNumber: "4",
        },
        {
            name: "barder",
            bloodType: "AB-",
            address: { wilayaId: "5", baladiaId: "152" },
            phoneNumber: "5",
        },
    ];

}

async function getAllWilayas() {
    const response = await fetch("../static/js/addresses/wilayas.json");
    const json = await response.json();
    return json;
}

async function getBaladias(wilaya_id) {
    const response = await fetch("../static/js/addresses/baladias.json");
    const json = await response.json();
    return json.filter((baladia) => baladia.wilaya_id == wilaya_id);
}
