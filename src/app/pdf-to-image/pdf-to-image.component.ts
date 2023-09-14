import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { PDFDocumentProxy } from 'ng2-pdf-viewer';
import * as _html2canvas from "html2canvas";
import { HttpClient } from '@angular/common/http';
import Cropper from 'cropperjs';
declare var $: any
const html2canvas: any = _html2canvas;

@Component({
  selector: 'app-pdf-to-image',
  templateUrl: './pdf-to-image.component.html',
  styleUrls: ['./pdf-to-image.component.css']
})
export class PdfToImageComponent {
  title = 'pdf-to-image';
  public pdfSrc = "";
  public totalPages: number = 0;
  public currentpage: number = 0;
  private cropper!: Cropper;
  public isCropImage: boolean = false;
  public isPdfUploaded: boolean = false;

  

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.currentpage = 1
  }

  

  // Upload Pdf file
  public uploadFile(event: any) {
    let $img: any = document.querySelector('#upload-PDF');
    if (event.target.files[0].type == 'application/pdf') {
      if (typeof (FileReader) !== 'undefined') {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.pdfSrc = e.target.result;
        };
        this.isPdfUploaded = true;
        reader.readAsArrayBuffer($img.files[0]);
      }
    } else {
      alert('please upload pdf file')
    }
  }

  // after pdf uploaded
  afterLoadComplete(pdf: PDFDocumentProxy) {
    this.totalPages = pdf.numPages;
  }
  // Zoom Out Image
  public zoomOut() {
    this.cropper.zoom(0.1)
  }

  // Zoom In Image
  public zoomIn() {
    this.cropper.zoom(-0.1)
  }

  // Range slider for zooming the image
  public onRange(event: any) {
    this.cropper.zoomTo(event.target.value)
  }

  // perform the rotate functionality on image
  public onRotate() {
    this.cropper.rotate(-90)
  }


  // crop the image
  public crop() {
    html2canvas(document.querySelector(".pdf-container") as HTMLElement).then((canvas: any) => {
      let ctx = canvas.getContext('2d');
      ctx.scale(3, 3);
      let image = canvas.toDataURL("image/jpeg", { quality: 100 });
      // let image = canvas.toDataURL("image/png").replace("image/png", "image/png");
      $("#cropper-img").attr('src', image);
      $('#cropper-img').addClass('ready');
      this.isCropImage = true
      let cropImg: any = document.getElementById('cropper-img');
      this.cropper = new Cropper(cropImg, {
        zoomable: true,
        background: false,
        guides: false,
        highlight: false,
        movable: false,
        ready: (e) => {
          let cropper = this.cropper;
        },
        crop: (e) => {
        }
      });
    })
  }

  // download crop or without crop image
  public download() {
    if (this.isCropImage) {
      let canvas = this.cropper.getCroppedCanvas();
      this.getCanvasToDownload(canvas)
    } else {
      html2canvas(document.querySelector(".pdf-container") as HTMLElement).then((canvas: any) => {
        this.getCanvasToDownload(canvas)
      })
    }
  }

  private getCanvasToDownload(canvas: any) {
    let ctx = canvas.getContext('2d');
    ctx.scale(3, 3);
    let image = canvas.toDataURL("image/jpeg", { quality: 100 });
    // let image = canvas.toDataURL("image/png").replace("image/png", "image/png");
    var link = document.createElement('a');
    link.download = "my-image.png";
    link.href = image;
    link.click();
      // Display the image
  var imageElement = document.createElement("img");
  imageElement.src = image;
  document.body.appendChild(imageElement);
  }

  // show the previous page
  public previous() {
    if (this.currentpage > 0) {
      if (this.currentpage == 1) {
        this.currentpage = this.totalPages;
      } else {
        this.currentpage--;
      }
    }
  }

  // show the next page
  public next() {
    if (this.totalPages > this.currentpage) {
      this.currentpage++;
    } else {
      this.currentpage = 1;
    }
  }

  // reset crop image
  public reset() {
    this.isCropImage = false;
    this.cropper.clear();
    this.cropper.destroy();
  }
}
