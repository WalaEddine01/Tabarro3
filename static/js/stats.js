const bloodTypes = ["AB+", "AB-", "A-", "A+", "B-", "B+", "O+", "O-"];

export async function setUpStats() {
    const allDonors = await getAllDonors();
    for (const type of bloodTypes) {
        document.getElementById(type + "content").innerText = allDonors.reduce(
            (acc, donor) => (donor.bloodType === type ? acc + 1 : acc),
            0
        );
    }

    document.getElementById("totalcontent").innerText = allDonors.length;
}

