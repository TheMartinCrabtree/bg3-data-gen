function downloadJsonFile(obj, fileName) {
  // Convert the object to a JSON string
  const jsonString = JSON.stringify(obj, null, 2);

  // Create a Blob with the JSON data
  const blob = new Blob([jsonString], { type: "application/json" });

  // Create a link element
  const link = document.createElement("a");

  // Set the download attribute with the desired file name
  link.download = fileName || "data.json";

  // Set the href attribute to the Blob data
  link.href = URL.createObjectURL(blob);

  // Append the link to the document body
  document.body.appendChild(link);

  // Programmatically trigger a click event on the link to start the download
  link.click();

  // Remove the link element from the document body
  document.body.removeChild(link);
}
