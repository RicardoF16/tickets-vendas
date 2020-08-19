import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { finalize, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagePickerService {

  constructor(private camera: Camera, private storage: AngularFireStorage) { }

  getImage(sourceType?: string): Promise<{ typeImg: string, imgBase64: string }> {
    return new Promise((resolve, reject) => {
      let pictureSourceType = this.camera.PictureSourceType.PHOTOLIBRARY;
      if (sourceType && sourceType === 'CAMERA') {
        pictureSourceType = this.camera.PictureSourceType.CAMERA;
      }
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        sourceType: pictureSourceType,
        targetHeight: 180,
        targetWidth: 180,
        saveToPhotoAlbum: false
      };

      this.camera.getPicture(options).then((imageData) => {
        // console.log(imageData);
        // console.log(imageData.split(/(\\|\/)/g).pop());

        // const base64Image = 'data:image/jpeg;base64,' + imageData;
        // this.generateFromImage(base64Image, imageResized => {
        //   console.log(imageResized);
        //   resolve({ typeImg: 'image/jpeg', imgBase64: (imageResized.split(','))[1] });
        // });
        resolve({ typeImg: 'image/jpeg', imgBase64: imageData });
      }, (err) => {
        reject('falha ao tentar obter imagens');
      });
    });
  }

  uploadImage(imageBase64: string, typeImg: string, filePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const ref = this.storage.ref(filePath);
      const task = ref.putString(imageBase64, 'base64', { contentType: typeImg });
      task.snapshotChanges().pipe(
        finalize(() => {
          ref.getDownloadURL()
            .pipe(take(1))
            .subscribe(url => {
              resolve(url);
            });
        })
      ).subscribe();
    });
  }

  uploadImage2(imageBase64: string, typeImg: string, filePath: string): Observable<{ url: string, percentage: number }> {
    return new Observable( (observer) => {
      const ref = this.storage.ref(filePath);
      const task = ref.putString(imageBase64, 'base64', { contentType: typeImg });
      task.snapshotChanges().pipe(
        finalize(() => {
          ref.getDownloadURL()
            .pipe(take(1))
            .subscribe(url => {
              // resolve(url);
              observer.next({ url: url, percentage: null });
            });
        })
      ).subscribe();

      task.percentageChanges().subscribe( p => {
        observer.next({ url: null, percentage: p });
      });

    });
  }

  percentageChanges(task: AngularFireUploadTask) {
    return task.percentageChanges();
  }

  // private generateFromImage(img, callback, MAX_WIDTH: number = 180, MAX_HEIGHT: number = 180, quality: number = 0.2) {
  //   const canvas: any = document.createElement('canvas');
  //   const image = new Image();

  //   image.onload = () => {
  //     let width = image.width;
  //     let height = image.height;

  //     if (width > height) {
  //       if (width > MAX_WIDTH) {
  //         height *= MAX_WIDTH / width;
  //         width = MAX_WIDTH;
  //       }
  //     } else {
  //       if (height > MAX_HEIGHT) {
  //         width *= MAX_HEIGHT / height;
  //         height = MAX_HEIGHT;
  //       }
  //     }
  //     canvas.width = width;
  //     canvas.height = height;
  //     const ctx = canvas.getContext('2d');

  //     ctx.drawImage(image, 0, 0, width, height);

  //     // IMPORTANT: 'jpeg' NOT 'jpg'
  //     const dataUrl = canvas.toDataURL('image/jpeg', quality);

  //     callback(dataUrl);
  //   };
  //   image.src = img;
  // }



}
