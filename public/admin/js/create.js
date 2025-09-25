//uploads image
const uploadsImage = document.querySelector("[uploads-image]")

if (uploadsImage) {
  const uploadImageInput = uploadsImage.querySelector("[uploads-image-input]")
  const uploadImageImg   = uploadsImage.querySelector("[uploads-image-preview]")
  const removeBtn        = uploadsImage.querySelector("[uploads-image-remove]")

  uploadImageInput.addEventListener("change", (e) => {
    const file = e.target.files[0]
    if (file) {
      uploadImageImg.src = URL.createObjectURL(file)
      uploadImageImg.style.display = "block"
      removeBtn.style.display = "block"
    }
  })

  removeBtn.addEventListener("click", () => {
    uploadImageImg.src = ""
    uploadImageImg.style.display = "none"
    removeBtn.style.display = "none"
    uploadImageInput.value = ""
  })
}



//end uploads image