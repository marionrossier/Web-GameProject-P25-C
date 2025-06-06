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
                if (file && file.type.startsWith('image/')) {
                    const resizedImage = await this.resizeImage(file);
                    resolve(resizedImage);
                } else {
                    resolve(null);
                }
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
                    // Créer un canvas pour redimensionner
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    const size = 150; // Taille cible
                    canvas.width = size;
                    canvas.height = size;

                    // Calculer le recadrage pour garder le ratio
                    const scale = Math.max(size / img.width, size / img.height);
                    const width = img.width * scale;
                    const height = img.height * scale;
                    const x = (size - width) / 2;
                    const y = (size - height) / 2;

                    ctx.drawImage(img, x, y, width, height);
                    resolve(canvas.toDataURL('image/jpeg', 0.8));
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