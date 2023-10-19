import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,FormArray,FormControl } from '@angular/forms';
import { DashboardService } from 'src/app/services/dashboard.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss']
})

export class AddProductsComponent implements OnInit{
  productForm: FormGroup;
  files: any[] = [];
  thumbnailFile:boolean =false;
  thumbnailSrc:string;
  @ViewChild('blah', { static: false }) blahElement: ElementRef;
  constructor(private formBuilder: FormBuilder,private DashboardService:DashboardService){
    
  }
 

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      discountPercentage: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      rating: [0, [Validators.required, Validators.min(0), Validators.max(5)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      brand: ['', Validators.required],
      category: ['', Validators.required],
      thumbnail: [null, Validators.required],
      images: [null, Validators.required]
    });
  }

  onThumbnailChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.productForm.get('thumbnail')?.setValue(inputElement.files[0]);
      this.thumbnail3(inputElement.files[0])
    }
  }
  onFileDropped_thumbnail(event: any){
  if (event && event.length > 0) {
    // Update the "images" field with the FileList
    this.productForm.get('thumbnail')?.setValue(event[0]);
    this.thumbnail3(event[0])
  }

  }

  thumbnail3(file:any){
    
    console.log(file)
    this.thumbnailFile=true;
    this.thumbnailSrc=URL.createObjectURL(file)
     console.log(this.thumbnailSrc)
     
  }


/*   onImagesChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      // Update the "images" field with the FileList
      this.productForm.get('images')?.setValue(inputElement.files);
    }
 
  } */
  onSubmit() {
    if (this.productForm.valid) {
      const formData = new FormData();
      // Append each file in the "images" field to FormData
      const images = this.productForm.get('images')?.value;
      if (images && images.length > 0) {
        for (let i = 0; i < images.length; i++) {
          formData.append('images', images[i]);
        }
      }
      Object.keys(this.productForm.value).forEach(key => {
        formData.append(key, this.productForm.value[key]);
      });

      this.addproduct(formData);
    } else {
      console.error('Error adding product')
    }
  }


  addproduct(productData: FormData) {
    this.DashboardService.addproduct(productData).subscribe({
      next: (data: any) => {
        this.productAdded_success()
        console.log('Product added successfully', data);
      },
      error: (error) => {
        this. productAdded_error(error)
        console.error('Error adding product', error)
      }
    });
  }

  productAdded_success(){
    Swal.fire({
      icon: 'success',
      title: 'Product added successfully'
    })
  }
  productAdded_error(error: string){
    Swal.fire({
      icon: 'error',
      title: 'Something went wrong!',
      text: error,
    })
  }
  

/**
   * on file drop handler
   */
onFileDropped(event: any) {
   
  if (event && event.length > 0) {
    // Update the "images" field with the FileList
    this.productForm.get('images')?.setValue(event);
  }

  this.prepareFilesList(event);

}

/**
 * handle file from browsing
 */
fileBrowseHandler(event: Event) {
  console.log(event)
  const inputElement = event.target as HTMLInputElement;
  if (inputElement.files && inputElement.files.length > 0 && inputElement.files.length < 6) {
    // Update the "images" field with the FileList
    
    this.productForm.get('images')?.setValue(inputElement.files);
  }
  const selectedFiles: FileList | null = inputElement.files;

  if (selectedFiles) {
    this.prepareFilesList(Array.from(selectedFiles)); // Convert FileList to an array
  }
  console.log(this.files)
}


/**
 * Delete file from files list
 * @param index (File index)
 */
 
deleteFile(index: number) {
  this.files.splice(index, 1);
  this.files =[...this.productForm.get('images')?.value]
  this.files.splice(index, 1);
  // so i set images.value or the(fileList) to an array and delete the image than set the filelist to the new one
  this.productForm.get('images')?.setValue(this.files);
  console.log(this.files);
}
/**
 * Simulate the upload process
 */
uploadFilesSimulator(index: number) {
  setTimeout(() => {
    if (index === this.files.length) {
      return;
    } else {
      const progressInterval = setInterval(() => {
        if (this.files[index].progress === 100) {
          clearInterval(progressInterval);
          this.uploadFilesSimulator(index + 1);
        } else {
          this.files[index].progress += 5;
        }
      }, 200);
    }
  }, 1000);
}

/**
 * Convert Files list to normal array list
 * @param files (Files List)
 */
prepareFilesList(files: Array<any>) {
  
  for (const item of files) {
    item.progress = 0;
    this.files.push(item);
  }
  this.uploadFilesSimulator(0);
}

/**
 * format bytes
 * @param bytes (File size in bytes)
 * @param decimals (Decimals point)
 */
formatBytes(bytes:any, decimals: any = 2) {
  if (bytes === 0) {
    return '0 Bytes';
  }
  const k = 1024;
  const dm = decimals <= 0 ? 0 : decimals || 2;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

}
