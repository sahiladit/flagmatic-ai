document.getElementById("generateBtn").addEventListener("click", async () => {
  const fileInput = document.getElementById("resumeInput");
  const file = fileInput.files[0];
  const jobDescription = document.getElementById("jobInput").value;
  const loader = document.getElementById("loading");

  if (!file || !jobDescription) {
    alert("Please upload your resume and enter a job description.");
    return;
  }

  try {
    // ✅ Attempt to read the file to test for permissions early
    await file.text();

    loader.classList.remove("hidden");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("job", jobDescription);

    // 🚀 Detect environment: local or production
    const BASE_URL = window.location.origin;


    const response = await fetch(`${BASE_URL}/agent-upload`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Server error or agent failed");
    }

    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = "TailorAI_Output.docx";
    document.body.appendChild(a);
    a.click();
    a.remove();

    loader.classList.add("hidden");
  } catch (error) {
    loader.classList.add("hidden");

    if (error.name === "NotReadableError") {
      alert("The selected file could not be read. Please try a different one.");
    } else {
      alert("Something went wrong. Please try again.");
    }

    console.error(error);
  }
});
