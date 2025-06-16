import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Ng2IzitoastService } from 'ng2-izitoast';
import { ArticleService } from 'src/app/_services/article.service';
import * as  uuid from 'uuid';


@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {
  articleForm: FormGroup;
  submitted = false;
  imagePreview: string | ArrayBuffer | null = null;
  selectedImageFile: File | null = null;
  myUUID = uuid.v4();


  constructor(private fb: FormBuilder,
              private articleService :ArticleService,
              private router :Router,
              public iziToast: Ng2IzitoastService) {}

  ngOnInit(): void {
    this.articleForm = this.fb.group({
      image : ['', ],
      title: ['', Validators.required],
      content: ['', Validators.required],
      tags: ['', Validators.required],
      key: [this.myUUID]
    });
  }
  get f() {
    return this.articleForm.controls;
  }
onImageSelected(event: Event): void {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    this.selectedImageFile = file;
    this.articleForm.patchValue({
        image: this.selectedImageFile.name
    });
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }
}

removeImage(): void {
  this.imagePreview = null;
  this.selectedImageFile = null;
  this.articleForm.patchValue({
        image: ''
    });
}
  onSubmit() {
    this.submitted = true;
    if (this.articleForm.invalid)
        return;

    const formData = new FormData();
    formData.append('image', this.selectedImageFile);
    this.articleService.uploadImage(formData,this.myUUID).subscribe(e =>{
        })  
        this.articleForm.value.image =  this.selectedImageFile.name
      this.articleService.createArticle(this.articleForm.value).subscribe({
        next: (response) => {
         this.iziToast.success({
              message: 'Article créé avec succès !',
              position: 'topRight'
            });
          this.router.navigate(['/accueil/articles' ])    // éventuellement, rediriger ou afficher un message
        },
        error: (error) => {
         this.iziToast.error({
              message: 'Erreur lors de la création de l\'article.',
              position: 'topRight'
            });
        }
      });
    }
  
}
