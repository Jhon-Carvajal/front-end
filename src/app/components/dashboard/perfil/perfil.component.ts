import { Component } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  defaultImageUrl = 'path/to/default-image.png'; // Replace with your default image path

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    this.selectedFile = target.files?.length ? target.files[0] : null;

    if (this.selectedFile) {
      // Validate image type to prevent non-image uploads
      const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!allowedMimeTypes.includes(this.selectedFile.type)) {
        this.selectedFile = null;
        alert('formatos validos(JPEG, PNG)');
        return;
      }

      // Create and handle image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        this.previewUrl = reader.result as string;
      };
      reader.onerror = (error) => {
        console.error('Error reading selected file:', error);
      };
      reader.readAsDataURL(this.selectedFile);
    } else {
      this.previewUrl = this.defaultImageUrl; // Set default image if no file selected
    }
  }
}

