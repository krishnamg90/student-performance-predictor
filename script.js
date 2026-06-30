// ================================
// Student Performance Predictor
// Developed by Krishna M G
// ================================

let chart;

// -------------------------------
// Predict Score
// -------------------------------

function predictScore() {

    let gender = document.getElementById("gender").value;
    let age = Number(document.getElementById("age").value);
    let study = Number(document.getElementById("study").value);
    let attendance = Number(document.getElementById("attendance").value);
    let sleep = Number(document.getElementById("sleep").value);
    let internet = document.getElementById("internet").value;
    let grade = Number(document.getElementById("grade").value);

    // Validation

    if (
        gender == "" ||
        age == "" ||
        study == "" ||
        attendance == "" ||
        sleep == "" ||
        internet == "" ||
        grade == ""
    ) {

        alert("Please fill all fields.");

        return;

    }

    // Prediction Formula

    let score =
        (grade * 0.50) +
        (study * 3) +
        (attendance * 0.20) +
        (sleep * 1);

    if (internet == "Yes") {

        score += 2;

    }

    if (score > 100) {

        score = 100;

    }

    // Grade

    let finalGrade = "";

    if (score >= 90) {

        finalGrade = "A+";

    }

    else if (score >= 80) {

        finalGrade = "A";

    }

    else if (score >= 70) {

        finalGrade = "B+";

    }

    else if (score >= 60) {

        finalGrade = "B";

    }

    else if (score >= 50) {

        finalGrade = "C";

    }

    else {

        finalGrade = "Needs Improvement";

    }

    // Performance

    let performance = "";

    if (score >= 90) {

        performance = " Excellent Performance";

    }

    else if (score >= 75) {

        performance = " Good Performance";

    }

    else if (score >= 60) {

        performance = " Average Performance";

    }

    else {

        performance = " Needs Improvement";

    }

    document.getElementById("result").innerHTML =

        "<h2>Predicted Score : " +

        score.toFixed(2) +

        "%</h2>";

    // Dashboard

    document.getElementById("dashboard").style.display = "block";

    document.getElementById("studyScore").innerHTML = study + " hrs";

    document.getElementById("attendanceScore").innerHTML = attendance + "%";

    document.getElementById("sleepScore").innerHTML = sleep + " hrs";

    document.getElementById("gradeScore").innerHTML = grade + "%";

    document.getElementById("studyStatus").innerHTML =
        study >= 6 ? "Good" : "Improve";

    document.getElementById("attendanceStatus").innerHTML =
        attendance >= 85 ? "Good" : "Improve";

    document.getElementById("sleepStatus").innerHTML =
        sleep >= 7 ? "Good" : "Improve";

    document.getElementById("gradeStatus").innerHTML =
        grade >= 75 ? "Good" : "Improve";

    // Grade

    document.getElementById("gradeBox").style.display = "block";

    document.getElementById("gradeResult").innerHTML = finalGrade;

    // Performance

    document.getElementById("performanceBox").style.display = "block";

    document.getElementById("performanceText").innerHTML = performance;

    // Progress

    document.getElementById("progressBox").style.display = "block";

    document.getElementById("progressBar").value = score;

    document.getElementById("progressText").innerHTML =
        score.toFixed(2) + "%";
    // =========================
    // Suggestions
    // =========================

    document.getElementById("suggestionBox").style.display = "block";

    let suggestions = [];

    if (study < 2) {
        suggestions.push(" Increase study time to a 3-4 hours per day.");
    }

    if (attendance < 85) {
        suggestions.push("Improve attendance to above 85%.");
    }

    if (sleep < 7) {
        suggestions.push(" Sleep at least 7–8 hours daily.");
    }

    if (grade < 75) {
        suggestions.push(" Revise previous subjects to strengthen your fundamentals.");
    }

    if (internet == "No") {
        suggestions.push(" Internet access can help you learn through online courses and resources.");
    }

    if (suggestions.length == 0) {
        suggestions.push(" Excellent! Keep maintaining your current habits.");
    }

    let list = "";

    suggestions.forEach(function(item) {
        list += "<li>" + item + "</li>";
    });

    document.getElementById("suggestions").innerHTML = list;

    // =========================
    // Chart
    // =========================

    let ctx = document.getElementById("myChart").getContext("2d");

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {

        type: "bar",

        data: {

            labels: [

                "Study",

                "Attendance",

                "Sleep",

                "Previous Grade",

                "Predicted Score"

            ],

            datasets: [{

                label: "Student Performance",

                data: [

                    study,

                    attendance,

                    sleep,

                    grade,

                    score

                ],

                backgroundColor: [

                    "#4CAF50",

                    "#2196F3",

                    "#FF9800",

                    "#9C27B0",

                    "#F44336"

                ]

            }]

        },

    options: {

    responsive: true,

    plugins: {

        legend: {

            display: false

        }

    },

    scales: {

        y: {

            beginAtZero: true,

            suggestedMax: 100

        }

    }

}

    });

}
// =========================
// Download PDF Report
// =========================

