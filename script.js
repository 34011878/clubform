const supabaseUrl =
    "https://xiwbcebbwssgqzgvtkzw.supabase.co";

const supabaseKey =
    "sb_publishable_Tj9bteqpilejOyZIb-2hog_rfeR9Dw-";

const sb = window.supabase.createClient(
    supabaseUrl,
    supabaseKey
);

document
    .getElementById("memberForm")
    .addEventListener("submit", async (e) => {

        e.preventDefault();

        const fullName =
            document.getElementById("fullName").value.trim();

        const studentNumber =
            document.getElementById("studentNumber").value.trim();

        const email =
            document.getElementById("email").value.trim().toLowerCase();

        const degreeName =
            document.getElementById("degreeName").value.trim();

        const degreeMajor =
            document.getElementById("degreeMajor").value.trim();

        const discordUsername =
            document.getElementById("discordUsername").value.trim();

        if (!/^\d{8}$/.test(studentNumber)) {
            alert("Student number must be exactly 8 digits.");
            return;
        }

        if (!email.endsWith("@student.murdoch.edu.au")) {
            alert("Please use your Murdoch student email address.");
            return;
        }

        if (
            discordUsername &&
            !/^[a-zA-Z0-9._]{2,32}$/.test(discordUsername)
        ) {
            alert("Please enter a valid Discord username.");
            return;
        }

        const memberData = {
            full_name: fullName,
            student_number: studentNumber,
            email: email,
            degree_name: degreeName,
            degree_major: degreeMajor,
            discord_username: discordUsername || null
        };

        const { error } = await sb
            .from("members")
            .insert([memberData]);

        if (error) {
            alert("Error: " + error.message);
            console.error(error);
        } else {
            alert("Registration successful!");
            document.getElementById("memberForm").reset();
        }
    });