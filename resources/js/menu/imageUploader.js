class imageUploader {
    constructor() {
        this.fileInput = document.createElement("input");
        this.fileInput.type = "file";
        this.fileInput.accept = "image/*";
        this.fileInput.style.display = "none";
        document.body.appendChild(this.fileInput);
    }

    async selectImage() {
        return new Promise((resolve) => {
            this.fileInput.onchange = async (event) => {
                const file = event.target.files[0];
                if (!file) return resolve(null);

                // Vérifier le type MIME et la taille (max 2 Mo)
                const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
                const maxSizeMB = 2;

                if (!allowedTypes.includes(file.type)) {
                    alert("Seuls les fichiers JPEG, PNG et WEBP sont autorisés.");
                    return resolve(null);
                }

                if (file.size > maxSizeMB * 1024 * 1024) {
                    alert("Image trop volumineuse (max 2 Mo).");
                    return resolve(null);
                }

                const resizedImage = await this.resizeImage(file);
                resolve(resizedImage);
            };

            this.fileInput.click();
        });
    }

    async resizeImage(file) {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const canvasImage = document.createElement('canvas');
                    const size = 150;
                    canvasImage.width = size;
                    canvasImage.height = size;

                    const ctx = canvasImage.getContext('2d');

                    const scale = Math.max(size / img.width, size / img.height);
                    const width = img.width * scale;
                    const height = img.height * scale;
                    const x = (size - width) / 2;
                    const y = (size - height) / 2;

                    ctx.drawImage(img, x, y, width, height);
                    resolve(canvasImage.toDataURL('image/jpeg', 0.8));
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        });
    }

    destroy() {
        if (this.fileInput.parentNode) {
            document.body.removeChild(this.fileInput);
        }
    }
}