async function downloadPDF() {

    if (document.getElementById("result").innerHTML.includes("Prediction report")) {
        alert("Please predict the score first.");
        return;
    }

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    let gender = document.getElementById("gender").value;
    let age = document.getElementById("age").value;
    let study = document.getElementById("study").value;
    let attendance = document.getElementById("attendance").value;
    let sleep = document.getElementById("sleep").value;
    let internet = document.getElementById("internet").value;
    let grade = document.getElementById("grade").value;

    let result = document.getElementById("result").innerText;
    let finalGrade = document.getElementById("gradeResult").innerText;
    let performance = document.getElementById("performanceText").innerText;

    doc.setFontSize(20);
    doc.text("Student Performance Report", 20, 20);

    doc.setFontSize(12);

    doc.text("Student Details", 20, 35);

    doc.text("Gender : " + gender, 20, 45);
    doc.text("Age : " + age, 20, 55);
    doc.text("Study Hours : " + study, 20, 65);
    doc.text("Attendance : " + attendance + "%", 20, 75);
    doc.text("Sleep Hours : " + sleep, 20, 85);
    doc.text("Internet Access : " + internet, 20, 95);
    doc.text("Previous Grade : " + grade + "%", 20, 105);

    doc.text("------------------------------------------",20,115);

    doc.setFontSize(15);
doc.text("Prediction Result",20,145);

doc.setFontSize(12);

doc.text(
"Predicted Score : " +
document.getElementById("progressBar").value +
"%",
20,
160
);

doc.text(
"Grade : " +
finalGrade,
20,
170
);

doc.text(
"Performance : " +
performance,
20,
180
);
    // Line after Performance
doc.text("------------------------------------------",20,190);

// Recommendations Heading
doc.setFontSize(15);
doc.text("Recommendations",20,205);

doc.setFontSize(12);

let suggestions = document.querySelectorAll("#suggestions li");

let y = 220;

if(suggestions.length===0){

    doc.text("No recommendations available.",20,y);

}else{

    suggestions.forEach(function(item){

        // Add a new page if needed
        if(y>270){

            doc.addPage();

            y=20;

        }

        doc.text("• " + item.innerText,20,y);

        y+=10;

    });

}

    let today = new Date();

    doc.text(
        "Generated on : " +
        today.toLocaleString(),
        20,
        280
    );

    doc.save("Student_Performance_Report.pdf");

}

// =========================
// Reset
// =========================

function clearAll(){

    document.getElementById("studentForm").reset();

    document.getElementById("result").innerHTML =
    "Prediction report will appear here.";

    document.getElementById("dashboard").style.display="none";

    document.getElementById("gradeBox").style.display="none";

    document.getElementById("performanceBox").style.display="none";

    document.getElementById("suggestionBox").style.display="none";

    document.getElementById("progressBox").style.display="none";

    document.getElementById("progressBar").value=0;

    document.getElementById("progressText").innerHTML="";

    document.getElementById("suggestions").innerHTML="";

    if(chart){

        chart.destroy();

        chart=null;

    }

}