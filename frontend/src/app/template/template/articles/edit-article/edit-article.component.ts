import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Ng2IzitoastService } from 'ng2-izitoast';
import { ArticleService } from 'src/app/_services/article.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit {

  articleId: string | null = null;
  articleForm: FormGroup;
  submitted = false;
  imagePreview: string | ArrayBuffer | null = null;
  selectedImageFile: File | null = null;

  constructor(private fb: FormBuilder,
              private articleService: ArticleService,
              private router: Router,
              private route: ActivatedRoute,
              public iziToast: Ng2IzitoastService
) {}

 ngOnInit(): void {
  this.articleForm = this.fb.group({
    image: [''],
    title: ['', Validators.required],
    content: ['', Validators.required],
    tags: ['', Validators.required],
  });

  this.articleId = this.route.snapshot.paramMap.get('id');
  if (this.articleId) {
    this.articleService.getArticleById(this.articleId).subscribe(article => {
      this.articleForm.patchValue({
        image: article.image,
        title: article.title,
        content: article.content,
        tags: article.tags,
        key: article.key
      });
      this.imagePreview = `${environment.baseUrl.split('/api')[0]}/media/articles/${article.key}/${article.image}`;
    });
  }
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
  if (this.selectedImageFile) {  
    const formData = new FormData();
    formData.append('image', this.selectedImageFile);
    this.articleService.uploadImage(formData, this.articleForm.value.key).subscribe({
      error: (err) => {
        console.error('Erreur lors de l\'upload de l\'image :', err);
        this.iziToast.error({
          title: 'Erreur',
          message: 'Échec de l\'upload de l\'image.',
          position: 'topRight'
        });
      }
    });
    this.articleForm.value.image = this.selectedImageFile.name;
  }
  this.articleService.editArticle(this.articleId, this.articleForm.value).subscribe({
    next: (response) => {
      this.iziToast.success({
        title: 'Succès',
        message: 'Article modifié avec succès !',
        position: 'topRight'
      });
      this.router.navigate(['/accueil/articles']);
    },
    error: (error) => {
      if (error.error?.message === 'Access denied. You cannot modify this article.') {
        this.iziToast.error({
          message: 'Vous n’êtes pas autorisé à modifier cet article.',
          position: 'topRight'
        });
        this.router.navigate(['/accueil/articles']);
      } else {
        this.iziToast.error({
          message: 'Erreur lors de la modification de l\'article.',
          position: 'topRight'
        });
      }
    }
  });
}


}
